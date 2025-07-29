// Mock Backend Data and API Simulation
export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  avatar?: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'transfer' | 'reward';
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  merchant?: string;
}

export interface LoyaltyCard {
  id: string;
  name: string;
  points: number;
  maxPoints: number;
  logo: string;
  color: string;
  rewards: Reward[];
}

export interface Reward {
  id: string;
  name: string;
  pointsCost: number;
  description: string;
  available: boolean;
}

export interface PaymentCard {
  id: string;
  name: string;
  number: string;
  type: 'visa' | 'mastercard' | 'amex';
  balance: number;
  isDefault: boolean;
}

// Mock Data
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  balance: 2854.50
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    amount: -45.20,
    description: 'Coffee Shop Purchase',
    date: new Date('2024-01-29T10:30:00'),
    status: 'completed',
    merchant: 'Starbucks'
  },
  {
    id: '2',
    type: 'transfer',
    amount: 200.00,
    description: 'Transfer from Bank',
    date: new Date('2024-01-28T15:45:00'),
    status: 'completed'
  },
  {
    id: '3',
    type: 'reward',
    amount: 10.00,
    description: 'Loyalty Points Reward',
    date: new Date('2024-01-28T12:20:00'),
    status: 'completed',
    merchant: 'Target'
  },
  {
    id: '4',
    type: 'payment',
    amount: -128.50,
    description: 'Grocery Shopping',
    date: new Date('2024-01-27T18:15:00'),
    status: 'completed',
    merchant: 'Whole Foods'
  },
  {
    id: '5',
    type: 'payment',
    amount: -25.99,
    description: 'Netflix Subscription',
    date: new Date('2024-01-27T09:00:00'),
    status: 'completed',
    merchant: 'Netflix'
  },
  {
    id: '6',
    type: 'transfer',
    amount: 500.00,
    description: 'Salary Deposit',
    date: new Date('2024-01-26T12:00:00'),
    status: 'completed'
  },
  {
    id: '7',
    type: 'payment',
    amount: -67.45,
    description: 'Gas Station',
    date: new Date('2024-01-25T16:30:00'),
    status: 'completed',
    merchant: 'Shell'
  },
  {
    id: '8',
    type: 'payment',
    amount: -12.99,
    description: 'Spotify Premium',
    date: new Date('2024-01-25T11:20:00'),
    status: 'completed',
    merchant: 'Spotify'
  },
  {
    id: '9',
    type: 'reward',
    amount: 15.00,
    description: 'Cashback Reward',
    date: new Date('2024-01-24T14:45:00'),
    status: 'completed',
    merchant: 'Amazon'
  },
  {
    id: '10',
    type: 'payment',
    amount: -89.99,
    description: 'Online Shopping',
    date: new Date('2024-01-24T20:10:00'),
    status: 'completed',
    merchant: 'Amazon'
  },
  {
    id: '11',
    type: 'payment',
    amount: -35.75,
    description: 'Restaurant Dinner',
    date: new Date('2024-01-23T19:30:00'),
    status: 'completed',
    merchant: 'Olive Garden'
  },
  {
    id: '12',
    type: 'transfer',
    amount: -150.00,
    description: 'Transfer to Savings',
    date: new Date('2024-01-23T10:15:00'),
    status: 'completed'
  },
  {
    id: '13',
    type: 'payment',
    amount: -42.30,
    description: 'Pharmacy',
    date: new Date('2024-01-22T14:20:00'),
    status: 'completed',
    merchant: 'CVS'
  },
  {
    id: '14',
    type: 'payment',
    amount: -18.50,
    description: 'Lunch',
    date: new Date('2024-01-22T12:45:00'),
    status: 'completed',
    merchant: 'Chipotle'
  },
  {
    id: '15',
    type: 'reward',
    amount: 5.00,
    description: 'Daily Check-in Bonus',
    date: new Date('2024-01-21T08:00:00'),
    status: 'completed',
    merchant: 'Olive App'
  },
  {
    id: '16',
    type: 'payment',
    amount: -75.00,
    description: 'Clothing Store',
    date: new Date('2024-01-21T15:30:00'),
    status: 'completed',
    merchant: 'H&M'
  },
  {
    id: '17',
    type: 'payment',
    amount: -120.00,
    description: 'Utility Bill',
    date: new Date('2024-01-20T09:30:00'),
    status: 'completed',
    merchant: 'Electric Company'
  },
  {
    id: '18',
    type: 'transfer',
    amount: 1000.00,
    description: 'Monthly Salary',
    date: new Date('2024-01-20T08:00:00'),
    status: 'completed'
  },
  {
    id: '19',
    type: 'payment',
    amount: -8.99,
    description: 'App Store Purchase',
    date: new Date('2024-01-19T21:15:00'),
    status: 'completed',
    merchant: 'Apple'
  },
  {
    id: '20',
    type: 'payment',
    amount: -55.20,
    description: 'Taxi Ride',
    date: new Date('2024-01-19T22:45:00'),
    status: 'completed',
    merchant: 'Uber'
  }
];

