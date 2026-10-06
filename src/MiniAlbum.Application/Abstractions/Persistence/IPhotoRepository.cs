using MiniAlbum.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Application.Abstractions.Persistence
{
    public interface IPhotoRepository
    {
        Task<int> AddAsync(
            Photo photo,
            CancellationToken cancellationToken = default);

        Task<IReadOnlyList<Photo>> GetByAlbumIdAsync(
            int albumId,
            CancellationToken cancellationToken = default);
    }
}
