using SevenOutfit.Core.DTOs;

namespace SevenOutfit.Core.Interfaces;

public interface IMercadoPagoService
{
    Task<PaymentPreferenceResponseDto> CreatePreferenceAsync(CreatePaymentPreferenceDto dto);
}
