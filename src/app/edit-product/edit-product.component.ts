import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../shared/inventory.service';
import { Inventory } from '../view-inventory/inventory.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  productId: number =0;
  product: Inventory = {
    ProductID: 0,
    ProductName: '',
    Category: '',
    Description: '',
    CostPrice: 0,
    SellingPrice: 0,
    QuantityInStock: 0,
    Color: '',
    Size: '',
    Material: ''
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService
  ) {}


  ngOnInit(): void{
    this.route.params.subscribe(params =>{
      this.productId = params['id'];
      this.inventoryService.getProductById(this.productId).subscribe(
        (data)=>{
          this.product = data;
        },
        (error)=>{
          console.error('Error fetching product details:', error);
        }
      );
    });
  }
  saveProduct(): void {
    this.inventoryService.updateProduct(this.product).subscribe(
      (data) => {
        console.log('Product updated successfully:', data);
        // Navigate back to view inventory page or any other appropriate page
        this.router.navigate(['/viewinventory']);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

}
