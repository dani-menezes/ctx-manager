import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import { Company } from './company/company.model'
import { CompanyService } from './company/company.service'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'

@Component({
  selector: 'ctx-companys',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({opacity: 0, "max-height": "0px"})),
      state('visible', style({opacity: 1, "max-height": "70px", "margin-top": "20px"})),
      transition ('* => *', animate ('250ms 0s ease-in-out'))
  ])]
})
export class CompaniesComponent implements OnInit {

  searchBarState = 'hidden'
  companies: Company[]
  searchForm: FormGroup
  searchControl: FormControl

  constructor(private companyService: CompanyService, private fb: FormBuilder){
    this.ngOnInit();
  }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      // .do(searchTerm => console.log(`q=${searchTerm}`))
      .switchMap(searchTerm => 
          this.companyService.findAll(searchTerm).catch(error=>Observable.from([]))
      )
      .subscribe(companies => this.companies = companies)
    this.retrieveEntities();
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
 
  retrieveEntities() {
    console.log('companys:retrieveEntities[' + (this.companies?this.companies.length:0)+']')
    setTimeout(() => {
      this.companyService.findAll().subscribe(companies => {
        this.companies = companies
        console.log('companys:subscribe[' + (this.companies?this.companies.length:0)+']')
      }) 
    }, 500);
  }
}
