import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './auth/join/join.component';
import { AddComputerComponent } from './core/computers/add-computer/add-computer.component';
import { ComputersComponent } from './core/computers/computers.component';
import { ViewComputerComponent } from './core/computers/view-computer/view-computer.component';
import { LoginGuard } from './guards/login.guard';
import { SecurityGuard } from './guards/security.guard';

const routes: Routes = [
  {path: '', redirectTo: 'computers', pathMatch: 'full'},
  {path: 'computers', component: ComputersComponent},
  {path: 'computers/add-computer', component: AddComputerComponent, canActivate: [SecurityGuard]},
  {path: 'computers/:id', component: ViewComputerComponent},
  {path: 'login', component: JoinComponent, data: {mode: 'login'}, canActivate: [LoginGuard]},
  {path: 'register', component: JoinComponent, data: {mode: 'register'}, canActivate: [LoginGuard]},
  {path: "**", redirectTo: 'computers'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
