import { hash, verify } from 'argon2';

export const creationHash = async (textPlain: string) => {
  return await hash(textPlain);
};

export const validationHash = async (textPlain: string, textHash: string) => {
  try {
    return await verify(textHash, textPlain);
  } catch (error) {
    return false;
  }
};
