export const CARDANO_WALLETS = {
  nami: {
    name: 'Nami',
    key: 'nami',
  },
  eternl: {
    name: 'Eternl',
    key: 'eternl',
  },
  flint: {
    name: 'Flint',
    key: 'flint',
  },
  yoroi: {
    name: 'Yoroi',
    key: 'yoroi',
  },
  lace: {
    name: 'Lace',
    key: 'lace',
  },
  typhon: {
    name: 'Typhon',
    key: 'typhoncip30',
  },
  gerowallet: {
    name: 'GeroWallet',
    key: 'gerowallet',
  },
  nufi: {
    name: 'NuFi',
    key: 'nufi',
  },
} as const;

export type WalletKey = keyof typeof CARDANO_WALLETS;

export interface CardanoWallet {
  name: string;
  key: string;
  icon?: string;
  apiVersion?: string;
}

export interface WalletApi {
  getNetworkId: () => Promise<number>;
  getUsedAddresses: () => Promise<string[]>;
  getUnusedAddresses: () => Promise<string[]>;
  getChangeAddress: () => Promise<string>;
  getRewardAddresses: () => Promise<string[]>;
  signData: (addr: string, payload: string) => Promise<{ signature: string; key: string }>;
  signTx: (tx: string, partialSign?: boolean) => Promise<string>;
  submitTx: (tx: string) => Promise<string>;
}

declare global {
  interface Window {
    cardano?: Record<string, {
      name: string;
      icon: string;
      apiVersion: string;
      enable: () => Promise<WalletApi>;
      isEnabled: () => Promise<boolean>;
    }>;
  }
}

export function getAvailableWallets(): CardanoWallet[] {
  if (typeof window === 'undefined' || !window.cardano) {
    return [];
  }

  const wallets: CardanoWallet[] = [];
  const exclude = ['enable', 'isEnabled', 'apiVersion', 'name', 'icon'];

  Object.keys(window.cardano).forEach((key) => {
    if (exclude.includes(key)) return;

    const provider = window.cardano?.[key];
    if (provider && typeof provider === 'object' && 'enable' in provider) {
      const known = Object.values(CARDANO_WALLETS).find((w) => w.key === key);
      wallets.push({
        name: known?.name || provider.name || key,
        key,
        icon: provider.icon,
        apiVersion: provider.apiVersion,
      });
    }
  });

  return wallets;
}

export async function connectWallet(walletKey: string): Promise<WalletApi | null> {
  if (typeof window === 'undefined' || !window.cardano) {
    return null;
  }

  const provider = window.cardano[walletKey];
  if (!provider) {
    return null;
  }

  try {
    const api = await provider.enable();
    return api;
  } catch {
    return null;
  }
}

export async function getWalletAddress(api: WalletApi): Promise<string | null> {
  try {
    const addresses = await api.getUsedAddresses();
    if (addresses.length > 0) {
      return addresses[0];
    }
    const unused = await api.getUnusedAddresses();
    return unused[0] || null;
  } catch {
    return null;
  }
}

export async function signMessage(
  api: WalletApi,
  address: string,
  message: string
): Promise<{ signature: string; key: string } | null> {
  try {
    const hexMessage = Buffer.from(message).toString('hex');
    const result = await api.signData(address, hexMessage);
    return result;
  } catch {
    return null;
  }
}

