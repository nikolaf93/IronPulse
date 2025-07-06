import * as React from 'react';
import Svg, { Circle, Polyline, Text as SvgText } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

export default function IronPulseLogo({ size = 40, color = '#1976d2', iconOnly = false }: { size?: number; color?: string; iconOnly?: boolean }) {
  return (
    <View style={styles.logoRow}>
      <Svg width={size} height={size} viewBox="0 0 40 40">
        <Circle cx="20" cy="20" r="18" stroke={color} strokeWidth="2" fill="none" />
        <Polyline
          points="8,22 14,18 18,26 22,14 26,22 32,18"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </Svg>
      {!iconOnly && (
        <Svg width={120} height={size} style={{ marginLeft: 8 }}>
          <SvgText
            x={0}
            y={size / 2 + 8}
            fontSize="20"
            fontWeight="bold"
            fontFamily="SpaceMono"
            fill={color}
          >
            IronPulse
          </SvgText>
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 