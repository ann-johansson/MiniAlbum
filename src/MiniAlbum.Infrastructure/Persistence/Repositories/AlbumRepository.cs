using MiniAlbum.Application.Abstractions.Persistence;
using MiniAlbum.Domain.Entities;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Infrastructure.Persistence.Repositories
{
    public class AlbumRepository : IAlbumRepository
    {
        private readonly ISession _session;

        public AlbumRepository(ISession session)
        {
            _session = session;
        }

        public async Task<int> AddAsync(
            Album album,
            CancellationToken cancellationToken = default)
        {
            ArgumentNullException.ThrowIfNull(album);
            await _session.SaveAsync(album, cancellationToken);

            return album.Id;
        }
    }
}
