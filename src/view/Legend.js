import React from 'react'

const Legend = ({data, selectedItems, onChange}) => {
  return (
    <div className='legendContainer'>
        <label style={{color: '#ffff'}}>Region: </label>
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