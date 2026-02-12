const Certificate = require('../models/Certificate');
const xlsx = require('xlsx');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Validation helper
const validateCertificateData = (data) => {
    const errors = [];
    
    if (!data.certificateId || data.certificateId.trim() === '') {
        errors.push('Certificate ID is required');
    }
    if (!data.studentName || data.studentName.trim() === '') {
        errors.push('Student Name is required');
    }
    if (!data.internshipDomain || data.internshipDomain.trim() === '') {
        errors.push('Internship Domain is required');
    }
    if (!data.startDate || isNaN(new Date(data.startDate))) {
        errors.push('Valid Start Date is required');
    }
    if (!data.endDate || isNaN(new Date(data.endDate))) {
        errors.push('Valid End Date is required');
    }
    if (data.startDate && data.endDate && new Date(data.startDate) >= new Date(data.endDate)) {
        errors.push('End Date must be after Start Date');
    }
    
    return errors;
};

// Handle different file types
// Add single certificate
exports.addCertificate = async (req, res) => {
    try {
        const { 
            certificateId, studentName, internshipDomain, startDate, endDate,
            grade, companyName, companyAddress, founderName,
            authorizedSignatory, signatoryDesignation, certificateType
        } = req.body;

        // Validation
        if (!certificateId || !studentName || !internshipDomain || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Required fields missing'
            });
        }

        // Check duplicate
        const existing = await Certificate.findOne({ certificateId });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Certificate ID already exists'
            });
        }

        // Create certificate with all details
        const certificate = new Certificate({
            certificateId,
            studentName,
            internshipDomain,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            issuedDate: new Date(),
            grade: grade || 'Excellent',
            companyName: companyName || 'TechCorp Solutions',
            companyAddress: companyAddress || 'Lucknow, Uttar Pradesh, India',
            founderName: founderName || 'Mr. Amit Sharma',
            authorizedSignatory: authorizedSignatory || 'Dr. Rajesh Kumar',
            signatoryDesignation: signatoryDesignation || 'Director - Training & Development',
            certificateType: certificateType || 'Internship Completion'
        });

        await certificate.save();

        res.json({
            success: true,
            message: 'Certificate added with all details',
            certificate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.uploadCertificateFiles = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false,
                message: 'No files uploaded' 
            });
        }

        const uploadedFiles = [];
        const certificatesCreated = [];

        for (const file of req.files) {
            // Save file info
            uploadedFiles.push({
                filename: file.filename,
                originalname: file.originalname,
                size: file.size,
                path: file.path
            });

            // Try to extract certificate ID from filename
            // Example: CERT001.pdf or CERT001_BhaskarBind.pdf
            const certIdMatch = file.originalname.match(/([A-Z]+\d+)/i);
            
            if (certIdMatch) {
                const certId = certIdMatch[1].toUpperCase();
                
                // Check if certificate already exists
                const existing = await Certificate.findOne({ certificateId: certId });
                
                if (!existing) {
                    // Create placeholder certificate entry
                    const newCert = new Certificate({
                        certificateId: certId,
                        studentName: 'Pending - Update Required',
                        internshipDomain: 'Pending - Update Required',
                        startDate: new Date(),
                        endDate: new Date(),
                        uploadedFile: {
                            filename: file.filename,
                            path: file.path,
                            uploadedAt: new Date()
                        }
                    });
                    
                    await newCert.save();
                    certificatesCreated.push(certId);
                }
            }
        }

        res.json({
            success: true,
            message: 'Files uploaded successfully',
            filesUploaded: uploadedFiles.length,
            certificatesCreated: certificatesCreated.length,
            certificateIds: certificatesCreated,
            files: uploadedFiles
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Helper functions
async function processDataFile(file) {
    // Process Excel/CSV data
    return { message: 'Data file processed', records: 0 };
}

async function storePDFCertificate(file) {
    // Store PDF file
    const filename = `cert_${Date.now()}_${file.originalname}`;
    const filepath = path.join('uploads/certificates', filename);
    fs.writeFileSync(filepath, file.buffer);
    return { filename, filepath };
}

async function storeImageCertificate(file) {
    // Store image file
    const filename = `img_${Date.now()}_${file.originalname}`;
    const filepath = path.join('uploads/images', filename);
    fs.writeFileSync(filepath, file.buffer);
    return { filename, filepath };
}

async function storeWordDocument(file) {
    // Store Word document
    const filename = `doc_${Date.now()}_${file.originalname}`;
    const filepath = path.join('uploads/documents', filename);
    fs.writeFileSync(filepath, file.buffer);
    return { filename, filepath };
}

// Upload certificates from Excel
exports.uploadCertificates = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Admin role required.' 
            });
        }

        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: 'No file uploaded' 
            });
        }

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        const certificates = [];
        const errors = [];
        const duplicates = [];

        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            try {
                // Normalize column names
                const certificateData = {
                    certificateId: row.certificateId || row['Certificate ID'] || row['certificate_id'],
                    studentName: row.studentName || row['Student Name'] || row['student_name'],
                    internshipDomain: row.internshipDomain || row['Internship Domain'] || row['internship_domain'],
                    startDate: row.startDate || row['Start Date'] || row['start_date'],
                    endDate: row.endDate || row['End Date'] || row['end_date']
                };

                // Validate data
                const validationErrors = validateCertificateData(certificateData);
                if (validationErrors.length > 0) {
                    errors.push({ 
                        row: i + 1, 
                        errors: validationErrors 
                    });
                    continue;
                }

                // Check for duplicates
                const existingCert = await Certificate.findOne({ 
                    certificateId: certificateData.certificateId 
                });
                
                if (existingCert) {
                    duplicates.push({ 
                        row: i + 1, 
                        certificateId: certificateData.certificateId 
                    });
                    continue;
                }

                const certificate = new Certificate({
                    certificateId: certificateData.certificateId.trim(),
                    studentName: certificateData.studentName.trim(),
                    internshipDomain: certificateData.internshipDomain.trim(),
                    startDate: new Date(certificateData.startDate),
                    endDate: new Date(certificateData.endDate)
                });
                
                await certificate.save();
                certificates.push(certificate);
            } catch (error) {
                errors.push({ 
                    row: i + 1, 
                    errors: [error.message] 
                });
            }
        }

        // Delete uploaded file
        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            message: 'Upload completed',
            uploaded: certificates.length,
            errors: errors.length,
            duplicates: duplicates.length,
            errorDetails: errors,
            duplicateDetails: duplicates
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Search certificate by ID
exports.searchCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;
        
        if (!certificateId || certificateId.trim() === '') {
            return res.status(400).json({ 
                success: false,
                message: 'Certificate ID is required' 
            });
        }

        const certificate = await Certificate.findOne({ 
            certificateId: certificateId.trim(),
            isActive: true 
        });

        if (!certificate) {
            return res.status(404).json({ 
                success: false,
                message: 'Certificate not found' 
            });
        }

        res.json({
            success: true,
            certificate
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Download certificate in multiple formats
exports.downloadCertificateMultiFormat = async (req, res) => {
    try {
        const { certificateId, format } = req.params;
        
        const certificate = await Certificate.findOne({ 
            certificateId: certificateId.trim(),
            isActive: true 
        });

        if (!certificate) {
            return res.status(404).json({ 
                success: false,
                message: 'Certificate not found' 
            });
        }

        switch (format.toLowerCase()) {
            case 'pdf':
                return generatePDFCertificate(certificate, res);
            case 'jpg':
            case 'jpeg':
                return generateImageCertificate(certificate, res, 'jpeg');
            case 'png':
                return generateImageCertificate(certificate, res, 'png');
            case 'json':
                return downloadJSONData(certificate, res);
            default:
                return res.status(400).json({ 
                    success: false,
                    message: 'Unsupported format. Use: pdf, jpg, png, json' 
                });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

function generatePDFCertificate(certificate, res) {
    // Existing PDF generation code
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="certificate-${certificate.certificateId}.pdf"`);
    doc.pipe(res);
    
    // Add certificate content
    doc.fontSize(32).text('CERTIFICATE OF COMPLETION', 50, 120, { align: 'center' });
    doc.fontSize(28).text(certificate.studentName, 50, 240, { align: 'center' });
    doc.fontSize(24).text(certificate.internshipDomain, 50, 330, { align: 'center' });
    
    doc.end();
}

function generateImageCertificate(certificate, res, format) {
    // Generate image certificate (requires canvas or image library)
    res.setHeader('Content-Type', `image/${format}`);
    res.setHeader('Content-Disposition', `attachment; filename="certificate-${certificate.certificateId}.${format}"`);
    
    // Placeholder - would need image generation library
    res.json({ message: 'Image generation not implemented yet' });
}

function downloadJSONData(certificate, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="certificate-${certificate.certificateId}.json"`);
    res.json(certificate);
}

// Generate and download certificate PDF
exports.downloadCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;
        
        const certificate = await Certificate.findOne({ 
            certificateId: certificateId.trim(),
            isActive: true 
        });

        if (!certificate) {
            return res.status(404).json({ 
                success: false,
                message: 'Certificate not found' 
            });
        }

        const PDFDocument = require('pdfkit');
        const QRCode = require('qrcode');
        
        // Generate QR Code
        const verifyUrl = `http://localhost:3001/api/certificates/search/${certificateId}`;
        const qrCodeDataUrl = await QRCode.toDataURL(verifyUrl);
        const qrBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
        
        const doc = new PDFDocument({ 
            size: 'A4', 
            layout: 'landscape',
            margins: { top: 40, bottom: 40, left: 40, right: 40 }
        });
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="certificate-${certificateId}.pdf"`);
        
        doc.pipe(res);

        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;

        // Outer border - Gold
        doc.rect(30, 30, pageWidth - 60, pageHeight - 60)
           .lineWidth(3)
           .strokeColor('#D4AF37')
           .stroke();

        // Inner border - Dark Blue
        doc.rect(40, 40, pageWidth - 80, pageHeight - 80)
           .lineWidth(2)
           .strokeColor('#1e3a8a')
           .stroke();

        // Decorative corners
        const cornerSize = 30;
        // Top-left corner
        doc.moveTo(50, 50).lineTo(50 + cornerSize, 50).stroke();
        doc.moveTo(50, 50).lineTo(50, 50 + cornerSize).stroke();
        // Top-right corner
        doc.moveTo(pageWidth - 50, 50).lineTo(pageWidth - 50 - cornerSize, 50).stroke();
        doc.moveTo(pageWidth - 50, 50).lineTo(pageWidth - 50, 50 + cornerSize).stroke();
        // Bottom-left corner
        doc.moveTo(50, pageHeight - 50).lineTo(50 + cornerSize, pageHeight - 50).stroke();
        doc.moveTo(50, pageHeight - 50).lineTo(50, pageHeight - 50 - cornerSize).stroke();
        // Bottom-right corner
        doc.moveTo(pageWidth - 50, pageHeight - 50).lineTo(pageWidth - 50 - cornerSize, pageHeight - 50).stroke();
        doc.moveTo(pageWidth - 50, pageHeight - 50).lineTo(pageWidth - 50, pageHeight - 50 + cornerSize).stroke();

        // Company Logo/Header
        doc.fontSize(20)
           .font('Helvetica-Bold')
           .fillColor('#1e3a8a')
           .text(certificate.companyName || 'TechCorp Solutions', 0, 70, { align: 'center' });
        
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#6b7280')
           .text(certificate.companyAddress || 'Lucknow, Uttar Pradesh, India', 0, 95, { align: 'center' });

        // Logo/Badge at top
        doc.circle(pageWidth / 2, 140, 35)
           .fillAndStroke('#1e3a8a', '#D4AF37');
        
        doc.fontSize(24)
           .fillColor('white')
           .text('★', pageWidth / 2 - 12, 125);

        // Title
        doc.fontSize(42)
           .font('Helvetica-Bold')
           .fillColor('#1e3a8a')
           .text('CERTIFICATE', 0, 190, { align: 'center' });
        
        doc.fontSize(28)
           .fillColor('#D4AF37')
           .text('OF COMPLETION', 0, 195, { align: 'center' });

        // Decorative line
        doc.moveTo(pageWidth / 2 - 100, 235)
           .lineTo(pageWidth / 2 + 100, 235)
           .lineWidth(2)
           .strokeColor('#D4AF37')
           .stroke();

        // Body text
        doc.fontSize(16)
           .font('Helvetica')
           .fillColor('#374151')
           .text('This is to certify that', 0, 260, { align: 'center' });
        
        // Student name - Highlighted
        doc.fontSize(36)
           .font('Helvetica-Bold')
           .fillColor('#1e3a8a')
           .text(certificate.studentName, 0, 290, { align: 'center' });
        
        // Underline for name
        const nameWidth = doc.widthOfString(certificate.studentName);
        doc.moveTo(pageWidth / 2 - nameWidth / 2, 330)
           .lineTo(pageWidth / 2 + nameWidth / 2, 330)
           .lineWidth(1)
           .strokeColor('#D4AF37')
           .stroke();

        doc.fontSize(16)
           .font('Helvetica')
           .fillColor('#374151')
           .text('has successfully completed the internship program in', 0, 350, { align: 'center' });
        
        // Domain - Highlighted
        doc.fontSize(28)
           .font('Helvetica-Bold')
           .fillColor('#7c3aed')
           .text(certificate.internshipDomain, 0, 380, { align: 'center' });

        // Duration box
        const boxY = 430;
        doc.roundedRect(pageWidth / 2 - 200, boxY, 400, 60, 10)
           .fillAndStroke('#f3f4f6', '#e5e7eb');

        doc.fontSize(14)
           .fillColor('#6b7280')
           .text('Program Duration', pageWidth / 2 - 180, boxY + 12);
        
        const startDate = new Date(certificate.startDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const endDate = new Date(certificate.endDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor('#1e3a8a')
           .text(`${startDate}  to  ${endDate}`, pageWidth / 2 - 180, boxY + 32);

        // Footer section with signatures and QR
        const footerY = pageHeight - 140;
        
        // Left side - QR Code
        doc.image(qrBuffer, 60, footerY, { width: 60, height: 60 });
        doc.fontSize(8)
           .fillColor('#6b7280')
           .text('Scan to Verify', 60, footerY + 65, { width: 60, align: 'center' });
        
        // Center - Certificate details
        const centerX = pageWidth / 2 - 100;
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor('#6b7280')
           .text(`Certificate ID: ${certificate.certificateId}`, centerX, footerY);
        
        const issueDate = new Date(certificate.issuedDate || certificate.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        doc.text(`Issued on: ${issueDate}`, centerX, footerY + 15);
        doc.text(`Grade: ${certificate.grade || 'Excellent'}`, centerX, footerY + 30);
        doc.text(`Type: ${certificate.certificateType || 'Internship'}`, centerX, footerY + 45);

        // Right side - Signature
        const sigX = pageWidth - 280;
        doc.moveTo(sigX, footerY + 30)
           .lineTo(sigX + 170, footerY + 30)
           .lineWidth(1)
           .strokeColor('#1e3a8a')
           .stroke();
        
        doc.fontSize(12)
           .font('Helvetica-Bold')
           .fillColor('#1e3a8a')
           .text(certificate.authorizedSignatory || 'Dr. Rajesh Kumar', sigX, footerY + 35, { width: 170, align: 'center' });
        
        doc.fontSize(9)
           .font('Helvetica')
           .fillColor('#6b7280')
           .text(certificate.signatoryDesignation || 'Director - Training & Development', sigX, footerY + 50, { width: 170, align: 'center' });
        
        doc.text(certificate.companyName || 'TechCorp Solutions', sigX, footerY + 65, { width: 170, align: 'center' });

        // Company Seal/Stamp (circular)
        const sealX = pageWidth / 2;
        doc.circle(sealX, footerY + 40, 30)
           .lineWidth(2)
           .strokeColor('#D4AF37')
           .stroke();
        
        doc.fontSize(8)
           .fillColor('#D4AF37')
           .text('OFFICIAL', sealX - 20, footerY + 30);
        doc.text('SEAL', sealX - 15, footerY + 42);
        
        // Founder name at bottom
        doc.fontSize(9)
           .fillColor('#6b7280')
           .text(`Founder/CEO: ${certificate.founderName || 'Mr. Amit Sharma'}`, 0, pageHeight - 50, { align: 'center' });

        // Verification badge
        doc.fontSize(8)
           .fillColor('#10b981')
           .text('✓ Verified & Authenticated', pageWidth / 2 - 60, pageHeight - 60);

        doc.end();
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Get all certificates (admin only)
exports.getAllCertificates = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Admin role required.' 
            });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const certificates = await Certificate.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Certificate.countDocuments();

        res.json({
            success: true,
            certificates,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Search certificates by student name
exports.searchByStudentName = async (req, res) => {
    try {
        const { studentName } = req.params;
        
        if (!studentName || studentName.trim() === '') {
            return res.status(400).json({ 
                success: false,
                message: 'Student name is required' 
            });
        }

        const certificates = await Certificate.find({ 
            studentName: { $regex: studentName.trim(), $options: 'i' },
            isActive: true 
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            certificates,
            count: certificates.length
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Get certificate statistics (admin only)
exports.getCertificateStats = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Admin role required.' 
            });
        }

        const total = await Certificate.countDocuments();
        const active = await Certificate.countDocuments({ isActive: true });
        
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const recentUploads = await Certificate.countDocuments({
            createdAt: { $gte: weekAgo }
        });

        const domains = await Certificate.aggregate([
            { $group: { _id: '$internshipDomain', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        res.json({
            success: true,
            stats: {
                total,
                active,
                recentUploads,
                topDomains: domains
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};