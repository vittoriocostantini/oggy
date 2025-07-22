import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface AddIconProps {
  size?: number;
  color?: string;
}

const AddIcon: React.FC<AddIconProps> = ({ size = 32, color = '#fff' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 12H12M12 12H18M12 12V18M12 12V6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default AddIcon; 