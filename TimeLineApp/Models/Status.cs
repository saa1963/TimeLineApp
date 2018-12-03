using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineApp.Models
{
    public class Status
    {
        private string _message;

        public int Id { get; set; }
        public string Message
        {
            get => _message;
            set
            {
                if (!String.IsNullOrWhiteSpace(value))
                {
                    _message = value;
                    IsSuccess = false;
                }
            }
        }
        public bool IsSuccess { get; private set; } = true;
    }
}
