import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Plugin } from './plugin.model'

import { BACKEND_API } from '../../app.backend-api'

@Injectable()
export class PluginService {

    constructor(private http: HttpClient){}

    findAll(search?: string): Observable<Plugin[]> {
        let params: HttpParams = undefined;
        if (search) { 
            params = new HttpParams().append('q', search)
        }
        return this.http.get<Plugin[]>(`${BACKEND_API}/plugin`, {params: params})
    }

    findById(id: string): Observable<Plugin> {
        return this.http.get<Plugin>(`${BACKEND_API}/plugin/${id}`)
    }

    save(plugin: Plugin): Observable<Plugin> {
        return this.http.post<Plugin>(`${BACKEND_API}/plugin/`, plugin)
    }

    update(plugin: Plugin): Observable<Plugin> {
        if (plugin.id !== undefined) {
            return this.http.put<Plugin>(`${BACKEND_API}/plugin/${plugin.id}`, plugin)
        }
    }

    delete(id: number): Boolean {
        this.http.delete<number>(`${BACKEND_API}/plugin/${id}`).subscribe(resp => console.log(resp))
        return true;
    }

 }