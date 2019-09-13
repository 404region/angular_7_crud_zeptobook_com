import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from "@angular/router";
import { MedicineModel } from '../MedicineModel';
import { MedicineService } from '../medicine.service';
import { SearchMedicineComponent } from '../search-medicine/search-medicine.component';
//DataService
import { MedicineSearchDataService } from "../medicine-search-data.service";

@Component({
  selector: 'app-list-medicine',
  templateUrl: './list-medicine.component.html',
  styleUrls: ['./list-medicine.component.css']
})
export class ListMedicineComponent implements OnInit  {
  searchMedicamentsArray: any;
  medicines: MedicineModel[];

 //DataService
  constructor(private medicineService: MedicineService, private router: Router, private seachMedicamentsData: MedicineSearchDataService) { }

  ngOnInit() {
    this.getAllMedicines();
    this.getMedicinesBySearch()
  }

  getAllMedicines(): void {
    this.medicineService.getAllMedicines().subscribe(data=>{
      console.log('getAllMedicines', data);
      this.medicines = data;
    });
  };

  getMedicinesBySearch(): void {
    //DataService    
    this.seachMedicamentsData.currentSearchArr.subscribe(currentSearchArr => {
      this.medicines = currentSearchArr;
      console.log('Дата сервис:' , this.medicines);
    });
  }

  addMedicine(): void {
    this.router.navigate(['add-medicine']);
  }

  medicinePage(medicine): void {
    console.log('medicinePage()', medicine);
    this.router.navigate(['medicine-page']);
  } 

  deleteMedicine(medicine: MedicineModel): void {
    this.medicineService.deleteMedicine(medicine._id).subscribe(data=>{
      console.log(data);
      this.getAllMedicines();
    });
  }
  
  searchMedicine(medicine: MedicineModel): void {
    this.medicineService.getMedicineById(medicine._id).subscribe(data=>{
      console.log(data);
      this.getAllMedicines();
    });
  }
  
  updateMedicine(medicine: MedicineModel): void {
    console.log('update medicinePage()');
    localStorage.removeItem("medicineId");
    localStorage.setItem("medicineId", medicine._id);
    //this.router.navigate(['edit-medicine']);
  }

  watchMedicine(medicine: MedicineModel): void {
    console.log('watch medicinePage()');
    localStorage.removeItem("medicineId");
    localStorage.setItem("medicineId", medicine._id);
    //this.router.navigate(['edit-medicine']);
  }
  
  /*medicinePage(medicine: MedicineModel){
    console.log('medicinePage()');
    localStorage.removeItem("medicineId");
    localStorage.setItem("medicineId", medicine._id);
    this.router.navigate(['edit-medicine']);
  }*/
  
  getAllArticles(): void {
    alert('Статей пока нет');
    return;
  }
}
