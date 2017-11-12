import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { Baselayer } from '../baselayer/baselayer.model'
import { BaselayerService } from '../baselayer/baselayer.service'
import { BaseAnimationRenderer } from '@angular/platform-browser/animations/src/animation_renderer';

@Component({
  selector: 'ctx-baselayer-detail',
  templateUrl: './baselayer-detail.component.html',
  styleUrls: ['./baselayer-detail.component.css']
})
export class BaselayerDetailComponent implements OnInit {

  baselayerForm: FormGroup
  constructor(private baselayerService: BaselayerService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id']
    if (id === undefined) {
      this.buildForm()
    } else {
      this.baselayerService.findById(id).subscribe(baselayer => {
        this.buildForm(baselayer)
      })
    }
  }

  buildForm(baselayer?) {
    console.log('baselayer', baselayer)
    this.baselayerForm = this.formBuilder.group({
      id: this.formBuilder.control(baselayer?baselayer.id:''),
      name: this.formBuilder.control(baselayer?baselayer.name:'', [Validators.required, Validators.minLength(5)]),
      script: this.formBuilder.control(baselayer?baselayer.script:'', [Validators.required]),
      imagePath: this.formBuilder.control(baselayer?baselayer.imagePath:'', [Validators.required, Validators.minLength(5)])
    })
  }

  saveOrUpdate(baselayer: Baselayer) {
    console.log('save', baselayer);
    if (baselayer.id === undefined || baselayer.id === "") {
      this.baselayerService.save(baselayer).subscribe((baselayer: Baselayer)=> {this.router.navigate(['/baselayers'])});
    } else {
      this.baselayerService.update(baselayer).subscribe((baselayer: Baselayer)=> {this.router.navigate(['/baselayers'])});
    }
  }

}
