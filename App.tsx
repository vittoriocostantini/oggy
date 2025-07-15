import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Home from './src/screens/home/home';
import { GlowEffect } from './src/components/leaf/background';
import TodayTask from './src/screens/today-task/today-task';

export default function App() {
  return (
    <SafeAreaProvider>
      <LinearGradient
        colors={['#FFFFFF', '#FDFFFF', '#FAFEFF']}
        style={styles.container}
      >
          {/* Glow circular azul difuminado */}
          <GlowEffect
            color="#B8FFB8"
            radius={250}
            opacity={0.4}
            position={{ top: -150, left: -150 }}
          />
          <GlowEffect
            color="#B8E0FF"
            radius={250}
            opacity={0.6}
            position={{ bottom: 50, left: -270 }}
          />
           <GlowEffect
            color="#FFD700"
            radius={150}
            opacity={0.3}
            position={{ bottom: 250, right: -180 }}
          />
           <GlowEffect
            color="#B8FFB8"
            radius={150}
            opacity={0.3}
            position={{ bottom: -150, right: 0 }}
          />
          <TodayTask />
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});
