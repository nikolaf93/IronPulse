import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Switch,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useTheme } from '@/components/ThemeContext';
import IronPulseLogo from './IronPulseLogo';
import { ScrollContext } from '@/app/(views)/_layout';

interface AppBarProps {
  onThemeToggle?: () => void;
  onResetSettings?: () => void;
}

export default function AppBar({ onThemeToggle, onResetSettings }: AppBarProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const { isDark } = useTheme();
  const colors = Colors[isDark ? 'dark' : 'light'];
  const scrollContext = useContext(ScrollContext);
  const scrollY = scrollContext?.scrollY;

  // Animation values
  const TITLE_FADE_SCROLL = 40;
  const APPBAR_EXPANDED_HEIGHT = 56;
  const APPBAR_COLLAPSED_HEIGHT = 48;
  const appBarHeight = scrollY
    ? scrollY.interpolate({
        inputRange: [0, TITLE_FADE_SCROLL],
        outputRange: [APPBAR_EXPANDED_HEIGHT, APPBAR_COLLAPSED_HEIGHT],
        extrapolate: 'clamp',
      })
    : APPBAR_EXPANDED_HEIGHT;

  const titleOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [0, TITLE_FADE_SCROLL],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      })
    : 0;

  // No bottom border for AppBar
  const borderBottomWidth = 0;

  // Get the current title from the layout context (fallback to Dashboard)
  let viewTitle = 'My Dashboard';
  if (typeof window !== 'undefined') {
    // fallback for SSR
    viewTitle = document?.title || 'My Dashboard';
  }

  const handleSettingsClick = () => {
    setMenuVisible(false);
    setSettingsVisible(true);
  };

  const handleResetSettings = () => {
    onResetSettings?.();
    setSettingsVisible(false);
    Alert.alert('Settings Reset', 'Settings have been reset to default values.');
  };

  const menuItems = [
    { label: 'Profile', icon: 'user-circle' },
    { label: 'Account', icon: 'cog' },
    { label: 'Dashboard', icon: 'bar-chart' },
    { label: 'Settings', icon: 'cog', onPress: handleSettingsClick },
    { label: 'Logout', icon: 'sign-out' },
  ];

  return (
    <>
      <Animated.View
        style={[
          styles.appBar,
          {
            backgroundColor: '#202a44',
            height: appBarHeight,
            borderBottomColor: colors.separator,
            borderBottomWidth,
          },
        ]}
      >
        <View style={styles.flexRow}>
          {/* Logo area: only show one at a time */}
          <View style={styles.logoFixedWidth}>
            <Animated.View
              style={{
                opacity: scrollY
                  ? scrollY.interpolate({
                      inputRange: [0, 40],
                      outputRange: [1, 0],
                      extrapolate: 'clamp',
                    })
                  : 1,
              }}
            >
              <IronPulseLogo size={32} color={'#4fc3f7'} iconOnly={false} />
            </Animated.View>
            <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                opacity: scrollY
                  ? scrollY.interpolate({
                      inputRange: [0, 40],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                    })
                  : 0,
              }}
            >
              <IronPulseLogo size={32} color={'#4fc3f7'} iconOnly={true} />
            </Animated.View>
          </View>
          {/* Centered title */}
          <Animated.Text
            style={[
              styles.animatedTitle,
              {
                opacity: titleOpacity,
                color: '#4fc3f7',
                fontFamily: Platform.select({
                  ios: 'System',
                  android: 'Roboto',
                  default: 'sans-serif',
                }),
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
            pointerEvents="none"
          >
            {viewTitle}
          </Animated.Text>
          {/* Avatar area */}
          <View style={styles.avatarFixedWidth}>
            <TouchableOpacity style={styles.avatarButton} onPress={() => setMenuVisible(true)}>
              <FontAwesome name="user-circle" size={32} color={'#4fc3f7'} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>

      {/* User Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={[styles.menuContainer, { backgroundColor: colors.cardBackground }]}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.menuItem, index === menuItems.length - 1 && styles.lastMenuItem]}
                onPress={item.onPress || (() => setMenuVisible(false))}
              >
                <FontAwesome
                  name={item.icon as keyof typeof FontAwesome.glyphMap}
                  size={16}
                  color={colors.primary}
                />
                <Text style={[styles.menuText, { color: colors.primary }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={settingsVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSettingsVisible(false)}
      >
        <Pressable style={styles.settingsModalOverlay} onPress={() => setSettingsVisible(false)}>
          <Pressable style={styles.settingsModalContent}>
            <View style={[styles.settingsContainer, { backgroundColor: colors.cardBackground }]}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSettingsVisible(false)}
                accessibilityLabel="Close settings dialog"
              >
                <Text style={[styles.closeButtonText, { color: colors.text }]}>×</Text>
              </TouchableOpacity>
              <Text style={[styles.settingsTitle, { color: colors.text }]}>Settings</Text>

              <View style={styles.settingItem}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {isDark ? 'Dark Theme' : 'Light Theme'}
                </Text>
                <Switch
                  value={isDark}
                  onValueChange={onThemeToggle}
                  trackColor={{ false: '#767577', true: colors.primary }}
                  thumbColor={isDark ? colors.accent : '#f4f3f4'}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.resetButton, { backgroundColor: colors.primary }]}
                  onPress={handleResetSettings}
                >
                  <Text style={styles.resetButtonText}>Reset Settings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  animatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    left: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  appBar: {
    borderBottomWidth: 1,
    elevation: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // borderBottomColor is set dynamically from theme
  },
  avatarButton: {
    flexShrink: 0,
    padding: 4,
  },
  avatarFixedWidth: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 48,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  closeButton: {
    padding: 8,
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 28,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 0,
    position: 'relative',
  },
  lastMenuItem: {
    borderTopColor: '#eee',
    borderTopWidth: 1,
    marginTop: 4,
  },
  logoFixedWidth: {
    width: 160, // enough for full logo
    minWidth: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
  },
  menuContainer: {
    borderRadius: 8,
    elevation: 4,
    minWidth: 150,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  menuItem: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  modalOverlay: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-start',
    paddingRight: 16,
    paddingTop: 80,
  },
  resetButton: {
    borderRadius: 8,
    minWidth: 120,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  settingItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 16,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
  settingsContainer: {
    borderRadius: 16,
    elevation: 8,
    padding: 32,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  settingsModalContent: {
    maxWidth: 400,
    width: '100%',
  },
  settingsModalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  settingsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
});
