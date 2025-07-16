import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Header } from '../../components/composite/header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DatePicker } from '../../components/leaf/date-picker';

function AddProject() {
  const [startDate, setStartDate] = useState('Select Date');
  const [endDate, setEndDate] = useState('Select Date');



  // Función para obtener fechas entre dos fechas (YYYY-MM-DD)
  function getDatesInRange(start: string, end: string): string[] {
    const dates = [];
    const [startY, startM, startD] = start.split('-').map(Number);
    const [endY, endM, endD] = end.split('-').map(Number);
    let current = new Date(startY, startM - 1, startD);
    const endDateObj = new Date(endY, endM - 1, endD);

    while (current <= endDateObj) {
      const yyyy = current.getFullYear();
      const mm = String(current.getMonth() + 1).padStart(2, '0');
      const dd = String(current.getDate()).padStart(2, '0');
      dates.push(`${yyyy}-${mm}-${dd}`);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  // Construir markedDates para el rango
  function getMarkedDates() {
    if (
      startDate !== 'Select Date' &&
      endDate !== 'Select Date' &&
      startDate <= endDate
    ) {
      const range = getDatesInRange(startDate, endDate);
      const marked: any = {};
      range.forEach((date: string, idx: number) => {
        if (idx === 0) {
          marked[date] = {
            startingDay: true,
            color: '#6C3EF5',
            textColor: '#fff',
          };
        } else if (idx === range.length - 1) {
          marked[date] = {
            endingDay: true,
            color: '#6C3EF5',
            textColor: '#fff',
          };
        } else {
          marked[date] = {
            color: '#6C3EF5',
            textColor: '#fff',
          };
        }
      });
      return marked;
    } else if (startDate !== 'Select Date') {
      return {
        [startDate]: { startingDay: true, endingDay: true, color: '#6C3EF5', textColor: '#fff' },
      };
    } else if (endDate !== 'Select Date') {
      return {
        [endDate]: { startingDay: true, endingDay: true, color: '#6C3EF5', textColor: '#fff' },
      };
    }
    return {};
  }

  return (
    <View style={styles.container}>
      <Header style={{ paddingHorizontal: 20 }}>
        <Header.Actions style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#222" />
        </Header.Actions>
        <Header.Content>
          <Text style={styles.title}>Add Project</Text>
        </Header.Content>
        <Header.Actions>
          <View style={styles.bellContainer}>
            <MaterialCommunityIcons name="bell" size={28} color="#222" />
            <View style={styles.dot} />
          </View>
        </Header.Actions>
      </Header>
      <View style={styles.formContainer}>
        {/* Task Group Selector */}
        <View style={styles.taskGroupBox}>
          <View style={styles.taskGroupContent}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="briefcase" size={20} color="#fff" />
            </View>
            <View style={styles.taskGroupTextBox}>
              <Text style={styles.taskGroupLabel}>Task Group</Text>
              <Text style={styles.taskGroupValue}>Work</Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#222" style={styles.taskGroupChevron} />
        </View>
        {/* Project Name */}
        <View style={styles.inputBoxWhite}>
          <Text style={styles.inputLabel}>Project Name</Text>
          <TextInput style={styles.inputNoBg}  />
        </View>
        {/* Description */}
        <View style={styles.inputBoxWhite}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={styles.textAreaNoBg}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        {/* Start Date */}
        <DatePicker
          label="Start Date"
          value={startDate}
          onDateChange={setStartDate}
          markedDates={getMarkedDates()}
          initialDate={startDate !== 'Select Date' ? startDate : undefined}
        />
        {/* End Date */}
        <DatePicker
          label="End Date"
          value={endDate}
          onDateChange={setEndDate}
          markedDates={getMarkedDates()}
          initialDate={endDate !== 'Select Date' ? endDate : undefined}
        />
    
       
        {/* Add Project Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.6} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Project</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#222',
  },
  bellContainer: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 10,
    height: 10,
    backgroundColor: '#6C3EF5',
    borderRadius: 5,
  },
  backButton: {
    position: 'relative',
    justifyContent: 'flex-start',
  },
  formContainer: {
    padding: 20,
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: '#6C3EF5',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD6E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  taskGroupBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  taskGroupContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskGroupTextBox: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  taskGroupLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  taskGroupValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  taskGroupChevron: {
    marginLeft: 12,
  },
  inputBoxWhite: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 10,
    color: '#222',
  },
  inputNoBg: {
    fontSize: 16,
    color: '#222',
    marginTop: 4,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  textAreaNoBg: {
    fontSize: 15,
    color: '#222',
    marginTop: 4,
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: 80,
    textAlignVertical: 'top',
  },


});

export default AddProject;
