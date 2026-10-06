using MiniAlbum.Application.Abstractions.Messaging;
using MiniAlbum.Application.Abstractions.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Application.Photos.Queries.GetPhotosByAlbum
{
    public class GetPhotosByAlbumQueryHandler
        : IQueryHandler<
            GetPhotosByAlbumQuery,
            IReadOnlyList<PhotoResult>>
    {
        private readonly IPhotoRepository _photoRepository;

        public GetPhotosByAlbumQueryHandler(
            IPhotoRepository photoRepository)
        {
            _photoRepository = photoRepository;
        }

        public async Task<IReadOnlyList<PhotoResult>> HandleAsync(
            GetPhotosByAlbumQuery query,
            CancellationToken cancellationToken = default)
        {
            var photos = await _photoRepository.GetByAlbumIdAsync(
                query.AlbumId,
                cancellationToken);

            return photos
                .Select(photo => new PhotoResult
                {
                    Id = photo.Id,
                    Title = photo.Title,
                    Description = photo.Description,
                    FileName = photo.FileName
                })
                .ToList();
        }
    }
}
