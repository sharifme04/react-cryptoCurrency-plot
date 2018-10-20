// @flow
import * as React from 'react';
import { Style } from 'radium';

const toolTipStyles = {
  '.tooltip': {
    border: 'solid silver 1px',
    position: 'fixed',
    backgroundColor: 'aliceblue',
    borderRadius: '4px',
    padding: '10px'
  }
};

const ToolTip = (props:Object) => (
  <div className="tooltip-container">
    <Style scopeSelector=".tooltip-container" rules={toolTipStyles} />
    <div className="tooltip" style={{ top: props.top, left: props.left }}>
      {props.children}
    </div>
  </div>
);

export default ToolTip;
