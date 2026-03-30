using SevenOutfit.Core.DTOs;

namespace SevenOutfit.Core.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginDto dto);
    Task<bool> RegisterAsync(string email, string password);
}
