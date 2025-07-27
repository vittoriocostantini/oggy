import React, { useRef } from 'react';
import { Animated } from 'react-native';
import ChevronDownIcon from './chevron-down-icon';

interface AnimatedChevronProps {
  isOpen: boolean;
  size?: number;
  color?: string;
  duration?: number;
}

const AnimatedChevron: React.FC<AnimatedChevronProps> = ({ 
  isOpen, 
  size = 24, 
  color = "#222",
  duration = 300 
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [isOpen, duration]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <ChevronDownIcon size={size} color={color} />
    </Animated.View>
  );
};

export default AnimatedChevron; 