import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ChevronDownIcon } from '../leaf/icons';
import { useIconSelector } from '../../assets/hooks/icon-selector/use-icon-selector';

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
  onIconSelect?: (iconName: keyof typeof MaterialCommunityIcons.glyphMap, iconColor: string) => void;
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
  iconName,
  iconColor,
  onPress,
  onIconSelect
}) => {
  // Función para truncar el texto si es muy largo
  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const {
    selectedIcon,
    isExpanded,
    iconOptions,
    animatedHeight,
    animatedOpacity,
    rotateInterpolation,
    handleIconPress,
    handleIconSelect,
    closeSelector,
  } = useIconSelector(iconName, iconColor, onIconSelect);

  return (
    <View style={styles.taskGroupContainer}>
      {isExpanded && (
        <TouchableWithoutFeedback onPress={closeSelector}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      
      <View style={styles.iconSelectorContainer}>
        <TouchableOpacity 
          style={[styles.iconContainer, isExpanded && styles.iconContainerActive]}
          activeOpacity={0.8}
          onPress={handleIconPress}
        >
          <View style={[styles.iconCircle, { backgroundColor: selectedIcon.color }]}>
            <MaterialCommunityIcons 
              name={selectedIcon.name} 
              size={20} 
              color="#fff" 
            />
          </View>
          <Animated.View style={[styles.chevronIcon, { transform: [{ rotate: rotateInterpolation }] }]}>
            <MaterialCommunityIcons 
              name="chevron-down" 
              size={16} 
              color="#666" 
            />
          </Animated.View>
        </TouchableOpacity>
        
        <Animated.View 
          style={[
            styles.modernIconSelector,
            {
              opacity: animatedOpacity,
              maxHeight: animatedHeight,
            }
          ]}
        >
          <ScrollView 
            style={styles.iconScrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.iconScrollContent}
          >
            {iconOptions.map((icon, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modernIconOption}
                onPress={() => handleIconSelect(icon.name, icon.color)}
                activeOpacity={0.7}
              >
                <View style={[styles.modernIconCircle, { backgroundColor: icon.color }]}>
                  <MaterialCommunityIcons 
                    name={icon.name as keyof typeof MaterialCommunityIcons.glyphMap} 
                    size={20} 
                    color="#fff" 
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
      
      <TouchableOpacity 
        style={styles.taskGroupBox}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={styles.taskGroupContent}>
                  <View style={styles.taskGroupTextBox}>
          <Text style={styles.taskGroupLabel}>{label}</Text>
          <Text style={styles.taskGroupValue}>{truncateText(value)}</Text>
        </View>
        </View>
        <ChevronDownIcon size={24} color="#222" />
      </TouchableOpacity>
    </View>
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
        maxLength={30}
        
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
  taskGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
    taskGroupBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
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
    flex: 1,
    flexWrap: 'wrap',
  },
  iconContainer: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  iconContainerActive: {
    borderColor: '#6C3EF5',
    backgroundColor: '#F8F5FF',
  },
  chevronIcon: {
    marginLeft: 4,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFD6E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSelectorContainer: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  iconSelectorDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1000,
  },
  iconOption: {
    marginHorizontal: 4,
  },
  iconOptionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modernIconSelector: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
    minWidth: 65,
  },
  iconScrollView: {
    maxHeight: 160,
  },
  iconScrollContent: {
    paddingVertical: 4,
  },
  modernIconOption: {
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  modernIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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