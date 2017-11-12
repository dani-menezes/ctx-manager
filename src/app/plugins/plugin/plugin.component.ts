import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { ConfirmService } from '../../shared/confirm/confirm.service';
import { NotificationService } from '../../shared/messages/notification.service';

import { PluginService } from './plugin.service';

import { Plugin } from './plugin.model'
import { PluginsComponent } from '../plugins.component';


@Component({
  selector: 'ctx-plugin',
  templateUrl: './plugin.component.html',
  styleUrls: ['./plugin.component.css'],
  animations: [
    trigger('pluginAppeared', [
      state('ready', style({opacity: 1})),
      transition ('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}), animate('300ms 0s ease-in-out')
      ] )
    ])
  ]
})
export class PluginComponent implements OnInit {

  pluginState = 'ready'
  
  @Input() plugin: Plugin

  constructor(private service: PluginService, private confirmService: ConfirmService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  delete(id: number, name: string) {
    let that = this;
    this.confirmService.confirmThis(`Confirma a exclusão do plugin "${name}"?`,
      function(){
        if (that.service.delete(id)) {
          that.notificationService.notify(`Plugin "${name}" excluido com sucesso`)
        }
      },
      function(){}
    )
  }

}
