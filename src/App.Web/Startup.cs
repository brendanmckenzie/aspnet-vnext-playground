using System;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Routing;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.StaticFiles;
using Microsoft.AspNet.SignalR;

using App.Web.Controllers;
using App.Web.Hubs;

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
            Console.WriteLine(string.Format("{0:HH:mm:ss} {1}", DateTime.Now, context.Request.Path));

            try
            {
                await next();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
            }
            });

        app.UseMvc(routes =>
        {
            routes.MapRoute("Home", string.Empty, new { controller = "Static", action = "Index" });
            routes.MapRoute("Chat", "chat", new { controller = "Static", action = "Chat" });
        });

        app.UseSignalR();

        app.UseStaticFiles();
    }
}