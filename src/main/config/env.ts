import { config } from "dotenv";
config();

export const env = {
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    resetPasswordSecret: process.env.JWT_RESET_PASSWORD_KEY,
  },
  awsSdk: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  port: process.env.PORT,
};
