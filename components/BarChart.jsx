import React, {Component} from 'react';
import * as d3 from "d3";
import { transition } from 'd3-transition';
import { scaleBand, scaleLinear } from 'd3-scale';
import XYAxis from './axis/xy-axis.js';
import Grid from './grid/grid.js';
import Bar from './bar/bar.js';


class BarChart extends Component {
    constructor(){
        super();
        this.state = {
            data: [
              { name: 'Anger', value: 0.034086793661117554 },
              { name: 'Disgust', value: 0.027105990797281265 },
              { name: 'Fear', value: 0.03125927224755287 },
              { name: 'Joy',  value: 0.03980706259608269 },
              { name: 'Sadness', value: 0.4088 },
              { name: 'Neutral', value: 0.32471874356269836 },
              { name: 'Surprise', value: 0.13414035737514496 }
            ],
          } 
    }

    render() {
        const { data } = this.state;
        const parentWidth = 500;
        const margin = {
          top: 10,
          right: 10,
          bottom: 20,
          left: 40,
        };
        const ticks = 6;
        const t = transition().duration(1500);
    
        const width = parentWidth - margin.left - margin.right;
        const height = parentWidth * 0.5 - margin.top - margin.bottom;
    
        const xScale = scaleBand()
          .domain(data.map(d => d.name))
          .range([0, width])
          .padding(0.26);
    
        const yScale = scaleLinear()
          .domain([0, Math.max(...data.map(d => d.value))])
          .range([height, 0])
          .nice();
    
        return (
            
            <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Grid {...{ xScale, yScale, width, ticks, t }} />
            <Bar
              {...{
                xScale,
                yScale,
                data,
                height,
                t,
              }}
            />
          </g>
        </svg>

        );
    }
    
}

export default BarChart;