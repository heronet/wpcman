import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Computer } from 'src/app/models/Computer';
import { AuthService } from 'src/app/services/auth.service';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit, OnDestroy {
  computers: Computer[] = [] ;
  isAuthenticated = false;
  isLoading = false;
  authSub: Subscription;
  constructor(private computerService: ComputerService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.computerService.getComputers().subscribe(data => {
      this.isLoading = false;
      this.computers = data;
    }, err => {
      this.isLoading = true;
      console.log(err);
      
    })
    this.authSub = this.authService.authUser$.subscribe(authData => {
      if(authData !== null)
        this.isAuthenticated = true;
      else
        this.isAuthenticated = false;
    })
  }
  deletePC(i: number) {
    this.computerService.deleteComputer(this.computers[i].id).subscribe(() => {
      this.computers.splice(i, 1);
    }, err => {
      console.log(err);
      
    })
    
  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
