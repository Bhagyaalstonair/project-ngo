import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, FileText, ExternalLink } from 'lucide-react';
import { Donation } from '../../types/donation';
import { getMonthlyInflows, getUnspentForeignBalance } from '../../utils/fcraHelpers';
import api from '../../utils/api';

export function ForeignFundsWidget() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const response = await api.getDonations();
      setDonations(response.results || response);
    } catch (error) {
      console.error('Failed to load donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const foreignDonations = donations.filter(d => d.isForeign);
  const monthlyInflows = getMonthlyInflows(foreignDonations, 6);
  const unspentBalance = getUnspentForeignBalance(foreignDonations);
  const recentForeign = foreignDonations.slice(0, 5);

  const maxInflow = Math.max(...monthlyInflows.map(m => m.amount), 1);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-50 rounded-lg">
          <DollarSign className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Foreign Funds</h3>
          <p className="text-sm text-gray-600">FCRA compliance overview</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-900">
            ₹{unspentBalance.toLocaleString()}
          </div>
          <div className="text-sm text-blue-700">Unspent Balance</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-900">
            {foreignDonations.length}
          </div>
          <div className="text-sm text-green-700">Foreign Donations</div>
        </div>
      </div>

      {/* Monthly Inflows Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Monthly Inflows (Last 6 months)
        </h4>
        <div className="space-y-2">
          {monthlyInflows.map((month, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-16 text-xs text-gray-600">{month.month}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(month.amount / maxInflow) * 100}%` }}
                />
              </div>
              <div className="w-20 text-xs text-gray-900 text-right">
                ₹{month.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Foreign Donations */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Recent Foreign Donations
        </h4>
        <div className="space-y-2">
          {recentForeign.length > 0 ? (
            recentForeign.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {donation.donorName}
                  </div>
                  <div className="text-xs text-gray-600">
                    {donation.donorCountry} • {donation.remittanceRef}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    ₹{donation.convertedAmount?.toLocaleString()}
                  </div>
                  {donation.FIRC && (
                    <div className="text-xs text-blue-600 flex items-center gap-1">
                      FIRC <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No foreign donations recorded
            </div>
          )}
        </div>
      </div>
    </div>
  );
}