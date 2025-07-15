import { View, Text, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../../components/composite/header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardDate from '../../components/leaf/card-date/card-date';
import React, { useState, useMemo } from 'react';
import BarTask from '../../components/leaf/filter-task-bar/bar-task';



function TodayTask() {



  return (
    <View style={styles.container}>
     <Header style={{ paddingHorizontal: 20, }}>
        <Header.Actions style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#222" />
        </Header.Actions>
        <Header.Content>
          <Text style={styles.title}>Today Task</Text>
        </Header.Content>
        <Header.Actions>
          <View style={styles.bellContainer}>
            <MaterialCommunityIcons name="bell" size={28} color="#222" />
            <View style={styles.dot} />
          </View>
        </Header.Actions>
      </Header>
      <CardDate />
      <BarTask />
    </View>

  );
}

export default TodayTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#222',
  },
  bellContainer: {
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 10,
    height: 10,
    backgroundColor: '#6C3EF5',
    borderRadius: 5,
  },
  backButton: {
    position: 'relative',
    justifyContent: 'flex-start',
  },
});