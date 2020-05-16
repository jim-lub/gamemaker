import React, { useState } from 'react';

import * as types from 'pixelscript2/types';

import { NodeLayer } from './components';

import useCursor from './lib/cursor';

import styles from './code-editor.module.css';

const doc = [
  ['stuff', ' ', '123', ' '],
  ['stuff', ' ', '321', ' '],
  ['987', ' ', 'something', ' '],
  ['789', ' ', 'banana', ' ']
]

let EditorState = {
  cursor: {
    pos: 0,
    line: 0
  },

  doc: {
    meta: {

    },
    content: [
      // each object in the array represents a line
      {
        key: 'random#',
        meta: {
          lastScan: 0,
          lastModified: 0,
        },
        nodes: [
          // each node is a string of characters without whitespace
          // whitespace (tab, space, newline) are represented by their own node
          {
            type: '__CONTENT__',
            value: 'daw90d8i90aw2',
            meta: {
              startIndex: 0,
              length: 5,
              width: 500 //px
            }
          },

          {
            type: '__SPACE__',
            value: null
          }
        ]
      }
    ]
  }
}

const dispatch = (fn: any) => {
  EditorState = fn();
}

const helpers = {
  isAtLineEnd: () => null,
  isAtDocEnd: () => null,
  peek: (n: number | undefined = 1) => ({
    isAtLineEnd: () => null,
    isAtDocEnd: () => null,
  })
}

const moveRight = (state: any, props: any) => {
  if ( helpers.isAtDocEnd() ) {
    return state;
  }

  return {
    ...state,
    cursor: {
      pos: helpers.isAtLineEnd()
        ? 0
        : state.cursor.pos + 1,
      line: helpers.isAtLineEnd() && !helpers.peek(1).isAtDocEnd()
        ? state.cursor.line + 1
        : state.cursor.line
    }
  }
}

const CodeEditor = () => {
  const [value, setValue] = useState("");
  const cursor = useCursor();

  /**
  * The `keyDown` event will fire before the `keyPress` consistently in all
  * browsers. We want to separate our control keys from our actual input keys.
  * So we check if the `keyDown` event keycode matches any of our controls.
  * If true: we prevent the browser from triggering the `keyPress` event and
  * dispatch appropriate actions.
  * If false: the `keyPress` event will trigger and we'll process it as input.
  */
  const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case types.KeyCodes.Backspace:
      case types.KeyCodes.Enter:
      case types.KeyCodes.Space:
      case types.KeyCodes.Tab:
      case types.KeyCodes.ArrowDown:
      case types.KeyCodes.ArrowUp:
        e.preventDefault();
        e.stopPropagation();

        console.log('KeyDown: ', types.KeyCodes[e.keyCode], e.altKey, e.ctrlKey, e.shiftKey);
        break;

      case types.KeyCodes.ArrowLeft:
        e.preventDefault();
        e.stopPropagation();

        cursor.moveLeft(doc);

        break;

      case types.KeyCodes.ArrowRight:
        e.preventDefault();
        e.stopPropagation();

        cursor.moveRight(doc);

        break;
    }
  }

  const handleKeyPressEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('KeyPress: ', e.key, types.CharacterCodes[e.charCode]);

    if (types.CharacterCodes[e.charCode]) {
      setValue(value + e.key);
    }
  }

  return (
    <div className={styles.container}>
      <p>
        { cursor.pos } - { cursor.line }
      </p>

      <input
        type="text"
        value={value}
        onChange={() => null}
        onKeyPress={handleKeyPressEvent}
        onKeyDown={handleKeyDownEvent}
        className={styles.input}
      />

      <NodeLayer doc={doc} cursor={cursor} />
    </div>
  );
}

export default CodeEditor;
