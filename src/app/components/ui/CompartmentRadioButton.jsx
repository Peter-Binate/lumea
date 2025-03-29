'use client';

import {
  CarFrontIcon,
  Footprints,
  PlaneIcon,
  RecycleIcon
} from 'lucide-react';
import { useState } from 'react';

const RadioTileOption = ({ 
  id, 
  label, 
  icon: Icon, 
  selected, 
  onChange 
}) => {
  return (
    <div className="relative h-20 w-20 ml-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
      <input
        id={id}
        type="radio"
        name="transportOption"
        className="absolute h-full w-full m-0 cursor-pointer z-10 opacity-0"
        checked={selected === id}
        onChange={() => onChange(id)}
      />
      <div 
        className={`
          flex flex-col items-center justify-center h-full 
          border-2 border-cyan-500 rounded-lg 
          ${selected === id ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50 scale-110' : ''}
          
        `}
      >
        <Icon 
          size={48} 
          className={`${selected === id ? 'text-white' : 'text-cyan-500'}`} 
        />
        <label 
          htmlFor={id} 
          className={`
            text-sm font-semibold uppercase tracking-wider mt-1
            ${selected === id ? 'text-white' : 'text-cyan-500'}
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

const RadioTileGroup = ({ options, value, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {options.map((option) => (
        <RadioTileOption
          key={option.id}
          id={option.id}
          label={option.label}
          icon={option.icon}
          selected={value}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

const CompartmentRadioButton = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const compartmentRadioButton = [
    { id: 'walk', label: 'Walk', icon: Footprints  },
    { id: 'bike', label: 'Bike', icon: RecycleIcon },
    { id: 'car', label: 'Drive', icon: CarFrontIcon },
    { id: 'fly', label: 'Fly', icon: PlaneIcon }
  ];

  return (
    <div className="flex justify-start items-start border border-cyan-500">
      <RadioTileGroup 
        options={compartmentRadioButton} 
        value={selectedOption} 
        onChange={setSelectedOption} 
      />
    </div>
  );
};

export default CompartmentRadioButton;