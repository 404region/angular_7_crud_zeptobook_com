import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine-page',
  templateUrl: './medicine-page.component.html',
  styleUrls: ['./medicine-page.component.css']
})
export class MedicinePageComponent implements OnInit {

  constructor(private router: Router, private medicineService: MedicineService,) { }

  submitted: boolean = false;
  medicineId = localStorage.getItem("medicineId");
  descriptions: FormArray;
  medicine = {};
  
  ngOnInit() {

    if(!this.medicineId){
      alert("Something wrong!");
      this.router.navigate(['']);
      return;
    }
  
    this.medicineService.getMedicineById(this.medicineId).subscribe(data=>{
      this.medicine = data;
      console.log('data', data);
      
      //this.medicine.symptoms = data.symptomsArr.join(',');

      // если есть в базе массив с описаниями, то стираем из массива дефолтное значение,
      // а то личшний элемент сохраняется на форме
      // if(data.descriptions.length > 0) {
      //   (this.editForm.get("descriptions") as FormArray)['controls'].splice(0);
      // }

      // В ангуляре массив в реактивной форме, сам по себе не обрабатывается в patchValue
      // поэтому используем перебор массива
      // for (let description = 0; description < data.descriptions.length; description++) {
      //   const descriptionsFormArray = this.editForm.get("descriptions") as FormArray;
      //   descriptionsFormArray.push(this.description);
      //   console.log('i: ', description);
      // }
      console.log('data',data);

    //  this.editForm.patchValue(data);

    //   console.log('form after editForm.patchValue(data)', this.editForm.value);
    });    
  }
  
  updateMedicine(): void {
    console.log('update medicinePage()');
    // localStorage.removeItem("medicineId");
    // localStorage.setItem("medicineId", medicine._id);
    //this.router.navigate(['edit-medicine']);
  }

}
