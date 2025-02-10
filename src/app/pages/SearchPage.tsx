// src/pages/SearchPage.tsx

import React, { useEffect, useRef, useState } from 'react';
import { fetchBreeds, fetchDogs, matchDogs, searchDogs } from '../services/api';

import { Card } from '../components/Cards';
import { Pagination } from '../components/Pagination';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const pageSize = 25;

const SearchPage: React.FC = () => {
  // Filter & sort states.
  const [breedFilter, setBreedFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [breeds, setBreeds] = useState<string[]>([]);

  // Search results state.
  const [totalResults, setTotalResults] = useState<number>(0);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const lastToastTimeRef = useRef<number>(0);
  // Pagination state.
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Match result state (now holds a Dog object).
  const [matchResult, setMatchResult] = useState<Dog | null>(null);

  // Fetch available breeds on mount.
  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const breedList = await fetchBreeds();
        setBreeds(breedList);
      } catch (err) {
        console.error('Failed to fetch breeds', err);
        toast.error('Failed to load breeds.');
      }
    };
    loadBreeds();
  }, []);

  // Perform search using an offset based on the current page.
  const performSearch = async (page: number) => {
    const offset = (page - 1) * pageSize;
    const params = {
      breeds: breedFilter ? [breedFilter] : undefined,
      size: pageSize,
      from: offset.toString(),
      sort: `breed:${sortOrder}`,
    };

    try {
      const searchResult = await searchDogs(params);
      setTotalResults(searchResult.total);
      const dogList = await fetchDogs(searchResult.resultIds);
      setDogs(dogList);
      setCurrentPage(page);
      setMatchResult(null);
    } catch (err) {
      console.error('Search failed', err);
      toast.error('Search failed. Please try again.');
    }
  };

  // Toggle favorite status for a dog.
  const toggleFavorite = (dogId: string) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      const now = Date.now();
      const THROTTLE_MS = 500;
      if (newFavs.has(dogId)) {
        newFavs.delete(dogId);
        if (now - lastToastTimeRef.current > THROTTLE_MS) {
          toast('Removed from favorites', { icon: '❌' });
          lastToastTimeRef.current = now;
        }
      } else {
        newFavs.add(dogId);
        if (now - lastToastTimeRef.current > THROTTLE_MS) {
          toast('Added to favorites', { icon: '✅' });
          lastToastTimeRef.current = now;
        }
      }
      return newFavs;
    });
  };

  // Generate a match based on favorite dog IDs.
  const generateMatch = async () => {
    if (favorites.size === 0) {
      toast.error('Please select at least one favorite dog.');
      return;
    }
    try {
      const matchResponse = await matchDogs(Array.from(favorites));
      const matchedDogId = matchResponse.match;
      const matchedDogs = await fetchDogs([matchedDogId]);
      const matchedDog = matchedDogs[0];
      setMatchResult(matchedDog);
      toast.success('Match generated!');
      // Fire confetti
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error('Match generation failed', err);
      toast.error('Match generation failed. Please try again.');
    }
  };

  // Re-run search when filters or sort order change.
  useEffect(() => {
    performSearch(1);
  }, [breedFilter, sortOrder]);

  const totalPages = Math.ceil(totalResults / pageSize);
  const startResult = totalResults === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalResults);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Search Dogs
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-around mb-8 gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="breed-select"
            className="mb-2 font-medium text-gray-700"
          >
            Filter by Breed:
          </label>
          <select
            id="breed-select"
            value={breedFilter}
            onChange={(e) => setBreedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">All</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="sort-select"
            className="mb-2 font-medium text-gray-700"
          >
            Sort by Breed:
          </label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div>
        <h3 className="text-center text-xl text-gray-800 mb-6">
          Showing <span className="font-medium">{startResult}</span> to{' '}
          <span className="font-medium">{endResult}</span> of{' '}
          <span className="font-medium">{totalResults}</span> results
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dogs.map((dog) => (
            <Card
              key={dog.id}
              dog={dog}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Responsive Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            {/* Mobile: Simple Previous/Next */}
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) performSearch(currentPage - 1);
                }}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) performSearch(currentPage + 1);
                }}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            {/* Desktop: Detailed Pagination */}
            <div className="hidden sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startResult}</span> to{' '}
                  <span className="font-medium">{endResult}</span> of{' '}
                  <span className="font-medium">{totalResults}</span> results
                </p>
              </div>
              <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={performSearch}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Match Section */}
      <div className="text-center mt-8">
        <button
          onClick={generateMatch}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-xl"
        >
          Generate Match
        </button>
      </div>

      {/* Modal Popup for Dog Match */}
      {matchResult && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
            <button
              onClick={() => setMatchResult(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-center mb-4">
              Your Match!
            </h3>
            <div className="flex flex-col items-center">
              <img
                src={matchResult.img}
                alt={matchResult.name}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-4 text-gray-700">
                <p>
                  <span className="font-semibold">Name:</span>{' '}
                  {matchResult.name}
                </p>
                <p>
                  <span className="font-semibold">Breed:</span>{' '}
                  {matchResult.breed}
                </p>
                <p>
                  <span className="font-semibold">Age:</span> {matchResult.age}
                </p>
                <p>
                  <span className="font-semibold">Zip Code:</span>{' '}
                  {matchResult.zip_code}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
