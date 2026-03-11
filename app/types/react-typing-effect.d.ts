declare module 'react-typing-effect' {
  import { ComponentType } from 'react';

  interface ReactTypingEffectProps {
    text: string | string[];
    speed?: number;
    eraseSpeed?: number;
    typingDelay?: number;
    eraseDelay?: number;
    displayTextRenderer?: (text: string, i: number) => React.ReactNode;
    cursor?: string;
    staticText?: string;
    className?: string;
  }

  const ReactTypingEffect: ComponentType<ReactTypingEffectProps>;
  export default ReactTypingEffect;
}
