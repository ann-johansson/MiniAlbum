using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Domain.Entities
{
    public class Album
    {
        public virtual int Id { get; protected set; }

        public virtual string Title { get; set; } = string.Empty;

        public virtual string? Description { get; set; }

        public virtual ICollection<Photo> Photos { get; protected set; }
            = new List<Photo>();

        public virtual void AddPhoto(Photo photo)
        {
            if (photo == null)
            {
                throw new ArgumentNullException(nameof(photo));
            }
            Photos.Add(photo);
            photo.Album = this;
        }
    }
}
