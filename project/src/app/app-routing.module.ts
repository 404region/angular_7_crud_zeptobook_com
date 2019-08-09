import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMedicineComponent } from './list-medicine/list-medicine.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { EditMedicineComponent } from './edit-medicine/edit-medicine.component';
import { MedicinePageComponent } from './medicine-page/medicine-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'add-medicine', component: AddMedicineComponent },
  { path: 'edit-medicine', component: MedicinePageComponent},
  { path: 'medicine-page', component: MedicinePageComponent},
  { path: '', component: ListMedicineComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  /*,
  { path: 'Medicines', component: ListMedicineComponent, pathMatch: 'full' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
