Angular intro;
---------------

install Node.js and NPM: 
https://nodejs.org/en/

Install Angular
$> npm install -g @angular/cli@next

$> cd (into your development directory)

————————————————

$> ng new companalystclient

? Would you like to add Angular routing? (y/N) y

? Which stylesheet format would you like to use? (Use arrow keys)
❯ CSS
…
…
✔ Packages installed successfully.
    Successfully initialized git.

$> cd companalystclient

You’ll see that a project directory structure has been created, including a functional webapp

$> ng serve (compiles and runs the generated webapp at localhost:4200)

Open browser on http://localhost:4200

$> cd src/app

In this directory, you can see the top level source code of the web application, especially: 

* app.component.ts - metadata for the top-level component. “app-root” is the name of the selector used in HTML that contains your Angular application. “templateUrl” is the name of the page template used by the component for visual representation. A “component” is a set of files defining a reusable entity representing a displayable HTML widget. (At least that’s my best way to describe it right now!)

* app.component.html:  The top-level HTML page of your Angular webapp

———————————————


Edit the app.component.html code: 
delete everything in it. Replace it with this:
{{title}}

As soon as you save it, the test harness at port 4200 picks up the change and redisplays the page.

Now you’ll see the value of the “title” field defined in app.component.ts displayed on the top-level page

So now, you’ll see that the “src/app” directory defines a component - the root component, on the top-level page.

——————————


OK, so now lets get the CompAnalyst ApiToken and display it using Angular. (There’s no need to ever actually fetch this to the web browser. I’m only using it as an example, because it’s not bandwidth-limited and you can keep tweaking until you get it to work.)

Command line syntax:
https://angular.io/cli 
https://angular.io/cli/generate 

$> ng generate class model/ApiToken

This creates the boilerplate code in a directory called “model”. 

Edit app-token.ts as follows:
export class ApiToken {
	token: string;
	expire_date: string;
}
 
—————————————
$> ng generate service services/TokenService
This creates the code needed to access the SpringBoot application and fetch JSON data

Edit the token-service.service.ts file as follows:
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiToken } from '../model/api-token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenServiceService {

  apiTokenUrl: string;

  constructor(private http: HttpClient) {
  	this.apiTokenUrl = 'http://lizweb-dev:8080/getapitoken';   <— change to ‘localhost’ if running Springboot locally!
  }

  public getToken(): Observable<ApiToken> {
    return this.http.get<ApiToken>(this.apiTokenUrl);
  }
}

——————————
Generate a widget to display the API token:
$> ng generate component components/GetApiToken 

Edit the app.component.html file as follows:
{{title}}
<app-get-api-token>
</app-get-api-token>

Now you’ll see the default HTML for your new GetApiToken component rendered on the top-level page.
http://localhost:4200

———————————


Edit the get-api-token.component.ts file as follows:
import { Component, OnInit } from '@angular/core';
import { ApiToken } from '../../model/api-token';
import { TokenServiceService } from '../../services/token-service.service';

@Component({
  selector: 'app-get-api-token',
  templateUrl: './get-api-token.component.html',
  styleUrls: ['./get-api-token.component.css']
})
export class GetApiTokenComponent implements OnInit {

  public apiToken: ApiToken;

  constructor(private tokenService: TokenServiceService) { }

  ngOnInit(): void {
  this.tokenService.getToken().subscribe(data => {
      this.apiToken = data;
    });
  }

}

————————————

Edit the get-api-token.component.html file as follows:
<p>Angular GUI</p>
Token: {{apiToken.token}}
<br>
Expires On: {{apiToken.expire_date}}

——————————

Import the HttpClientModule from Angular.
Edit the app.module.ts file as follows:
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GetApiTokenComponent } from './components/get-api-token/get-api-token.component';


@NgModule({
  declarations: [
    AppComponent,
    GetApiTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
