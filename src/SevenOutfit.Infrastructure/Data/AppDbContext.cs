using Microsoft.EntityFrameworkCore;
using SevenOutfit.Core.Entities;

namespace SevenOutfit.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Name).HasMaxLength(200).IsRequired();
            entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
            entity.Property(p => p.ImageUrl).HasMaxLength(500);
            entity.Property(p => p.Color).HasMaxLength(50);
            entity.HasIndex(p => p.Category);
            entity.HasIndex(p => p.Size);
            entity.HasIndex(p => p.IsActive);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Email).HasMaxLength(200).IsRequired();
            entity.HasIndex(u => u.Email).IsUnique();
        });

        // Seed admin user (password: admin123)
        modelBuilder.Entity<User>().HasData(new User
        {
            Id = 1,
            Email = "admin@sevenoutfit.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
            Role = "Admin",
            CreatedAt = DateTime.UtcNow
        });

        // Seed sample products
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Name = "Remera Cristiana Bendecida", Price = 15000, Category = Core.Enums.ProductCategory.Remeras, Size = Core.Enums.ProductSize.M, Color = "Blanco", Stock = 20, ImageUrl = "https://placehold.co/400x400/white/black?text=Remera+Bendecida", IsActive = true },
            new Product { Id = 2, Name = "Buzo Seven Outfit", Price = 35000, Category = Core.Enums.ProductCategory.Buzos, Size = Core.Enums.ProductSize.L, Color = "Negro", Stock = 15, ImageUrl = "https://placehold.co/400x400/black/white?text=Buzo+Seven", IsActive = true },
            new Product { Id = 3, Name = "Gorra Adventista", Price = 8000, Category = Core.Enums.ProductCategory.Gorras, Size = Core.Enums.ProductSize.S, Color = "Azul", Stock = 30, ImageUrl = "https://placehold.co/400x400/blue/white?text=Gorra+Adventista", IsActive = true },
            new Product { Id = 4, Name = "Pantalón Jogger Faith", Price = 28000, Category = Core.Enums.ProductCategory.Pantalones, Size = Core.Enums.ProductSize.M, Color = "Gris", Stock = 12, ImageUrl = "https://placehold.co/400x400/gray/white?text=Jogger+Faith", IsActive = true },
            new Product { Id = 5, Name = "Suéter Gracias", Price = 42000, Category = Core.Enums.ProductCategory.Sueteres, Size = Core.Enums.ProductSize.XL, Color = "Beige", Stock = 8, ImageUrl = "https://placehold.co/400x400/beige/black?text=Sweater+Gracias", IsActive = true },
            new Product { Id = 6, Name = "Campera Urban Spirit", Price = 55000, Category = Core.Enums.ProductCategory.Camperas, Size = Core.Enums.ProductSize.L, Color = "Negro", Stock = 5, ImageUrl = "https://placehold.co/400x400/black/white?text=Campera+Urban", IsActive = true }
        );
    }
}
