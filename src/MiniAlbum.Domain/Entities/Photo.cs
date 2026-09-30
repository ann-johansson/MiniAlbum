using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Domain.Entities
{
    public class Photo
    {
        public virtual int Id { get; protected set; }

        public virtual string Title { get; set; } = string.Empty;

        public virtual string? Description { get; set; }

        public virtual string FileName { get; set; } = string.Empty;

        public virtual Album Album { get; set; } = null!;

        public virtual ICollection<Comment> Comments { get; protected set; }
            = new List<Comment>();
    }
}
