import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import { palette, spacing } from '../theme';

export interface BottomSheetHandle {
  close: () => void;
}

interface BottomSheetProps {
  children: React.ReactNode;
  /**
   * Called after the sheet finishes its closing animation.
   */
  onClosed: () => void;
  sheetStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  handleStyle?: StyleProp<ViewStyle>;
}

export const BottomSheet = forwardRef<BottomSheetHandle, BottomSheetProps>(
  ({ children, onClosed, sheetStyle, contentStyle, handleStyle }, ref) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const sheetHeight = useRef(0);
    const startOffset = useRef(0);
    const hasPresented = useRef(false);
    const isClosing = useRef(false);

    const runCloseAnimation = useCallback(() => {
      const distance = sheetHeight.current || 480;
      isClosing.current = true;
      Animated.timing(translateY, {
        toValue: distance,
        duration: 240,
        useNativeDriver: true
      }).start(() => {
        isClosing.current = false;
        onClosed();
      });
    }, [onClosed, translateY]);

    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          if (isClosing.current) {
            return;
          }
          runCloseAnimation();
        }
      }),
      [runCloseAnimation]
    );

    const onLayout = useCallback(
      (event: any) => {
        const { height } = event.nativeEvent.layout;
        if (!height) {
          return;
        }
        sheetHeight.current = height;
        if (!hasPresented.current) {
          hasPresented.current = true;
          translateY.setValue(height);
          requestAnimationFrame(() => {
            Animated.spring(translateY, {
              toValue: 0,
              damping: 18,
              stiffness: 140,
              useNativeDriver: true
            }).start();
          });
        }
      },
      [translateY]
    );

    const handleMove = useCallback(
      (_: any, gesture: PanResponderGestureState) => {
        const nextOffset = startOffset.current + gesture.dy;
        const distance = sheetHeight.current || 480;
        const clamped = Math.max(-64, Math.min(nextOffset, distance + 64));
        translateY.setValue(clamped < 0 ? clamped * 0.35 : clamped);
      },
      [translateY]
    );

    const handleRelease = useCallback(
      (_: any, gesture: PanResponderGestureState) => {
        const distance = sheetHeight.current || 480;
        const projected = startOffset.current + gesture.dy + gesture.vy * 42;
        const shouldClose = projected > distance * 0.45 || gesture.vy > 1.05;
        if (shouldClose) {
          runCloseAnimation();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            bounciness: 7,
            useNativeDriver: true
          }).start();
        }
      },
      [runCloseAnimation, translateY]
    );

    const panResponder: PanResponderInstance = useMemo(
      () =>
        PanResponder.create({
          onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > Math.abs(gesture.dx) && Math.abs(gesture.dy) > 6,
          onPanResponderGrant: () => {
            translateY.stopAnimation((value: number) => {
              startOffset.current = value;
            });
          },
          onPanResponderMove: handleMove,
          onPanResponderRelease: handleRelease,
          onPanResponderTerminate: () => {
            Animated.spring(translateY, {
              toValue: 0,
              bounciness: 7,
              useNativeDriver: true
            }).start();
          }
        }),
      [handleMove, handleRelease, translateY]
    );

    const scrimOpacity = translateY.interpolate({
      inputRange: [0, 320],
      outputRange: [0.38, 0],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.root} pointerEvents="box-none">
        <Animated.View pointerEvents="none" style={[styles.scrim, { opacity: scrimOpacity }]} />
        <Animated.View
          {...panResponder.panHandlers}
          onLayout={onLayout}
          style={[styles.sheet, sheetStyle, { transform: [{ translateY }] }]}
        >
          <View style={[styles.handle, handleStyle]} />
          <View style={[styles.content, contentStyle]}>{children}</View>
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end'
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.graphite
  },
  sheet: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 560,
    maxHeight: '86%',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: 'rgba(255,255,255,0.95)',
    shadowColor: palette.graphite,
    shadowOpacity: 0.18,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: -18 },
    elevation: 24
  },
  handle: {
    alignSelf: 'center',
    width: 60,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(46, 42, 58, 0.18)',
    marginBottom: spacing.md
  },
  content: {
    flexGrow: 1,
    gap: spacing.lg
  }
});

BottomSheet.displayName = 'BottomSheet';

