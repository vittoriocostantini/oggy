import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrowLeftIconProps {
  size?: number;
  color?: string;
}

const ArrowLeftIcon: React.FC<ArrowLeftIconProps> = ({ size = 24, color = '#222' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 9.32919V14.6692C18 17.9892 15.65 19.3392 12.78 17.6892L11.5 16.9492C11.19 16.7692 11 16.4392 11 16.0792V7.91919C11 7.55919 11.19 7.22919 11.5 7.04919L12.78 6.30919C15.65 4.65919 18 6.00919 18 9.32919Z"
        fill={color}
      />
      <Path
        d="M9.99859 8.79152V15.2215C9.99859 15.6115 9.57859 15.8515 9.24859 15.6515L8.14859 15.0115C5.27859 13.3615 5.27859 10.6415 8.14859 8.99152L9.24859 8.35152C9.57859 8.16152 9.99859 8.40152 9.99859 8.79152Z"
        fill={color}
      />
    </Svg>
  );
};

export default ArrowLeftIcon; 