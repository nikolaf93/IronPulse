import React, { useContext, useRef, useCallback } from 'react';
import { StyleSheet, Animated, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Colors from '@/constants/Colors';
import { useTheme } from '@/components/ThemeContext';
import Card from '@/components/Card';
import ProgressChartCard from '@/components/ProgressChartCard';
import ViewSection from '@/components/ViewSection';
import { ScrollContext } from './_layout';
import UserCard from '@/components/UserCard';
import { useFocusEffect } from 'expo-router';

export default function DashboardScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const scrollContext = useContext(ScrollContext);
  const scrollY = scrollContext?.scrollY;
  const scrollViewRef = useRef(null);
  const lastScrollY = useRef(0);

  // On focus, sync scrollY to lastScrollY so header matches scroll position
  useFocusEffect(
    React.useCallback(() => {
      if (scrollY && typeof scrollY.setValue === 'function') {
        scrollY.setValue(lastScrollY.current);
      }
    }, [scrollY]),
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      if (scrollY && typeof scrollY.setValue === 'function') {
        scrollY.setValue(y);
      }
      lastScrollY.current = y;
    },
    [scrollY],
  );

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      scrollEventThrottle={16}
      onScroll={handleScroll}
    >
      {/* Title and separator removed, now handled in layout */}
      <Card
        title="Dashboard"
        content="Welcome to IronPulse! Track your fitness progress and achieve your goals."
      />
      <ViewSection style={{ width: '100%', paddingHorizontal: 20 }} title="Progress" />
      <ProgressChartCard title="Weekly Progress" completed={10} missed={10} upcoming={20} />
      <ProgressChartCard title="Weekly Progress" completed={10} missed={10} upcoming={20} />
      <ProgressChartCard title="Weekly Progress" completed={10} missed={10} upcoming={20} />
      <ProgressChartCard title="Weekly Progress" completed={10} missed={10} upcoming={20} />

      <ViewSection style={{ width: '100%', paddingHorizontal: 20 }} title="Your Trainer" />
      <UserCard name="Alex Johnson" />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // Removed flex: 1 and alignItems: 'center' to allow bottom spacer to show
    paddingTop: 16,
    paddingBottom: 16,
  },
});
