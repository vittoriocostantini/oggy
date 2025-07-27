import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ChevronDownIcon } from '../leaf/icons';

interface FormContainerProps {
  children: React.ReactNode;
}

interface FormContainerSubComponents {
  TaskGroupSelector: React.FC<TaskGroupSelectorProps>;
  InputField: React.FC<InputFieldProps>;
  TextAreaField: React.FC<TextAreaFieldProps>;
  Button: React.FC<ButtonProps>;
}

interface TaskGroupSelectorProps {
  label: string;
  value: string;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
  onPress?: () => void;
}

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

interface TextAreaFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  numberOfLines?: number;
}

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const FormContainer: React.FC<FormContainerProps> & FormContainerSubComponents = ({ children }) => {
  return (
    <View style={styles.formContainer}>
      {children}
    </View>
  );
};

// Subcomponente para el selector de grupo de tareas
FormContainer.TaskGroupSelector = ({ 
  label, 
  value, 
  iconName = "briefcase", 
  iconColor = "#fff",
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.taskGroupBox} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.taskGroupContent}>
        <TouchableOpacity 
          style={styles.iconCircle}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <MaterialCommunityIcons 
            name={iconName as keyof typeof MaterialCommunityIcons.glyphMap} 
            size={20} 
            color={iconColor} 
          />
        </TouchableOpacity>
        <View style={styles.taskGroupTextBox}>
          <Text style={styles.taskGroupLabel}>{label}</Text>
          <Text style={styles.taskGroupValue}>{value}</Text>
        </View>
      </View>
      <ChevronDownIcon size={24} color="#222" />
    </TouchableOpacity>
  );
};

// Subcomponente para campos de entrada de texto
FormContainer.InputField = ({ label, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.inputBoxWhite}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput 
        style={styles.inputNoBg}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

// Subcomponente para campos de área de texto
FormContainer.TextAreaField = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  numberOfLines = 4 
}) => {
  return (
    <View style={styles.inputBoxWhite}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textAreaNoBg}
        multiline={true}
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

// Subcomponente para botones
FormContainer.Button = ({ title, onPress, disabled = false }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity 
        activeOpacity={0.6} 
        style={[styles.addButton, disabled && styles.disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.addButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    flex: 1,
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
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD6E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
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
  buttonContainer: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#6C3EF5',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default FormContainer; 