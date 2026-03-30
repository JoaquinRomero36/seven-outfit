import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product, CreateProduct, ProductCategory, ProductSize } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/active`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  filterProducts(category?: number, size?: number, color?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category.toString());
    if (size) params = params.set('size', size.toString());
    if (color) params = params.set('color', color);
    
    return this.http.get<Product[]>(`${this.apiUrl}/filter`, { params });
  }

  createProduct(product: CreateProduct): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateProduct(id: number, product: CreateProduct & { isActive: boolean }): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  generateWhatsAppLink(product: Product, size?: string): string {
    const phone = '5491112345678'; // Replace with actual WhatsApp number
    const message = encodeURIComponent(
      `Hola, quiero comprar ${product.name} en talle ${size || 'M'} por $${product.price.toLocaleString()}`
    );
    return `https://wa.me/${phone}?text=${message}`;
  }
}
