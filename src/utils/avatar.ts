import makeBlockie from 'ethereum-blockies-base64';

export const generateBlockieAvatar = (seed: string): string => {
  return makeBlockie(seed);
};

export const getAvatarFromName = (name: string): string => {
  return generateBlockieAvatar(name.toLowerCase().replace(/\s+/g, ''));
};

export const getAvatarFromAddress = (address: string): string => {
  return generateBlockieAvatar(address);
};

