import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MapService {
    private httpClient: Http;
    baseUrl: string;

    constructor(@Inject('BASE_URL') originUrl: string,
        private translateService: TranslateService,
        http: Http) {
        this.baseUrl = originUrl;
        this.httpClient = http;
    }

    public GetRelocationPoints(): Observable<RelocationPoint[]> {
        var requestUrl = this.baseUrl + "api/" + this.translateService.currentLang + "/map";
        
        return this.httpClient.get(requestUrl).map((response: Response) => {
            return response.json() as RelocationPoint[];
        }).catch((err: any) => {
            return Observable.throw(err.toString());
        });
    }
}

export interface RelocationPoint {
    id: number;
    name : string;
    description: string;
    link: string;
    image: string;
    latitude: number;
    longitude: number;
}