export interface ModalConfig {
  title: string;
  message: string;
  danger: boolean;
}

export const DEFAULT_MODAL_CONFIG: ModalConfig = {
  title: '',
  message: '',
  danger: false,
};

