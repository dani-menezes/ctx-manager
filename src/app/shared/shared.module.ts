import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ConfirmComponent } from './confirm/confirm.component'
import { InputComponent } from './input/input.component'
import { RadioComponent } from './radio/radio.component'
import { RatingComponent } from './rating/rating.component'

import { BaselayerService } from '../baselayers/baselayer/baselayer.service'
import { NotificationService } from '../shared/messages/notification.service'
import { ConfirmService } from './confirm/confirm.service'
import { SnackbarComponent } from './messages/snackbar/snackbar.component';

@NgModule({
    declarations: [ InputComponent, RadioComponent, RatingComponent, SnackbarComponent, ConfirmComponent ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule ],
    exports: [ ConfirmComponent, InputComponent, RadioComponent, RatingComponent, CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent ]
})
export class SharedModule{
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [BaselayerService, NotificationService, ConfirmService]
        }
    }
}