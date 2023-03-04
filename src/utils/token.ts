import { SignJWT, jwtVerify } from 'jose';

export const creationToken = async (value: any) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const alg = 'HS256';

  const jwt = await new SignJWT({ data: value })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  return jwt;
};

export const validationToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  const { payload } = await jwtVerify(token, secret);

  console.log(payload);
};
