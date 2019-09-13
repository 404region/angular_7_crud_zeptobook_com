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
import { MedicineSearchDataService } from './medicine-search-data.service';
import { MedicinePageComponent } from './medicine-page/medicine-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './test/test.component';
import { MenuComponent } from './menu/menu.component'

@NgModule({
  declarations: [
    AppComponent,
    AddMedicineComponent,
    EditMedicineComponent,
    ListMedicineComponent,
    MedicineComponent,
    SearchMedicineComponent,
    MedicinePageComponent,
    PageNotFoundComponent,
    TestComponent,
    MenuComponent
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