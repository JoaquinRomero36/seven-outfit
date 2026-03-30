import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <div class="header-container">
        <a routerLink="/" class="logo">
          <span class="logo-mark">7</span>
          <span class="logo-text">Seven <span class="logo-accent">Outfit</span></span>
        </a>
        
        <nav class="nav-menu">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            <span class="nav-text">Inicio</span>
          </a>
          <a routerLink="/catalogo" routerLinkActive="active">
            <span class="nav-text">Catálogo</span>
          </a>
          @if (isLoggedIn) {
            <a routerLink="/admin" routerLinkActive="active">
              <span class="nav-text">Admin</span>
            </a>
            <button class="btn-logout" (click)="logout()">
              <span>Salir</span>
            </button>
          } @else {
            <a routerLink="/login" class="btn-login">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Admin</span>
            </a>
          }
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: rgba(60, 67, 93, 0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: 0 3rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .header.scrolled {
      background: rgba(60, 67, 93, 0.98);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
      padding: 0 3rem;
    }
    
    .header-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      text-decoration: none;
      color: white;
      transition: transform 0.3s ease;
    }
    
    .logo:hover {
      transform: scale(1.02);
    }
    
    .logo-mark {
      width: 45px;
      height: 45px;
      background: linear-gradient(135deg, #ffffff 0%, #eaeaec 100%);
      color: #3c435d;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .logo-text {
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    
    .logo-accent {
      font-weight: 400;
      opacity: 0.8;
    }
    
    .nav-menu {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    
    .nav-menu > a {
      position: relative;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 500;
      font-size: 0.95rem;
      padding: 0.6rem 1.2rem;
      border-radius: 10px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }
    
    .nav-menu > a::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-menu > a:hover::before,
    .nav-menu > a.active::before {
      transform: scaleX(1);
    }
    
    .nav-menu > a:hover,
    .nav-menu > a.active {
      color: white;
    }
    
    .nav-text {
      position: relative;
      z-index: 1;
    }
    
    .btn-login {
      display: flex !important;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.15) !important;
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-left: 0.5rem;
    }
    
    .btn-login:hover {
      background: rgba(255, 255, 255, 0.25) !important;
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    .btn-login svg {
      opacity: 0.9;
    }
    
    .btn-logout {
      background: rgba(239, 68, 68, 0.9);
      color: white;
      border: none;
      padding: 0.6rem 1.2rem;
      border-radius: 10px;
      font-weight: 500;
      font-size: 0.95rem;
      margin-left: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .btn-logout:hover {
      background: #ef4444;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    }
    
    @media (max-width: 768px) {
      .header {
        padding: 0 1.5rem;
      }
      
      .header-container {
        height: 70px;
      }
      
      .logo-text {
        display: none;
      }
      
      .nav-menu {
        gap: 0.25rem;
      }
      
      .nav-menu > a {
        padding: 0.5rem 0.8rem;
        font-size: 0.85rem;
      }
    }
  `]
})
export class HeaderComponent {
  isLoggedIn = false;
  isScrolled = false;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(
      status => this.isLoggedIn = status
    );
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 50;
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
