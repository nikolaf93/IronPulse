import React, { useContext } from "react";
import { StyleSheet, Animated, SafeAreaView } from "react-native";
import { View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useTheme } from "@/components/ThemeContext";
import Card from "@/components/Card";
import ProgressChartCard from "@/components/ProgressChartCard";
import ViewSection from "@/components/ViewSection";
import { ScrollContext } from "./_layout";
import UserCard from "@/components/UserCard";

export default function DashboardScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? "dark" : "light"];
  const scrollContext = useContext(ScrollContext);
  const scrollY = scrollContext?.scrollY;

  return (
    <Animated.ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      scrollEventThrottle={16}
      onScroll={
        scrollY
          ? Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )
          : undefined
      }
    >
      {/* Title and separator removed, now handled in layout */}
      <Card
        title="Dashboard"
        content="Welcome to IronPulse! Track your fitness progress and achieve your goals."
      />
      <ViewSection
        style={{ width: "100%", paddingHorizontal: 20 }}
        title="Progress"
      />
      <ProgressChartCard
        title="Weekly Progress"
        completed={10}
        missed={10}
        upcoming={20}
      />
      <ProgressChartCard
        title="Weekly Progress"
        completed={10}
        missed={10}
        upcoming={20}
      />
      <ProgressChartCard
        title="Weekly Progress"
        completed={10}
        missed={10}
        upcoming={20}
      />
      <ProgressChartCard
        title="Weekly Progress"
        completed={10}
        missed={10}
        upcoming={20}
      />

      <ViewSection
        style={{ width: "100%", paddingHorizontal: 20 }}
        title="Your Trainer"
      />
      <UserCard name="Alex Johnson" />
      {/* <View style={{ height: 16 }} /> */}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // Removed flex: 1 and alignItems: 'center' to allow bottom spacer to show
    paddingTop: 16,
    paddingBottom: 16,
  },
  card: {
    width: "100%",
    marginHorizontal: 10,
    padding: 32,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardText: {
    fontSize: 20,
    lineHeight: 30,
  },
});
