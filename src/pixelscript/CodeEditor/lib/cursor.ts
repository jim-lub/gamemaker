import { EditorState, Payload } from 'pixelscript/types';

import * as helpers from './cursor.helpers';

export const moveCursorLeft = (state: EditorState, payload?: Payload) => {
  if ( helpers.isAtDocStart(state) ) {
    return state;
  }

  return {
    ...state,
    cursor: {
      pos: helpers.isAtLineStart(state)
        ? helpers.getLengthOfLine(state, { line: state.cursor.line - 1 })
        : state.cursor.pos - 1,
      line: helpers.isAtLineStart(state)
        ? state.cursor.line - 1
        : state.cursor.line
    }
  }
}

export const moveCursorRight = (state: EditorState, payload?: Payload) => {
  if ( helpers.isAtDocEnd(state) ) {
    return state;
  }

  return {
    ...state,
    cursor: {
      pos: helpers.isAtLineEnd(state)
        ? 0
        : state.cursor.pos + 1,
      line: helpers.isAtLineEnd(state)
        ? state.cursor.line + 1
        : state.cursor.line
    }
  }
}
