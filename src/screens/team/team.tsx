import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/composite/header';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Team() {
  return (
    <View style={styles.container}>
      <Header style={{ paddingHorizontal: 20 }}>
        <Header.Avatar>
          <MaterialCommunityIcons name="account-group" size={24} color="#6C3EF5" />
        </Header.Avatar>
        <Header.Content>
          <Text style={styles.title}>Team</Text>
        </Header.Content>
        <Header.Actions>
          <View style={styles.bellContainer}>
            <MaterialCommunityIcons name="bell" size={28} color="#222" />
            <View style={styles.dot} />
          </View>
        </Header.Actions>
      </Header>
      <View style={styles.content}>
        <Text style={styles.comingSoon}>Coming Soon</Text>
        <Text style={styles.description}>Team screen will be implemented here</Text>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  comingSoon: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C3EF5',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default Team; 