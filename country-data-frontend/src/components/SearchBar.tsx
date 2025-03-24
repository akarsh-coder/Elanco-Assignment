import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterBy: string;
  setFilterBy: (filter: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, filterBy, setFilterBy, onSearch }) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
          onSearch();
        }
      };

  return (
    <div className="mb-6 w-full max-w-md mx-auto">
      <div className="flex gap-2 items-center mb-3">
        <label className="text-gray-700 text-sm font-medium">Filter By:</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="region">Region</option>
          <option value="timezone">Timezone</option>
          <option value="capital">Capital</option>
        </select>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          onClick={onSearch}
        >
          Search
        </button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder={`Search by ${filterBy}...`}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
