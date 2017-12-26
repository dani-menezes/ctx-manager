import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { BaseAnimationRenderer } from '@angular/platform-browser/animations/src/animation_renderer';
import { CompanyComponent } from 'app/companies/company/company.component';
import { CompanyService } from 'app/companies/company/company.service';
import { Company } from 'app/companies/company/company.model';

@Component({
  selector: 'ctx-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  companyForm: FormGroup
  constructor(private companieservice: CompanyService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    if (id === undefined) {
      this.buildForm()
    } else {
      this.companieservice.findById(id).subscribe(company => {
        this.buildForm(company)
      })
    }
  }

  buildForm(company?) {
    this.companyForm = this.formBuilder.group({
      id: this.formBuilder.control(company?company.id:''),
      name: this.formBuilder.control(company?company.name:'', [Validators.required, Validators.minLength(5)]),
      key: this.formBuilder.control(company?company.key:'', [Validators.required, Validators.minLength(5)]),
      logoPath: this.formBuilder.control(company?company.logoPath:'', [Validators.required, Validators.minLength(5)]),
      workspace: this.formBuilder.control(company?company.workspace:'', [Validators.required, Validators.minLength(5)])
    })
  }

  saveOrUpdate(company: Company) {
    console.log('save', company);
    if (company.id === undefined || company.id === "") {
      this.companieservice.save(company).subscribe((company: Company)=> {this.router.navigate(['/companies'])});
    } else {
      this.companieservice.update(company).subscribe((company: Company)=> {this.router.navigate(['/companies'])});
    }
  }

}
