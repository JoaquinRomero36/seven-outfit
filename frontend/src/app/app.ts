import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-brand">
          <div class="footer-logo">
            <span class="logo-mark">7</span>
            <span class="logo-text">Seven Outfit</span>
          </div>
          <p class="footer-tagline">Moda con propósito ✝</p>
        </div>
        
        <div class="footer-links">
          <div class="footer-col">
            <h4>Navegación</h4>
            <a href="/">Inicio</a>
            <a href="/catalogo">Catálogo</a>
            <a href="/login">Admin</a>
          </div>
          
          <div class="footer-col">
            <h4>Contacto</h4>
            <a href="https://wa.me/5491112345678" target="_blank">WhatsApp</a>
            <span class="footer-email">info&#64;sevenoutfit.com</span>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2024 Seven Outfit - Comunidad Juvenil Adventista</p>
      </div>
    </footer>
  `,
  styles: [`
    main {
      min-height: 100vh;
      padding-top: 80px;
    }
    
    .footer {
      background: var(--primary);
      color: white;
      padding: 4rem 5% 0;
    }
    
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      padding-bottom: 3rem;
    }
    
    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    
    .footer-logo .logo-mark {
      width: 40px;
      height: 40px;
      background: white;
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.2rem;
      border-radius: 10px;
    }
    
    .footer-logo .logo-text {
      font-size: 1.3rem;
      font-weight: 700;
    }
    
    .footer-tagline {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
    }
    
    .footer-links {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    
    .footer-col {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    
    .footer-col h4 {
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
      color: rgba(255, 255, 255, 0.5);
    }
    
    .footer-col a, .footer-email {
      color: rgba(255, 255, 255, 0.85);
      font-size: 0.95rem;
      transition: color 0.3s ease;
    }
    
    .footer-col a:hover {
      color: white;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1.5rem 0;
      text-align: center;
    }
    
    .footer-bottom p {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.85rem;
    }
    
    @media (max-width: 768px) {
      .footer-container {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .footer-links {
        grid-template-columns: 1fr 1fr;
      }
    }
  `]
})
export class AppComponent {
  title = 'Seven Outfit';
}
