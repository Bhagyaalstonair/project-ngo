import React, { useState } from 'react';
import { FileText, Download, Eye, Copy, Building2, GraduationCap, Landmark, Users, Handshake, X } from 'lucide-react';
import jsPDF from 'jspdf';

interface MOUTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

const mouTemplates: MOUTemplate[] = [
  {
    id: 'general',
    title: 'General NGO Partnership MOU',
    description: 'Standard partnership agreement between NGOs and partner organizations.',
    category: 'Partnership',
    content: `Memorandum of Understanding
[Date]

Participating Parties
[NGO Name]'s mission is [insert mission statement - e.g., fostering communities of strong women, supported families and safe homes].

[NGO Name] is dedicated to [insert specific focus area - e.g., supporting individuals victimized by domestic and/or sexual violence and/or stalking and their children]. The program promotes social change through education and actions that develop resources and collaboration within and across communities to [insert specific goals].

[Partner Organization]'s mission: [Insert partner organization's mission statement and commitment to the collaborative goals].

Description of Collaborative Relationship
[NGO Name] and [Partner Organization] developed this Memorandum of Understanding (MOU) to improve collaboration between our agencies and to enhance services for [target beneficiaries]. This collaboration identifies the following strategies to achieve these goals:

1. Maintain a dialogue between the two agencies that facilitates the ongoing development of this agreement.
2. Conduct [monthly/quarterly] workgroup meetings as a forum to address intervention strategies that meet the needs of [target population]. The purpose being to strengthen this relationship through joint training and cross-training as well as discussion on policy and practice issues that may arise between agencies and within the [location/community] communities.
3. Resolve potential conflicts in a respectful and professional manner.
4. Act as team members to advocate for the development of resources needed for a coordinated community response to [specific issue area], and participate in team meetings to support [specific objectives].
5. Provide training and orientation on the collaboration for all new staff at each agency.
6. Provide annual cross-trainings and co-facilitate community outreach and trainings.
7. Share resources, expertise, and networks for achieving the desired outcomes while ensuring transparency and accountability in all collaborative activities.
8. Collaborate on joint planning and implementation of activities related to [project name/area].

Duration and Review
This MOU shall remain in effect for a period of [X months/years], commencing on [Start Date] and concluding on [End Date], unless extended or terminated by mutual consent. Regular review meetings shall be conducted [quarterly/monthly] to assess progress and outcomes.

Confidentiality
[NGO Name] and [Partner Organization] are governed by different confidentiality policies. As a result, both parties will continually define and clarify confidentiality issues that arise as a result of collaboration.

1. [NGO Name] maintains [specific confidentiality protocols - e.g., evidentiary privilege as defined in relevant statutes]. Their communications with [beneficiaries/clients] are completely confidential and will be guided by [NGO Name]'s confidentiality policies.
2. [Partner Organization] follows [specific confidentiality requirements] and will respect the confidentiality protocols of [NGO Name] while maintaining their own organizational requirements.
3. Both parties agree to maintain confidentiality regarding any proprietary or sensitive information shared during the collaboration.

Financial Arrangements
Each party shall bear its own expenses unless otherwise specified. Specific financial commitments, if any, shall be detailed in an annexure or project agreement.

Amendments and Termination
This MOU may be amended at any time through mutual written consent. Either party may terminate this MOU with [30/60] days' written notice, provided that all ongoing commitments are fulfilled.

Signatures`
  },
  {
    id: 'corporate-csr',
    title: 'NGO & Corporate (CSR Partnership)',
    description: 'MOU template for CSR partnerships with corporate entities.',
    category: 'Corporate',
    content: `Memorandum of Understanding
[Date]

Participating Parties
[Company Name]'s mission is [insert company mission statement and CSR commitment].

[NGO Name] is dedicated to [insert specific focus area] and promotes social change through education and actions that develop resources and collaboration within communities.

[Company Name]'s CSR mission: To implement [project name] in compliance with Companies Act Section 135 and create meaningful social impact.

Description of Collaborative Relationship
[Company Name] and [NGO Name] developed this MOU to define roles under a CSR initiative. This collaboration identifies the following strategies:

1. Establish CSR fund allocation with total commitment of ₹[Amount] and [Quarterly/Annual] disbursement schedule.
2. Implement joint branding and communication guidelines including logo usage rights and press release approvals.
3. Ensure Companies Act Section 135 adherence with CSR committee oversight and statutory audit requirements.
4. Deliver quarterly progress reports, financial utilization certificates, and beneficiary impact statements.
5. Conduct monthly review meetings, site visits, and third-party evaluation for outcome measurement.

Duration and Review
This MOU shall remain in effect for [Duration], commencing on [Start Date] and concluding on [End Date], unless extended by mutual consent. Review meetings shall be conducted monthly.

Confidentiality
[Company Name] and [NGO Name] agree to maintain confidentiality regarding proprietary information, CSR strategies, and beneficiary data shared during collaboration.

Financial Arrangements
[Company Name] shall provide CSR funding as per agreed schedule. [NGO Name] shall provide detailed utilization reports and maintain transparency in fund usage.

Amendments and Termination
This MOU may be amended through mutual written consent. Either party may terminate with [30/60] days' written notice, ensuring all CSR commitments are fulfilled.

Signatures`
  },
  {
    id: 'educational',
    title: 'NGO & Educational Institution',
    description: 'Template for training and internship programs with educational institutions.',
    category: 'Education',
    content: `Memorandum of Understanding
[Date]

Participating Parties
[Educational Institution]'s mission is to provide quality education and practical learning opportunities for students in [relevant fields].

[NGO Name] is dedicated to [insert specific focus area] and promotes social change through education, training, and community engagement programs.

[Educational Institution]'s commitment: To facilitate student internships and skill development programs in collaboration with [NGO Name].

Description of Collaborative Relationship
[Educational Institution] and [NGO Name] developed this MOU to enhance student learning through practical experience. This collaboration identifies the following strategies:

1. Establish internship framework with duration of [X weeks/months] for [X per batch] students in [List areas] with academic credit eligibility.
2. Define student responsibilities including 80% minimum attendance, project deliverables, and weekly progress reports.
3. Create mentorship structure with NGO mentor assignment and academic supervisor coordination.
4. Implement joint certification process with skill assessment parameters and industry recognition standards.
5. Share resources including training materials, technology platforms, and expert guest lecture arrangements.

Duration and Review
This MOU shall remain in effect for [X months/years], commencing on [Start Date] and concluding on [End Date], unless extended by mutual consent. Review meetings shall be conducted [quarterly/monthly].

Confidentiality
[Educational Institution] and [NGO Name] agree to maintain confidentiality regarding student information, proprietary training materials, and sensitive project data.

Financial Arrangements
Each party shall bear its own expenses unless otherwise specified. Any shared costs for training materials or resources shall be detailed in a separate agreement.

Amendments and Termination
This MOU may be amended through mutual written consent. Either party may terminate with [30/60] days' written notice, ensuring student commitments are fulfilled.

Signatures`
  },
  {
    id: 'government',
    title: 'NGO & Government Agency',
    description: 'Collaboration template for government partnerships and policy implementation.',
    category: 'Government',
    content: `Memorandum of Understanding
[Date]

Participating Parties
[Government Agency]'s mission is to implement government policies and schemes for public welfare and community development.

[NGO Name] is dedicated to [insert specific focus area] and promotes social change through community outreach and policy implementation support.

[Government Agency]'s objective: To collaborate on policy implementation, awareness programs, and community outreach under [specific government scheme].

Description of Collaborative Relationship
[Government Agency] and [NGO Name] developed this MOU to enhance policy implementation and community outreach. This collaboration identifies the following strategies:

1. Ensure legal and administrative compliance including registration verification, FCRA compliance, and statutory reporting obligations.
2. Define scope of collaboration covering geographic area, target beneficiary groups, and implementation timeline with expected outcomes.
3. Establish data sharing and reporting protocols with privacy measures and government reporting formats.
4. Implement government logo and branding guidelines with official emblem usage and co-branding specifications.
5. Create financial framework with government fund allocation, expenditure guidelines, and audit verification processes.

Duration and Review
This MOU shall remain in effect for [X months/years], commencing on [Start Date] and concluding on [End Date], unless extended by mutual consent. Review meetings shall be conducted [quarterly/monthly].

Confidentiality
[Government Agency] and [NGO Name] agree to maintain confidentiality regarding beneficiary data, policy information, and sensitive government schemes shared during collaboration.

Financial Arrangements
[Government Agency] shall provide funding as per approved budget. [NGO Name] shall maintain detailed expenditure records and comply with government audit requirements.

Amendments and Termination
This MOU may be amended through mutual written consent. Either party may terminate with [30/60] days' written notice, ensuring all government commitments are fulfilled.

Signatures`
  },
  {
    id: 'ngo-collaboration',
    title: 'NGO-to-NGO Collaboration',
    description: 'Partnership template for collaboration between NGOs.',
    category: 'NGO Partnership',
    content: `Memorandum of Understanding
[Date]

Participating Parties
[NGO 1 Name]'s mission is [insert mission statement focusing on specific areas like child education, environment, or health].

[NGO 2 Name] is dedicated to [insert specific focus area] and promotes social change through community engagement and collaborative partnerships.

[NGO 1 Name] and [NGO 2 Name]'s joint purpose: To execute projects in overlapping regions or thematic areas for maximum community impact.

Description of Collaborative Relationship
[NGO 1 Name] and [NGO 2 Name] developed this MOU to jointly execute projects and share resources. This collaboration identifies the following strategies:

1. Share resources including manpower allocation, facility and equipment sharing, and database research sharing for joint procurement benefits.
2. Establish partnership structure with lead partner designation, co-partner responsibilities, and decision-making hierarchy.
3. Create coordination mechanisms through joint steering committee, monthly meetings, and shared project management tools.
4. Implement joint funding and financial management with cost-sharing arrangements and donor reporting coordination.
5. Develop unified monitoring framework with joint impact assessment and shared success metrics for combined reporting.

Duration and Review
This MOU shall remain in effect for [Duration], commencing on [Start Date] and concluding on [End Date], unless extended by mutual consent. Review meetings shall be conducted [Frequency].

Confidentiality
[NGO 1 Name] and [NGO 2 Name] agree to maintain confidentiality regarding beneficiary information, joint strategies, and sensitive project data shared during collaboration.

Financial Arrangements
Each NGO shall contribute resources as agreed. Joint fundraising initiatives and cost-sharing arrangements shall be detailed in separate financial agreements.

Amendments and Termination
This MOU may be amended through mutual written consent. Either party may terminate with [30/60] days' written notice, ensuring all joint commitments are fulfilled.

Signatures`
  }
];

