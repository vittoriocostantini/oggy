import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../../components/composite/header';
import { SingleDatePicker } from '../../components/leaf/date-picker/date-picker';
import { BellIcon } from '../../components/leaf/icons';
import { FormContainer } from '../../components/container';
// import { useNavigation } from '@react-navigation/native';

function AddProject() {
  const [startDate, setStartDate] = useState('Select Date');
  const [endDate, setEndDate] = useState('Select Date');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Work');

  const handleAddProject = () => {
    // Lógica para agregar proyecto
  };

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
      
      <FormContainer>
        <FormContainer.TaskGroupBox
          label="Task Group"
          value={selectedGroup}
          onGroupSelect={(groupName) => {
            setSelectedGroup(groupName);
            console.log('Selected group:', groupName);
          }}
        />
        
        <FormContainer.InputField
          label="Project Name"
          placeholder="Enter project name"
          value={projectName}
          onChangeText={setProjectName}
        />
        
        <FormContainer.TextAreaField
          label="Description"
          placeholder="Enter project description"
          value={description}
          onChangeText={setDescription}
        />
        
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
        
        <FormContainer.Button
          title="Add Project"
          onPress={handleAddProject}
          disabled={!projectName.trim()}
        />
      </FormContainer>
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
});

export default AddProject;
