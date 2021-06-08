import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Computer } from 'src/app/models/Computer';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.scss']
})
export class AddComputerComponent implements OnInit {
  isLoading = false;
  serverError: string = null;
  constructor(private computerService: ComputerService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const data: Computer = form.value;
    this.computerService.addComputer(data).subscribe(() => {
      this.isLoading = false;
      this.router.navigateByUrl('/computers');
    }, err => {
      this.isLoading = false;
      console.log(err);
      
    });
  }

}
