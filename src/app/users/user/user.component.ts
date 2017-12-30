import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { ConfirmService } from '../../shared/confirm/confirm.service';
import { UserService } from 'app/users/user/user.service';
import { NotificationService } from '../../shared/messages/notification.service';

import { User } from 'app/users/user/user.model'
import { UsersComponent } from 'app/users/users.component';


@Component({
  selector: 'ctx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('userAppeared', [
      state('ready', style({opacity: 1})),
      transition ('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}), animate('300ms 0s ease-in-out')
      ] )
    ])
  ]
})
export class UserComponent implements OnInit {
  
  userstate = 'ready'
  
  @Input() user: User
  @Output() reloadEntities = new EventEmitter();

  constructor(private service: UserService, private confirmService: ConfirmService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  delete(id: number, name: string) {
    let that = this;
    this.confirmService.confirmThis(`Confirma a exclusão do usuário "${name}"?`,
      function(){
        if (that.service.delete(id)) {
          that.notificationService.notify(`Usuário "${name}" excluído com sucesso`)
          console.log('emit event----')
          that.reloadEntities.emit();
        }
      },
      function(){}
    )
  }

  getContrast(hexcolor) : String {
    var r = parseInt(hexcolor.substr(1,2),16);
    var g = parseInt(hexcolor.substr(3,2),16);
    var b = parseInt(hexcolor.substr(5,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

}
