import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { appJS } from './js/app';

const isBrowser = typeof window !== 'undefined';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.min.css']
})
export class AppComponent implements OnInit {
    
    currentWindow: Window | undefined;

    ngOnInit(): void {
        if (!isBrowser) {
            return;
        }

        appJS();

        this.currentWindow = window;
        //this.router.routeReuseStrategy.shouldReuseRoute = function () {
        //    return false;
        //};
        this.subscribeNavigationEvents(this.router);
    }

    constructor(
        private router: Router,
        private translate: TranslateService) {
        const defaultReuseFunc = router.routeReuseStrategy.shouldReuseRoute;
        
        router.routeReuseStrategy.shouldReuseRoute = (future, curr): boolean => {
            let reuse = future.queryParams["lang"] === undefined;
            let defaultReuse = defaultReuseFunc(future, curr);
            return defaultReuse && reuse;
        };

        translate.addLangs(["en", "he"]);
        translate.setDefaultLang("en");
        translate.use("en");
        translate.onLangChange.subscribe((e: LangChangeEvent) => this.onLangChanged(e));
    }

    subscribeNavigationEvents(router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.currentWindow !== undefined
                    && !event.url.includes("/faq/")
                    && !event.url.includes("/home")) {
                    this.currentWindow.scrollTo(0, 0);
                }
            }
        });
    }

    onLangChanged(e: LangChangeEvent): any {
        if (!isBrowser) {
            return;
        }

        this.router.navigate([this.router.url], {
            replaceUrl: true,
            queryParams: {
                lang: e.lang
            }
        });
    }
}
