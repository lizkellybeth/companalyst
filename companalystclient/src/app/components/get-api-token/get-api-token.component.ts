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
