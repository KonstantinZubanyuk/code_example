import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DatepickerInputComponent } from './datepicker-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        DatepickerInputComponent
    ],
    exports: [
        DatepickerInputComponent
    ],
})

export class DatepickerInputModule {

}