import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicineModel } from './MedicineModel';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  baseurl: string = "http://localhost:3000/";

  getAllMedicines(){
    return this.http.get<MedicineModel[]>(this.baseurl + 'Medicines');
  }

  findMany(val: object){
    console.log('findManyBy medicine service');
    return this.http.post(this.baseurl + 'Medicines', val);
  }

  getMedicineById(id: string){
    return this.http.get<MedicineModel>(this.baseurl + 'Medicines' + '/' + id);
  }

  addMedicine(medicine: MedicineModel){
    return this.http.post(this.baseurl + 'Medicines', medicine);
  }

  deleteMedicine(id: string){
    return this.http.delete(this.baseurl + 'Medicines' + '/' + id);
  }

  updateMedicine(medicine: MedicineModel){
    return this.http.put(this.baseurl + 'Medicines' + '/' + medicine._id, medicine);
  }
}