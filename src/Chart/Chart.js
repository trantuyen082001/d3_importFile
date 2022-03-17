// import React, {useRef, useEffect} from 'react'
// import * as d3 from "d3";

// const Chart = ({ data = [], dimensions = {} }) => {

//   const svgRef = useRef(null);
//   const {width, height, margin= {}} = dimensions;
//   const svgWidth = width + margin.left + margin.right;
//   const svgHeight = height + margin.top + margin.bottom;

//   console.log(data[0])
//   console.log(data[1])

//   useEffect(() => {
//      const xScale = d3.scaleBand()
//         .domain(d3.extent(data[2].items, (d) => d.years))
//         .range([0,width])

//     const yScale = d3
//         .scaleLinear()
//         .domain([
//             d3.min(data[0].items, (d) => d.days) - 50,
//             d3.max(data[0].items, (d) => d.days) + 50
//         ])
//         .range([height,0]);

//     const svgEl = d3.select(svgRef.current);
//     svgEl.selectAll("*").remove();
//     const svg = svgEl
//         .append('g')
//         .attr('transform', `translate(${margin.left}, ${margin.top})`);

//     const xAxis = d3
//         .axisBottom(xScale)
//         .ticks(5)
//         .tickSize(-height + margin.bottom);

//     const xAxisGroup = svg
//         .append("g")
//         .attr("transform", `translate(0, ${height - margin.bottom})`)
//         .call(xAxis);

//     xAxisGroup.select('.domain').remove();
//     xAxisGroup.selectAll('line').attr('stroke', "rgba(255, 255, 255, 0.2)");

//     xAxisGroup.selectAll('text')
//               .attr('opacity', 0.5)
//               .attr('color', 'white')
//               .attr('font-size', '0.75rem');
    
//     const yAxis = d3.axisLeft(yScale)
//         .ticks(5)
//         .tickSize(-width)
//         .tickFormat((val) =>  `${val}`);
    
//     const yAxisGroup = svg.append('g').call(yAxis);
//     yAxisGroup.select('.domain').remove();
//     yAxisGroup.selectAll('line').attr("stroke", "rgba(255, 255, 255, 0.2)");
//     yAxisGroup
//         .selectAll('text')
//         .attr('opacity', 0.5)
//         .attr('color', 'white')
//         .attr('font-size', '0.75rem');
      
//     const line = d3
//         .line()
//         .x((d) => xScale(d.days))
//         .y((d) => d.years);

//     svg.selectAll('.line')
//         .data(data)
//         .enter()
//         .append('path')
//         .attr('fill','none')
//         .attr('stroke', (d) => d.color)
//         .attr("stroke-width", 3)
//        .attr("d", (d) => line(d.items));

    
//   }, [data])

//   return (
//     <svg ref={svgRef} width={svgWidth} height={svgHeight}/>
//   )
// }

// export default Chart

import React, { useState } from "react";

function ImportFile(){
    const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    //console.log(string)
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    console.log(array);

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      // console.log(file)
      // d3.csv(file.name, function(data){
      //   console.log(data);
      // })
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        //console.log( event.target)
        //console.log(file)
        csvFileToArray(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));
  return (<div style={{ textAlign: "center" }}>
  <h1>REACTJS CSV IMPORT EXAMPLE </h1>
  <form>
    <input type={"file"} 
      id={"csvFileInput"}
      accept={".csv"} 
      onChange={handleOnChange} />

    <button onClick={(e) => {
        handleOnSubmit(e);
      }}>IMPORT CSV</button>
  </form>

  <br />

  <table>
    <thead>
      <tr key={"header"}>
        {headerKeys.map((key) => (
          <th>{key}</th>
        ))}
      </tr>
    </thead>

    <tbody>
      {array.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>);
}

export default ImportFile;