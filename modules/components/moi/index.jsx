import React, { Component, PropTypes } from 'react';
import {Spring} from 'react-motion';
import {range} from 'd3';
import autobind from 'autobind-decorator';

import Circle from './../canvas/circle';

import {Surface, Image, Text, Group} from 'react-canvas';

const style = {
  width: 300,
  height: 150,
  position: 'absolute',
  left: 0,
  top: 0
};

const onMouseMove = Symbol();

class Moi extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {mouse: {top: 0, left: 0}};
    this.getValues = this.getValues.bind(this);
    this[onMouseMove] = this[onMouseMove].bind(this);
  }

  getValues(currentPositions) {
    return {val: this.state.mouse};
  }

  [onMouseMove]({pageX, pageY}) {
    this.setState({mouse: {top: pageY, left: pageX}});
  }

  render() {
    const {circular, counter} = this.props;
    return (
      <div className="container"
        style={{
          width: innerWidth,
          height: 1000,
          backgroundColor: "black"
        }}
        onMouseMove={this[onMouseMove]}
        onClick={circular}
      >
        <Surface width={innerWidth} height={1000} left={0} top={0}>
          <Spring endValue={this.getValues}>
            {(rest) => {
              const {val} = rest;
              return (
                <Group>
                  <Circle style={{...style, ...val}} />
                  <Circle style={{...style, ...{left: -val.left, top: val.top}}} />
                </Group>
              )
            }}
          </Spring>
        </Surface>
      </div>
    );
  }

}

export default Moi
