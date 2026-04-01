import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product, CategoryLabels, SizeLabels } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';

declare var MercadoPago: any;

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
              <h3 class="buy-title">Elegí cómo pagar:</h3>
              
              <!-- Botón Mercado Pago -->
              <button 
                (click)="payWithMercadoPago()" 
                class="btn-mercadopago" 
                [disabled]="product.stock === 0 || loadingPayment">
                @if (loadingPayment) {
                  <span class="spinner-small"></span>
                  <span>Procesando...</span>
                } @else {
                  <svg class="mp-logo" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#009EE3" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <span>Pagar con Mercado Pago</span>
                }
              </button>
              
              <div class="divider">
                <span>o</span>
              </div>
              
              <!-- Botón WhatsApp -->
              <a [href]="getWhatsAppLink()" target="_blank" class="btn-whatsapp" [class.disabled]="product.stock === 0">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Contactar por WhatsApp</span>
              </a>
              
              <p class="buy-note">
                Mercado Pago: Pago seguro con tarjeta, débito o transferencia.<br>
                WhatsApp: Te contactamos para coordinar el pago.
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
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .breadcrumb a:hover {
      color: var(--primary-light);
    }
    
    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
    
    .product-image {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--shadow-xl);
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
      background: var(--accent);
      color: var(--primary);
      padding: 0.4rem 1.2rem;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    h1 {
      font-size: 2.2rem;
      color: var(--primary);
      margin-bottom: 0.5rem;
      font-weight: 800;
    }
    
    .price {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 2rem;
    }
    
    .detail-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--accent);
    }
    
    .label {
      color: var(--text-light);
      font-weight: 500;
    }
    
    .value {
      color: var(--text);
      font-weight: 600;
    }
    
    .size-badge {
      background: var(--primary);
      color: white;
      padding: 0.3rem 1rem;
      border-radius: 8px;
      font-weight: 600;
    }
    
    .low-stock {
      color: var(--warning);
    }
    
    .buy-section {
      margin-top: 2rem;
      padding: 2rem;
      background: var(--accent);
      border-radius: 20px;
    }
    
    .buy-title {
      font-size: 1.1rem;
      color: var(--primary);
      margin-bottom: 1.5rem;
      font-weight: 700;
    }
    
    .btn-mercadopago {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      background: linear-gradient(135deg, #009EE3 0%, #007BB8 100%);
      color: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      border: none;
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 158, 227, 0.3);
    }
    
    .btn-mercadopago:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 158, 227, 0.4);
    }
    
    .btn-mercadopago:disabled {
      background: var(--accent-dark);
      box-shadow: none;
      cursor: not-allowed;
    }
    
    .mp-logo {
      width: 24px;
      height: 24px;
    }
    
    .divider {
      display: flex;
      align-items: center;
      margin: 1.5rem 0;
      color: var(--text-light);
      font-size: 0.9rem;
    }
    
    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--accent-dark);
    }
    
    .divider span {
      padding: 0 1rem;
    }
    
    .btn-whatsapp {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      background: #25D366;
      color: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      text-decoration: none;
      font-size: 1.05rem;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    }
    
    .btn-whatsapp:hover:not(.disabled) {
      transform: translateY(-2px);
      background: #128C7E;
      box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
    }
    
    .btn-whatsapp.disabled {
      background: var(--accent-dark);
      box-shadow: none;
      cursor: not-allowed;
    }
    
    .buy-note {
      margin-top: 1.5rem;
      font-size: 0.85rem;
      color: var(--text-light);
      text-align: center;
      line-height: 1.6;
    }
    
    .spinner-small {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    .loading, .not-found {
      text-align: center;
      padding: 4rem;
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid var(--accent);
      border-top: 4px solid var(--primary);
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
        gap: 2rem;
      }
      
      h1 {
        font-size: 1.8rem;
      }
      
      .price {
        font-size: 2rem;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  loadingPayment = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient
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

  payWithMercadoPago(): void {
    if (!this.product || this.product.stock === 0) return;
    
    this.loadingPayment = true;
    
    const body = {
      productId: this.product.id,
      quantity: 1,
      size: this.getSizeLabel(this.product.size)
    };

    this.http.post<any>(`${environment.apiUrl}/payments/create-preference`, body)
      .subscribe({
        next: (response) => {
          // Usar sandbox en desarrollo, initPoint en producción
          const checkoutUrl = environment.production 
            ? response.initPoint 
            : (response.sandboxInitPoint || response.initPoint);
          
          console.log('Checkout URL:', checkoutUrl);
          window.location.href = checkoutUrl;
        },
        error: (error) => {
          console.error('Error creating preference:', error);
          this.loadingPayment = false;
          const errorMsg = error.error?.message || 'Error al procesar el pago';
          alert(`${errorMsg}\n\nPor favor, intentá de nuevo o contactanos por WhatsApp.`);
        }
      });
  }
}
