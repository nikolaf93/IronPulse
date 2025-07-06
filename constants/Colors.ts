const tintColorLight = '#1976d2'; // Primary blue from totalFitness
const tintColorDark = '#4fc3f7'; // Light blue from totalFitness
const accentBlue = '#4fc3f7'; // Accent blue for highlights

export default {
  light: {
    text: '#000',
    background: '#f7f7f7',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary: '#1976d2',
    accent: accentBlue,
    cardBackground: '#fff',
    separator: '#eee',
  },
  dark: {
    text: '#fff',
    background: '#23272e',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    primary: '#4fc3f7',
    accent: '#81d4fa',
    cardBackground: '#1e1e1e',
    separator: 'rgba(255,255,255,0.1)',
  },
};
