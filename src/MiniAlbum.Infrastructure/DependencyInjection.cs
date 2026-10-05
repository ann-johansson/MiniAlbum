using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using MiniAlbum.Application.Abstractions.Persistence;
using MiniAlbum.Infrastructure.Persistence.Repositories;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Dialect;
using NHibernate.Driver;
using System;

namespace MiniAlbum.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            var connectionString =
                configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException(
                    "Connection string 'DefaultConnection' was not found.");

            var nhConfiguration = new Configuration();

            nhConfiguration.DataBaseIntegration(db =>
            {
                db.ConnectionString = connectionString;
                db.Dialect<PostgreSQLDialect>();
                db.Driver<NpgsqlDriver>();

                db.LogFormattedSql = true;
                db.LogSqlInConsole = true;

            });

            nhConfiguration.SetProperty(
                NHibernate.Cfg.Environment.Hbm2ddlAuto,
                "update");

            nhConfiguration.AddAssembly(typeof(DependencyInjection).Assembly);

            var sessionFactory =
                nhConfiguration.BuildSessionFactory();

            services.AddSingleton<ISessionFactory>(sessionFactory);

            services.AddScoped<ISession>(
                _ => sessionFactory.OpenSession());

            services.AddScoped<IAlbumRepository, AlbumRepository>();

            return services;
        }
    }
}
