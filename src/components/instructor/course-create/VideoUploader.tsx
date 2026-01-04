'use client';

import { useRef, useState, useCallback } from 'react';
import { Tabs, useToast } from '@/components/ui';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { COURSE_CREATE_STYLES as S, VIDEO_UPLOADER } from '@/constants/course-create';
import { uploadVideo } from '@/services/api';
import { isYouTubeUrl } from '@/constants/config';
import type { VideoUploaderProps, VideoSourceType } from '@/types/course-create';

const { LABELS, TABS, STYLES } = VIDEO_UPLOADER;

export function VideoUploader({ 
  videoUrl, 
  onVideoChange, 
  disabled 
}: VideoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<VideoSourceType>(
    isYouTubeUrl(videoUrl) || !videoUrl ? 'youtube' : 'upload'
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const result = await uploadVideo(file);
      const videoLink = result.secure_url || result.url;
      const durationMinutes = result.duration ? Math.ceil(result.duration / 60) : undefined;
      onVideoChange(videoLink, durationMinutes);
      toast.success(LABELS.uploadSuccess);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : LABELS.uploadError);
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [onVideoChange, toast]);

  const handleYoutubeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onVideoChange(e.target.value);
  }, [onVideoChange]);

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key as VideoSourceType);
  }, []);

  const dropzoneClass = `${STYLES.DROPZONE} ${
    disabled || isUploading ? STYLES.DROPZONE_DISABLED : STYLES.DROPZONE_ACTIVE
  }`;

  const showUploadedState = videoUrl && !isYouTubeUrl(videoUrl);

  return (
    <div className={S.FORM_GROUP}>
      <label className={S.LABEL}>{LABELS.title}</label>
      
      <Tabs
        items={[...TABS]}
        activeKey={activeTab}
        onChange={handleTabChange}
        variant="underline"
        size="sm"
      />

      <div className={STYLES.CONTENT}>
        {activeTab === 'youtube' ? (
          <input
            type="text"
            value={isYouTubeUrl(videoUrl) ? videoUrl : ''}
            onChange={handleYoutubeChange}
            placeholder={LABELS.youtubePlaceholder}
            className={S.INPUT}
            disabled={disabled}
          />
        ) : (
          <div className="space-y-3">
            <input
              ref={inputRef}
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              onChange={handleFileChange}
              className="hidden"
              id="video-upload"
              disabled={disabled || isUploading}
            />
            
            {!showUploadedState ? (
              <label htmlFor="video-upload" className={dropzoneClass}>
                <div className="text-center">
                  <p className="text-sm text-[var(--accent)] font-medium">{LABELS.uploadBtn}</p>
                  <p className="text-xs text-[var(--text)]/50 mt-1">{LABELS.uploadHint}</p>
                </div>
              </label>
            ) : (
              <label
                htmlFor="video-upload"
                className={`inline-block text-sm text-[var(--accent)] cursor-pointer hover:underline ${
                  disabled || isUploading ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                {LABELS.changeVideo}
              </label>
            )}
          </div>
        )}
      </div>

      {videoUrl && (
        <div className={S.VIDEO_PREVIEW}>
          <VideoPlayer url={videoUrl} />
        </div>
      )}
    </div>
  );
}
