using System;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.StaticFiles;
using Microsoft.AspNet.SignalR;

public class Startup
{
    public void Configure(IBuilder app)
    {
        app.UseServices(services =>
        {
            services.AddMvc();

            services.AddSignalR();
            });

        app.Use(async (context, next) => 
        {
            Console.WriteLine(context.Request.Path);

            try
            {
                await next();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
            });

        app.UseMvc();

        app.UseSignalR();

        app.UseStaticFiles();
    }
}

public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }
}

public class Chat : Hub
{
    public void Send(string name, string message)
    {
        Clients.All.send(new Message { Sent = DateTime.Now, Sender = name, Content = message });
    }
}

public class Message
{
    public string Sender { get; set; }
    public DateTime Sent { get; set; }
    public string Content { get; set; }
}
