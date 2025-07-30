import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ComposedChart, Bar } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  // Mock data for Points Analytics Tab
  const pointsHistory = [
    { date: "Mon", earned: 120, redeemed: 80, cashout: 50 },
    { date: "Tue", earned: 150, redeemed: 60, cashout: 30 },
    { date: "Wed", earned: 200, redeemed: 100, cashout: 70 },
    { date: "Thu", earned: 180, redeemed: 90, cashout: 40 },
    { date: "Fri", earned: 220, redeemed: 110, cashout: 80 },
    { date: "Sat", earned: 160, redeemed: 70, cashout: 60 },
    { date: "Sun", earned: 140, redeemed: 85, cashout: 45 },
  ];

  const recentPointActivities = [
    { merchant: "Circle K", action: "Purchase scan", points: 25, date: "2 hours ago" },
    { merchant: "Lotte Mart", action: "Weekly bonus", points: 100, date: "1 day ago" },
    { merchant: "Highlands Coffee", action: "Purchase scan", points: 15, date: "2 days ago" },
    { merchant: "Voucher Redemption", action: "Coffee voucher used", points: -150, date: "3 days ago" },
    { merchant: "7-Eleven", action: "Purchase scan", points: 20, date: "4 days ago" },
    { merchant: "Cash Out", action: "Bank transfer", points: -500, date: "5 days ago" },
  ];

  const activeVouchers = [
    {
      title: "Free Coffee",
      description: "Any size coffee at participating stores",
      cost: "150",
      expiry: "Dec 15",
      logo: "☕"
    },
    {
      title: "20% Off Groceries",
      description: "Maximum discount 100,000 VND",
      cost: "300",
      expiry: "Dec 20",
      logo: "🛒"
    },
    {
      title: "Free Delivery",
      description: "Food delivery from partner restaurants",
      cost: "100",
      expiry: "Dec 25",
      logo: "🚚"
    },
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
      {/* My Olive Points Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">My Olive Points</h3>
          <Button variant="ghost" size="sm" onClick={() => setActiveTab("analytics")}>
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm">Total Balance</p>
                 <h2 className="text-2xl font-bold">{totalPoints.toLocaleString()} points</h2>
                 <p className="text-blue-100 text-sm">= {(totalPoints * 10).toLocaleString()} VND</p>
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
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Button className="h-16 flex-col space-y-1" onClick={() => setActiveTab("loyalty")}>
          <Star className="w-6 h-6" />
          <span className="text-sm">Earn Points</span>
        </Button>
        <Button 
          variant="secondary"
          className="h-16 flex-col space-y-1 bg-black text-white hover:bg-black/80" 
          onClick={() => navigate("/vouchers")}
        >
          <Gift className="w-6 h-6" />
          <span className="text-sm">Redeem </span>
        </Button>
        <Button 
          variant="secondary" 
          className="h-16 flex-col space-y-1 bg-black text-white hover:bg-black/80" 
          onClick={() => navigate("/cashout")}
        >
          <Wallet className="w-6 h-6 text-white" />
          <span className="text-sm text-white font-medium">Cash Out</span>
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
        
        {/* Total Wealth Summary */}
        <Card className="mb-4 bg-gradient-to-r from-orange-500 to-pink-500 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-100">Total Wealth</p>
                <p className="text-xl font-bold text-white">{totalWealth.toLocaleString()} VND</p>
              </div>
              <div className="flex items-center text-green-200">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">+8.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Wallets */}

        {/* Recent Transactions */}
        <Card>
          <CardContent className="p-4 bg-gray-50/50">
            <h4 className="font-medium text-sm mb-3">Recent Activity</h4>
            <div className="space-y-3">
              {recentTransactions.slice(0, 3).map((transaction, index) => (
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

      {/* My Loyalty Cards */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">My Loyalty Cards</h3>
          <Button variant="ghost" size="sm" onClick={() => setActiveTab("loyalty")}>
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {loyaltyCards.filter(card => ["Circle K", "Vinmart", "Lotte Mart"].includes(card.name)).map((card, index) => (
            <div 
              key={index} 
              className="relative h-32 min-w-[120px] cursor-pointer"
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

    </div>
  );

  const renderLoyaltyTab = () => (
    <div className="space-y-6">
      {/* Headline */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-foreground">Scan Loyalty Card To Earn Points!</h2>
      </div>

      {/* Loyalty Cards Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">My Loyalty Cards</h3>
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
                  <Scan className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        ))}
      </div>

      {/* Exclusive Loyalty Offer Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Exclusive Loyalty Offer</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/vouchers")}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-medium text-sm">Vouchers</p>
              <p className="text-xs text-muted-foreground">50+ available</p>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );

  const renderWalletsTab = () => (
    <div className="space-y-6">
      {/* Wealth Analytics */}
      <Card className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-white">Total Wealth</CardTitle>
            <div className="flex items-center text-green-200">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+8.2%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-2xl font-bold text-white">{totalWealth.toLocaleString()} VND</p>
            <p className="text-sm text-blue-100">+480,000 VND this month</p>
          </div>
          
          {/* Chart container with proper clipping and containment */}
          <div className="h-40 overflow-hidden relative border border-border/5 rounded-lg bg-card/50">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer 
                width="100%" 
                height="100%"
                minHeight={160}
              >
                <LineChart 
                  data={wealthHistory} 
                  margin={{ top: 12, right: 16, left: 16, bottom: 24 }}
                >
                  <defs>
                    <clipPath id="chart-clip">
                      <rect x="0" y="0" width="100%" height="100%" />
                    </clipPath>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    height={20}
                    interval="preserveStartEnd"
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
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 5, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                    clipPath="url(#chart-clip)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Spacing buffer between sections */}
      <div className="h-4"></div>

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
            <Button size="sm" variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-100" onClick={() => setActiveTab("analytics")}>
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
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/wallet/${wallet.name}`)}
            >
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className={`w-8 h-8 rounded-lg ${wallet.color} mx-auto`}></div>
                  <div className="text-center">
                    <p className="font-medium text-xs">{wallet.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {wallet.displayBalance}
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

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Extended Hero Card with KPIs and Chart */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-6 space-y-6">
          {/* Points Balance */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm">Total Balance</p>
              <h2 className="text-3xl font-bold">5,489 pts</h2>
              <p className="text-blue-100 text-sm">= 54,890 VND</p>
              
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="bg-white/20 text-white">
                1 pt = 10 VND
              </Badge>
            </div>
          </div>

          {/* KPI Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-blue-100 text-xs">Total Earned</p>
              <p className="text-xl font-semibold">2,450</p>
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-xs">Total Redeemed</p>
              <p className="text-xl font-semibold">1,200</p>
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-xs">Total Cash Out</p>
              <p className="text-xl font-semibold">1,000</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-blue-100 text-sm">Points Activity</p>
              <Select defaultValue="weekly">
                <SelectTrigger className="w-20 h-8 bg-white/20 border-white/30 text-white text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">D</SelectItem>
                  <SelectItem value="weekly">W</SelectItem>
                  <SelectItem value="monthly">M</SelectItem>
                  <SelectItem value="quarterly">Q</SelectItem>
                  <SelectItem value="yearly">Y</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Mini Chart */}
            <div className="h-32">
              <ChartContainer config={{
                earned: { label: "Earned", color: "hsl(var(--primary))" },
                redeemed: { label: "Redeemed", color: "hsl(var(--secondary))" },
                cashout: { label: "Cash Out", color: "hsl(var(--accent))" }
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={pointsHistory}>
                    <Bar dataKey="earned" fill="rgba(255,255,255,0.8)" radius={2} />
                    <Line type="monotone" dataKey="redeemed" stroke="rgba(255,255,255,0.6)" strokeWidth={2} />
                    <Line type="monotone" dataKey="cashout" stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Point Activities */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Activities</h3>
          <Button variant="ghost" size="sm">
            View All History
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-4 bg-gray-50/50">
            <div className="space-y-3">
              {recentPointActivities.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{activity.merchant}</p>
                      <p className="text-xs text-muted-foreground">{activity.action} • {activity.date}</p>
                    </div>
                  </div>
                  <p className={`font-medium text-sm ${activity.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {activity.points > 0 ? '+' : ''}{activity.points} pts
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Vouchers */}
      <div>
        <h3 className="text-lg font-semibold mb-4">My Vouchers</h3>
        
        <div className="space-y-3">
          {activeVouchers.map((voucher, index) => (
            <Card key={index} className="overflow-hidden bg-gradient-to-r from-gray-50 to-white border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{voucher.logo}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{voucher.title}</h4>
                    <p className="text-xs text-muted-foreground">{voucher.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {voucher.cost} pts
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Expires {voucher.expiry}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expired Passes Nudge */}
        <Button variant="ghost" className="w-full mt-4 text-muted-foreground hover:text-foreground">
          View 50 Expired Passes
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "home": return renderHomeTab();
      case "loyalty": return renderLoyaltyTab();
      case "wallets": return renderWalletsTab();
      case "analytics": return renderAnalyticsTab();
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
            { id: "analytics", icon: BarChart3, label: "OlivePoints" },
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
