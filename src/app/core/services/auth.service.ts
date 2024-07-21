import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/LoginModel';
import { TokenModel } from '../models/token';
import { Router } from '@angular/router';

const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;
    public currentUser$: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;
    jwtService: JwtHelperService = new JwtHelperService();
    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser$ = this.currentUserSubject.asObservable();
     }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, first_name: string, password: string) {        
        // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });

        // Register Api
        return this.http.post(AUTH_API + 'signup', {
            email,
            first_name,
            password,
          }, httpOptions);
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(payload: LoginModel) {
        return this.http
          .post(AUTH_API + 'authenticate', payload)
          .pipe(
            map((data) => {
              var token = data as TokenModel;
              console.log(token)
              const connectedUser = {
                
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
                tokenType: 'Bearer'
            };
            console.log(connectedUser)
              localStorage.setItem('token', JSON.stringify(connectedUser.accessToken));
              localStorage.setItem('currentUser', JSON.stringify(connectedUser));
                
              var userInfo = this.jwtService.decodeToken(token.accessToken!!) as User;
    
              this.currentUserSubject.next(userInfo);
             
              this.router.navigate(['/']); 
              return data;
            }),
            catchError((error) => {
              console.log(error);
              const errorMessage = error.error.errorMessage || 'An unknown error occurred';
              return throwError(errorMessage);
            })
          );
      }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        return getFirebaseBackend()!.getAuthenticatedUser();
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        // return getFirebaseBackend()!.logout();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null!);
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

}

