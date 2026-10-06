using System;
using System.Collections.Generic;
using System.Text;
using MiniAlbum.Application.Abstractions.Messaging;
using MiniAlbum.Application.Abstractions.Persistence;
using MiniAlbum.Domain.Entities;

namespace MiniAlbum.Application.Photos.Commands.CreatePhoto
{
    public class CreatePhotoCommandHandler
        : ICommandHandler<CreatePhotoCommand, int?>
    {
        private readonly IAlbumRepository _albumRepository;
        private readonly IPhotoRepository _photoRepository;

        public CreatePhotoCommandHandler(
            IAlbumRepository albumRepository,
            IPhotoRepository photoRepository)
        {
            _albumRepository = albumRepository;
            _photoRepository = photoRepository;
        }

        public async Task<int?> HandleAsync(
            CreatePhotoCommand command,
            CancellationToken cancellationToken = default)
        {
            var album = await _albumRepository.GetByIdAsync(
                command.AlbumId,
                cancellationToken);

            if (album is  null)
            {
                return null;
            }

            var photo = new Photo
            {
                Title = command.Title,
                Description = command.Description,
                FileName = command.FileName
            };

            album.AddPhoto(photo);

            var photoId = await _photoRepository.AddAsync(
                photo,
                cancellationToken);

            return photoId;
        }
    }
}
