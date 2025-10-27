// Small local helper API for FCRA starter features.
// Uses localStorage as a fallback for persistence.

export const fcraApi = {
  async getForeignDonations() {
    try {
      const saved = localStorage.getItem('donations');
      const donations = saved ? JSON.parse(saved) : [];
      return donations.filter(d => d.isForeign);
    } catch (e) {
      console.error('fcraApi.getForeignDonations error', e);
      return [];
    }
  },

  async getAllDonations() {
    try {
      const saved = localStorage.getItem('donations');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('fcraApi.getAllDonations error', e);
      return [];
    }
  },

  // Simple helper to compute unspent foreign balance (sum of convertedAmount)
  async getUnspentForeignBalance() {
    const foreign = await this.getForeignDonations();
    return foreign.reduce((s, d) => s + (d.convertedAmount ?? d.amount ?? 0), 0);
  }
};

export default fcraApi;
