import { Injectable, Inject } from '@angular/core';

@Injectable()
export class UrlService {
    constructor(@Inject('BASE_URL') public baseUrl: string) {

    }
}