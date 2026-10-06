using Microsoft.AspNetCore.Mvc;
using MiniAlbum.Application.Abstractions.Messaging;
using MiniAlbum.Application.Albums.Commands.CreateAlbum;
using MiniAlbum.Application.Albums.Queries.GetAlbums;
using MiniAlbum.Application.Albums.Queries.GetAlbumById;
using MiniAlbum.Application.Photos.Commands.CreatePhoto;
using MiniAlbum.Api.Contracts.Photos;
using MiniAlbum.Application.Photos.Queries.GetPhotosByAlbum;

namespace MiniAlbum.Api.Controllers
{

    [ApiController]
    [Route("api/albums")]
    public class AlbumsController : ControllerBase
    {
        private readonly IDispatcher _dispatcher;

        public AlbumsController(IDispatcher dispatcher)
        {
            _dispatcher = dispatcher;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAlbum(
            CreateAlbumCommand command,
            CancellationToken cancellationToken)
        {
            var albumId = await _dispatcher.SendAsync(
                command,
                cancellationToken);

            return Created(
                $"/api/albums/{albumId}",
                new { id = albumId });
        }

        [HttpPost("{albumId:int}/photos")]
        public async Task<IActionResult> CreatePhoto(
            int albumId,
            CreatePhotoRequest request,
            CancellationToken cancellationToken)
        {

            var command = new CreatePhotoCommand
            {
                AlbumId = albumId,
                Title = request.Title,
                Description = request.Description,
                FileName = request.FileName
            };

            var photoId = await _dispatcher.SendAsync(
                command,
                cancellationToken);

            if (photoId is null)
            {
                return NotFound();
            }

            return Created(
                $"/api/albums/{albumId}/photos/{photoId}",
                new { id = photoId });
        }

        [HttpGet]
        public async Task<IActionResult> GetAlbums(
            CancellationToken cancellationToken)
        {
            var albums = await _dispatcher.SendAsync(
                new GetAlbumsQuery(),
                cancellationToken);

            return Ok(albums);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAlbumById(
            int id,
            CancellationToken cancellationToken)
        {
            var album = await _dispatcher.SendAsync(
                new GetAlbumByIdQuery
                {
                    Id = id
                },
                cancellationToken);

            if (album == null)
            {
                return NotFound();
            }

            return Ok(album);
        }

        [HttpGet("{albumId:int}/photos")]
        public async Task<IActionResult> GetPhotos(
            int albumId,
            CancellationToken cancellationToken)
        {
            var photos = await _dispatcher.SendAsync(
                new GetPhotosByAlbumQuery
                {
                    AlbumId = albumId
                },
                cancellationToken);

            return Ok(photos);
        }
    }
}
