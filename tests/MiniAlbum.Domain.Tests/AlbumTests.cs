using MiniAlbum.Domain.Entities;

namespace MiniAlbum.Domain.Tests;

public class AlbumTests
{
    [Fact]
    public void AddPhoto_ShouldAddPhotoAndSetAlbum()
    {
        //Arrange
        var album = new Album
        {
            Title = "Sweden 2026"
        };

        var photo = new Photo
        {
            Title = "Autumn forest",
            FileName = "forest.jpg"
        };

        // Act
        album.AddPhoto(photo);

        // Assert
        Assert.Contains(photo, album.Photos);
        Assert.Same(album, photo.Album);
    }
}
