using MiniAlbum.Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;
using MiniAlbum.Domain.Entities;
using MiniAlbum.Application.Abstractions.Persistence;

namespace MiniAlbum.Application.Albums.Commands.CreateAlbum
{
    public class CreateAlbumCommandHandler : ICommandHandler<CreateAlbumCommand, int>
    {
        private readonly IAlbumRepository _albumRepository;

        public CreateAlbumCommandHandler(IAlbumRepository albumRepository)
        {
            _albumRepository = albumRepository;
        }

        public async Task<int> HandleAsync(
            CreateAlbumCommand command,
            CancellationToken cancellationToken = default)
        {
            var album = new Album
            {
                Title = command.Title,
                Description = command.Description
            };

            var albumId = await _albumRepository.AddAsync(
                album,
                cancellationToken);

            return albumId;
        }
    }
}
