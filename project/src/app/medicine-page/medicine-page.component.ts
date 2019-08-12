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

  constructor(private router: Router, private formBuilder: FormBuilder, private medicineService: MedicineService,) { }

  //editForm: FormGroup;
  submitted: boolean = false;
  medicineId = localStorage.getItem("medicineId");
  items: FormArray;
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
    items: this.formBuilder.array([ this.createItem() ])
  });


  ngOnInit() {

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
  

  // get items() {
  //   return this.editForm.get('items') as FormArray;
  // }

  // addItems() {
  //   console.log('addItems');
  //   this.items.push(this.formBuilder.control(''));
  // }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: ''
    });
  }
  
  addItem(): void {
    this.items = this.editForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

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
