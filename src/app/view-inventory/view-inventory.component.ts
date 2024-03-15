import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inventory } from './inventory.model';
import { InventoryService } from '../shared/inventory.service';

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-inventory.component.html',
  styleUrl: './view-inventory.component.css'
})
export class ViewInventoryComponent {
  inventorys: Inventory[] = [];

  constructor(private InventoryService: InventoryService) {}

  ngOnInit(): void{
    this.InventoryService.getInventory().subscribe({
      next: (data) =>{
        this.inventorys = data;
      },
      error: (error) =>{
        console.error('Error fetching Inventory: ', error);
      }
    });
  }

}
