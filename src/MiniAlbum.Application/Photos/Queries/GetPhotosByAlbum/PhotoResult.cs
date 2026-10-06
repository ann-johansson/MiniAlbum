using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Application.Photos.Queries.GetPhotosByAlbum
{
    public class PhotoResult
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string FileName { get; set; } = string.Empty;
    }
}
