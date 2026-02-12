const Certificate = require('../models/Certificate');
const xlsx = require('xlsx');

// Get detailed analytics
exports.getAnalytics = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied' 
            });
        }

        const totalCerts = await Certificate.countDocuments();
        const activeCerts = await Certificate.countDocuments({ isActive: true });
        
        // Domain-wise breakdown
        const domainStats = await Certificate.aggregate([
            { $group: { _id: '$internshipDomain', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Monthly trend
        const monthlyStats = await Certificate.aggregate([
            {
                $group: {
                    _id: { 
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 6 }
        ]);

        res.json({
            success: true,
            analytics: {
                total: totalCerts,
                active: activeCerts,
                inactive: totalCerts - activeCerts,
                domainBreakdown: domainStats,
                monthlyTrend: monthlyStats
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Export all certificates to Excel
exports.exportCertificates = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied' 
            });
        }

        const certificates = await Certificate.find().lean();
        
        const data = certificates.map(cert => ({
            'Certificate ID': cert.certificateId,
            'Student Name': cert.studentName,
            'Internship Domain': cert.internshipDomain,
            'Start Date': new Date(cert.startDate).toLocaleDateString(),
            'End Date': new Date(cert.endDate).toLocaleDateString(),
            'Issued Date': new Date(cert.issuedDate).toLocaleDateString(),
            'Status': cert.isActive ? 'Active' : 'Inactive'
        }));

        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Certificates');

        const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=certificates-export.xlsx');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Delete multiple certificates
exports.bulkDelete = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied' 
            });
        }

        const { certificateIds } = req.body;

        if (!certificateIds || !Array.isArray(certificateIds)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid certificate IDs' 
            });
        }

        const result = await Certificate.deleteMany({
            certificateId: { $in: certificateIds }
        });

        res.json({
            success: true,
            message: `${result.deletedCount} certificates deleted`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};