"use client"

import React, { useState } from 'react';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DateRangePicker= ({checkIn,checkOut,onDone}) => {
  const [startDate, setStartDate] = useState(checkIn);
  const [endDate, setEndDate] = useState(checkOut);
  const [currentMonth, setCurrentMonth] = useState(checkIn);
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateSelect = (date) => {
    if (date < today) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date >= startDate) {
        setEndDate(date);
        onDone({from:startDate,to:date});
        setIsOpen(false);
      } else {
        setStartDate(date);
      }
    }
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) : 'Select Date';
  };

  const changeMonth = (increment) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = Array(startingDay).fill(null);

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="relative w-full mx-auto">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-3 bg-white border-2 border-gray-100 rounded-lg cursor-pointer hover:border-accent transition-colors"
      >
        <div className="flex items-center space-x-3">
          <FaCalendarAlt className="text-black" />
          <span className="text-gray-700">
            {startDate ? formatDate(startDate) : 'Check-in'}
          </span>
          {endDate && (
            <span className="text-gray-700 ml-4">
              {formatDate(endDate)}
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-lg p-4 mt-2 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-accent/10 rounded-full"
            >
              <FaChevronLeft className="text-black" />
            </button>
            <h2 className="text-lg font-semibold text-black">
              {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
            </h2>
            <button 
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-accent/10 rounded-full"
            >
              <FaChevronRight className="text-black" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {weekdays.map(day => (
              <div key={day} className="text-xs text-black font-medium">
                {day}
              </div>
            ))}
            {generateCalendarDays().map((date, index) => (
              <button
                key={index}
                onClick={() => date && handleDateSelect(date)}
                disabled={date && date < today}
                className={`
                  p-2 rounded-md text-sm 
                  ${!date ? 'bg-transparent' : ''}
                  ${date && date < today ? 'text-gray-300 cursor-not-allowed' : ''}
                  ${startDate && date && date.toDateString() === startDate.toDateString() 
                    ? 'bg-accent text-white' 
                    : endDate && date && date.toDateString() === endDate.toDateString() 
                    ? 'bg-accent text-white' : ''}
                  ${startDate && endDate && date && date > startDate && date < endDate 
                    ? 'bg-accent/20' : ''}
                  ${date ? 'hover:bg-accent/10' : ''}
                `}
              >
                {date ? date.getDate() : ''}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;