import React from 'react';
import styled from 'styled-components/native';
import StarAnimated from '../components/StarAnimated';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../components/Wrapper';
import Markdown from 'react-native-markdown-display';
import {Button, ScrollView} from 'react-native';
import MoonAnimated from '../components/MoonAnimated';
import {useOpenai} from '../utils/hooks/useOpenai';
import NextButton from '../components/Button';

const HomeScreen = () => {
  const {isLoading, askForStory, story} = useOpenai();
  const [fontSize, setFontSize] = React.useState(20);

  const increaseFontSize = () => {
    setFontSize(fontSize + 5);
  };
  const decreaseFontSize = () => {
    setFontSize(fontSize - 5);
  };

  return (
    <Wrapper>
      <Night colors={['#1D375C', '#4A5372']}>
        {Array(170)
          .fill(0)
          .map((_, index) => (
            <StarAnimated key={index} />
          ))}
        <MoonAnimated />
      </Night>
      <Story colors={['#A5A9EE', '#3F3278']}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            height: '100%',
            width: '100%',
            opacity: 0.7,
            padding: 20,
            margin: 20,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}>
          <ControlCoitainer>
            <Button title="A-" onPress={() => decreaseFontSize()} />
            <Button title="A+" onPress={() => increaseFontSize()} />
            <NextButton
              onPress={() => askForStory()}
              label="Pedir otro cuento"
              isLoading={isLoading}
            />
          </ControlCoitainer>
          <Markdown
            style={{
              heading1: {
                fontSize: fontSize + 10,
                fontWeight: 'bold',
              },
              heading2: {
                fontSize: fontSize + 8,
                fontWeight: 'bold',
              },
              heading3: {
                fontSize: fontSize + 6,
                fontWeight: 'bold',
              },
              heading4: {
                fontSize: fontSize + 4,
                fontWeight: 'bold',
              },
              paragraph: {
                fontSize,
              },
            }}>
            {story}
          </Markdown>
        </ScrollView>
      </Story>
    </Wrapper>
  );
};

export default HomeScreen;

const Night = styled(LinearGradient)`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;
const ControlCoitainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #fafafa;
`;

const Story = styled(LinearGradient).attrs(({colors}) => ({
  colors,
  start: {x: 1, y: 0.2},
  end: {x: 0, y: 1},
}))`
  flex: 2;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
`;
