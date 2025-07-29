import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Star, Gift, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface VoucherOffer {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  validUntil: string;
  terms: string[];
  rating: number;
  reviewCount: number;
}

// Mock data for Highlands Coffee only (as requested)
const mockOffers: Record<string, VoucherOffer[]> = {
  "highlands-coffee": [
    {
      id: "hc-1",
      title: "20% Off Any Coffee",
      description: "Get 20% discount on any coffee beverage. Valid for dine-in and takeaway.",
      pointsCost: 500,
      originalPrice: 65000,
      discountedPrice: 52000,
      discountPercentage: 20,
      validUntil: "2024-12-31",
      terms: [
        "Valid for one-time use only",
        "Cannot be combined with other offers",
        "Valid at all Highlands Coffee locations",
        "Not applicable for delivery orders"
      ],
      rating: 4.8,
      reviewCount: 1250
    },
    {
      id: "hc-2",
      title: "Buy 1 Get 1 Free Coffee",
      description: "Purchase any coffee and get another coffee of equal or lesser value for free.",
      pointsCost: 800,
      originalPrice: 130000,
      discountedPrice: 65000,
      discountPercentage: 50,
      validUntil: "2024-11-30",
      terms: [
        "Free coffee must be of equal or lesser value",
        "Valid for dine-in only",
        "Available Monday to Friday only",
        "Valid until 3 PM"
      ],
      rating: 4.9,
      reviewCount: 980
    },
    {
      id: "hc-3",
      title: "Free Pastry with Coffee",
      description: "Get a free pastry with any coffee purchase. Choose from croissants, muffins, or cookies.",
      pointsCost: 400,
      originalPrice: 45000,
      discountedPrice: 0,
      discountPercentage: 100,
      validUntil: "2024-10-31",
      terms: [
        "Valid with any coffee purchase",
        "One pastry per coffee",
        "Subject to availability",
        "Valid for dine-in and takeaway"
      ],
      rating: 4.7,
      reviewCount: 756
    },
    {
      id: "hc-4",
      title: "30% Off Premium Drinks",
      description: "Get 30% off on premium beverages including specialty lattes and frappes.",
      pointsCost: 600,
      originalPrice: 85000,
      discountedPrice: 59500,
      discountPercentage: 30,
      validUntil: "2024-12-15",
      terms: [
        "Valid on premium drink menu only",
        "Cannot be used during happy hour",
        "Valid at participating locations",
        "Maximum discount of 50,000 VND"
      ],
      rating: 4.6,
      reviewCount: 432
    }
  ]
};

const merchantNames: Record<string, string> = {
  "highlands-coffee": "Highlands Coffee"
};

const VoucherOffers = () => {
  const { merchantId } = useParams<{ merchantId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const merchantName = merchantId ? merchantNames[merchantId] : "Unknown Merchant";
  const offers = merchantId ? mockOffers[merchantId] || [] : [];

  const handleRedeemOffer = (offer: VoucherOffer) => {
    toast({
      title: "Voucher Redeemed!",
      description: `You have successfully redeemed "${offer.title}" for ${offer.pointsCost} points.`,
    });
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} VND`;
  };

  if (!merchantId || offers.length === 0) {
    return (
      <div className="min-h-screen bg-background">
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
                <h1 className="text-xl font-semibold">{merchantName}</h1>
                <p className="text-sm text-muted-foreground">Voucher offers</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12 text-center">
          <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No offers available</h2>
          <p className="text-muted-foreground mb-6">
            This merchant doesn't have any voucher offers at the moment.
          </p>
          <Button onClick={() => navigate(-1)}>
            Back to Merchants
          </Button>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center gap-3">
              <Coffee className="w-8 h-8 text-amber-600" />
              <div>
                <h1 className="text-xl font-semibold">{merchantName}</h1>
                <p className="text-sm text-muted-foreground">{offers.length} voucher offers available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{offer.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{offer.rating}</span>
                          <span className="text-sm text-muted-foreground">({offer.reviewCount})</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {offer.discountPercentage}% OFF
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{offer.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(offer.discountedPrice)}
                      </span>
                      {offer.originalPrice > offer.discountedPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(offer.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Valid until {offer.validUntil}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Terms & Conditions:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {offer.terms.map((term, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="sm:w-32 flex flex-col items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{offer.pointsCost}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                  <Button 
                    onClick={() => handleRedeemOffer(offer)}
                    className="w-full sm:w-auto"
                  >
                    Redeem
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoucherOffers;