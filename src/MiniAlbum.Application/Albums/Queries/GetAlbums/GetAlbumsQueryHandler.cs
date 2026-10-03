using MiniAlbum.Application.Abstractions.Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using MiniAlbum.Application.Abstractions.Messaging;

namespace MiniAlbum.Application.Albums.Queries.GetAlbums
{
    public class GetAlbumsQueryHandler
        : IQueryHandler<GetAlbumsQuery, IReadOnlyList<AlbumResult>>
    {
        private readonly IAlbumRepository _albumRepository;

        public GetAlbumsQueryHandler(IAlbumRepository albumRepository)
        {
            _albumRepository = albumRepository;
        }

        public async Task<IReadOnlyList<AlbumResult>> HandleAsync(
            GetAlbumsQuery query,
            CancellationToken cancellationToken = default)
        {
            var albums = await _albumRepository.GetAllAsync(cancellationToken);

            return albums
                .Select(album => new AlbumResult
                {
                Id = album.Id,
                Title = album.Title,
                Description = album.Description
                })
                .ToList();
        }
    }
}
