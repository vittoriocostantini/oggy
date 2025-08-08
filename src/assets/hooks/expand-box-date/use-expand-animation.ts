import { useState, useRef, useCallback, useMemo } from 'react';
import { Animated } from 'react-native';

// Constantes para la animación
const ANIMATION_DURATION = 300;
const TEXT_ANIMATION_DURATION = 200;

interface UseExpandAnimationProps {
  expandedHeight: number;
  animationDuration?: number;
  textAnimationDuration?: number;
}

interface UseExpandAnimationReturn {
  isExpanded: boolean;
  toggleExpansion: (show: boolean) => void;
  animatedHeight: Animated.AnimatedInterpolation<string | number>;
  animatedOpacity: Animated.AnimatedInterpolation<string | number>;
  animatedTextOpacity: Animated.AnimatedInterpolation<string | number>;
}

export const useExpandAnimation = ({
  expandedHeight,
  animationDuration = ANIMATION_DURATION,
  textAnimationDuration = TEXT_ANIMATION_DURATION,
}: UseExpandAnimationProps): UseExpandAnimationReturn => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expandAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(1)).current;

  const toggleExpansion = useCallback((show: boolean) => {
    setIsExpanded(show);
    Animated.parallel([
      Animated.timing(expandAnim, {
        toValue: show ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: show ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(textOpacityAnim, {
        toValue: show ? 0 : 1,
        duration: textAnimationDuration,
        useNativeDriver: false,
      }),
    ]).start();
  }, [expandAnim, heightAnim, textOpacityAnim, animationDuration, textAnimationDuration]);

  const animatedHeight = useMemo(() => 
    heightAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, expandedHeight],
    }), [heightAnim, expandedHeight]);

  const animatedOpacity = useMemo(() => 
    expandAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }), [expandAnim]);

  const animatedTextOpacity = useMemo(() => 
    textOpacityAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }), [textOpacityAnim]);

  return {
    isExpanded,
    toggleExpansion,
    animatedHeight,
    animatedOpacity,
    animatedTextOpacity,
  };
};