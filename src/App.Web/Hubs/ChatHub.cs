using System;
using Microsoft.AspNet.SignalR;

namespace App.Web.Hubs
{
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
}