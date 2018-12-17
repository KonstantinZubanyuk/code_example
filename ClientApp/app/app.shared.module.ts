import { NgModule, Inject, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgsRevealModule } from 'ng-scrollreveal';
import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BusinessesComponent } from './components/businesses/businesses.component';
import { BrokersComponent } from './components/brokers/brokers.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceBenefitComponent } from './components/serviceBenefit/serviceBenefit.component';
import { PlansComponent } from './components/plans/plans.component';
import { PlansworldwideComponent } from './components/plansworldwide/plansworldwide.component';
import { PlansusaComponent } from './components/plansusa/plansusa.component';
import { FaqComponent } from './components/faq/faq.component';
import { ServiceComponent } from './components/service/service.component';
import { LocationComponent } from './components/location/location.component';
import { GetQuoteComponent } from './components/getquote/getquote.component';
import { ProductsComponent } from './components/products/products.component'
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { error404Component } from './components/error404/error404.component';

import { DatepickerInputModule } from './components/getquote/datepicker-input/datepicker-input.module';
import { PhoneInputModule } from './components/getquote/phone-input/phone-input.module';

import { MapService } from './api/map.service';
import { LocationService } from './api/location.service';
import { FaqService } from './api/faq.service';
import { CostsharingService } from './api/costsharing.service';
import { AboutUsService } from './api/aboutus.service';
import { SalePointService } from './api/salepoint.service';
import { CommunityService } from './api/community.service';
import { TestimonialService } from './api/testimonial.service';
import { FooterService } from './api/footer.service';
import { GetQuoteService } from './api/getquote.service';
import { GetQuoteFormService } from './services/getquoteform.service';
import { TranslateLoaderService } from './services/translateloader.service';
import { UrlService } from './services/url.service';
import { BrokersService } from './api/brokers.service';
import { ContactService } from './api/contact.service';
import { BusinessesService } from './api/businesses.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        BusinessesComponent,
        BrokersComponent,
        AboutusComponent,
        ContactComponent,
        FooterComponent,
        ServiceBenefitComponent,
        PlansComponent,
        PlansworldwideComponent,
        PlansusaComponent,
        FaqComponent,
        ServiceComponent,
        LocationComponent,
        GetQuoteComponent,
        ProductsComponent,
        ProductDetailsComponent,
        error404Component
    ],
    imports: [
        NgsRevealModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDW1svIg1rky7LqrumXpRmEaHVKVRIdDc4'
        }),
        CommonModule,
        HttpModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: TranslateLoaderService.createTranslateHttpLoader,
                deps: [Http, UrlService]
            }
        }),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'home/:step', component: HomeComponent },
            { path: 'businesses', component: BusinessesComponent },
            { path: 'brokers', component: BrokersComponent },
            { path: 'aboutus', component: AboutusComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'serviceBenefit', component: ServiceBenefitComponent },
            { path: 'plans', component: PlansComponent },
            { path: 'plans/worldwide', component: PlansworldwideComponent },
            { path: 'plans/usa', component: PlansusaComponent },
            { path: 'faq', component: FaqComponent },
            { path: 'faq/:id', component: FaqComponent },
            { path: 'service', component: ServiceComponent },
            { path: 'location/:id', component: LocationComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'error404', component: error404Component },
            { path: "**", redirectTo: 'error404' },
            { path: 'product/:id', component: ProductDetailsComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        DatepickerInputModule,
        PhoneInputModule
    ],
    providers: [
        MapService,
        LocationService,
        FaqService,
        CostsharingService,
        AboutUsService,
        SalePointService,
        CommunityService,
        TestimonialService,
        FooterService,
        GetQuoteService,
        GetQuoteFormService,
        UrlService,
        TranslateLoaderService,
        BrokersService,
        ContactService,
        BusinessesService
    ]
})
export class AppModuleShared {
};
