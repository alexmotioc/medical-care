using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace MedicalCareApp.Bus
{
    public class GetNotificationConsumer
    {
        
        //private readonly IWebSocketHandler _webSocketHandler;

        public GetNotificationConsumer()
        {
            //_webSocketHandler = webSocketHandler;
        }

        public void SetUp(IModel channel)
        {
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += OnNotificationReceived;

            channel.BasicConsume(queue: "activity-queue", autoAck: true, consumer: consumer);//, noLocal : false, consumerTag: "", exclusive : false,  arguments : null);
        }

        private async void OnNotificationReceived(object sender, BasicDeliverEventArgs deliveryEvent)
        {
            var body = deliveryEvent.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            var dataObj = JsonSerializer.Deserialize<SenzorData>(message);
            //System.Diagnostics.Debug.WriteLine(message);
            TimeSpan timeSequence = dataObj.start - dataObj.end;

            Console.WriteLine(message);
            if (dataObj.activity.Equals("Sleeping") && timeSequence.TotalHours < 7)
                Console.WriteLine("~~~R1 ERROR: Pacient slept for lesser than 7 hours~~~");
            if (dataObj.activity.Equals("Leaving") && timeSequence.TotalHours < 5)
                Console.WriteLine("~~~R2 ERROR: Pacient spent time outdoors for lesser than 5 hours~~~");
            if (dataObj.activity.Equals("Toileting") && timeSequence.TotalMinutes < 5)
                Console.WriteLine("~~~R3 ERROR: Pacient spent time outdoors for lesser than 30 minutes~~~");
            Console.WriteLine("*********************************************************************************");

        }
    }

    public class SenzorData
    {
        public int patient_id { get; set; }
        public string activity { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
    }
    //{\"patient_id\":0,\"activity\":\"Sleeping\",\"start\":634580440790000000,\"end\":634580722910000000}"
    //var patient = new
    //{
    //    patient_id = patientId,
    //    activity = myActivity,
    //    start = date1.Ticks,
    //    end = date2.Ticks

    //};
}