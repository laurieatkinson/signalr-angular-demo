using Microsoft.AspNetCore.SignalR;
using MonitorActivity.Server.DataStorage;
using MonitorActivity.Server.Models;

namespace MonitorActivity.Server.HubConfig
{
    public class AccountHub : Hub
    {
        public async Task BroadcastActiveAccountData(AccountModel account) {
            var accounts = DataManager.GetActiveAccounts();
            accounts.Add(account);
            await Clients.All.SendAsync("BroadcastActiveAccountData", accounts);
        }
    }
}
