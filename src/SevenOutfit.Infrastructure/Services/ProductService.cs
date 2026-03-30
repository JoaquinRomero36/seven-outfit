using AutoMapper;
using SevenOutfit.Core.DTOs;
using SevenOutfit.Core.Entities;
using SevenOutfit.Core.Interfaces;

namespace SevenOutfit.Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        var products = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }

    public async Task<IEnumerable<ProductDto>> GetActiveProductsAsync()
    {
        var products = await _repository.GetActiveAsync();
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }

    public async Task<ProductDto?> GetProductByIdAsync(int id)
    {
        var product = await _repository.GetByIdAsync(id);
        return product == null ? null : _mapper.Map<ProductDto>(product);
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        var product = _mapper.Map<Product>(dto);
        product.CreatedAt = DateTime.UtcNow;
        var created = await _repository.CreateAsync(product);
        return _mapper.Map<ProductDto>(created);
    }

    public async Task<ProductDto?> UpdateProductAsync(int id, UpdateProductDto dto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) return null;

        _mapper.Map(dto, existing);
        await _repository.UpdateAsync(existing);
        return _mapper.Map<ProductDto>(existing);
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null) return false;

        await _repository.DeleteAsync(id);
        return true;
    }

    public async Task<IEnumerable<ProductDto>> FilterProductsAsync(int? category, int? size, string? color)
    {
        var products = await _repository.FilterAsync(category, size, color);
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }
}
