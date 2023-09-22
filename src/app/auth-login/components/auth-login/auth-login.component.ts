import { Component } from '@angular/core';
import { AuthLogin } from '../../class/auth-login';
import { AuthenticationServiceService } from 'src/app/service/authentication-service.service';
import { Router } from '@angular/router';
import { AuthLoginService } from '../../services/auth-login/auth-login.service';
import { RandomStringService } from '../../services/random-string/random-string.service';
import { firstValueFrom } from 'rxjs';
import { RsaServiceService } from '../../services/rsa-service/rsa-service.service';
import { AuthKey } from '../../class/auth-key';
import { AesServiceService } from '../../services/aes-service/aes-service.service';
import { Data } from '../../class/data';
import { DialogueBoxService } from 'src/app/shared/services/dialogue-box.service';
declare var $: any;
@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent {

  isLoggedIn: boolean = false;
  clicked: boolean = false;
  errorMessage: string = '';
  credentials: AuthLogin = new AuthLogin();
  encryptedCredentials: AuthLogin = new AuthLogin();

  private readonly LENGTH_CLIENT_RANDOM_STRING: number = 10;
  private readonly LENGTH_CLIENT_PRESECRET_KEY: number = 10;
  private readonly LENGTH_INITIALIZATION_VECTOR: number = 16;
  private publicKey: string = '';
  private clientPreSecretKey: string = '';

  // private authUser: AuthLogin = new AuthLogin();
  private keyId: any;
  secretKey: any;
  iv: any;

  constructor(
    private authLoginService: AuthLoginService,
    private router: Router,
    private randomString: RandomStringService,
    private rsaService: RsaServiceService,
    private dialogueBoxService: DialogueBoxService,
  ) {
    localStorage.setItem("KEY_ID", '0')
    this.initialization();
  }


  private async initialization() {
    // localStorage.setItem('KEY_ID', '0');
    this.iv = this.generateInitializationVector(this.LENGTH_INITIALIZATION_VECTOR);

    await this.addServerPublicKeyInSessionStorage();
    console.log("1");

    await this.getServerRandomString();
    console.log("2");

    await this.addClientRandomString(this.publicKey);
    console.log("3");

    await this.addInitVector();

    await this.addClientPreSecretKey(this.publicKey);
    console.log("finally");

    this.keyId = localStorage.getItem("KEY_ID");
    console.log("finally2", this.keyId);

    await this.getTokenBeforeLogin(this.keyId);
    console.log("after token");
    this.generateSecretKey();

  }
 // generating secret key
  private generateSecretKey() {
    const srs = sessionStorage.getItem("SERVER_RANDOM_STR");
    const crs = sessionStorage.getItem("CLIENT_RANDOM_STR");
    const cpk = sessionStorage.getItem("CLIENT_PRESECRET_KEY");

    if (srs && crs && cpk) {
      this.secretKey = srs + crs + cpk;
      console.log(this.secretKey);
    }
  }

  // generating initialization vector for encryption and decryption data
  private generateInitializationVector(length: number) {
    return this.randomString.generateRandomString(length);
  }


  // get and add server's public key in session storage 
  private async addServerPublicKeyInSessionStorage() {
      // Call getServerPublicKey and wait for its completion
      const serverPublicKey = await this.getServerPublicKey();
      this.publicKey = serverPublicKey['key'];
    
      // set server public key in sessionStorage
      sessionStorage.setItem('SERVER_PUBLIC_KEY', JSON.stringify(serverPublicKey));
  }

  // get server public key
  private async getServerPublicKey() {
      // Making the API call and wait for the response
      const response = await firstValueFrom(this.authLoginService.getServerPublicKey());
      return response;
  }

  // get server random string
  private async getServerRandomString() {
      // Making the API call and wait for the response
      var keyId = Number(localStorage.getItem("KEY_ID"));
      console.log(keyId);

      // if keyid not found
      if (!(keyId >= 0)) {
        keyId = 0;
      }

      // api call for getting server random string 
      const serverRandomStringObject = await firstValueFrom(this.authLoginService.getServerRandomString(keyId));
      const serverRandomString = serverRandomStringObject.serverRandomString;

      this.keyId = serverRandomStringObject.id;

      // storing keyid and server ranodm string in session storage
      localStorage.setItem('KEY_ID', JSON.stringify(serverRandomStringObject.id));
      sessionStorage.setItem('SERVER_RANDOM_STR', serverRandomString);
   
  }

  // get client random string
  private async addClientRandomString(publicKey: string) {
    // generating ranodm string 
    const clientRandomString = await this.randomString.generateRandomString(this.LENGTH_CLIENT_RANDOM_STRING);

    // encrypting client random string using rsa algorithm
    const encryptedClientRandomString = this.rsaService.encryptDataWithRSA(clientRandomString, publicKey);

    

    const keyId = localStorage.getItem('KEY_ID');

    // keyid exist
    if (keyId) {
      const authKey = new AuthKey(); // for storing key
      authKey.id = parseInt(keyId);
      authKey.clientRandomString = encryptedClientRandomString;

      // calling service to add client random string
      const response = firstValueFrom(this.authLoginService.addClientRandomString(authKey));

      // on success add in session storage
      if (response != undefined) {
        sessionStorage.setItem('CLIENT_RANDOM_STR', clientRandomString);
      }
    }
  }

  // add initiliazation vector in db
  private async addInitVector() {
      const keyId = localStorage.getItem('KEY_ID');

      // if keyid exist
      if (keyId) {  
        const authKey = new AuthKey(); // for stoaring keys
        authKey.id = parseInt(keyId);
        authKey.initVector = this.iv;

        // Call addInitVector and wait for its completion
        const initVector = await firstValueFrom(this.authLoginService.addInitVector(authKey));
        console.log(initVector);

        // set init vector in sessionStorage
        sessionStorage.setItem('INITVECTOR', JSON.stringify(this.iv));
      }
  }

  // add client presecret key 
  private async addClientPreSecretKey(publicKey: string) {
    try {
      // generating client presecret key
      this.clientPreSecretKey = await this.randomString.generateRandomString(this.LENGTH_CLIENT_PRESECRET_KEY);
      // encrypting presecret key
      const encryptedClientPreSecretKey = this.rsaService.encryptDataWithRSA(this.clientPreSecretKey, publicKey);
      
      // if keyid exist
      if (this.keyId) {
        const authKey = new AuthKey();
        authKey.id = parseInt(this.keyId);
        authKey.clientPreSecretKey = encryptedClientPreSecretKey;

        // calling service to store client presecret key in db
        const response = await firstValueFrom(this.authLoginService.addClientPreSecretKey(authKey));

        // on success store in session storage
        if (response != undefined) {
          sessionStorage.setItem('CLIENT_PRESECRET_KEY', this.clientPreSecretKey);
          console.log("done");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // get token before login
  private async getTokenBeforeLogin(key: number) {
    try {
      // calling service to get token before login
      const response = await firstValueFrom(this.authLoginService.getTokenBeforeLogin(key));
      const tokenBeforeLogin = response['key'];

      // storre generated token in session storage
      sessionStorage.setItem('TOKEN', tokenBeforeLogin);
      console.log(sessionStorage.getItem("TOKEN"));

    } catch (error) {
      console.log('Error:', error);

    }
  }


  // login
  login() {

    this.encryptedCredentials.username = this.rsaService.encryptDataWithRSA(this.credentials.username, this.publicKey);
    this.encryptedCredentials.password = this.rsaService.encryptDataWithRSA(this.credentials.password, this.publicKey);

    this.authLoginService.login(this.encryptedCredentials, this.keyId).subscribe(
      (response) => {
        console.log(response);
        const data: Data = response;
        const tokenBeforeLogin = data.key
        const employeeData = data.data;
        const employeeId = employeeData.employeeId;
        sessionStorage.setItem('TOKEN', tokenBeforeLogin);

        if (employeeData) {
          sessionStorage.setItem('companyId', employeeData.companyId.toString())
          sessionStorage.setItem('employeeId', employeeId.toString());
          sessionStorage.setItem('empData', JSON.stringify(employeeData));

          if (this.credentials.username == "superadmin") {
            this.router.navigate(['/company']);

          } else {
            if (employeeData.admin == true) {
              $('#exampleModal').modal('show');
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
        } else {
          // Display a dialog box with the message "Invalid Details" in case of login failure.
          this.dialogueBoxService.open('Seems that either username or password is incorrect.', 'warning');
        }
      },
      (error) => {
        console.log(error);
        this.dialogueBoxService.open('Seems that either username or password is incorrect.', 'warning');
      }
    );
  }


}
