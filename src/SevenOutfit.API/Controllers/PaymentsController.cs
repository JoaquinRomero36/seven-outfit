using Microsoft.AspNetCore.Mvc;
using SevenOutfit.Core.DTOs;
using SevenOutfit.Core.Interfaces;

namespace SevenOutfit.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IMercadoPagoService _mpService;

    public PaymentsController(IMercadoPagoService mpService)
    {
        _mpService = mpService;
    }

    [HttpPost("create-preference")]
    public async Task<ActionResult<PaymentPreferenceResponseDto>> CreatePreference([FromBody] CreatePaymentPreferenceDto dto)
    {
        try
        {
            var preference = await _mpService.CreatePreferenceAsync(dto);
            return Ok(preference);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
