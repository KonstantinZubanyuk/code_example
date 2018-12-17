import { Http } from '@angular/http'
import { Inject, Injectable } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader } from '@ngx-translate/core';
import { UrlService } from './url.service';

export class TranslateLoaderService {

    static createTranslateHttpLoader(http: Http, urlService: UrlService): TranslateHttpLoader {
        return new TranslateHttpLoader(http, urlService.baseUrl + '/assets/i18n/', '.json');
    }
}