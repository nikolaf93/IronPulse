import { StyleSheet } from 'react-native';

const CardStyles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 32,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CardStyles; 