import React from 'react'
import {Form} from 'react-bootstrap'

const Legend = ({data, selectedItems, onChange, checkRegion}) => {
    console.log(checkRegion)
  return (
    <div className='legendContainer'>
        <label style={{color: '#ffff'}}>
        <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">{checkRegion[0]}</option>
            <option value="2">{checkRegion[1]}</option>
            <option value="3">{checkRegion[2]}</option>
            <option value="4">{checkRegion[3]}</option>
            <option value="5">{checkRegion[4]}</option>
            <option value="6">{checkRegion[5]}</option>
            <option value="7">{checkRegion[6]}</option>
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