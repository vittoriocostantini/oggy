import React, { useMemo, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ViewStyle } from 'react-native';

interface CardDateProps {
  style?: ViewStyle;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const getCurrentMonthDates = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    dates.push({
      day: d,
      month: months[month],
      dayName: weekDays[date.getDay()],
      isToday:
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear(),
    });
  }
  return dates;
};

const CardDate: React.FC<CardDateProps> = ({ style }) => {
  const dates = useMemo(() => getCurrentMonthDates(), []);
  const todayIndex = dates.findIndex(f => f.isToday);
  const [selectedIndex, setSelectedIndex] = useState(todayIndex);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollRef.current && todayIndex >= 0) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          x: todayIndex * 74, // 74 es el ancho de la tarjeta
          animated: false
        });
      }, 100);
    }
  }, [todayIndex]);

  return (
    <View style={style}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {dates.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => setSelectedIndex(index)}
              activeOpacity={0.8}
            >
              <Text style={[styles.month, isSelected && styles.selectedText]}>{item.month}</Text>
              <Text style={[styles.day, isSelected && styles.selectedText]}>{item.day}</Text>
              <Text style={[styles.dayName, isSelected && styles.selectedText]}>{item.dayName}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 8,
    marginTop: 20,
  },
  card: {
    width: 74,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 4,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#6c3ef4',

  },
  month: {
    fontSize: 15,
    color: '#888',
    marginBottom: 2,
  },
  day: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  dayName: {
    fontSize: 15,
    color: '#888',
    marginTop: 2,
  },
  selectedText: {
    color: '#fff',
  },
});

export default CardDate;
