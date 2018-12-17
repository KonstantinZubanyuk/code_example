import { Component, OnInit, Input, Output, AfterViewInit, ViewEncapsulation, EventEmitter, ViewChild, ElementRef } from '@angular/core';

const isBrowser = typeof window !== 'undefined';
declare const jQuery: any;

@Component({
    selector: 'datepicker-input',
    templateUrl: './datepicker-input.component.html',
    styleUrls: ['./datepicker-input.component.min.css'],
    encapsulation: ViewEncapsulation.None
})
export class DatepickerInputComponent implements OnInit, AfterViewInit {
    private input: Date = new Date();

    @Input()
    id = Math.floor(Math.random() * 10000000).toString(16);

    @Input()
    value = '';

    @Input()
    name = '';

    @Input()
    placeholder: string = '';

    @Input()
    minDate = new Date(new Date().getFullYear() - 120, new Date().getMonth(), new Date().getDate());

    @Input()
    maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    get inputModel(): Date {
        return this.input;
    }

    set inputModel(value: Date) {
        this.input = value;
        this.onInput.next(this.input);
    }

    @Output()
    onInput: EventEmitter<Date> = new EventEmitter<Date>();

    @ViewChild('datepicker') datepicker: any;

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        if (!isBrowser) {
            return;
        }

        this.initDatePicker();
    }

    initDatePicker(): void {
        if (isBrowser) {
            jQuery('#' + this.id).datepicker({
                uiLibrary: 'bootstrap4',
                footer: true,
                icons: {
                    rightIcon: '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNyIgdmlld0JveD0iMCAwIDE3IDE3Ij4KICAgIDxwYXRoIGZpbGw9IiMyRDBGNEIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2LjExOSA2LjNILjcwNXY4LjRjMCAuNzE1LjY4MSAxLjQxNSAxLjM5NSAxLjQxNWgxMi42Yy43MTQgMCAxLjQxOS0uNyAxLjQxOS0xLjQxNVY2LjN6TS43MDUgNS42NDRoMTUuNDE0VjMuMjhjMC0uNzE1LS41NDktMS4xNzktMS4yNjMtMS4xNzloLS44NjZ2LjY5M2MtLjAxOC41NjktLjgxLjcwNy0xLjM4LjcwNy0uNTY4IDAtMS4zOTItLjEzOC0xLjQxLS43MDdWMi4xSDUuNTk0di41MzFDNS41NzYgMy4yIDQuNzcgMy41IDQuMiAzLjVzLTEuMzgyLS4xMzgtMS40LS43MDdsLjAzMy0uNjkzaC0uODljLS43MTUgMC0xLjIzOC40NjQtMS4yMzggMS4xOHYyLjM2NHpNMy41MDQgMi4xYzAgLjIyMyAwIC42OTMuNjk2LjY5My42OTcgMCAuNjk3IDAgLjY5Ny0uNjkzdi0uN2MtLjAxMS0uMjE2LS4wMTEtLjczMy0uNzA4LS43MzMtLjQ2NCAwLS42OTIuMjQ1LS42ODUuNzMzdi43em04LjQwMiAwYzAgLjIyMy4wNDMuNjkzLjcwNC42OTMuNjYxIDAgLjY2LS40Ny42NjEtLjY5M2wuMDI5LS43Yy0uMDExLS4yMTYtLjAwNy0uNy0uNzExLS43LS40NyAwLS42OTkuMjMzLS42ODkuN2wuMDA2Ljd6TTE2LjggMy4yOHYxMS42MTdjMCAxLjA3MS0uODcyIDEuOTAzLTEuOTQ0IDEuOTAzSDEuOTQ0Qy44NzIgMTYuOCAwIDE1Ljk2OCAwIDE0Ljg5N1YzLjI4QzAgMi4yMDcuODcyIDEuNCAxLjk0NCAxLjRoLjg4OWMwLS41NzcuNDU5LTEuNCAxLjM1Ni0xLjQuODk4IDAgMS40MDUuODIgMS40MDUgMS40SDExLjJjLjAwNy0uNTc3LjAzMS0xLjQgMS40MS0xLjQgMS4zOCAwIDEuMzguODIgMS4zOCAxLjRoLjg2NmMxLjA3MiAwIDEuOTQ0LjgwNyAxLjk0NCAxLjg4eiIvPgo8L3N2Zz4K"/>'
                },
                value: this.value,
                minDate: this.minDate,
                maxDate: this.maxDate,
                change: (e: any) => {
                    this.inputModel = new Date(this.datepicker.nativeElement.value);
                }
            });
        }
    }
}