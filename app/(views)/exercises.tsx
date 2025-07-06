import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useTheme } from '@/components/ThemeContext';
import Card from '@/components/Card';

export default function ExercisesScreen() {
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: colors.primary }]}>Exercises</Text>
      <View style={[styles.separator, { backgroundColor: colors.separator }]} />
      
      <Card
        title="Exercise Library"
        content="Discover and track your favorite exercises with detailed instructions and progress tracking."
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'SpaceMono',
  },
  separator: {
    marginVertical: 24,
    height: 1,
    width: '100%',
    marginHorizontal: 10,
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