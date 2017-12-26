import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { ConfirmService } from '../../shared/confirm/confirm.service';
import { CompanyService } from './company.service';
import { NotificationService } from '../../shared/messages/notification.service';

import { Company } from './company.model'
import { CompaniesComponent } from '../companies.component';


@Component({
  selector: 'ctx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  animations: [
    trigger('companyAppeared', [
      state('ready', style({opacity: 1})),
      transition ('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}), animate('300ms 0s ease-in-out')
      ] )
    ])
  ]
})
export class CompanyComponent implements OnInit {
  
  companyState = 'ready'
  
  @Input() company: Company
  @Output() reloadEntities = new EventEmitter();

  constructor(private service: CompanyService, private confirmService: ConfirmService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  delete(id: number, name: string) {
    let that = this;
    this.confirmService.confirmThis(`Confirma a exclusão da empresa "${name}"?`,
      function(){
        if (that.service.delete(id)) {
          that.notificationService.notify(`Empresa "${name}" excluída com sucesso`)
          console.log('emit event----')
          that.reloadEntities.emit();
        }
      },
      function(){}
    )
    
  }

}
