import React from 'react';
import Svg, { Circle, Ellipse } from 'react-native-svg';

interface TeamIconProps {
  size?: number;
  color?: string;
}

const TeamIcon: React.FC<TeamIconProps> = ({ size = 28, color = '#A3A3B3' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle opacity="0.4" cx="15" cy="6" r="3" fill={color} />
      <Ellipse opacity="0.4" cx="16" cy="17" rx="5" ry="3" fill={color} />
      <Circle cx="9.00098" cy="6" r="4" fill={color} />
      <Ellipse cx="9.00098" cy="17.001" rx="7" ry="4" fill={color} />
    </Svg>
  );
};

export default TeamIcon; 