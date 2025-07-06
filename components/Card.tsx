import React from 'react';
import { View, StyleSheet } from 'react-native';
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
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}> 
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
  card: {
    width: '100%',
    marginHorizontal: 10,
    marginVertical: 10,
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

export default Card; 