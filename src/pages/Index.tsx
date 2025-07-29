import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { 
  Home, 
  CreditCard, 
  Wallet, 
  Gift, 
  Scan,
  Plus,
  ChevronRight,
  Star,
  QrCode,
  TrendingUp,
  TrendingDown,
  Settings
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [showQrCode, setShowQrCode] = useState(false);
  const [scanningCard, setScanningCard] = useState<string | null>(null);
  const [totalPoints, setTotalPoints] = useState(5489);
  const { toast } = useToast();

  const wallets = [
    { name: "VietinBank", balance: 2450000, displayBalance: "2,450,000 VND", color: "bg-blue-500" },
    { name: "Techcombank", balance: 1280000, displayBalance: "1,280,000 VND", color: "bg-red-500" },
    { name: "BIDV", balance: 890000, displayBalance: "890,000 VND", color: "bg-green-500" },
    { name: "MB Bank", balance: 650000, displayBalance: "650,000 VND", color: "bg-purple-500" },
    { name: "ACB", balance: 420000, displayBalance: "420,000 VND", color: "bg-orange-500" },
    { name: "Sacombank", balance: 320000, displayBalance: "320,000 VND", color: "bg-teal-500" },
  ];

  // Calculate total wealth
  const totalWealth = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  // Mock wealth history data for the chart
  const wealthHistory = [
    { date: "Jan", amount: 5200000 },
    { date: "Feb", amount: 5450000 },
    { date: "Mar", amount: 5320000 },
    { date: "Apr", amount: 5680000 },
    { date: "May", amount: 5890000 },
    { date: "Jun", amount: 6010000 },
  ];

  const chartConfig = {
    amount: {
      label: "Total Wealth",
      color: "hsl(var(--primary))",
    },
  };

  const loyaltyCards = [
    { name: "Circle K", points: "1,245", tier: "Gold", color: "bg-red-600", expiry: "Dec 2024", offers: "20% off coffee", cashback: "5%" },
    { name: "7-Eleven", points: "892", tier: "Silver", color: "bg-orange-600", expiry: "Jan 2025", offers: "Buy 2 Get 1 Free", cashback: "3%" },
    { name: "Highlands Coffee", points: "567", tier: "Bronze", color: "bg-brown-600", expiry: "Nov 2024", offers: "Free pastry", cashback: "4%" },
    { name: "Lotte Mart", points: "2,341", tier: "Platinum", color: "bg-blue-600", expiry: "Mar 2025", offers: "10% store discount", cashback: "6%" },
    { name: "Vinmart", points: "445", tier: "Silver", color: "bg-green-600", expiry: "Feb 2025", offers: "Free delivery", cashback: "3%" },
    { name: "The Coffee House", points: "723", tier: "Gold", color: "bg-amber-600", expiry: "Jan 2025", offers: "Happy hour 50%", cashback: "4%" },
  ];

  const toggleCardFlip = (index: number) => {
    const newFlippedCards = new Set(flippedCards);
    if (newFlippedCards.has(index)) {
      newFlippedCards.delete(index);
    } else {
      newFlippedCards.add(index);
    }
    setFlippedCards(newFlippedCards);
  };

  const handleScan = (cardName: string) => {
    setScanningCard(cardName);
    setShowQrCode(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setShowQrCode(false);
      setScanningCard(null);
      setTotalPoints(prev => prev + 10);
      toast({
        title: "Scan Successful!",
        description: `${cardName}: +10 points added to your rewards`,
      });
    }, 3000);
  };

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-white text-lg font-semibold">My Balance</h3>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Plus className="w-4 h-4 mr-1" />
              Open Physical Card
            </Button>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Balance</p>
              <h2 className="text-2xl font-bold">5,690,000 VND</h2>
              <p className="text-blue-100 text-sm mt-1">+245 points today</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="bg-white/20 text-white">
                Cashback: 2.5%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Wallets */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">My Wallets</h3>
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {wallets.map((wallet, index) => (
            <Card key={index} className="min-w-[160px] cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className={`w-8 h-8 rounded-lg ${wallet.color} mb-2`}></div>
                <p className="font-medium text-sm">{wallet.name}</p>
                <p className="text-xs text-muted-foreground">{wallet.displayBalance}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* My Loyalty Cards */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">My Loyalty Cards</h3>
          <Button variant="ghost" size="sm" onClick={() => setActiveTab("loyalty")}>
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {loyaltyCards.slice(0, 6).map((card, index) => (
            <div 
              key={index} 
              className="relative h-32 cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => toggleCardFlip(index)}
            >
              <div 
                className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
                  flippedCards.has(index) ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of card */}
                <Card className="absolute inset-0 backface-hidden border-0 shadow-md">
                  <CardContent className="p-3 h-full flex flex-col justify-between">
                    <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center`}>
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-xs mb-1">{card.name}</p>
                      <p className="text-xs text-muted-foreground">{card.points} pts</p>
                      <Badge variant="secondary" className="text-xs px-1 py-0 mt-1">
                        {card.tier}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Back of card */}
                <Card className="absolute inset-0 backface-hidden rotate-y-180 border-0 shadow-md bg-gradient-to-br from-gray-50 to-gray-100">
                  <CardContent className="p-3 h-full flex flex-col justify-between text-xs">
                    <div>
                      <p className="font-medium text-xs mb-2">{card.name}</p>
                      <div className="space-y-1">
                        <p className="text-xs"><span className="font-medium">Offer:</span> {card.offers}</p>
                        <p className="text-xs"><span className="font-medium">Cashback:</span> {card.cashback}</p>
                        <p className="text-xs"><span className="font-medium">Expires:</span> {card.expiry}</p>
                      </div>
                    </div>
                    <Button size="sm" className="h-6 text-xs">
                      Use Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 flex-col space-y-1">
          <Scan className="w-6 h-6" />
          <span className="text-sm">Scan & Pay</span>
        </Button>
        <Button variant="outline" className="h-16 flex-col space-y-1">
          <CreditCard className="w-6 h-6" />
          <span className="text-sm">Transfer</span>
        </Button>
      </div>
    </div>
  );

  const renderLoyaltyTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Loyalty Cards</h3>
        <Button variant="ghost" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Card
        </Button>
      </div>
      
      {showQrCode && (
        <Card className="border-2 border-dashed border-primary">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <QrCode className="w-32 h-32 text-primary animate-pulse" />
              <div>
                <p className="font-semibold">Scanning {scanningCard}...</p>
                <p className="text-sm text-muted-foreground">Hold your phone steady</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {loyaltyCards.map((card, index) => (
        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}>
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">{card.name}</p>
                  <p className="text-sm text-muted-foreground">{card.points} points • {card.tier}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleScan(card.name)}
                  disabled={showQrCode}
                >
                  Scan
                </Button>
                <Button size="sm">Redeem</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderWalletsTab = () => (
    <div className="space-y-6">
      {/* Wealth Analytics */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Total Wealth</CardTitle>
            <div className="flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+8.2%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-2xl font-bold">{totalWealth.toLocaleString()} VND</p>
            <p className="text-sm text-muted-foreground">+480,000 VND this month</p>
          </div>
          
          <div className="h-48">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wealthHistory} margin={{ top: 5, right: 5, left: 5, bottom: 15 }}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    height={15}
                  />
                  <YAxis hide />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${Number(value).toLocaleString()} VND`, "Total Wealth"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Budget Management - Beta Feature */}
      <Card className="border-dashed border-2 border-orange-200 bg-orange-50/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium">Budget Management</p>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                    BETA
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Track spending & set limits</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100">
              Try Beta
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Grid - 3x2 Layout */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">My Wallets</h3>
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Link Wallet
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {wallets.map((wallet, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className={`w-8 h-8 rounded-lg ${wallet.color} mx-auto`}></div>
                  <div className="text-center">
                    <p className="font-medium text-xs">{wallet.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(wallet.balance / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRewardsTab = () => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Available Points</h3>
            <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
            <p className="text-green-100 text-sm mt-1">≈ {(totalPoints * 10).toLocaleString()} VND value</p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Redeem Rewards</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-medium text-sm">Vouchers</p>
              <p className="text-xs text-muted-foreground">50+ available</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-medium text-sm">Cashback</p>
              <p className="text-xs text-muted-foreground">Direct to wallet</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "home": return renderHomeTab();
      case "loyalty": return renderLoyaltyTab();
      case "wallets": return renderWalletsTab();
      case "rewards": return renderRewardsTab();
      default: return renderHomeTab();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Olive</h1>
            <p className="text-sm text-muted-foreground">Good morning, User!</p>
          </div>
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex">
          {[
            { id: "home", icon: Home, label: "Home" },
            { id: "loyalty", icon: CreditCard, label: "Loyalty" },
            { id: "wallets", icon: Wallet, label: "Wallets" },
            { id: "rewards", icon: Gift, label: "Rewards" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 ${
                activeTab === tab.id ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <tab.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
