import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { BaseAnimationRenderer } from '@angular/platform-browser/animations/src/animation_renderer';
import { UserComponent } from 'app/users/user/user.component';
import { UserService } from 'app/users/user/user.service';
import { User } from 'app/users/user/user.model';
import { Company } from 'app/companies/company/company.model';
import { getComponent } from '@angular/core/src/linker/component_factory_resolver';
import { CompanyService } from 'app/companies/company/company.service';

@Component({
  selector: 'ctx-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  userForm: FormGroup
  companies: Company[]
  activeField: string
  userId: number = 0
  constructor(private userservice: UserService, private companyService: CompanyService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.findAllCompanies();
    let id = this.route.snapshot.params['id']
    if (id === undefined) {
      this.buildForm()
      this.activeField = "Ativo";
      this.userId = 0;
    } else {
      this.userservice.findById(id).subscribe(user => {
        this.buildForm(user)
        this.activeField = user.active?"Ativo":"Inativo";
      })
      this.userId = id;
    }
  }

  buildForm(user?) {
    this.userForm = this.formBuilder.group({
      id: this.formBuilder.control(user?user.id:''),
      name: this.formBuilder.control(user?user.name:'', [Validators.required, Validators.minLength(5)]),
      login: this.formBuilder.control(user?user.login:'', [Validators.required, Validators.minLength(8)]),
      email: this.formBuilder.control(user?user.email:'', [Validators.required, Validators.email]),
      active: this.formBuilder.control(user?user.active:true, []),
      company: this.formBuilder.control(user?user.company.id:null, [Validators.required, Validators.min(1)]),
      passwd: this.formBuilder.control(user?user.passwd:'', [Validators.required, Validators.minLength(8)], ),
      passwdConfirm: this.formBuilder.control(user?user.passwdConfirm:'', [this.confirmPasswd.bind(this)]),
    })
  }

  confirmPasswd(control: FormControl) {
    var valid = false;
    if (control.value !== undefined && control.parent !== undefined) {
      let id = control.parent.get('id').value
      let passwd = control.parent.get('passwd').value
      let confirm = control.parent.get('passwdConfirm').value
      if (id != null && id != "") {
        valid = true;
      } else if (passwd === confirm) {
        valid = true
      }
      console.log(valid, id, passwd, confirm)
      if (valid) {
        return null;
      }
    }
    return {
      confirmPasswd: valid
    }

  }

  changeActiveValue() {
    if (this.userForm) {
        if (this.userForm.get('active').value) {
          this.userForm.get('active').setValue(false);
          this.activeField = 'Inativo';
        } else {
          this.userForm.get('active').setValue(true);
          this.activeField = "Ativo";
        }
    }
  }

  saveOrUpdate(user: any) {
    var company = this.getCompanyById(user.company);
    user.company = company;
    console.log('save', user);
    if (user.id === undefined || user.id === "") {
      this.userservice.save(user).subscribe((user: User)=> {this.router.navigate(['/users'])});
    } else {
      this.userservice.update(user).subscribe((user: User)=> {this.router.navigate(['/users'])});
    }
  }

  getCompanyById(id: any): Company {
    for (var a =0; a<=this.companies.length; a++) {
      if (this.companies[a].id == id) {
        return this.companies[a];
      }
    }
    return null;
  }

  findAllCompanies() {
    this.companyService.findAll().subscribe(companies => this.companies = companies);
  }
}

