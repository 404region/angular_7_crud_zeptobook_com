import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms"; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './product.service';
import { MedicineService } from './medicine.service';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { EditMedicineComponent } from './edit-medicine/edit-medicine.component';
import { ListMedicineComponent } from './list-medicine/list-medicine.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductsComponent,
    AddProductComponent,
    EditProductComponent,
    AddMedicineComponent,
    EditMedicineComponent,
    ListMedicineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, MedicineService],
  bootstrap: [AppComponent]
})
export class AppModule { }