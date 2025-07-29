import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Wallet, Building2, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CashOut = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock data for top 10 Vietnamese banks
  const vietnameseBanks = [
    { 
      id: "vietcombank", 
      name: "Vietcombank", 
      fullName: "Joint Stock Commercial Bank for Foreign Trade of Vietnam",
      logo: "bg-red-600",
      processingTime: "2-3 business days"
    },
    { 
      id: "bidv", 
      name: "BIDV", 
      fullName: "Bank for Investment and Development of Vietnam",
      logo: "bg-blue-600",
      processingTime: "1-2 business days"
    },
    { 
      id: "vietinbank", 
      name: "VietinBank", 
      fullName: "Vietnam Joint Stock Commercial Bank for Industry and Trade",
      logo: "bg-green-600",
      processingTime: "2-3 business days"
    },
    { 
      id: "agribank", 
      name: "Agribank", 
      fullName: "Vietnam Bank for Agriculture and Rural Development",
      logo: "bg-green-700",
      processingTime: "3-4 business days"
    },
    { 
      id: "techcombank", 
      name: "Techcombank", 
      fullName: "Vietnam Technological and Commercial Joint Stock Bank",
      logo: "bg-red-500",
      processingTime: "1-2 business days"
    },
    { 
      id: "acb", 
      name: "ACB", 
      fullName: "Asia Commercial Joint Stock Bank",
      logo: "bg-blue-500",
      processingTime: "2-3 business days"
    },
    { 
      id: "sacombank", 
      name: "Sacombank", 
      fullName: "Saigon Thuong Tin Commercial Joint Stock Bank",
      logo: "bg-orange-600",
      processingTime: "2-4 business days"
    },
    { 
      id: "maritime", 
      name: "Maritime Bank", 
      fullName: "Maritime Commercial Joint Stock Bank",
      logo: "bg-navy-600",
      processingTime: "3-5 business days"
    },
    { 
      id: "vpbank", 
      name: "VPBank", 
      fullName: "Vietnam Prosperity Joint Stock Commercial Bank",
      logo: "bg-purple-600",
      processingTime: "1-3 business days"
    },
    { 
      id: "shinhan", 
      name: "Shinhan Bank", 
      fullName: "Shinhan Bank Vietnam Limited",
      logo: "bg-blue-700",
      processingTime: "1-2 business days"
    }
  ];

  // Conversion rate: 1 point = 10 VND
  const pointsToVnd = 10;
  const currentPoints = 5489; // From the main app
  const maxCashOut = currentPoints * pointsToVnd;

  const calculatePoints = (vndAmount: number): number => {
    return Math.ceil(vndAmount / pointsToVnd);
  };

  const formatVND = (amount: number): string => {
    return `${amount.toLocaleString()} VND`;
  };

  const handleAmountChange = (value: string) => {
    // Remove non-numeric characters except commas and dots
    const numericValue = value.replace(/[^\d,]/g, '');
    setAmount(numericValue);
  };

  const getAmountNumber = (): number => {
    return parseInt(amount.replace(/,/g, '')) || 0;
  };

  const requiredPoints = calculatePoints(getAmountNumber());
  const isValidAmount = getAmountNumber() >= 10000 && getAmountNumber() <= maxCashOut;
  const hasSufficientPoints = requiredPoints <= currentPoints;

  const selectedBankData = vietnameseBanks.find(bank => bank.id === selectedBank);

  const handleCashOut = () => {
    if (!selectedBank || !isValidAmount || !hasSufficientPoints) {
      toast({
        title: "Invalid Request",
        description: "Please check your selection and amount.",
        variant: "destructive",
      });
      return;
    }
    setShowConfirmation(true);
  };

  const confirmCashOut = () => {
    toast({
      title: "Cash Out Request Submitted!",
      description: `${formatVND(getAmountNumber())} will be transferred to your ${selectedBankData?.name} account.`,
    });
    navigate("/");
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowConfirmation(false)}
              className="mr-3"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-semibold">Confirm Cash Out</h1>
          </div>

          {/* Confirmation Card */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-lg text-green-800">Ready to Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm text-muted-foreground">Bank</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded ${selectedBankData?.logo}`}></div>
                    <span className="font-medium">{selectedBankData?.name}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="font-bold text-lg">{formatVND(getAmountNumber())}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm text-muted-foreground">Points Required</span>
                  <span className="font-medium text-red-600">-{requiredPoints.toLocaleString()} points</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Processing Time</span>
                  <span className="font-medium">{selectedBankData?.processingTime}</span>
                </div>
              </div>

              {/* Points After Transaction */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">Points after transaction</span>
                  <span className="font-bold text-blue-800">{(currentPoints - requiredPoints).toLocaleString()} points</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={confirmCashOut}
                >
                  Confirm Cash Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="mr-3"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold">Select Your Bank and Cash Out Amount</h1>
        </div>

        {/* Current Points Display */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Points</p>
                <p className="text-2xl font-bold text-blue-600">{currentPoints.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Max Cash Out</p>
                <p className="text-lg font-semibold">{formatVND(maxCashOut)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Selection */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="bank-select" className="text-base font-medium mb-3 block">
              Select Bank
            </Label>
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Choose your bank" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {vietnameseBanks.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id}>
                    <div className="flex items-center space-x-3 py-1">
                      <div className={`w-6 h-6 rounded ${bank.logo} flex items-center justify-center`}>
                        <Building2 className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{bank.name}</p>
                        <p className="text-xs text-muted-foreground">{bank.processingTime}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedBankData && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">{selectedBankData.fullName}</p>
                <p className="text-xs text-muted-foreground">Processing: {selectedBankData.processingTime}</p>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <Label htmlFor="amount" className="text-base font-medium mb-3 block">
              Cash Out Amount (VND)
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="Enter amount (minimum 10,000 VND)"
                className="h-12 text-lg pr-16"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                VND
              </span>
            </div>
            
            {/* Amount Validation Messages */}
            {amount && (
              <div className="mt-2 space-y-2">
                {getAmountNumber() < 10000 && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Minimum amount is 10,000 VND</span>
                  </div>
                )}
                {getAmountNumber() > maxCashOut && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Amount exceeds your available points</span>
                  </div>
                )}
                {!hasSufficientPoints && getAmountNumber() >= 10000 && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Insufficient points for this amount</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Points Conversion Display */}
          {amount && getAmountNumber() >= 10000 && (
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-amber-800">Points Conversion</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Amount to cash out:</span>
                    <span className="font-medium">{formatVND(getAmountNumber())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Points required:</span>
                    <span className="font-bold text-red-600">{requiredPoints.toLocaleString()} points</span>
                  </div>
                  <div className="flex justify-between border-t border-amber-200 pt-2">
                    <span className="text-sm">Points remaining:</span>
                    <span className="font-bold text-green-600">
                      {Math.max(0, currentPoints - requiredPoints).toLocaleString()} points
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Amount Buttons */}
          <div>
            <Label className="text-sm font-medium mb-3 block text-muted-foreground">
              Quick Select
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {[50000, 100000, 200000].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toLocaleString())}
                  disabled={quickAmount > maxCashOut}
                  className="h-10"
                >
                  {formatVND(quickAmount).replace(' VND', 'K')}
                </Button>
              ))}
            </div>
          </div>

          {/* Cash Out Button */}
          <Button
            onClick={handleCashOut}
            disabled={!selectedBank || !isValidAmount || !hasSufficientPoints}
            className="w-full h-12 text-base font-medium bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Cash Out {amount && isValidAmount ? formatVND(getAmountNumber()) : ''}
          </Button>

          {/* Help Text */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Processing times may vary depending on your bank. 
              <br />
              Conversion rate: 1 point = 10 VND
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashOut;