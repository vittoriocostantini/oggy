import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Svg, Circle } from 'react-native-svg';

const CardTask = () => {
  const percentage = 85;
  const radius = 32;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <View style={styles.card}>
      <View style={styles.menuIcon}>
        <MaterialCommunityIcons name="dots-horizontal" size={22} color="#fff" />
      </View>
      <Text style={styles.title}>Your today’s task{"\n"}almost done!</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Task</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Svg width={72} height={72}>
            <Circle
              cx={36}
              cy={36}
              r={radius}
              stroke="#fff"
              strokeOpacity={0.2}
              strokeWidth={strokeWidth}
              fill="none"
            />
            <Circle
              cx={36}
              cy={36}
              r={radius}
              stroke="#fff"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${circumference}, ${circumference}`}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              rotation="-90"
              origin="36,36"
            />
          </Svg>
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>{percentage}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6C3EF5',
    marginTop: 10,
    borderRadius: 24,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    position: 'relative',
  },
  menuIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 24,
    marginTop: 4,
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginRight: 12,
  },
  buttonText: {
    color: '#6C3EF5',
    fontWeight: '600',
    fontSize: 16,
  },
  progressContainer: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CardTask;
