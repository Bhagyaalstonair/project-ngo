import jsPDF from 'jspdf';

interface MOUData {
  party1Name?: string;
  party1Address?: string;
  party1Abbreviation?: string;
  party1Description?: string;
  party2Name?: string;
  party2Address?: string;
  party2Abbreviation?: string;
  party2Description?: string;
  purpose?: string;
  objective?: string;
  party1Contributions?: string[];
  party2Contributions?: string[];
  effectiveDate?: string;
  endDate?: string;
  terminationNotice?: string;
  governingLaw?: string;
  party1Signatory?: string;
  party1Designation?: string;
  party2Signatory?: string;
  party2Designation?: string;
}

export const createMOUPDF = async (data: MOUData = {}) => {
  const doc = new jsPDF();
  let yPos = 20;

  // Header
  const currentDate = new Date();
  doc.setFontSize(10);
  doc.text('General NGO Partnership MOU', 20, yPos);
  doc.text(`${currentDate.toLocaleDateString('en-GB')}, ${currentDate.toLocaleTimeString('en-GB', { hour12: false })}`, 150, yPos);
  yPos += 15;

  // Add logo with proper error handling
  try {
    const logoImg = new Image();
    logoImg.src = '/ngo india logo.png';
    
    const imageLoaded = await new Promise<boolean>((resolve) => {
      logoImg.onload = () => resolve(true);
      logoImg.onerror = () => resolve(false);
      // Add timeout to prevent hanging
      setTimeout(() => resolve(false), 3000);
    });
    
    if (imageLoaded) {
      doc.addImage(logoImg, 'PNG', 20, yPos, 15, 15);
    } else {
      throw new Error('Logo failed to load');
    }
  } catch (error) {
    // Fallback logo placeholder
    doc.setFillColor(255, 165, 0);
    doc.rect(20, yPos, 15, 15, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('LOGO', 22, yPos + 9);
    doc.setTextColor(0, 0, 0);
  }
  
  // NGO Info
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('NGO INDIA', 40, yPos + 5);
  yPos += 15;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Email: grants@ngoindia.org', 20, yPos);
  yPos += 5;
  doc.text('Phone: +91 8068447416', 20, yPos);
  yPos += 5;
  doc.text('Location: Bengaluru, India', 20, yPos);
  yPos += 20;

  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Memorandum of Understanding', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('March 2012', 20, yPos);
  yPos += 15;

  // Participating Parties
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Participating Parties', 20, yPos);
  yPos += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const party1Mission = `${data.party1Name || 'XXX'}'s mission is fostering communities of strong women, supported families and safe homes.`;
  const splitParty1Mission = doc.splitTextToSize(party1Mission, 170);
  doc.text(splitParty1Mission, 20, yPos);
  yPos += splitParty1Mission.length * 5 + 3;

  const party1Desc = `${data.party1Name || 'XXX'} is dedicated to supporting individuals victimized by domestic and/or sexual violence and/or stalking and their children. The program promotes social change through education and actions that develop resources and collaboration within and across communities to end domestic and sexual violence, and the underlying social tolerance that perpetuates it.`;
  const splitParty1Desc = doc.splitTextToSize(party1Desc, 170);
  doc.text(splitParty1Desc, 20, yPos);
  yPos += splitParty1Desc.length * 5 + 5;

  const party2Mission = `${data.party2Name || 'XXX'} District Offices of the Department for Children And Families, Family Services Division. (FS)'s mission: We are committed to protect children and strengthen families, in partnership with families and communities.`;
  const splitParty2Mission = doc.splitTextToSize(party2Mission, 170);
  doc.text(splitParty2Mission, 20, yPos);
  yPos += splitParty2Mission.length * 5 + 10;

  // Check if we need a new page
  const checkPageBreak = () => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };
  
  checkPageBreak();

  // Description of Collaborative Relationship
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Description of Collaborative Relationship', 20, yPos);
  yPos += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const collabIntro = `${data.party1Name || 'XXX'} and DCF developed this Memorandum of Understanding (MOU) to improve on collaboration between our agencies and to enhance services for children, youth and adults victimized by domestic and/or sexual violence. This collaboration identifies the following strategies to achieve these goals:`;
  const splitCollabIntro = doc.splitTextToSize(collabIntro, 170);
  doc.text(splitCollabIntro, 20, yPos);
  yPos += splitCollabIntro.length * 5 + 5;

  // Strategies list
  const strategies = [
    'Maintain a dialogue between the two agencies that facilitates the ongoing development of this agreement.',
    `Conduct monthly workgroup meetings as a forum to address intervention strategies that meet the needs of people who have experienced domestic and sexual violence and the safety needs of their children. The purpose being to strengthen this relationship through joint training and cross-training as well as discussion on policy and practice issues that may arise between agencies and within the ${data.party2Name || 'XXX'} County communities.`,
    'Resolve potential conflicts in a respectful and professional manner.',
    'Act as team members to advocate for the development of resources needed for a coordinated community response to domestic and sexual violence, and participate in team meetings to support child protection and strengthening of families.',
    'Provide training and orientation on the collaboration for all new staff at each agency.',
    'Provide annual cross-trainings and co-facilitate community outreach and trainings.'
  ];

  strategies.forEach((strategy, index) => {
    checkPageBreak();
    const strategyText = `${index + 1}. ${strategy}`;
    const splitStrategy = doc.splitTextToSize(strategyText, 170);
    doc.text(splitStrategy, 20, yPos);
    yPos += splitStrategy.length * 5 + 3;
  });
  
  yPos += 5;
  checkPageBreak();

  // Confidentiality
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Confidentiality', 20, yPos);
  yPos += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const confidIntro = `${data.party1Name || 'XXX'} and DCF are governed by different confidentiality policies. As a result, both parties will continually define and clarify confidentiality issues that arise as a result of collaboration.`;
  const splitConfidIntro = doc.splitTextToSize(confidIntro, 170);
  doc.text(splitConfidIntro, 20, yPos);
  yPos += splitConfidIntro.length * 5 + 5;

  const confidPoint1 = `1. ${data.party1Name || 'XXX'} Advocates have evidentiary privilege in Vermont as defined in Vermont Statute (Title 12, Part 4, Chap. 61, Subchapter 1, section 1614). Their communications with survivors are completely confidential and will be guided by ${data.party1Name || 'XXX'}'s confidentiality`;
  const splitConfidPoint1 = doc.splitTextToSize(confidPoint1, 170);
  doc.text(splitConfidPoint1, 20, yPos);
  yPos += splitConfidPoint1.length * 5 + 15;

  checkPageBreak();
  
  // Signatures
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Signatures', 20, yPos);
  yPos += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`For ${data.party1Name || 'XXX'}:`, 20, yPos);
  yPos += 10;
  doc.text('Signature: ____________________', 20, yPos);
  yPos += 8;
  doc.text(`Name: ${data.party1Signatory || '[Name]'}`, 20, yPos);
  yPos += 6;
  doc.text(`Title: ${data.party1Designation || '[Title]'}`, 20, yPos);
  yPos += 6;
  doc.text('Date: _________________________', 20, yPos);
  yPos += 15;

  doc.text(`For ${data.party2Name || 'Department for Children And Families'}:`, 20, yPos);
  yPos += 10;
  doc.text('Signature: ____________________', 20, yPos);
  yPos += 8;
  doc.text(`Name: ${data.party2Signatory || '[Name]'}`, 20, yPos);
  yPos += 6;
  doc.text(`Title: ${data.party2Designation || '[Title]'}`, 20, yPos);
  yPos += 6;
  doc.text('Date: _________________________', 20, yPos);
  yPos += 20;

  // Ensure footer is on the bottom of the page
  checkPageBreak();
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  const footerY = Math.max(yPos, pageHeight - 30);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('This document was generated using NGO Partnership MOU Templates', 20, footerY);
  doc.text('For official use, please consult with legal advisors', 20, footerY + 6);
  doc.text('Generated from NGO India Partnership System', 20, footerY + 12);
  
  // Page number
  const pageCount = doc.getNumberOfPages();
  doc.text(`Page ${pageCount} of ${pageCount}`, 180, footerY + 18);

  return doc;
};

