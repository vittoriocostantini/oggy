import React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

export interface GlowEffectProps {
  style?: ViewStyle;
  color?: string;
  radius?: number;
  opacity?: number;
  position?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  gradientStops?: Array<{
    offset: string;
    stopColor: string;
    stopOpacity: number;
  }>;
}

const GlowEffect: React.FC<GlowEffectProps> = ({
  style,
  color = '#B8E0FF',
  radius = 150,
  opacity = 0.4,
  position,
  gradientStops,
}) => {
  const defaultStops = [
    { offset: '0%', stopColor: color, stopOpacity: opacity },
    { offset: '100%', stopColor: color, stopOpacity: 0 },
  ];

  const stops = gradientStops || defaultStops;

  const positionStyle: ViewStyle = {
    position: 'absolute',
    ...position,
  };

  return (
    <Svg
      style={[positionStyle, style]}
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
    >
      <Defs>
        <RadialGradient
          id={`glow-${color.replace('#', '')}-${radius}`}
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
          fx="50%"
          fy="50%"
        >
          {stops.map((stop, index) => (
            <Stop
              key={index}
              offset={stop.offset}
              stopColor={stop.stopColor}
              stopOpacity={stop.stopOpacity}
            />
          ))}
        </RadialGradient>
      </Defs>
      <Circle
        cx={radius}
        cy={radius}
        r={radius}
        fill={`url(#glow-${color.replace('#', '')}-${radius})`}
      />
    </Svg>
  );
};

export default GlowEffect; 