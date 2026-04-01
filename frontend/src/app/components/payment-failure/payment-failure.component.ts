import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="result-container">
      <div class="result-card failure">
        <div class="result-icon">
          <svg viewBox="0 0 24 24" width="80" height="80">
            <circle cx="12" cy="12" r="10" fill="#EF4444"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
          </svg>
        </div>
        <h1>Pago no completado</h1>
        <p>Hubo un problema con tu pago.</p>
        <p class="subtitle">No se realizó ningún cargo a tu cuenta.</p>
        <div class="actions">
          <a routerLink="/catalogo" class="btn-primary">Intentar de nuevo</a>
          <a href="https://wa.me/5493512032675" target="_blank" class="btn-whatsapp">Contactar por WhatsApp</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .result-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    
    .result-card {
      background: white;
      border-radius: 24px;
      padding: 3rem;
      text-align: center;
      max-width: 500px;
      box-shadow: var(--shadow-xl);
      animation: fadeInUp 0.6s ease-out;
    }
    
    .result-icon {
      margin-bottom: 1.5rem;
    }
    
    h1 {
      color: #EF4444;
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--text);
      font-size: 1.1rem;
    }
    
    .subtitle {
      color: var(--text-light);
      font-size: 0.95rem;
      margin-top: 0.5rem;
    }
    
    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn-primary {
      background: var(--primary);
      color: white;
      padding: 0.8rem 2rem;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
    }
    
    .btn-whatsapp {
      background: #25D366;
      color: white;
      padding: 0.8rem 2rem;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class PaymentFailureComponent {}
