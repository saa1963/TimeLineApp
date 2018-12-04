using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TimeLineApp.Models
{
    [Serializable]
    public struct Date
    {
        int Day;
        int Month;
        int Year;

        public Date(int year, int month, int day)
        {
            if (year == 0) throw new ArgumentOutOfRangeException("year");
            if (month > 12 || month < 1) throw new ArgumentOutOfRangeException("month");
            if (day < 1) throw new ArgumentOutOfRangeException("day");
            if ((new int[] { 1, 3, 5, 7, 8, 10, 12 }).Contains(month))
            {
                if (day > 31) throw new ArgumentOutOfRangeException("day");
            }
            else if ((new int[] { 4, 6, 9, 11 }).Contains(month))
            {
                if (day > 30) throw new ArgumentOutOfRangeException("day");
            }
            else
            {
                if (day > 29) throw new ArgumentOutOfRangeException("day");
                if (year >= 1 && year <= 9999)
                {
                    var dt = new DateTime(year, month, day);
                    if (DateTime.IsLeapYear(dt.Year))
                    {
                        if (day > 27) throw new ArgumentOutOfRangeException("day");
                    }
                    else
                    {
                        if (day > 28) throw new ArgumentOutOfRangeException("day");
                    }
                }
            }
            Day = day;
            Month = month;
            Year = year;
        }
    }

    [Serializable]
    public class TimeLine
    {
        private List<Event> m_events = new List<Event>();
        private List<Period> m_periods = new List<Period>();
        public string Name { get; set; }

        public TimeLine(string name, string data = null)
        {
            Name = name;
            if (data != null)
            {
                var o = JObject.Parse(data);
                foreach (var e in o["events"])
                {
                    if (e["type"].Value<long>() == 0)
                    {
                        if (e["day"] != null)
                        {
                            m_events.Add(new EventDay(
                                e["name"].Value<string>(),
                                e["day"]["year"].Value<int>(),
                                e["day"]["month"].Value<int>(),
                                e["day"]["day"].Value<int>()));
                        }
                        else if (e["month"] != null)
                        {
                            m_events.Add(new EventMonth(
                                e["name"].Value<string>(),
                                e["month"].Value<int>()));
                        }
                        else if (e["year"] != null)
                        {
                            m_events.Add(new EventMonth(
                                e["name"].Value<string>(),
                                e["year"].Value<int>()));
                        }
                        else if (e["decade"] != null)
                        {
                            m_events.Add(new EventMonth(
                                e["name"].Value<string>(),
                                e["decade"].Value<int>()));
                        }
                        else if (e["century"] != null)
                        {
                            m_events.Add(new EventMonth(
                                e["name"].Value<string>(),
                                e["century"].Value<int>()));
                        }
                    }
                    else
                    {
                        var nn = e["name"].Value<string>();
                        if (e["first"]["day"] != null)
                        {
                            var year1 = e["first"]["day"]["year"].Value<int>();
                            var month1 = e["first"]["day"]["month"].Value<int>();
                            var day1 = e["first"]["day"]["day"].Value<int>();
                            var year2 = e["last"]["day"]["year"].Value<int>();
                            var month2 = e["last"]["day"]["month"].Value<int>();
                            var day2 = e["last"]["day"]["day"].Value<int>();
                            m_periods.Add(new Period(
                                nn,
                                new EventDay("Начало", year1, month1, day1),
                                new EventDay("Конец", year2, month2, day2)));
                        }
                        else if (e["first"]["month"] != null)
                        {
                            m_periods.Add(new Period(
                                e[name].Value<string>(),
                                new EventMonth("Начало",
                                    e["first"]["month"].Value<int>()
                                ),
                                new EventMonth("Конец",
                                    e["last"]["month"].Value<int>()
                                )));
                        }
                        else if (e["first"]["year"] != null)
                        {
                            m_periods.Add(new Period(
                                e[name].Value<string>(),
                                new EventYear("Начало",
                                    e["first"]["year"].Value<int>()
                                ),
                                new EventYear("Конец",
                                    e["last"]["year"].Value<int>()
                                )));
                        }
                        else if (e["first"]["decade"] != null)
                        {
                            m_periods.Add(new Period(
                                e[name].Value<string>(),
                                new EventDecade("Начало",
                                    e["first"]["decade"].Value<int>()
                                ),
                                new EventDecade("Конец",
                                    e["last"]["decade"].Value<int>()
                                )));
                        }
                        else if (e["first"]["century"] != null)
                        {
                            m_periods.Add(new Period(
                                e[name].Value<string>(),
                                new EventCentury("Начало",
                                    e["first"]["century"].Value<int>()
                                ),
                                new EventCentury("Конец",
                                    e["last"]["century"].Value<int>()
                                )));
                        }
                    }
                }
            }
        }

        public void AddEvent(Event e)
        {
            m_events.Add(e);
        }

        public int EventCount
        { get => m_events.Count; }

        public int PeriodCount
        { get => m_periods.Count; }
    }

    [Serializable]
    public class Event
    {
        private string m_name;
        private Date? m_day;
        private int? m_month;
        private int? m_year;
        private int? m_decade;
        private int m_century;

        public Event(string name)
        {
            Name = name;
        }

        protected int CenturyFromDecade(int decade)
        {
            return decade / 10 + (decade / Math.Abs(decade));
        }

        protected int DecadeFromYear(int year)
        {
            return year / 10 + (year / Math.Abs(year));
        }

        protected int YearFromMonth(int month)
        {
            return (month - 1) / 12 + (month / Math.Abs(month));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="year"></param>
        /// <param name="month">1-12</param>
        /// <param name="day"></param>
        /// <returns></returns>
        protected int MonthFromDay(int year, int month, int day)
        {
            return 0;
        }

        public string Name { get => m_name; set => m_name = value; }
        public Date? Day { get => m_day; set => m_day = value; }
        public int? Month { get => m_month; set => m_month = value; }
        public int? Year { get => m_year; set => m_year = value; }
        public int? Decade { get => m_decade; set => m_decade = value; }
        public int Century { get => m_century; set => m_century = value; }
    }

    [Serializable]
    public class EventCentury: Event
    {
        public EventCentury(string name, int century): base(name)
        {
            Century = century;
        }
    }

    [Serializable]
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
            Century = CenturyFromDecade(decade);
        }
    }

    [Serializable]
    public class EventYear: Event
    {
        public EventYear(string name, int year): base(name)
        {
            Year = year;
            Decade = DecadeFromYear(year);
            Century = CenturyFromDecade(Decade.Value);
        }
    }

    [Serializable]
    public class EventMonth: Event
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="year"></param>
        /// <param name="month">месяц от 1 до 12</param>
        public EventMonth(string name, int year, int month):base(name)
        {
            Month = ((Math.Abs(year) - 1) * 12 + month) * (year / Math.Abs(year));
            Year = year;
            Decade = DecadeFromYear(year);
            Century = CenturyFromDecade(Decade.Value);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="month">-1 ... +1</param>
        public EventMonth(string name, int month):base(name)
        {
            Month = month;
            Year = YearFromMonth(month);
            Decade = DecadeFromYear(Year.Value);
            Century = CenturyFromDecade(Decade.Value);
        }
    }

    [Serializable]
    public class EventDay: Event
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        /// <param name="year"></param>
        /// <param name="month">1-12</param>
        /// <param name="day"></param>
        public EventDay(string name, int year, int month, int day):base(name)
        {
            Day = new Date(year, month, day);
            Month = ((Math.Abs(year) - 1) * 12 + month) * (year / Math.Abs(year));
            Year = year;
            Decade = DecadeFromYear(year);
            Century = CenturyFromDecade(Decade.Value);
        }
    }

    [Serializable]
    public class Period
    {
        public string Name { get; set; }
        public Event Begin { get; set; }
        public Event End { get; set; }

        public Period(string name, Event begin, Event end)
        {
            if (begin.GetType() != end.GetType()) throw new ArgumentException("Неодинаковый тип");
            Name = name;
            Begin = begin;
            End = end;
        }
    }
}
