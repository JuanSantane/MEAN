import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { User } from '../shared/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private rootUrl = 'http://localhost:3000/';
  private userLogged: any;
  private token: any;

  constructor(private http: HttpClient) { }

  public singup(user: User){
    const headersValue =  new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post(
      this.rootUrl + 'auth/signup',
      user,
      {headers: headersValue})
    .map((response: Response) => {
      const resp: any = response;
      console.log(resp);
      this.userLogged = resp.user;
      this.token = resp.token; 
      return response;
    }
    );
  }
  public signin(user: any){
    const headersValue =  new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post( this.rootUrl + 'auth/signin', 
      user, {headers: headersValue})
      .map(
        res => {
          console.log(res);
        }
      )
      .catch(err => {
        return Observable.throw(err);
      });
  }

  
  public getToken(): any{
    return this.token;
  }
  public isLogged(): boolean{
    return this.userLogged != null && this.token != null;
  }

  public printstatus(){
    console.log('>> USER.SERVICE STATUS <<');
    console.log({
      token: this.token,
      user: this.userLogged,
      logged: this.isLogged()
    });
  }


}
