import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product, CreateProduct, ProductCategory, ProductSize, CategoryLabels, SizeLabels } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="admin-container">
      <div class="admin-header">
        <h1>Panel de Administración</h1>
        <button class="btn-new" (click)="openModal()">+ Nuevo Producto</button>
      </div>
      
      <div class="products-table">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Talle</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @for (product of products; track product.id) {
              <tr>
                <td><img [src]="product.imageUrl" [alt]="product.name" class="product-thumb" /></td>
                <td>{{ product.name }}</td>
                <td>{{ getCategoryLabel(product.category) }}</td>
                <td>{{ getSizeLabel(product.size) }}</td>
                <td>\${{ product.price | number:'1.0-0' }}</td>
                <td [class.low-stock]="product.stock < 5">{{ product.stock }}</td>
                <td>
                  <span class="status-badge" [class.active]="product.isActive" [class.inactive]="!product.isActive">
                    {{ product.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-edit" (click)="editProduct(product)">Editar</button>
                    <button class="btn-delete" (click)="deleteProduct(product.id)">Eliminar</button>
                  </div>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="8" class="empty-message">No hay productos registrados</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      
      @if (showModal) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>{{ editingProduct ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
              <button class="btn-close" (click)="closeModal()">×</button>
            </div>
            
            <form (ngSubmit)="saveProduct()" #productForm="ngForm">
              <div class="form-row">
                <div class="form-group">
                  <label>Nombre *</label>
                  <input type="text" [(ngModel)]="currentProduct.name" name="name" required />
                </div>
                
                <div class="form-group">
                  <label>Precio *</label>
                  <input type="number" [(ngModel)]="currentProduct.price" name="price" required min="0" />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Categoría *</label>
                  <select [(ngModel)]="currentProduct.category" name="category" required>
                    @for (cat of categories; track cat.value) {
                      <option [ngValue]="cat.value">{{ cat.label }}</option>
                    }
                  </select>
                </div>
                
                <div class="form-group">
                  <label>Talle *</label>
                  <select [(ngModel)]="currentProduct.size" name="size" required>
                    @for (size of sizes; track size.value) {
                      <option [ngValue]="size.value">{{ size.label }}</option>
                    }
                  </select>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Color</label>
                  <input type="text" [(ngModel)]="currentProduct.color" name="color" />
                </div>
                
                <div class="form-group">
                  <label>Stock *</label>
                  <input type="number" [(ngModel)]="currentProduct.stock" name="stock" required min="0" />
                </div>
              </div>
              
              <div class="form-group">
                <label>URL de Imagen *</label>
                <input type="url" [(ngModel)]="currentProduct.imageUrl" name="imageUrl" required 
                       placeholder="https://example.com/image.jpg" />
              </div>
              
              @if (editingProduct) {
                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" [(ngModel)]="currentProduct.isActive" name="isActive" />
                    Producto activo
                  </label>
                </div>
              }
              
              <div class="modal-actions">
                <button type="button" class="btn-cancel" (click)="closeModal()">Cancelar</button>
                <button type="submit" class="btn-save" [disabled]="!productForm.valid">
                  {{ editingProduct ? 'Actualizar' : 'Crear' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .admin-header h1 {
      color: #1a237e;
      margin: 0;
    }
    
    .btn-new {
      background: #2e7d32;
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .btn-new:hover {
      background: #1b5e20;
    }
    
    .products-table {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    th {
      background: #f5f5f5;
      font-weight: 600;
      color: #333;
    }
    
    .product-thumb {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
    }
    
    .low-stock {
      color: #ff9800;
      font-weight: 600;
    }
    
    .status-badge {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    
    .status-badge.active {
      background: #e8f5e9;
      color: #2e7d32;
    }
    
    .status-badge.inactive {
      background: #ffebee;
      color: #c62828;
    }
    
    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }
    
    .btn-edit, .btn-delete {
      padding: 0.4rem 0.8rem;
      border: none;
      border-radius: 4px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .btn-edit {
      background: #e3f2fd;
      color: #1565c0;
    }
    
    .btn-edit:hover {
      background: #bbdefb;
    }
    
    .btn-delete {
      background: #ffebee;
      color: #c62828;
    }
    
    .btn-delete:hover {
      background: #ffcdd2;
    }
    
    .empty-message {
      text-align: center;
      color: #666;
      padding: 3rem !important;
    }
    
    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    
    .modal-content {
      background: white;
      border-radius: 16px;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #eee;
    }
    
    .modal-header h2 {
      margin: 0;
      color: #1a237e;
    }
    
    .btn-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
    }
    
    .modal-content form {
      padding: 1.5rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .form-group {
      margin-bottom: 1.2rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #333;
    }
    
    .form-group input,
    .form-group select {
      width: 100%;
      padding: 0.7rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      box-sizing: border-box;
    }
    
    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: #1a237e;
    }
    
    .checkbox-label {
      display: flex !important;
      align-items: center;
      gap: 0.5rem;
    }
    
    .checkbox-label input {
      width: auto !important;
    }
    
    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      padding-top: 1rem;
      border-top: 1px solid #eee;
      margin-top: 1rem;
    }
    
    .btn-cancel, .btn-save {
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .btn-cancel {
      background: #f5f5f5;
      border: none;
      color: #666;
    }
    
    .btn-cancel:hover {
      background: #e0e0e0;
    }
    
    .btn-save {
      background: #1a237e;
      border: none;
      color: white;
    }
    
    .btn-save:hover:not(:disabled) {
      background: #3949ab;
    }
    
    .btn-save:disabled {
      background: #9e9e9e;
      cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .products-table {
        overflow-x: auto;
      }
      
      table {
        min-width: 700px;
      }
    }
  `]
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  showModal = false;
  editingProduct: Product | null = null;
  
  categories = Object.entries(CategoryLabels).map(([value, label]) => ({ value: +value, label }));
  sizes = Object.entries(SizeLabels).map(([value, label]) => ({ value: +value, label }));
  
  currentProduct: CreateProduct & { isActive: boolean } = this.getEmptyProduct();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  getEmptyProduct(): CreateProduct & { isActive: boolean } {
    return {
      name: '',
      price: 0,
      category: ProductCategory.Remeras,
      size: ProductSize.M,
      color: '',
      stock: 0,
      imageUrl: '',
      isActive: true
    };
  }

  openModal(): void {
    this.editingProduct = null;
    this.currentProduct = this.getEmptyProduct();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingProduct = null;
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.currentProduct = {
      name: product.name,
      price: product.price,
      category: product.category,
      size: product.size,
      color: product.color || '',
      stock: product.stock,
      imageUrl: product.imageUrl,
      isActive: product.isActive
    };
    this.showModal = true;
  }

  saveProduct(): void {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, this.currentProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
        },
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      this.productService.createProduct(this.currentProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
        },
        error: (err) => console.error('Error creating product:', err)
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }

  getCategoryLabel(category: number): string {
    return CategoryLabels[category] || 'Otros';
  }

  getSizeLabel(size: number): string {
    return SizeLabels[size] || 'M';
  }
}
