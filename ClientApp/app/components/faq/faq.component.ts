import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaqService, IFaqCategory, FaqItem } from '../../api/faq.service';
import { faqJS, faqCollapseAccordion } from './js/faq';

const isBrowser = typeof window !== 'undefined';

@Component({
    selector: 'faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.min.css'],
    encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit {
    faqCategories: IFaqCategory[] = [];
    faqs: FaqItem[] = [];
    id: number = 0;
    isExistFaq = true;

    constructor(private route: ActivatedRoute,
        private faqService: FaqService) {

        if (!isBrowser) {
            return;
        }

        route.params.subscribe(params => {
            this.id = +params['id'];
            this.isExistFaq = false;

            faqService.GetFaqsByCategory(this.id).subscribe(faqs => {
                this.faqs = faqs;
                this.isExistFaq = true;
            });
        });
    }

    ngOnInit() {
        if (!isBrowser) {
            return;
        }

        this.faqService.GetFaqCategories().subscribe(categories => {
            this.faqCategories = categories;

            if (isBrowser) {
                setTimeout(() => faqJS(), 300);
            }
        });
    }

    onClickCard() {
        faqCollapseAccordion();
    }
}
