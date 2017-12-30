import { Company } from "app/companies/company/company.model";

export class User {
    //dependencies
    company: Company
    //attrs
    id: any
    name: string
    login: string
    email: string
    passwd: string
    passwdConfirm: string
    active: boolean

    constructor(){}
}