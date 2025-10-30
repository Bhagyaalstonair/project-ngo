import React, { useState, useEffect } from 'react';
import { 
  Network, Users, MessageSquare, FileText, 
  TrendingUp, Search, Plus, BookOpen, 
  Handshake, Target, BarChart3, Download,
  Upload, Star, Eye, ThumbsUp, Reply, Send, User,
  Clock, Pin, Globe, ArrowUp, ArrowRight, CheckCircle, X,
  Zap, HelpCircle, UserCheck, MessageCircle, AlertCircle
} from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  description: string;
  ngoCount: number;
  activeDiscussions: number;
  resources: number;
  color: string;
  icon: React.ComponentType<any>;
}

const sectors: Sector[] = [
  {
    id: 'education',
    name: 'Education',
    description: 'Empowering communities through quality education and skill development',
    ngoCount: 10,
    activeDiscussions: 23,
    resources: 45,
    color: 'bg-blue-500',
    icon: BookOpen
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Providing accessible healthcare services and medical support',
    ngoCount: 10,
    activeDiscussions: 18,
    resources: 32,
    color: 'bg-green-500',
    icon: Target
  },
  {
    id: 'environment',
    name: 'Environment',
    description: 'Protecting nature and promoting sustainable development',
    ngoCount: 10,
    activeDiscussions: 15,
    resources: 28,
    color: 'bg-emerald-500',
    icon: Globe
  },
  {
    id: 'women-empowerment',
    name: 'Women Empowerment',
    description: 'Supporting women through skill development and leadership programs',
    ngoCount: 10,
    activeDiscussions: 21,
    resources: 38,
    color: 'bg-pink-500',
    icon: Users
  }
];

const initialDiscussions = [
  {
    id: '1',
    title: 'Best Practices for Digital Education in Rural Areas',
    author: 'Kavita Mehta',
    sector: 'Education',
    timestamp: '2 hours ago',
    likes: 15,
    replies: 8,
    isPinned: true
  },
  {
    id: '2',
    title: 'Healthcare Mobile Unit Collaboration',
    author: 'Dr. Arjun Singh',
    sector: 'Healthcare',
    timestamp: '4 hours ago',
    likes: 23,
    replies: 12,
    isPinned: false
  }
];

const initialQuickInteractions = [
  {
    id: '1',
    title: 'Need Digital Marketing Expert for Education Campaign',
    author: 'Neha Agarwal',
    sector: 'Education',
    type: 'Need Help',
    urgency: 'Immediate',
    timestamp: '2 hours ago',
    responses: 5,
    status: 'Active'
  },
  {
    id: '2',
    title: 'Offering Free Accounting Services to Small NGOs',
    author: 'Vikram Joshi',
    sector: 'Healthcare',
    type: 'Can Help',
    urgency: 'This Week',
    timestamp: '4 hours ago',
    responses: 8,
    status: 'Active'
  }
];

