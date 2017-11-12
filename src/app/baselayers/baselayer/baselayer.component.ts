import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { ConfirmService } from '../../shared/confirm/confirm.service';
import { BaselayerService } from './baselayer.service';
import { NotificationService } from '../../shared/messages/notification.service';

import { Baselayer } from './baselayer.model'
import { BaselayersComponent } from '../baselayers.component';


@Component({
  selector: 'ctx-baselayer',
  templateUrl: './baselayer.component.html',
  styleUrls: ['./baselayer.component.css'],
  animations: [
    trigger('baselayerAppeared', [
      state('ready', style({opacity: 1})),
      transition ('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}), animate('300ms 0s ease-in-out')
      ] )
    ])
  ]
})
export class BaselayerComponent implements OnInit {

  baselayerState = 'ready'
  
  @Input() baselayer: Baselayer

  constructor(private service: BaselayerService, private confirmService: ConfirmService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  delete(id: number, name: string) {
    let that = this;
    this.confirmService.confirmThis(`Confirma a exclusão da baselayer "${name}"?`,
      function(){
        if (that.service.delete(id)) {
          that.notificationService.notify(`Baselayer "${name}" excluida com sucesso`)
        }
      },
      function(){}
    )
  }

}
