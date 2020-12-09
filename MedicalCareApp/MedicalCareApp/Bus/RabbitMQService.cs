using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedicalCareApp.Bus
{
    public interface IRabbitMQService
    {
        IModel Start();
        void Stop();
    }
    public class RabbitMQService : IRabbitMQService
    {
        public IModel Channel { get; set; }
        private IConnection _connection;


        public IModel Start()
        {
             var factory = new ConnectionFactory
            {
                Uri = new Uri("amqp://guest:guest@localhost:5672")
            };

            _connection = factory.CreateConnection();
            Channel = _connection.CreateModel();
            return Channel;
        }

        public void Stop()
        {
            Channel.Close(200, "RabbitMQ connection closed on backend");
            _connection.Close();
        }
    }
}
