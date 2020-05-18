import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { catchError, delay } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastService: ToastService) { }

    intercept(req: HttpRequest<any>,
              next: HttpHandler):
        Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
           // delay(1000),
            catchError(error => {
                if (error) {
                    if (error.status === 400) {
                        if (error.error.errors) {
                            throw error.error;
                        } else {
                            this.toastService.show('WARNING ### 400 ERROR', { classname: 'bg-danger text-light', delay: 3000 });
                        }
                    }
                    if (error.status === 401) {
                        this.toastService.show('WARNING ### 401 ERROR', { classname: 'bg-danger text-light', delay: 3000 });
                    }
                    if (error.status === 404) {
                        this.router.navigateByUrl('/not-found');
                    }
                    if (error.status === 500) {
                        const navigationExtras: NavigationExtras = {state: {error: error.error}};
                        this.router.navigateByUrl('/server-error', navigationExtras);
                    }
                }
                return throwError(error);
            })
        );
    }
}


