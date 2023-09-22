import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AesServiceService {

  constructor() { }

  encryptWithAES(value: string, secretKeyData:string, ivData:string): string {
    console.log(value);
    
    const key = CryptoJS.enc.Utf8.parse(secretKeyData);
    const iv = CryptoJS.enc.Utf8.parse(ivData);

    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  decryptWithAES(encryptedValue: string, secretKeyData:string, ivData:string): string {
    const key = CryptoJS.enc.Utf8.parse(secretKeyData);
    const iv = CryptoJS.enc.Utf8.parse(ivData);

    const decrypted = CryptoJS.AES.decrypt(encryptedValue, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
