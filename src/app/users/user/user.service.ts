import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { User } from './user.model'

import { BACKEND_API } from '../../app.backend-api'

@Injectable()
export class UserService {

    private _authToken: string;
    private __headers: HttpHeaders;

    constructor(private http: HttpClient){}

    createAuthorizationHeader(): HttpHeaders {
        if (this.__headers === null) {
          const headers = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', this. _authToken || '');
          this.__headers= headers;
        }
        return this.__headers;
     }

    findAll(search?: string): Observable<User[]> {
        let params: HttpParams = undefined;
        if (search) { 
            params = new HttpParams().append('q', search)
        }
        return this.http.get<User[]>(`${BACKEND_API}/user`, {headers: this.createAuthorizationHeader(), params: params})
    }

    findById(id: string): Observable<User> {
        return this.http.get<User>(`${BACKEND_API}/user/${id}`)
    }

    save(user: User): Observable<User> {
        return this.http.post<User>(`${BACKEND_API}/user/`, user)
    }

    update(user: User): Observable<User> {
        if (user.id !== undefined) {
            return this.http.put<User>(`${BACKEND_API}/user/${user.id}`, user)
        }
    }

    delete(id: number): Boolean {
        this.http.delete<number>(`${BACKEND_API}/user/${id}`).subscribe(resp => console.log(resp))
        return true;
    }

 }