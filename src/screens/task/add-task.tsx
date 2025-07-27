import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header } from "../../components/composite/header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BellIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  CalendarIcon,
} from "../../components/leaf/icons";
import { useNavigation } from "@react-navigation/native";
import TimePicker from '../../components/leaf/date-picker/time-picker';
import { SingleDatePicker } from '../../components/leaf/date-picker/date-picker';


function AddTask() {
  const navigation = useNavigation();
  const [time, setTime] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState('Select Date');
  const [endDate, setEndDate] = useState('Select Date');

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
      <View style={styles.formContainer}>
        {/* Task Group Selector */}
        <View style={styles.taskGroupBox}>
          <View style={styles.taskGroupContent}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="briefcase" size={20} color="#fff" />
            </View>
            <View style={styles.taskGroupTextBox}>
              <Text style={styles.taskGroupLabel}>Project Group</Text>
              <Text style={styles.taskGroupValue}>Grocery shopping app design</Text>
            </View>
          </View>
          <ChevronDownIcon size={24} color="#222" />
        </View>
        {/* Project Name */}
        <View style={styles.inputBoxWhite}>
          <Text style={styles.inputLabel}>Task Name</Text>
          <TextInput style={styles.inputNoBg} />
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
        {/* Add Task Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.6} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Task</Text>
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
  formContainer: {
    padding: 20,
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#6C3EF5",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFD6E3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  taskGroupBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: "space-between",
  },
  taskGroupContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskGroupTextBox: {
    marginLeft: 10,
    justifyContent: "center",
  },
  taskGroupLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  taskGroupValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  inputBoxWhite: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 10,
    color: "#222",
  },
  inputNoBg: {
    fontSize: 16,
    color: "#222",
    marginTop: 4,
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  textAreaNoBg: {
    fontSize: 15,
    color: "#222",
    marginTop: 4,
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0,
    minHeight: 80,
    textAlignVertical: "top",
  },
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
});

export default AddTask;
