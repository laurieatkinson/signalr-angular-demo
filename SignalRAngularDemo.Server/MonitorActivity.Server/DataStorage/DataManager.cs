using MonitorActivity.Server.Models;

namespace MonitorActivity.Server.DataStorage
{
    public class DataManager
    {
        public static List<AccountModel> GetActiveAccounts()
        {
            var r = new Random();
            return new List<AccountModel>()
            {
                new AccountModel { Username = "User1", AccountNumber = r.Next(1, 100).ToString().PadLeft(4, '0') },
                new AccountModel { Username = "User2", AccountNumber = r.Next(1, 100).ToString().PadLeft(4, '0') },
                new AccountModel { Username = "User3", AccountNumber = r.Next(1, 100).ToString().PadLeft(4, '0') },
                new AccountModel { Username = "User4", AccountNumber = r.Next(1, 100).ToString().PadLeft(4, '0') },
            };
        }
    }
}
