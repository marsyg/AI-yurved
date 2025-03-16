"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Star, Filter, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock product data based on dosha types
const mockProducts = {
  supplements: [
    {
      id: 1,
      name: "Vata Balance",
      description: "Herbal supplement to balance Vata dosha with warming herbs",
      price: 39.99,
      rating: 4.8,
      imageUrl: "/placeholder.svg?height=200&width=200",
      tag: "Best Seller",
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
      doshaType: ["kapha", "pitta-kapha"],
    },
    {
      id: 4,
      name: "Tridosha Balance",
      description: "Universal balance formula suitable for all constitution types",
      price: 45.99,
      rating: 4.6,
      imageUrl: "/placeholder.svg?height=200&width=200",
      tag: "",
      doshaType: ["vata", "pitta", "kapha", "vata-pitta", "pitta-kapha", "vata-kapha"],
    },
  ],
  oils: [
    {
      id: 5,
      name: "Warming Massage Oil",
      description: "Sesame-based oil with warming herbs for Vata pacification",
      price: 28.99,
      rating: 4.9,
      imageUrl: "/placeholder.svg?height=200&width=200",
      tag: "Best Seller",
      doshaType: ["vata", "vata-pitta"],
    },
    {
      id: 6,
      name: "Cooling Massage Oil",
      description: "Coconut-based oil with cooling herbs for Pitta pacification",
      price: 32.99,
      rating: 4.8,
      imageUrl: "/placeholder.svg?height=200&width=200",
      tag: "",
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
      doshaType: ["vata", "pitta", "kapha", "vata-pitta", "pitta-kapha", "vata-kapha"],
    },
  ],
  teas: [
    {
      id: 9,
      name: "Vata Calming Tea",
      description: "Warm spice blend with ginger and cinnamon to calm Vata",
      price: 18.99,
      rating: 4.8,
      imageUrl: "/placeholder.svg?height=200&width=200",
      tag: "Best Seller",
      doshaType: ["vata", "vata-pitta", "vata-kapha"],
    },
    {
      id: 10,
      name: "Pitta Cooling Tea",
      description: "Mint and rose petal blend to cool and calm Pitta",
      price: 17.99,
      rating: 4.6,
      imageUrl: "/placeholder.svg?height=200&width=200",
      tag: "",
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
      doshaType: ["vata", "pitta", "kapha", "vata-pitta", "pitta-kapha", "vata-kapha"],
    },
  ],
}

export default function ProductRecommendations({ doshaType }: { doshaType: string }) {
  const [sortOption, setSortOption] = useState("recommended")

  // Filter products based on dosha type
  const filterProductsByDosha = (products: any[], dosha: string) => {
    return products.filter((product) => product.doshaType.includes(dosha))
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
        <div className="flex items-center gap-2">
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
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-700" onClick={() => setSortOption("rating")}>
                Highest Rated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="supplements" className="space-y-4">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="supplements" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            Supplements
          </TabsTrigger>
          <TabsTrigger value="oils" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            Massage Oils
          </TabsTrigger>
          <TabsTrigger value="teas" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
            Herbal Teas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="supplements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterProductsByDosha(mockProducts.supplements, doshaType).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="oils" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterProductsByDosha(mockProducts.oils, doshaType).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="teas" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filterProductsByDosha(mockProducts.teas, doshaType).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const [isWishlist, setIsWishlist] = useState(false)

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

