using Microsoft.AspNetCore.SignalR;

using SignalRApp;   // ������������ ���� ������ ChatHub

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();      // ���������� ������� SignalR

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapHub<ChatHub>("/chat");   // ChatHub ����� ������������ ������� �� ���� /chat

app.Run();

namespace SignalRApp
{
    public class ChatHub : Hub
    {
        public async Task Send(string message, string userName)
        {
            await Clients.All.SendAsync("Receive", message, userName);
        }
    }
}