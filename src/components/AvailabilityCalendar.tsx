import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface AvailabilityCalendarProps {
  onDateSelect: (dates: { checkIn: string; checkOut: string }) => void;
  selectedDates?: { checkIn: string; checkOut: string } | null;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ onDateSelect, selectedDates }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);
  const [tempCheckIn, setTempCheckIn] = useState<string | null>(null);

  const today = new Date();
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const prevMonthDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prevMonthDate >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prevMonthDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const clickedDateString = formatDate(clickedDate);

    if (clickedDate < today) return;

    if (!selectingCheckOut) {
      // Selecting check-in date
      setTempCheckIn(clickedDateString);
      setSelectingCheckOut(true);
    } else {
      // Selecting check-out date
      if (tempCheckIn && clickedDateString > tempCheckIn) {
        onDateSelect({
          checkIn: tempCheckIn,
          checkOut: clickedDateString
        });
        setSelectingCheckOut(false);
        setTempCheckIn(null);
      } else {
        // Reset if invalid selection
        setTempCheckIn(clickedDateString);
      }
    }
  };

  const isDateSelected = (day: number) => {
    const dateString = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    return selectedDates?.checkIn === dateString || selectedDates?.checkOut === dateString;
  };

  const isDateInRange = (day: number) => {
    if (!selectedDates?.checkIn || !selectedDates?.checkOut) return false;
    const dateString = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    return dateString > selectedDates.checkIn && dateString < selectedDates.checkOut;
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date < today;
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day);
      const isInRange = isDateInRange(day);
      const isDisabled = isDateDisabled(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isDisabled}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
            isDisabled
              ? 'text-gray-300 cursor-not-allowed'
              : isSelected
              ? 'bg-green-600 text-white'
              : isInRange
              ? 'bg-green-100 text-green-800'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Select Dates</span>
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-900 min-w-32 text-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        {!selectingCheckOut ? 'Select your check-in date' : 'Select your check-out date'}
      </div>

      {/* Selected dates display */}
      {selectedDates && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="text-sm text-green-800">
            <div>Check-in: {new Date(selectedDates.checkIn).toLocaleDateString()}</div>
            <div>Check-out: {new Date(selectedDates.checkOut).toLocaleDateString()}</div>
            <div className="font-medium mt-1">
              {Math.ceil((new Date(selectedDates.checkOut).getTime() - new Date(selectedDates.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;