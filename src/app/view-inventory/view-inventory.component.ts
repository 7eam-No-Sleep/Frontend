import { Component, NgModule } from '@angular/core';
import { CommonModule, FormStyle } from '@angular/common';
import { Inventory } from './inventory.model';
import { InventoryService } from '../shared/inventory.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-inventory.component.html',
  styleUrl: './view-inventory.component.css'
})
export class ViewInventoryComponent {
  inventorys: Inventory[] = [];
  filteredInventory: Inventory[] = [];
  searchQuery: string='';

  constructor(private InventoryService: InventoryService, private router: Router) {}

  ngOnInit(): void {
    this.InventoryService.getInventory().subscribe({
      next: (data) => {
        this.inventorys = data;
        this.filteredInventory = [...this.inventorys]; // Initialize filteredInventory with all inventory items
      },
      error: (error) => {
        console.error('Error fetching Inventory: ', error);
      }
    });
  }

  searchInventory() {
    if (!this.searchQuery || this.searchQuery== ''){
      this.filteredInventory = [...this.inventorys]; 
    } else {
      // Filter inventory based on searchQuery
      const query = parseInt(this.searchQuery); // Convert searchQuery to a number
      this.filteredInventory = this.inventorys.filter((inventory) =>
        inventory.ProductName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        inventory.ProductID === query // Check if ProductId matches the query
      );
    }
  }
  onEdit(productId: number){
    this.router.navigate(['/inventory', productId, 'edit'])
  }
}
