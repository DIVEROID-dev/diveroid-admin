import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";

import { environment } from "../../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (environment.defaultauth === "firebase") {
//       const currentUser = this.authenticationService.currentUser();
//       if (currentUser && currentUser.token) {
//         request = request.clone({
//           setHeaders: {
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//         });
//       }
//     } else {
//       // add authorization header with jwt token if available
//       const currentUser = this.authService.currentUserValue;
//       if (currentUser && currentUser.token) {
//         request = request.clone({
//           setHeaders: {
//             Authorization: `Bearer ${currentUser.token}`,
//           },
//         });
//       }
//     }
//     return next.handle(request);
//   }
  // new code
  intercept = (
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> => {
    const idToken = localStorage.getItem("token");
    const cloned = request.clone({
      setHeaders: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return next.handle(cloned);
  };
}