import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardStyles from './CardStyles';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useTheme } from '@/components/ThemeContext';

interface CardProps {
  title: string;
  content: string | React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <View style={[CardStyles.card, { backgroundColor: colors.cardBackground }]}> 
      <Text style={[styles.cardTitle, { color: colors.accent }]}>{title}</Text>
      {typeof content === 'string' ? (
        <Text style={[styles.cardText, { color: colors.text }]}>{content}</Text>
      ) : (
        content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // card style is now shared via CardStyles
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingRight: 20
  },
  cardText: {
    fontSize: 20,
    lineHeight: 30,
  },
});

export default Card; 