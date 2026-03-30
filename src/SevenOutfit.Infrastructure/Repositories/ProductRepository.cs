using Microsoft.EntityFrameworkCore;
using SevenOutfit.Core.Entities;
using SevenOutfit.Core.Interfaces;
using SevenOutfit.Infrastructure.Data;

namespace SevenOutfit.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await _context.Products.ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetActiveAsync()
    {
        return await _context.Products.Where(p => p.IsActive).ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task<Product> CreateAsync(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task UpdateAsync(Product product)
    {
        product.UpdatedAt = DateTime.UtcNow;
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product != null)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Product>> FilterAsync(int? category, int? size, string? color)
    {
        var query = _context.Products.Where(p => p.IsActive);

        if (category.HasValue)
            query = query.Where(p => (int)p.Category == category.Value);

        if (size.HasValue)
            query = query.Where(p => (int)p.Size == size.Value);

        if (!string.IsNullOrEmpty(color))
            query = query.Where(p => p.Color != null && p.Color.ToLower() == color.ToLower());

        return await query.ToListAsync();
    }
}
