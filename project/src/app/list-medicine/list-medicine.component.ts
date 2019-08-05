import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MedicineModel } from '../MedicineModel';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-list-medicine',
  templateUrl: './list-medicine.component.html',
  styleUrls: ['./list-medicine.component.css']
})
export class ListMedicineComponent implements OnInit {

  medicines: MedicineModel[];

  constructor(private medicineService: MedicineService, private router: Router) { }

  ngOnInit() {
    this.getAllMedicines();
  }

  getAllMedicines(): void {
    this.medicineService.getAllMedicines().subscribe(data=>{
      console.log(data);
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
      //this.getAllMedicines();
    });
  }
  
  updateMedicine(medicine: MedicineModel){
    localStorage.removeItem("medicineId");
    localStorage.setItem("medicineId", medicine._id);
    this.router.navigate(['edit-medicine']);
  }
}