export const downloadMOUPDF = async (data?: MOUData, filename = 'NGO-Partnership-MOU.pdf') => {
  const doc = await createMOUPDF(data);
  doc.save(filename);
};

export const createSamplePDF = () => {
  const doc = new jsPDF();
  
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('NGO Resource Guide', 20, 30);
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('Comprehensive Guide for Non-Profit Organizations', 20, 45);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Introduction', 20, 70);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const introText = `This document provides essential resources and guidelines for NGO management.\nIt covers best practices, templates, and tools to help organizations achieve\ntheir mission effectively.`;
  
  const splitIntro = doc.splitTextToSize(introText, 170);
  doc.text(splitIntro, 20, 85);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Key Resources', 20, 120);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const resourcesText = `• Grant Application Templates\n• Impact Measurement Frameworks\n• Volunteer Management Systems\n• Fundraising Strategy Guides\n• Financial Management Tools\n• Social Media Marketing Kits`;
  
  const splitResources = doc.splitTextToSize(resourcesText, 170);
  doc.text(splitResources, 20, 135);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Best Practices', 20, 200);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const practicesText = `1. Maintain transparent financial records\n2. Engage stakeholders regularly\n3. Measure and report impact consistently\n4. Build strong partnerships\n5. Invest in staff development\n6. Use technology effectively`;
  
  const splitPractices = doc.splitTextToSize(practicesText, 170);
  doc.text(splitPractices, 20, 215);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('Generated by NGO Resource Platform - January 2025', 20, 280);
  
  return doc;
};

export const downloadSamplePDF = () => {
  const doc = createSamplePDF();
  doc.save('ngo-resource-guide.pdf');
};