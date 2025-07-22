import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { ModalContainer } from '../../container';
import CalendarIcon from '../icons/calendar-icon';
import ChevronDownIcon from '../icons/chevron-down-icon';

interface DatePickerProps {
  label: string;
  value: string;
  onDateChange: (date: string) => void;
  markedDates?: any;
  initialDate?: string;
}

function DatePicker({ label, value, onDateChange, markedDates, initialDate }: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  function formatDate(dateStr: string) {
    if (dateStr === 'Select Date') return 'Select your date';
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const [year, month, day] = dateStr.split('-');
    return `${day} ${months[parseInt(month, 10) - 1]}, ${year}`;
  }

  const calendarTheme = {
    backgroundColor: '#fff',
    calendarBackground: '#fff',
    todayTextColor: '#6C3EF5',
    selectedDayBackgroundColor: '#6C3EF5',
    selectedDayTextColor: '#fff',
    arrowColor: '#6C3EF5',
    monthTextColor: '#222',
    textMonthFontWeight: 'bold' as const,
    textDayFontWeight: '500' as const,
    textDayHeaderFontWeight: '500' as const,
  };

  return (
    <>
      <TouchableOpacity style={styles.dateBox} onPress={() => setShowCalendar(true)} activeOpacity={0.8}>
        <View style={styles.dateContent}>
          <CalendarIcon size={22} color="#6C3EF5" />
          <View style={styles.dateTextBox}>
            <Text style={styles.dateLabel}>{label}</Text>
            <Text style={styles.dateValue}>{formatDate(value)}</Text>
          </View>
        </View>
        <ChevronDownIcon size={24} color="#222" />
      </TouchableOpacity>
      
      <ModalContainer
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
      >
        <Calendar
          onDayPress={day => {
            onDateChange(day.dateString);
            setShowCalendar(false);
          }}
          markedDates={markedDates}
          markingType="period"
          initialDate={initialDate}
          theme={calendarTheme}
        />
      </ModalContainer>
    </>
  );
}

const styles = StyleSheet.create({
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTextBox: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },
  dateChevron: {
    marginLeft: 12,
  },
});

export default DatePicker; 