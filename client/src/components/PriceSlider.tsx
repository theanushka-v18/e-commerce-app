import { useState } from 'react';
import ReactSlider from 'react-slider';
import '../styles/priceSlider.css';

const PriceSlider = ({ min, max, onChange }:any) => {
    const [value, setValue] = useState([min, max]);
  
    const handleChange = (newValue:any) => {
      setValue(newValue);
      onChange(newValue);
    };
  
    return (
      <div className="price-slider">
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="thumb"
          trackClassName="track"
          defaultValue={[min, max]}
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          pearling
          minDistance={10}
        />
        <div className="price-values">
          <span>${value[0]}</span>
          <span>${value[1]}</span>
        </div>
      </div>
    );
  };

export default PriceSlider
