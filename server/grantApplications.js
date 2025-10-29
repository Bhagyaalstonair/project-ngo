const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, 'data', 'grantApplications.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Load applications from file
const loadApplications = async () => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
};

// Save applications to file
const saveApplications = async (applications) => {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(applications, null, 2));
};

// GET /api/grant-applications - List all applications
router.get('/', async (req, res) => {
  try {
    const applications = await loadApplications();
    res.json(applications);
  } catch (error) {
    console.error('Error loading applications:', error);
    res.status(500).json({ error: 'Failed to load applications' });
  }
});

// GET /api/grant-applications/:id - Get specific application
router.get('/:id', async (req, res) => {
  try {
    const applications = await loadApplications();
    const application = applications.find(app => app.id === req.params.id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Error loading application:', error);
    res.status(500).json({ error: 'Failed to load application' });
  }
});

// POST /api/grant-applications - Submit new application
router.post('/', async (req, res) => {
  try {
    const {
      applicantName,
      applicantEmail,
      applicantPhone,
      organizationName,
      projectTitle,
      projectDescription,
      requestedAmount,
      projectDuration,
      category
    } = req.body;

    // Basic validation
    if (!applicantName || !applicantEmail || !projectTitle || !projectDescription || !requestedAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (requestedAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const applications = await loadApplications();
    
    const newApplication = {
      id: Date.now().toString(),
      applicantName,
      applicantEmail,
      applicantPhone: applicantPhone || '',
      organizationName: organizationName || '',
      projectTitle,
      projectDescription,
      requestedAmount: Number(requestedAmount),
      projectDuration: projectDuration || '',
      category: category || 'other',
      submissionDate: new Date().toISOString(),
      status: 'submitted',
      createdBy: req.body.createdBy || 'anonymous'
    };

    applications.unshift(newApplication);
    await saveApplications(applications);

    res.status(201).json(newApplication);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Failed to create application' });
  }
});

// PUT /api/grant-applications/:id - Update application (admin only)
router.put('/:id', async (req, res) => {
  try {
    const applications = await loadApplications();
    const applicationIndex = applications.findIndex(app => app.id === req.params.id);
    
    if (applicationIndex === -1) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const { status, reviewNotes } = req.body;
    
    // Validate status
    const validStatuses = ['submitted', 'under-review', 'approved', 'rejected'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Update application
    applications[applicationIndex] = {
      ...applications[applicationIndex],
      ...(status && { status }),
      ...(reviewNotes !== undefined && { reviewNotes }),
      updatedAt: new Date().toISOString()
    };

    await saveApplications(applications);
    res.json(applications[applicationIndex]);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// DELETE /api/grant-applications/:id - Delete application (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const applications = await loadApplications();
    const applicationIndex = applications.findIndex(app => app.id === req.params.id);
    
    if (applicationIndex === -1) {
      return res.status(404).json({ error: 'Application not found' });
    }

    applications.splice(applicationIndex, 1);
    await saveApplications(applications);
    
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

module.exports = router;