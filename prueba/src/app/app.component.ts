import { Component } from '@angular/core';
import { NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prueba';
  showFiller = false;
  showNav = false;

  constructor(private OAuthService: OAuthService, private router: Router) {
    this.configure();
  }


  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/realms/Prueba',
    redirectUri: window.location.origin,
    clientId: 'front',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.OAuthService.configure(this.authConfig);
    this.OAuthService.tokenValidationHandler = new NullValidationHandler();
    this.OAuthService.setupAutomaticSilentRefresh();
    this.OAuthService.loadDiscoveryDocument().then(() => this.OAuthService.tryLogin())
    }

  login(): void {
    this.OAuthService.initLoginFlow();
  }

  logout(): void {
    this.OAuthService.logOut();
  }

}
