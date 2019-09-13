import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getAllMedicines() :void {
    this.router.navigate(['']);
  }

  addMedicine(): void {
    this.router.navigate(['add-medicine']);
  }
  
  getAllArticles(): void {
    alert('Статей пока нет');
    return;
  }
}
