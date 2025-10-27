import { convertToINR, getUnspentForeignBalance } from '../fcraHelpers';
import { Donation } from '../../types/donation';

describe('FCRA Helpers', () => {
  describe('convertToINR', () => {
    it('should convert USD to INR correctly', () => {
      const result = convertToINR(100, 'USD', 83.5);
      expect(result).toBe(8350);
    });

    it('should handle decimal amounts', () => {
      const result = convertToINR(100.50, 'USD', 83.25);
      expect(result).toBe(8367);
    });

    it('should round to nearest integer', () => {
      const result = convertToINR(100, 'USD', 83.456);
      expect(result).toBe(8346);
    });
  });

  describe('getUnspentForeignBalance', () => {
    const mockDonations: Donation[] = [
      {
        id: '1',
        donorName: 'Test Donor 1',
        isForeign: true,
        convertedAmount: 100000,
        status: 'completed',
        type: 'one-time'
      },
      {
        id: '2',
        donorName: 'Test Donor 2',
        isForeign: true,
        convertedAmount: 50000,
        status: 'completed',
        type: 'one-time'
      },
      {
        id: '3',
        donorName: 'Domestic Donor',
        isForeign: false,
        convertedAmount: 25000,
        status: 'completed',
        type: 'one-time'
      }
    ] as Donation[];

    const mockExpenditures = [
      { amount: 30000, paidFromForeign: true },
      { amount: 20000, paidFromForeign: false }
    ];

    it('should calculate unspent foreign balance correctly', () => {
      const result = getUnspentForeignBalance(mockDonations, mockExpenditures);
      expect(result).toBe(120000); // 150000 foreign - 30000 spent from foreign
    });

    it('should handle empty expenditures', () => {
      const result = getUnspentForeignBalance(mockDonations, []);
      expect(result).toBe(150000); // Total foreign donations
    });

    it('should only count completed foreign donations', () => {
      const donationsWithPending = [
        ...mockDonations,
        {
          id: '4',
          donorName: 'Pending Donor',
          isForeign: true,
          convertedAmount: 75000,
          status: 'pending',
          type: 'one-time'
        } as Donation
      ];
      
      const result = getUnspentForeignBalance(donationsWithPending, mockExpenditures);
      expect(result).toBe(120000); // Should not include pending donation
    });
  });
});