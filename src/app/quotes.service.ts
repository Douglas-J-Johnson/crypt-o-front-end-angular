import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private quotesBaseURL = 'https://finnhub.io/api/v1/crypto/';
  private requestOptions: any;

  constructor(private httpClient: HttpClient, private httpHeaders: HttpHeaders) {
    httpHeaders = httpHeaders.append('X-Finnhub-Token', '');
    this.requestOptions = {headers: httpHeaders};
  }

  getExchanges() {
    return this.httpClient.get(`${this.quotesBaseURL}exchange?`, this.requestOptions);
  }

  getSymbols(exchange: string) {
    return this.httpClient.get(`${this.quotesBaseURL}symbol?exchange=${exchange}`, this.requestOptions);
  }

  getCandles() {
    return this.httpClient.get(`${this.quotesBaseURL}candle?`, this.requestOptions);
  }
}
