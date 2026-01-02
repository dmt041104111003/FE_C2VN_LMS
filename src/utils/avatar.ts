import makeBlockie from 'ethereum-blockies-base64';

const DEFAULT_SEED = 'default-user';

export const generateBlockieAvatar = (seed: string): string => {
  const safeSeed = seed?.trim() || DEFAULT_SEED;
  return makeBlockie(safeSeed);
};

export const getAvatarFromName = (name: string): string => {
  const safeName = name?.toLowerCase().replace(/\s+/g, '') || DEFAULT_SEED;
  return generateBlockieAvatar(safeName);
};

export const getAvatarFromAddress = (address: string): string => {
  return generateBlockieAvatar(address || DEFAULT_SEED);
};

interface UserAvatarInput {
  walletAddress?: string;
  fullName?: string;
  email?: string;
}

export const getUserAvatar = (user: UserAvatarInput | null | undefined): string => {
  if (!user) return generateBlockieAvatar(DEFAULT_SEED);
  
  const seed = user.walletAddress || user.email || user.fullName || DEFAULT_SEED;
  return generateBlockieAvatar(seed);
};

