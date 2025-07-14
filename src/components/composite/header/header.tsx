import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderProps } from '../../../models/header/header';

const Header = ({ children, style }: HeaderProps) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={[styles.header, style]} >
      {children}
    </View>
  </SafeAreaView>
);

Header.Avatar = ({ children, style }: HeaderProps) => (
  <View style={[styles.avatarContainer, style]}>
    {children}
  </View>
);

Header.Content = ({ children, style }: HeaderProps) => (
  <View style={[styles.contentContainer, style]}>
    {children}
  </View>
);

Header.Actions = ({ children, style }: HeaderProps) => (
  <View style={[styles.actionsContainer, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 8,
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
});

export default Header; 