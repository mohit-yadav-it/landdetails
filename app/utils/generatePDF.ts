'use client';
import jsPDF from 'jspdf';
import { FormData } from '../context/FormContext';

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Helper function to load logo image
const loadLogo = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/logon.png';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };
    img.onerror = () => reject(new Error('Failed to load logo'));
  });
};

// Helper function to create watermark image
const createWatermark = (logoBase64: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = logoBase64;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Draw white background for lighter effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw image with reduced opacity
        ctx.globalAlpha = 0.15;
        ctx.drawImage(img, 0, 0);
        
        const watermarkBase64 = canvas.toDataURL('image/png');
        resolve(watermarkBase64);
      } else {
        reject(new Error('Failed to get canvas context'));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image for watermark'));
  });
};

// Helper function to add watermark on page
const addWatermark = (doc: jsPDF, watermarkBase64: string, pageWidth: number, pageHeight: number) => {
  // Calculate center position for watermark
  const watermarkSize = 120;
  const x = (pageWidth - watermarkSize) / 2;
  const y = (pageHeight - watermarkSize) / 2;
  
  // Add watermark to current page
  doc.addImage(watermarkBase64, 'PNG', x, y, watermarkSize, watermarkSize);
};

// Helper function to add table row
const addTableRow = (
  doc: jsPDF,
  yPos: number,
  label: string,
  value: string,
  col1Width: number = 70,
  col2Width: number = 120,
  startX: number = 20
): number => {
  const rowHeight = 8;
  const borderColor = [200, 200, 200];
  
  // Draw borders
  doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
  doc.setLineWidth(0.1);
  
  // Top border
  doc.line(startX, yPos, startX + col1Width + col2Width, yPos);
  // Bottom border
  doc.line(startX, yPos + rowHeight, startX + col1Width + col2Width, yPos + rowHeight);
  // Left border
  doc.line(startX, yPos, startX, yPos + rowHeight);
  // Middle border
  doc.line(startX + col1Width, yPos, startX + col1Width, yPos + rowHeight);
  // Right border
  doc.line(startX + col1Width + col2Width, yPos, startX + col1Width + col2Width, yPos + rowHeight);
  
  // Add label (left column)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  const labelLines = doc.splitTextToSize(label, col1Width - 4);
  doc.text(labelLines, startX + 2, yPos + 5);
  
  // Add value (right column)
  doc.setFont('helvetica', 'normal');
  const valueLines = doc.splitTextToSize(value || 'N/A', col2Width - 4);
  doc.text(valueLines, startX + col1Width + 2, yPos + 5);
  
  return yPos + rowHeight;
};

