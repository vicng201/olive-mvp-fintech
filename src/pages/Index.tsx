import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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
  Settings,
  BarChart3
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
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

  // Mock recent transactions across all wallets
  const recentTransactions = [
    { 
      description: "Coffee Shop Purchase", 
      amount: -45000, 
      date: "2h ago", 
      walletName: "VietinBank", 
      walletColor: "bg-blue-500" 
    },
    { 
      description: "Salary Deposit", 
      amount: 15000000, 
      date: "1 day ago", 
      walletName: "Techcombank", 
      walletColor: "bg-red-500" 
    },
    { 
      description: "Grocery Shopping", 
      amount: -250000, 
      date: "2 days ago", 
      walletName: "BIDV", 
      walletColor: "bg-green-500" 
    },
    { 
      description: "Online Transfer", 
      amount: -500000, 
      date: "3 days ago", 
      walletName: "VietinBank", 
      walletColor: "bg-blue-500" 
    },
    { 
      description: "Gas Station", 
      amount: -120000, 
      date: "4 days ago", 
      walletName: "MB Bank", 
      walletColor: "bg-purple-500" 
    },
    { 
      description: "ATM Withdrawal", 
      amount: -1000000, 
      date: "5 days ago", 
      walletName: "ACB", 
      walletColor: "bg-orange-500" 
    },
    { 
      description: "Restaurant Payment", 
      amount: -180000, 
      date: "6 days ago", 
      walletName: "Sacombank", 
      walletColor: "bg-teal-500" 
    }
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
            <h3 className="text-white text-lg font-semibold">My Olive Points</h3>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Balance</p>
              <h2 className="text-2xl font-bold">{totalPoints.toLocaleString()} points = {(totalPoints * 10).toLocaleString()} VND</h2>
              <p className="text-blue-100 text-sm mt-1">+245 points today</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="bg-white/20 text-white">
                1 point = 10 VND
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 flex-col space-y-1" onClick={() => setActiveTab("loyalty")}>
          <Star className="w-6 h-6" />
          <span className="text-sm">Earn Points</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col space-y-1 bg-black/5 border-black/20 hover:bg-black/10 hover:border-black/30" 
          onClick={() => navigate("/cashout")}
        >
          <Wallet className="w-6 h-6 text-black" />
          <span className="text-sm text-black font-medium">Cash Out</span>
        </Button>
      </div>

      {/* My Wallets Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">My Wallets</h3>
          <Button variant="ghost" size="sm" onClick={() => setActiveTab("wallets")}>
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardContent className="p-4 bg-gray-50/50">
            <h4 className="font-medium text-sm mb-3">Recent Activity</h4>
            <div className="space-y-3">
              {recentTransactions.slice(0, 5).map((transaction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${transaction.walletColor} flex items-center justify-center`}>
                      <Wallet className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.walletName} • {transaction.date}</p>
                    </div>
                  </div>
                  <p className={`font-medium text-sm ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()} VND
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderWalletsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {wallets.map((wallet, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${wallet.color} flex items-center justify-center`}>
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{wallet.name}</h3>
                    <p className="text-xs text-muted-foreground">Balance</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{wallet.displayBalance}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => navigate("/wallet-detail", { state: { wallet } })}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLoyaltyTab = () => (
    <div className="space-y-6">
      {/* Scanning Animation */}
      {showQrCode && (
        <Card className="bg-black text-white border-0">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse">
              <QrCode className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Scanning {scanningCard}...</h3>
              <p className="text-gray-300">Present this QR code to earn points</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {loyaltyCards.map((card, index) => (
          <div
            key={index}
            className="relative w-full h-40 perspective-1000"
            onClick={() => toggleCardFlip(index)}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                flippedCards.has(index) ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front of Card */}
              <Card className={`absolute inset-0 w-full h-full ${card.color} text-white cursor-pointer backface-hidden`}>
                <CardContent className="p-4 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{card.name}</h3>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {card.tier}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{card.points} pts</p>
                    <p className="text-sm opacity-90">Expires: {card.expiry}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Back of Card */}
              <Card className={`absolute inset-0 w-full h-full ${card.color} text-white cursor-pointer backface-hidden rotate-y-180`}>
                <CardContent className="p-4 h-full flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold mb-2">Current Offer</h4>
                    <p className="text-sm mb-3">{card.offers}</p>
                    <p className="text-sm">Cashback: {card.cashback}</p>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScan(card.name);
                    }}
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    Scan to Earn
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button variant="outline" onClick={() => navigate("/voucher-offers")}>
          <Gift className="w-4 h-4 mr-2" />
          View Offers
        </Button>
        <Button variant="outline" onClick={() => navigate("/voucher-merchants")}>
          <ChevronRight className="w-4 h-4 mr-2" />
          All Merchants
        </Button>
      </div>
    </div>
  );

  const renderOlivePointsTab = () => (
    <div className="space-y-6">
      {/* Total Wealth Container */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-white text-lg font-semibold">Total Wealth</h3>
            <Badge variant="secondary" className="bg-white/20 text-white">
              All Accounts
            </Badge>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold mb-1">
                {totalWealth.toLocaleString()} VND
              </h2>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-200" />
                <span className="text-green-200 text-sm">+5.2% this month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wealth History Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Wealth Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wealthHistory}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Olive Wallet</h1>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "home" && renderHomeTab()}
        {activeTab === "wallets" && renderWalletsTab()}
        {activeTab === "loyalty" && renderLoyaltyTab()}
        {activeTab === "olivepoints" && renderOlivePointsTab()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            className="h-16 flex-col space-y-1 rounded-none"
            onClick={() => setActiveTab("home")}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant={activeTab === "wallets" ? "default" : "ghost"}
            className="h-16 flex-col space-y-1 rounded-none"
            onClick={() => setActiveTab("wallets")}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs">Wallets</span>
          </Button>
          <Button
            variant={activeTab === "loyalty" ? "default" : "ghost"}
            className="h-16 flex-col space-y-1 rounded-none"
            onClick={() => setActiveTab("loyalty")}
          >
            <Star className="w-5 h-5" />
            <span className="text-xs">Rewards</span>
          </Button>
          <Button
            variant={activeTab === "olivepoints" ? "default" : "ghost"}
            className="h-16 flex-col space-y-1 rounded-none"
            onClick={() => setActiveTab("olivepoints")}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">OlivePoints</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
