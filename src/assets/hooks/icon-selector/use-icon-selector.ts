import { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useExpandAnimation } from '../expand-box-date/use-expand-animation';

interface SelectedIcon {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

interface IconOption {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  label: string;
}

export const useIconSelector = (
  initialIconName?: keyof typeof MaterialCommunityIcons.glyphMap,
  initialIconColor?: string,
  onIconSelect?: (iconName: keyof typeof MaterialCommunityIcons.glyphMap, iconColor: string) => void
) => {
  const [selectedIcon, setSelectedIcon] = useState<SelectedIcon>({
    name: initialIconName || 'briefcase',
    color: initialIconColor || '#FFD6E3'
  });
  
  const { isExpanded, toggleExpansion, animatedHeight, animatedOpacity } = useExpandAnimation({
    expandedHeight: 240,
    animationDuration: 300,
  });
  
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  const iconOptions: IconOption[] = [
    { name: 'briefcase', color: '#FF6B6B', label: 'Work' },
    { name: 'home', color: '#4ECDC4', label: 'Home' },
    { name: 'heart', color: '#FFD93D', label: 'Personal' },
    { name: 'star', color: '#6C5CE7', label: 'Important' },
    { name: 'book', color: '#A8E6CF', label: 'Study' },
    { name: 'car', color: '#FF8B94', label: 'Travel' },
    { name: 'airplane', color: '#74B9FF', label: 'Business' },
    { name: 'gift', color: '#FD79A8', label: 'Gifts' },
  ];

  const handleIconPress = () => {
    const newExpandedState = !isExpanded;
    toggleExpansion(newExpandedState);
    
    // Animar la rotación del chevron
    Animated.timing(rotateAnim, {
      toValue: newExpandedState ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleIconSelect = (selectedIconName: string, selectedIconColor: string) => {
    setSelectedIcon((prev) => ({
      name: selectedIconName as keyof typeof MaterialCommunityIcons.glyphMap,
      color: selectedIconColor
    }));
    
    if (onIconSelect) {
      onIconSelect(selectedIconName as keyof typeof MaterialCommunityIcons.glyphMap, selectedIconColor);
    }
    
    // Cerrar el selector con animación
    closeSelector();
  };

  const closeSelector = () => {
    toggleExpansion(false);
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return {
    selectedIcon,
    isExpanded,
    iconOptions,
    animatedHeight,
    animatedOpacity,
    rotateInterpolation,
    handleIconPress,
    handleIconSelect,
    closeSelector,
  };
}; 