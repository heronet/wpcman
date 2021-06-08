import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Computer } from 'src/app/models/Computer';
import { AuthService } from 'src/app/services/auth.service';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-view-computer',
  templateUrl: './view-computer.component.html',
  styleUrls: ['./view-computer.component.scss']
})
export class ViewComputerComponent implements OnInit, OnDestroy {
  id: string;
  pc: Computer;
  authSub: Subscription;
  isAuthenticated = false;
  isLoading = false;
  isModifying = false;
  serverError = "";

  constructor(
    private computerService: ComputerService, 
    private authService: AuthService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = this.route.snapshot.params["id"];
    setTimeout(() => {
      this.computerService.getComputer(this.id).subscribe(pc => {
        this.isLoading = false;
      this.pc = pc;
    });
    }, 1000)
    this.authSub = this.authService.authUser$.subscribe(authData => {
      if(authData !== null)
        this.isAuthenticated = true;
      else
        this.isAuthenticated = false;
    })
  }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const data = form.value as Partial<Computer>;
    data.id = this.id;
    this.computerService.modifyComputer(data).subscribe(() => {
      this.isLoading = false;
      this.router.navigateByUrl('/computers');
    }, err => {
      this.isLoading = false;
      console.log(err);
      
    });
  }
  toggleModify() {
    this.isModifying = !this.isModifying;
  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
