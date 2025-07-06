import React, { useContext } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { View } from '@/components/Themed';
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
      onScroll={scrollY ? Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      ) : undefined}
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
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    marginHorizontal: 10,
    padding: 32,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 20,
    lineHeight: 30,
  },
}); 