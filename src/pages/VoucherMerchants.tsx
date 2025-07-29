import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Store, Coffee, Utensils, ShoppingBag, Smartphone, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Merchant {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
}

const merchants: Merchant[] = [
  { id: "highlands-coffee", name: "Highlands Coffee", category: "Coffee", description: "Premium Vietnamese coffee chain", icon: <Coffee className="w-8 h-8 text-amber-600" /> },
  { id: "trung-nguyen", name: "Trung Nguyen", category: "Coffee", description: "Famous Vietnamese coffee brand", icon: <Coffee className="w-8 h-8 text-amber-700" /> },
  { id: "the-coffee-house", name: "The Coffee House", category: "Coffee", description: "Popular coffee chain", icon: <Coffee className="w-8 h-8 text-amber-500" /> },
  { id: "cong-caphe", name: "Cong Caphe", category: "Coffee", description: "Traditional Vietnamese coffee style", icon: <Coffee className="w-8 h-8 text-green-600" /> },
  { id: "lotteria", name: "Lotteria", category: "Food", description: "Fast food restaurant chain", icon: <Utensils className="w-8 h-8 text-red-500" /> },
  { id: "kfc-vietnam", name: "KFC Vietnam", category: "Food", description: "Fried chicken restaurant", icon: <Utensils className="w-8 h-8 text-red-600" /> },
  { id: "pizza-hut", name: "Pizza Hut", category: "Food", description: "Italian-American pizza chain", icon: <Utensils className="w-8 h-8 text-red-700" /> },
  { id: "jollibee", name: "Jollibee", category: "Food", description: "Filipino fast food chain", icon: <Utensils className="w-8 h-8 text-orange-500" /> },
  { id: "big-c", name: "Big C", category: "Retail", description: "Hypermarket chain", icon: <ShoppingBag className="w-8 h-8 text-blue-600" /> },
  { id: "aeon", name: "AEON", category: "Retail", description: "Japanese shopping mall", icon: <ShoppingBag className="w-8 h-8 text-purple-600" /> },
  { id: "vinmart", name: "VinMart", category: "Retail", description: "Vietnamese supermarket chain", icon: <ShoppingBag className="w-8 h-8 text-green-600" /> },
  { id: "coopmart", name: "Co.opmart", category: "Retail", description: "Cooperative supermarket", icon: <ShoppingBag className="w-8 h-8 text-blue-500" /> },
  { id: "canifa", name: "Canifa", category: "Fashion", description: "Vietnamese fashion brand", icon: <ShoppingBag className="w-8 h-8 text-pink-600" /> },
  { id: "ivy-moda", name: "IVY moda", category: "Fashion", description: "Fashion and lifestyle brand", icon: <ShoppingBag className="w-8 h-8 text-purple-500" /> },
  { id: "fpt-shop", name: "FPT Shop", category: "Technology", description: "Electronics retail chain", icon: <Smartphone className="w-8 h-8 text-orange-600" /> },
  { id: "cellphones", name: "CellphoneS", category: "Technology", description: "Mobile phone retailer", icon: <Smartphone className="w-8 h-8 text-blue-600" /> },
  { id: "thegioididong", name: "Thế Giới Di Động", category: "Technology", description: "Mobile and electronics store", icon: <Smartphone className="w-8 h-8 text-green-600" /> },
  { id: "grab", name: "Grab", category: "Services", description: "Ride-hailing and delivery service", icon: <Car className="w-8 h-8 text-green-500" /> },
  { id: "be", name: "Be", category: "Services", description: "Vietnamese ride-hailing app", icon: <Car className="w-8 h-8 text-yellow-500" /> },
  { id: "vietjet", name: "Vietjet", category: "Services", description: "Low-cost airline", icon: <Car className="w-8 h-8 text-red-500" /> },
];

const VoucherMerchants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(merchants.map(m => m.category)));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Voucher Merchants</h1>
              <p className="text-sm text-muted-foreground">Choose a merchant to redeem vouchers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search merchants or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={searchTerm === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchTerm("")}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={searchTerm.toLowerCase() === category.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchTerm(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Merchants List */}
        <div className="space-y-3">
          {filteredMerchants.map((merchant) => (
            <Card 
              key={merchant.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/vouchers/${merchant.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {merchant.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium truncate">{merchant.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {merchant.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{merchant.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <Store className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMerchants.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No merchants found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoucherMerchants;