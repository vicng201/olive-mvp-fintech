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
    date: new Date('2024-01-15T10:30:00'),
    status: 'completed',
    merchant: 'Starbucks'
  },
  {
    id: '2',
    type: 'transfer',
    amount: 200.00,
    description: 'Transfer from Bank',
    date: new Date('2024-01-14T15:45:00'),
    status: 'completed'
  },
  {
    id: '3',
    type: 'reward',
    amount: 10.00,
    description: 'Loyalty Points Reward',
    date: new Date('2024-01-13T12:20:00'),
    status: 'completed',
    merchant: 'Target'
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
        id: '3',
        name: '$5 Off',
        pointsCost: 100,
        description: '$5 off next purchase',
        available: true
      },
      {
        id: '4',
        name: '$10 Off',
        pointsCost: 200,
        description: '$10 off next purchase',
        available: false
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
        id: '5',
        name: 'Free Shipping',
        pointsCost: 150,
        description: 'Free next-day shipping',
        available: true
      },
      {
        id: '6',
        name: '$20 Credit',
        pointsCost: 400,
        description: '$20 Amazon credit',
        available: true
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