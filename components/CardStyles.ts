import { StyleSheet } from 'react-native';

const CardStyles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 16,
    elevation: 2,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default CardStyles;
