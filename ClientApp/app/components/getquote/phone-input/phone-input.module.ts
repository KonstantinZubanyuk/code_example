import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PhoneInputComponent } from './phone-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        PhoneInputComponent
    ],
    exports: [
        PhoneInputComponent
    ],
})

export class PhoneInputModule {

}