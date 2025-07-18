import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


type TaskFilterKey = 'all' | 'todo' | 'inprogress' | 'done';

const TASK_FILTERS     = [
  { key: 'all', label: 'all' },
  { key: 'todo', label: 'To do' },
  { key: 'inprogress', label: 'In progress' },
  { key: 'done', label: 'Done' },
];


interface ContinentBarProps {
  onSelect?: (key: TaskFilterKey) => void;
  selected?: TaskFilterKey;
}

const ContinentBar: React.FC<ContinentBarProps> = ({ onSelect, selected }) => {
  const [selectedContinent, setSelectedContinent] = useState<TaskFilterKey>(selected || 'all');

  const handleSelect = (key: TaskFilterKey) => {
    setSelectedContinent(key);
    if (onSelect) onSelect(key);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bar} contentContainerStyle={{alignItems: 'center'}}>
        {TASK_FILTERS.map((cont) => (
          <TouchableOpacity
            key={cont.key}
            activeOpacity={0.6}
            style={[
              styles.button,
              selectedContinent === cont.key && styles.selectedButton,
            ]}
            onPress={() => handleSelect(cont.key as TaskFilterKey)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedContinent === cont.key && styles.selectedButtonText,
              ]}
            >
              {cont.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#212529',
  },
  bar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#ede9fe',
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingVertical: 8,
    marginRight: 12
  },
  selectedButton: {
    backgroundColor: '#6c3ef4',
  },
  buttonText: {
    color: '#6c3ef4',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default ContinentBar;
