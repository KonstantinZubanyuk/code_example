import { Component, OnInit, OnDestroy, Input, Output, AfterViewInit, ViewEncapsulation, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { GetQuoteService, Country } from '../../../api/getquote.service';

const isBrowser = typeof window !== 'undefined';
declare const jQuery: any;

@Component({
    selector: 'phone-input',
    templateUrl: './phone-input.component.html',
    styleUrls: ['./phone-input.component.min.css'],
    encapsulation: ViewEncapsulation.None
})
export class PhoneInputComponent implements OnInit, AfterViewInit, OnDestroy {
    public phoneInputElement: any;
    private countriesFromApi: Country[] = [];

    @Input()
    id = Math.floor(Math.random() * 10000000).toString(16);

    countryPhoneCode: string = '';

    @Input()
    phonePrefix: string = '';

    @Input()
    phoneNumber: string = '';

    @Input()
    phonePrefixPlaceholder: string = '';

    @Input()
    phoneNumberPlaceholder: string = '';

    @Input()
    phoneCountryLabel: string = 'Country phone code';

    @Input()
    phoneAreaLabel: string = 'Phone prefix';

    @Input()
    phoneNumberLabel: string = 'Phone number';

    @Input()
    phoneAreaInvalid: string = 'Please select prefix';

    @Input()
    phoneNumberInvalid: string = 'Please enter phone number';

    @Input()
    withLabel: boolean = true;

    @Input()
    numberType = 'FIXED_LINE_OR_MOBILE';
    
    @Output()
    onInput: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('phoneinput') phoneinput: any;

    constructor(private elementRef: ElementRef, private getQuoteApiService: GetQuoteService) {
        
    }

    ngOnInit(): void {
        // Fetch countries from DS API
        this.getQuoteApiService.GetCountries().subscribe(countries => {
            this.countriesFromApi = countries;
        });
    }

    ngAfterViewInit(): void {
        if (!isBrowser) {
            return;
        }

        if (isBrowser) {
            this.initPhoneInput().then((data: any) => {
                this.phoneInputElement.on("countrychange", (e: any, countryData: any) => {
                    this.onPhoneInput();
                });
            });
        }
    }

    ngOnDestroy(): void {
        this.phoneInputElement.intlTelInput('destroy');
    }

    initPhoneInput() {
        return new Promise((resolve, reject) => {
            this.phoneInputElement = jQuery(this.elementRef.nativeElement).find('#phonecountry-' + this.id);
            this.phoneInputElement.intlTelInput({
                initialCountry: 'auto',
                geoIpLookup: (callback: any) => {
                    return new Promise(() => {
                        callback('il');
                        resolve();
                    });
                },
                preferredCountries: ['il'],
                separateDialCode: true,
                placeholderNumberType: this.numberType
            });
        });
    }

    onPhoneInput() {
        let selectedCountryData = this.phoneInputElement.intlTelInput('getSelectedCountryData');

        let selectedCountyFromApi = this.countriesFromApi.filter(country => {
            return country.countryPhoneCode === selectedCountryData.dialCode;
        })[0];

        if (selectedCountyFromApi && selectedCountyFromApi.countryID) {
            this.countryPhoneCode = String(selectedCountyFromApi.countryID);
        }

        if (this.countryPhoneCode && this.phonePrefix && this.phoneNumber) {
            this.onInput.next({
                countryPhoneCode: this.countryPhoneCode,
                phonePrefix: this.phonePrefix,
                phoneNumber: this.phoneNumber
            });
        }
    }

    get countryPhoneCodeInput(): string {
        return this.countryPhoneCode;
    }

    @Input()
    set countryPhoneCodeInput(value: string) {
        if (value && this.countryPhoneCode !== value) {
            this.countryPhoneCode = value;

            setTimeout(() => {
                let countryData = this.phoneInputElement.intlTelInput.getCountryData();
                let currentCountryCode = this.countryPhoneCode.replace('+', '');
                let country = countryData.filter((c: any) => c.dialCode === currentCountryCode)[0];
                this.phoneInputElement.intlTelInput('setCountry', country.iso2);
            }, 0);
        }
    }

    get phonePrefixInput(): string {
        return this.phonePrefix;
    }

    set phonePrefixInput(value: string) {
        this.phonePrefix = value;
        this.onPhoneInput();
    }

    get phoneNumberInput(): string {
        return this.phoneNumber;
    }

    set phoneNumberInput(value: string) {
        this.phoneNumber = value;
        this.onPhoneInput();
    }
}
