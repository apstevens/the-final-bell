import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import NavBar from "../components/NavBar";
import Cart from "../components/Cart";
import finalBellLogo from "../assets/finalBellLogo.png";
import { useCart, type GloveSize, type ClothingSize, type ShinguardSize, type HandWrapSize, type MMAGloveSize } from "../contexts/CartContext";

// This will be replaced with API data
import { products } from "../data/products";

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState<GloveSize | ClothingSize | ShinguardSize | HandWrapSize | MMAGloveSize | undefined>(undefined);

  const product = products.find((p) => p.id === Number(productId));

  useEffect(() => {
    if (!product) {
      navigate("/shop");
    }
    // Set default size if product has sizes
    if (product?.hasSizes && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0] as GloveSize | ClothingSize | ShinguardSize | HandWrapSize | MMAGloveSize);
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    // Validate size selection for products with sizes
    if (product.hasSizes && !selectedSize) {
      alert("Please select a size");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <NavBar logoSrc={finalBellLogo} />
      <Cart />

      {/* Breadcrumb Navigation */}
      <section className="mx-auto max-w-7xl px-6 pt-6 md:px-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-400">
          <a href="/" className="hover:text-secondary transition">
            Home
          </a>
          <ChevronRight className="h-4 w-4" />
          <a href="/shop" className="hover:text-secondary transition">
            Shop
          </a>
          <ChevronRight className="h-4 w-4" />
          <a
            href={`/shop/${product.category}`}
            className="hover:text-secondary transition capitalize"
          >
            {product.category}
          </a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-neutral-100 font-medium">{product.name}</span>
        </nav>
      </section>

      {/* Product Detail Section */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-neutral-900 rounded-2xl overflow-hidden ring-1 ring-neutral-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && product.inStock && (
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-lg ${
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
            </div>

            {/* Thumbnail Gallery (placeholder for future multiple images) */}
            <div className="grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map(
                (img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-neutral-900 rounded-lg overflow-hidden ring-1 transition ${
                      selectedImage === idx
                        ? "ring-secondary"
                        : "ring-neutral-800 hover:ring-neutral-700"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            {product.brand && (
              <div className="text-sm text-neutral-400">
                Brand: <span className="text-secondary">{product.brand}</span>
              </div>
            )}

            {/* Product Name */}
            <div>
              <h1 className="text-4xl font-bold text-neutral-100 mb-2">
                {product.name}
              </h1>
              <p className="text-sm uppercase tracking-wider text-secondary font-medium">
                {product.category}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              {product.specialPrice ? (
                <>
                  <span className="text-4xl font-bold text-red-500">
                    £{product.specialPrice.toFixed(2)}
                  </span>
                  <span className="text-2xl text-neutral-500 line-through">
                    £{product.price.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-lg">
                    Save £{(product.price - product.specialPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-neutral-100">
                  £{product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-500">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-semibold">In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="font-semibold">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-invert">
              <p className="text-neutral-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            {product.hasSizes && product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3 border-2 border-secondary/30 p-4 rounded-xl">
                <label className="text-base font-semibold text-neutral-100 block">
                  Select Size {product.category === "Boxing Gloves" ? "(Weight)" : ""}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={String(size)}
                      type="button"
                      onClick={() => setSelectedSize(size as GloveSize | ClothingSize | ShinguardSize)}
                      className={`px-6 py-3 rounded-lg font-semibold border-2 transition ${
                        selectedSize === size
                          ? "border-secondary bg-secondary text-neutral-950"
                          : "border-neutral-800 bg-neutral-900 text-neutral-100 hover:border-neutral-700"
                      }`}
                    >
                      {String(size)}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <p className="text-sm text-secondary">
                    Selected: {String(selectedSize)}
                  </p>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-neutral-300">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-neutral-900 rounded-lg
                           border border-neutral-800 hover:bg-neutral-800 transition font-semibold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-20 h-10 text-center bg-neutral-900 rounded-lg border border-neutral-800
                           text-neutral-100 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-neutral-900 rounded-lg
                           border border-neutral-800 hover:bg-neutral-800 transition font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2 ${
                  product.inStock
                    ? "bg-secondary text-neutral-950 hover:bg-secondary/90"
                    : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {addedToCart ? "Added to Cart!" : product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  className="py-3 rounded-xl font-medium border border-neutral-800
                           hover:bg-neutral-900 transition flex items-center justify-center gap-2"
                >
                  <Heart className="h-5 w-5" />
                  Wishlist
                </button>
                <button
                  className="py-3 rounded-xl font-medium border border-neutral-800
                           hover:bg-neutral-900 transition flex items-center justify-center gap-2"
                >
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-neutral-800 pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                <div>
                  <h4 className="font-semibold text-neutral-100">Fast Delivery</h4>
                  <p className="text-sm text-neutral-400">
                    Free UK shipping on orders over £50
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                <div>
                  <h4 className="font-semibold text-neutral-100">Quality Guaranteed</h4>
                  <p className="text-sm text-neutral-400">
                    Authentic products from trusted brands
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                <div>
                  <h4 className="font-semibold text-neutral-100">Easy Returns</h4>
                  <p className="text-sm text-neutral-400">
                    30-day return policy on all items
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 border-t border-neutral-800">
          <h2 className="text-3xl font-bold text-neutral-100 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <a
                key={relatedProduct.id}
                href={`/shop/product/${relatedProduct.id}`}
                className="group bg-neutral-900 rounded-2xl overflow-hidden ring-1 ring-neutral-800
                         hover:ring-secondary transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-neutral-800">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-neutral-100 mb-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    {relatedProduct.specialPrice ? (
                      <div className="flex flex-col">
                        <span className="text-sm text-neutral-500 line-through">
                          £{relatedProduct.price.toFixed(2)}
                        </span>
                        <span className="text-xl font-bold text-red-500">
                          £{relatedProduct.specialPrice.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-neutral-100">
                        £{relatedProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
