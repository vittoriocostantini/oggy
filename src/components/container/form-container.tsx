import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  TextInputProps,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AnimatedChevron } from "../leaf/icons";
import { useExpandAnimation } from "../../assets/hooks/expand-box-date";

const Z_INDEX_OVERLAY = 999;
const Z_INDEX_PANEL = 1000;

interface FormContainerProps {
  children: React.ReactNode;
}

interface FormContainerSubComponents {
  TaskGroupBox: React.FC<TaskGroupBoxProps>;
  InputField: React.FC<InputFieldProps>;
  TextAreaField: React.FC<TextAreaFieldProps>;
  Button: React.FC<ButtonProps>;
}

export interface TaskGroupBoxProps {
  label: string;
  value: string;
  onGroupSelect?: (groupName: string) => void;
  expandedHeight?: number;
}

export interface InputFieldProps
  extends Omit<TextInputProps, "style" | "children"> {
  label: string;
}

export interface TextAreaFieldProps
  extends Omit<TextInputProps, "style" | "children"> {
  label: string;
  numberOfLines?: number;
}

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const FormContainer: React.FC<FormContainerProps> &
  FormContainerSubComponents = ({ children }) => {
  return <View style={styles.formContainer}>{children}</View>;
};

FormContainer.TaskGroupBox = ({
  label,
  value,
  onGroupSelect,
  expandedHeight = 200,
}) => {
  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const {
    isExpanded,
    toggleExpansion,
    animatedHeight,
    animatedOpacity,
    animatedTextOpacity,
  } = useExpandAnimation({ expandedHeight });

  const groupOptions = [
    {
      name: "Work",
      icon: "briefcase" as keyof typeof MaterialCommunityIcons.glyphMap,
      color: "#FFD6E3",
    },
    {
      name: "Personal",
      icon: "heart" as keyof typeof MaterialCommunityIcons.glyphMap,
      color: "#FFD6D6",
    },
    {
      name: "Shopping",
      icon: "cart" as keyof typeof MaterialCommunityIcons.glyphMap,
      color: "#D6E3FF",
    },
    {
      name: "Health",
      icon: "medical-bag" as keyof typeof MaterialCommunityIcons.glyphMap,
      color: "#D6FFD6",
    },
    {
      name: "Education",
      icon: "school" as keyof typeof MaterialCommunityIcons.glyphMap,
      color: "#FFF2D6",
    },
    {
      name: "Travel",
      icon: "airplane" as keyof typeof MaterialCommunityIcons.glyphMap,
      color: "#E3D6FF",
    },
    {
      name: "Home",
      icon: "home" as keyof typeof MaterialCommunityIcons.glyphMap,
      color: "#FFE4D6",
    },
    {
      name: "Finance",
      icon: "wallet" as keyof typeof MaterialCommunityIcons.glyphMap,
      color: "#D6FFF0",
    },
  ];

  const currentGroup =
    groupOptions.find((group) => group.name === value) || groupOptions[0];

  const handleGroupSelect = (groupName: string) => {
    onGroupSelect?.(groupName);
    toggleExpansion(false);
  };

  return (
    <View style={styles.taskGroupWrapper}>
      {isExpanded && (
        <TouchableWithoutFeedback onPress={() => toggleExpansion(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <View style={styles.taskGroupContainer}>
        <View style={styles.iconContainer}>
          <View
            style={[styles.iconCircle, { backgroundColor: currentGroup.color }]}
          >
            <MaterialCommunityIcons
              name={currentGroup.icon}
              size={20}
              color="#fff"
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.taskGroupBox}
          activeOpacity={0.8}
          onPress={() => toggleExpansion(!isExpanded)}
          accessibilityRole="button"
          accessibilityState={{ expanded: isExpanded }}
        >
          <Animated.View
            style={[styles.taskGroupContent, { opacity: animatedTextOpacity }]}
          >
            <View style={styles.taskGroupTextBox}>
              <Text style={styles.taskGroupLabel}>{label}</Text>
              <Text style={styles.taskGroupValue}>{truncateText(value)}</Text>
            </View>
          </Animated.View>
          <AnimatedChevron isOpen={isExpanded} size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.expandedTaskGroup,
          { height: animatedHeight, opacity: animatedOpacity },
        ]}
      >
        <ScrollView
          style={styles.expandedContent}
          showsVerticalScrollIndicator={false}
        >
          {groupOptions.map((group) => (
            <TouchableOpacity
              key={group.name}
              style={[
                styles.groupOption,
                value === group.name && styles.selectedGroupOption,
              ]}
              onPress={() => handleGroupSelect(group.name)}
              activeOpacity={0.7}
            >
              <View style={styles.groupOptionContent}>
                <View
                  style={[
                    styles.groupOptionIcon,
                    { backgroundColor: group.color },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={group.icon}
                    size={18}
                    color="#fff"
                  />
                </View>
                <Text
                  style={[
                    styles.groupOptionText,
                    value === group.name && styles.selectedGroupOptionText,
                  ]}
                >
                  {group.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

FormContainer.InputField = ({ label, ...rest }) => {
  return (
    <View style={styles.inputBoxWhite}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput style={styles.inputNoBg} maxLength={30} {...rest} />
    </View>
  );
};

FormContainer.TextAreaField = ({ label, numberOfLines = 4, ...rest }) => {
  return (
    <View style={styles.inputBoxWhite}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textAreaNoBg}
        multiline={true}
        numberOfLines={numberOfLines}
        {...rest}
      />
    </View>
  );
};

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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  taskGroupWrapper: {
    position: "relative",
  },
  taskGroupBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    flex: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: "space-between",
  },
  taskGroupContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskGroupTextBox: {
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
    flex: 1,
    flexWrap: "wrap",
  },
  expandedTaskGroup: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: "hidden",
    zIndex: Z_INDEX_PANEL,
    padding: 0,
    margin: 0,
  },
  iconContainer: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFD6E3",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: "transparent",
    zIndex: Z_INDEX_OVERLAY,
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
  buttonContainer: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#6C3EF5",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  expandedContent: {
    padding: 16,
  },
  groupOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  groupOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupOptionIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  groupOptionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
  },
  selectedGroupOption: {
    backgroundColor: "#F0F0F0",
  },
  selectedGroupOptionText: {
    color: "#6C3EF5",
  },
});

export default FormContainer;
