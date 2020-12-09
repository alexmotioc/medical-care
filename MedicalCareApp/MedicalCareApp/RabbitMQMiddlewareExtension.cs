using MedicalCareApp.Bus;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicalCareApp
{
    public static class RabbitMQMiddlewareExtension
    {
        public static IApplicationBuilder UseRabbitMQMiddleware(this IApplicationBuilder app)
        {
            var listener = app.ApplicationServices.GetService<RabbitMQService>();
            var life = app.ApplicationServices.GetService<IHostApplicationLifetime>();

            life.ApplicationStarted.Register(() =>
            {
                listener.Start();
                app.ApplicationServices.GetService<GetNotificationConsumer>().SetUp(listener.Channel);
            });
            life.ApplicationStopping.Register(listener.Stop);
            return app;
        }
    }
}
