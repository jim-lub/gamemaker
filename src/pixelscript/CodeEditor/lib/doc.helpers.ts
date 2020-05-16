import { EditorState } from 'pixelscript/types';

export const getLengthOfLine = (state: EditorState, { line }: { line: number }) => {
  return state.doc.content[line].nodes.map(({ value }) => value).join('').length;
}
