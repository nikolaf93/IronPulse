import React, { useRef, useState, createContext, useContext, useMemo } from 'react';
import { useFocusEffect } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs, usePathname } from 'expo-router';
import { Pressable, View, Text, Animated, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import AppBar from '@/components/AppBar';
import { useTheme } from '@/components/ThemeContext';

// Context to share scrollY between screen and AppBar
export const ScrollContext = createContext<null | { scrollY: Animated.Value }>(null);

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { isDark, toggleTheme, setTheme } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const pathname = usePathname();
  // Create a separate Animated.Value for each tab
  const scrollYMap = useRef<Record<string, Animated.Value>>({
    index: new Animated.Value(0),
    tracking: new Animated.Value(0),
    exercises: new Animated.Value(0),
  }).current;

  // Determine current tab key
  let tabKey = 'index';
  if (pathname.endsWith('/tracking')) tabKey = 'tracking';
  else if (pathname.endsWith('/exercises')) tabKey = 'exercises';

  // Use the correct scrollY for the current tab
  const scrollY = scrollYMap[tabKey];

  // If not on dashboard, always expand header (reset scrollY to 0)
  useFocusEffect(
    React.useCallback(() => {
      // For non-dashboard tabs, always expand header (reset scrollY to 0)
      if (tabKey !== 'index' && scrollY && typeof scrollY.setValue === 'function') {
        scrollY.setValue(0);
      }
    }, [tabKey, scrollY])
  );

  // Map pathnames to titles
  let viewTitle = '';
  if (pathname.endsWith('/tracking')) {
    viewTitle = 'Tracking';
  } else if (pathname.endsWith('/exercises')) {
    viewTitle = 'Exercises';
  } else {
    viewTitle = 'My Dashboard';
  }

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleResetSettings = () => {
    setTheme('system');
  };

  // Animation for large title
  const TITLE_FADE_SCROLL = 40;
  const TITLE_COLLAPSE_SCROLL = 60;
  const largeTitleOpacity = scrollY.interpolate({
    inputRange: [0, TITLE_FADE_SCROLL],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const largeTitleHeight = scrollY.interpolate({
    inputRange: [0, TITLE_COLLAPSE_SCROLL],
    outputRange: [64, 0],
    extrapolate: 'clamp',
  });
  // Animate background color for wrapper below AppBar
  const wrapperBgColor = '#202a44';

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      <View style={{ flex: 1, backgroundColor: colors.cardBackground }}>
        {/* AppBar always shows logo and animates small title */}
        <AppBar onThemeToggle={handleThemeToggle} onResetSettings={handleResetSettings} />
        {/* Dark blue background wrapper for large title and area below AppBar */}
        <Animated.View style={{ backgroundColor: wrapperBgColor }}>
          {/* Animated large title section */}
          <Animated.View
            style={{
              opacity: largeTitleOpacity,
              height: largeTitleHeight,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: colors.separator,
              overflow: 'hidden',
              backgroundColor: 'transparent'
            }}
          >
            <Text style={{ fontSize: 36, fontWeight: 'bold', textAlign: 'center', fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }), color: '#4fc3f7' }}>{viewTitle}</Text>
          </Animated.View>
        </Animated.View>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.tabIconDefault,
            tabBarStyle: {
              backgroundColor: colors.cardBackground,
              borderTopColor: colors.separator,
              borderTopWidth: 1,
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />, 
            }}
          />
          <Tabs.Screen
            name="tracking"
            options={{
              title: 'Tracking',
              tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />, 
            }}
          />
          <Tabs.Screen
            name="exercises"
            options={{
              title: 'Exercises',
              tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />, 
            }}
          />
        </Tabs>
      </View>
    </ScrollContext.Provider>
  );
}
