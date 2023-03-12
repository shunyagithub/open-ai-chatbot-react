import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import cn from '../lib/utils';

function CodeBlock({ inline, className, children }: CodeProps) {
  const match = /language-(\w+)(:.+)?/.exec(className || '');
  const lang = match && match[1] ? match[1] : '';

  return !inline ? (
    <SyntaxHighlighter language={lang} style={a11yDark} wrapLines useInlineStyles>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={cn(className)}>{children}</code>
  );
}

export default CodeBlock;
