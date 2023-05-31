import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService implements HttpInterceptor {

  constructor(private userService: UserService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const hasToken = this.userService.getToken()
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IjEyIiwicHN3IjoiMSIsImlhdCI6MTY4MzY0OTU0Nn0.kuxyW4oPow2ow1NAU2TjSXewkIyC-qtujkYzA6fa6DI"

    if (hasToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + hasToken)
      })

      return next.handle(cloned)
    } else {
      return next.handle(req)
    }
  }
}
