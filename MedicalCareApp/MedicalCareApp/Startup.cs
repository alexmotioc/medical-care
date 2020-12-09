using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalCareApp.Bus;
using MedicalCareApp.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

namespace MedicalCareApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TheCodeBuzz-Service", Version = "v1" });


            });
            //services.AddCors(option => option.AddPolicy("MedAPIPolicy", builder => {
            //    builder.WithOrigins("https://localhost:3001").AllowAnyHeader().AllowAnyMethod();

            //}));
            services.AddCors();
            services.AddControllers();

            services.AddSingleton<MedicalCareDBContext>();
            services.AddSingleton<RabbitMQService>();
            services.AddSingleton<GetNotificationConsumer>();
            
            //services.AddSingleton<RabbitMQService>();
            //services.Configure<IISServerOptions>(options =>
            //{
            //    options.AllowSynchronousIO = true;
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseRabbitMQMiddleware();
            app.UseSwagger();
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(
                options => options.SetIsOriginAllowed(x => _ = true).AllowAnyMethod().AllowAnyHeader().AllowCredentials()
            );
            //app.UseCors(op => op.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V2");
            });
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
            

        }
    }
}
