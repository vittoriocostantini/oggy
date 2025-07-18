import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../../components/composite/header';
import { CardTask } from '../../components/leaf/today-card-task-section';
import ProgressCards from '../../components/composite/carousel-progress-cards/progress-cards';
import CarouselCards from '../../components/composite/carousel-progress-cards/carousel-cards';
import React from 'react';
import { TaskGroupsCards } from '../../components/composite/task-groups-section';
import { carouselInProgressData } from '../../components/composite/carousel-progress-cards/carousel-data';
import { taskGroupsData } from '../../components/composite/task-groups-section/task-groups-data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Home() {
  return (
    <View style={styles.container}>
      <Header style={{ paddingHorizontal: 20, }}>
        <Header.Avatar>
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=Livia+Vaccaro&background=random' }}
            style={styles.avatar}
          />
        </Header.Avatar>
        <Header.Content>
          <Text style={styles.hello}>Hello!</Text>
          <Text style={styles.name}>Livia Vaccaro</Text>
        </Header.Content>
        <Header.Actions>
          <View style={styles.bellContainer}>
            <MaterialCommunityIcons name="bell" size={28} color="#222" />
            <View style={styles.dot} />
          </View>
        </Header.Actions>
      </Header>
      <View style={styles.cardTask}>
        <CardTask />
      </View>
      <CarouselCards>
        <CarouselCards.Header title="In Progress" count={6} />
        <CarouselCards.Carousel data={carouselInProgressData} height={130}>
          {(item) => (
            <ProgressCards colorCard={item.colorCard} style={{ height: 120 }}>
              <ProgressCards.Title>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ color: '#7b7b93', fontSize: 13, fontWeight: '500' }}>{item.projectType}</Text>
                  <View style={{ backgroundColor: '#f3e8ff', borderRadius: 6, padding: 3 }}>
                    <MaterialCommunityIcons name={item.icon} size={20} color={item.iconColor} />
                  </View>
                </View>
                <Text style={{ color: '#222', fontSize: 17, fontWeight: 'bold', marginBottom: 8 }}>{item.title}</Text>
              </ProgressCards.Title>
              <ProgressCards.Progress value={item.progress} type="linear" color={item.colorProgressBar} />
            </ProgressCards>
          )}
        </CarouselCards.Carousel>
      </CarouselCards>
      {/* Task Groups Section */}
      <View style={{height: 350}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16, marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>Task Groups</Text>
          <View style={{ backgroundColor: '#ede9fe', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8, minWidth: 24, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#a78bfa', fontSize: 14, fontWeight: '600' }}>{taskGroupsData.length}</Text>
          </View>
        </View>
       
          <TaskGroupsCards>
            {taskGroupsData.map((group, idx) => (
              <ProgressCards colorCard={group.cardColor} style={{ height: 60, width: 360, marginBottom: 12 }} key={idx}>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                  <View style={{ backgroundColor: group.iconBg, borderRadius: 12, padding: 4 }}>
                    <MaterialCommunityIcons name={group.iconName} size={24} color={group.iconColor} />
                  </View>
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ color: '#222', fontSize: 16, fontWeight: 'bold' }}>{group.title}</Text>
                    <Text style={{ color: '#7b7b93', fontSize: 13, fontWeight: '500' }}>{group.tasks} Tasks</Text>
                  </View>
                  <ProgressCards.Progress value={group.progress} type="circular" color={group.progressColor} />
                </View>
              </ProgressCards>
            ))}
          </TaskGroupsCards>
        
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  cardTask: {
    paddingHorizontal: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  hello: {
    fontSize: 14,
    color: '#888',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  text: {
    color: '#fff',
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
});

export default Home;