import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import { Baselayer } from './baselayer/baselayer.model';
import { BaselayerService } from './baselayer/baselayer.service'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'

@Component({
  selector: 'ctx-baselayers',
  templateUrl: './baselayers.component.html',
  styleUrls: ['./baselayers.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({opacity: 0, "max-height": "0px"})),
      state('visible', style({opacity: 1, "max-height": "70px", "margin-top": "20px"})),
      transition ('* => *', animate ('250ms 0s ease-in-out'))
  ])]
})
export class BaselayersComponent implements OnInit {

  searchBarState = 'hidden';
  baselayers: Baselayer[]
  searchForm: FormGroup
  searchControl: FormControl

  constructor(private baselayerService: BaselayerService, private fb: FormBuilder) { }

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
          this.baselayerService.findAll(searchTerm).catch(error=>Observable.from([]))
      )
      .subscribe(baselayers => this.baselayers = baselayers)
    this.baselayerService.findAll().subscribe(baselayers => this.baselayers = baselayers)
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden'? 'visible' : 'hidden';
  }

}
