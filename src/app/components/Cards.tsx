interface CardProps {
  dog: {
    id: string;
    img: string;
    name: string;
    breed: string;
    age: number;
    zip_code: string;
  };
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
}

export const Card: React.FC<CardProps> = ({
  dog,
  favorites,
  toggleFavorite,
}) => {
  return (
    <div
      key={dog.id}
      className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden flex flex-col items-center text-center"
    >
      <img className="w-full h-48 object-cover" src={dog.img} alt={dog.name} />
      <div className="p-4 text-gray-700">
        <p>
          <span className="font-semibold">Name:</span> {dog.name}
        </p>
        <p>
          <span className="font-semibold">Breed:</span> {dog.breed}
        </p>
        <p>
          <span className="font-semibold">Age:</span> {dog.age}
        </p>
        <p>
          <span className="font-semibold">Zip Code:</span> {dog.zip_code}
        </p>
      </div>
      <button
        onClick={() => toggleFavorite(dog.id)}
        className={`mt-4 mb-4 px-4 py-2 rounded transition-colors ${
          favorites.has(dog.id)
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {favorites.has(dog.id) ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );
};
