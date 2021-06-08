import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinComponent } from './auth/join/join.component';
import { AddComputerComponent } from './core/computers/add-computer/add-computer.component';
import { ComputersComponent } from './core/computers/computers.component';

const routes: Routes = [
  {path: '', redirectTo: 'computers', pathMatch: 'full'},
  {path: 'computers', component: ComputersComponent},
  {path: 'computers/add-computer', component: AddComputerComponent},
  {path: 'login', component: JoinComponent, data: {mode: 'login'}},
  {path: 'register', component: JoinComponent, data: {mode: 'register'}},
  {path: "**", redirectTo: 'computers'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
