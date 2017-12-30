import {Routes} from '@angular/router'

import {HomeComponent} from './home/home.component'
import {NotFoundComponent} from './not-found/not-found.component'

import { BaselayersComponent } from './baselayers/baselayers.component'
import { BaselayerComponent } from './baselayers/baselayer/baselayer.component'
import { BaselayerDetailComponent } from './baselayers/baselayer-detail/baselayer-detail.component'
import { CompaniesComponent } from './companies/companies.component'
import { ContextsComponent } from './contexts/contexts.component'
import { PluginsComponent } from './plugins/plugins.component'
import { UsersComponent } from './users/users.component'
import { PluginComponent } from './plugins/plugin/plugin.component';
import { PluginDetailComponent } from './plugins/plugin-detail/plugin-detail.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { ContextDetailComponent } from 'app/contexts/context-detail/context-detail.component';
import { UserDetailComponent } from 'app/users/user-detail/user-detail.component';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', loadChildren: './about/about.module#AboutModule'},
  {path: 'baselayers', component: BaselayersComponent},
  {path: 'baselayer-detail/:id', component: BaselayerDetailComponent},
  {path: 'baselayer-detail', component: BaselayerDetailComponent},
  {path: 'companies', component: CompaniesComponent},
  {path: 'company-detail/:id', component: CompanyDetailComponent},
  {path: 'company-detail', component: CompanyDetailComponent},
  {path: 'contexts', component: ContextsComponent},
  {path: 'context-detail/:id', component: ContextDetailComponent},
  {path: 'context-detail', component: ContextDetailComponent},
  {path: 'plugins', component: PluginsComponent},
  {path: 'plugin-detail/:id', component: PluginDetailComponent},
  {path: 'plugin-detail', component: PluginDetailComponent},
  {path: 'users', component: UsersComponent},
  {path: 'user-detail/:id', component: UserDetailComponent},
  {path: 'user-detail', component: UserDetailComponent},
  {path: '**', component: NotFoundComponent}
]
