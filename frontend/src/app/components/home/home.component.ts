import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg">
          <div class="hero-gradient"></div>
          <div class="hero-pattern"></div>
        </div>
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">✝</span>
            <span>Comunidad Juvenil Adventista</span>
          </div>
          <h1 class="hero-title">
            <span class="title-line">Moda con</span>
            <span class="title-line title-accent">Propósito</span>
          </h1>
          <p class="hero-subtitle">
            Viste tu fe, expresa tu estilo. Ropa diseñada para jóvenes cristianos.
          </p>
          <div class="hero-actions">
            <a routerLink="/catalogo" class="btn-primary">
              <span>Ver Catálogo</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#featured" class="btn-ghost">
              <span>Explorar</span>
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="visual-card">
            <div class="card-content">
              <span class="card-icon">👕</span>
              <span class="card-label">Nueva Colección</span>
            </div>
          </div>
          <div class="visual-card card-2">
            <div class="card-content">
              <span class="card-icon">✨</span>
              <span class="card-label">Fe & Estilo</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Featured Products -->
      <section id="featured" class="featured">
        <div class="section-header">
          <span class="section-tag">Destacados</span>
          <h2 class="section-title">Lo más nuevo</h2>
          <p class="section-subtitle">Descubre nuestra selección especial</p>
        </div>
        
        <div class="products-grid">
          @for (product of featuredProducts; track product.id; let i = $index) {
            <div class="product-item" [style.animation-delay]="i * 0.1 + 's'">
              <app-product-card [product]="product"></app-product-card>
            </div>
          }
        </div>
        
        <div class="see-all">
          <a routerLink="/catalogo" class="btn-outline">
            <span>Ver todo el catálogo</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </section>
      
      <!-- Info Section -->
      <section class="info-section">
        <div class="info-container">
          <div class="info-card">
            <div class="info-icon-wrapper">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <h3>Envíos a todo el país</h3>
            <p>Realizamos envíos a toda Argentina vía correo oficial</p>
          </div>
          
          <div class="info-card">
            <div class="info-icon-wrapper whatsapp">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </div>
            <h3>Compra por WhatsApp</h3>
            <p>Proceso de compra simple y directo vía mensaje</p>
          </div>
          
          <div class="info-card">
            <div class="info-icon-wrapper faith">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>Fe y Estilo</h3>
            <p>Moda cristiana para jóvenes adventistas</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
    }
    
    /* Hero Section */
    .hero {
      position: relative;
      min-height: 90vh;
      display: flex;
      align-items: center;
      padding: 100px 5% 60px;
      overflow: hidden;
    }
    
    .hero-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    
    .hero-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #3c435d 0%, #4a5273 50%, #3c435d 100%);
    }
    
    .hero-pattern {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
      background-size: 40px 40px;
      opacity: 0.5;
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 650px;
      animation: fadeInUp 0.8s ease-out;
    }
    
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 0.6rem 1.2rem;
      border-radius: 50px;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    
    .badge-icon {
      font-size: 1rem;
    }
    
    .hero-title {
      font-size: clamp(3rem, 6vw, 4.5rem);
      font-weight: 800;
      color: white;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    
    .title-line {
      display: block;
    }
    
    .title-accent {
      background: linear-gradient(135deg, #eaeaec 0%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.7;
      margin-bottom: 2.5rem;
      max-width: 500px;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: white;
      color: #3c435d;
      padding: 1rem 2rem;
      border-radius: 14px;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
    }
    
    .btn-primary svg {
      transition: transform 0.3s ease;
    }
    
    .btn-primary:hover svg {
      transform: translateX(4px);
    }
    
    .btn-ghost {
      display: inline-flex;
      align-items: center;
      color: white;
      padding: 1rem 2rem;
      border-radius: 14px;
      font-weight: 500;
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
    }
    
    .btn-ghost:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
    
    .hero-visual {
      position: absolute;
      right: 10%;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
    
    .visual-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 2rem;
      animation: float 4s ease-in-out infinite;
    }
    
    .visual-card.card-2 {
      margin-top: 1rem;
      margin-left: 3rem;
      animation-delay: -2s;
    }
    
    .card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: white;
    }
    
    .card-icon {
      font-size: 3rem;
    }
    
    .card-label {
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    
    /* Featured Section */
    .featured {
      padding: 6rem 5%;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .section-tag {
      display: inline-block;
      background: var(--accent);
      color: var(--primary);
      padding: 0.4rem 1rem;
      border-radius: 50px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }
    
    .section-subtitle {
      color: var(--text-light);
      font-size: 1.1rem;
    }
    
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .product-item {
      animation: fadeInUp 0.6s ease-out backwards;
    }
    
    .see-all {
      text-align: center;
      margin-top: 4rem;
    }
    
    .btn-outline {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--primary);
      padding: 1rem 2rem;
      border-radius: 14px;
      font-weight: 600;
      border: 2px solid var(--primary);
      transition: all 0.3s ease;
    }
    
    .btn-outline:hover {
      background: var(--primary);
      color: white;
    }
    
    .btn-outline svg {
      transition: transform 0.3s ease;
    }
    
    .btn-outline:hover svg {
      transform: translateX(4px);
    }
    
    /* Info Section */
    .info-section {
      background: var(--accent);
      padding: 6rem 5%;
    }
    
    .info-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .info-card {
      background: white;
      padding: 2.5rem;
      border-radius: 20px;
      text-align: center;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 20px rgba(60, 67, 93, 0.08);
    }
    
    .info-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(60, 67, 93, 0.15);
    }
    
    .info-icon-wrapper {
      width: 70px;
      height: 70px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      margin: 0 auto 1.5rem;
      transition: transform 0.3s ease;
    }
    
    .info-card:hover .info-icon-wrapper {
      transform: scale(1.1) rotate(5deg);
    }
    
    .info-icon-wrapper.whatsapp {
      background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    }
    
    .info-icon-wrapper.faith {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    }
    
    .info-card h3 {
      color: var(--primary);
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .info-card p {
      color: var(--text-light);
      line-height: 1.6;
    }
    
    @media (max-width: 1024px) {
      .hero-visual {
        display: none;
      }
      
      .hero-content {
        max-width: 100%;
        text-align: center;
      }
      
      .hero-subtitle {
        margin-left: auto;
        margin-right: auto;
      }
      
      .hero-actions {
        justify-content: center;
      }
    }
    
    @media (max-width: 768px) {
      .hero {
        padding: 120px 5% 60px;
        min-height: 80vh;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .info-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getActiveProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products.slice(0, 4);
      }
    });
  }
}
