import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Switch,
  Alert,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useTheme } from "@/components/ThemeContext";
import IronPulseLogo from "./IronPulseLogo";

interface AppBarProps {
  onThemeToggle?: () => void;
  onResetSettings?: () => void;
}

export default function AppBar({
  onThemeToggle,
  onResetSettings,
}: AppBarProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const { isDark } = useTheme();
  const colors = Colors[isDark ? "dark" : "light"];

  const handleSettingsClick = () => {
    setMenuVisible(false);
    setSettingsVisible(true);
  };

  const handleResetSettings = () => {
    onResetSettings?.();
    setSettingsVisible(false);
    Alert.alert(
      "Settings Reset",
      "Settings have been reset to default values."
    );
  };

  const menuItems = [
    { label: "Profile", icon: "user-circle" },
    { label: "Account", icon: "cog" },
    { label: "Dashboard", icon: "bar-chart" },
    { label: "Settings", icon: "cog", onPress: handleSettingsClick },
    { label: "Logout", icon: "sign-out" },
  ];

  return (
    <>
      <View style={[styles.appBar, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <IronPulseLogo size={32} color={colors.primary} />
          </View>

          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => setMenuVisible(true)}
          >
            <FontAwesome name="user-circle" size={32} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* User Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View
            style={[
              styles.menuContainer,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.lastMenuItem,
                ]}
                onPress={item.onPress || (() => setMenuVisible(false))}
              >
                <FontAwesome
                  name={item.icon as any}
                  size={16}
                  color={colors.primary}
                />
                <Text style={[styles.menuText, { color: colors.primary }]}>
                  {item.label}
                </Text>
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
        <Pressable
          style={styles.settingsModalOverlay}
          onPress={() => setSettingsVisible(false)}
        >
          <Pressable style={styles.settingsModalContent}>
            <View
              style={[
                styles.settingsContainer,
                { backgroundColor: colors.cardBackground },
              ]}
            >
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSettingsVisible(false)}
                accessibilityLabel="Close settings dialog"
              >
                <Text style={[styles.closeButtonText, { color: colors.text }]}>
                  ×
                </Text>
              </TouchableOpacity>
              <Text style={[styles.settingsTitle, { color: colors.text }]}>
                Settings
              </Text>

              <View style={styles.settingItem}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {isDark ? "Dark Theme" : "Light Theme"}
                </Text>
                <Switch
                  value={isDark}
                  onValueChange={onThemeToggle}
                  trackColor={{ false: "#767577", true: colors.primary }}
                  thumbColor={isDark ? colors.accent : "#f4f3f4"}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.resetButton,
                    { backgroundColor: colors.primary },
                  ]}
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
  appBar: {
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "SpaceMono",
    letterSpacing: 0.3,
  },
  avatarButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 80,
    paddingRight: 16,
  },
  menuContainer: {
    borderRadius: 8,
    padding: 8,
    minWidth: 150,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  lastMenuItem: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 4,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
  },
  settingsModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  settingsModalContent: {
    width: "100%",
    maxWidth: 400,
  },
  settingsContainer: {
    borderRadius: 16,
    padding: 32,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 28,
  },
  settingsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
