import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from '../shared/user';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as jwt from 'jsonwebtoken';  // https://github.com/auth0/node-jsonwebtoken

@Injectable()
export class UserService {

  private rootUrl = 'http://localhost:3000/';
  private userLogged: any;
  private token: any;
  private SECRET_KEY_TOKEN = 'MyWonderApp :D';
  private TOKEN_KEY = 'DMA_uthorization_token';
  newUserLogged= new Subject();

  constructor(private http: HttpClient) {
    const tokenStored = this.getStoredToken();
    if (tokenStored) {
      this.token = tokenStored;
      const decoded = jwt.decode(this.token, this.SECRET_KEY_TOKEN);
      if (decoded) {
        console.log('loking for token for user with id ' + decoded.sub);
        this.getUser(decoded.sub).subscribe((user: any) => {
          this.userLogged = user;
          this.newUserLogged.next(this.userLogged);
        },
      (error) => {console.log(error); },
      () => { }
    );
    }
  }
}

  public singup(user: User) {
    const headersValue =  new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(
      this.rootUrl + 'auth/signup',
      user,
      {headers: headersValue})
    .map((response: any) => {
      console.log(response);
      this.userLogged = response.user;
      this.token = response.token;
      this.newUserLogged.next(this.userLogged);
      localStorage.setItem(this.TOKEN_KEY, this.token);
      this.printstatus();
      return response;
    }
    );
  }
  public signin(user: any) {
    const headersValue =  new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post( this.rootUrl + 'auth/signin',
      user, {headers: headersValue})
      .map((response: any) => {
        this.token = response.token;
        this.userLogged = response.user;
        this.newUserLogged.next(this.userLogged);
        localStorage.setItem(this.TOKEN_KEY, this.token);
        this.printstatus();
        return response;
      })
      .catch(err => {
        return Observable.throw(err);
      });
  }

  public getUser(id: string) {
    return this.http.get(this.rootUrl + 'auth/' + id )
    .catch(err => {
      return Observable.throw(err);
    });
  }

  public logout(): void {
    console.log('Cerrando sesion del token' + this.token);
    this.token = null;
    this.userLogged = null;
    localStorage.removeItem(this.TOKEN_KEY);
    this.newUserLogged.next(null);
  }

  public getToken(): any {
    return this.token;
  }

  private getStoredToken() {
    console.log('looking for token un local storage');
    const storedToken: string = localStorage.getItem(this.TOKEN_KEY);
    if (!storedToken) {
      // throw new Error('no token found');
      console.log('token no found');
      return null;
    }
    console.log('token was found ' + JSON.stringify(storedToken));
    return storedToken;
  }

  public isLogged(): boolean {
    return this.userLogged != null && this.token != null;
  }

  public printstatus() {
    console.log('>> USER.SERVICE STATUS <<');
    console.log({
      token: this.token,
      user: this.userLogged,
      logged: this.isLogged()
    });
  }


}
