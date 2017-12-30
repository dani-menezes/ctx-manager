import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import { User } from './user/user.model'
import { UserService } from './user/user.service'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'

@Component({
  selector: 'ctx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({opacity: 0, "max-height": "0px"})),
      state('visible', style({opacity: 1, "max-height": "70px", "margin-top": "20px"})),
      transition ('* => *', animate ('250ms 0s ease-in-out'))
  ])]
})
export class UsersComponent implements OnInit {

  searchBarState = 'hidden'
  users: User[]
  searchForm: FormGroup
  searchControl: FormControl

  constructor(private userService: UserService, private fb: FormBuilder){
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
          this.userService.findAll(searchTerm).catch(error=>Observable.from([]))
      )
      .subscribe(users => this.users = users)
    this.retrieveEntities();
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }
 
  retrieveEntities() {
    console.log('users:retrieveEntities[' + (this.users?this.users.length:0)+']')
    setTimeout(() => {
      this.userService.findAll().subscribe(users => {
        this.users = users
        console.log('users:subscribe[' + (this.users?this.users.length:0)+']')
      }) 
    }, 500);
  }
}
