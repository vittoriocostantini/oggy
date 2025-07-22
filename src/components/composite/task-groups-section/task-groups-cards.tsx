import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

interface TaskGroupsCardsProps {
  children: React.ReactNode;
  style?: any;
}

const TaskGroupsCards: React.FC<TaskGroupsCardsProps> = ({ children, style }) => (
  <ScrollView style={[styles.container, style ]} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 80, paddingTop: 20}}>{children}</ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaskGroupsCards;
