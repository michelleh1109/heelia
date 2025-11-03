declare module 'expo-blur' {
  import * as React from 'react';
  import { ViewProps, StyleProp, ViewStyle } from 'react-native';

  export type BlurTint = 'default' | 'light' | 'dark' | 'extraLight';

  export interface BlurViewProps extends ViewProps {
    tint?: BlurTint;
    intensity?: number;
    experimentalBlurMethod?: 'none' | 'dimezisBlurView';
    style?: StyleProp<ViewStyle>;
  }

  export class BlurView extends React.Component<BlurViewProps> {}
}
