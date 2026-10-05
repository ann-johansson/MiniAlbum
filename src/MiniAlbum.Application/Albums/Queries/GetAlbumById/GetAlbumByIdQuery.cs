using System;
using System.Collections.Generic;
using System.Text;
using MiniAlbum.Application.Abstractions.Messaging;
using MiniAlbum.Application.Albums.Queries.GetAlbums;

namespace MiniAlbum.Application.Albums.Queries.GetAlbumById
{
    public class GetAlbumByIdQuery : IQuery<AlbumResult?>
    {
        public int Id { get; set; }
    }
}
