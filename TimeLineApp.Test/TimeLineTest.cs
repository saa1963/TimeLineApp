using System;
using System.Diagnostics;
using TimeLineApp.Models;
using Xunit;

namespace TimeLineApp.Test
{
    public class TimeLineTest
    {
        [Fact]
        public void EventCenturyTest()
        {
            var o = new EventCentury("11", 1);
            Assert.Equal(1, o.Century);
            Assert.Equal("11", o.Name);
            Assert.Null(o.Day);
            Assert.Null(o.Decade);
            Assert.Null(o.Month);
            Assert.Null(o.Year);
        }
        [Fact]
        public void EventDecadeTest()
        {
            var o = new EventDecade("11", 1, 0);
            Assert.Equal("11", o.Name);
            Assert.Equal(1, o.Century);
            Assert.Null(o.Day);
            Assert.Equal(1, o.Decade);
            Assert.Null(o.Month);
            Assert.Null(o.Year);
            o = new EventDecade("11", 1);
            Assert.Equal("11", o.Name);
            Assert.Equal(1, o.Century);
            Assert.Null(o.Day);
            Assert.Equal(1, o.Decade);
            Assert.Null(o.Month);
            Assert.Null(o.Year);
            o = new EventDecade("11", -1, 0);
            Assert.Equal("11", o.Name);
            Assert.Equal(-1, o.Century);
            Assert.Null(o.Day);
            Assert.Equal(-1, o.Decade);
            Assert.Null(o.Month);
            Assert.Null(o.Year);
            o = new EventDecade("11", -1);
            Assert.Equal("11", o.Name);
            Assert.Equal(-1, o.Century);
            Assert.Null(o.Day);
            Assert.Equal(-1, o.Decade);
            Assert.Null(o.Month);
            Assert.Null(o.Year);
        }
        [Fact]
        public void EventYearTest()
        {
            var o = new EventYear("11", 1);
            Assert.Equal("11", o.Name);
            Assert.Equal(1, o.Century);
            Assert.Null(o.Day);
            Assert.Equal(1, o.Decade);
            Assert.Null(o.Month);
            Assert.Equal(1, o.Year);
            o = new EventYear("11", -1);
            Assert.Equal("11", o.Name);
            Assert.Equal(-1, o.Century);
            Assert.Null(o.Day);
            Assert.Equal(-1, o.Decade);
            Assert.Null(o.Month);
            Assert.Equal(-1, o.Year);
        }
        [Fact]
        public void EventMonthTest()
        {
            var o = new EventMonth("11", 13);
            Assert.Equal("11", o.Name);
            Assert.Equal(1, o.Century);
            Assert.Null(o.Day);
            Assert.Equal(1, o.Decade);
            Assert.Equal(13, o.Month);
            Assert.Equal(2, o.Year);
            o = new EventMonth("11", -13);
            Assert.Equal("11", o.Name);
            Assert.Equal(-1, o.Century);
            Assert.Null(o.Day);
            Assert.Equal(-1, o.Decade);
            Assert.Equal(-13, o.Month);
            Assert.Equal(-2, o.Year);
        }
    }
}
