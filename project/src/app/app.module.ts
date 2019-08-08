import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms"; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicineService } from './medicine.service';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { EditMedicineComponent } from './edit-medicine/edit-medicine.component';
import { ListMedicineComponent } from './list-medicine/list-medicine.component';
import { MedicineComponent } from './medicine/medicine.component';
import { SearchMedicineComponent } from './search-medicine/search-medicine.component';
import { MedicineSearchDataService } from './medicine-search-data.service'

@NgModule({
  declarations: [
    AppComponent,
    AddMedicineComponent,
    EditMedicineComponent,
    ListMedicineComponent,
    MedicineComponent,
    SearchMedicineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MedicineService, MedicineSearchDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }