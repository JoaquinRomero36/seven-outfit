namespace SevenOutfit.Core.DTOs;

public class CreatePaymentPreferenceDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; } = 1;
    public string? Size { get; set; }
}

public class PaymentPreferenceResponseDto
{
    public string PreferenceId { get; set; } = string.Empty;
    public string InitPoint { get; set; } = string.Empty; // URL para checkout
    public string SandboxInitPoint { get; set; } = string.Empty; // URL para testing
}
