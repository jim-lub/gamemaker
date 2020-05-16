import { CharacterCodes, SyntaxKind, CreateTokenProps, Token } from '../types';

// const Scanner = ( input: string ) => {
//   const cursor: {
//     pos: number,
//     col: number,
//     line: number,
//     next: () => void,
//     newLine: () => void
//   } = {
//       pos: 0,
//       col: 1,
//       line: 1,
//       next: function() {
//         this.pos++;
//         this.col++;
//       },
//       newLine: function() {
//         this.pos++;
//         this.line++;
//         this.col = 0
//       }
//   }
//
//
//
//   const peek = (n: number | undefined = 0): number | undefined => getCodePoint(input, cursor.pos + n);
//
//   const consume = () => {
//     const lexeme = current_token.get().lexeme + input[cursor.pos];
//     cursor.next();
//   };
//
//   const skip = (n: number | undefined = 1) => {
//     for(let i = 0; i < n; i++) {
//       cursor.next();
//     }
//   };
//
//   const resolve = () => null;
//
//   const test = () => {
//     const current_token = new Token(cursor.pos, cursor.col, cursor.line);
//   }
// }
//
// const Cursor = () => {
//   let position = 0;
//   let column = 0;
//   let line = 0;
//
//   const skip = (n: number) => {
//     position += n;
//     column += n;
//   };
//
//   const next = () => {
//     position += 1;
//     column += 1;
//   }
//
//   const newLine = () => {
//     position += 1;
//     column = 0;
//     line += 1;
//   }
// }

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

  const current_token: { lexeme: string; pos: number | null, col: number | null, line: number | null, reset: () => void } = ({
    lexeme: '',
    pos: null,
    col: null,
    line: null,
    reset() {
      this.lexeme = '';
      this.pos = null;
      this.col = null;
      this.line = null;
    }
  });

  const current = () => getCodePoint(text, cursor.pos);
  const peek = () => getCodePoint(text, cursor.pos + 1);

  const resolveToken = (
    syntaxKind: SyntaxKind
  ) => {
    tokens.push(
      createToken({
        syntaxKind,
        lexeme: current_token.lexeme,
        pos: current_token.pos || cursor.pos,
        col: current_token.col || cursor.col,
        line: current_token.line || cursor.line
      })
    );

    current_token.reset();
  }

  const scan = (): Token[] => {
    while(true) {
      if (cursor.pos >= end) {
        resolveToken(SyntaxKind.EndOfFileToken);
        break;
      }

      const ch = getCodePoint(text, cursor.pos);

      switch (ch) {
        case CharacterCodes.lineFeed:
        case CharacterCodes.carriageReturn:
          current_token.lexeme = "\n";
          resolveToken(SyntaxKind.Newline);
          cursor.newLine();
          break;

        case CharacterCodes.space:
          current_token.lexeme += " ";
          resolveToken(SyntaxKind.Newline);
          cursor.nextPos();
          break;

        case CharacterCodes.plus:
          current_token.lexeme += "+";
          resolveToken(SyntaxKind.PlusToken);
          cursor.nextPos();
          break;

        case CharacterCodes.minus:
          current_token.lexeme += "-";
          resolveToken(SyntaxKind.MinusToken);
          cursor.nextPos();
          break;

        case CharacterCodes.asterisk:
          current_token.lexeme += "*";
          resolveToken(SyntaxKind.AsteriskToken);
          cursor.nextPos();
          break;

        case CharacterCodes.slash:
          current_token.lexeme += "/";
          resolveToken(SyntaxKind.SlashToken);
          cursor.nextPos();
          break;

        case CharacterCodes.equals:
          current_token.lexeme += "=";
          resolveToken(SyntaxKind.EqualsToken);
          cursor.nextPos();
          break;

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
          scanNumberLiteralToken();
          break;

        case CharacterCodes.singleQuote:
        case CharacterCodes.doubleQuote:
        case CharacterCodes.tilde:
          scanStringLiteralToken();
          break;

        default:
          // character unrecognized or not yet implemented; skip without resolving.
          current_token.lexeme += text[cursor.pos];
          resolveToken(SyntaxKind.SyntaxWarning);
          cursor.nextPos();
      }
    }

    return tokens;
  }

  const scanNumberLiteralToken = () => {
    current_token.pos = cursor.pos;
    current_token.col = cursor.col;
    current_token.line = cursor.line;
    current_token.lexeme = scanNumberFragment();

    const ch = getCodePoint(text, cursor.pos);

    if (current() === CharacterCodes.dot) {
      current_token.lexeme += ".";
      cursor.nextPos();

      isDigit( current() )
        ? current_token.lexeme += scanNumberFragment()
        : resolveToken(SyntaxKind.SyntaxError);
    }

    resolveToken(SyntaxKind.NumericLiteral);
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

  const skipToNextWhitespace = () => {
    while (true) {
      const ch: number | undefined = text.codePointAt(cursor.pos);

      if (cursor.pos >= end || ch === CharacterCodes.lineFeed || ch === CharacterCodes.space) {
        break;
      }

      current_token.lexeme += text[cursor.pos];

      cursor.nextPos();
    }
  }

  return ({
    scan
  });
}

export default Lexer;

const createToken = ({ lexeme, syntaxKind, debug_data, debug_message, pos, col, line }: CreateTokenProps): Token => {
  return ({
    lexeme: lexeme || "",
    type: syntaxKind,
    class: SyntaxKind[syntaxKind],
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
