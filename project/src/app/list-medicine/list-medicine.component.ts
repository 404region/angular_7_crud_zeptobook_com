import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from "@angular/router";
import { MedicineModel } from '../MedicineModel';
import { MedicineService } from '../medicine.service';
import { SearchMedicineComponent } from '../search-medicine/search-medicine.component';

@Component({
  selector: 'app-list-medicine',
  templateUrl: './list-medicine.component.html',
  styleUrls: ['./list-medicine.component.css']
})
export class ListMedicineComponent implements OnInit  {
  //@ViewChild(SearchMedicineComponent) child;

  searchMedicamentsArray: any;
  medicines: MedicineModel[];

 // messageFromChild: any;

  constructor(private medicineService: MedicineService, private router: Router) { }

  
  /*receiveMessage($event) {
    this.messageFromChild = $event
    console.log('messageFromChild', this.messageFromChild);
  }*/

  /*ngAfterViewInit() {
    console.log('ngAfterViewInit', this.child.medicamentsArray);
    this.searchMedicamentsArray = this.child.medicamentsArray;

    //this.medicines = this.searchMedicamentsArray;
    this.getAllMedicines();
  }*/

  /*onChanged(data: any) {
    console.log('data: ', );
  }*/

  ngOnInit() {
    this.getAllMedicines();
  }

  getAllMedicines(): void {
    this.medicineService.getAllMedicines().subscribe(data=>{
      console.log('getAllMedicines', data);
      this.medicines = data;
    });
  };

  addMedicine(): void {
    this.router.navigate(['add-medicine']);
  }

  deleteMedicine(medicine: MedicineModel){
    this.medicineService.deleteMedicine(medicine._id).subscribe(data=>{
      console.log(data);
      this.getAllMedicines();
    });
  }
  
  searchMedicine(medicine: MedicineModel){
    this.medicineService.getMedicineById(medicine._id).subscribe(data=>{
      console.log(data);
      this.getAllMedicines();
    });
  }
  
  updateMedicine(medicine: MedicineModel){
    localStorage.removeItem("medicineId");
    localStorage.setItem("medicineId", medicine._id);
    this.router.navigate(['edit-medicine']);
  }
}
