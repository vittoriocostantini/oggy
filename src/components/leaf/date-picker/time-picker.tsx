import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AnimatedChevron from '../icons/animated-chevron';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useExpandAnimation } from '../../../assets/hooks/expand-box-date/use-expand-animation';

// Constantes
const PICKER_HEIGHT_IOS = 200;
const PICKER_HEIGHT_ANDROID = 150;
const Z_INDEX_PICKER = 1000;
const Z_INDEX_DATEBOX = 1;

const getPickerHeight = (): number => 
  Platform.OS === 'ios' ? PICKER_HEIGHT_IOS : PICKER_HEIGHT_ANDROID;

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
  const [tempTime, setTempTime] = useState(value || new Date());

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

  const handleChange = useCallback((_: any, selectedDate?: Date) => {
    const currentDate = selectedDate || tempTime;
    if (selectedDate) {
      onChange(currentDate);
      toggleExpansion(false);
    }
  }, [tempTime, onChange, toggleExpansion]);

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
          <MaterialCommunityIcons name="clock" size={22} color="#6C3EF5" />
          <View style={styles.dateTextBox}>
            <Text style={styles.dateLabel}>{label}</Text>
            <Text style={styles.dateValue}>{formatTime(value)}</Text>
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
            value={tempTime && !isNaN(tempTime.getTime()) ? tempTime : new Date()}
            mode="time"
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
            style={styles.nativePicker}
          />
        </View>
      </Animated.View>
    </View>
  );
}

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
  },
});

export default TimePicker; 