import { NextRequest, NextResponse } from 'next/server';

// Google Apps Script Web App URL
// Aapko ye URL Google Apps Script se milega (deploy ke baad)
// Environment variable: GOOGLE_APPS_SCRIPT_URL

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Check if Google Apps Script URL is set
    const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!googleAppsScriptUrl) {
      return NextResponse.json(
        { 
          error: 'Google Apps Script URL missing. Please set GOOGLE_APPS_SCRIPT_URL environment variable.',
          instructions: 'See GOOGLE_SHEETS_SETUP.md for setup instructions'
        },
        { status: 500 }
      );
    }

    // Prepare data for Google Sheets
    const submissionData = {
      timestamp: formData.timestamp || new Date().toISOString(),
      // Land Details
      multipleOwnership: formData.multipleOwnership || '',
      ownershipCount: formData.ownershipCount || 0,
      owners: formData.owners || [],
      location: formData.location || '',
      districtState: formData.districtState || '',
      multipleKhasra: formData.multipleKhasra || '',
      khasraCount: formData.khasraCount || 0,
      khasras: formData.khasras || [],
      villageTehsil: formData.villageTehsil || '',
      email: formData.email || '',
      // Verification
      bhunakshaVerified: formData.bhunakshaVerified || '',
      ownershipConfirmed: formData.ownershipConfirmed || '',
      nocsCollected: formData.nocsCollected || '',
      shareholderCount: formData.shareholderCount || 0,
      shareholderNames: formData.shareholderNames || [],
      titleSearchCompleted: formData.titleSearchCompleted || '',
      // Due Diligence
      landUseVerified: formData.landUseVerified || '',
      litigationFound: formData.litigationFound || '',
      litigationComments: formData.litigationComments || '',
      taxesPaid: formData.taxesPaid || '',
      taxesComments: formData.taxesComments || '',
      priorAgreements: formData.priorAgreements || '',
      // Registry
      tokenBooked: formData.tokenBooked || '',
      documentsPrepared: formData.documentsPrepared || '',
      registryCompleted: formData.registryCompleted || '',
      // Files (metadata only)
      currentJamabandiFiles: formData.currentJamabandiFiles || [],
      ownersIdFiles: formData.ownersIdFiles || [],
      registryCopyFiles: formData.registryCopyFiles || [],
      landMapFiles: formData.landMapFiles || [],
      comments: formData.comments || '',
    };

    // Send data to Google Apps Script
    const response = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google Apps Script error: ${errorText}`);
    }

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Data saved to Google Sheets successfully' 
    });
  } catch (error: any) {
    console.error('Error saving to Google Sheets:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save data to Google Sheets', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

