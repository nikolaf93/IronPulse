import React from 'react';
import { Text, View, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';

interface ViewSectionProps {
  title: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export default function ViewSection({ title, style, textStyle }: ViewSectionProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4fc3f7',
    marginTop: 24,
    marginBottom: 8,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'sans-serif' }),
  },
}); 