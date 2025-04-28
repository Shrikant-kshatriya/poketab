import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="backdrop-blur-sm bg-white/30 border border-gray-200 p-4 rounded-xl shadow-md hover:scale-105 transition-transform flex flex-col items-center">
      <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mb-3" />
      <h2 className="text-lg font-semibold capitalize">{pokemon.name}</h2>
      <p className="text-gray-500 text-sm">#{pokemon.id}</p>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span key={type} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 capitalize">
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
