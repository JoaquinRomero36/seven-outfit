using SevenOutfit.Core.Entities;

namespace SevenOutfit.Core.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User> CreateAsync(User user);
}
