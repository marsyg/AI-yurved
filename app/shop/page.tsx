"use client"

import { useState } from "react"
import DashboardHeader from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, Filter, ChevronDown, Heart, Star, Grid3X3, List } from "lucide-react"

// Mock product data
const products = [
  {
    id: 1,
    name: "Vata Balance",
    description: "Herbal supplement to balance Vata dosha with warming herbs",
    price: 39.99,
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "Best Seller",
    category: "supplements",
    doshaType: ["vata", "vata-pitta"],
  },
  {
    id: 2,
    name: "Pitta Calm",
    description: "Cooling herbs to balance Pitta dosha and reduce inflammation",
    price: 42.99,
    rating: 4.7,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "Popular",
    category: "supplements",
    doshaType: ["pitta", "vata-pitta"],
  },
  {
    id: 3,
    name: "Kapha Energize",
    description: "Stimulating formula to balance Kapha dosha and boost metabolism",
    price: 36.99,
    rating: 4.5,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "New",
    category: "supplements",
    doshaType: ["kapha", "pitta-kapha"],
  },
  {
    id: 4,
    name: "Tridosha Balance",
    description: "Universal balance formula suitable for all constitution types",
    price: 45.99,
    rating: 4.6,
    imageUrl: "/placeholder.svg?height=200&width=200",
    category: "supplements",
    doshaType: ["vata", "pitta", "kapha", "vata-pitta", "pitta-kapha", "vata-kapha"],
  },
  {
    id: 5,
    name: "Warming Massage Oil",
    description: "Sesame-based oil with warming herbs for Vata pacification",
    price: 28.99,
    rating: 4.9,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "Best Seller",
    category: "oils",
    doshaType: ["vata", "vata-pitta"],
  },
  {
    id: 6,
    name: "Cooling Massage Oil",
    description: "Coconut-based oil with cooling herbs for Pitta pacification",
    price: 32.99,
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=200&width=200",
    category: "oils",
    doshaType: ["pitta", "vata-pitta", "pitta-kapha"],
  },
  {
    id: 7,
    name: "Revitalizing Massage Oil",
    description: "Mustard-based oil with stimulating herbs for Kapha pacification",
    price: 29.99,
    rating: 4.7,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "New",
    category: "oils",
    doshaType: ["kapha", "pitta-kapha", "vata-kapha"],
  },
  {
    id: 8,
    name: "Tri-Dosha Massage Oil",
    description: "Balanced oil suitable for all constitution types",
    price: 34.99,
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "Popular",
    category: "oils",
    doshaType: ["vata", "pitta", "kapha", "vata-pitta", "pitta-kapha", "vata-kapha"],
  },
  {
    id: 9,
    name: "Vata Calming Tea",
    description: "Warm spice blend with ginger and cinnamon to calm Vata",
    price: 18.99,
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "Best Seller",
    category: "teas",
    doshaType: ["vata", "vata-pitta", "vata-kapha"],
  },
  {
    id: 10,
    name: "Pitta Cooling Tea",
    description: "Mint and rose petal blend to cool and calm Pitta",
    price: 17.99,
    rating: 4.6,
    imageUrl: "/placeholder.svg?height=200&width=200",
    category: "teas",
    doshaType: ["pitta", "vata-pitta", "pitta-kapha"],
  },
  {
    id: 11,
    name: "Kapha Stimulating Tea",
    description: "Spicy ginger and black pepper blend to energize Kapha",
    price: 16.99,
    rating: 4.7,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "New",
    category: "teas",
    doshaType: ["kapha", "pitta-kapha", "vata-kapha"],
  },
  {
    id: 12,
    name: "Digestive Support Tea",
    description: "Universal tea blend to support digestion for all doshas",
    price: 19.99,
    rating: 4.9,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "Popular",
    category: "teas",
    doshaType: ["vata", "pitta", "kapha", "vata-pitta", "pitta-kapha", "vata-kapha"],
  },
  {
    id: 13,
    name: "Ashwagandha Root",
    description: "Organic Ashwagandha root powder for stress relief and vitality",
    price: 24.99,
    rating: 4.9,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "Best Seller",
    category: "herbs",
    doshaType: ["vata", "kapha"],
  },
  {
    id: 14,
    name: "Triphala Powder",
    description: "Traditional blend of three fruits for digestive health",
    price: 22.99,
    rating: 4.7,
    imageUrl: "/placeholder.svg?height=200&width=200",
    category: "herbs",
    doshaType: ["vata", "pitta", "kapha"],
  },
  {
    id: 15,
    name: "Brahmi Powder",
    description: "Memory and cognitive support herb for mental clarity",
    price: 26.99,
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=200&width=200",
    category: "herbs",
    doshaType: ["pitta", "vata"],
  },
  {
    id: 16,
    name: "Turmeric Root",
    description: "Organic turmeric powder with high curcumin content",
    price: 19.99,
    rating: 4.9,
    imageUrl: "/placeholder.svg?height=200&width=200",
    tag: "Popular",
    category: "herbs",
    doshaType: ["vata", "pitta", "kapha"],
  },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDosha, setSelectedDosha] = useState("all")
  const [sortOption, setSortOption] = useState("recommended")
  const [viewMode, setViewMode] = useState("grid")

  // Filter products based on search, category, and dosha
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesDosha = selectedDosha === "all" || product.doshaType.includes(selectedDosha)

    return matchesSearch && matchesCategory && matchesDosha
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price
    if (sortOption === "price-high") return b.price - a.price
    if (sortOption === "rating") return b.rating - a.rating
    // Default: recommended
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <DashboardHeader />

      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Ayurvedic Shop</h1>
            <p className="text-slate-400">Personalized products for your unique constitution</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-slate-700 bg-slate-800 text-slate-200"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-slate-700 bg-slate-800 text-slate-200"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/60 border-slate-700">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search products..."
                      className="pl-8 bg-slate-900 border-slate-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="supplements">Supplements</SelectItem>
                      <SelectItem value="oils">Massage Oils</SelectItem>
                      <SelectItem value="teas">Herbal Teas</SelectItem>
                      <SelectItem value="herbs">Herbs & Powders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Dosha Type</label>
                  <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue placeholder="Select dosha" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="all">All Doshas</SelectItem>
                      <SelectItem value="vata">Vata</SelectItem>
                      <SelectItem value="pitta">Pitta</SelectItem>
                      <SelectItem value="kapha">Kapha</SelectItem>
                      <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                      <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                      <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="bg-slate-900 border-slate-700">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-slate-400">{sortedProducts.length} products found</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-slate-700 bg-slate-800 text-slate-200">
                    <Filter className="mr-2 h-4 w-4" />
                    Sort by
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-700"
                    onClick={() => setSortOption("recommended")}
                  >
                    Recommended
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-700"
                    onClick={() => setSortOption("price-low")}
                  >
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-700"
                    onClick={() => setSortOption("price-high")}
                  >
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-700"
                    onClick={() => setSortOption("rating")}
                  >
                    Highest Rated
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {sortedProducts.length > 0 ? (
              <div
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
              >
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <Card className="bg-slate-800/60 border-slate-700 p-8 text-center">
                <p className="text-slate-400 mb-4">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="border-slate-700 hover:bg-slate-700"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedDosha("all")
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, viewMode }: { product: any; viewMode: string }) {
  const [isWishlist, setIsWishlist] = useState(false)

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden bg-slate-800/60 border-slate-700 text-white">
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/3">
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 md:h-full object-cover bg-slate-700"
            />
            <button
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-slate-900/60 flex items-center justify-center hover:bg-slate-800"
              onClick={() => setIsWishlist(!isWishlist)}
            >
              <Heart className={`h-4 w-4 ${isWishlist ? "fill-red-500 text-red-500" : "text-white"}`} />
            </button>
            {product.tag && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-emerald-500 text-white text-xs font-medium">
                {product.tag}
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col justify-between md:w-2/3">
            <div>
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-400 ml-2">{product.rating}</span>
              </div>
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.doshaType.map((dosha: string) => (
                  <Badge
                    key={dosha}
                    variant="outline"
                    className="bg-slate-700/50 hover:bg-slate-700/70 text-emerald-300 border-emerald-800"
                  >
                    {dosha.charAt(0).toUpperCase() + dosha.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-bold text-lg">${product.price}</div>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden bg-slate-800/60 border-slate-700 text-white">
      <div className="relative">
        <img
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover bg-slate-700"
        />
        <button
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-slate-900/60 flex items-center justify-center hover:bg-slate-800"
          onClick={() => setIsWishlist(!isWishlist)}
        >
          <Heart className={`h-4 w-4 ${isWishlist ? "fill-red-500 text-red-500" : "text-white"}`} />
        </button>
        {product.tag && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-emerald-500 text-white text-xs font-medium">
            {product.tag}
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-400 ml-2">{product.rating}</span>
        </div>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-slate-400 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="font-bold text-lg">${product.price}</div>
          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

