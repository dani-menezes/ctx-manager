import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { Plugin } from '../plugin/plugin.model'
import { PluginService } from '../plugin/plugin.service'
import { BaseAnimationRenderer } from '@angular/platform-browser/animations/src/animation_renderer';

@Component({
  selector: 'ctx-plugin-detail',
  templateUrl: './plugin-detail.component.html',
  styleUrls: ['./plugin-detail.component.css']
})
export class PluginDetailComponent implements OnInit {

  pluginForm: FormGroup
  constructor(private pluginService: PluginService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    if (id === undefined) {
      this.buildForm()
    } else {
      this.pluginService.findById(id).subscribe(entity => {
        this.buildForm(entity)
      })
    }
  }

  buildForm(entity?) {
    this.pluginForm = this.formBuilder.group({
      id: this.formBuilder.control(entity?entity.id:''),
      name: this.formBuilder.control(entity?entity.name:'', [Validators.required, Validators.minLength(5)]),
      locationPath: this.formBuilder.control(entity?entity.locationPath:'', [Validators.required, Validators.minLength(5)])
    })
  }

  saveOrUpdate(entity: Plugin) {
    if (entity.id === undefined || entity.id === "") {
      this.pluginService.save(entity).subscribe((plugin: Plugin)=> {this.router.navigate(['/plugins'])});
    } else {
      this.pluginService.update(entity).subscribe((plugin: Plugin)=> {this.router.navigate(['/plugins'])});
    }
  }

}
