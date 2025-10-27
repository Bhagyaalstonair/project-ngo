import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, Share2, Heart, Target, TrendingUp, MessageSquare, CheckCircle, DollarSign } from 'lucide-react';
import { getCategoryImage } from '../../utils/categoryImages';

interface CampaignUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
}

interface CampaignDetailsPageProps {
  id: string;
}

export function CampaignDetailsPage({ id }: CampaignDetailsPageProps) {
  const [donationAmount, setDonationAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [message, setMessage] = useState('');

  // Mock campaign data - in real app, fetch by ID
  const getCampaignData = (campaignId: string) => {
    const campaigns = {
      '1': {
        id: '1',
        title: 'Education for 1000 Children',
        description: 'This campaign aims to provide quality education and essential school supplies to 1000 underprivileged children in rural areas across India. Your donation will help us purchase textbooks, notebooks, uniforms, and other educational materials that these children desperately need.',
        fullStory: `In the remote villages of rural India, thousands of children are deprived of basic education due to lack of resources. Many families cannot afford school supplies, uniforms, or even basic textbooks. This campaign is our effort to bridge this gap and ensure that every child gets access to quality education.

    Our team has identified 50 schools across 10 states where children are in urgent need of educational support. With your help, we can provide:
    
    • Textbooks and notebooks for all subjects
    • School uniforms and shoes
    • Educational toys and learning materials
    • Digital learning tablets for advanced students
    • Scholarships for exceptional students
    
    Every rupee you donate goes directly towards purchasing these materials. We maintain complete transparency and will provide regular updates on how your money is being used.`,
        goal: 100000,
        raised: 85000,
        donors: 156,
        daysLeft: 5,
        category: 'education',
        image: getCategoryImage('education'),
        status: 'urgent',
        organizer: 'NGO INDIA Education Team',
        startDate: '2024-12-01',
        endDate: '2025-01-15'
      },
      '2': {
        id: '2',
        title: 'Clean Water for Villages',
        description: 'Installing water purification systems and building wells in 10 remote villages to provide clean, safe drinking water to over 5,000 people. Your donation will help us purchase water purification equipment, construct wells, and train local communities in water management.',
        fullStory: `Access to clean water is a basic human right, yet millions of people in rural India still lack this essential resource. In many villages, people have to walk miles to fetch water from contaminated sources, leading to waterborne diseases and health issues.

    This campaign focuses on providing sustainable water solutions to 10 villages across Rajasthan and Madhya Pradesh. With your support, we will:
    
    • Install solar-powered water purification systems
    • Construct 5 new bore wells with hand pumps
    • Build rainwater harvesting structures
    • Train 50 community members in water system maintenance
    • Provide water storage tanks for each household
    • Conduct water quality testing and monitoring
    
    Each village will have a dedicated water committee to ensure long-term sustainability. Your contribution will directly impact the health and well-being of entire communities.`,
        goal: 75000,
        raised: 75000,
        donors: 89,
        daysLeft: 0,
        category: 'water',
        image: getCategoryImage('water'),
        status: 'completed',
        organizer: 'NGO INDIA Water Initiative',
        startDate: '2024-11-01',
        endDate: '2024-12-31'
      },
      '3': {
        id: '3',
        title: 'Emergency Medical Equipment',
        description: 'Purchasing essential medical equipment for 15 rural health centers to improve healthcare access for over 25,000 people. Your donation will help us buy diagnostic equipment, emergency supplies, and life-saving medical devices.',
        fullStory: `Rural healthcare in India faces severe challenges due to lack of proper medical equipment and infrastructure. Many health centers operate without basic diagnostic tools, forcing patients to travel hundreds of kilometers to access proper medical care.

    This urgent campaign aims to equip 15 Primary Health Centers (PHCs) across Bihar, Odisha, and Jharkhand with essential medical equipment. Your donation will help us purchase:
    
    • Digital X-ray machines and ultrasound equipment
    • Emergency resuscitation kits and defibrillators
    • Blood pressure monitors and glucometers
    • Oxygen concentrators and ventilators
    • Laboratory equipment for basic blood tests
    • Ambulance stretchers and emergency medical kits
    • Maternal and child health equipment
    
    Each health center serves approximately 1,500-2,000 people. By providing proper equipment, we can ensure timely diagnosis, reduce maternal mortality, and save countless lives in these underserved communities.`,
        goal: 50000,
        raised: 30000,
        donors: 67,
        daysLeft: 15,
        category: 'healthcare',
        image: getCategoryImage('healthcare'),
        status: 'active',
        organizer: 'NGO INDIA Healthcare Division',
        startDate: '2024-12-15',
        endDate: '2025-02-15'
      },
      '4': {
        id: '4',
        title: 'Food Relief Program',
        description: 'Providing nutritious meals and food packages to 2,000 families affected by recent floods and natural disasters. Your donation will help us distribute emergency food supplies, cooked meals, and nutrition supplements to vulnerable communities.',
        fullStory: `Natural disasters have displaced thousands of families across eastern India, leaving them without access to food and basic necessities. Many children are suffering from malnutrition, and elderly people are particularly vulnerable during this crisis.

    Our emergency food relief program is working around the clock to provide immediate assistance to affected families in West Bengal, Assam, and Odisha. Your contribution will help us:
    
    • Distribute 10,000 emergency food packets containing rice, dal, oil, and spices
    • Serve 5,000 hot meals daily through mobile kitchen units
    • Provide nutrition supplements for pregnant women and children
    • Supply clean drinking water and water purification tablets
    • Distribute baby food and formula for infants
    • Set up temporary food distribution centers in affected areas
    • Provide cooking utensils and emergency supplies
    
    Time is critical in disaster relief. Every hour counts when families are struggling to find their next meal. Your immediate support can make the difference between hope and despair for these vulnerable communities.`,
        goal: 25000,
        raised: 10000,
        donors: 34,
        daysLeft: 8,
        category: 'food',
        image: getCategoryImage('food'),
        status: 'urgent',
        organizer: 'NGO INDIA Emergency Response Team',
        startDate: '2025-01-01',
        endDate: '2025-01-31'
      }
    };
    return campaigns[campaignId as keyof typeof campaigns] || campaigns['1'];
  };
  
  const campaign = getCampaignData(id);

  const getCampaignUpdates = (campaignId: string): CampaignUpdate[] => {
    const updates = {
      '1': [
        {
          id: '1',
          date: '2025-01-10',
          title: 'Books Distributed to First 5 Schools',
          description: 'We successfully distributed textbooks and notebooks to 250 children across 5 schools in Maharashtra. The children were thrilled to receive their new books!',
          image: getCategoryImage('education')
        },
        {
          id: '2',
          date: '2025-01-05',
          title: 'Uniforms Ready for Distribution',
          description: 'All 500 school uniforms have been tailored and are ready for distribution. Next week, we will visit the schools in Karnataka and Tamil Nadu.',
        },
        {
          id: '3',
          date: '2024-12-28',
          title: 'Campaign Milestone: 75% Funded!',
          description: 'Thanks to your generous support, we have reached 75% of our funding goal. This means we can now proceed with purchasing materials for 750 children.',
        }
      ],
      '2': [
        {
          id: '1',
          date: '2024-12-30',
          title: 'Project Completed Successfully!',
          description: 'All 10 villages now have access to clean water! We have successfully installed water purification systems and constructed 5 new bore wells. Over 5,000 people now have access to safe drinking water.',
          image: getCategoryImage('water')
        },
        {
          id: '2',
          date: '2024-12-20',
          title: 'Water Systems Installed in 8 Villages',
          description: 'Solar-powered water purification systems have been successfully installed in 8 out of 10 target villages. Local communities have been trained in maintenance and operation.',
        },
        {
          id: '3',
          date: '2024-12-10',
          title: 'Bore Wells Construction Completed',
          description: 'All 5 bore wells have been successfully constructed and are now operational. Water quality tests confirm that the water meets WHO standards for drinking water.',
        }
      ],
      '3': [
        {
          id: '1',
          date: '2025-01-08',
          title: 'First Batch of Equipment Delivered',
          description: 'Digital X-ray machines and ultrasound equipment have been delivered to 5 health centers in Bihar. Medical staff are being trained on the new equipment.',
          image: getCategoryImage('healthcare')
        },
        {
          id: '2',
          date: '2025-01-03',
          title: 'Emergency Kits Distributed',
          description: 'Emergency resuscitation kits and defibrillators have been distributed to 10 health centers. These life-saving devices are already making a difference in emergency care.',
        },
        {
          id: '3',
          date: '2024-12-28',
          title: 'Laboratory Equipment Procurement',
          description: 'We have successfully procured laboratory equipment for basic blood tests. This will enable health centers to provide faster diagnosis and treatment.',
        }
      ],
      '4': [
        {
          id: '1',
          date: '2025-01-12',
          title: 'Mobile Kitchen Units Deployed',
          description: 'Our mobile kitchen units are now operational in 3 affected districts, serving over 2,000 hot meals daily to flood-affected families. The response from communities has been overwhelming.',
          image: getCategoryImage('food')
        },
        {
          id: '2',
          date: '2025-01-08',
          title: 'Emergency Food Packets Distributed',
          description: '5,000 emergency food packets have been distributed to families in the worst-affected areas. Each packet contains essential items for a family of 4 for one week.',
        },
        {
          id: '3',
          date: '2025-01-05',
          title: 'Nutrition Support for Children',
          description: 'Special nutrition supplements have been provided to 500 children under 5 years of age. Pregnant and lactating mothers are also receiving additional nutritional support.',
        }
      ]
    };
    return updates[campaignId as keyof typeof updates] || updates['1'];
  };
  
  const updates = getCampaignUpdates(id);

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];
  const progressPercentage = Math.min((campaign.raised / campaign.goal) * 100, 100);

  const handleDonate = () => {
    // In real app, process donation
    alert(`Thank you for your donation of ₹${donationAmount}!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: campaign.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Campaign link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/ngo india logo.png" alt="NGO INDIA Logo" className="w-10 h-10 rounded-lg" />
            </div>
            <button
              onClick={() => window.location.href = '/campaigns'}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Campaigns
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Header */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img 
                src={campaign.image} 
                alt={campaign.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{campaign.title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{campaign.description}</p>
                
                <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{campaign.donors} supporters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{campaign.daysLeft} days left</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>By {campaign.organizer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Story */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Story</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                {campaign.fullStory.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Updates */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Updates</h2>
              <div className="space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="border-l-4 border-orange-500 pl-6 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-500">{update.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{update.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{update.description}</p>
                    {update.image && (
                      <img 
                        src={update.image} 
                        alt={update.title}
                        className="mt-4 rounded-lg w-full max-w-md h-48 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Donation Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              {/* Progress Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">₹{campaign.raised.toLocaleString()}</div>
                    <div className="text-gray-600">raised of ₹{campaign.goal.toLocaleString()} goal</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">{Math.round(progressPercentage)}%</div>
                    <div className="text-gray-600 text-sm">completed</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900">{campaign.donors}</div>
                    <div className="text-sm text-gray-600">Donors</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900">{campaign.daysLeft}</div>
                    <div className="text-sm text-gray-600">Days Left</div>
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Support This Campaign</h3>
                
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    Donation Amount
                  </label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount.toString())}
                        className={`py-3 px-4 rounded-lg border-2 transition-colors font-medium ${
                          donationAmount === amount.toString()
                            ? 'border-orange-500 bg-orange-50 text-orange-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter custom amount"
                    min="10"
                  />
                </div>

                {/* Recurring Donation */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="recurring" className="text-sm text-gray-700">
                    Make this a monthly donation
                  </label>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message of Support (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Leave a message of encouragement..."
                  />
                </div>

                {/* Donate Button */}
                <button
                  onClick={handleDonate}
                  disabled={!donationAmount || Number(donationAmount) < 10}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {donationAmount ? `Donate ₹${donationAmount}` : 'Enter Amount to Donate'}
                </button>

                {/* Trust Indicators */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Tax deductible under 80G</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>100% transparent fund usage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}