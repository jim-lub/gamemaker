import React, { useState, useRef } from 'react';

import styles from './code-editor.module.css';

const CodeEditor = () => {
  const [script, setScript] = useState("");

  const setFocus = () => {

  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScript(e.currentTarget.value);
  }

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={script}
        onChange={handleChange}
      />

      <div className={styles.codeWrapper}>
        <pre className={styles.code} >
          { script }
          <span>|</span>
        </pre>
      </div>
    </div>
  )
}

export default CodeEditor;
