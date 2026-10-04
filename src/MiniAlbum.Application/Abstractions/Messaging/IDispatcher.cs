using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Application.Abstractions.Messaging
{
    public interface IDispatcher
    {
        Task<TResult> SendAsync<TResult>(
            ICommand<TResult> command,
            CancellationToken cansellationToken = default);

        Task<TResult> SendAsync<TResult>(
            IQuery<TResult> query,
            CancellationToken cancellationToken = default);
    }
}
