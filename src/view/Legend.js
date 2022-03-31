import React, {useState} from 'react'
import {Form} from 'react-bootstrap'

const Legend = ({regions = {}, data, selectedItems, onChange, checkRegion}) => {
    const [regionCurr, setRegionCurr] = useState(regions);

    // console.log(checkRegion)
    
    const onChangeRegion = (e) => {
        const selectedRegion = e.target.value;
        console.log(selectedRegion)
    }

    // console.log(data);
    // console.log(checkRegion)

    return (
    <div className='legendContainer'>
        <label style={{color: '#ffff'}}>
        <Form.Select 
            aria-label="Default select example"
            // value={data.find()}
            onChange={(e) => {
                onChangeRegion(e);
            }}
        >
                <option>Open this select menu</option>
                {/* <option value={region[0]}>{checkRegion[0]}</option>
                <option value={region[1]}>{checkRegion[1]}</option>
                <option value={region[2]}>{checkRegion[2]}</option>
                <option value={region[3]}>{checkRegion[3]}</option>
                <option value={region[4]}>{checkRegion[4]}</option>
                <option value={region[5]}>{checkRegion[5]}</option>
                <option value={region[6]}>{checkRegion[6]}</option> */}
                {regions.map((region) => (
                    <option value={region}>{[...new Set(region.map((d) => d.Region))]}</option>
                ))}
        </Form.Select>
        </label>
        { 
            data.map((d) => (
                <div className='checkbox' style={{ color: d.color }} key={d.name}>
                    {
                        d.name !== 'monthsData' && (
                            <input 
                                type="checkbox"
                                value={d.name}
                                checked={selectedItems.includes(d.name)}
                                onChange = {() => onChange(d.name)} 
                            />
                        )
                    }
                    <label>{d.name}</label>
                </div>
            ))
        }
    </div>
  )
}

export default Legend