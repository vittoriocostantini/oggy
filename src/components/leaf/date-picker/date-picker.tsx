import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarIcon from '../icons/calendar-icon';
import { AnimatedChevron } from '../icons';
import { useExpandAnimation } from '../../../assets/hooks/expand-box/use-expand-animation';

// Constantes extraídas
const PICKER_HEIGHT_IOS = 200;
const PICKER_HEIGHT_ANDROID = 150;
const Z_INDEX_PICKER = 1000;
const Z_INDEX_DATEBOX = 1;

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const;

// Helpers optimizados
const formatDate = (dateStr: string): string => {
  if (dateStr === 'Select Date') return 'Select your date';
  const [year, month, day] = dateStr.split('-');
  return `${day} ${MONTHS[parseInt(month, 10) - 1]}, ${year}`;
};

const getPickerHeight = (): number => 
  Platform.OS === 'ios' ? PICKER_HEIGHT_IOS : PICKER_HEIGHT_ANDROID;

interface SingleDatePickerProps {
  label: string;
  value: string;
  otherDate: string;
  isStart: boolean;
  onChange: (date: string) => void;
}

const SingleDatePicker: React.FC<SingleDatePickerProps> = React.memo(({ 
  label, 
  value, 
  otherDate, 
  isStart, 
  onChange 
}) => {
  // Estados
  const [date, setDate] = useState(() => 
    value !== 'Select Date' ? new Date(value) : new Date()
  );

  // Hook de animación
  const {
    isExpanded,
    toggleExpansion,
    animatedHeight,
    animatedOpacity,
    animatedTextOpacity,
  } = useExpandAnimation({
    expandedHeight: getPickerHeight(),
  });

  // Callbacks optimizados
  const handleChange = useCallback((_: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onChange(formattedDate);
      toggleExpansion(false);
    }
  }, [onChange, toggleExpansion]);

  const handleOpenPicker = useCallback(() => {
    toggleExpansion(!isExpanded);
  }, [isExpanded, toggleExpansion]);

  const handleOutsidePress = useCallback(() => {
    if (isExpanded) {
      toggleExpansion(false);
    }
  }, [isExpanded, toggleExpansion]);

  // Estilos memoizados
  const expandedPickerStyle = useMemo(() => [
    styles.expandedPicker,
    {
      height: animatedHeight,
      opacity: animatedOpacity,
    }
  ], [animatedHeight, animatedOpacity]);

  const dateContentStyle = useMemo(() => [
    styles.dateContent, 
    { opacity: animatedTextOpacity }
  ], [animatedTextOpacity]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.dateBox} 
        onPress={handleOpenPicker} 
        activeOpacity={0.8}
      >
        <Animated.View style={dateContentStyle}>
          <CalendarIcon size={22} color="#6C3EF5" />
          <View style={styles.dateTextBox}>
            <Text style={styles.dateLabel}>{label}</Text>
            <Text style={styles.dateValue}>{formatDate(value)}</Text>
          </View>
        </Animated.View>
        <AnimatedChevron isOpen={isExpanded} size={24} color="#222" />
      </TouchableOpacity>
      
      {isExpanded && (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      
      <Animated.View style={expandedPickerStyle}>
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
            style={styles.nativePicker}
          />
        </View>
      </Animated.View>
    </View>
  );
});

// Estilos optimizados
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: 'relative',
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: Z_INDEX_DATEBOX,
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'transparent',
    zIndex: Z_INDEX_PICKER - 1,
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
  expandedPicker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
    zIndex: Z_INDEX_PICKER,
    padding: 0,
    margin: 0,
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nativePicker: {
    width: 250,
    alignSelf: 'center',
  }
});

export { SingleDatePicker }; 