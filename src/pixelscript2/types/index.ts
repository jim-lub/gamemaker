import { CharacterCodes } from './CharacterCodes.enum';
import { KeyCodes } from './KeyCodes.enum';
import { SyntaxKind } from './SyntaxKind.enum';

export {
  CharacterCodes,
  KeyCodes,
  SyntaxKind
}

export interface Token {
  type: SyntaxKind,
  class: string,
  debug_type: string,
  debug_data: {},
  debug_message: string,
  lexeme?: string,
  source?: {
    pos: number
    col: number,
    line: number
  }
}

export interface CreateTokenProps {
  lexeme?: string,
  syntaxKind: SyntaxKind,
  debug_data?: {},
  debug_message?: string
  pos: number,
  line: number
  col: number,
}
