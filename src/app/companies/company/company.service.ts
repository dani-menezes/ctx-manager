import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Company } from './company.model'

import { BACKEND_API } from '../../app.backend-api'

@Injectable()
export class CompanyService {

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

    findAll(search?: string): Observable<Company[]> {
        let params: HttpParams = undefined;
        if (search) { 
            params = new HttpParams().append('q', search)
        }
        return this.http.get<Company[]>(`${BACKEND_API}/company`, {headers: this.createAuthorizationHeader(), params: params})
    }

    findById(id: string): Observable<Company> {
        return this.http.get<Company>(`${BACKEND_API}/company/${id}`)
    }

    save(company: Company): Observable<Company> {
        return this.http.post<Company>(`${BACKEND_API}/company/`, company)
    }

    update(company: Company): Observable<Company> {
        if (company.id !== undefined) {
            return this.http.put<Company>(`${BACKEND_API}/company/${company.id}`, company)
        }
    }

    delete(id: number): Boolean {
        this.http.delete<number>(`${BACKEND_API}/company/${id}`).subscribe(resp => console.log(resp))
        return true;
    }

 }