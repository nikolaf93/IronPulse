import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import AppBar from '@/components/AppBar';
import { useTheme } from '@/components/ThemeContext';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { isDark, toggleTheme, setTheme } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleResetSettings = () => {
    setTheme('system');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cardBackground }}>
      <AppBar onThemeToggle={handleThemeToggle} onResetSettings={handleResetSettings} />
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
        }}>
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
  );
}