export const mockLoyaltyCards: LoyaltyCard[] = [
  {
    id: '1',
    name: 'Starbucks',
    points: 240,
    maxPoints: 500,
    logo: '☕',
    color: 'bg-green-500',
    rewards: [
      {
        id: '1',
        name: 'Free Coffee',
        pointsCost: 125,
        description: 'Any size coffee drink',
        available: true
      },
      {
        id: '2',
        name: 'Free Pastry',
        pointsCost: 200,
        description: 'Any bakery item',
        available: true
      },
      {
        id: '3',
        name: 'Double Points',
        pointsCost: 50,
        description: 'Double points for next purchase',
        available: true
      }
    ]
  },
  {
    id: '2',
    name: 'Target',
    points: 180,
    maxPoints: 300,
    logo: '🎯',
    color: 'bg-red-500',
    rewards: [
      {
        id: '4',
        name: '$5 Off',
        pointsCost: 100,
        description: '$5 off next purchase',
        available: true
      },
      {
        id: '5',
        name: '$10 Off',
        pointsCost: 200,
        description: '$10 off next purchase',
        available: false
      },
      {
        id: '6',
        name: 'Free Reusable Bag',
        pointsCost: 75,
        description: 'Target branded eco bag',
        available: true
      }
    ]
  },
  {
    id: '3',
    name: 'Amazon',
    points: 450,
    maxPoints: 1000,
    logo: '📦',
    color: 'bg-orange-500',
    rewards: [
      {
        id: '7',
        name: 'Free Shipping',
        pointsCost: 150,
        description: 'Free next-day shipping',
        available: true
      },
      {
        id: '8',
        name: '$20 Credit',
        pointsCost: 400,
        description: '$20 Amazon credit',
        available: true
      },
      {
        id: '9',
        name: 'Prime Trial',
        pointsCost: 250,
        description: '1 month Amazon Prime',
        available: true
      }
    ]
  },
  {
    id: '4',
    name: 'McDonald\'s',
    points: 85,
    maxPoints: 250,
    logo: '🍟',
    color: 'bg-yellow-500',
    rewards: [
      {
        id: '10',
        name: 'Free Fries',
        pointsCost: 50,
        description: 'Medium fries',
        available: true
      },
      {
        id: '11',
        name: 'Free Burger',
        pointsCost: 120,
        description: 'Big Mac',
        available: false
      },
      {
        id: '12',
        name: 'Free Drink',
        pointsCost: 30,
        description: 'Any size drink',
        available: true
      }
    ]
  },
  {
    id: '5',
    name: 'Best Buy',
    points: 320,
    maxPoints: 600,
    logo: '💻',
    color: 'bg-blue-600',
    rewards: [
      {
        id: '13',
        name: '$15 Off',
        pointsCost: 200,
        description: '$15 off electronics',
        available: true
      },
      {
        id: '14',
        name: 'Extended Warranty',
        pointsCost: 300,
        description: '1 year extended warranty',
        available: true
      },
      {
        id: '15',
        name: 'Tech Support',
        pointsCost: 150,
        description: 'Free tech consultation',
        available: true
      }
    ]
  },
  {
    id: '6',
    name: 'Nike',
    points: 150,
    maxPoints: 400,
    logo: '👟',
    color: 'bg-black',
    rewards: [
      {
        id: '16',
        name: '10% Off',
        pointsCost: 100,
        description: '10% off next purchase',
        available: true
      },
      {
        id: '17',
        name: 'Free Shipping',
        pointsCost: 50,
        description: 'Free shipping on next order',
        available: true
      },
      {
        id: '18',
        name: 'Exclusive Access',
        pointsCost: 200,
        description: 'Early access to new releases',
        available: false
      }
    ]
  },
  {
    id: '7',
    name: 'Whole Foods',
    points: 95,
    maxPoints: 200,
    logo: '🥬',
    color: 'bg-green-600',
    rewards: [
      {
        id: '19',
        name: '$5 Off',
        pointsCost: 75,
        description: '$5 off groceries',
        available: true
      },
      {
        id: '20',
        name: 'Free Organic Item',
        pointsCost: 100,
        description: 'Free organic produce',
        available: true
      },
      {
        id: '21',
        name: 'Member Discount',
        pointsCost: 150,
        description: 'Extra 10% member discount',
        available: false
      }
    ]
  },
  {
    id: '8',
    name: 'CVS Pharmacy',
    points: 65,
    maxPoints: 150,
    logo: '💊',
    color: 'bg-red-600',
    rewards: [
      {
        id: '22',
        name: '$3 Off',
        pointsCost: 50,
        description: '$3 off health products',
        available: true
      },
      {
        id: '23',
        name: 'Free Vitamins',
        pointsCost: 80,
        description: 'Free vitamin bottle',
        available: true
      },
      {
        id: '24',
        name: 'Health Consultation',
        pointsCost: 120,
        description: 'Free pharmacist consultation',
        available: false
      }
    ]
  }
];

