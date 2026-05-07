# Integración Mercado Pago - Checkout Pro

## Arquitectura

```
Frontend (Angular)
  → POST /api/payments/create-preference
      → Backend (C# ASP.NET Core)
          → MercadoPagoService
              → POST https://api.mercadopago.com/checkout/preferences
Backend devuelve { preferenceId, initPoint, sandboxInitPoint }
Frontend redirige al checkout
Mercado Pago redirige de vuelta a /pago/exito|fallo|pendiente
```

---

## 1. Credenciales

Obtener desde [developers.mercadopago.com](https://developers.mercadopago.com)

- **Public Key**: Usada en el frontend (`environment.ts`)
- **Access Token**: Usada en el backend (`appsettings.json`)

```json
// appsettings.json
"MercadoPago": {
    "AccessToken": "APP_USR-xxx...",
    "PublicKey": "APP_USR-xxx...",
    "BaseUrl": "http://localhost:4200"
}
```

```ts
// environment.ts
export const environment = {
  apiUrl: 'http://localhost:5000/api',
  mercadoPagoPublicKey: 'APP_USR-xxx...'
};
```

---

## 2. Backend - MercadoPagoService

**Archivo:** `src/SevenOutfit.Infrastructure/Services/MercadoPagoService.cs`

### DTOs

```csharp
public class CreatePaymentPreferenceDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; } = 1;
    public string? Size { get; set; }
}

public class PaymentPreferenceResponseDto
{
    public string PreferenceId { get; set; }
    public string InitPoint { get; set; }        // Producción
    public string SandboxInitPoint { get; set; }  // Testing
}
```

### Flujo

1. Recibe `productId`, `quantity`, `size`
2. Busca el producto en DB
3. Crea una preferencia con:
   - Items: id, title, description, quantity, unit_price
   - `back_urls`: success, failure, pending (usando `BaseUrl`)
   - `auto_return`: "approved"
   - `external_reference`: ID único de orden
4. Envía POST a `https://api.mercadopago.com/checkout/preferences` con `Authorization: Bearer {AccessToken}`
5. Devuelve `preferenceId`, `initPoint`, `sandboxInitPoint`

### Controller

```csharp
[HttpPost("create-preference")]
public async Task<ActionResult<PaymentPreferenceResponseDto>> CreatePreference(
    [FromBody] CreatePaymentPreferenceDto dto)
```

**URL:** `POST /api/payments/create-preference`

---

## 3. Frontend - ProductDetailComponent

**Archivo:** `frontend/src/app/components/product-detail/product-detail.component.ts`

```ts
payWithMercadoPago(): void {
    const body = { productId: this.product.id, quantity: 1, size: ... };

    this.http.post(`${environment.apiUrl}/payments/create-preference`, body)
      .subscribe({
        next: (response) => {
          const isTest = true;
          const checkoutUrl = isTest
            ? response.sandboxInitPoint   // Sandbox
            : response.initPoint;          // Producción
          window.location.href = checkoutUrl;
        }
      });
}
```

---

## 4. Páginas de retorno

Mercado Pago redirige a:

| Ruta | Origen |
|------|--------|
| `/pago/exito` | `back_urls.success` |
| `/pago/fallo` | `back_urls.failure` |
| `/pago/pendiente` | `back_urls.pending` |

Estas rutas se configuran en Angular en `app.routes.ts`.

---

## 5. Testing con Sandbox

### Configuración

```ts
const isTest = true; // → usa sandboxInitPoint
const isTest = false; // → usa initPoint (producción)
```

### Requisitos

1. **Access Token**: El mismo de producción (MP usa el mismo, cambia la URL)
2. **Usuario de prueba**: Crear en [developers.mercadopago.com] → Test accounts
3. **Tarjetas de prueba**:

| Resultado | Número | Vencimiento | CVV |
|-----------|--------|-------------|-----|
| Aprobado | `5031 7557 3453 0604` | 11/25 | 123 |
| Rechazado | `4013 5406 8232 7638` | 11/25 | 123 |

- DNI: `12345678`

### Pasos

1. Iniciar sesión en el checkout con el **usuario de prueba** (no cuenta real)
2. Usar tarjetas de prueba
3. Verificar redirección a `/pago/exito`, `/pago/fallo` o `/pago/pendiente`

---

## 6. ngrok (para pruebas con redirección)

Cuando MP redirige al frontend, necesita una URL pública. Si estás en localhost:

```bash
ngrok http 4200
```

Luego actualizar `BaseUrl` en `appsettings.json`:

```json
"MercadoPago": {
    "BaseUrl": "https://xxx-xxx.ngrok-free.app"
}
```

Y agregar la URL de ngrok en `allowedHosts` de `angular.json`:

```json
"allowedHosts": ["all", "xxx-xxx.ngrok-free.app"]
```

---

## 7. Producción

1. Cambiar a `initPoint`:
   ```ts
   const isTest = false;
   ```
2. Usar Access Token de producción (mismo que usás ahora)
3. Tener un dominio real (no ngrok)
4. Configurar `BaseUrl` con el dominio real

---

## Archivos involucrados

| Archivo | Rol |
|---------|-----|
| `src/SevenOutfit.API/appsettings.json` | Access Token, Public Key, BaseUrl |
| `src/SevenOutfit.API/Controllers/PaymentsController.cs` | Endpoint create-preference |
| `src/SevenOutfit.Core/DTOs/PaymentDto.cs` | DTOs de entrada/salida |
| `src/SevenOutfit.Core/Interfaces/IMercadoPagoService.cs` | Interfaz del servicio |
| `src/SevenOutfit.Infrastructure/Services/MercadoPagoService.cs` | Lógica de creación de preferencia |
| `frontend/src/environments/environment.ts` | Public Key, API URL |
| `frontend/src/app/components/product-detail/product-detail.component.ts` | Botón de pago |
| `frontend/angular.json` | allowedHosts para ngrok |
