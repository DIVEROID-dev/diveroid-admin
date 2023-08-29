import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Apiurl } from '../route';
import { LoaderService } from './loader.service';
import { catchError, finalize } from 'rxjs/operators';
const API_URL = '/api/';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    constructor(public http: HttpClient) {}
    
    //  customize the error handling here
    private handleError(error: HttpErrorResponse) {
        return throwError(
            error.error.message ? error.error.message : error.message
        );
    }

    // Variable and constructor declaration ends
    get(url: string, data?: any): Observable<any> {
        return this.http
            .get(`${API_URL}${url}`, { params: data })
            .pipe(catchError(this.handleError));
    }
    post(url: string, data: any): Observable<any> {
        return this.http
            .post(`${API_URL}${url}`, data)
            .pipe(catchError(this.handleError));
    }
    put(url: string, data: any): Observable<any> {
        return this.http
            .put(`${API_URL}${url}`, data)
            .pipe(catchError(this.handleError));
    }
    delete(url: string): Observable<any> {
        return this.http
            .delete(`${API_URL}${url}`)
            .pipe(catchError(this.handleError));
    }
}