export function SectorNetworks() {
  const [activeView, setActiveView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [sectorDiscussions, setSectorDiscussions] = useState<any[]>([]);
  const [quickInteractions, setQuickInteractions] = useState<any[]>([]);
  const [showQuickPost, setShowQuickPost] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<any>(null);
  const [joinedSectors, setJoinedSectors] = useState<string[]>([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joiningsector, setJoiningSector] = useState<string | null>(null);
  const [showNewSectorModal, setShowNewSectorModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewResource, setPreviewResource] = useState<any>(null);
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [selectedInteractionDetail, setSelectedInteractionDetail] = useState<any>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedDiscussions = localStorage.getItem('sectorDiscussions');
    const savedInteractions = localStorage.getItem('quickInteractions');
    const savedActivities = localStorage.getItem('recentActivities');
    const savedJoinedSectors = localStorage.getItem('joinedSectors');
    
    if (savedDiscussions) {
      const parsed = JSON.parse(savedDiscussions);
      // Merge: keep initial data + add any new items that aren't in initial data
      const newItems = parsed.filter((item: any) => !initialDiscussions.find(init => init.id === item.id));
      setSectorDiscussions([...newItems, ...initialDiscussions]);
    } else {
      setSectorDiscussions(initialDiscussions);
    }
    
    if (savedInteractions) {
      const parsed = JSON.parse(savedInteractions);
      // Merge: keep initial data + add any new items that aren't in initial data
      const newItems = parsed.filter((item: any) => !initialQuickInteractions.find(init => init.id === item.id));
      setQuickInteractions([...newItems, ...initialQuickInteractions]);
    } else {
      setQuickInteractions(initialQuickInteractions);
    }
    
    if (savedActivities) {
      setRecentActivities(JSON.parse(savedActivities));
    }
    
    if (savedJoinedSectors) {
      setJoinedSectors(JSON.parse(savedJoinedSectors));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('sectorDiscussions', JSON.stringify(sectorDiscussions));
  }, [sectorDiscussions]);

  useEffect(() => {
    localStorage.setItem('quickInteractions', JSON.stringify(quickInteractions));
  }, [quickInteractions]);

  useEffect(() => {
    localStorage.setItem('recentActivities', JSON.stringify(recentActivities));
  }, [recentActivities]);

  useEffect(() => {
    localStorage.setItem('joinedSectors', JSON.stringify(joinedSectors));
  }, [joinedSectors]);

  const filteredSectors = sectors.filter(sector =>
    sector.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalNGOs: sectors.reduce((sum, sector) => sum + sector.ngoCount, 0),
    totalDiscussions: sectors.reduce((sum, sector) => sum + sector.activeDiscussions, 0),
    totalResources: sectors.reduce((sum, sector) => sum + sector.resources, 0),
    activeSectors: sectors.length
  };

  const handleNewDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const authorName = formData.get('author') as string || 'Anonymous User';
    const newDiscussion = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      author: authorName,
      sector: formData.get('sector') as string,
      timestamp: 'Just now',
      likes: 0,
      replies: 0,
      isPinned: false
    };
    setSectorDiscussions([newDiscussion, ...sectorDiscussions]);
    
    // Add to recent activities
    const newActivity = {
      id: Date.now().toString(),
      type: 'discussion',
      title: `New Discussion in ${formData.get('sector')} Sector`,
      description: `"${formData.get('title')}" started by ${authorName}`,
      timestamp: 'Just now',
      icon: MessageSquare,
      iconColor: 'blue',
      stats: ['0 likes', '0 replies']
    };
    setRecentActivities([newActivity, ...recentActivities]);
    setShowNewPost(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };



  const handlePreview = (resource: any) => {
    setPreviewResource(resource);
    setShowPreviewModal(true);
  };





  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Clean Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900">Sector Networks</h1>
            <p className="text-lg text-gray-600 mt-1">Connect and collaborate with NGOs in your sector</p>
          </div>
          
          {/* Simple Tab Navigation */}
          <div className="flex bg-white rounded-xl p-2 shadow-sm border border-gray-200">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'sectors', label: 'Sectors' },
              { id: 'discussions', label: 'Discussions' },
              { id: 'quick-interactions', label: 'Quick Interactions' },
              { id: 'analytics', label: 'Analytics' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => {
                  console.log('Tab clicked:', tab.id);
                  setActiveView(tab.id);
                }}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeView === tab.id 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Stats Row */}
        <div className="grid grid-cols-4 gap-8">
          {[
            { label: 'Total NGOs', value: totalStats.totalNGOs, icon: Users, color: 'orange' },
            { label: 'Active Discussions', value: totalStats.totalDiscussions, icon: MessageSquare, color: 'blue' },
            { label: 'Quick Interactions', value: quickInteractions.length, icon: Zap, color: 'green' },
            { label: 'Active Sectors', value: totalStats.activeSectors, icon: Target, color: 'purple' }
          ].map((stat: any, index: number) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[140px] flex flex-col">
                <div className={`bg-${stat.color}-100 p-3 rounded-lg w-fit mb-3`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Views */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="col-span-2 space-y-10">
            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Recent Network Activity</h2>
              <div className="space-y-6">
                {/* Dynamic Activities */}
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                      <div className="flex items-start gap-6">
                        <div className={`bg-${activity.iconColor}-100 p-4 rounded-full`}>
                          <Icon className={`w-8 h-8 text-${activity.iconColor}-600`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{activity.title}</h3>
                          <p className="text-gray-700 mb-4">{activity.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{activity.timestamp}</span>
                            {activity.stats.map((stat: string, index: number) => (
                              <span key={index}>{stat}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Default Activities */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-start gap-6">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">New Discussion in Education Sector</h3>
                      <p className="text-gray-700 mb-4">"Best Practices for Digital Education in Rural Areas" started by Kavita Mehta</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>2 hours ago</span>
                        <span>15 likes</span>
                        <span>8 replies</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-start gap-6">
                    <div className="bg-green-100 p-4 rounded-full">
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">New Resource Uploaded</h3>
                      <p className="text-gray-700 mb-4">"Healthcare Mobile Unit Setup Guide" shared in Healthcare sector</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>4 hours ago</span>
                        <span>189 downloads</span>
                        <span>4.6 rating</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-start gap-6">
                    <div className="bg-purple-100 p-4 rounded-full">
                      <Handshake className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">New Collaboration Formed</h3>
                      <p className="text-gray-700 mb-4">Environment and Rural Development sectors partnering on Sustainable Agriculture Initiative</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>6 hours ago</span>
                        <span>12 NGOs involved</span>
                        <span>2,500+ farmers impacted</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setShowNewPost(true)}
                  className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl hover:bg-orange-600 transition-colors font-semibold flex items-center gap-3"
                >
                  <Plus className="w-5 h-5" />
                  Start Discussion
                </button>
                <button 
                  onClick={() => setShowQuickPost(true)}
                  className="w-full border-2 border-orange-500 text-orange-600 py-4 px-6 rounded-xl hover:bg-orange-50 transition-colors font-semibold flex items-center gap-3"
                >
                  <Zap className="w-5 h-5" />
                  Quick Post
                </button>
                <button className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors font-semibold flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  Find Partners
                </button>
              </div>
            </div>

            {/* Network Insights */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-500 p-3 rounded-xl">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Network Insights</h3>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Most Active Sector</span>
                  <span className="font-bold text-gray-900">Education</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Growth This Month</span>
                  <span className="font-bold text-green-600">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">New Collaborations</span>
                  <span className="font-bold text-gray-900">23</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveView('analytics')}
                className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl hover:bg-orange-600 transition-colors font-semibold"
              >
                View Full Analytics
              </button>
            </div>
          </div>
        </div>
      )}

      {activeView === 'sectors' && (
        <div className="space-y-8">
          {/* Search Bar */}
          <div className="flex gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search sectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
            </div>
            <button 
              onClick={() => setShowNewSectorModal(true)}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-3 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Join New Sector
            </button>
          </div>

          {/* Sectors Grid */}
          <div className="grid grid-cols-2 gap-8">
            {filteredSectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <div key={sector.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${sector.color} p-4 rounded-xl`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900">{sector.name}</h3>
                      <p className="text-gray-600">{sector.ngoCount} NGOs</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">{sector.description}</p>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center bg-gray-50 p-2 rounded-md">
                      <p className="text-lg font-bold text-gray-900">{sector.ngoCount}</p>
                      <p className="text-gray-600 text-xs">NGOs</p>
                    </div>
                    <div className="text-center bg-gray-50 p-2 rounded-md">
                      <p className="text-lg font-bold text-gray-900">{sectorDiscussions.filter(d => d.sector === sector.name).length}</p>
                      <p className="text-gray-600 text-xs">Discussions</p>
                    </div>
                    <div className="text-center bg-gray-50 p-2 rounded-md">
                      <p className="text-lg font-bold text-gray-900">{quickInteractions.filter(i => i.sector === sector.name).length}</p>
                      <p className="text-gray-600 text-xs">Interactions</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        setJoiningSector(sector.id);
                        setShowJoinModal(true);
                      }}
                      className={`flex-1 py-4 px-6 rounded-xl transition-colors font-semibold ${
                        joinedSectors.includes(sector.id)
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-orange-500 text-white hover:bg-orange-600'
                      }`}
                    >
                      {joinedSectors.includes(sector.id) ? '✓ Joined' : 'Join Network'}
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedSector(sector.id);
                        setActiveView('sector-detail');
                      }}
                      className="border-2 border-orange-500 text-orange-600 py-4 px-6 rounded-xl hover:bg-orange-50 transition-colors font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeView === 'discussions' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-gray-900">Sector Discussions</h2>
            <button 
              onClick={() => setShowNewPost(true)}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-3 font-semibold"
            >
              <Plus className="w-5 h-5" />
              New Discussion
            </button>
          </div>
          
          <div className="space-y-6">
            {sectorDiscussions.map((discussion) => (
              <div 
                key={discussion.id} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedDiscussion(discussion);
                  setActiveView('discussion-detail');
                }}
              >
                <div className="flex items-start gap-6">
                  <div className="bg-orange-100 p-4 rounded-full">
                    <User className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      {discussion.isPinned && <Pin className="w-5 h-5 text-orange-600" />}
                      <h3 className="text-2xl font-semibold text-gray-900">{discussion.title}</h3>
                      <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                        {discussion.sector}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-gray-600">
                        <span className="font-medium">{discussion.author}</span>
                        <span>{discussion.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <button 
                          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ThumbsUp className="w-5 h-5" />
                          <span className="font-medium">{discussion.likes}</span>
                        </button>
                        <button 
                          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Reply className="w-5 h-5" />
                          <span className="font-medium">{discussion.replies}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'quick-interactions' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-gray-900">Quick Interactions</h2>
            <button 
              onClick={() => setShowQuickPost(true)}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-3 font-semibold"
            >
              <Zap className="w-5 h-5" />
              Quick Post
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {quickInteractions.map((interaction) => (
              <div 
                key={interaction.id} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedInteractionDetail(interaction);
                  setActiveView('interaction-detail');
                }}
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-xl ${
                    interaction.type === 'Need Help' ? 'bg-orange-100' : 'bg-green-100'
                  }`}>
                    {interaction.type === 'Need Help' ? 
                      <HelpCircle className={`w-8 h-8 ${
                        interaction.type === 'Need Help' ? 'text-orange-600' : 'text-green-600'
                      }`} /> :
                      <UserCheck className="w-8 h-8 text-green-600" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{interaction.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        interaction.type === 'Need Help' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {interaction.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        interaction.urgency === 'Immediate' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {interaction.urgency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-gray-600">
                        <span className="font-medium">{interaction.author}</span>
                        <span>{interaction.timestamp}</span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {interaction.sector}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInteraction(interaction);
                            setShowResponseModal(true);
                          }}
                          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Respond ({interaction.responses})
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickInteractions(prev => 
                              prev.map(item => 
                                item.id === interaction.id 
                                  ? { ...item, responses: item.responses + 1 }
                                  : item
                              )
                            );
                            alert(`You've shown interest in "${interaction.title}". The author will be notified!`);
                          }}
                          className="border-2 border-orange-500 text-orange-600 px-6 py-2 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
                        >
                          {interaction.type === 'Need Help' ? 'I Can Help' : 'Interested'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'analytics' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold text-gray-900">Sector Analytics</h2>
          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Sector Performance</h3>
              <div className="space-y-6">
                {sectors.map((sector) => (
                  <div key={sector.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{sector.name}</p>
                      <p className="text-gray-600">{sector.ngoCount} NGOs</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <ArrowUp className="w-5 h-5 text-green-600" />
                        <span className="text-lg font-bold text-green-600">+12.5%</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {sectorDiscussions.filter(d => d.sector === sector.name).length} discussions • {quickInteractions.filter(i => i.sector === sector.name).length} interactions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Trending Topics</h3>
              <div className="space-y-6">
                {['Digital Education', 'Mobile Healthcare', 'Climate Action'].map((topic, index) => (
                  <div key={topic} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{topic}</p>
                        <p className="text-gray-600">{145 - index * 20} mentions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-bold text-green-600">+{23.5 - index * 2}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'sector-detail' && selectedSector && (
        <div className="space-y-8">
          {(() => {
            const sector = sectors.find(s => s.id === selectedSector);
            if (!sector) return null;
            const Icon = sector.icon;
            
            const sectorDiscussionsList = sectorDiscussions.filter(d => d.sector === sector.name);
            const sectorInteractionsList = quickInteractions.filter(i => i.sector === sector.name);
            
            return (
              <>
                {/* Sector Header */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <div className={`${sector.color} p-6 rounded-2xl`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold text-gray-900">{sector.name} Network</h1>
                        <p className="text-xl text-gray-600 mt-2">{sector.description}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveView('sectors')}
                      className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
                    >
                      ← Back to Sectors
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-6">
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{sector.ngoCount}</p>
                      <p className="text-gray-600 text-sm">NGOs</p>
                    </div>
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{sectorDiscussionsList.length}</p>
                      <p className="text-gray-600 text-sm">Discussions</p>
                    </div>
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">{sectorInteractionsList.length}</p>
                      <p className="text-gray-600 text-sm">Interactions</p>
                    </div>
                    <div className="text-center bg-gray-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-gray-600 text-sm">Collaborations</p>
                    </div>
                  </div>
                </div>

                {/* Sector Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  {/* NGO List */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">NGOs in {sector.name}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {Array.from({length: sector.ngoCount}, (_, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="bg-orange-100 p-3 rounded-full">
                              <Users className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">{sector.name} NGO {i + 1}</h4>
                              <p className="text-gray-600">Active since 2020</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">Working on {sector.name.toLowerCase()} initiatives in rural areas.</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>50+ projects</span>
                            <span>1000+ beneficiaries</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Discussions */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Recent Discussions</h3>
                      <button 
                        onClick={() => setShowNewPost(true)}
                        className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-5 h-5" />
                        New Discussion
                      </button>
                    </div>
                    <div className="space-y-6">
                      {sectorDiscussionsList.length > 0 ? sectorDiscussionsList.map((discussion) => (
                        <div 
                          key={discussion.id} 
                          className="bg-gray-50 p-6 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => {
                            setSelectedDiscussion(discussion);
                            setActiveView('discussion-detail');
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-orange-100 p-3 rounded-full">
                              <User className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {discussion.isPinned && <Pin className="w-4 h-4 text-orange-600" />}
                                <h4 className="text-lg font-semibold text-gray-900">{discussion.title}</h4>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>{discussion.author}</span>
                                  <span>{discussion.timestamp}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{discussion.likes}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Reply className="w-4 h-4" />
                                    <span>{discussion.replies}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-12 text-gray-500">
                          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>No discussions yet. Start the first conversation!</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Interactions */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-semibold text-gray-900">Sector Interactions</h3>
                      <button 
                        onClick={() => setShowQuickPost(true)}
                        className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-2"
                      >
                        <Zap className="w-5 h-5" />
                        Quick Post
                      </button>
                    </div>
                    <div className="space-y-4">
                      {sectorInteractionsList.length > 0 ? sectorInteractionsList.map((interaction) => (
                        <div key={interaction.id} className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${
                              interaction.type === 'Need Help' ? 'bg-orange-100' : 'bg-green-100'
                            }`}>
                              {interaction.type === 'Need Help' ? 
                                <HelpCircle className="w-6 h-6 text-orange-600" /> :
                                <UserCheck className="w-6 h-6 text-green-600" />
                              }
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg font-semibold text-gray-900">{interaction.title}</h4>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  interaction.type === 'Need Help' 
                                    ? 'bg-orange-100 text-orange-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {interaction.type}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>{interaction.author}</span>
                                  <span>{interaction.timestamp}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{interaction.responses} responses</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-12 text-gray-500">
                          <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>No interactions yet. Post the first interaction!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {activeView === 'discussion-detail' && selectedDiscussion && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => {
                  setActiveView('discussions');
                  setSelectedDiscussion(null);
                }}
                className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
              >
                ← Back to Discussions
              </button>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                {selectedDiscussion.sector}
              </span>
            </div>
            
            {/* Discussion Header */}
            <div className="flex items-start gap-6 mb-8">
              <div className="bg-orange-100 p-4 rounded-full">
                <User className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {selectedDiscussion.isPinned && <Pin className="w-5 h-5 text-orange-600" />}
                  <h1 className="text-3xl font-semibold text-gray-900">{selectedDiscussion.title}</h1>
                </div>
                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <span className="font-medium">{selectedDiscussion.author}</span>
                  <span>{selectedDiscussion.timestamp}</span>
                </div>
                
                {/* Discussion Content */}
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    This discussion focuses on implementing effective strategies for {selectedDiscussion.sector.toLowerCase()} initiatives. 
                    We're looking to share experiences, best practices, and collaborate on innovative solutions that can benefit our communities.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mt-4">
                    Key areas for discussion include resource allocation, community engagement, partnership building, 
                    and measuring impact. Your insights and experiences are valuable to help shape better approaches in this sector.
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold">
                    <ThumbsUp className="w-5 h-5" />
                    Like ({selectedDiscussion.likes})
                  </button>
                  <button className="flex items-center gap-2 border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-xl hover:bg-orange-50 transition-colors font-semibold">
                    <Reply className="w-5 h-5" />
                    Reply ({selectedDiscussion.replies})
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <Eye className="w-5 h-5" />
                    156 views
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Replies Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Replies ({selectedDiscussion.replies})</h2>
            
            {/* Reply Form */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your thoughts and experiences..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <button className="hover:text-orange-600 transition-colors">📎 Attach file</button>
                      <button className="hover:text-orange-600 transition-colors">😊 Add emoji</button>
                    </div>
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
                      Post Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sample Replies */}
            <div className="space-y-6">
              {[
                {
                  id: '1',
                  author: 'Dr. Sanjay Verma',
                  timestamp: '1 hour ago',
                  content: 'Great discussion topic! In our experience with rural education programs, we\'ve found that community involvement is crucial. We\'ve seen 40% better outcomes when local leaders are actively engaged in the planning process.',
                  likes: 8,
                  replies: 2
                },
                {
                  id: '2',
                  author: 'Anita Desai',
                  timestamp: '3 hours ago',
                  content: 'This aligns perfectly with our recent project findings. We\'ve been implementing similar strategies in Maharashtra and would love to share our resource allocation framework. It might be helpful for organizations starting new initiatives.',
                  likes: 12,
                  replies: 4
                },
                {
                  id: '3',
                  author: 'Rohit Malhotra',
                  timestamp: '5 hours ago',
                  content: 'Thank you for starting this important conversation. I\'ve attached our latest impact assessment report that shows measurable outcomes from our collaborative approach. Happy to discuss the methodology in detail.',
                  likes: 15,
                  replies: 6
                }
              ].map((reply) => (
                <div key={reply.id} className="border-l-4 border-orange-200 pl-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <User className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="font-semibold text-gray-900">{reply.author}</span>
                        <span className="text-gray-600 text-sm">{reply.timestamp}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{reply.content}</p>
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors text-sm">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{reply.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors text-sm">
                          <Reply className="w-4 h-4" />
                          Reply ({reply.replies})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedDiscussion.replies > 3 && (
              <div className="text-center mt-8">
                <button className="text-orange-600 hover:text-orange-700 font-medium">
                  Load more replies ({selectedDiscussion.replies - 3} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === 'interaction-detail' && selectedInteractionDetail && (
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={() => {
                  setActiveView('quick-interactions');
                  setSelectedInteractionDetail(null);
                }}
                className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
              >
                ← Back to Interactions
              </button>
              <div className="flex items-center gap-3">
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                  {selectedInteractionDetail.sector}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedInteractionDetail.type === 'Need Help' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {selectedInteractionDetail.type}
                </span>
              </div>
            </div>
            
            <div className="flex items-start gap-6 mb-8">
              <div className={`p-4 rounded-xl ${
                selectedInteractionDetail.type === 'Need Help' ? 'bg-orange-100' : 'bg-green-100'
              }`}>
                {selectedInteractionDetail.type === 'Need Help' ? 
                  <HelpCircle className="w-8 h-8 text-orange-600" /> :
                  <UserCheck className="w-8 h-8 text-green-600" />
                }
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-semibold text-gray-900 mb-4">{selectedInteractionDetail.title}</h1>
                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <span className="font-medium">{selectedInteractionDetail.author}</span>
                  <span>{selectedInteractionDetail.timestamp}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedInteractionDetail.urgency === 'Immediate' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedInteractionDetail.urgency}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {selectedInteractionDetail.type === 'Need Help' 
                      ? `We are looking for assistance with ${selectedInteractionDetail.title.toLowerCase()}. This is an ${selectedInteractionDetail.urgency.toLowerCase()} priority request in the ${selectedInteractionDetail.sector} sector.`
                      : `We are offering help with ${selectedInteractionDetail.title.toLowerCase()}. This service is available ${selectedInteractionDetail.urgency.toLowerCase()} in the ${selectedInteractionDetail.sector} sector.`
                    }
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => {
                      setSelectedInteraction(selectedInteractionDetail);
                      setShowResponseModal(true);
                    }}
                    className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Respond ({selectedInteractionDetail.responses})
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <Eye className="w-5 h-5" />
                    89 views
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && selectedInteraction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 my-8 max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => {
                setShowResponseModal(false);
                setSelectedInteraction(null);
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-6">
              <div className={`p-4 rounded-xl mb-4 ${
                selectedInteraction.type === 'Need Help' ? 'bg-orange-100' : 'bg-green-100'
              }`}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{selectedInteraction.title}</h2>
                <div className="flex items-center gap-3">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedInteraction.sector}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedInteraction.type === 'Need Help' 
                      ? 'bg-orange-100 text-orange-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedInteraction.type}
                  </span>
                  <span className="text-gray-600">{selectedInteraction.author} • {selectedInteraction.timestamp}</span>
                </div>
              </div>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              setQuickInteractions(prev => 
                prev.map(item => 
                  item.id === selectedInteraction.id 
                    ? { ...item, responses: item.responses + 1 }
                    : item
                )
              );
              setShowResponseModal(false);
              setSelectedInteraction(null);
              alert(`Your response has been sent to ${selectedInteraction.author}!`);
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                <input
                  name="organization"
                  type="text"
                  required
                  placeholder="Your organization name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder={selectedInteraction.type === 'Need Help' 
                    ? 'Explain how you can help with this request...' 
                    : 'Share your interest and how you can collaborate...'}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 bg-orange-500 text-white py-4 px-8 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg"
                >
                  Send Response
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedInteraction(null);
                  }}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modals */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl mx-4 my-8 max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setShowNewPost(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Start New Discussion</h2>
            <form className="space-y-6" onSubmit={handleNewDiscussion}>
              <input
                name="author"
                type="text"
                placeholder="Your name"
                required
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
              <input
                name="title"
                type="text"
                placeholder="Discussion title..."
                required
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
              <select name="sector" required className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg">
                <option value="">Select Sector</option>
                {sectors.map(sector => <option key={sector.id} value={sector.name}>{sector.name}</option>)}
              </select>
              <textarea
                name="content"
                rows={6}
                placeholder="Share your thoughts..."
                required
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
              <button type="submit" className="w-full bg-orange-500 text-white py-4 px-8 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg">
                Post Discussion
              </button>
            </form>
          </div>
        </div>
      )}

      {showQuickPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl mx-4 my-8 max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setShowQuickPost(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Quick Post</h2>
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const authorName = formData.get('author') as string || 'Anonymous User';
              const newInteraction = {
                id: Date.now().toString(),
                title: formData.get('title') as string,
                author: authorName,
                sector: formData.get('sector') as string,
                type: formData.get('type') as string,
                urgency: formData.get('urgency') as string,
                timestamp: 'Just now',
                responses: 0,
                status: 'Active'
              };
              setQuickInteractions([newInteraction, ...quickInteractions]);
              
              // Add to recent activities
              const newActivity = {
                id: Date.now().toString() + '_activity',
                type: 'interaction',
                title: `New ${formData.get('type')} Post in ${formData.get('sector')} Sector`,
                description: `"${formData.get('title')}" posted by ${authorName}`,
                timestamp: 'Just now',
                icon: formData.get('type') === 'Need Help' ? HelpCircle : UserCheck,
                iconColor: formData.get('type') === 'Need Help' ? 'orange' : 'green',
                stats: ['0 responses', `${formData.get('urgency')} urgency`]
              };
              setRecentActivities([newActivity, ...recentActivities]);
              setShowQuickPost(false);
            }}>
              <input
                name="author"
                type="text"
                placeholder="Your name"
                required
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
              <input
                name="title"
                type="text"
                placeholder="What do you need help with or what can you offer?"
                required
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
              <div className="grid grid-cols-3 gap-6">
                <select name="sector" required className="px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg">
                  <option value="">Select Sector</option>
                  {sectors.map(sector => <option key={sector.id} value={sector.name}>{sector.name}</option>)}
                </select>
                <select name="type" required className="px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg">
                  <option value="">Type</option>
                  <option value="Need Help">Need Help</option>
                  <option value="Can Help">Can Help</option>
                </select>
                <select name="urgency" required className="px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg">
                  <option value="">Urgency</option>
                  <option value="Immediate">Immediate</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>
              </div>
              <textarea
                name="description"
                rows={4}
                placeholder="Provide more details about your request or offer..."
                className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
              <button type="submit" className="w-full bg-orange-500 text-white py-4 px-8 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg">
                Post Quick Interaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Join Network Modal */}
      {showJoinModal && joiningsector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 my-8 max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => {
                setShowJoinModal(false);
                setJoiningSector(null);
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {(() => {
              const sector = sectors.find(s => s.id === joiningsector);
              if (!sector) return null;
              const Icon = sector.icon;
              
              return (
                <div>
                  <div className="text-center mb-8">
                    <div className={`${sector.color} p-6 rounded-2xl w-fit mx-auto mb-4`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Join {sector.name} Network</h2>
                    <p className="text-lg text-gray-600">{sector.description}</p>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Network Benefits:</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Connect with {sector.ngoCount} NGOs in {sector.name}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Access to sector-specific discussions and resources</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Collaboration opportunities with partner organizations</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Priority access to sector events and training</span>
                      </li>
                    </ul>
                  </div>
                  
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    setJoinedSectors([...joinedSectors, joiningsector]);
                    setShowJoinModal(false);
                    setJoiningSector(null);
                    alert(`Successfully joined ${sector.name} Network! You can now participate in discussions and access resources.`);
                  }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your organization name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
                      <select required className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        <option value="">Select your role</option>
                        <option value="Director">Director/CEO</option>
                        <option value="Program Manager">Program Manager</option>
                        <option value="Project Coordinator">Project Coordinator</option>
                        <option value="Field Officer">Field Officer</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to join this network?</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your interest in this sector and how you plan to contribute..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="terms" required className="w-5 h-5 text-orange-600" />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the network guidelines and commit to active participation
                      </label>
                    </div>
                    
                    <button type="submit" className="w-full bg-orange-500 text-white py-4 px-8 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg">
                      Join Network
                    </button>
                  </form>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* New Sector Modal */}
      {showNewSectorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 my-8 max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => setShowNewSectorModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
              <div className="bg-orange-500 p-6 rounded-2xl w-fit mx-auto mb-4">
                <Plus className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Join New Sector</h2>
              <p className="text-lg text-gray-600">Request to join a sector that's not currently listed</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              setShowNewSectorModal(false);
              alert('Your request has been submitted! We will review and add the new sector soon.');
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sector Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rural Development, Disaster Relief, etc."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sector Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the focus and goals of this sector..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Organization</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your organization name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why is this sector needed?</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain why this sector should be added and how it will benefit the NGO community..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <button type="submit" className="w-full bg-orange-500 text-white py-4 px-8 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl mx-4 my-8 max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={() => {
                setShowPreviewModal(false);
                setPreviewResource(null);
              }}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-100 p-4 rounded-xl">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{previewResource.title}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {previewResource.sector}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {previewResource.type}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Download className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{previewResource.downloads}</p>
                  <p className="text-gray-600">Downloads</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{previewResource.rating}</p>
                  <p className="text-gray-600">Rating</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-gray-600">Views</p>
                </div>
              </div>
            </div>
            
            {/* Document Preview Area */}
            <div className="bg-gray-100 rounded-xl p-8 mb-8 min-h-[400px]">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Document Preview</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm text-left max-w-2xl mx-auto">
                  <h4 className="text-lg font-semibold mb-4">{previewResource.title}</h4>
                  <p className="text-gray-700 mb-4">
                    This is a preview of the {previewResource.type.toLowerCase()} document. The content includes comprehensive information about {previewResource.sector.toLowerCase()} sector initiatives and best practices.
                  </p>
                  <div className="space-y-3 text-gray-600">
                    <p>• Introduction to {previewResource.sector} sector challenges</p>
                    <p>• Implementation strategies and methodologies</p>
                    <p>• Case studies and success stories</p>
                    <p>• Resource allocation and budget planning</p>
                    <p>• Monitoring and evaluation frameworks</p>
                    <p>• Collaboration opportunities with partner organizations</p>
                  </div>
                  <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      <strong>Note:</strong> This is a preview. Download the full document to access all content, detailed charts, and appendices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = `${previewResource.title.replace(/\s+/g, '_')}.pdf`;
                  link.click();
                  alert(`Downloaded: ${previewResource.title}`);
                }}
                className="flex-1 bg-orange-500 text-white py-4 px-8 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-lg flex items-center justify-center gap-3"
              >
                <Download className="w-5 h-5" />
                Download Full Document
              </button>
              <button 
                onClick={() => {
                  setShowPreviewModal(false);
                  setPreviewResource(null);
                }}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}