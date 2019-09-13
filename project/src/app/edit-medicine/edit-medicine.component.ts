import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.css']
})
export class EditMedicineComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private medicineService: MedicineService,) { }

  editForm: FormGroup;
  submitted: boolean = false;
  medicineId = localStorage.getItem("medicineId");
  descriptions: FormArray;
  
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      _id: ['', Validators.required],
      nameLat: [''],
      name: [''],
      description: [''],
      symptoms: [''],
      descriptions: this.formBuilder.array([ this.createItem() ])
    });

    if(!this.medicineId){
      alert("Something wrong!");
      this.router.navigate(['']);
      return;
    }
  
    this.medicineService.getMedicineById(this.medicineId).subscribe(data=>{
      console.log('data', data);
      console.log('form before editForm.patchValue(data)', this.editForm.value);

      // 
      
      data.symptoms = data.symptomsArr.join(',');

      // если есть в базе массив с описаниями, то стираем из массива дефолтное значение,
      // а то личшний элемент сохраняется на форме
      if(data.descriptions.length > 0) {
        (this.editForm.get("descriptions") as FormArray)['controls'].splice(0);
      }

      // В ангуляре массив в реактивной форме, сам по себе не обрабатывается в patchValue
      // поэтому используем перебор массива
      for (let description = 0; description < data.descriptions.length; description++) {
        const descriptionsFormArray = this.editForm.get("descriptions") as FormArray;
        descriptionsFormArray.push(this.description);
        console.log('i: ', description);
      }
      console.log('data',data);

     this.editForm.patchValue(data);

      console.log('form after editForm.patchValue(data)', this.editForm.value);
    });    
  }
  
  get description(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  // get descriptions() {
  //  return this.editForm.get('descriptions') as FormArray;
  // }

  // addItems() {
  //   console.log('addItems');
  //   this.items.push(this.formBuilder.control(''));
  // }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  
  
  addItem(): void {
    this.descriptions = this.editForm.get('descriptions') as FormArray;
    this.descriptions.push(this.createItem());
  }

  onSubmit(){
    console.log('onSubmit');
    console.log('form: ', this.editForm.value);

    this.submitted = true;
    let data = this.editForm.value;
    
    data.symptomsArr = data.symptoms.split(',');
    data.symptomsArr = data.symptomsArr.map(function (item) {
      return item.toLowerCase();
    });
    
    if(this.editForm.valid){
      this.medicineService.updateMedicine(data)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['']);
      });
    }
  }
  
  deleteMedicine(){
      this.medicineService.deleteMedicine(this.medicineId)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['']);
      });

  }
}
