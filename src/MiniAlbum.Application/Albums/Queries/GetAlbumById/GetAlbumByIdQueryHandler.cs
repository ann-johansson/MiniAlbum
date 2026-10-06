using MiniAlbum.Application.Abstractions.Messaging;
using MiniAlbum.Application.Abstractions.Persistence;
using MiniAlbum.Application.Albums.Queries.GetAlbums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Application.Albums.Queries.GetAlbumById
{
    public class GetAlbumByIdQueryHandler
        : IQueryHandler<GetAlbumByIdQuery, AlbumResult?>
    {
        private readonly IAlbumRepository _albumRepository;

        public GetAlbumByIdQueryHandler(IAlbumRepository albumRepository)
        {
            _albumRepository = albumRepository;
        }

        public async Task<AlbumResult?> HandleAsync(
            GetAlbumByIdQuery query,
            CancellationToken cancellationToken = default)
        {
            var album = await _albumRepository.GetByIdAsync(
                query.Id,
                cancellationToken);

            if (album == null)
            {
                return null;
            }

            return new AlbumResult
            {
                Id = album.Id,
                Title = album.Title,
                Description = album.Description
            };
        }
    }
}
