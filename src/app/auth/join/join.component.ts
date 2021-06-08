import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  pageMode = '';

  pStrength = 0;
  pValidations = [];
  password = "";
  showPassword = false;

  serverError: string;
  serverErrors: {code: string, description: string}[] = [];
  isLoading = false;

  cities = [];
  divisions = [];
  
  constructor(
    private authService: AuthService, 
    private location: Location, 
    private router: Router, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.pageMode = data.mode;
    });
  }
  login(data: Partial<User>) {
    this.isLoading = true;
    const loginCreds: Partial<User> = {
      email: data.email.trim().toLowerCase(),
      password: data.password.trim()
    };
    this.authService.login(loginCreds).subscribe(res => {
      this.isLoading = false;
      this.serverError = null
      this.navigate();
    }, err => {
      this.serverError = err.error;
      this.isLoading = false;
    });
  }
  register(data: Partial<User>) {
    this.isLoading = true;
    const supplierData: Partial<User> = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      eduId: data.eduId.trim().toLowerCase(),
      password: data.password.trim()
    }
    this.authService.register(supplierData).subscribe(res => {
      this.isLoading = false;
      this.serverErrors = null;
      this.navigate();
    }, res => {
      res.error.forEach(element => {
        if(!element["description"].includes("Username"))
          this.serverErrors.push(element["description"]);
      });
      console.log(this.serverErrors);
      
      this.isLoading = false;
    })
  }
  onSubmit(form: NgForm) {
    switch(this.pageMode) {
      case 'login':
        this.login(form.value);
        break;
      case 'register':
        this.register(form.value);
        break;
    }
  }
  onPassInput(e: Event) {
    this.pValidations = [
      (this.password.length > 5),
      (this.password.search(/[A-Z]/) > -1),
      (this.password.search(/[0-9]/) > -1),
      (this.password.search(/[$&+,:;=?@#]/) > -1),
    ]
    this.pStrength = this.pValidations.reduce((acc, cur) => acc + cur)
  }
  navigate() {
    // if(window.history.length > 2)
    //   this.location.back(); // Only call back if uses came from another page of THIS site.
    // else
    this.router.navigateByUrl("/computers"); // Go home if came from another website
  }

}
