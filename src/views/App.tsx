import React from 'react';

import 'views/css/index.css';
import 'views/css/lexer.css';

// import { CodeEditor } from 'views/components/CodeEditor';
import { CodeEditor } from 'pixelscript/CodeEditor';

const App = () => {
  return (
    <div>
      <CodeEditor />
    </div>
  )
}

export default App;
