using System;
using System.Collections.Generic;
using System.Text;

namespace MiniAlbum.Application.Abstractions.Messaging
{
    internal interface IQueryHandler<TQuery, TResult> 
        where TQuery : IQuery<TResult>
    {
        Task<TResult> HandleAsync(
            TQuery query,
            CancellationToken cancellationToken = default);
    }
}
