import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Header } from "../../components/composite/header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BellIcon,
  ArrowLeftIcon,
} from "../../components/leaf/icons";
import { useNavigation } from "@react-navigation/native";
import TimePicker from '../../components/leaf/date-picker/time-picker';
import { SingleDatePicker } from '../../components/leaf/date-picker/date-picker';
import { FormContainer } from '../../components/container';

function AddTask() {
  const navigation = useNavigation();
  const [time, setTime] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState('Select Date');
  const [endDate, setEndDate] = useState('Select Date');
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState({
    name: 'briefcase' as keyof typeof MaterialCommunityIcons.glyphMap,
    color: '#FFD6E3'
  });

  const handleAddTask = () => {
    // Lógica para agregar tarea
  };

  return (
    <View style={styles.container}>
      <Header
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 48,
        }}
      >
        <Header.Actions style={{ position: "absolute", left: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={28} color="#222" />
          </TouchableOpacity>
        </Header.Actions>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.title}>Add Task</Text>
        </View>
        <Header.Actions style={{ position: "absolute", right: 20 }}>
          <View style={styles.bellContainer}>
            <BellIcon size={28} color="#222" />
            <View style={styles.dot} />
          </View>
        </Header.Actions>
      </Header>
      
      <FormContainer>
        <FormContainer.TaskGroupSelector
          label="Project Group"
          value="Grocery shopping app design"
          iconName={selectedIcon.name}
          iconColor={selectedIcon.color}
          onIconSelect={(iconName, iconColor) => {
            setSelectedIcon({ name: iconName, color: iconColor });
          }}
          onPress={() => {}}
        />
        
        <FormContainer.InputField
          label="Task Name"
          placeholder="Enter task name"
          value={taskName}

          onChangeText={setTaskName}
        />
        
        <FormContainer.TextAreaField
          label="Description"
          placeholder="Enter task description"
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
        
        <TimePicker
          label="Select time"
          value={time}
          onChange={date => setTime(date)}
        />
        
        <FormContainer.Button
          title="Add Task"
          onPress={handleAddTask}
          disabled={!taskName.trim()}
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
    fontWeight: "600",
    textAlign: "center",
    color: "#222",
  },
  bellContainer: {
    position: "relative",
  },
  dot: {
    position: "absolute",
    top: 0,
    right: 2,
    width: 10,
    height: 10,
    backgroundColor: "#6C3EF5",
    borderRadius: 5,
  },
});

export default AddTask;
