/*
https://docs.nestjs.com/providers#services
*/
import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenerateJwtService {
  constructor(private readonly configService: ConfigService) {}

  static generateToken() {
    // Generate a new RSA key pair
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048, // Adjust the key size as needed
      publicKeyEncoding: {
        type: 'pkcs1', // or 'spki' depending on your use case
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1', // or 'pkcs8' depending on your use case
        format: 'pem',
        cipher: 'aes-256-cbc', // optional
        passphrase: 'your-passphrase', // optional
      },
    });

    if (!process.env.JWT_PRIVATE_KEY) {
      process.env.JWT_PUBLIC_KEY = publicKey;
      process.env.JWT_PRIVATE_KEY = privateKey;
      console.log('saved');
    }
  }
}
