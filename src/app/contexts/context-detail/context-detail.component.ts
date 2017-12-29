import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { BaseAnimationRenderer } from '@angular/platform-browser/animations/src/animation_renderer';
import { ContextComponent } from 'app/contexts/context/context.component';
import { ContextService } from 'app/contexts/context/context.service';
import { Context } from 'app/contexts/context/context.model';
import { Company } from 'app/companies/company/company.model';
import { getComponent } from '@angular/core/src/linker/component_factory_resolver';
import { CompanyService } from 'app/companies/company/company.service';

@Component({
  selector: 'ctx-context-detail',
  templateUrl: './context-detail.component.html',
  styleUrls: ['./context-detail.component.css']
})
export class ContextDetailComponent implements OnInit {

  contextForm: FormGroup
  companies: Company[]
  constructor(private contextservice: ContextService, private companyService: CompanyService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.findAllCompanies();
    let id = this.route.snapshot.params['id']
    if (id === undefined) {
      this.buildForm()
    } else {
      this.contextservice.findById(id).subscribe(context => {
        this.buildForm(context)
      })
    }
  }

  buildForm(context?) {
    this.contextForm = this.formBuilder.group({
      id: this.formBuilder.control(context?context.id:''),
      name: this.formBuilder.control(context?context.name:'', [Validators.required, Validators.minLength(5)]),
      maxY: this.formBuilder.control(context?context.maxY:'', [Validators.required]),
      minX: this.formBuilder.control(context?context.minX:'', [Validators.required]),
      maxX: this.formBuilder.control(context?context.maxX:'', [Validators.required]),
      minY: this.formBuilder.control(context?context.minY:'', [Validators.required]),
      company: this.formBuilder.control(context?context.company.id:'', [Validators.required]),
      colorBg: this.formBuilder.control(context?context.colorBg:'', [Validators.required, Validators.minLength(3)]),
      colorMn: this.formBuilder.control(context?context.colorMn:'', [Validators.required, Validators.minLength(3)]),
      colorFn: this.formBuilder.control(context?context.colorFn:'', [Validators.required, Validators.minLength(3)])
    })
  }

  saveOrUpdate(context: any) {
    var company = this.getCompanyById(context.company);
    context.company = company;
    console.log('save', context);
    if (context.id === undefined || context.id === "") {
      this.contextservice.save(context).subscribe((context: Context)=> {this.router.navigate(['/contexts'])});
    } else {
      this.contextservice.update(context).subscribe((context: Context)=> {this.router.navigate(['/contexts'])});
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

