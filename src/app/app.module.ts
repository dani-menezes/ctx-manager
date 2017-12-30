import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { ApplicationErrorHandler} from './app.error-handler'
import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module'
import { NotFoundComponent } from './not-found/not-found.component';
import { CompanyComponent } from './companies/company/company.component';
import { PluginComponent } from './plugins/plugin/plugin.component';
import { BaselayersComponent } from './baselayers/baselayers.component';
import { UserComponent } from './users/user/user.component';
import { BaselayerComponent } from './baselayers/baselayer/baselayer.component';
import { BaselayerDetailComponent } from './baselayers/baselayer-detail/baselayer-detail.component';
import { PluginsComponent } from './plugins/plugins.component';
import { PluginDetailComponent } from './plugins/plugin-detail/plugin-detail.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { ContextsComponent } from 'app/contexts/contexts.component';
import { ContextComponent } from 'app/contexts/context/context.component';
import { ContextDetailComponent } from 'app/contexts/context-detail/context-detail.component';
import { UsersComponent } from 'app/users/users.component';
import { UserDetailComponent } from 'app/users/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ContextComponent,
    CompanyComponent,
    PluginComponent,
    BaselayersComponent,
    UserComponent,
    BaselayerComponent,
    BaselayerDetailComponent,
    PluginsComponent,
    PluginDetailComponent,
    CompaniesComponent,
    CompanyDetailComponent,
    ContextsComponent,
    ContextComponent,
    ContextDetailComponent,
    UsersComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}, {provide: ErrorHandler, useClass: ApplicationErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
