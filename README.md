# Seven Outfit

<div align="center">

![Seven Outfit](https://placehold.co/800x400/3c435d/white?text=Seven+Outfit)

**Moda con propósito. Viste tu fe, expresa tu estilo.**

[![.NET](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## Sobre el Proyecto

**Seven Outfit** es una aplicación web de comercio electrónico diseñada para una comunidad juvenil cristiana adventista. Permite visualizar un catálogo de ropa y facilitar compras a través de WhatsApp, con un panel de administración completo para gestionar productos.

### Características Principales

- **Catálogo de Productos** - Visualización de ropa con filtros por categoría y talle
- **Compra por WhatsApp** - Mensaje prearmado con producto, talle y precio
- **Panel Admin** - CRUD completo de productos con autenticación JWT
- **Diseño Moderno** - Interfaz profesional con animaciones suaves
- **Responsive** - Optimizado para móvil y escritorio

---

## Capturas de Pantalla

<div align="center">

| Home | Catálogo | Producto |
|:----:|:--------:|:--------:|
| ![Home](https://placehold.co/400x250/eaeaec/3c435d?text=Home) | ![Catalogo](https://placehold.co/400x250/eaeaec/3c435d?text=Catalogo) | ![Producto](https://placehold.co/400x250/eaeaec/3c435d?text=Detalle) |

| Login Admin | Admin Panel | WhatsApp |
|:-----------:|:-----------:|:--------:|
| ![Login](https://placehold.co/400x250/eaeaec/3c435d?text=Login) | ![Admin](https://placehold.co/400x250/eaeaec/3c435d?text=Admin) | ![WhatsApp](https://placehold.co/400x250/eaeaec/3c435d?text=WhatsApp) |

</div>

---

## Tech Stack

### Backend

| Tecnología | Descripción |
|------------|-------------|
| [.NET 10](https://dotnet.microsoft.com/) | Runtime y framework |
| [ASP.NET Core](https://docs.microsoft.com/aspnet/core) | Web API |
| [Entity Framework Core](https://docs.microsoft.com/ef/) | ORM |
| [PostgreSQL](https://www.postgresql.org/) | Base de datos |
| [NSwag](https://github.com/RicoSuter/NSwag) | Documentación API |
| [AutoMapper](https://automapper.org/) | Mapeo de objetos |
| [JWT Bearer](https://jwt.io/) | Autenticación |

### Frontend

| Tecnología | Descripción |
|------------|-------------|
| [Angular 19](https://angular.dev/) | Framework SPA |
| [Standalone Components](https://angular.dev/guide/components) | Arquitectura de componentes |
| [RxJS](https://rxjs.dev/) | Programación reactiva |
| [Angular Router](https://angular.dev/guide/routing) | Navegación |
| [SCSS](https://sass-lang.com/) | Estilos |

---

## Arquitectura

```
seven-oufit/
├── src/
│   ├── SevenOutfit.API/              # Capa de presentación
│   │   ├── Controllers/              # API Controllers
│   │   ├── Mappings/                 # AutoMapper profiles
│   │   └── Program.cs                # Configuración principal
│   │
│   ├── SevenOutfit.Core/             # Capa de dominio
│   │   ├── Entities/                 # Modelos de negocio
│   │   ├── Enums/                    # Categorías y talles
│   │   ├── DTOs/                     # Data Transfer Objects
│   │   └── Interfaces/               # Contratos de repositorios/servicios
│   │
│   └── SevenOutfit.Infrastructure/   # Capa de infraestructura
│       ├── Data/                     # DbContext y configuración
│       ├── Repositories/             # Implementación repositorios
│       ├── Services/                 # Lógica de negocio
│       └── Migrations/               # Migraciones EF Core
│
└── frontend/
    └── src/app/
        ├── components/               # Componentes UI
        │   ├── header/
        │   ├── home/
        │   ├── product-list/
        │   ├── product-card/
        │   ├── product-detail/
        │   ├── login/
        │   └── admin/
        ├── services/                 # Servicios HTTP
        ├── guards/                   # Protectores de rutas
        └── models/                   # Interfaces TypeScript
```

---

## Prerrequisitos

- [.NET SDK 10+](https://dotnet.microsoft.com/download/dotnet)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL 14+](https://www.postgresql.org/download/)
- [Angular CLI](https://angular.dev/cli)

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/seven-oufit.git
cd seven-oufit
```

### 2. Configurar Base de Datos

Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE sevenoutfit;
```

Actualizar la connection string en `src/SevenOutfit.API/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=sevenoutfit;Username=postgres;Password=TU_PASSWORD"
  }
}
```

### 3. Aplicar Migraciones

```bash
dotnet ef database update --project src/SevenOutfit.Infrastructure --startup-project src/SevenOutfit.API
```

### 4. Ejecutar Backend

```bash
cd src/SevenOutfit.API
dotnet run
```

La API estará disponible en: **http://localhost:5000**

### 5. Ejecutar Frontend

```bash
cd frontend
npm install
ng serve
```

El frontend estará disponible en: **http://localhost:4200**

---

## Credenciales de Administrador

| Campo | Valor |
|-------|-------|
| Email | `admin@sevenoutfit.com` |
| Contraseña | `admin123` |

---

## API Endpoints

### Productos

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|:----:|
| GET | `/api/products` | Listar todos | ❌ |
| GET | `/api/products/active` | Listar activos | ❌ |
| GET | `/api/products/{id}` | Obtener por ID | ❌ |
| GET | `/api/products/filter?category=&size=&color=` | Filtrar productos | ❌ |
| POST | `/api/products` | Crear producto | ✅ |
| PUT | `/api/products/{id}` | Actualizar producto | ✅ |
| DELETE | `/api/products/{id}` | Eliminar producto | ✅ |

### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/register` | Registrar admin |

### Enums

**Categorías:**
| ID | Nombre |
|----|--------|
| 1 | Pantalones |
| 2 | Remeras |
| 3 | Buzos |
| 4 | Suéteres |
| 5 | Gorras |
| 6 | Camperas |

**Talles:**
| ID | Nombre |
|----|--------|
| 1 | S |
| 2 | M |
| 3 | L |
| 4 | XL |

---

## Configuración

### WhatsApp

Para configurar el número de WhatsApp, modificar en `frontend/src/app/services/product.service.ts`:

```typescript
const phone = '5491112345678'; // Tu número con código de país
```

### JWT

La configuración JWT está en `src/SevenOutfit.API/appsettings.json`:

```json
{
  "Jwt": {
    "Key": "SevenOutfitSuperSecretKey2024AdventistYouthCommunity",
    "Issuer": "SevenOutfitAPI",
    "Audience": "SevenOutfitClients"
  }
}
```

> ⚠️ En producción, cambiar la clave por una segura y usar variables de entorno.

---

## Despliegue

### Docker (Próximamente)

```bash
docker-compose up -d
```

### Opciones de Hosting

| Servicio | Backend | Frontend |
|----------|---------|----------|
| [Railway](https://railway.app/) | ✅ | ✅ |
| [Render](https://render.com/) | ✅ | ✅ |
| [Vercel](https://vercel.com/) | ❌ | ✅ |
| [Azure](https://azure.microsoft.com/) | ✅ | ✅ |

---

## Roadmap

- [x] Catálogo de productos
- [x] Filtrado por categoría y talle
- [x] Compra vía WhatsApp
- [x] Panel de administración
- [x] Autenticación JWT
- [ ] Integración Mercado Pago
- [ ] Carrito de compras
- [ ] Sistema de pedidos
- [ ] Múltiples imágenes por producto
- [ ] Sistema de usuarios registrado
- [ ] Notificaciones por email

---

## Contribuir

1. Fork el proyecto
2. Crear una branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -m 'Add nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

---

## Licencia

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contacto

**Seven Outfit** - Comunidad Juvenil Adventista

- WhatsApp: [.link](https://wa.me/5491112345678)
- Email: info@sevenoutfit.com

---

<div align="center">

**Hecho con** ❤️ **por la comunidad juvenil adventista**

</div>
