import {useEffect, useState} from 'react';
import {Image} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import {getRandomNumber} from '../utils/random';

const StarAnimated = () => {
  const [isShow, setIsShow] = useState(false);
  const [size, setSize] = useState(getRandomNumber(2, 10));
  const [position, setPosition] = useState([
    getRandomNumber(0, 100),
    getRandomNumber(0, 100),
  ]);
  const resetPosition = () => {
    setPosition([getRandomNumber(0, 100), getRandomNumber(0, 100)]);
    setSize(getRandomNumber(2, 10));
  };
  //get random number between 0 and 100
  const startOpacity = useSharedValue(0);
  const startAnimatedStyles = useAnimatedStyle(() => ({
    opacity: startOpacity.value,
  }));

  useEffect(() => {
    if (isShow) {
      startOpacity.value = withDelay(
        getRandomNumber(5000, 50000),
        withTiming(0, {duration: 1000}, () => {
          runOnJS(setIsShow)(false);
          runOnJS(resetPosition)();
        })
      );
    } else {
      startOpacity.value = withDelay(
        getRandomNumber(0, 5000),
        withTiming(getRandomNumber(5, 10) / 10, {duration: 1000}, () => {
          runOnJS(setIsShow)(true);
        })
      );
    }
  }, [isShow]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: `${position[0]}%`,
          right: `${position[1]}%`,
        },
        startAnimatedStyles,
      ]}>
      <Star size={size} />
    </Animated.View>
  );
};

export default StarAnimated;

const Star = styled((props: {size: number}) => (
  <Image
    source={require('../assets/star.png')}
    style={{width: props.size, height: props.size}}
  />
))`
  position: absolute;
  top: ${getRandomNumber()}%;
  right: ${getRandomNumber()}%;
`;
