import React from 'react';

const TypeFilter = ({ selectedType, setSelectedType }) => {
  const types = [
    'grass', 'fire', 'water', 'bug', 'normal', 'poison', 'electric',
    'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon', 'dark', 'steel', 'flying'
  ];

  return (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option className='capitalize' key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;
