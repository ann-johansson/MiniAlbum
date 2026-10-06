using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using MiniAlbum.Application.Abstractions.Messaging;
using MiniAlbum.Application.Albums.Commands.CreateAlbum;
using MiniAlbum.Application.Albums.Queries.GetAlbumById;
using MiniAlbum.Application.Albums.Queries.GetAlbums;
using MiniAlbum.Application.Photos.Commands.CreatePhoto;

namespace MiniAlbum.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(
            this IServiceCollection services)
        {
            services.AddScoped<IDispatcher, Dispatcher>();

            services.AddScoped<
                ICommandHandler<CreateAlbumCommand, int>,
                CreateAlbumCommandHandler>();

            services.AddScoped<
                IQueryHandler<GetAlbumsQuery, IReadOnlyList<AlbumResult>>,
                GetAlbumsQueryHandler>();

            services.AddScoped<
                IQueryHandler<GetAlbumByIdQuery, AlbumResult?>,
                GetAlbumByIdQueryHandler>();

            services.AddScoped<
                ICommandHandler<CreatePhotoCommand, int?>,
                CreatePhotoCommandHandler>();

            return services;
        }
    }
}
