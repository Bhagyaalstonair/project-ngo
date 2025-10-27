import { Donation } from '../types/donation';

export function exportDonationsCsv(donations: Donation[]): void {
  const headers = [
    'Donor Name',
    'Country',
    'Type',
    'Remittance Ref',
    'Date',
    'Amount (Original)',
    'Currency',
    'Amount (INR)',
    'Purpose',
    'FIRC',
    'Status',
    'Notes'
  ];
  
  const rows = donations.map(d => [
    d.donorName,
    d.donorCountry || (d.isForeign ? 'Unknown' : 'India'),
    d.isForeign ? 'Foreign' : 'Domestic',
    d.remittanceRef || 'N/A',
    d.createdAt || '',
    d.amount?.toString() || '',
    d.currency || 'INR',
    d.convertedAmount?.toString() || '',
    d.purposeTag || '',
    d.FIRC || (d.isForeign ? 'Missing' : 'N/A'),
    d.status || 'completed',
    d.notes || ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `all-donations-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportForeignDonationsCsv(donations: Donation[]): void {
  const foreignDonations = donations.filter(d => d.isForeign);
  
  const headers = [
    'Donor Name',
    'Country',
    'Remittance Ref',
    'Date',
    'Amount (Original)',
    'Currency',
    'Amount (INR)',
    'Purpose',
    'FIRC',
    'Notes'
  ];
  
  const rows = foreignDonations.map(d => [
    d.donorName,
    d.donorCountry || '',
    d.remittanceRef || '',
    d.createdAt || '',
    d.amount?.toString() || '',
    d.currency || '',
    d.convertedAmount?.toString() || '',
    d.purposeTag || '',
    d.FIRC || '',
    d.notes || ''
  ]);
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fcra-donations-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}