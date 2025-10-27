import { Donation } from '../types/donation';

export function convertToINR(amount: number, currency: string, rate: number): number {
  return Math.round(amount * rate);
}

export function getUnspentForeignBalance(donations: Donation[], expenditures: any[] = []): number {
  const totalForeign = donations
    .filter(d => d.isForeign && d.status === 'completed')
    .reduce((sum, d) => sum + (d.convertedAmount || 0), 0);
  
  const totalSpent = expenditures
    .filter(e => e.paidFromForeign)
    .reduce((sum, e) => sum + e.amount, 0);
  
  return totalForeign - totalSpent;
}

export function getMonthlyInflows(donations: Donation[], months: number = 12): { month: string; amount: number }[] {
  const now = new Date();
  const monthlyData: { month: string; amount: number }[] = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toISOString().slice(0, 7);
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    const monthlyAmount = donations
      .filter(d => d.isForeign && d.createdAt?.startsWith(monthKey) && d.status === 'completed')
      .reduce((sum, d) => sum + (d.convertedAmount || 0), 0);
    
    monthlyData.push({ month: monthName, amount: monthlyAmount });
  }
  
  return monthlyData;
}