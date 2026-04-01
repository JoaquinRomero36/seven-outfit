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

<div align="center">

**Hecho con** ❤️ **por la comunidad juvenil adventista**

</div>