export async function generatePDF(formData: FormData) {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  const lineHeight = 7;
  
  // Colors
  const primaryColor = [8, 126, 83]; // #087E53 (green)
  const borderColor = [115, 123, 125]; // #737B7D (gray)
  
  // Load logo
  let logoBase64: string = '';
  try {
    logoBase64 = await loadLogo();
  } catch (error) {
    console.error('Error loading logo:', error);
    // Continue without logo if it fails
  }
  
  // Function to add logo at specific position
  const addLogo = (yPos: number) => {
    if (logoBase64) {
      try {
        // Logo size: 30mm width, maintain aspect ratio (assuming logo is roughly 2:1 aspect)
        doc.addImage(logoBase64, 'PNG', margin, yPos, 30, 15);
      } catch (e) {
        console.error('Error adding logo:', e);
      }
    }
  };
  
  // Helper function to check if new page needed
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 30) {
      doc.addPage();
      yPosition = 50; // Start position for new page
      addLogo(yPosition); // Add logo on new page
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrap
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10, fontStyle: 'normal' | 'bold' = 'normal') => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * lineHeight;
  };

  // Helper function to add section title
  const addSectionTitle = (title: string) => {
    checkNewPage(30);
    yPosition += 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    yPosition += addText(title.toUpperCase(), margin, yPosition, maxWidth, 16, 'bold');
    doc.setTextColor(0, 0, 0);
    yPosition += 8;
    
    // Add underline
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
    yPosition += 5;
  };

  // Helper function to add table field
  const addTableField = (label: string, value: string | null | undefined) => {
    if (!value && value !== '0') return 0;
    
    checkNewPage(10);
    const col1Width = 70;
    const col2Width = maxWidth - col1Width;
    
    // Calculate if we need to adjust row height based on content
    doc.setFontSize(10);
    const labelLines = doc.splitTextToSize(label, col1Width - 4);
    const valueLines = doc.splitTextToSize(String(value || ''), col2Width - 4);
    const maxLines = Math.max(labelLines.length, valueLines.length);
    const rowHeight = Math.max(8, maxLines * 4 + 2);
    
    // Draw table row
    yPosition = addTableRow(doc, yPosition, label, String(value || ''), col1Width, col2Width, margin);
    
    // Adjust if multiline
    if (maxLines > 1) {
      yPosition += (maxLines - 1) * 4;
    }
    
    return rowHeight;
  };

  // Helper function to add image to PDF
  const addImage = async (file: File, label: string) => {
    try {
      checkNewPage(80);
      const base64 = await fileToBase64(file);
      
      // Detect image format from file type or base64
      let imageFormat: 'JPEG' | 'PNG' = 'JPEG';
      if (file.type.includes('png') || base64.includes('data:image/png')) {
        imageFormat = 'PNG';
      } else if (file.type.includes('jpeg') || file.type.includes('jpg') || base64.includes('data:image/jpeg')) {
        imageFormat = 'JPEG';
      }
      
      // Add label
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      yPosition += 5;
      yPosition += addText(`${label}: ${file.name}`, margin, yPosition, maxWidth, 10, 'bold');
      yPosition += 5;
      
      // Calculate image dimensions (max width 160mm, maintain aspect ratio)
      const maxImageWidth = maxWidth;
      const maxImageHeight = 60;
      
      // Create image element to get dimensions
      const img = new Image();
      img.src = base64;
      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          try {
            let imgWidth = img.width;
            let imgHeight = img.height;
            
            // Calculate scaling
            const scale = Math.min(
              maxImageWidth / (imgWidth * 0.264583), // Convert px to mm
              maxImageHeight / (imgHeight * 0.264583)
            );
            
            const scaledWidth = imgWidth * 0.264583 * scale;
            const scaledHeight = imgHeight * 0.264583 * scale;
            
            // Check if image fits on current page
            if (yPosition + scaledHeight > pageHeight - 20) {
              doc.addPage();
              addLogo(50);
              yPosition = 50;
            }
            
            // Add image
            doc.addImage(base64, imageFormat, margin, yPosition, scaledWidth, scaledHeight);
            yPosition += scaledHeight + 10;
            resolve(null);
          } catch (error) {
            reject(error);
          }
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      });
    } catch (error) {
      console.error('Error adding image:', error);
      yPosition += addText(`Error loading image: ${file.name}`, margin, yPosition, maxWidth);
    }
  };

  // Set initial position and add logo on first page
  yPosition = 50;
  addLogo(yPosition); // Add logo at same level as title, on left side

  // Title Section
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('LAND DETAILS', pageWidth / 2, yPosition, { align: 'center' });
  doc.setTextColor(0, 0, 0);
  yPosition += 12;
  
  // Subtitle
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Please find the complete land details below', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // LAND DETAILS SECTION - TABLE FORMAT
  addSectionTitle('Land Details');

  addTableField('Multiple Ownership', formData.multipleOwnership === 'yes' ? 'Yes' : formData.multipleOwnership === 'no' ? 'No' : 'Not Selected');
  
  if (formData.multipleOwnership === 'yes' && formData.ownershipCount > 0) {
    addTableField('Number of Owners', String(formData.ownershipCount));
    formData.owners.forEach((owner, index) => {
      if (owner.name || owner.age) {
        yPosition += addText(
          `Owner ${index + 1}: ${owner.name || 'N/A'} (Age: ${owner.age || 'N/A'})`,
          margin + 5,
          yPosition + 5,
          maxWidth - 10,
          9
        );
        yPosition += 5;
      }
    });
  }

  addTableField('Location', formData.location);
  addTableField('District & State', formData.districtState);
  addTableField('Multiple Khasra/Khata', formData.multipleKhasra === 'yes' ? 'Yes' : formData.multipleKhasra === 'no' ? 'No' : 'Not Selected');
  
  if (formData.multipleKhasra === 'yes' && formData.khasraCount > 0) {
    addTableField('Number of Khasras', String(formData.khasraCount));
    formData.khasras.forEach((khasra, index) => {
      if (khasra.number) {
        yPosition += addText(
          `Khasra ${index + 1}: ${khasra.number}`,
          margin + 5,
          yPosition + 5,
          maxWidth - 10,
          9
        );
        yPosition += 5;
      }
    });
  }

  addTableField('Village & Tehsil', formData.villageTehsil);
  addTableField('Email', formData.email);

  // VERIFICATION SECTION - TABLE FORMAT
  addSectionTitle('Verification');

  addTableField('Bhunaksha map & Jamabandi verified', formData.bhunakshaVerified);
  addTableField('Ownership & mutation status confirmed', formData.ownershipConfirmed);
  addTableField('NOCs collected from all co-owners', formData.nocsCollected);
  
  if (formData.shareholderCount > 0) {
    addTableField('Total number of shareholders', String(formData.shareholderCount));
    formData.shareholderNames.forEach((name, index) => {
      if (name) {
        yPosition += addText(
          `Shareholder ${index + 1}: ${name}`,
          margin + 5,
          yPosition + 5,
          maxWidth - 10,
          9
        );
        yPosition += 5;
      }
    });
  }

  addTableField('52-year title search completed', formData.titleSearchCompleted);

  // DUE DILIGENCE SECTION - TABLE FORMAT
  addSectionTitle('Due Diligence');

  addTableField('Land use/zoning verified', formData.landUseVerified);
  addTableField('Litigation or court cases found', formData.litigationFound);
  
  if (formData.litigationComments) {
    addTableField('Litigation Comments', formData.litigationComments);
  }
  
  addTableField('Land revenue & property taxes paid', formData.taxesPaid);
  
  if (formData.taxesComments) {
    addTableField('Taxes Comments', formData.taxesComments);
  }
  
  addTableField('Prior Kachchi Registry or sale agreements', formData.priorAgreements);

  // REGISTRY EXECUTION SECTION - TABLE FORMAT
  addSectionTitle('Registry Execution');

  addTableField('Token booked for registry', formData.tokenBooked);
  addTableField('Documents prepared & verified', formData.documentsPrepared);
  addTableField('Registry completed & deed collected', formData.registryCompleted);

  // UPLOAD DOCUMENTS SECTION
  addSectionTitle('Upload Documents');

  // Process Current Jamabandi images
  if (formData.currentJamabandi.length > 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    yPosition += addText(`Current Jamabandi (${formData.currentJamabandi.length} file(s))`, margin, yPosition, maxWidth, 11, 'bold');
    yPosition += 5;
    
    for (const file of formData.currentJamabandi) {
      await addImage(file, 'Current Jamabandi');
    }
    yPosition += 5;
  }

  // Process Owners ID images
  if (formData.ownersId.length > 0) {
    checkNewPage(80);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    yPosition += addText(`Owners ID (${formData.ownersId.length} file(s))`, margin, yPosition, maxWidth, 11, 'bold');
    yPosition += 5;
    
    for (const file of formData.ownersId) {
      await addImage(file, 'Owners ID');
    }
    yPosition += 5;
  }

  // Process Registry Copy images
  if (formData.registryCopy.length > 0) {
    checkNewPage(80);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    yPosition += addText(`Registry Copy (${formData.registryCopy.length} file(s))`, margin, yPosition, maxWidth, 11, 'bold');
    yPosition += 5;
    
    for (const file of formData.registryCopy) {
      await addImage(file, 'Registry Copy');
    }
    yPosition += 5;
  }

  // Process Land Map images
  if (formData.landMap.length > 0) {
    checkNewPage(80);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    yPosition += addText(`Land Map (${formData.landMap.length} file(s))`, margin, yPosition, maxWidth, 11, 'bold');
    yPosition += 5;
    
    for (const file of formData.landMap) {
      await addImage(file, 'Land Map');
    }
    yPosition += 5;
  }

  // COMMENTS SECTION - TABLE FORMAT
  if (formData.comments) {
    addSectionTitle('Comments');
    addTableField('Comments', formData.comments);
  }

  // Add logo and footer to all pages
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Add logo on each page at position 50
    addLogo(50);
    
    // Footer with timestamp
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Generated on: ${new Date().toLocaleString('en-IN')} | Page ${i} of ${pageCount}`,
      margin,
      pageHeight - 10
    );
    doc.setTextColor(0, 0, 0);
  }

  // Save the PDF
  const fileName = `Land_Details_Form_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
