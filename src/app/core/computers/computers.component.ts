import { Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/models/Computer';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {
  computers: Computer[] = [] ;
  constructor(private computerService: ComputerService) { }

  ngOnInit(): void {
    this.computerService.getComputers().subscribe(data => {
      this.computers = data;
      console.log(data);
      
    })
  }

}
