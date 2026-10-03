using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Application.Albums.Queries.GetAlbums
{
    public class AlbumResult
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }    
    }
}
