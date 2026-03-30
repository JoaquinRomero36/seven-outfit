import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductCategory, ProductSize, CategoryLabels, SizeLabels } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  template: `
    <div class="catalog-container">
      <div class="catalog-header">
        <h1>Nuestro Catálogo</h1>
        <p>Moda juvenil cristiana para la comunidad adventista</p>
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <label>Categoría</label>
          <select [(ngModel)]="selectedCategory" (change)="applyFilters()">
            <option [ngValue]="null">Todas</option>
            @for (cat of categories; track cat.value) {
              <option [ngValue]="cat.value">{{ cat.label }}</option>
            }
          </select>
        </div>
        
        <div class="filter-group">
          <label>Talle</label>
          <select [(ngModel)]="selectedSize" (change)="applyFilters()">
            <option [ngValue]="null">Todos</option>
            @for (size of sizes; track size.value) {
              <option [ngValue]="size.value">{{ size.label }}</option>
            }
          </select>
        </div>
        
        <button class="btn-clear" (click)="clearFilters()">Limpiar filtros</button>
      </div>
      
      @if (loading) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      } @else {
        <div class="products-grid">
          @for (product of filteredProducts; track product.id) {
            <app-product-card [product]="product"></app-product-card>
          } @empty {
            <div class="no-products">
              <p>No se encontraron productos con los filtros seleccionados.</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .catalog-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .catalog-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .catalog-header h1 {
      font-size: 2.5rem;
      color: #1a237e;
      margin-bottom: 0.5rem;
    }
    
    .catalog-header p {
      color: #666;
      font-size: 1.1rem;
    }
    
    .filters {
      display: flex;
      gap: 1.5rem;
      align-items: flex-end;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      background: #f5f5f5;
      padding: 1.5rem;
      border-radius: 12px;
    }
    
    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .filter-group label {
      font-weight: 500;
      color: #333;
      font-size: 0.9rem;
    }
    
    .filter-group select {
      padding: 0.7rem 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      min-width: 150px;
      cursor: pointer;
      transition: border-color 0.3s;
    }
    
    .filter-group select:focus {
      outline: none;
      border-color: #1a237e;
    }
    
    .btn-clear {
      padding: 0.7rem 1.5rem;
      background: #e0e0e0;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s;
    }
    
    .btn-clear:hover {
      background: #bdbdbd;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }
    
    .loading {
      text-align: center;
      padding: 3rem;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #1a237e;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .no-products {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem;
      color: #666;
    }
    
    @media (max-width: 768px) {
      .filters {
        flex-direction: column;
        align-items: stretch;
      }
      
      .filter-group select {
        width: 100%;
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  
  selectedCategory: number | null = null;
  selectedSize: number | null = null;
  
  categories = Object.entries(CategoryLabels).map(([value, label]) => ({ value: +value, label }));
  sizes = Object.entries(SizeLabels).map(([value, label]) => ({ value: +value, label }));

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getActiveProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const categoryMatch = !this.selectedCategory || product.category === this.selectedCategory;
      const sizeMatch = !this.selectedSize || product.size === this.selectedSize;
      return categoryMatch && sizeMatch;
    });
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this.selectedSize = null;
    this.filteredProducts = this.products;
  }
}
