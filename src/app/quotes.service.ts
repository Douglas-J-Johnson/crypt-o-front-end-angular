import { apiKeys } from '../api-keys';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private quotesBaseURL = 'https://finnhub.io/api/v1/crypto/';
  private apiKey = apiKeys.finnhubAPIKey;

  constructor(private httpClient: HttpClient) {
  }

  getExchanges(): Observable<any> {
    return this.httpClient.get(`${this.quotesBaseURL}exchange?token=${this.apiKey}`);
  }

  getSymbols(exchange: string): Observable<any> {
    return this.httpClient.get(`${this.quotesBaseURL}symbol?exchange=${exchange}&token=${this.apiKey}`);
  }

  getCandles(): Observable<any> {
    return this.httpClient.get(`${this.quotesBaseURL}candle?`);
  }
}
