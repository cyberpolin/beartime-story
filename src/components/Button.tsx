import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

// Styled components for the button
const Button = styled(TouchableOpacity)`
  background-color: #ffd700; /* Warm Yellow */
  padding: 15px 30px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
`;

const ButtonText = styled(Text)`
  font-size: 18px;
  flex-direction: row;
  color: #2d334a; /* Dark Blue for text */
  font-family: 'Arial'; /* Use a suitable font */
`;

type ButtonProps = {
  onPress: () => void;
  label: string;
  isLoading?: boolean;
};

const NextButton = ({onPress, label, isLoading}: ButtonProps) => {
  return (
    <Button disabled={isLoading} onPress={onPress}>
      <ButtonText>{label}</ButtonText>
      {isLoading && <ActivityIndicator />}
    </Button>
  );
};

export default NextButton;
