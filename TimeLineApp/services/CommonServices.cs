using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Security.Claims;

namespace TimeLineApp.services
{
    public class CommonServices
    {
        public string getUserName(HttpContext httpCtx)
        {
            string rt = null;
            if (httpCtx.User.HasClaim(s => s.Type == ClaimTypes.Name))
            {
                var userName = httpCtx.User.Claims.SingleOrDefault(s => s.Type == ClaimTypes.Name).Value;
                if (userName != null)
                {
                    rt = userName;
                }
            }
            if (rt != null)
                return rt;
            else
                throw new UnauthorizedAccessException("Неавторизованный доступ");
        }
    }
}
