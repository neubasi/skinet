using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentitydbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Adress = new Adress
                    {
                        FirstName = "Bob",
                        LastName = "Bobiity",
                        City = "New York",
                        State = "NY",
                        Zipcode = "90212"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

        }

    }
}