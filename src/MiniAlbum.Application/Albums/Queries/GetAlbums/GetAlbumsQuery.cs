using System;
using System.Collections.Generic;
using System.Text;
using MiniAlbum.Application.Abstractions.Messaging;

namespace MiniAlbum.Application.Albums.Queries.GetAlbums
{
    public class GetAlbumsQuery : IQuery<IReadOnlyList<AlbumResult>>
    {
    }
}
