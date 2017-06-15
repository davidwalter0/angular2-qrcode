import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/filter';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { MdlSnackbarService } from 'angular2-mdl';
import { AbstractComponent } from '../abstract.component';

import { AngularFireAuth } from "angularfire2/angularfire2";
import { AuthGuard } from '../auth.service';

import { environment } from '../../environments/environment';
import { ValidationService } from './validation.service';
import { JsonResponse } from './json.response';

@Component({
  selector: 'authenticated',
  styleUrls: [
    'authenticated.component.css',
  ],
  templateUrl: 'authenticated.component.html'
})

export class AuthenticatedComponent implements OnInit {
  testing: boolean = environment.TESTING;
  host: string = environment.QRCODE_GENERATOR_HOST;
  port: string = environment.QRCODE_GENERATOR_PORT;
  issuer: string = environment.ISSUER;
  https: boolean = environment.HTTPS;

  errorMessage: string;

  btnValidatedText: string = "Validate";
  validation_disabled: boolean = false;
  validated: boolean = false;
  validationURL: string = "";
  validationResponse: JsonResponse;

  token: string = ""
  PROTOCOL: string = "https";
  url: string = `${this.PROTOCOL}://${this.host}:${this.port}/?data=`;
  default_url: string = "${this.PROTOCOL}://localhost:8081/?data=";

  account: string = "";
  name: string = "";
  image: string = "";

  text: string = "";
  qrQuery: string = "";
  qrcode: any;

  userInfo: boolean = true;

  constructor(public authguard: AuthGuard,
    private http: Http,
    private validationService: ValidationService) {
    console.log(authguard);
    if (this.testing) {
      this.issuer = "example.com";
      this.account = "uid@example.com";
      this.name = "User Name";
      this.image = "src/app/sphere/favicon.ico";
    } else {
      this.account = this.authguard.email;
      this.name = this.authguard.name;
      this.image = this.authguard.image;
    }
    if (!this.https) {
      this.PROTOCOL = "http";
    }
  }

  public ngOnInit() {
    if (!this.https) {
      this.PROTOCOL = "http";
    }

    this.url = `${this.PROTOCOL}://${this.host}:${this.port}`;
    this.default_url = "${this.PROTOCOL}://localhost:8081";

    if (this.host == undefined || this.port == undefined) {
      this.url = this.default_url;
    }
    console.log("Url: ", this.url);
  }

  public encode() {
    let text: string = `${this.url}/?account=${this.account}&issuer=${this.issuer}`;
    console.log(text)
    this.qrQuery = text;
  }

  public success(): boolean {
    return true;
  }

  public validating(): boolean {
    return true;
  }

  public validate() {
    let url: string = `${this.url}/validate/?account=${this.account}&issuer=${this.issuer}&token=${this.token}`;
    if (this.testing) {
      this.validationResponse = <JsonResponse>{
        Account: "uid@example.com",
        Issuer: "example.com",
        Token: "123456",
        Status: "Successfully validated code",
      }
    } else {
      this.validationService.validate(url).subscribe(
        response => this.validationResponse = response
      );
    }
  }
}
