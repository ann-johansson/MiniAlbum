using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Domain.Entities
{
    public class Comment
    {
        public virtual int Id { get; protected set; }

        public virtual string Text { get; set; } = string.Empty;

        public virtual DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public virtual Photo Photo { get; set; } = null!;
    }
}
