import { CharacterCodes } from './CharacterCodes.enum';
import { KeyCodes } from './KeyCodes.enum';
import { NodeTypes } from './NodeTypes.enum';
import { SyntaxKind } from './SyntaxKind.enum';

export {
  CharacterCodes,
  KeyCodes,
  NodeTypes,
  SyntaxKind
}

export interface EditorState {
  cursor: Cursor,
  doc: Doc
}

export interface Cursor {
  pos: number,
  line: number
}

export interface Doc {
  meta: {

  },
  content: Line[]
}

export interface Line {
  nodes: Node[]
}

export interface Node {
  type: NodeTypes,
  value: string | null,
  meta?: {}
  tokens?: Token[]
}

export interface Token {

}

export interface Payload {
  [key: string]: any
}
