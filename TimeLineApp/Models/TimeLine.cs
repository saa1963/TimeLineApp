using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineApp.Models
{
    enum enPeriod
    {
        day,month,year,decade,century
    }
    public class TimeLine
    {
        //private 
    }

    public class Event
    {
        private string m_name;
        private DateTime? m_day;
        private int? m_month;
        private int? m_year;
        private int? m_decade;
        private int m_century;

        public Event(string name)
        {
            Name = name;
            //Month = (dt.Year - 1) * 12 + dt.Month;
            //Year = dt.Year;
            //Decade = dt.Year / 10 + 1;
            //Century = dt.Year / 100 + 1;
        }

        public string Name { get => m_name; set => m_name = value; }
        public DateTime? Day { get => m_day; set => m_day = value; }
        public int? Month { get => m_month; set => m_month = value; }
        public int? Year { get => m_year; set => m_year = value; }
        public int? Decade { get => m_decade; set => m_decade = value; }
        public int Century { get => m_century; set => m_century = value; }
    }

    public class EventCentury: Event
    {
        public EventCentury(string name, int century): base(name)
        {
            Century = century;
        }
    }

    public class EventDecade : Event
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="century">(- ... +)</param>
        /// <param name="decade">десятилетие 0-9 нулевые .. девяностые</param>
        public EventDecade(string name, int century, int decade) : base(name)
        {
            Debug.Assert(decade >= 0 && decade <= 9);
            Decade = ((Math.Abs(century) - 1) * 10 + decade + 1) * (century/Math.Abs(century));
            Century = century;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="decade">внутреннее представление -2 -1 1 2</param>
        public EventDecade(string name, int decade) : base(name)
        {
            Decade = decade;
            Century = decade / 10 + 1;
        }
    }
}
