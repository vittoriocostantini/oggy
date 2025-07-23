import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../../components/composite/header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardDate from '../../components/leaf/card-date/card-date';
import React, { useState, useMemo } from 'react';
import BarTask from '../../components/leaf/filter-task-bar/bar-task';
import { TaskGroupsCards } from '../../components/composite/task-groups-section';
import { taskGroupsData } from '../../components/composite/task-groups-section/task-groups-data';
import ProgressCards from '../../components/composite/carousel-progress-cards/progress-cards';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BellIcon, ArrowLeftIcon } from '../../components/leaf/icons';


function TodayTask() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Verificar si viene del stack (View Task) o del tab bar
  const isFromStack = route.name === 'TodayMain';
  
  return (
    <View style={styles.container}>
     <Header style={{ paddingHorizontal: 20, minHeight: 48 }}>
        <Header.Actions style={styles.backButton}>
          {isFromStack ? (
            <TouchableOpacity onPress={() => (navigation as any).goBack()}>
              <ArrowLeftIcon size={24} color="#222" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 24 }} />
          )}
        </Header.Actions>
        <Header.Content>
          <Text style={styles.title}>Today Task</Text>
        </Header.Content>
        <Header.Actions>
          <View style={styles.bellContainer}>
              <BellIcon size={28} color="#222" />
            <View style={styles.dot} />
          </View>
        </Header.Actions>
      </Header>
      <CardDate />
        <BarTask />

          <TaskGroupsCards >
            {taskGroupsData.map((task, idx) => (
              <ProgressCards colorCard={task.cardColor} style={{ width: 350, minHeight: 100, marginBottom: 16, paddingVertical: 14, paddingHorizontal: 20, borderRadius: 18, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }} key={idx}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: '#a3a3b3', fontSize: 13, fontWeight: '500', marginBottom: 2, marginTop: 2 }}>{task.subtitle}</Text>
                    <Text style={{ color: '#222', fontSize: 16, fontWeight: 'light' }}>{task.title}</Text>
                  </View>
                  <View style={{ backgroundColor: task.iconBg, borderRadius: 12, padding: 7, marginLeft: 12, alignSelf: 'flex-start' }}>
                    <MaterialCommunityIcons name={task.iconName} size={14} color={task.iconColor} />
                  </View>
                </View>
                <View >
                  <ProgressCards.StatusTime time={task.time}  status={task.status} />
                </View>
              </ProgressCards>
            ))}
          </TaskGroupsCards>
        </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,

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

export default TodayTask;
