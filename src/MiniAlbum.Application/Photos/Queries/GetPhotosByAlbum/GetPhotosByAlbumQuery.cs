using MiniAlbum.Application.Abstractions.Messaging;
using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Application.Photos.Queries.GetPhotosByAlbum
{
    public class GetPhotosByAlbumQuery
        : IQuery<IReadOnlyList<PhotoResult>>
    {
        public int AlbumId { get; set; }
    }
}
