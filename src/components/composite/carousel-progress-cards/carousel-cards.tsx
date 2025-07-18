import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ViewProps } from 'react-native';

const { width } = Dimensions.get('window');

interface CarouselCardsProps extends ViewProps {
  children: React.ReactNode;
}

function CarouselCards({ children, style, ...rest }: CarouselCardsProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
}

interface HeaderProps {
  title: string;
  count: number;
}

function Header({ title, count }: HeaderProps) {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerCountContainer}>
        <Text style={styles.headerCount}>{count}</Text>
      </View>
    </View>
  );
}

interface CarouselProps {
  children: (item: any) => React.ReactElement;
  data: any[];
  height?: number;
}

function CarouselComponent({ children, data, height = 130 }: CarouselProps) {
  return (
    <Carousel
      width={width - 1}
      height={height}
      data={data}
      loop={false}
      snapEnabled={true}
      pagingEnabled={true}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 120,
        parallaxAdjacentItemScale: 0.9,
      }}
      style={{ alignSelf: 'center' }}
      renderItem={({ item }) => children(item)}
    />
  );
}

interface ItemProps {
  children: React.ReactNode;
}

function Item({ children }: ItemProps) {
  return <>{children}</>;
}

CarouselCards.Header = Header;
CarouselCards.Carousel = CarouselComponent;
CarouselCards.Item = Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 18,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
    marginRight: 8,
  },
  headerCountContainer: {
    backgroundColor: '#ede9fe',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  headerCount: {
    color: '#a78bfa',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default CarouselCards; 