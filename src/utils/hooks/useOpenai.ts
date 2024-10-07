// using open ai api create a hook that will have the ability to generate short random kids beadtime stories

import React, {useEffect} from 'react';
import openai from '../openaiFetch';
import {useMMKVString} from 'react-native-mmkv';

export const useOpenai = () => {
  const [assistantId, setAssistantId] = useMMKVString('openai.assistantId');
  const [threadId, setThreadId] = useMMKVString('openai.threadId');
  const [runId, setRunId] = useMMKVString('openai.runId');
  const [story, setStory] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (!assistantId) {
      createAssistant();
    }
    if (!threadId) {
      createThread();
    }
    if (!runId) {
      createRun();
    }
    if (assistantId && threadId && runId && !story) {
      askForStory();
    }
  }, []);

  const createMessage = async () => {
    return await openai.post(`/threads/${threadId}/messages`, {
      role: 'user',
      content: 'Por favor cuéntame un cuento para dormir.',
    });
  };

  const getMessages = async () => {
    try {
      const {data} = await openai.get(`/threads/${threadId}/messages`);
      setStory(data.data[0].content[0].text.value);
      return Promise.resolve(data);
    } catch (error) {
      console.log('error', error);
      return Promise.reject(error);
    }
  };

  const killRun = async () => {
    return await openai.post(`/threads/${threadId}/runs/${runId}/cancel`);
  };

  const askForStory = async () => {
    setIsLoading(true);
    let count = 0;

    try {
      await createMessage();
      const createdRunId = await createRun();
      const interval = setInterval(async () => {
        count++;
        if (count > 10) {
          killRun();
          clearInterval(interval);
          setIsLoading(false);
          return Promise.reject('timeout');
        }

        const {data} = await openai.get(
          `threads/${threadId}/runs/${createdRunId}`
        );

        if (data.status === 'completed') {
          clearInterval(interval);
          await getMessages();
          setIsLoading(false);
          return Promise.resolve(data);
        }
      }, 1000);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      return Promise.reject(error);
    }
  };

  const createRun = async () => {
    try {
      const {data} = await openai.post(`/threads/${threadId}/runs`, {
        model: 'gpt-4o',
        assistant_id: assistantId,
      });
      setRunId(data.id);
      return Promise.resolve(data.id);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createAssistant = async () => {
    try {
      const {data} = await openai.post('/assistants', {
        model: 'gpt-4o',
        name: 'Kids Bedtime Stories',
        instructions:
          'Generate short random kids bedtime stories, with a happy ending, and return the result in markdown format, please do not add images or links.',
      });
      setAssistantId(data.id);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createThread = async () => {
    try {
      const {data} = await openai.post(`/threads`, {
        messages: [
          {
            role: 'user',
            content: 'Por favor cuéntame un cuento para dormir.',
          },
        ],
      });
      setThreadId(data.id);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  console.log('>> ', {
    assistantId,
    threadId,
    runId,
    story,
    isLoading,
  });
  return {askForStory, isLoading, story};
};
