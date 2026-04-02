import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

declare var MercadoPago: any;

@Component({
  selector: 'app-payment-brick',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="brick-overlay" (click)="close()">
      <div class="brick-container" (click)="$event.stopPropagation()">
        <div class="brick-header">
          <h3>Completá tu compra</h3>
          <button class="btn-close" (click)="close()">×</button>
        </div>
        
        <div class="brick-price">
          <span>Total a pagar:</span>
          <strong>\${{ amount | number:'1.0-0' }}</strong>
        </div>
        
        @if (loading) {
          <div class="brick-loading">
            <div class="spinner"></div>
            <p>Cargando formulario de pago...</p>
          </div>
        }
        
        @if (error) {
          <div class="brick-error">
            <p>{{ error }}</p>
          </div>
        }
        
        <div id="payment-brick-container"></div>
        
        <p class="brick-note">
          Pago seguro procesado por Mercado Pago
        </p>
      </div>
    </div>
  `,
  styles: [`
    .brick-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 1rem;
    }
    
    .brick-container {
      background: white;
      border-radius: 20px;
      width: 100%;
      max-width: 450px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    }
    
    .brick-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #eaeaec;
    }
    
    .brick-header h3 {
      margin: 0;
      color: #3c435d;
    }
    
    .btn-close {
      background: none;
      border: none;
      font-size: 1.8rem;
      color: #666;
      cursor: pointer;
    }
    
    .brick-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      background: #eaeaec;
    }
    
    .brick-price span { color: #666; }
    .brick-price strong { font-size: 1.5rem; color: #3c435d; }
    
    .brick-loading, .brick-error {
      padding: 3rem;
      text-align: center;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #eaeaec;
      border-top: 3px solid #3c435d;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .brick-error {
      color: #c62828;
    }
    
    #payment-brick-container {
      padding: 1rem;
      min-height: 200px;
    }
    
    .brick-note {
      text-align: center;
      padding: 1rem;
      color: #666;
      font-size: 0.8rem;
      border-top: 1px solid #eaeaec;
    }
  `]
})
export class PaymentBrickComponent implements OnInit, OnDestroy {
  @Input() productId!: number;
  @Input() amount!: number;
  @Input() productName!: string;
  @Output() closeBrick = new EventEmitter<void>();
  @Output() paymentSuccess = new EventEmitter<any>();

  loading = true;
  error: string | null = null;
  private mp: any;
  private brickInstance: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMercadoPago();
  }

  ngOnDestroy(): void {
    if (this.brickInstance) {
      try {
        this.brickInstance.unmount();
      } catch (e) {}
    }
  }

  private loadMercadoPago(): void {
    if (typeof MercadoPago !== 'undefined') {
      this.createPreference();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => this.createPreference();
    script.onerror = () => {
      this.error = 'Error cargando Mercado Pago';
      this.loading = false;
    };
    document.body.appendChild(script);
  }

  private createPreference(): void {
    this.http.post<any>(`${environment.apiUrl}/payments/create-preference`, {
      productId: this.productId,
      quantity: 1,
      size: 'M'
    }).subscribe({
      next: (response) => {
        this.initBrick(response.preferenceId);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al crear la preferencia';
        this.loading = false;
      }
    });
  }

  private initBrick(preferenceId: string): void {
    try {
      this.mp = new MercadoPago(environment.mercadoPagoPublicKey, { 
        locale: 'es-AR' 
      });

      const callbacks = {
        onReady: () => {
          console.log('Brick is ready');
          this.loading = false;
        },
        onError: (error: any) => {
          console.error('Brick error:', error);
          this.error = 'Error en el formulario de pago';
          this.loading = false;
        }
      };

      this.brickInstance = this.mp.bricks().create('payment', 'payment-brick-container', {
        initialization: {
          preferenceId: preferenceId,
          amount: this.amount
        },
        customization: {
          paymentMethods: {
            creditCard: 'all',
            debitCard: 'all',
            ticket: 'all',
            bankTransfer: 'all',
            mercadoPago: 'all'
          }
        },
        locale: 'es-AR',
        onSubmit: (data: any) => {
          console.log('Payment submitted:', data);
        },
        onReady: callbacks.onReady,
        onError: callbacks.onError
      });
    } catch (e: any) {
      console.error('Exception:', e);
      this.error = e.message || 'Error initializing Brick';
      this.loading = false;
    }
  }

  close(): void {
    if (this.brickInstance) {
      try {
        this.brickInstance.unmount();
      } catch (e) {}
    }
    this.closeBrick.emit();
  }
}
