import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ModalContainer } from '../../container';
import CalendarIcon from '../icons/calendar-icon';
import { AnimatedChevron } from '../icons';

// Helpers fuera del componente
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function formatDate(dateStr: string): string {
  if (dateStr === 'Select Date') return 'Select your date';
  const [year, month, day] = dateStr.split('-');
  return `${day} ${MONTHS[parseInt(month, 10) - 1]}, ${year}`;
}

interface SingleDatePickerProps {
  label: string;
  value: string;
  otherDate: string;
  isStart: boolean;
  onChange: (date: string) => void;
}

function SingleDatePicker({ label, value, otherDate, isStart, onChange }: SingleDatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(value !== 'Select Date' ? new Date(value) : new Date());
  const [tempDate, setTempDate] = useState(date);

  const handleChange = (_: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setTempDate(currentDate);
  };

  const handleConfirm = () => {
    setDate(tempDate);
    const formattedDate = tempDate.toISOString().split('T')[0];
    onChange(formattedDate);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTempDate(date);
    setShowPicker(false);
  };

  const handleOpenPicker = () => {
    setShowPicker(true);
  };

  return (
    <>
      <TouchableOpacity style={styles.dateBox} onPress={handleOpenPicker} activeOpacity={0.8}>
        <View style={styles.dateContent}>
          <CalendarIcon size={22} color="#6C3EF5" />
          <View style={styles.dateTextBox}>
            <Text style={styles.dateLabel}>{label}</Text>
            <Text style={styles.dateValue}>{formatDate(value)}</Text>
          </View>
        </View>
        <AnimatedChevron isOpen={showPicker} size={24} color="#222" />
      </TouchableOpacity>
      {showPicker && (
        <ModalContainer visible={showPicker} onClose={handleCancel}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleChange}
              style={styles.nativePicker}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.8} style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
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
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  nativePicker: {
    width: 250,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#6C3EF5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export { SingleDatePicker }; 