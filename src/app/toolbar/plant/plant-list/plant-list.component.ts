import { Component, OnInit, ViewChild, inject, AfterViewInit, Pipe, NgModule } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlantService } from '../../../service/plant.service';
import { Plant } from '../../../model/plant';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditPlantComponent } from '../edit-plant/edit-plant.component';
import { BehaviorSubject } from 'rxjs';
import { ValidPlantComponent } from '../valid-plant/valid-plant.component';
import { WateringService } from '../../../service/watering.service';
import { Watering } from '../../../model/watering';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DataState } from '../../../model/data-state';
import { SnackbarService } from '../../../service/snackbar.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Demo17Component } from "../../../demo17/demo17.component"; 

@Component({
    selector: 'app-plant-list',
    standalone: true,
    templateUrl: './plant-list.component.html',
    styleUrl: './plant-list.component.css',
    imports: [MatButtonModule, MatPaginatorModule, MatTableModule, MatIconModule, MatTooltipModule, AsyncPipe,
        MatProgressSpinnerModule, DatePipe, Demo17Component]
})
export class PlantListComponent implements OnInit {
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;

  plants: Plant[] = [];
  displayedColumns: string[] = ['position', 'image', 'name', 'wateringDate', 'wateringFrequency', 'specie', 'action'];
  dataSource = new MatTableDataSource<Plant>([]);
  spinnerWateringSubject = new BehaviorSubject<string>('');
  spinnerWatering$ = this.spinnerWateringSubject.asObservable();
  private router = inject(Router);
  
  constructor(private plantService: PlantService, private dialog: MatDialog,
    private wateringService: WateringService,private snacbarService:SnackbarService) { }

  ngOnInit(): void {
    this.getAllPlant();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllPlant() {
    this.state = DataState.LOADING_STATE;
    this.plantService.getAllPlant().subscribe(
      (response) => {
        this.plants = response;
        this.dataSource.data = response;
        this.state = DataState.LOADED_STATE;
        this.snacbarService.openSnackBarSuccess("Plant Loaded successfuly","close");
      },
      () => {
        this.state = DataState.ERROR_STATE;
        this.snacbarService.openSnackBarError("Error occured due loading","close")
      }
    )
  }

  /**
   * Move to add plant file
   */
  onAddNewPlant() {
    this.router.navigate(["/add-new-plant"])
  }

  // Define what plant need
  definePlantNeed(plant: Plant) {
    // MatDialog configuration.
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    // Passed data to dialog
    configDialog.data = plant;
    // Open dialog
    const dialogRef = this.dialog.open(EditPlantComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (response: Plant) => {
          console.log(response);
          // Call ProcessToSave. 
          this.processToSavePlantNeed(response);
        });
  }

  processToSavePlantNeed(plant: Plant) {
    this.plantService.editePlant(plant).subscribe(
      () => {
        this.getAllPlant();
        this.snacbarService.openSnackBarSuccess("Operation successduly","close");
      }, () => {
        this.snacbarService.openSnackBarError("An error occured","close");
      }
    )
  }

  /**
   * 
   * @param plant 
   */
  saveWateringDate(plant: Plant) {
    const alown = false;
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = alown;
    const dialogRef = this.dialog.open(ValidPlantComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (response: boolean) => {
          this.valideAndSaveWateringDate(plant, response);
        });
  }
 
// Save watering date
  private valideAndSaveWateringDate(plant: Plant, valid: boolean) {
    this.spinnerWateringSubject.next(plant.id);
    if (valid) {
      let watering:Watering = {
        date: '',
        id:0,
        plant:{
          name: plant.name,
          buyAt:plant.buyAt,
          imageUrl: plant.imageUrl,
          id: plant.id,
          specie:{
            id: plant.specie.id,
            name: plant.specie.name,
          }
        }
      }
      this.wateringService.save(watering).subscribe(
        () => {
          this.spinnerWateringSubject.next('');
          this.getAllPlant();
          this.snacbarService.openSnackBarSuccess("Mack watering successfuly", "close");
        },
        () => {
          this.spinnerWateringSubject.next('');
          this.snacbarService.openSnackBarError("An error occured due valid watering", "close");
        }
      )
    } else {
      this.spinnerWateringSubject.next('');
      this.snacbarService.openSnackBar("Valid process was closed","close");      return;
    }
  }
}
