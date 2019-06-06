import {
  environment,
  OMDB_URL,
  OMDB_API_KEY
} from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl: string = OMDB_URL;
  private apiKey: string = OMDB_API_KEY;

  constructor(private httpClient: HttpClient) {}

  searchData(title: string, type: SearchType): Observable<any> {
    return this.httpClient
      .get(
        `${this.baseUrl}?s=${encodeURI(title)}&type=${type}&apikey=${
          this.apiKey
        }`
      )
      .pipe(
        map(results => {
          console.log('RAW: ', results);
          return results['Search'];
        })
      );
  }

  getDetails(id) {
    return this.httpClient.get(
      `${this.baseUrl}?i=${id}&plot=full&apikey=${this.apiKey}`
    );
  }
}
