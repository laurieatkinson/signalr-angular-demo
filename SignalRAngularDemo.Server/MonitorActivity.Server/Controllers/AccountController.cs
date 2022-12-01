using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MonitorActivity.Server.DataStorage;
using MonitorActivity.Server.HubConfig;
using MonitorActivity.Server.TimerFeatures;

namespace MonitorActivity.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IHubContext<AccountHub> _hub;
        private readonly TimerManager _timer;
        
        public AccountController(IHubContext<AccountHub> hub, TimerManager timer)
        {
            _hub = hub;
            _timer = timer;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (!_timer.IsTimerStarted)
            {
                _timer.PrepareTimer(() => _hub.Clients.All.SendAsync("TransferActiveAccountsData", DataManager.GetActiveAccounts()));
            }
            return Ok(new { Message = "Request Completed" });
        }
    }
}
