import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { GlowEffect } from './src/components/leaf/background';
import { MainStack } from './src/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './src/screens/home/home';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
    <SafeAreaProvider>
    
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  }

});
