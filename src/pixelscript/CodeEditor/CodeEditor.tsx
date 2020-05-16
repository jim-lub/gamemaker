import React, { useState } from 'react';

import {
  CharacterCodes,
  KeyCodes,
  NodeTypes,

  EditorState
} from 'pixelscript/types';

import styles from './code-editor.module.css';


const MockEditorState: EditorState = {
  cursor: {
    pos: 0,
    line: 0
  },
  doc: {
    meta: {},
    content: [
      {
        nodes: [
          {
            type: NodeTypes.Entity,
            value: 'doSomething'
          },
          {
            type: NodeTypes.Space,
            value: null
          },
          {
            type: NodeTypes.Entity,
            value: '5000'
          }
        ]
      },

      {
        nodes: [
          {
            type: NodeTypes.Entity,
            value: 'doSomethingElse'
          },
          {
            type: NodeTypes.Space,
            value: null
          },
          {
            type: NodeTypes.Entity,
            value: '='
          },
          {
            type: NodeTypes.Entity,
            value: '9999'
          }
        ]
      }
    ]
  }
}

const CodeEditor = () => {
  /**
  * The `keyDown` event will fire before the `keyPress` consistently in all
  * browsers. We want to separate our control keys from our actual input keys.
  * So we check if the `keyDown` event keycode matches any of our controls.
  * If true: we prevent the browser from triggering the `keyPress` event and
  * dispatch appropriate actions.
  * If false: the `keyPress` event will trigger and we'll process it as input.
  */
  const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (KeyCodes[e.keyCode]) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  const handleKeyPressEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (CharacterCodes[e.charCode]) {
      // valid input
    }
  }

  return (
    <div className={styles.container}>
      <input
        type="text"

        className={styles.input}
      />
    </div>
  );
}

export default CodeEditor;
