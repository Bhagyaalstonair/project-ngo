import React, { useState } from 'react';
import { 
  Shield, FileText, Send, FolderOpen, Bell, HelpCircle, 
  Search, CheckCircle, AlertCircle, Download, 
  Eye, MessageSquare, Phone, Mail
} from 'lucide-react';
import { useScrollReset } from '../../hooks/useScrollReset';

export function GovernmentHub() {
  useScrollReset();
  const [activeTab, setActiveTab] = useState('verification');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<{
    id: string;
    title: string;
    department: string;
    category: string;
    amount: string;
    deadline: string;
    status: string;
    eligibility: string;
    description: string;
    documents: string[];
    applicationFee: string;
  } | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'agent', text: 'Hello! How can I help you today?', time: new Date().toLocaleTimeString() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [notificationsList, setNotificationsList] = useState([
    {
      id: '1',
      type: 'Application Update',
      title: 'PM CARES Fund Application - Technical Review Completed',
      message: 'Your application has passed technical review and moved to final approval stage.',
      date: '2025-01-12',
      read: false
    },
    {
      id: '2',
      type: 'Report Reminder',
      title: 'Monthly Report Due Soon',
      message: 'Your monthly progress report for Rural Healthcare Initiative is due in 3 days.',
      date: '2025-01-11',
      read: false
    },
    {
      id: '3',
      type: 'New Scheme',
      title: 'New Grant Opportunity Available',
      message: 'Education Ministry has announced new grants for skill development programs.',
      date: '2025-01-10',
      read: true
    }
  ]);

  const handleMarkAllRead = () => {
    setNotificationsList(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    
    setTimeout(() => {
      const responses = [
        'Thank you for your message. Let me help you with that.',
        'I understand your concern. Let me check that for you.',
        'That\'s a great question! Here\'s what I can tell you...',
        'I\'ll be happy to assist you with this matter.',
        'Let me connect you with the right department for this query.'
      ];
      const agentResponse = {
        id: Date.now() + 1,
        sender: 'agent',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  // Mock data for government schemes
  const governmentSchemes = [
    {
      id: '1',
      title: 'PM CARES Fund Grant',
      department: 'Prime Minister Office',
      category: 'Healthcare',
      amount: '₹50,00,000',
      deadline: '2025-03-15',
      status: 'Open',
      eligibility: 'Registered NGOs working in healthcare sector',
      description: 'Grant for NGOs working on healthcare initiatives and COVID-19 relief work.',
      documents: ['Registration Certificate', 'Audited Financial Statements', 'Project Proposal'],
      applicationFee: '₹500'
    },
    {
      id: '2',
      title: 'Swachh Bharat Mission Grant',
      department: 'Ministry of Housing and Urban Affairs',
      category: 'Sanitation',
      amount: '₹25,00,000',
      deadline: '2025-02-28',
      status: 'Open',
      eligibility: 'NGOs with 3+ years experience in sanitation projects',
      description: 'Funding for sanitation and cleanliness initiatives across rural and urban areas.',
      documents: ['NGO Registration', 'Previous Project Reports', 'Community Impact Assessment'],
      applicationFee: '₹300'
    },
    {
      id: '3',
      title: 'Digital India Initiative',
      department: 'Ministry of Electronics and IT',
      category: 'Technology',
      amount: '₹75,00,000',
      deadline: '2025-04-10',
      status: 'Open',
      eligibility: 'Tech-focused NGOs with digital literacy programs',
      description: 'Support for digital literacy and technology adoption programs in rural areas.',
      documents: ['Technical Proposal', 'Team Credentials', 'Implementation Timeline'],
      applicationFee: '₹750'
    }
  ];

  // Mock verification data
  const verificationStatus = {
    status: 'Verified',
    verifiedDate: '2024-12-01',
    certificateNumber: 'NGO-IND-2024-001234',
    validUntil: '2025-12-01',
    verifiedBy: 'Ministry of Home Affairs',
    documents: [
      { name: '12A Registration', status: 'Verified', date: '2024-12-01' },
      { name: '80G Certificate', status: 'Verified', date: '2024-12-01' },
      { name: 'FCRA Registration', status: 'Pending', date: '2024-12-15' },
      { name: 'PAN Card', status: 'Verified', date: '2024-12-01' }
    ]
  };

  // Mock application data
  const applications = [
    {
      id: 'APP001',
      scheme: 'PM CARES Fund Grant',
      submittedDate: '2024-12-10',
      amount: '₹50,00,000',
      status: 'Under Review',
      reviewStage: 'Technical Evaluation',
      nextAction: 'Awaiting technical committee review'
    },
    {
      id: 'APP002',
      scheme: 'Swachh Bharat Mission Grant',
      submittedDate: '2024-11-25',
      amount: '₹25,00,000',
      status: 'Approved',
      reviewStage: 'Completed',
      nextAction: 'Fund disbursement in progress'
    }
  ];

  // Mock documents data
  const documents = [
    { name: 'Registration Certificate', type: 'PDF', size: '2.4 MB', date: '2024-12-01', shared: true },
    { name: 'Audited Financial Report 2024', type: 'PDF', size: '5.2 MB', date: '2024-11-15', shared: false },
    { name: 'Project Proposal - Healthcare', type: 'DOCX', size: '1.8 MB', date: '2024-12-10', shared: true },
    { name: 'Impact Assessment Report', type: 'PDF', size: '3.1 MB', date: '2024-12-05', shared: false },
    { name: 'Budget Utilization Report', type: 'XLSX', size: '890 KB', date: '2024-11-28', shared: true },
    { name: 'Compliance Certificate', type: 'PDF', size: '1.2 MB', date: '2024-12-12', shared: true }
  ];

  const renderVerificationTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-full ${
            verificationStatus.status === 'Verified' ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            <Shield className={`w-6 h-6 ${
              verificationStatus.status === 'Verified' ? 'text-green-600' : 'text-yellow-600'
            }`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">NGO Verification Status</h3>
            <p className="text-gray-600">Your organization's government verification details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Verification Status</label>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">{verificationStatus.status}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Certificate Number</label>
              <p className="text-gray-900 font-mono">{verificationStatus.certificateNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Verified By</label>
              <p className="text-gray-900">{verificationStatus.verifiedBy}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Verified Date</label>
              <p className="text-gray-900">{verificationStatus.verifiedDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Valid Until</label>
              <p className="text-gray-900">{verificationStatus.validUntil}</p>
            </div>
            <button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`NGO Verification Certificate\n\nCertificate Number: ${verificationStatus.certificateNumber}\nStatus: ${verificationStatus.status}\nVerified By: ${verificationStatus.verifiedBy}\nValid Until: ${verificationStatus.validUntil}`);
                link.download = 'ngo-verification-certificate.txt';
                link.click();
              }}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Download Certificate
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Documents</h4>
          <div className="space-y-3">
            {verificationStatus.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <span className="font-medium text-gray-900">{doc.name}</span>
                  <p className="text-xs text-gray-500 mt-1">{doc.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => alert(`Document: ${doc.name}\nUploaded: ${doc.date}\nStatus: ${doc.status}`)}
                    className="px-3 py-1 text-sm text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Document: ${doc.name}\nUploaded: ${doc.date}\nStatus: ${doc.status}`);
                      link.download = doc.name.toLowerCase().replace(/\s+/g, '-') + '.txt';
                      link.click();
                    }}
                    className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchemesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search schemes by title, department, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Sanitation">Sanitation</option>
          <option value="Technology">Technology</option>
          <option value="Education">Education</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {governmentSchemes
          .filter(scheme => {
            const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                scheme.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                scheme.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = selectedFilter === 'all' || scheme.category === selectedFilter;
            return matchesSearch && matchesFilter;
          })
          .map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{scheme.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{scheme.department}</p>
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {scheme.category}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                scheme.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {scheme.status}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Grant Amount:</span>
                <span className="font-semibold text-gray-900">{scheme.amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Application Fee:</span>
                <span className="font-semibold text-gray-900">{scheme.applicationFee}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Deadline:</span>
                <span className="font-semibold text-red-600">{scheme.deadline}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedScheme(scheme)}
                className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Apply Now
              </button>
              <button 
                onClick={() => alert(`Viewing details for: ${scheme.title}\n\nDepartment: ${scheme.department}\nAmount: ${scheme.amount}\nDeadline: ${scheme.deadline}\nDescription: ${scheme.description}`)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplicationsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">My Applications</h3>
        <button 
          onClick={() => setShowApplicationModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          New Application
        </button>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{app.scheme}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Application ID: {app.id}</span>
                  <span>Submitted: {app.submittedDate}</span>
                  <span>Amount: {app.amount}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert(`Application Details:\n\nID: ${app.id}\nScheme: ${app.scheme}\nStatus: ${app.status}\nAmount: ${app.amount}\nStage: ${app.reviewStage}\nNext Action: ${app.nextAction}`)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                View Details
              </button>
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Application: ${app.scheme}\nID: ${app.id}\nStatus: ${app.status}\nAmount: ${app.amount}`);
                  link.download = `application-${app.id}.txt`;
                  link.click();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Download Application
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );



  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Notifications & Communication</h3>
        <button 
          onClick={handleMarkAllRead}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Mark All Read
        </button>
      </div>

      <div className="space-y-4">
        {notificationsList.map((notification) => (
          <div key={notification.id} className={`bg-white rounded-xl shadow-sm border p-6 ${
            !notification.read ? 'border-orange-200 bg-orange-50' : 'border-gray-100'
          }`}>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{notification.date}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-orange-500 hover:text-orange-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="text-orange-500 hover:text-orange-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSupportTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 mb-4">Get immediate help from our support team</p>
          <button 
            onClick={() => window.open('tel:+91XXXXXXXXXX', '_self')}
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            +91 8068447416
          </button>
          <p className="text-sm text-gray-500 mt-2">Mon-Fri, 9 AM - 6 PM</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 mb-4">Send us your queries and get detailed responses</p>
          <button 
            onClick={() => window.open('mailto:grants@ngoindia.org?subject=Support Request&body=Hello, I need assistance with...', '_blank')}
            className="font-semibold text-green-600 hover:text-green-700 transition-colors cursor-pointer"
          >
            grants@ngoindia.org
          </button>
          <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-4">Chat with our experts in real-time</p>
          <button 
            onClick={() => setShowChatModal(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Start Chat
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              question: 'How do I verify my NGO with the government?',
              answer: 'To verify your NGO, you need to submit your registration documents, financial statements, and compliance certificates through the verification tab. The process typically takes 7-14 business days.'
            },
            {
              question: 'What tax benefits are available for registered NGOs?',
              answer: 'Registered NGOs can avail 12A and 80G tax exemptions. 12A provides income tax exemption to the NGO, while 80G allows donors to claim tax deductions for their donations.'
            },
            {
              question: 'How can I track my grant application status?',
              answer: 'You can track your application status in the Applications tab. You will also receive email and SMS notifications for any status updates.'
            },
            {
              question: 'What documents are required for scheme applications?',
              answer: 'Common documents include NGO registration certificate, audited financial statements, project proposal, impact assessment reports, and compliance certificates. Specific requirements vary by scheme.'
            },
            {
              question: 'How often do I need to submit progress reports?',
              answer: 'Report submission frequency depends on the grant terms. Typically, monthly progress reports and quarterly financial reports are required. Check your grant agreement for specific requirements.'
            }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <button className="w-full text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </div>
              </button>
              <p className="text-gray-600 mt-3">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const stats = [
    { label: 'Active Schemes', value: '24', icon: FileText, color: 'text-blue-600' },
    { label: 'Applications Submitted', value: '8', icon: Send, color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Hub</h1>
            <p className="text-gray-600">Manage government relations, schemes, and compliance</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowApplicationModal(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Quick Apply
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto gap-8">
            {[
              { id: 'verification', label: 'NGO Verification', icon: Shield },
              { id: 'schemes', label: 'Government Schemes', icon: FileText },
              { id: 'applications', label: 'Applications', icon: Send },
  
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'support', label: 'Support & FAQ', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-orange-500 text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'verification' && renderVerificationTab()}
          {activeTab === 'schemes' && renderSchemesTab()}
          {activeTab === 'applications' && renderApplicationsTab()}

          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'support' && renderSupportTab()}
        </div>
      </div>

      {/* Application Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Apply for {selectedScheme.title}</h3>
                <button 
                  onClick={() => setSelectedScheme(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Department</label>
                  <p className="text-gray-900">{selectedScheme.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Grant Amount</label>
                  <p className="text-gray-900 font-semibold">{selectedScheme.amount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Application Deadline</label>
                  <p className="text-gray-900 text-red-600">{selectedScheme.deadline}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Eligibility</label>
                  <p className="text-gray-900">{selectedScheme.eligibility}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Required Documents</label>
                  <ul className="list-disc list-inside text-gray-900 space-y-1">
                    {selectedScheme.documents.map((doc: string, index: number) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    alert(`Application submitted for ${selectedScheme.title}!\n\nYou will receive a confirmation email shortly.`);
                    setSelectedScheme(null);
                  }}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Proceed to Application
                </button>
                <button 
                  onClick={() => setSelectedScheme(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Upload Document</h3>
              <input type="file" className="w-full p-3 border rounded-lg mb-4" />
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setShowUploadModal(false);
                  }}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Upload
                </button>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Send className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Quick Application</h3>
                  <p className="text-gray-600">Select a scheme to start your application</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Schemes</label>
                <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all">
                  <option value="">Choose a government scheme...</option>
                  {governmentSchemes.map(scheme => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <AlertCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm">Quick Apply Benefits</h4>
                    <p className="text-blue-700 text-sm mt-1">Pre-filled forms, faster processing, and priority support</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    alert('Application started! Redirecting to application form.');
                    setShowApplicationModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Start Application
                </button>
                <button 
                  onClick={() => setShowApplicationModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Live Chat Support</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4 h-48 overflow-y-auto">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-2 rounded-lg max-w-xs ${
                      message.sender === 'user' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-white border text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <input 
                type="text" 
                placeholder="Type your message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="w-full p-3 border rounded-lg mb-4"
              />
              <div className="flex gap-3">
                <button 
                  onClick={handleSendMessage}
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg"
                >
                  Send
                </button>
                <button 
                  onClick={() => setShowChatModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}