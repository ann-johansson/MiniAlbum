using System;
using System.Collections.Generic;
using System.Text;
using MiniAlbum.Application.Abstractions.Messaging;

namespace MiniAlbum.Application.Photos.Commands.CreatePhoto
{
    public class CreatePhotoCommand : ICommand<int?>
    {
        public int AlbumId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description {  get; set; }
        public string FileName { get; set; } = string.Empty;
    }
}
