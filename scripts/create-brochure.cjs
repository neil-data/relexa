const fs = require('fs');
const path = require('path');

// Generate a valid, professional PDF file directly
function createPdf() {
  const content = `%PDF-1.4
%âãÏÓ
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj

2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R 4 0 R]
  /Count 2
>>
endobj

3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
    >>
  >>
  /Contents 7 0 R
>>
endobj

4 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
    >>
  >>
  /Contents 8 0 R
>>
endobj

5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj

6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj

7 0 obj
<< /Length 850 >>
stream
BT
/F1 26 Tf
0.82 0.70 0.44 rg
50 720 Td
(RELEXA EXPORTS) Tj
/F2 12 Tf
0.5 0.5 0.5 rg
0 -22 Td
(FOUR WORLDS. ONE GLOBAL STANDARD.) Tj
0 -15 Td
(Corporate Export Portfolio & Trade Specifications | 2026-2027) Tj

0 0 0 rg
/F1 16 Tf
0 -40 Td
(1. EXECUTIVE PROFILE) Tj
/F2 10 Tf
0.2 0.2 0.2 rg
0 -18 Td
(Relexa Exports is an emerging global multi-sector export enterprise headquartered in) Tj
0 -14 Td
(Ahmedabad, Gujarat, India. Operating at the intersection of precision manufacturing and) Tj
0 -14 Td
(international logistics, Relexa supplies tier-one markets across 65+ countries worldwide.) Tj

/F1 16 Tf
0.82 0.70 0.44 rg
0 -30 Td
(2. CORE SECTORS & PRODUCT VERTICALS) Tj
/F1 12 Tf
0 0 0 rg
0 -20 Td
(A. Pharmaceuticals & Dental Care) Tj
/F2 10 Tf
0.2 0.2 0.2 rg
0 -14 Td
(- Formulations: Injectables, Solid Orals, Lyophilized Vials, Active Ingredients (APIs)) Tj
0 -14 Td
(- Dental Care: High-precision diamond burs, endodontic rotary files, impression silicones) Tj
0 -14 Td
(- Compliance: US-FDA approved facilities, WHO-GMP, EU-GMP, ISO 13485) Tj

/F1 12 Tf
0 0 0 rg
0 -22 Td
(B. Frozen Foods & Agricultural Cold-Chain) Tj
/F2 10 Tf
0.2 0.2 0.2 rg
0 -14 Td
(- Products: Premium IQF French Fries (6mm, 9mm, 11mm, Crinkle Cut), Frozen Green Peas, Sweet Corn) Tj
0 -14 Td
(- Cold Chain: Continuous -18 deg C Reefer Container Logistics from Mundra / Nhava Sheva Ports) Tj
0 -14 Td
(- Compliance: BRCGS Food Safety Grade AA, HACCP, US-FDA, FSSAI, Halal Certified) Tj

/F1 12 Tf
0 0 0 rg
0 -22 Td
(C. Pet Food & Specialized Animal Nutrition) Tj
/F2 10 Tf
0.2 0.2 0.2 rg
0 -14 Td
(- Canine & Feline Complete Nutrition Kibble, Single-Ingredient Dehydrated Treats, Probiotic Blends) Tj
0 -14 Td
(- Quality: 100% human-grade protein inputs, zero synthetic fillers, ISO 22000 certified) Tj

/F1 12 Tf
0 0 0 rg
0 -22 Td
(D. Steel, Metallurgy & Heavy Industrial Materials) Tj
/F2 10 Tf
0.2 0.2 0.2 rg
0 -14 Td
(- Hot Rolled / Cold Rolled Coils (ASTM A36, S355JR), Structural H-Beams, Seamless Pipes) Tj
0 -14 Td
(- Full Mill Test Certificates (MTC EN 10204 3.1 / 3.2), Lloyd's / SGS Third-Party Inspection) Tj
ET
endstream
endobj

8 0 obj
<< /Length 780 >>
stream
BT
/F1 16 Tf
0.82 0.70 0.44 rg
50 720 Td
(3. GLOBAL LOGISTICS & TRADE INFRASTRUCTURE) Tj
/F2 10 Tf
0.2 0.2 0.2 rg
0 -20 Td
(Headquartered in Ahmedabad, India, with direct dry-port and multimodal railway connectivity) Tj
0 -14 Td
(to India's premier deep-water container ports: Port Mundra and JNPT (Nhava Sheva).) Tj
0 -14 Td
(Average ocean transit times: Middle East (4-6 days), Europe (16-22 days), Americas (26-34 days).) Tj

/F1 14 Tf
0 0 0 rg
0 -30 Td
(4. INCOTERMS & COMMERCIAL CAPACITIES) Tj
/F2 10 Tf
0.2 0.2 0.2 rg
0 -16 Td
(- Supported Trade Terms: FOB, CIF, CFR, DDP, CIP via Letter of Credit (LC) / CAD) Tj
0 -14 Td
(- Minimum Order Quantities (MOQ): FCL (Full Container Load 20ft / 40ft High Cube)) Tj
0 -14 Td
(- Real-time temperature-monitored smart IoT data-loggers on all cold-chain containers) Tj

/F1 14 Tf
0.82 0.70 0.44 rg
0 -35 Td
(5. CORPORATE HEADQUARTERS & GLOBAL INQUIRIES) Tj
/F2 10 Tf
0.2 0.2 0.2 rg
0 -18 Td
(RELEXA EXPORTS PVT. LTD.) Tj
0 -14 Td
(World Trade Tower, SG Highway, Ahmedabad, Gujarat 380054, India) Tj
0 -14 Td
(Direct Trade Desk: trade@relexaexports.com | info@relexaexports.com) Tj
0 -14 Td
(Phone: +91 79 4890 2300 / +91 98 2501 8844) Tj
0 -14 Td
(Web: www.relexaexports.com) Tj

0.82 0.70 0.44 rg
/F1 11 Tf
0 -40 Td
(CONFIDENTIALITY & TRADE NOTICE) Tj
/F2 9 Tf
0.4 0.4 0.4 rg
0 -14 Td
(This document and all associated technical specifications are property of Relexa Exports.) Tj
0 -12 Td
(Certified for global procurement teams, distributors, and institutional importers.) Tj
ET
endstream
endobj

xref
0 9
0000000000 65535 f 
0000000015 00000 n 
0000000068 00000 n 
0000000125 00000 n 
0000000267 00000 n 
0000000409 00000 n 
0000000478 00000 n 
0000000542 00000 n 
0000001445 00000 n 
trailer
<<
  /Size 9
  /Root 1 0 R
>>
startxref
2280
%%EOF`;

  const outputPath = path.join(__dirname, '..', 'public', 'brochure.pdf');
  fs.writeFileSync(outputPath, content.trim());
  console.log('brochure.pdf generated successfully at:', outputPath);
}

createPdf();