export const mockPaymentCards: PaymentCard[] = [
  {
    id: '1',
    name: 'Main Card',
    number: '**** **** **** 1234',
    type: 'visa',
    balance: 2854.50,
    isDefault: true
  },
  {
    id: '2',
    name: 'Business Card',
    number: '**** **** **** 5678',
    type: 'mastercard',
    balance: 1250.00,
    isDefault: false
  },
  {
    id: '3',
    name: 'Travel Card',
    number: '**** **** **** 9012',
    type: 'amex',
    balance: 500.75,
    isDefault: false
  }
];

// Mock API Functions
export class MockAPI {
  private static delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // User operations
  static async getUser(): Promise<User> {
    await this.delay();
    return mockUser;
  }

  static async updateUserBalance(newBalance: number): Promise<User> {
    await this.delay();
    mockUser.balance = newBalance;
    return mockUser;
  }

  // Transaction operations
  static async getTransactions(): Promise<Transaction[]> {
    await this.delay();
    return mockTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  static async addTransaction(transaction: Omit<Transaction, 'id' | 'date'>): Promise<Transaction> {
    await this.delay();
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date()
    };
    mockTransactions.unshift(newTransaction);
    return newTransaction;
  }

  // Loyalty card operations
  static async getLoyaltyCards(): Promise<LoyaltyCard[]> {
    await this.delay();
    return mockLoyaltyCards;
  }

  static async scanLoyaltyCard(cardId: string): Promise<{ success: boolean; pointsAdded: number }> {
    await this.delay(1000); // Simulate scanning time
    const card = mockLoyaltyCards.find(c => c.id === cardId);
    if (card) {
      const pointsAdded = 10;
      card.points = Math.min(card.points + pointsAdded, card.maxPoints);
      return { success: true, pointsAdded };
    }
    return { success: false, pointsAdded: 0 };
  }

  static async redeemReward(cardId: string, rewardId: string): Promise<{ success: boolean; message: string }> {
    await this.delay();
    const card = mockLoyaltyCards.find(c => c.id === cardId);
    const reward = card?.rewards.find(r => r.id === rewardId);
    
    if (card && reward && card.points >= reward.pointsCost) {
      card.points -= reward.pointsCost;
      return { success: true, message: `${reward.name} redeemed successfully!` };
    }
    return { success: false, message: 'Insufficient points or reward not found' };
  }

  // Payment card operations
  static async getPaymentCards(): Promise<PaymentCard[]> {
    await this.delay();
    return mockPaymentCards;
  }

  static async addPaymentCard(card: Omit<PaymentCard, 'id'>): Promise<PaymentCard> {
    await this.delay();
    const newCard: PaymentCard = {
      ...card,
      id: Date.now().toString()
    };
    mockPaymentCards.push(newCard);
    return newCard;
  }

  static async setDefaultCard(cardId: string): Promise<PaymentCard[]> {
    await this.delay();
    mockPaymentCards.forEach(card => {
      card.isDefault = card.id === cardId;
    });
    return mockPaymentCards;
  }

  // Payment operations
  static async processPayment(amount: number, cardId: string, merchant: string): Promise<{ success: boolean; transactionId?: string }> {
    await this.delay(1500); // Simulate payment processing
    const card = mockPaymentCards.find(c => c.id === cardId);
    
    if (card && card.balance >= amount) {
      card.balance -= amount;
      mockUser.balance -= amount;
      
      const transaction = await this.addTransaction({
        type: 'payment',
        amount: -amount,
        description: `Payment to ${merchant}`,
        status: 'completed',
        merchant
      });
      
      return { success: true, transactionId: transaction.id };
    }
    
    return { success: false };
  }

  // Transfer operations
  static async transferMoney(amount: number, recipient: string): Promise<{ success: boolean; transactionId?: string }> {
    await this.delay(1000);
    
    if (mockUser.balance >= amount) {
      mockUser.balance -= amount;
      
      const transaction = await this.addTransaction({
        type: 'transfer',
        amount: -amount,
        description: `Transfer to ${recipient}`,
        status: 'completed'
      });
      
      return { success: true, transactionId: transaction.id };
    }
    
    return { success: false };
  }
}

// Utility functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};