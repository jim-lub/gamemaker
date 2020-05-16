import React, { useState, useEffect } from 'react';

interface Token {
  value: string
}

interface Line {
  tokens: Token[]
}

const useDoc = (): [ Line[], (value: string) => void, (value: string) => void ] => {
  const [line, setLine] = useState<Token[]>([]);
  const [doc, setDoc] = useState<Line[]>([]);

  const getDoc = () => doc;

  const resolveToken = (value: string) => {
    setLine([
      ...line,
      {
        value
      }
    ]);
  }

  const resolveLine = (value: string) => {
    setDoc([
      ...doc,
      {
        tokens: [...line, {
          value
        }]
      }
    ]);

    setLine([]);
  }

  useEffect(() => {
    console.log('doc', doc);
  }, [doc])

  useEffect(() => {
    console.log('line', line);
  }, [line])

  return [doc, resolveToken, resolveLine];
}

export {
  useDoc
};
