import React, { useContext } from 'react';
import { StyleSheet, Animated } from 'react-native';
import Colors from '@/constants/Colors';
import { useTheme } from '@/components/ThemeContext';
import Card from '@/components/Card';
import { ScrollContext } from './_layout';

export default function TrackingScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const scrollContext = useContext(ScrollContext);
  const scrollY = scrollContext?.scrollY;

  return (
    <Animated.ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      scrollEventThrottle={16}
      onScroll={
        scrollY
          ? Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
              useNativeDriver: false,
            })
          : undefined
      }
    >
      {/* Title and separator removed, now handled in layout */}
      <Card
        title="Track Your Progress"
        content="Monitor your fitness journey with detailed tracking and analytics."
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
