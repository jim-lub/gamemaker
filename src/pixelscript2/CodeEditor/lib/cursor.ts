import { useState } from 'react';

const useCursor = () => {
  const [pos, setPos] = useState(0);
  const [line, setLine] = useState(0);

  const moveLeft = (doc: any) => {
    if (pos > 0) {
      setPos(pos - 1);
    }

    if (pos === 0 && line !== 0) {
      setPos( doc[line - 1].join('').length - 1 );
      setLine(line - 1);
    }
  }

  const moveRight = (doc: any) => {
    const lineStr = doc[line].join('');
    const lineLength = lineStr.length - 1;

    if (pos < lineLength) {
      setPos(pos + 1);
    }

    if (pos === lineLength && line !== doc.length - 1) {
      setPos( 0 );
      setLine(line + 1);
    }
  }

  return {
    pos,
    line,

    moveLeft,
    moveRight
  }
}

/**
* isAtDocStart
* isAtDocEnd
* isAtLineStart
* isAtLineEnd
* isAtNodeStart
* isAtNodeEnd
*
* moveToDocStart
* moveToDocEnd
* moveToLineStart
* moveToLineEnd
* moveToNodeStart
* moveToNodeEnd
*
* moveLeft
* moveRight
* moveUp
* moveDown
*
*
*
*
*/

const cursorOnCurrentLine = (doc: any, pos: number, line: number) => {
  const lineLength = doc[line].join('').length;

  return (pos > 0 && pos < lineLength);
};

export default useCursor;
