import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MedicineService } from '../medicine.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-medicine-page',
  templateUrl: './medicine-page.component.html',
  styleUrls: ['./medicine-page.component.css']
})
export class MedicinePageComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private medicineService: MedicineService,) { }

  //editForm: FormGroup;
  submitted: boolean = false;
  medicineId = localStorage.getItem("medicineId");
  fields = {
    isRequired: true,
    description3: {
      items: [
        {
          name: 'Option 1',
          description: '1'
        },
        {
          name: 'Option 2',
          description: '2'
        }
      ]
    }
  };
  
  editForm = this.formBuilder.group({
    _id: ['', Validators.required],
    nameLat: [''],
    name: [''],
    description: [''],
    description2: [''],
    symptoms: [''],
    description3: this.formBuilder.group({
        items: this.formBuilder.array([])
      })
  });


  ngOnInit() {
    this.patch();

    if(!this.medicineId){
      alert("Something wrong!");
      this.router.navigate(['']);
      return;
    }
  
    this.medicineService.getMedicineById(this.medicineId).subscribe(data=>{
      console.log(data);
      this.editForm.patchValue(data); //Don't use editForm.setValue() as it will throw console error
    });
  }
  
  patch() {
    const control = <FormArray>this.editForm.get('description3.items');
    this.fields.description3.items.forEach(x => {
      control.push(this.patchValues(x.name, x.description))
    })
  }

  patchValues(name, description) {
    return this.formBuilder.group({
      label: [name],
      value: [description]
    })
  }

  // get items() {
  //   return this.editForm.get('items') as FormArray;
  // }

  // addItems() {
  //   console.log('addItems');
  //   this.items.push(this.formBuilder.control(''));
  // }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
  
  onSubmit(){
    console.log('onSubmit');
    console.log('form: and return', this.editForm.value);
    return;

    this.submitted = true;
    
    if(this.editForm.valid){
      this.medicineService.updateMedicine(this.editForm.value)
      .subscribe( data => {
        console.log(data);
        //this.router.navigate(['']);
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
