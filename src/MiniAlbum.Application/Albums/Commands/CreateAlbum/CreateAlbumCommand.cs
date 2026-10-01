using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using MiniAlbum.Application.Abstractions.Messaging;

namespace MiniAlbum.Application.Albums.Commands.CreateAlbum
{
    public class CreateAlbumCommand : ICommand<int>
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
