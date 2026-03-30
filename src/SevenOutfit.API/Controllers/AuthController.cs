using Microsoft.AspNetCore.Mvc;
using SevenOutfit.Core.DTOs;
using SevenOutfit.Core.Interfaces;

namespace SevenOutfit.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        if (result == null) return Unauthorized(new { message = "Credenciales inválidas" });
        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] LoginDto dto)
    {
        var result = await _authService.RegisterAsync(dto.Email, dto.Password);
        if (!result) return BadRequest(new { message = "El email ya está registrado" });
        return Ok(new { message = "Usuario registrado exitosamente" });
    }
}
