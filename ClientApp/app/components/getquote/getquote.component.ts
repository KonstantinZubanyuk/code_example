import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { GetQuoteStep, GetQuoteForm, GetQuoteFormService, Passenger, PassengerType, Gender } from '../../services/getquoteform.service';
import { GetQuoteService } from '../../api/getquote.service';
import { initAutocomplete } from './js/getquote.autocomplete';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, Form, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

const isBrowser = typeof window !== 'undefined';

@Component({
    selector: 'form-getqoute',
    templateUrl: './getquote.component.html',
    styleUrls: ['./getquote.component.min.css'],
    encapsulation: ViewEncapsulation.None
})
export class GetQuoteComponent implements OnInit, AfterViewInit {
    isSubmittedGetQuote: boolean = false;
    GetQuoteStep = GetQuoteStep; // Enum alias for html template
    PassengerType = PassengerType; // Enum alias for html template
    Gender = Gender; // Enum alias for html template
    getQuoteForm: GetQuoteForm;
    meChecked: boolean = false;
    partnerChecked: boolean = false;
    kidsChecked: boolean = false;
    getQuoteStep: GetQuoteStep = GetQuoteStep.Destination;

    @Input()
    set step(step: GetQuoteStep | undefined) {
        if (step !== undefined) {
            this.getQuoteStep = step;

            if (this.getQuoteStep === GetQuoteStep.Passengers) {
                this.meChecked = !!this.getQuoteForm.isPassengerTypeExists(PassengerType.Me);
                this.partnerChecked = !!this.getQuoteForm.isPassengerTypeExists(PassengerType.Partner);
                this.kidsChecked = !!this.getQuoteForm.isPassengerTypeExists(PassengerType.Kid);
            }

            if (this.getQuoteStep === GetQuoteStep.PassengersDetails) {

                if (this.meChecked && !this.getQuoteForm.isPassengerTypeExists(PassengerType.Me)) {
                    let me = new Passenger();
                    me.type = PassengerType.Me;

                    this.getQuoteForm.passengers.push(me);
                }

                if (this.partnerChecked && !this.getQuoteForm.isPassengerTypeExists(PassengerType.Partner)) {
                    let partner = new Passenger();
                    partner.type = PassengerType.Partner;

                    this.getQuoteForm.passengers.push(partner);
                }

                if (this.kidsChecked && !this.getQuoteForm.isPassengerTypeExists(PassengerType.Kid)) {
                    let kid = new Passenger();
                    kid.type = PassengerType.Kid;

                    this.getQuoteForm.passengers.push(kid);
                }
            }
        }
    }

    constructor(
        private router: Router,
        private getQuoteApiService: GetQuoteService,
        private getQuoteFormService: GetQuoteFormService,
        private translateService: TranslateService,
    ) {
        this.getQuoteForm = getQuoteFormService.formInstance; // simplify usage on template    

        if (!isBrowser) {
            return;
        }
        this.translateService.onLangChange.subscribe((e: LangChangeEvent) => this.onLangChanged(e));
    }

    ngAfterViewInit(): void {
        if (!isBrowser) {
            return;
        }

        this.updateConutries(this.translateService.currentLang == "he");
    }

    ngOnInit(): void {
        
    }

    passengersAreNotChecked() {
        return !this.meChecked && !this.partnerChecked && !this.kidsChecked;
    }

    passengersDetailsNotFinished() {
        return !this.getQuoteForm.passengers.every((a: Passenger, b: number, c: Passenger[]) => {
            return a.gender !== undefined && a.birthDate !== undefined;
        });
    }

    addPassengerElement() {
        this.getQuoteForm.passengers.push({
            type: undefined,
            gender: undefined,
            birthDate: undefined
        });
    }

    removePassengerElement(item: number) {
        this.getQuoteForm.passengers.splice(item, 1);
    }

    removePassengerElementByType(type: PassengerType) {
        if (!!this.getQuoteForm.isPassengerTypeExists(type)) {
            this.getQuoteForm.passengers = this.getQuoteForm.passengers.filter(passenger => passenger.type !== type);
        }
    }

    // Set step by routing page with step parameter
    moveToStep(getQuoteStep: GetQuoteStep) {
        this.router.navigate(["home", getQuoteStep.valueOf()]);
    }

    getQuote() {
        this.getQuoteForm.language = (this.translateService.currentLang == "he" ? "he-IL" : "en-US");
        this.isSubmittedGetQuote = true;
        this.getQuoteFormService.submittedInstance = this.getQuoteForm;
        this.getQuoteApiService.SubmitGetQuoteForm(this.getQuoteForm).subscribe((result) => {
            if (result.result) {
                this.router.navigate(["products"]);
            }
        });
    }

    getPassengerPlaceholder(type: any): string {
        switch (type) {
            case PassengerType.Me:
                return 'How old are you?';
            case PassengerType.Partner:
                return 'How old is your partner?';
            case PassengerType.Kid:
                return 'How old is your kid?';
            default:
                return 'How old?';
        }
    }

    getValueWithPrefix(passenger: Passenger): string {
        if (passenger.birthDate) {
            let dateOfBirth = passenger.birthDate.toLocaleDateString("en-US",
                { year: 'numeric', month: 'long', day: 'numeric' });

            switch (passenger.type) {
            case PassengerType.Me:
                return 'You: ' + dateOfBirth;
            case PassengerType.Partner:
                return 'Your partner: ' + dateOfBirth;
            case PassengerType.Kid:
                return 'Your kid: ' + dateOfBirth;
            default:
                return dateOfBirth;
            }
        }

        return '';
    }

    onPhoneInput(event: any) {
        this.getQuoteForm.phoneCountry = event.countryPhoneCode;
        this.getQuoteForm.phoneArea = event.phonePrefix;
        this.getQuoteForm.phoneNumber = event.phoneNumber;
    }

    onLangChanged(e: LangChangeEvent): any {
        if (e.lang == "he") {
            this.updateConutries(true);
        }
        else {
            this.updateConutries(false);
        }
    }

    private updateConutries(isHebrew: boolean) {
        if (!isBrowser) {
            return;
        }

        // Fetch countries from DS API
        this.getQuoteApiService.GetCountries().subscribe(countries => {
            let countryNames = [];

            if (isHebrew) {
                countryNames = countries.map(c => c.countryLocalName);
            }
            else {
                countryNames = countries.map(c => c.countryName);
            }

            if (this.getQuoteStep == GetQuoteStep.Destination) {
                initAutocomplete("destination-input", countryNames);
            }
            else if (this.getQuoteStep == GetQuoteStep.Origin) {
                initAutocomplete("origin-input", countryNames);
            }
        });
    }
}