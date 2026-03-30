import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-mark">
            <span>7</span>
          </div>
          <h1>Seven Outfit</h1>
          <p>Panel de Administración</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="login-form">
          @if (error) {
            <div class="error-message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{{ error }}</span>
            </div>
          }
          
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input 
                type="email" 
                id="email" 
                name="email"
                [(ngModel)]="email" 
                required 
                email
                placeholder="admin@sevenoutfit.com"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input 
                type="password" 
                id="password" 
                name="password"
                [(ngModel)]="password" 
                required 
                minlength="6"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <button type="submit" [disabled]="!loginForm.valid || loading" class="btn-login">
            @if (loading) {
              <span class="spinner"></span>
              <span>Ingresando...</span>
            } @else {
              <span>Iniciar Sesión</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }
          </button>
        </form>
        
        <div class="login-footer">
          <p>Credenciales por defecto:</p>
          <code>admin&#64;sevenoutfit.com / admin123</code>
        </div>
      </div>
      
      <div class="login-decoration">
        <div class="deco-circle circle-1"></div>
        <div class="deco-circle circle-2"></div>
        <div class="deco-circle circle-3"></div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #3c435d 0%, #4a5273 100%);
      padding: 2rem;
      position: relative;
      overflow: hidden;
    }
    
    .login-decoration {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    
    .deco-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.03);
    }
    
    .circle-1 {
      width: 600px;
      height: 600px;
      top: -200px;
      right: -200px;
    }
    
    .circle-2 {
      width: 400px;
      height: 400px;
      bottom: -100px;
      left: -100px;
    }
    
    .circle-3 {
      width: 200px;
      height: 200px;
      top: 50%;
      left: 10%;
    }
    
    .login-card {
      background: white;
      border-radius: 24px;
      padding: 3rem;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
      position: relative;
      z-index: 1;
      animation: fadeInUp 0.6s ease-out;
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }
    
    .logo-mark {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.8rem;
      border-radius: 16px;
      margin: 0 auto 1.5rem;
      box-shadow: 0 8px 25px rgba(60, 67, 93, 0.3);
    }
    
    .login-header h1 {
      color: var(--primary);
      margin: 0 0 0.3rem;
      font-size: 1.8rem;
      font-weight: 800;
    }
    
    .login-header p {
      color: var(--text-light);
      margin: 0;
      font-size: 0.95rem;
    }
    
    .login-form {
      margin-bottom: 1.5rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text);
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .input-wrapper {
      position: relative;
    }
    
    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-light);
      transition: color 0.3s ease;
    }
    
    .input-wrapper input {
      width: 100%;
      padding: 0.9rem 1rem 0.9rem 3rem;
      border: 2px solid var(--accent);
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: var(--accent);
    }
    
    .input-wrapper input:focus {
      outline: none;
      border-color: var(--primary);
      background: white;
      box-shadow: 0 0 0 4px rgba(60, 67, 93, 0.1);
    }
    
    .input-wrapper input:focus + .input-icon,
    .input-wrapper:focus-within .input-icon {
      color: var(--primary);
    }
    
    .error-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #fef2f2;
      color: #dc2626;
      padding: 1rem;
      border-radius: 12px;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      border: 1px solid #fecaca;
    }
    
    .btn-login {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(60, 67, 93, 0.3);
    }
    
    .btn-login:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(60, 67, 93, 0.4);
    }
    
    .btn-login:disabled {
      background: var(--accent-dark);
      box-shadow: none;
      cursor: not-allowed;
    }
    
    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .login-footer {
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid var(--accent);
    }
    
    .login-footer p {
      color: var(--text-light);
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }
    
    .login-footer code {
      background: var(--accent);
      padding: 0.4rem 1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      color: var(--primary);
      font-weight: 500;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.error = 'Credenciales inválidas. Verifica tu email y contraseña.';
        this.loading = false;
      }
    });
  }
}
