import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarIcon from '../icons/calendar-icon';
import ChevronDownIcon from '../icons/chevron-down-icon';
import ModalContainer from '../../container/modal-container';

interface TimePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
}

function formatTime(date: Date | null): string {
  if (!date || isNaN(date.getTime())) return 'Select time';
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

function TimePicker({ label, value, onChange }: TimePickerProps) {
  const [show, setShow] = useState(false);

  const handleChange = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
      setShow(false);
    } else if (Platform.OS === 'android') {
      setShow(false);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.dateBox} onPress={() => setShow(true)} activeOpacity={0.8}>
        <View style={styles.dateContent}>
          <CalendarIcon size={22} color="#6C3EF5" />
          <View style={styles.dateTextBox}>
            <Text style={styles.dateLabel}>{label}</Text>
            <Text style={styles.dateValue}>{formatTime(value)}</Text>
          </View>
        </View>
        <ChevronDownIcon size={24} color="#222" />
      </TouchableOpacity>
      {show && (
        <ModalContainer visible={show} onClose={() => setShow(false)}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={value && !isNaN(value.getTime()) ? value : new Date()}
              mode="time"
              is24Hour={false}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleChange}
              style={styles.nativePicker}
            />
          </View>
        </ModalContainer>
      )}
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
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  nativePicker: {
    width: 250,
    alignSelf: 'center',
  },
});

export default TimePicker; 