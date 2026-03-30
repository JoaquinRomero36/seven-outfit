import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, CategoryLabels, SizeLabels, ProductSize } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="detail-container">
      @if (loading) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Cargando producto...</p>
        </div>
      } @else if (product) {
        <div class="breadcrumb">
          <a routerLink="/catalogo">← Volver al catálogo</a>
        </div>
        
        <div class="product-detail">
          <div class="product-image">
            <img [src]="product.imageUrl" [alt]="product.name" />
          </div>
          
          <div class="product-info">
            <span class="category">{{ getCategoryLabel(product.category) }}</span>
            <h1>{{ product.name }}</h1>
            
            <p class="price">\${{ product.price | number:'1.0-0' }}</p>
            
            @if (product.color) {
              <div class="detail-row">
                <span class="label">Color:</span>
                <span class="value">{{ product.color }}</span>
              </div>
            }
            
            <div class="detail-row">
              <span class="label">Talle disponible:</span>
              <span class="value size-badge">{{ getSizeLabel(product.size) }}</span>
            </div>
            
            <div class="detail-row">
              <span class="label">Stock:</span>
              <span class="value" [class.low-stock]="product.stock < 5">
                {{ product.stock > 0 ? product.stock + ' unidades' : 'Sin stock' }}
              </span>
            </div>
            
            <div class="buy-section">
              <a [href]="getWhatsAppLink()" target="_blank" class="btn-buy" [class.disabled]="product.stock === 0">
                <span class="whatsapp-icon">💬</span>
                Comprar por WhatsApp
              </a>
              
              <p class="buy-note">
                Al hacer clic, te redirigiremos a WhatsApp con el mensaje prearmado para comprar este producto.
              </p>
            </div>
          </div>
        </div>
      } @else {
        <div class="not-found">
          <h2>Producto no encontrado</h2>
          <a routerLink="/catalogo">Volver al catálogo</a>
        </div>
      }
    </div>
  `,
  styles: [`
    .detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .breadcrumb {
      margin-bottom: 2rem;
    }
    
    .breadcrumb a {
      color: #1a237e;
      text-decoration: none;
      font-weight: 500;
    }
    
    .breadcrumb a:hover {
      text-decoration: underline;
    }
    
    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
    
    .product-image {
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }
    
    .product-image img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .product-info {
      padding: 1rem 0;
    }
    
    .category {
      display: inline-block;
      background: #e8eaf6;
      color: #1a237e;
      padding: 0.3rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    
    h1 {
      font-size: 2rem;
      color: #1a237e;
      margin-bottom: 1rem;
    }
    
    .price {
      font-size: 2.5rem;
      font-weight: bold;
      color: #2e7d32;
      margin-bottom: 2rem;
    }
    
    .detail-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem 0;
      border-bottom: 1px solid #eee;
    }
    
    .label {
      color: #666;
      font-weight: 500;
    }
    
    .value {
      color: #333;
      font-weight: 600;
    }
    
    .size-badge {
      background: #1a237e;
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 6px;
    }
    
    .low-stock {
      color: #ff9800;
    }
    
    .buy-section {
      margin-top: 2rem;
      padding: 1.5rem;
      background: #f5f5f5;
      border-radius: 12px;
    }
    
    .btn-buy {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      background: #25d366;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 600;
      transition: background 0.3s;
    }
    
    .btn-buy:hover:not(.disabled) {
      background: #128c7e;
    }
    
    .btn-buy.disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .whatsapp-icon {
      font-size: 1.5rem;
    }
    
    .buy-note {
      margin-top: 1rem;
      font-size: 0.85rem;
      color: #666;
      text-align: center;
    }
    
    .loading, .not-found {
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
    
    @media (max-width: 768px) {
      .product-detail {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(+id);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  getCategoryLabel(category: number): string {
    return CategoryLabels[category] || 'Otros';
  }

  getSizeLabel(size: number): string {
    return SizeLabels[size] || 'M';
  }

  getWhatsAppLink(): string {
    if (!this.product) return '';
    return this.productService.generateWhatsAppLink(this.product);
  }
}
