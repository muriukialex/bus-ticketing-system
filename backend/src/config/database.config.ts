import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  S3_BUCKET: 'details',
  AUTO_LOAD_ENTITIES: process.env.AUTO_LOAD_ENTITIES === 'true',
  SYNCHRONIZE: process.env.SYNCHRONIZE === 'true', // only enable this in development
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PORT: process.env.DATABASE_PORT || 5432,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_ISSUER: process.env.JWT_TOKEN_ISSUER,
  JWT_TOKEN_AUDIENCE: process.env.JWT_TOKEN_AUDIENCE,
  JWT_ACCESS_TOKEN_TTL: process.env.JWT_ACCESS_TOKEN_TTL,
}));
