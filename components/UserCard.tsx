import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import CardStyles from './CardStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useTheme } from '@/components/ThemeContext';

interface UserCardProps {
  name: string;
  onMessagePress?: () => void;
}

export default function UserCard({ name, onMessagePress }: UserCardProps) {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <View style={[CardStyles.card, { backgroundColor: colors.cardBackground }]}>
      <FontAwesome name="user-circle" size={40} color="#4fc3f7" style={styles.icon} />
      <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
      <TouchableOpacity onPress={onMessagePress} style={styles.messageButton}>
        <FontAwesome name="envelope" size={28} color="#4fc3f7" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 16,
  },
  messageButton: {
    marginLeft: 16,
    padding: 4,
  },
  name: {
    flex: 1,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
    fontSize: 20,
    fontWeight: 'bold',
  },
});
