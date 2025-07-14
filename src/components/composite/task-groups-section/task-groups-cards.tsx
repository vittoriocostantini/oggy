import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressCards from '../carousel-progress-cards/progress-cards';


export interface TaskGroupCardData {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor: string;
  iconBg: string;
  title: string;
  tasks: number;
  progress: number;
  cardColor: string;
  progressColor: string;
}

interface TaskGroupsCardsProps {
  data: TaskGroupCardData[];
  cardStyle?: any;
  titleStyle?: any;
  subtitleStyle?: any;
}


const TaskGroupsCards: React.FC<TaskGroupsCardsProps> = ({ data, cardStyle, titleStyle, subtitleStyle }) => (
  <>
    {data.map((group) => (
      <View key={group.title} style={[styles.card, cardStyle]}>
        <ProgressCards colorCard={group.cardColor} style={{ height: 60, width: 360 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ProgressCards.Icon color={group.iconBg}>
              <MaterialCommunityIcons name={group.iconName} size={24} color={group.iconColor} />
            </ProgressCards.Icon>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.title, titleStyle]}>{group.title}</Text>
              <Text style={[styles.subtitle, subtitleStyle]}>{group.tasks} Tasks</Text>
            </View>
            <ProgressCards.Progress value={group.progress} type="circular" color={group.progressColor} />
          </View>
        </ProgressCards>
      </View>
    ))}
  </>
);


const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  title: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#7b7b93',
    fontSize: 13,
    fontWeight: '500',
  },
});
export default TaskGroupsCards;
