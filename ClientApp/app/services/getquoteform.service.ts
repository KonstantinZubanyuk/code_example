import { Injectable } from '@angular/core';

@Injectable()
export class GetQuoteFormService {
    public formInstance: GetQuoteForm;
    public submittedInstance: GetQuoteForm | undefined;

    constructor() {
        this.formInstance = new GetQuoteFormImpl();
    }
}

export interface GetQuoteForm {
    destination: string,
    origin: string,
    passengers: Passenger[],
    email: string,
    phoneCountry: string,
    phoneArea: string,
    phoneNumber: string,
    language: string,
    receiveMarketingMaterial: boolean,
    approveUseInformation: boolean,
    isPassengerTypeExists(type: PassengerType): Passenger | undefined,
    getPassengersOfType(type: PassengerType): Passenger[]
}

export class Passenger {
    type: PassengerType | undefined;
    birthDate: Date | undefined;
    gender: Gender | undefined;
}

export enum PassengerType{
    Me = 1,
    Partner = 2,
    Kid = 3
}

export enum Gender{
    Female,
    Male
}

export enum GetQuoteStep {
    Destination,
    Origin,
    Passengers,
    PassengersDetails,
    ContactInfo
}

class GetQuoteFormImpl implements GetQuoteForm {
    destination: string = "";
    origin: string = "";
    email: string = "";
    phoneCountry: string = "";
    phoneArea: string = "";
    phoneNumber: string = "";
    receiveMarketingMaterial: boolean = false;
    approveUseInformation: boolean = false;
    passengers = new Array<Passenger>();
    language: string = "";

    isPassengerTypeExists(type: PassengerType): Passenger | undefined {
        return this.passengers.find((value: Passenger, index: number, obj: Passenger[]) => {
            return value.type == type;
        });
    }

    getPassengersOfType(type: PassengerType): Passenger[] {
        return this.passengers.filter((value: Passenger, index: number, obj: Passenger[]) => {
            return value.type == type;
        });
    }
}