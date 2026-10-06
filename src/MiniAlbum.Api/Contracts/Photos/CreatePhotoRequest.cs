namespace MiniAlbum.Api.Contracts.Photos
{
    public class CreatePhotoRequest
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string FileName { get; set; } = string.Empty;
    }
}
