import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardStyles from './CardStyles';
import Svg, { G, Circle } from 'react-native-svg';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '@/components/ThemeContext';

interface ProgressChartCardProps {
  title: string;
  completed: number;
  missed: number;
  upcoming: number;
}

const SIZE = 120;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const COLORS = {
  completed: '#1de9b6', // teal/green
  missed: '#3949ab', // blue/dark
  upcoming: '#e0e0e0', // light gray
};

const ProgressChartCard: React.FC<ProgressChartCardProps> = ({
  title,
  completed,
  missed,
  upcoming,
}) => {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const total = completed + missed + upcoming;
  const completedPct = total ? completed / total : 0;
  const missedPct = total ? missed / total : 0;

  // Calculate arc lengths
  const completedLen = CIRCUMFERENCE * completedPct;
  const missedLen = CIRCUMFERENCE * missedPct;

  return (
    <View style={[CardStyles.card, { backgroundColor: colors.cardBackground }]}>
      <Svg width={SIZE} height={SIZE}>
        <G rotation="270" origin={`${SIZE / 2},${SIZE / 2}`}>
          {/* Upcoming (gray) - always a full circle */}
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={COLORS.upcoming}
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeLinecap="butt"
          />
          {/* Completed (green) - draw first, starts at 12 o'clock, clockwise */}
          {completed > 0 && (
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={COLORS.completed}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={`${completedLen},${CIRCUMFERENCE - completedLen}`}
              strokeDashoffset={0}
              strokeLinecap="butt"
            />
          )}
          {/* Missed (blue) - starts where green ends, clockwise */}
          {missed > 0 && (
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={COLORS.missed}
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={`${missedLen},${CIRCUMFERENCE - missedLen}`}
              strokeDashoffset={-completedLen}
              strokeLinecap="butt"
            />
          )}
        </G>
      </Svg>
      <View style={styles.infoCol}>
        <Text style={[styles.title, { color: colors.accent }]}>{title}</Text>
        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={[styles.legendLine, { backgroundColor: COLORS.completed }]} />
            <Text style={[styles.legendLabel, isDark && { color: '#fff' }]}>
              {completed} Complete
            </Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendLine, { backgroundColor: COLORS.missed }]} />
            <Text style={[styles.legendLabel, isDark && { color: '#fff' }]}>{missed} Missed</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendLine, { backgroundColor: COLORS.upcoming }]} />
            <Text style={[styles.legendLabel, isDark && { color: '#fff' }]}>
              {upcoming} Upcoming
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // cardRow style is now shared via CardStyles
  infoCol: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  legend: {
    marginTop: 4,
  },
  legendRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 6,
  },
  legendLine: {
    borderRadius: 2,
    height: 4,
    marginRight: 8,
    width: 18,
  },
  legendLabel: {
    color: '#444',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default ProgressChartCard;