interface UserDetails {
  name: string;
  role: string;
  organization: string;
  email: string;
  phone: string;
  partnerName?: string;
  partnerOrganization?: string;
  amount?: string;
  duration?: string;
  location?: string;
}

export function MOUTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<MOUTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    role: '',
    organization: '',
    email: '',
    phone: '',
    partnerName: '',
    partnerOrganization: '',
    amount: '',
    duration: '',
    location: ''
  });
  const [populatedContent, setPopulatedContent] = useState<string>('');
  const [copyStatus, setCopyStatus] = useState<string>('');

  const categories = ['All', ...Array.from(new Set(mouTemplates.map(t => t.category)))];

  const filteredTemplates = mouTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateClick = (template: MOUTemplate) => {
    setSelectedTemplate(template);
  };

  const handleDownloadClick = (template: MOUTemplate) => {
    setSelectedTemplate(template);
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTemplate) {
      const populated = populateTemplate(selectedTemplate.content, userDetails);
      handleDownload(populated, selectedTemplate);
      resetForm();
    }
  };

  const populateTemplate = (content: string, details: UserDetails): string => {
    return content
      .replace(/\[NGO 1 Name\]/g, details.organization)
      .replace(/\[NGO 2 Name\]/g, details.partnerOrganization || '[Partner Organization]')
      .replace(/\[NGO Name\]/g, details.organization)
      .replace(/\[Name of NGO\]/g, details.organization)
      .replace(/\[Organization Name\]/g, details.organization)
      .replace(/\[Partner Name\]/g, details.partnerName || '[Partner Name]')
      .replace(/\[Name of Partner Organization\]/g, details.partnerOrganization || '[Partner Organization]')
      .replace(/\[Partner Organization\]/g, details.partnerOrganization || '[Partner Organization]')
      .replace(/\[Company Name\]/g, details.partnerOrganization || '[Company Name]')
      .replace(/\[College\/University\]/g, details.partnerOrganization || '[Educational Institution]')
      .replace(/\[Educational Institution\]/g, details.partnerOrganization || '[Educational Institution]')
      .replace(/\[Government Agency\]/g, details.partnerOrganization || '[Government Agency]')
      .replace(/\[Your Name\]/g, details.name)
      .replace(/\[Your Role\]/g, details.role)
      .replace(/\[Amount\]/g, details.amount || '[Amount]')
      .replace(/₹\[Amount\]/g, details.amount ? `₹${details.amount}` : '₹[Amount]')
      .replace(/\[Duration\]/g, details.duration || '[Duration]')
      .replace(/\[X months\/years\]/g, details.duration || '[X months/years]')
      .replace(/\[Location\]/g, details.location || '[Location]')
      .replace(/\[Email\]/g, details.email)
      .replace(/\[Phone\]/g, details.phone)
      .replace(/\[Frequency\]/g, 'Quarterly')
      .replace(/Date: _________________________/g, `Date: ${new Date().toLocaleDateString()}`)
      .replace(/Date: ______________________________/g, `Date: ${new Date().toLocaleDateString()}`)
      .replace(/Date: ________________________________/g, `Date: ${new Date().toLocaleDateString()}`);
  };

  const handleDownload = (content?: string, template?: MOUTemplate) => {
    const contentToDownload = content || '';
    const templateTitle = template?.title || selectedTemplate?.title || 'Template';
    
    if (!contentToDownload) {
      console.error('No content to download');
      return;
    }
    
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Auto-calculate margin based on content length
    const contentLength = contentToDownload.length;
    const estimatedLines = Math.ceil(contentLength / 80); // Rough estimate of lines needed
    
    // Dynamic margin calculation: more content = smaller margins
    let margin;
    if (estimatedLines > 120) {
      margin = 12; // Very dense content
    } else if (estimatedLines > 100) {
      margin = 15; // Dense content
    } else if (estimatedLines > 80) {
      margin = 18; // Medium content
    } else {
      margin = 20; // Light content
    }
    
    const maxWidth = pageWidth - 2 * margin - 3;
    
    // Set default font to Times New Roman 11pt
    pdf.setFont('times', 'normal');
    pdf.setFontSize(11);
    
    let y = margin;
    
    // Add NGO logo and website details header
    try {
      const logoImg = new Image();
      logoImg.src = '/ngo india logo.png';
      pdf.addImage(logoImg, 'PNG', margin, y, 25, 20);
    } catch (error) {
      // Fallback if logo fails to load
      pdf.setFillColor(255, 165, 0);
      pdf.rect(margin, y, 25, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('times', 'bold');
      pdf.setFontSize(10);
      pdf.text('NGO', margin + 8, y + 12);
    }
    
    // NGO details
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('times', 'bold');
    pdf.setFontSize(12);
    pdf.text('NGO India', margin + 30, y + 8);
    pdf.setFont('times', 'normal');
    pdf.setFontSize(9);
    pdf.text('Email: grants@ngoindia.org | Phone: +91 8068447416', margin + 30, y + 13);
    pdf.text('Website: www.ngoindia.org | Location: Bengaluru, India', margin + 30, y + 17);
    
    // Separator line
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, y + 22, pageWidth - margin, y + 22);
    
    y += 28;
    
    // Add template name in center with bold letters
    pdf.setFont('times', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const templateName = templateTitle;
    const templateNameWidth = pdf.getTextWidth(templateName);
    pdf.text(templateName, (pageWidth - templateNameWidth) / 2, y);
    y += 8;
    
    // Process content with minimal spacing for single page
    const sections = contentToDownload.split('\n');
    
    // Signature-first logic: ensure signature section is always included
    const signatureIndex = sections.findIndex(section => section.trim() === 'Signatures');
    let signatureProcessed = false;
    
    sections.forEach((section: string, index: number) => {
      const trimmedSection = section.trim();
      
      // Skip empty lines
      if (!trimmedSection) {
        return;
      }
      
      // Main title (MOU title)
      if (trimmedSection.includes('MEMORANDUM OF UNDERSTANDING')) {
        pdf.setFont('times', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        const titleLines = pdf.splitTextToSize(trimmedSection, maxWidth);
        titleLines.forEach((line: string) => {
          const lineWidth = pdf.getTextWidth(line);
          pdf.text(line, (pageWidth - lineWidth) / 2, y);
          y += 6;
        });
        y += 3;
        return;
      }
      
      // Section headers (numbered sections)
      if (trimmedSection.match(/^\d+\./)) {
        pdf.setFont('times', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        y += 2;
        pdf.text(trimmedSection, margin, y);
        y += 5;
        return;
      }
      
      // Main section headings (Participating Parties, Description, etc.)
      if (trimmedSection === 'Participating Parties' || trimmedSection === 'Description of Collaborative Relationship' || 
          trimmedSection === 'Duration and Review' || trimmedSection === 'Confidentiality' || 
          trimmedSection === 'Financial Arrangements' || trimmedSection === 'Amendments and Termination') {
        pdf.setFont('times', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        y += 2;
        pdf.text(trimmedSection, margin, y);
        y += 5;
        return;
      }
      
      // Signatures heading with same gap as other sections
      if (trimmedSection === 'Signatures') {
        signatureProcessed = true;
        pdf.setFont('times', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        y += 2;
        pdf.text(trimmedSection, margin, y);
        y += 5; // Same gap as Amendments and Termination
        
        // Add signature data immediately
        const signatureData = [
          ["For [NGO Name]", "For [Partner Organization]"],
          ["Signature: ______________________", "Signature: ______________________"],
          ["Name: ___________________________", "Name: ___________________________"],
          ["Designation: ____________________", "Designation: ____________________"],
          ["Date: ___________________________", "Date: ___________________________"]
        ];
        
        pdf.setFont('times', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        signatureData.forEach((row) => {
          pdf.text(row[0], margin, y);
          pdf.text(row[1], pageWidth / 2 + 10, y);
          y += 5;
        });
        return;
      }
      
      // Other headers - make them normal text
      if (trimmedSection.match(/^[A-Z][a-zA-Z\s&]+:$/) || (trimmedSection === trimmedSection.toUpperCase() && trimmedSection.length < 50 && !trimmedSection.includes('____'))) {
        pdf.setFont('times', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        y += 2;
        pdf.text(trimmedSection, margin, y);
        y += 5;
        return;
      }
      
      // Bullet points
      if (trimmedSection.startsWith('•') || trimmedSection.startsWith('-')) {
        pdf.setFont('times', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        const bulletLines = pdf.splitTextToSize(trimmedSection, maxWidth - 8);
        bulletLines.forEach((line: string, index: number) => {
          pdf.text(line, margin + (index === 0 ? 0 : 8), y);
          y += 4;
        });
        return;
      }
      
      // Handle signature fields after Signatures heading
      if (trimmedSection.includes('For [NGO Name]') && trimmedSection.includes('For [Partner Organization]')) {
        signatureProcessed = true;
        
        // Add signature data in side-by-side format with no extra gap
        const signatureData = [
          ["For [NGO Name]", "For [Partner Organization]"],
          ["Signature: ______________________", "Signature: ______________________"],
          ["Name: ___________________________", "Name: ___________________________"],
          ["Designation: ____________________", "Designation: ____________________"],
          ["Date: ___________________________", "Date: ___________________________"]
        ];
        
        pdf.setFont('times', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        signatureData.forEach((row) => {
          pdf.text(row[0], margin, y);
          pdf.text(row[1], pageWidth / 2 + 10, y);
          y += 5;
        });
        return;
      }
      
      // Skip individual signature lines as they're handled above
      if (trimmedSection.includes('For [NGO Name]') || trimmedSection.includes('For [Partner Organization]') || 
          (trimmedSection.includes('____') && (trimmedSection.includes('Signature:') || trimmedSection.includes('Name:') || trimmedSection.includes('Designation:') || trimmedSection.includes('Date:')))) {
        return;
      }
      
      // Regular paragraphs
      pdf.setFont('times', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      
      // Check if text needs wrapping
      if (pdf.getTextWidth(trimmedSection) > maxWidth) {
        const paragraphLines = pdf.splitTextToSize(trimmedSection, maxWidth);
        paragraphLines.forEach((line: string) => {
          pdf.text(line, margin, y);
          y += 4;
        });
      } else {
        pdf.text(trimmedSection, margin, y);
        y += 4;
      }
      y += 1;
    });
    
    // Ensure signature section is always included (signature-first priority)
    if (!signatureProcessed && signatureIndex !== -1) {
      // Add signature section if it wasn't processed and exists in content
      y += 6; // Add space before signatures
      
      const signatureData = [
        ["For [NGO Name]", "For [Partner Organization]"],
        ["Signature: ______________________", "Signature: ______________________"],
        ["Name: ___________________________", "Name: ___________________________"],
        ["Designation: ____________________", "Designation: ____________________"],
        ["Date: ___________________________", "Date: ___________________________"]
      ];
      
      pdf.setFont('times', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      signatureData.forEach((row) => {
        pdf.text(row[0], margin, y);
        pdf.text(row[1], pageWidth / 2 + 10, y);
        y += 5;
      });
    }
    
    const fileName = content ? `${templateTitle.replace(/\s+/g, '_')}_Personalized.pdf` : `${templateTitle.replace(/\s+/g, '_')}_Template.pdf`;
    pdf.save(fileName);
  };

  const resetForm = () => {
    setUserDetails({
      name: '',
      role: '',
      organization: '',
      email: '',
      phone: '',
      partnerName: '',
      partnerOrganization: '',
      amount: '',
      duration: '',
      location: ''
    });
    setPopulatedContent('');
    setShowForm(false);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Partnership': return Handshake;
      case 'Corporate': return Building2;
      case 'Education': return GraduationCap;
      case 'Government': return Landmark;
      case 'NGO Partnership': return Users;
      default: return FileText;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">MOU Templates</h1>
            <p className="text-gray-600">Professional Memorandum of Understanding templates for various partnership types</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Available Templates</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template List */}
          <div className="space-y-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedTemplate?.id === template.id
                    ? 'border-orange-500 bg-orange-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => handleTemplateClick(template)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    {React.createElement(getCategoryIcon(template.category), { className: "w-6 h-6 text-orange-600" })}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{template.title}</h3>
                    <p className="text-gray-600 mb-3">{template.description}</p>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                      }}
                      className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadClick(template);
                      }}
                      className="p-2 text-gray-500 hover:text-orange-600 transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form or Template Preview */}
          <div className="lg:sticky lg:top-6">
          {showForm && selectedTemplate ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      {React.createElement(getCategoryIcon(selectedTemplate.category), { className: "w-5 h-5 text-white" })}
                    </div>
                    <h3 className="font-bold text-white text-lg">Customize Your MOU</h3>
                  </div>
                  <button
                    onClick={resetForm}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleFormSubmit} className="p-6 space-y-5 max-h-96 overflow-y-auto bg-gray-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={userDetails.name}
                      onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Role *</label>
                    <input
                      type="text"
                      required
                      value={userDetails.role}
                      onChange={(e) => setUserDetails({...userDetails, role: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Organization *</label>
                    <input
                      type="text"
                      required
                      value={userDetails.organization}
                      onChange={(e) => setUserDetails({...userDetails, organization: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={userDetails.email}
                      onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
                    <input
                      type="text"
                      value={userDetails.partnerName}
                      onChange={(e) => setUserDetails({...userDetails, partnerName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partner Organization</label>
                    <input
                      type="text"
                      value={userDetails.partnerOrganization}
                      onChange={(e) => setUserDetails({...userDetails, partnerOrganization: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="text"
                      value={userDetails.amount}
                      onChange={(e) => setUserDetails({...userDetails, amount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={userDetails.duration}
                      onChange={(e) => setUserDetails({...userDetails, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={userDetails.location}
                      onChange={(e) => setUserDetails({...userDetails, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Generate Personalized MOU
                </button>
              </form>
            </div>
          ) : populatedContent ? (
            <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      {selectedTemplate && React.createElement(getCategoryIcon(selectedTemplate.category), { className: "w-5 h-5 text-orange-600" })}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">Your Personalized Certificate</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(populatedContent)}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={() => handleDownload(populatedContent)}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      New Certificate
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto bg-white">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono leading-relaxed">
                  {populatedContent}
                </pre>
              </div>
            </div>
          ) : selectedTemplate ? (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      {React.createElement(getCategoryIcon(selectedTemplate.category), { className: "w-5 h-5 text-white" })}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{selectedTemplate.title}</h3>
                      <p className="text-orange-100 text-sm">{selectedTemplate.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(selectedTemplate.content)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm backdrop-blur-sm ${
                        copyStatus === 'copied' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => handleDownloadClick(selectedTemplate)}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-all duration-200 text-sm font-medium shadow-sm"
                    >
                      <Download className="w-4 h-4" />
                      Customize
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans">
                    {selectedTemplate.content}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
              <div className="bg-white rounded-full p-4 w-20 h-20 mx-auto mb-6 shadow-md">
                <FileText className="w-12 h-12 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Select a Template</h3>
              <p className="text-gray-600 leading-relaxed">Choose a template from the list to preview its content and customize it for your organization</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}