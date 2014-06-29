using System;
using System.Collections.Generic;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;

namespace App.Web.Hubs
{
	public class Chat : Hub
	{
		static Dictionary<string, Client> _clients = new Dictionary<string, Client>();

		public override Task OnConnected()
		{
			var client = new Client { 
				ConnectionId = Context.ConnectionId, 
				Name = "Guest", 
				Connected = DateTime.Now };

			_clients.Add(Context.ConnectionId, client);

			Clients.All.client_connected(client);

			return base.OnConnected();
		}

		public override Task OnDisconnected()
		{
			Clients.All.client_disconnected(Context.ConnectionId);

			_clients.Remove(Context.ConnectionId);

			return base.OnDisconnected();
		}

		public void Send(string name, string message)
		{
			Clients.All.send(new Message { Sent = DateTime.Now, Sender = name, Content = message });
		}

		public void SetName(string name)
		{
			Clients.All.set_name(Context.ConnectionId, name);
			
			_clients[Context.ConnectionId].Name = name;
		}

		public IEnumerable<Client> List()
		{
			return _clients.Values;
		}
	}

	public class Message
	{
		public string Sender { get; set; }
		public DateTime Sent { get; set; }
		public string Content { get; set; }
	}

	public class Client
	{
		public string ConnectionId { get; set; }
		public string Name { get; set; }
		public DateTime Connected { get; set; }
	}
}