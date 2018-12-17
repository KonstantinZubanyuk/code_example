import { Component, ViewEncapsulation } from '@angular/core';
import { error404JS } from './js/error404.js';

const isBrowser = typeof window !== 'undefined';

@Component({
    selector: 'error404',
    templateUrl: './error404.component.html',
    styleUrls: ['./error404.component.min.css'],
    encapsulation: ViewEncapsulation.None
})
export class error404Component {

    ngOnInit(): void {

        if (!isBrowser) {
            return;
        }

        error404JS();

    }
}
