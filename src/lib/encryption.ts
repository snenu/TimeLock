import CryptoJS from 'crypto-js';

export function generateEncryptionKey(): string {
  return CryptoJS.lib.WordArray.random(32).toString();
}

export function encrypt(data: string, key: string): string {
  return CryptoJS.AES.encrypt(data, key).toString();
}

export function decrypt(encryptedData: string, key: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function hashKey(key: string): string {
  return CryptoJS.SHA256(key).toString();
}
