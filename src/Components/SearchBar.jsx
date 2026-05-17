const SearchBar = ({ searchTerm, onChange, onSearch, onKeyDown }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-2xl flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/6 p-3 rounded-full shadow-md">
        <input
          type="text"
          placeholder="Search movies, e.g. Batman"
          onKeyDown={onKeyDown}
          value={searchTerm}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder-white/70 px-2"
        />
        <button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full"
          onClick={onSearch}
        >
          🔍
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
