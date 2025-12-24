import { memo } from 'react';
import Link from 'next/link';
import {
  ROUTES,
  FOOTER_RESOURCES,
  FOOTER_SUPPORT,
  SOCIAL_LINKS,
  FOOTER_LABELS,
} from '@/constants';
import { SOCIAL_ICONS } from './';
import {
  FOOTER,
  FOOTER_CONTAINER,
  FOOTER_TOP,
  FOOTER_LEFT,
  FOOTER_TITLE,
  FOOTER_DESC,
  FOOTER_SOCIALS,
  FOOTER_SOCIAL_LINK,
  FOOTER_RIGHT,
  FOOTER_COL,
  FOOTER_COL_TITLE,
  FOOTER_COL_LINK,
  FOOTER_BOTTOM,
  FOOTER_COPYRIGHT,
  FOOTER_LEGAL,
  FOOTER_LEGAL_LINK,
  ICON_LG,
} from './ui.styles';

function FooterComponent() {
  return (
    <footer className={FOOTER}>
      <div className={FOOTER_CONTAINER}>
        <div className={FOOTER_TOP}>
          <div className={FOOTER_LEFT}>
            <h3 className={FOOTER_TITLE}>
              {FOOTER_LABELS.title}
            </h3>
            <p className={FOOTER_DESC}>
              {FOOTER_LABELS.description}
            </p>
            <div className={FOOTER_SOCIALS}>
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = SOCIAL_ICONS[link.icon];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={FOOTER_SOCIAL_LINK}
                    aria-label={link.label}
                  >
                    <IconComponent className={ICON_LG} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className={FOOTER_RIGHT}>
            <div className={FOOTER_COL}>
              <span className={FOOTER_COL_TITLE}>
                {FOOTER_LABELS.resourcesTitle}
              </span>
              {FOOTER_RESOURCES.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={FOOTER_COL_LINK}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={FOOTER_COL}>
              <span className={FOOTER_COL_TITLE}>
                {FOOTER_LABELS.supportTitle}
              </span>
              {FOOTER_SUPPORT.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={FOOTER_COL_LINK}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className={FOOTER_BOTTOM}>
          <span className={FOOTER_COPYRIGHT}>
            {FOOTER_LABELS.copyright}
          </span>
          <div className={FOOTER_LEGAL}>
            <Link
              href={ROUTES.TERMS}
              className={FOOTER_LEGAL_LINK}
            >
              {FOOTER_LABELS.terms}
            </Link>
            <span>•</span>
            <Link
              href={ROUTES.PRIVACY}
              className={FOOTER_LEGAL_LINK}
            >
              {FOOTER_LABELS.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
