import type { Preview } from '@storybook/react-vite';
import { useEffect } from 'react';
import '../src/styles/base.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#ffffff' },
        dark: { name: 'Dark', value: '#0a0a0a' },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Styleguide', 'Theme', '*'],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
  decorators: [
    (Story, context) => {
      const value = context.globals?.backgrounds?.value ?? 'light';
      const isDark = value === 'dark';
      useEffect(() => {
        document.querySelectorAll('.ord-ui').forEach((el) => {
          el.classList.toggle('dark', isDark);
        });
      }, [isDark]);
      return (
        <div className={`ord-ui text-foreground${isDark ? ' dark' : ''}`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
