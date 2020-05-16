import React, { useState } from 'react';

import styles from '../../code-editor.module.css';

interface Props {
  doc: Array<string[]>,
  cursor: any
}

const NodeLayer = ({ doc, cursor }: Props) => {
  return (
    <pre>
      {
        doc.map((nodes, lineNumber) => <Line key={lineNumber} lineNumber={lineNumber} nodes={nodes} cursor={cursor}/>)
      }
    </pre>
  )
}

const Line: React.FC<{ lineNumber: number, nodes: string[], cursor: any }> = ({ lineNumber, nodes, cursor }) => {
  let nodeIndexAccumulator = 0;

  return (
    <p className={styles.line}>
      <span className={styles.lineNumber}> { lineNumber } </span>
      {
        nodes.map((val, i) => {
          const nodeIndex = nodeIndexAccumulator;
          nodeIndexAccumulator += val.length;

          return (
            <Node
              key={i}
              val={val}
              lineIndex={lineNumber}
              startIndex={nodeIndex}
              cursor={cursor}
            />
          )
        })
      }
    </p>
  )
}

const Node: React.FC<{ val: string, lineIndex: number, startIndex: number, cursor: any }> = ({ val, lineIndex, startIndex, cursor }) => {
  const processValue = (): any => {
    const value: any = [];

    for (let i = 0; i < val.length; i++) {
      const chIndex = startIndex + i;

      (chIndex === cursor.pos && lineIndex === cursor.line)
        ? value.push(<span key={chIndex} style={{borderLeft: 'solid 1px red'}}>{ val[i] }</span>)
        : value.push(val[i])
    }

    return value;
  }
  return (
    <span>
      {
        processValue()
      }
    </span>
  )
}

export default NodeLayer;
