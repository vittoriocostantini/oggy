import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Header } from '../../components/composite/header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SingleDatePicker } from '../../components/leaf/date-picker/date-picker';
import { BellIcon, ArrowLeftIcon, ChevronDownIcon } from '../../components/leaf/icons';
import { useNavigation } from '@react-navigation/native';

function AddProject() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState('Select Date');
  const [endDate, setEndDate] = useState('Select Date');

  return (
    <View style={styles.container}>
      <Header style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 48 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>Add Project</Text>
        </View>
        <Header.Actions style={{ position: 'absolute', right: 20 }}>
          <View style={styles.bellContainer}>
            <BellIcon size={28} color="#222" />
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
          <ChevronDownIcon size={24} color="#222" />
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
        {/* Date Range Picker */}
        <SingleDatePicker
          label="Start Date"
          value={startDate}
          otherDate={endDate}
          isStart={true}
          onChange={date => setStartDate(date)}
        />
        <SingleDatePicker
          label="End Date"
          value={endDate}
          otherDate={startDate}
          isStart={false}
          onChange={date => setEndDate(date)}
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
  formContainer: {
    padding: 20,
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
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
