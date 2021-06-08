import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinComponent } from './auth/join/join.component';
import { CoreComponent } from './core/core.component';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { TokenInterceptor } from './utils/token.interceptor';
import { ComputersComponent } from './core/computers/computers.component';
import { AddComputerComponent } from './core/computers/add-computer/add-computer.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    JoinComponent,
    CoreComponent,
    ComputersComponent,
    AddComputerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
