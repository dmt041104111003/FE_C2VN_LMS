export const CARDANO_WALLETS = {
  nami: { name: 'Nami', key: 'nami' },
  eternl: { name: 'Eternl', key: 'eternl' },
  flint: { name: 'Flint', key: 'flint' },
  yoroi: { name: 'Yoroi', key: 'yoroi' },
  lace: { name: 'Lace', key: 'lace' },
  typhon: { name: 'Typhon', key: 'typhoncip30' },
  gerowallet: { name: 'GeroWallet', key: 'gerowallet' },
  nufi: { name: 'NuFi', key: 'nufi' },
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
  signTx: (tx: string, partialSign: boolean) => Promise<string>;
  submitTx: (tx: string) => Promise<string>;
}

export interface PaymentResult {
  txHash: string;
  senderAddress: string;
}

type CardanoProvider = {
  name: string;
  icon: string;
  apiVersion: string;
  enable: () => Promise<WalletApi>;
  isEnabled: () => Promise<boolean>;
};

const LOVELACE_PER_ADA = 1_000_000;
const MIN_OUTPUT_ADA = 1.0;
const ESTIMATED_FEE_ADA = 0.2;
const PROVIDER_EXCLUDE_KEYS = new Set(['enable', 'isEnabled', 'apiVersion', 'name', 'icon']);
const WALLET_LOOKUP: Map<string, { name: string; key: string }> = new Map(
  Object.values(CARDANO_WALLETS).map(w => [w.key, w])
);

const lovelaceToAda = (lovelace: string): number => parseInt(lovelace) / LOVELACE_PER_ADA;
const adaToLovelace = (ada: number): string => Math.floor(ada * LOVELACE_PER_ADA).toString();

const getCardanoProviders = (): Record<string, CardanoProvider> | undefined => {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { cardano?: Record<string, CardanoProvider> }).cardano;
};

const getFirstAvailableAddress = async (
  getUsed: () => Promise<string[]>,
  getUnused: () => Promise<string[]>
): Promise<string | null> => {
  const used = await getUsed();
  if (used[0]) return used[0];
  const unused = await getUnused();
  return unused[0] || null;
};

export function getAvailableWallets(): CardanoWallet[] {
  const cardano = getCardanoProviders();
  if (!cardano) return [];

  return Object.entries(cardano)
    .filter(([key, provider]) => 
      !PROVIDER_EXCLUDE_KEYS.has(key) && 
      provider && 
      typeof provider === 'object' && 
      'enable' in provider
    )
    .map(([key, provider]) => ({
      name: WALLET_LOOKUP.get(key)?.name || provider.name || key,
      key,
      icon: provider.icon,
      apiVersion: provider.apiVersion,
    }));
}

export async function connectWallet(walletKey: string): Promise<WalletApi | null> {
  const provider = getCardanoProviders()?.[walletKey];
  if (!provider) return null;

  try {
    return await provider.enable();
  } catch {
    return null;
  }
}

export async function getWalletAddress(api: WalletApi): Promise<string | null> {
  try {
    return await getFirstAvailableAddress(
      () => api.getUsedAddresses(),
      () => api.getUnusedAddresses()
    );
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
    return await api.signData(address, Buffer.from(message).toString('hex'));
  } catch {
    return null;
  }
}

export async function sendPayment(
  walletKey: string,
  receiverAddress: string,
  amountAda: number
): Promise<PaymentResult> {
  const { BrowserWallet, Transaction } = await import('@meshsdk/core');
  
  const wallet = await BrowserWallet.enable(walletKey).catch(() => null);
  if (!wallet) throw new Error('Không thể kết nối ví');

  const senderAddress = await getFirstAvailableAddress(
    () => wallet.getUsedAddresses(),
    () => wallet.getUnusedAddresses()
  ).catch(() => null);
  
  if (!senderAddress) throw new Error('Không thể lấy địa chỉ ví');

  if (amountAda < MIN_OUTPUT_ADA) {
    throw new Error(
      `Số tiền gửi tối thiểu là ${MIN_OUTPUT_ADA} ADA (quy định của Cardano). ` +
      `Bạn đang gửi ${amountAda} ADA.`
    );
  }

  const requiredAda = amountAda + ESTIMATED_FEE_ADA;
  const balanceAda = await wallet.getLovelace().then(lovelaceToAda).catch(() => null);
  
  if (balanceAda !== null && balanceAda < requiredAda) {
    throw new Error(
      `Số dư không đủ. Cần ${requiredAda.toFixed(2)} ADA (${amountAda} ADA + ~${ESTIMATED_FEE_ADA} ADA phí). ` +
      `Số dư hiện tại: ${balanceAda.toFixed(2)} ADA.`
    );
  }

  try {
    const tx = new Transaction({ initiator: wallet }).sendLovelace(receiverAddress, adaToLovelace(amountAda));
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    return { txHash, senderAddress };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('user declined')) {
      throw new Error('Người dùng đã hủy giao dịch');
    }
    
    if (messageLower.includes('insufficientlyfundedoutputs') || messageLower.includes('minimumrequiredvalue')) {
      const minMatch = message.match(/"lovelace":(\d+)\}\}\]/);
      const minAda = minMatch ? (parseInt(minMatch[1]) / LOVELACE_PER_ADA).toFixed(2) : '~1';
      throw new Error(
        `Số tiền gửi quá thấp. Cardano yêu cầu tối thiểu ${minAda} ADA cho mỗi giao dịch. ` +
        `Bạn đang gửi ${amountAda} ADA.`
      );
    }
    
    if (messageLower.includes('insufficient') || messageLower.includes('utxo') || messageLower.includes('depleted')) {
      throw new Error('Số dư không đủ hoặc UTxO không khả dụng. Vui lòng thử lại sau vài phút.');
    }
    
    throw new Error(`Giao dịch thất bại: ${message}`);
  }
}
