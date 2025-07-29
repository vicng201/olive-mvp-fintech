import { ArrowLeft, MoreVertical, CreditCard, ShoppingBag, Coffee, Car, Home } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatVND } from "@/lib/utils";

const WalletDetail = () => {
  const navigate = useNavigate();
  const { bankName } = useParams();

  // Mock wallet data - in real app this would come from API/state
  const walletData = {
    VietinBank: {
      bankName: "VietinBank",
      cardNumber: "**** **** **** 2468",
      balance: 2450000,
      cardType: "Debit Card",
      gradient: "from-blue-500 to-blue-600"
    },
    Techcombank: {
      bankName: "Techcombank",
      cardNumber: "**** **** **** 1357",
      balance: 1280000,
      cardType: "Credit Card", 
      gradient: "from-red-500 to-red-600"
    },
    BIDV: {
      bankName: "BIDV",
      cardNumber: "**** **** **** 9876",
      balance: 890000,
      cardType: "Debit Card",
      gradient: "from-green-500 to-green-600"
    }
  };

  const currentWallet = walletData[bankName as keyof typeof walletData] || walletData.VietinBank;

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      merchant: "Apple Store",
      amount: -1200000,
      date: "Today",
      time: "14:32",
      icon: <ShoppingBag className="w-5 h-5" />,
      category: "Shopping"
    },
    {
      id: 2,
      merchant: "Starbucks Coffee",
      amount: -125000,
      date: "Today",
      time: "09:15",
      icon: <Coffee className="w-5 h-5" />,
      category: "Food & Drink"
    },
    {
      id: 3,
      merchant: "Grab",
      amount: -85000,
      date: "Yesterday",
      time: "18:45",
      icon: <Car className="w-5 h-5" />,
      category: "Transportation"
    },
    {
      id: 4,
      merchant: "Salary Deposit",
      amount: 25000000,
      date: "Yesterday",
      time: "08:00",
      icon: <Home className="w-5 h-5" />,
      category: "Income"
    },
    {
      id: 5,
      merchant: "VinMart",
      amount: -350000,
      date: "2 days ago",
      time: "16:20",
      icon: <ShoppingBag className="w-5 h-5" />,
      category: "Groceries"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold">{currentWallet.bankName}</h1>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Credit Card */}
        <div className="relative">
          <Card className={`bg-gradient-to-br ${currentWallet.gradient} text-white border-0 shadow-xl transform hover:scale-105 transition-transform duration-300`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-white/80 text-sm">{currentWallet.cardType}</p>
                  <p className="text-white font-bold text-lg">{currentWallet.bankName}</p>
                </div>
                <CreditCard className="w-8 h-8 text-white/60" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-white/80 text-xs uppercase tracking-wider">Card Number</p>
                  <p className="text-white font-mono text-lg tracking-wider">{currentWallet.cardNumber}</p>
                </div>
                
                <div>
                  <p className="text-white/80 text-xs uppercase tracking-wider">Balance</p>
                  <p className="text-white font-bold text-2xl">{formatVND(currentWallet.balance)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {transaction.icon}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.merchant}</p>
                        <p className="text-xs text-muted-foreground">{transaction.category}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {transaction.amount > 0 ? '+' : ''}{formatVND(Math.abs(transaction.amount))}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.date} • {transaction.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDetail;