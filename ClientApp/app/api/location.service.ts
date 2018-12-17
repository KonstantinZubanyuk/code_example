import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LocationService {
    private httpClient: Http;
    private baseUrl: string;

    constructor(@Inject('BASE_URL') originUrl: string,
        private translateService: TranslateService,
        http: Http) {
        this.baseUrl = originUrl;
        this.httpClient = http;
    }

    public GetLocationInfo(id: number): Observable<LocationInfo> {
        var requestUrl = this.baseUrl + "api/" + this.translateService.currentLang + "/location/" + id.toString();

        return this.httpClient.get(requestUrl).map((response: Response) => {
            return response.json() as LocationInfo;
        }).catch((err: any) => {
            return Observable.throw(err.toString());
        });
    }
}

export interface LocationInfo {
    id: number;
    banner: string;
    title: string;
    subtitle: string;
    section1: LocationSection;
    section2: LocationSection;
    thumbnails: LocationThumbnail[];
}

export interface LocationSection {
    image: string;
    title: string;
    description: string;
}

export interface LocationThumbnail {
    icon: string;
    title: string;
    description: string;
}