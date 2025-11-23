import { ChevronRight, ArrowRight } from "lucide-react";
import NavBar from "../components/NavBar";
import Cart from "../components/Cart";
import finalBellLogo from "../assets/finalBellLogo.png";
import { categories } from "../data/products";
import { useProducts } from "../contexts/ProductContext";

export default function Shop() {
  // Get products from context
  const { products, loading, error } = useProducts();

  // Debug: Log products
  console.log("[Shop] Total products loaded:", products.length);
  console.log(
    "[Shop] Product categories:",
    products.map((p) => p.category)
  );

  // Get featured products (hot and sale items)
  const featuredProducts = products
    .filter(
      (p) => p.badge === "hot" || p.badge === "sale" || p.badge === "featured"
    )
    .slice(0, 6);

  // Get new arrivals
  const newArrivals = products.filter((p) => p.badge === "new").slice(0, 3);

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <NavBar logoSrc={finalBellLogo} />
      <Cart />

      {/* Loading State */}
      {loading && (
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-secondary border-r-transparent"></div>
          <p className="mt-4 text-neutral-400">Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-8">
          <div className="rounded-2xl bg-red-900/20 border border-red-500 p-6 text-center">
            <p className="text-red-400 font-semibold mb-2">
              Failed to load products
            </p>
            <p className="text-neutral-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Content - only show when not loading */}
      {!loading && (
        <>
          {/* Breadcrumb Navigation */}
          <section className="mx-auto max-w-7xl px-6 pt-6 md:px-8">
            <nav className="flex items-center gap-2 text-sm text-neutral-400">
              <a href="/" className="hover:text-secondary transition">
                Home
              </a>
              <ChevronRight className="h-4 w-4" />
              <span className="text-neutral-100 font-medium">Shop</span>
            </nav>
          </section>

          {/* Hero Header Section */}
          <section className="mx-auto max-w-7xl px-6 py-12 md:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                <span className="block text-secondary">Fight Ready</span>
                <span className="block text-neutral-100">Gear & Equipment</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-neutral-300 leading-relaxed">
                Professional boxing and Muay Thai equipment to match your
                training intensity. Quality gear for serious fighters.
              </p>

              {/* Value Props */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10 text-sm">
                <div className="rounded-2xl bg-neutral-900/60 p-4 ring-1 ring-secondary hover:bg-primary-light/10 transition">
                  <p className="font-semibold text-secondary">
                    Combat-Grade Quality
                  </p>
                  <p className="text-neutral-400 mt-1">
                    Built to last through intense sessions
                  </p>
                </div>
                <div className="rounded-2xl bg-neutral-900/60 p-4 ring-1 ring-secondary hover:bg-primary-light/10 transition">
                  <p className="font-semibold text-secondary">
                    Trusted by Fighters
                  </p>
                  <p className="text-neutral-400 mt-1">
                    Equipment used in real training
                  </p>
                </div>
                <div className="rounded-2xl bg-neutral-900/60 p-4 ring-1 ring-secondary hover:bg-primary-light/10 transition">
                  <p className="font-semibold text-secondary">
                    Delivered Direct
                  </p>
                  <p className="text-neutral-400 mt-1">
                    Fast shipping to your door
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Shop by Category */}
          <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 bg-neutral-900/30">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-neutral-100 mb-2">
                Shop by Category
              </h2>
              <p className="text-neutral-400">
                Browse our complete range of equipment
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const productCount = products.filter(
                  (p) => p.category === category.id
                ).length;
                return (
                  <a
                    key={category.id}
                    href={`/shop/${category.id}`}
                    className="group relative bg-neutral-900 rounded-2xl overflow-hidden ring-1 ring-neutral-800
                         hover:ring-secondary transition-all duration-300"
                  >
                    <div className="relative aspect4/3 overflow-hidden bg-neutral-800">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-neutral-100 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-neutral-400 mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary font-medium">
                          {productCount}{" "}
                          {productCount === 1 ? "product" : "products"}
                        </span>
                        <ArrowRight className="h-5 w-5 text-secondary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Featured Products */}
          {featuredProducts.length > 0 && (
            <section className="mx-auto max-w-7xl px-6 py-16 md:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-100 mb-2">
                    Featured Products
                  </h2>
                  <p className="text-neutral-400">
                    Hot deals and special offers
                  </p>
                </div>
                <a
                  href="/shop/gloves"
                  className="text-secondary hover:text-secondary/80 transition font-medium flex items-center gap-2"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
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

                      {/* Status Badge - top-left like Playwell */}
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
                      {/* Brand & Category */}
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-secondary font-medium">
                          {product.category}
                        </span>
                        {product.brand && (
                          <span className="text-xs text-neutral-500">
                            {product.brand}
                          </span>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3 className="text-xl font-bold text-neutral-100 mb-2 line-clamp-2 min-h-14">
                        {product.name}
                      </h3>

                      {/* Description */}
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
                            {product.category === "gloves"
                              ? "Click to select weight"
                              : "Click to select size"}
                          </span>
                        </div>
                      )}

                      {/* Stock Level */}
                      {product.stockQuantity !== undefined &&
                        product.inStock && (
                          <div className="mb-3">
                            <span
                              className={`text-xs font-medium ${
                                product.stockQuantity > 10
                                  ? "text-green-500"
                                  : product.stockQuantity > 5
                                  ? "text-yellow-500"
                                  : "text-orange-500"
                              }`}
                            >
                              {product.stockQuantity > 10
                                ? "In Stock"
                                : product.stockQuantity > 5
                                ? `Only ${product.stockQuantity} left`
                                : `Low Stock: ${product.stockQuantity} remaining`}
                            </span>
                          </div>
                        )}

                      {/* Price & Action */}
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
                            // Navigate to product detail page
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
            </section>
          )}

          {/* New Arrivals */}
          {newArrivals.length > 0 && (
            <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 bg-neutral-900/30">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-100 mb-2">
                    New Arrivals
                  </h2>
                  <p className="text-neutral-400">
                    Latest additions to our collection
                  </p>
                </div>
                <a
                  href="/shop/accessories"
                  className="text-secondary hover:text-secondary/80 transition font-medium flex items-center gap-2"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newArrivals.map((product) => (
                  <a
                    key={product.id}
                    href={`/shop/product/${product.id}`}
                    className="group bg-neutral-900 rounded-2xl overflow-hidden ring-1 ring-neutral-800 hover:ring-secondary transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-neutral-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-green-600 text-white">
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-xs uppercase tracking-wider text-secondary font-medium">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-100 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-neutral-100">
                          £{product.price.toFixed(2)}
                        </span>
                        <span className="text-secondary font-medium flex items-center gap-1">
                          View <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
