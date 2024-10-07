import React from 'react';
import {Dimensions, Image} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import {getRandomNumber} from '../utils/random';

const MoonAnimated = () => {
  const windowWidth = Dimensions.get('window').width;
  const moonOffset = useSharedValue(windowWidth / 2);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: moonOffset.value}],
  }));

  React.useEffect(() => {
    moonOffset.value = withRepeat(
      withTiming(-moonOffset.value, {duration: 100000}),
      -1,
      true
    );
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: 80,
          height: 80,
          position: 'absolute',
          top: `${getRandomNumber()}%`,
          left: '50%',
        },
        animatedStyles,
      ]}>
      <Moon />
    </Animated.View>
  );
};

export default MoonAnimated;

const Moon = styled(Image).attrs({
  source: require('../assets/moon.png'),
})`
  width: 80px;
  height: 80px;
  position: absolute;
  top: 20%;
  left: 10%;
`;
