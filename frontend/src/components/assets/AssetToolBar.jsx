import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import AddAssetButton from "./AddAssetButton";

const AssetToolBar = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-wrap gap-4 items-center">
        {/* Status Filter */}
        <StatusFilter
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Desktop">Desktop</option>
          <option value="Monitor">Monitor</option>
          <option value="Printer">Printer</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="name">Name (A-Z)</option>
          <option value="category">Category</option>
          <option value="purchaseDate">Purchase Date</option>
          <option value="purchaseCost">Purchase Cost</option>
          <option value="status">Status</option>
        </select>

        <AddAssetButton mode="add" />
      </div>
    </div>
  );
};

export default AssetToolBar;