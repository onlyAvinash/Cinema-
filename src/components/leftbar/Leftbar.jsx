import React from 'react'
import './leftbar.css';

const Leftbar = ({ category, getCategory }) => {

  return (
    <div className='leftbar'>

      <ul className='leftbarLists'>
        {category.map((data, id) => {
        
          return <button className='letbarList' name={data} key={id}  onClick={(e) => getCategory(e.target.name)}> {data}</button>;
        
      })}
 
      </ul>
    </div>
  )
}

export default Leftbar
    