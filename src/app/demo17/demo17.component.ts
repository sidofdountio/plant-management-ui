import { Component, OnInit, inject } from '@angular/core';
import { Demo17Service } from '../service/demo17.service';
import { Plant } from '../model/plant';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-demo17',
  standalone: true,
  imports: [MatButtonModule, DatePipe, AsyncPipe, JsonPipe],
  templateUrl: './demo17.component.html',
  styleUrl: './demo17.component.css'
})
export class Demo17Component implements OnInit {

  plants: Plant[] = [];
  amount: number = 0;

  private demoService = inject(Demo17Service);

  ngOnInit(): void {
    this.demoService.getPlant().subscribe(
      (plants) => {
        this.plants = plants
      },
      (error: HttpErrorResponse) => {

      }
    )
  }
}
