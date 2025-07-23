import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { HomeIcon, CalendarIcon, FileIcon, TeamIcon, AddIcon } from '../../leaf/icons';
import GlowEffect from '../../leaf/background/glow-effect';

const { width } = Dimensions.get('window');
const TAB_HEIGHT = 70;
const CURVE_WIDTH = 70;
const BORDER_RADIUS = 25;

// Configuración de iconos para cada ruta
const ICON_CONFIG = {
  Home: { component: HomeIcon, size: 28 },
  Today: { component: CalendarIcon, size: 28 },
  Projects: { component: FileIcon, size: 28 },
  Team: { component: TeamIcon, size: 28 },
} as const;

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const renderIcon = (routeName: string, isFocused: boolean) => {
    const config = ICON_CONFIG[routeName as keyof typeof ICON_CONFIG];
    if (!config) return null;
    
    const { component: IconComponent, size } = config;
    const color = isFocused ? '#6C3EF5' : '#A3A3B3';
    
    return (
      <View style={styles.iconContainer}>
        {isFocused && (
          <GlowEffect
            color="#6C3EF5"
            radius={20}
            opacity={0.4}
            position={{ top: -0, left: -5 }}
          />
        )}
        <IconComponent size={size} color={color} />
      </View>
    );
  };

  const handleTabPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    
    if (!isFocused && !event.defaultPrevented) {
      if (route.name === 'Add') {
        // No hacer nada para el botón Add
        return;
      } else {
        navigation.navigate(route.name);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Svg
        width={width}
        height={TAB_HEIGHT}
        style={StyleSheet.absoluteFill}
      >
        <Path
          d={`M${BORDER_RADIUS} 0
              H${(width - CURVE_WIDTH) / 2}
              C${(width - CURVE_WIDTH) / 2 + 10} 0, ${(width - CURVE_WIDTH) / 2 + 10} ${TAB_HEIGHT - 45}, ${(width - CURVE_WIDTH) / 2 + CURVE_WIDTH / 2} ${TAB_HEIGHT - 45}
              C${(width + CURVE_WIDTH) / 2 - 10} ${TAB_HEIGHT - 45}, ${(width + CURVE_WIDTH) / 2 - 10} 0, ${(width + CURVE_WIDTH) / 2} 0
              H${width - BORDER_RADIUS}
              A${BORDER_RADIUS} ${BORDER_RADIUS} 0 0 1 ${width} ${BORDER_RADIUS}
              V${TAB_HEIGHT - BORDER_RADIUS}
              A${BORDER_RADIUS} ${BORDER_RADIUS} 0 0 1 ${width - BORDER_RADIUS} ${TAB_HEIGHT}
              H${BORDER_RADIUS}
              A${BORDER_RADIUS} ${BORDER_RADIUS} 0 0 1 0 ${TAB_HEIGHT - BORDER_RADIUS}
              V${BORDER_RADIUS}
              A${BORDER_RADIUS} ${BORDER_RADIUS} 0 0 1 ${BORDER_RADIUS} 0
              Z`}
          fill="#eee9ff"
          opacity={1}
        />
      </Svg>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => handleTabPress(route, isFocused);

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          if (route.name === 'Add') {
            return (
              <View key={route.key} style={styles.addButtonWrapper} pointerEvents="box-none">
                <GlowEffect
                  color="#6C3EF5"
                  radius={35}
                  opacity={0.5}
                  position={{ top: -0, left: -8 }}
                />
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  activeOpacity={0.7}
                  style={styles.addButtonTouchable}
                >
                  <View style={styles.addButton}>
                    <Svg width={46} height={46} viewBox="0 0 46 46">
                      <Defs>
                        <LinearGradient id="addButtonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <Stop offset="0%" stopColor="#8B5CF6" />
                          <Stop offset="50%" stopColor="#6C3EF5" />
                          <Stop offset="100%" stopColor="#5B21B6" />
                        </LinearGradient>
                      </Defs>
                      <Path
                        d="M23 0C10.298 0 0 10.298 0 23C0 35.702 10.298 46 23 46C35.702 46 46 35.702 46 23C46 10.298 35.702 0 23 0Z"
                        fill="url(#addButtonGradient)"
                      />
                    </Svg>
                    <View style={styles.addIconContainer}>
                      <AddIcon size={32} color="#fff" />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }

          // Espacio para el botón central
          if (index === 2) {
            return <View key={route.key} style={styles.centerSpace} pointerEvents="none" />;
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              {renderIcon(route.name, isFocused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_HEIGHT,
    zIndex: 100,
  },
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: TAB_HEIGHT,
    width: '100%',
    paddingHorizontal: 24,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSpace: {
    flex: 1,
  },
  addButtonWrapper: {
    position: 'relative',
    bottom: 40,
    zIndex: 10,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonTouchable: {
    borderRadius: 32,
    overflow: 'visible',
  },
  addButton: {
    width: 46,
    height: 46,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C3EF5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    position: 'relative',
  },
  addIconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 