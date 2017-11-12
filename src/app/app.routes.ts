import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'
import {NotFoundComponent} from './not-found/not-found.component'

import { BaselayersComponent } from './baselayers/baselayers.component'
import { BaselayerComponent } from './baselayers/baselayer/baselayer.component'
import { BaselayerDetailComponent } from './baselayers/baselayer-detail/baselayer-detail.component'
import { CompanyComponent } from './company/company.component'
import { ContextComponent } from './context/context.component'
import { PluginsComponent } from './plugins/plugins.component'
import { UserComponent } from './user/user.component'

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: 'baselayers', component: BaselayersComponent},
  {path: 'baselayer/:id', component: BaselayerComponent},
  {path: 'baselayer-detail/:id', component: BaselayerDetailComponent},
  {path: 'baselayer-detail', component: BaselayerDetailComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'context', component: ContextComponent},
  {path: 'plugins', component: PluginsComponent},
  {path: 'user', component: UserComponent},
  {path: '**', component: NotFoundComponent}
]
