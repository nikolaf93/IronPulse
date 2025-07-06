# IronPulse

A modern fitness tracking mobile application built with React Native and Expo, designed to help users monitor their workout progress and achieve their fitness goals.

## 🏋️ Features

- **Dashboard**: Overview of your fitness progress with visual charts
- **Progress Tracking**: Monitor completed, missed, and upcoming workouts
- **Exercise Management**: Track and manage your exercise routines
- **Dark/Light Theme**: Customizable theme with system preference support
- **Cross-Platform**: Works on iOS, Android, and Web
- **Modern UI**: Clean, intuitive interface with smooth animations

## 📱 Screenshots

- Dashboard with progress charts
- Exercise tracking interface
- Settings with theme customization
- Responsive design for all platforms

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd IronPulse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Running the App

- **iOS Simulator**: `npm run ios`
- **Android Emulator**: `npm run android`
- **Web Browser**: `npm run web`
- **Development Server**: `npm start` (opens Expo DevTools)

## 🛠️ Tech Stack

- **Framework**: React Native 0.79.5
- **Navigation**: Expo Router 5.1.3
- **UI Components**: React Native + Styled Components
- **Icons**: Expo Vector Icons (FontAwesome)
- **Charts**: React Native SVG
- **Storage**: AsyncStorage
- **Platform**: Expo SDK 53

## 📁 Project Structure

```
IronPulse/
├── app/                    # Expo Router app directory
│   ├── (views)/           # Main app screens
│   │   ├── index.tsx      # Dashboard screen
│   │   ├── exercises.tsx  # Exercises screen
│   │   ├── tracking.tsx   # Tracking screen
│   │   └── _layout.tsx    # Tab navigation layout
│   ├── _layout.tsx        # Root layout
│   └── +html.tsx          # Web HTML configuration
├── components/            # Reusable components
│   ├── AppBar.tsx         # Top navigation bar
│   ├── Card.tsx           # Card component
│   ├── ProgressChartCard.tsx # Progress visualization
│   ├── IronPulseLogo.tsx  # App logo component
│   └── ThemeContext.tsx   # Theme management
├── constants/             # App constants
│   └── Colors.ts          # Color definitions
└── assets/               # Static assets
    ├── fonts/            # Custom fonts
    └── images/           # App icons and images
```

## 🎨 Theming

The app supports both light and dark themes with automatic system preference detection. Users can manually toggle between themes or reset to system default.

### Theme Features:
- Automatic system preference detection
- Manual theme toggle
- Persistent theme storage
- Smooth theme transitions

## 📊 Progress Tracking

The app includes a sophisticated progress tracking system with:
- Visual circular progress charts
- Weekly progress overview
- Completed, missed, and upcoming workout tracking
- Color-coded progress indicators

## 🔧 Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm test` - Run tests

### Code Style

The project uses TypeScript for type safety and follows React Native best practices. Components are organized in a modular structure with clear separation of concerns.

## 📦 Dependencies

### Core Dependencies
- `expo`: ~53.0.17
- `react`: 19.0.0
- `react-native`: 0.79.5
- `expo-router`: ~5.1.3
- `react-native-svg`: ^15.12.0
- `styled-components`: ^6.1.19

### Development Dependencies
- `typescript`: ~5.8.3
- `@types/react`: ~19.0.10
- `jest`: ^29.2.1

## 🚀 Deployment

### Building for Production

1. **Web**: The app is configured for static web output
2. **Mobile**: Use Expo EAS Build for iOS and Android builds

### Configuration

The app is configured in `app.json` with:
- App name: IronPulse
- Version: 1.0.0
- Platform-specific settings for iOS, Android, and Web
- Expo Router plugin enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on multiple platforms
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Web DOM errors**: Ensure all SVG properties are web-compatible
3. **Font loading**: Verify font files are in the correct assets directory

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Review React Native troubleshooting guides
- Open an issue for specific problems

---

Built with ❤️ using React Native and Expo