import { View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface HeaderProps {
  children: ReactNode;
  style?: ViewStyle;
};

const Header = ({ children, style }: HeaderProps) => (
  <View style={styles.container}>
    <View style={[styles.header, style]} >
      {children}
    </View>
  </View>
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
  container: {
    backgroundColor: 'transparent',
    paddingTop: 50,
  },
});

export default Header; 