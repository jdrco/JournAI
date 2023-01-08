import React, { useEffect, useRef } from "react";
import DrawDonutChart from "./DrawDonutChart";


const DonutChart = ({ data }) => {
    const ref = useRef(null);
  
    useEffect(() => {
      if (ref.current) {
        DrawDonutChart(ref.current, data);
      }
    }, [ref]);
  
    return (
      <div className="container">
        <div className="graph" ref={ref} />
      </div>
    );
  };
  
  export default React.memo(DonutChart);