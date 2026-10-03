using System;
using System.Collections.Generic;
using System.Text;
using MiniAlbum.Domain.Entities;

namespace MiniAlbum.Application.Abstractions.Persistence
{
    public interface IAlbumRepository
    {
        Task<int> AddAsync(
            Album album,
            CancellationToken cancellationToken = default);

        Task<IReadOnlyList<Album>> GetAllAsync(
            CancellationToken cancellationToken = default);
    }
}
