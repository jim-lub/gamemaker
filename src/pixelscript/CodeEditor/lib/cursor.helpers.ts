import { EditorState } from 'pixelscript/types';

export const isAtDocStart = (state: EditorState) => null;
export const isAtDocEnd = (state: EditorState) => null;
export const isAtLineStart = (state: EditorState) => null;
export const isAtLineEnd = (state: EditorState) => null;
export const isAtNodeStart = (state: EditorState) => null;
export const isAtNodeEnd = (state: EditorState) => null;

export const getLengthOfLine = (state: EditorState, { line }: { line: number }) => {
  return state.doc.content[line].nodes.map(({ value }) => value).join('').length;
}
