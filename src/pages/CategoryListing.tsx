import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import NavBar from "../components/NavBar";
import Cart from "../components/Cart";
import finalBellLogo from "../assets/finalBellLogo.png";
import { products, categories } from "../data/products";

type SortOption = "featured" | "price-low" | "price-high" | "name" | "newest";

export default function CategoryListing() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const category = categories.find((c) => c.id === categoryId);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => product.category === categoryId);

    // Filter by search query
    if (searchQuery.length >= 2) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query)
      );
    }

    // Sort products
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => (a.specialPrice || a.price) - (b.specialPrice || b.price));
        break;
      case "price-high":
        sorted.sort((a, b) => (b.specialPrice || b.price) - (a.specialPrice || a.price));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        sorted.sort((a, b) => {
          if (a.badge === "new" && b.badge !== "new") return -1;
          if (a.badge !== "new" && b.badge === "new") return 1;
          return 0;
        });
        break;
      default:
        // Featured
        sorted.sort((a, b) => {
          const aScore = a.badge === "hot" ? 2 : a.badge === "sale" ? 1 : 0;
          const bScore = b.badge === "hot" ? 2 : b.badge === "sale" ? 1 : 0;
          return bScore - aScore;
        });
    }

    return sorted;
  }, [categoryId, searchQuery, sortBy]);

  if (!category) {
    navigate("/shop");
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <NavBar logoSrc={finalBellLogo} />
      <Cart />

      {/* Breadcrumb Navigation */}
      <section className="mx-auto max-w-6xl px-6 pt-6 md:px-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-400">
          <a href="/" className="hover:text-secondary transition">
            Home
          </a>
          <ChevronRight className="h-4 w-4" />
          <a href="/shop" className="hover:text-secondary transition">
            Shop
          </a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-secondary capitalize font-medium">{category.name}</span>
        </nav>
      </section>

      {/* Category Header */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="block text-secondary capitalize">{category.name}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-neutral-300">
            {category.description}
          </p>
        </div>
      </section>

      {/* Product Listing Section */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products (min 2 characters)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-900 rounded-xl border border-neutral-800
                       text-neutral-100 placeholder-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent
                       transition"
            />
          </div>
          {searchQuery.length > 0 && searchQuery.length < 2 && (
            <p className="text-center text-sm text-neutral-500 mt-2">
              Enter at least 2 characters to search
            </p>
          )}
        </div>

        {/* Sort & Results Count */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-neutral-400">
            Showing <span className="font-semibold text-neutral-100">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 bg-neutral-900 rounded-lg border border-neutral-800
                       text-neutral-100 text-sm font-medium
                       focus:outline-none focus:ring-2 focus:ring-secondary
                       hover:bg-neutral-800 transition cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <a
              key={product.id}
              href={`/shop/product/${product.id}`}
              className="group bg-neutral-900 rounded-2xl overflow-hidden ring-1 ring-neutral-800 hover:ring-secondary transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-neutral-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Status Badge */}
                {product.badge && product.inStock && (
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg ${
                        product.badge === "hot"
                          ? "bg-red-600 text-white"
                          : product.badge === "sale"
                          ? "bg-secondary text-neutral-950"
                          : product.badge === "new"
                          ? "bg-green-600 text-white"
                          : ""
                      }`}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-neutral-950/80 flex items-center justify-center">
                    <span className="text-neutral-400 font-semibold text-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-secondary font-medium">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="text-xs text-neutral-500">{product.brand}</span>
                  )}
                </div>

                <h3 className="mb-2 min-h-14 text-xl font-bold text-neutral-100 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-sm text-neutral-400 mb-2 line-clamp-2">
                  {product.description}
                </p>

                {/* Size Info */}
                {product.hasSizes && product.sizes && (
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-md font-medium">
                      {product.sizes.length} sizes available
                    </span>
                    <span className="text-xs text-neutral-500">
                      {product.category === "Boxing Gloves" ? "Click to select weight" : "Click to select size"}
                    </span>
                  </div>
                )}

                {/* Stock Level */}
                {product.stockQuantity !== undefined && product.inStock && (
                  <div className="mb-3">
                    <span className={`text-xs font-medium ${
                      product.stockQuantity > 10
                        ? "text-green-500"
                        : product.stockQuantity > 5
                        ? "text-yellow-500"
                        : "text-orange-500"
                    }`}>
                      {product.stockQuantity > 10
                        ? "In Stock"
                        : product.stockQuantity > 5
                        ? `Only ${product.stockQuantity} left`
                        : `Low Stock: ${product.stockQuantity} remaining`}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    {product.specialPrice ? (
                      <>
                        <span className="text-sm text-neutral-500 line-through">
                          £{product.price.toFixed(2)}
                        </span>
                        <span className="text-2xl font-bold text-red-500">
                          £{product.specialPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-neutral-100">
                        £{product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // Navigate to product detail page instead
                      window.location.href = `/shop/product/${product.id}`;
                    }}
                    disabled={!product.inStock}
                    className={`px-6 py-2 rounded-lg font-medium transition ${
                      product.inStock
                        ? "bg-secondary text-neutral-950 hover:bg-secondary/90"
                        : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    }`}
                  >
                    {product.inStock ? "View Product" : "Unavailable"}
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 px-6">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-900 flex items-center justify-center">
                <Search className="h-8 w-8 text-neutral-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-100 mb-2">
                No products found
              </h3>
              <p className="text-neutral-400 mb-6">
                {searchQuery.length >= 2
                  ? `No results for "${searchQuery}". Try adjusting your search.`
                  : "No products available in this category."}
              </p>
              {searchQuery.length >= 2 && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2 bg-secondary text-neutral-950 rounded-lg font-medium hover:bg-secondary/90 transition"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
