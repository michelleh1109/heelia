import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConnectionScreen } from './src/screens/ConnectionScreen';
import { CalibrationScreen } from './src/screens/CalibrationScreen';
import { ScanningScreen } from './src/screens/ScanningScreen';
import { ScanProcessingScreen } from './src/screens/ScanProcessingScreen';
import { ScanResultsScreen } from './src/screens/ScanResultsScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { OsteoporosisEducationScreen } from './src/screens/OsteoporosisEducationScreen';
import { palette } from './src/theme';

export type RootStackParamList = {
  Connection: undefined;
  Calibration: undefined;
  Scanning: undefined;
  ScanProcessing: undefined;
  ScanResults: undefined;
  Dashboard: undefined;
  OsteoporosisEducation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.coral,
    background: palette.pearl,
    card: palette.white,
    text: palette.graphite,
    border: 'rgba(255, 139, 124, 0.25)',
    notification: palette.softCoral
  }
};

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTintColor: palette.graphite,
          headerTitle: '',
          animation: 'fade'
        }}
      >
        <Stack.Screen name="Connection" options={{ headerShown: false }}>
          {({ navigation }) => <ConnectionScreen onContinue={() => navigation.replace('Calibration')} />}
        </Stack.Screen>
        <Stack.Screen name="Calibration" options={{ headerShown: false }}>
          {({ navigation }) => <CalibrationScreen onComplete={() => navigation.replace('Scanning')} />}
        </Stack.Screen>
        <Stack.Screen name="Scanning" options={{ headerShown: false }}>
          {({ navigation }) => <ScanningScreen onComplete={() => navigation.replace('ScanProcessing')} />}
        </Stack.Screen>
        <Stack.Screen name="ScanProcessing" options={{ headerShown: false }}>
          {({ navigation }) => <ScanProcessingScreen onComplete={() => navigation.replace('ScanResults')} />}
        </Stack.Screen>
        <Stack.Screen name="ScanResults" options={{ headerShown: false }}>
          {({ navigation }) => <ScanResultsScreen onNext={() => navigation.replace('Dashboard')} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
          {({ navigation }) => (
            <DashboardScreen
              onRestart={() => navigation.reset({ index: 0, routes: [{ name: 'Connection' }] })}
              onOpenEducation={() => navigation.navigate('OsteoporosisEducation')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="OsteoporosisEducation" options={{ headerShown: false }}>
          {({ navigation }) => (
            <OsteoporosisEducationScreen onClose={() => navigation.goBack()} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
