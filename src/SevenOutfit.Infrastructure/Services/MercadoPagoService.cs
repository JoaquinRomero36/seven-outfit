using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SevenOutfit.Core.DTOs;
using SevenOutfit.Core.Interfaces;

namespace SevenOutfit.Infrastructure.Services;

public class MercadoPagoService : IMercadoPagoService
{
    private readonly IConfiguration _configuration;
    private readonly IProductService _productService;
    private readonly HttpClient _httpClient;
    private readonly ILogger<MercadoPagoService> _logger;

    public MercadoPagoService(
        IConfiguration configuration, 
        IProductService productService,
        HttpClient httpClient,
        ILogger<MercadoPagoService> logger)
    {
        _configuration = configuration;
        _productService = productService;
        _httpClient = httpClient;
        _logger = logger;
        _httpClient.BaseAddress = new Uri("https://api.mercadopago.com");
    }

    public async Task<PaymentPreferenceResponseDto> CreatePreferenceAsync(CreatePaymentPreferenceDto dto)
    {
        // Obtener producto de la base de datos
        var product = await _productService.GetProductByIdAsync(dto.ProductId);
        if (product == null)
            throw new Exception("Producto no encontrado");

        if (product.Stock <= 0)
            throw new Exception("Producto sin stock");

        var accessToken = _configuration["MercadoPago:AccessToken"];
        _logger.LogInformation("Creando preferencia MP para producto: {ProductName}, Precio: {Price}", product.Name, product.Price);
        
        // Crear el body de la preferencia
        var preference = new
        {
            items = new[]
            {
                new
                {
                    title = product.Name,
                    description = $"Talle: {dto.Size ?? product.Size.ToString()} - Seven Outfit",
                    quantity = dto.Quantity,
                    unit_price = (double)product.Price,
                    currency_id = "ARS"
                }
            },
            back_urls = new
            {
                success = "http://localhost:4200/pago/exito",
                failure = "http://localhost:4200/pago/fallo",
                pending = "http://localhost:4200/pago/pendiente"
            },
            auto_return = "approved",
            external_reference = $"order_{product.Id}_{DateTime.UtcNow:yyyyMMddHHmmss}",
            statement_descriptor = "SEVEN OUTFIT"
        };

        var json = JsonSerializer.Serialize(preference);
        _logger.LogInformation("Request body: {Body}", json);
        
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, "/checkout/preferences");
        request.Headers.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
        request.Content = content;

        var response = await _httpClient.SendAsync(request);
        var responseJson = await response.Content.ReadAsStringAsync();
        
        _logger.LogInformation("MP Response Status: {Status}, Body: {Body}", response.StatusCode, responseJson);

        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("Error de MercadoPago: {StatusCode} - {Response}", response.StatusCode, responseJson);
            throw new Exception($"Error de MercadoPago: {responseJson}");
        }

        var result = JsonSerializer.Deserialize<MPPreferenceResponse>(responseJson);

        return new PaymentPreferenceResponseDto
        {
            PreferenceId = result!.Id,
            InitPoint = result.InitPoint,
            SandboxInitPoint = result.SandboxInitPoint
        };
    }
}

public class MPPreferenceResponse
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;
    
    [JsonPropertyName("init_point")]
    public string InitPoint { get; set; } = string.Empty;
    
    [JsonPropertyName("sandbox_init_point")]
    public string SandboxInitPoint { get; set; } = string.Empty;
}
