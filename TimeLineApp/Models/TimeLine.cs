using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineApp.Models
{
    public class TimeLine
    {
        private 
    }

    public abstract class Ep
    {
        public Ep(string Name) { this.Name = Name; }
        public string Name { get; set; }
    }

    public class Event: Ep
    {
        private DateTime m_day;
        private int m_month;
        private int m_year;
        private int m_decade;
        private int m_century;

        public Event(string name, DateTime dt):base(name)
        {
            Day = dt;

        }

        public DateTime Day { get => m_day; set => m_day = value; }
        public int Month { get => m_month; set => m_month = value; }
        public int Year { get => m_year; set => m_year = value; }
        public int Decade { get => m_decade; set => m_decade = value; }
        public int Century { get => m_century; set => m_century = value; }
    }
}
