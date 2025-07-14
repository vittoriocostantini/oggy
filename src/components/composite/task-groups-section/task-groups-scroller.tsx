import React from 'react';
import { View, Text, StyleSheet, ScrollView, ViewProps } from 'react-native';

interface TaskGroupsScrollerProps extends ViewProps {
  children: React.ReactNode;
}

function TaskGroupsScroller({ children, style, ...rest }: TaskGroupsScrollerProps) {
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
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.countContainer}>
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
}

interface ScrollProps {
  children: React.ReactNode;
}

function Scroll({ children }: ScrollProps) {
  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

TaskGroupsScroller.Header = Header;
TaskGroupsScroller.Scroll = Scroll;
TaskGroupsScroller.Card = Card;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 8,
  },
  countContainer: {
    backgroundColor: '#ede9fe',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  count: {
    color: '#a78bfa',
    fontWeight: 'bold',
    fontSize: 15,
  },
  card: {
    marginBottom: 12,
  },
  scroll: {
    maxHeight: 300,
  },
});

export default TaskGroupsScroller; 