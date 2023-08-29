import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
const API_URL = "/api/";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private http: HttpClient) { }
  get(url: string,data?: any): Observable<any> {
    return this.http.get(`${API_URL}${url}`,  { params: data });
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(`${API_URL}${url}`, data);
  }
  put(url: string, data: any): Observable<any> {
    return this.http.put(`${API_URL}${url}`, data);
  }
  delete(url:string): Observable<any> {
    return this.http.delete(`${API_URL}${url}`);
  }
  confirmDelete(): Promise<boolean> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
    return swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      showCancelButton: true
    })
    .then(result => {
      console.log('result: ', result);
      return result.isConfirmed;
    });
  }
}
