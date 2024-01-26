import { Component, Inject, OnInit, Pipe, inject } from '@angular/core';
import { WateringService } from '../../../service/watering.service';
import { Watering } from '../../../model/watering';
import { AsyncPipe } from '@angular/common';
import { pipe } from 'rxjs';
import { SnackbarService } from '../../../service/snackbar.service';

@Component({
  selector: 'app-historic',
  standalone: true,
  imports: [],
  templateUrl:'./historic.component.html',
  styleUrl: './historic.component.css'
})
export class HistoricComponent implements OnInit{
  waterings: Watering[] = [];
  private wateringService = inject(WateringService);
  private snackbarService = inject(SnackbarService);

  ngOnInit(): void {
    this.wateringService.getAllWatering().subscribe(
      (response)=>{
        this.waterings = response;
        this.snackbarService.openSnackBarSuccess("History Loaded","close")
      },()=>{
        this.snackbarService.openSnackBarError("An error occured","close")
      }
    )
  }




}
