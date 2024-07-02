import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';

const Start = () => {
  const navigation = useNavigation();
  const rotation = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  useEffect(() => {
    try {
      SoundPlayer.playSoundFile('voice', 'mp3');
      setTimeout(() => {
        SoundPlayer.stop();
        navigation.navigate('sigin');
      }, 4000);
    } catch (error) {
      console.log('Failed to play the sound', error);
    }

    return () => {
      SoundPlayer.stop();
    };
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, { width }]}>
      <Animated.Image
        source={require('./piks/logo.jpg')}
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
});

export default Start;
