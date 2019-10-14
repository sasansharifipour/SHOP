import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { catchError } from 'rxjs/operators';
import { OwlDialogService } from 'owl-ng';
import { InlineLoginFormComponent } from '../users/inline-login-form/inline-login-form.component';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router, private dialogService: OwlDialogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let currentUserToken: string = this.userService.currentUserTokenValue();

    if (currentUserToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken}`
        }
      });


    }

    return next.handle(request).pipe(catchError((error, caught) => {

      this.handleAuthError(request, error);
      return of(error);
    }) as any);

  }


  private handleAuthError(request: HttpRequest<any>,err: HttpErrorResponse): Observable<any> {
    
    if (err.status === 401) {
      localStorage.removeItem('auth_token');
      this.openDialog_addUser(this.router.url);

      return of(err.message);
    }
    throw err;
  }


  public openDialog_addUser(url: string): void {
    const dialogRef = this.dialogService.open(InlineLoginFormComponent, {
      width: '600px',
      dialogClass: 'dummy-dialog',
      data: { url: url },
      transitionX: 0,
      transitionY: 0,
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      
    });
  }
}

