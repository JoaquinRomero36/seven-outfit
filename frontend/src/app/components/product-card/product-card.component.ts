import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, CategoryLabels } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="product-card">
      <a [routerLink]="['/producto', product.id]" class="product-image-link">
        <div class="product-image">
          <img [src]="product.imageUrl" [alt]="product.name" loading="lazy" />
          <div class="image-overlay">
            <span class="view-text">Ver detalles</span>
          </div>
        </div>
        @if (product.stock < 5 && product.stock > 0) {
          <span class="stock-badge low">Últimas {{ product.stock }}</span>
        }
        @if (product.stock === 0) {
          <span class="stock-badge out">Sin stock</span>
        }
      </a>
      
      <div class="product-info">
        <span class="product-category">{{ getCategoryLabel(product.category) }}</span>
        <h3 class="product-name">
          <a [routerLink]="['/producto', product.id]">{{ product.name }}</a>
        </h3>
        <div class="product-meta">
          <span class="product-size">Talle {{ product.size === 1 ? 'S' : product.size === 2 ? 'M' : product.size === 3 ? 'L' : 'XL' }}</span>
          @if (product.color) {
            <span class="product-color">{{ product.color }}</span>
          }
        </div>
        <div class="product-footer">
          <span class="product-price">\${{ product.price | number:'1.0-0' }}</span>
          <a [href]="getWhatsAppLink()" target="_blank" class="btn-buy" [class.disabled]="product.stock === 0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .product-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 20px rgba(60, 67, 93, 0.08);
    }
    
    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(60, 67, 93, 0.15);
    }
    
    .product-image-link {
      display: block;
      position: relative;
    }
    
    .product-image {
      position: relative;
      height: 300px;
      overflow: hidden;
      background: var(--accent);
    }
    
    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .product-card:hover .product-image img {
      transform: scale(1.08);
    }
    
    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(60, 67, 93, 0.8) 0%, transparent 50%);
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 1.5rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .product-card:hover .image-overlay {
      opacity: 1;
    }
    
    .view-text {
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
      transform: translateY(10px);
      transition: transform 0.3s ease;
    }
    
    .product-card:hover .view-text {
      transform: translateY(0);
    }
    
    .stock-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      padding: 0.4rem 0.9rem;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 600;
      backdrop-filter: blur(10px);
      z-index: 2;
    }
    
    .stock-badge.low {
      background: rgba(245, 158, 11, 0.9);
      color: white;
    }
    
    .stock-badge.out {
      background: rgba(239, 68, 68, 0.9);
      color: white;
    }
    
    .product-info {
      padding: 1.5rem;
    }
    
    .product-category {
      font-size: 0.7rem;
      color: var(--text-light);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }
    
    .product-name {
      margin: 0.5rem 0;
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.4;
    }
    
    .product-name a {
      color: var(--primary);
      transition: color 0.3s ease;
    }
    
    .product-name a:hover {
      color: var(--primary-light);
    }
    
    .product-meta {
      display: flex;
      gap: 0.8rem;
      margin-bottom: 1rem;
    }
    
    .product-size, .product-color {
      font-size: 0.8rem;
      color: var(--text-light);
      background: var(--accent);
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
    }
    
    .product-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid var(--accent);
    }
    
    .product-price {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--primary);
    }
    
    .btn-buy {
      width: 44px;
      height: 44px;
      background: #25d366;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      transition: all 0.3s ease;
    }
    
    .btn-buy:hover:not(.disabled) {
      background: #128c7e;
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    }
    
    .btn-buy.disabled {
      background: var(--accent-dark);
      cursor: not-allowed;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private productService: ProductService) {}

  getCategoryLabel(category: number): string {
    return CategoryLabels[category] || 'Otros';
  }

  getWhatsAppLink(): string {
    return this.productService.generateWhatsAppLink(this.product);
  }
}
