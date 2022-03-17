import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as d3 from 'd3'
import Chart from './Chart/Chart';
import { color } from 'd3';
// import "./style.css";


function App() {

  const [showData, setShowData] = useState([]);
  const [loading, setLoanding] = useState(true);

  useEffect(() => {
      try {
          d3.csv('https://gist.githubusercontent.com/trantuyen082001/f8238ffa890205c19679caee29896e0f/raw/555a655d4cb281fbbf036aef20559135f738d27c/data.csv')
          .then((d) => {
            setShowData(d);
              setLoanding(false)
              // console.log(d)
          })
      } catch (error) {
          console.log("failed loading data", error)
      }
  },[])

  const days = {
    name: 'days',
    color: '#fffff',
    items: showData.map((d) => (d.days))
  }
  const months = {
    name: 'months',
    color: '#d53e4f',
    items: showData.map((d) => (d.months))
  }
  const years = {
    name: 'years',
    color: '#5e4fa2',
    items: showData.map((d) => (d.years))
  }
 

  const dimensions = {
    width: 600,
    height: 300,
    margin: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 60
    }
  };
  

  return (
    <div className='App'>
        <Chart
          // data={[days, months, years]}
          // dimensions={dimensions}
        />
    </div>
  );
}

export default App;
