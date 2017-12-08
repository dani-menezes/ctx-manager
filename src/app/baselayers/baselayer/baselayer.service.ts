import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Baselayer } from './baselayer.model'

import { BACKEND_API } from '../../app.backend-api'

@Injectable()
export class BaselayerService {

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

    findAll(search?: string): Observable<Baselayer[]> {
        let params: HttpParams = undefined;
        if (search) { 
            params = new HttpParams().append('q', search)
        }
        return this.http.get<Baselayer[]>(`${BACKEND_API}/baselayer`, {headers: this.createAuthorizationHeader(), params: params})
    }

    findById(id: string): Observable<Baselayer> {
        return this.http.get<Baselayer>(`${BACKEND_API}/baselayer/${id}`)
    }

    save(baselayer: Baselayer): Observable<Baselayer> {
        return this.http.post<Baselayer>(`${BACKEND_API}/baselayer/`, baselayer)
    }

    update(baselayer: Baselayer): Observable<Baselayer> {
        if (baselayer.id !== undefined) {
            return this.http.put<Baselayer>(`${BACKEND_API}/baselayer/${baselayer.id}`, baselayer)
        }
    }

    delete(id: number): Boolean {
        this.http.delete<number>(`${BACKEND_API}/baselayer/${id}`).subscribe(resp => console.log(resp))
        return true;
    }

 }