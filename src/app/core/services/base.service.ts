import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const API_URL = "/api";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }
  get(url: string) {
    return new Promise(async (resolve, reject) => {
      return this.http
        .get(`${API_URL}` + url)
        .subscribe({
          next: (getresponse) => {
            resolve(getresponse);
          },
          error: (err) => {
            console.log('err: ', err);
            console.log(err as string);
          },
        });
    });
  }
}
