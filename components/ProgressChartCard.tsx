import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { Text } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useTheme } from "@/components/ThemeContext";

interface ProgressChartCardProps {
  title: string;
  completed: number;
  missed: number;
  upcoming: number;
}

const SIZE = 90;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const COLORS = {
  completed: "#1de9b6", // teal/green
  missed: "#3949ab", // blue/dark
  upcoming: "#e0e0e0", // light gray
};

const LEGEND = [
  { key: "completed", label: "Complete", color: COLORS.completed },
  { key: "missed", label: "Missed", color: COLORS.missed },
  { key: "upcoming", label: "Upcoming", color: COLORS.upcoming },
];

const ProgressChartCard: React.FC<ProgressChartCardProps> = ({
  title,
  completed,
  missed,
  upcoming,
}) => {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? "dark" : "light"];
  const total = completed + missed + upcoming;
  const completedPct = total ? completed / total : 0;
  const missedPct = total ? missed / total : 0;
  const upcomingPct = total ? upcoming / total : 0;

  // Calculate arc lengths
  const completedLen = CIRCUMFERENCE * completedPct;
  const missedLen = CIRCUMFERENCE * missedPct;
  const upcomingLen = CIRCUMFERENCE * upcomingPct;

  return (
    <View style={[styles.cardRow, { backgroundColor: colors.cardBackground }]}>
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
            <View
              style={[styles.legendLine, { backgroundColor: COLORS.completed }]}
            />
            <Text style={[styles.legendLabel, isDark && { color: '#fff' }]}>{completed} Complete</Text>
          </View>
          <View style={styles.legendRow}>
            <View
              style={[styles.legendLine, { backgroundColor: COLORS.missed }]}
            />
            <Text style={[styles.legendLabel, isDark && { color: '#fff' }]}>{missed} Missed</Text>
          </View>
          <View style={styles.legendRow}>
            <View
              style={[styles.legendLine, { backgroundColor: COLORS.upcoming }]}
            />
            <Text style={[styles.legendLabel, isDark && { color: '#fff' }]}>{upcoming} Upcoming</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  infoCol: {
    marginLeft: 24,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  legend: {
    marginTop: 4,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  legendLine: {
    width: 18,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 15,
    color: "#444",
    fontWeight: "500",
  },
});

export default ProgressChartCard;
