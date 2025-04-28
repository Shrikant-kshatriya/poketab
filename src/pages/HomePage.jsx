import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import TypeFilter from '../components/Filter';
import PokemonCard from '../components/PokeCard';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      setError(false);
      setLoading(true);
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
      const pokemonData = await Promise.all(
        res.data.results.map(async (p) => {
          const pokeDetails = await axios.get(p.url);
          return {
            id: pokeDetails.data.id,
            name: pokeDetails.data.name,
            image: pokeDetails.data.sprites.front_default,
            types: pokeDetails.data.types.map((type) => type.type.name)
          };
        })
      );
      setPokemonList(pokemonData);
      setFilteredPokemon(pokemonData);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    filterPokemon();
  }, [searchTerm, selectedType]);

  const filterPokemon = () => {
    let filtered = pokemonList;
    if (searchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedType) {
      filtered = filtered.filter(p => p.types.includes(selectedType));
    }
    setFilteredPokemon(filtered);
  };

  if (loading) return <Loader />;
  if (error) return <Error onRetry={fetchPokemon} />;

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredPokemon.length ? (
          filteredPokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No Pokémon found!</div>
        )}
      </div>
    </div>
  );
};

export default Home;
