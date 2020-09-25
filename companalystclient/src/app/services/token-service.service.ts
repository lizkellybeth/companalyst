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
  	this.apiTokenUrl = 'http://localhost:8080/getapitoken';
  }

  public getToken(): Observable<ApiToken> {
    return this.http.get<ApiToken>(this.apiTokenUrl);
  }
}
