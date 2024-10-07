import axios from 'axios';
import Config from 'react-native-config';

export default axios.create({
  baseURL: 'https://api.openai.com/v1',

  headers: {
    'OpenAI-Beta': 'assistants=v2',
    Authorization: `Bearer ${Config.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
