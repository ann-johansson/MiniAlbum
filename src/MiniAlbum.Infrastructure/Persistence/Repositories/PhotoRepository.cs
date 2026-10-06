using MiniAlbum.Application.Abstractions.Persistence;
using MiniAlbum.Domain.Entities;
using NHibernate;
using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Infrastructure.Persistence.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly ISession _session;

        public PhotoRepository(ISession session)
        {
            _session = session;
        }

        public async Task<int> AddAsync(
            Photo photo,
            CancellationToken cancellationToken = default)
        {
            ArgumentNullException.ThrowIfNull(photo);

            using var transaction = _session.BeginTransaction();

            await _session.SaveAsync(photo, cancellationToken);

            await transaction.CommitAsync(cancellationToken);

            return photo.Id;
        }
    }
}
