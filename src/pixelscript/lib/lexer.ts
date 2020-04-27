import { CharacterCodes, SyntaxKind, Token, CreateTokenProps } from '../types';

const Lexer = ( input: string ) => {
  const tokens: Token[] = [];

  let text: string = input;
  let end: number = text.length;

  const cursor = ({
    pos: 0,
    line: 0,
    col: 0,
    nextPos() {
      this.pos++;
      this.col++
    },
    newLine() {
      this.pos++;
      this.line++
      this.col = 1;
    },
  });

  const current_token = ({
    lexeme: '',
    startPos: null,
    startLine: null,
    startCol: null
  });

  const resolveToken = (
    syntaxKind: SyntaxKind,
    pos?: number, col?: number, line?: number
  ) => tokens.push(
    createToken({
      syntaxKind,
      pos: pos || cursor.pos,
      col: col || cursor.col,
      line: line || cursor.line
    })
  );

  const scan = (): void => {
    while(true) {
      if (cursor.pos >= end) resolveToken(SyntaxKind.EndOfFileToken);

      const ch = getCodePoint(text, cursor.pos);

      switch (ch) {
        case CharacterCodes.lineFeed:
        case CharacterCodes.carriageReturn:
          return cursor.newLine();

        case CharacterCodes.space:
          return cursor.nextPos();

        case CharacterCodes._0:
        case CharacterCodes._1:
        case CharacterCodes._2:
        case CharacterCodes._3:
        case CharacterCodes._4:
        case CharacterCodes._5:
        case CharacterCodes._6:
        case CharacterCodes._7:
        case CharacterCodes._8:
        case CharacterCodes._9:
          return scanNumberLiteralToken();

        case CharacterCodes.singleQuote:
        case CharacterCodes.doubleQuote:
        case CharacterCodes.tilde:
          return scanStringLiteralToken();

        default:
          // character unrecognized or not yet implemented; skip without resolving.
          cursor.nextPos();
      }
    }
  }

  const scanNumberLiteralToken = () => {
    let result = scanNumberFragment();

    const ch: number | undefined = text.codePointAt(cursor.pos);

    if (ch === CharacterCodes.dot) {
      cursor.nextPos();
      let decimal = scanNumberFragment();

      if (decimal.length > 0) {
        result += "." + decimal;
      }
    }
  }

    const scanNumberFragment = () => {
      let fragment = "";

      while (true) {
        if (isDigit( getCodePoint(text, cursor.pos) )) {
          fragment += text[cursor.pos];
          cursor.nextPos();
          continue;
        }

        break;
      }

      return fragment;
    }

  const scanStringLiteralToken = () => {
    cursor.nextPos();
  }

  const scanOperatorToken = () => {
    cursor.nextPos();
  }

  const scanIdentifierToken = () => {
    cursor.nextPos();
  }

  const scanKeywordToken = () => {
    cursor.nextPos();
  }
}

const createToken = ({ syntaxKind, debug_data, debug_message, pos, col, line }: CreateTokenProps): Token => {
  return ({
    type: syntaxKind,
    debug_type: SyntaxKind[syntaxKind],
    debug_data: debug_data || {},
    debug_message: debug_message || "",
    source: {
      pos,
      line,
      col
    }
  });
}

const getCodePoint = (text: string, pos: number): number | undefined => text.codePointAt(pos);
const isDigit = (ch: number | undefined): boolean =>
  (ch === undefined) ? false : ch >= CharacterCodes._0 && ch <= CharacterCodes._9;
