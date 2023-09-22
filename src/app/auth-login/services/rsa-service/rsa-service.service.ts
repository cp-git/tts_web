import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
@Injectable({
  providedIn: 'root'
})
export class RsaServiceService {

  constructor() { }

  encryptDataWithRSA(data: string, publicKeyData:string):string {
    try {
      // const publicKeyData = sessionStorage.getItem('SERVER_PUBLIC_KEY');
      // console.log(publicKeyData);
     
      if (publicKeyData) {
        // Create an RSA public key object from the PEM-encoded key
        const publicKey = forge.pki.publicKeyFromPem(publicKeyData);

        // Encrypt the data using RSA
        const encryptedData = publicKey.encrypt(data, 'RSAES-PKCS1-V1_5', {
          md: forge.md.sha256.create(),
        });

        // Convert the encrypted data to a Base64-encoded string
        return btoa(encryptedData);
      }
      return '';
    } catch (error) {
      console.error('Encryption error:', error);
      return '';
    }
  }
}
