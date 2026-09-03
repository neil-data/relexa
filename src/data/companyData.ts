import { SectorDetail, ProductItem, GlobalRoute, CertificationItem } from '../types';

export const SECTORS: SectorDetail[] = [
  {
    id: 'healthcare',
    number: '01',
    title: 'HEALTHCARE & DENTAL',
    subtitle: 'Pharmaceuticals, Active Ingredients & Precision Dental Care',
    mood: 'PRECISE / SCIENTIFIC / CONTROLLED',
    tagline: 'High-purity formulations engineered for stringent international pharmacopeias.',
    description: 'Supplying finished pharmaceutical dosages, active pharmaceutical ingredients (APIs), sterile injectables, and high-precision dental instruments across global hospital networks.',
    fullNarrative: 'Operating within world-class cGMP and US-FDA inspected facilities, Relexa Healthcare exports comprehensive therapeutic lines. From oncology and cardiovascular therapies to precision diamond rotary burs and biocompatible impression silicones, every consignment undergoes rigorous chromatographic validation.',
    heroImage: '/Relexa_Product_Images/Rabez-D.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: '/Relexa_Product_Images/Devdent-D.jpeg',
    accentColor: '#5EA7DB',
    metrics: [
      { label: 'Purity Benchmark', value: '99.98%', sublabel: 'HPLC HPLC Assayed' },
      { label: 'Therapeutic Formulations', value: '280+', sublabel: 'Solid, Liquid & Injectable' },
      { label: 'Regulatory Filings', value: '45+', sublabel: 'Active CTD / eCTD Dossiers' }
    ],
    specifications: [
      { key: 'Manufacturing Standards', value: 'WHO-GMP, EU-GMP, US-FDA Audited' },
      { key: 'Formulation Types', value: 'Tablets, Capsules, Lyophilized Vials, Pre-Filled Syringes' },
      { key: 'Dental Line', value: 'Rotary Diamond Burs, Endodontic Files, Nano-hybrid Composites' },
      { key: 'Packaging Formats', value: 'Alu-Alu Blisters, HDPE Bottles with Child-Resistant Caps' },
      { key: 'Stability Zones', value: 'Zone IVa & IVb (Tropical Real-Time Stability)' }
    ],
    certifications: ['US-FDA Compliant', 'WHO-GMP', 'ISO 13485:2016', 'CE Mark (Medical Devices)', 'EU-GMP Grade A'],
    subCategories: ['Pharmaceutical Finished Dosages', 'Active Pharmaceutical Ingredients (APIs)', 'Dental Surgical Instruments', 'Sterile Injectables & Infusions'],
    exportDestinations: ['Germany', 'United Kingdom', 'UAE', 'Saudi Arabia', 'Kenya', 'South Africa', 'Vietnam', 'Brazil']
  },
  {
    id: 'frozen-foods',
    number: '02',
    title: 'FROZEN FOODS',
    subtitle: 'IQF Vegetables, Appetizers & Golden French Fries',
    mood: 'FRESH / TACTILE / APPETIZING',
    tagline: 'Farm-fresh harvest locked at -38°C Individual Quick Freezing (IQF).',
    description: 'Cultivated in Gujarat and Punjab fertile farm belts and processed within hours of harvest to preserve original moisture, cellular structure, crispness, and nutrient density.',
    fullNarrative: 'Relexa Frozen Foods leads export cold-chains for international Quick Service Restaurant (QSR) chains and gourmet food distributors. Our flagship 6mm, 9mm, and 11mm cut French Fries deliver uniform golden crispness, low oil absorption, and consistent solid content year-round.',
    heroImage: '/Relexa_Product_Images/French-Fries-Straight-Cut.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: '/Relexa_Product_Images/Coated-Flavoured-Fries.jpeg',
    accentColor: '#E29A38',
    metrics: [
      { label: 'Freezing Core Temp', value: '-38°C', sublabel: 'IQF Blast Tunnel Velocity' },
      { label: 'Reefer Monitoring', value: '-18°C', sublabel: 'Continuous IoT Data-logging' },
      { label: 'Annual Cold Output', value: '42,000 MT', sublabel: 'Global Export Capacity' }
    ],
    specifications: [
      { key: 'Primary Produce', value: 'French Fries (Shoestring 6mm, Straight 9mm, Steak 11mm, Crinkle Cut)' },
      { key: 'IQF Vegetables', value: 'Green Peas, Sweet Corn, Mixed Veg, Diced Carrots, Okra' },
      { key: 'Specialty Appetizers', value: 'Potato Patties, Cheese Jalapeno Bites, Veg Spring Rolls' },
      { key: 'Cold Chain Transit', value: 'Dedicated -18°C Controlled Atmosphere 40ft High Cube Reefers' },
      { key: 'Shelf Life', value: '24 Months at -18°C or below' }
    ],
    certifications: ['BRCGS Food Safety (Grade AA)', 'HACCP Certified', 'US-FDA Registered', 'FSSAI Export Certified', 'Halal & Kosher'],
    subCategories: ['IQF French Fries & Potato Specialties', 'IQF Sweet Corn & Green Peas', 'Ready-to-Fry Appetizers', 'IQF Diced Mixed Vegetables'],
    exportDestinations: ['UAE', 'Oman', 'Kuwait', 'Japan', 'South Korea', 'Singapore', 'Australia', 'United Kingdom']
  },
  {
    id: 'pet-nutrition',
    number: '03',
    title: 'PET NUTRITION',
    subtitle: 'Human-Grade Animal Nourishment & Functional Treats',
    mood: 'WARM / EMOTIONAL / NATURAL',
    tagline: 'Formulated with animal nutritionists for vitality, gut health, and longevity.',
    description: 'Crafted with single-source animal proteins, whole superfoods, probiotics, and zero synthetic preservatives to nourish companion animals worldwide.',
    fullNarrative: 'Relexa Pet Nutrition approaches canine and feline vitality with the same rigorous scientific standards as human pharmaceuticals. Our extruded kibbles, dehydrated single-ingredient meat jerkies, and veterinary functional supplements are free from corn, wheat, artificial colorings, and by-product meals.',
    heroImage: '/Relexa_Product_Images/Dog-Food.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: '/Relexa_Product_Images/Cat-Food.jpeg',
    accentColor: '#D97757',
    metrics: [
      { label: 'Protein Content', value: '32-38%', sublabel: 'Single-Source Meat Proteins' },
      { label: 'Synthetic Fillers', value: '0.0%', sublabel: 'No Corn, Wheat, or By-Products' },
      { label: 'Active Live Probiotics', value: '100M CFU/lb', sublabel: 'Digestive & Coat Support' }
    ],
    specifications: [
      { key: 'Kibble Diets', value: 'Grain-Free High-Protein Canine & Feline Life-Stage Formulations' },
      { key: 'Treats & Snacks', value: '100% Dehydrated Chicken Breast, Salmon Jerky, Dental Chews' },
      { key: 'Veterinary Blends', value: 'Joint Mobility (Glucosamine/Chondroitin), Skin & Coat (Omega-3)' },
      { key: 'Extrusion Technology', value: 'Low-Temperature Twin-Screw Gentle Cooking' },
      { key: 'Packaging Quality', value: 'Nitrogen-Flushed Barrier Pouches with Zip-Lock Reseal' }
    ],
    certifications: ['AAFCO Nutritional Guidelines', 'ISO 22000:2018', 'HACCP Safety Standard', 'Vet-Approved Formulation', 'Non-GMO Verified'],
    subCategories: ['Complete & Balanced Dry Kibble', 'Single-Ingredient Meat Treats', 'Functional Veterinary Supplements', 'Dental Hygiene Chews'],
    exportDestinations: ['United States', 'Canada', 'Netherlands', 'Germany', 'Poland', 'Thailand', 'Malaysia', 'New Zealand']
  },
  {
    id: 'steel',
    number: '04',
    title: 'STEEL & INDUSTRIAL',
    subtitle: 'Hot Rolled Coils, Structural Profiles & Precision Heavy Metallurgy',
    mood: 'MASSIVE / ARCHITECTURAL / INDUSTRIAL',
    tagline: 'High-tensile structural and flat carbon steel engineered for mega-infrastructure.',
    description: 'Heavy metallurgical exports meeting strict ASTM, EN, and JIS standards. Direct vessel loading from Port Mundra with full Mill Test Certificates (EN 10204 3.1).',
    fullNarrative: 'From hot-rolled steel coils and cold-rolled precision sheets to galvanized coils, universal H-beams, and seamless line pipes, Relexa Steel powers major civil engineering, shipbuilding, renewable energy, and heavy fabrication projects across four continents.',
    heroImage: '/Relexa_Product_Images/HR-Coil.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: '/Relexa_Product_Images/Flat-Bar.jpeg',
    accentColor: '#9CA3AF',
    metrics: [
      { label: 'Tensile Strength', value: 'Up to 700 MPa', sublabel: 'High-Yield Structural Grades' },
      { label: 'Vessel Load Capacity', value: '55,000 DWT', sublabel: 'Handymax & Supramax Bulk' },
      { label: 'Quality Certification', value: 'EN 10204 3.1', sublabel: '100% Traceable Heat Numbers' }
    ],
    specifications: [
      { key: 'Flat Products', value: 'Hot Rolled Coils (HRC), Cold Rolled Coils (CRC), GI & PPGI' },
      { key: 'Structural Sections', value: 'Universal Beams (UB), Universal Columns (UC), Channels (PFC)' },
      { key: 'Piping & Tubes', value: 'API 5L Seamless Line Pipes, ERW Structural Hollow Sections' },
      { key: 'Steel Grades', value: 'ASTM A36, S275JR, S355JR/J2, SS400, Corten Weathering Steel' },
      { key: 'Inspection Standards', value: 'SGS, Bureau Veritas, Lloyd’s Register Pre-Shipment Inspection' }
    ],
    certifications: ['ISO 9001:2015', 'CE Marking (EN 10025-2)', 'API 5L Certified', 'EN 10204 Type 3.1 MTC', 'Lloyds Register Approved'],
    subCategories: ['Hot Rolled & Cold Rolled Coils', 'Galvanized & Pre-Painted Steel (PPGI)', 'Heavy Structural Beams & Columns', 'Seamless API Line Pipes'],
    exportDestinations: ['United States', 'Turkey', 'Saudi Arabia', 'UAE', 'Italy', 'Spain', 'South Africa', 'Egypt']
  }
];

export const PRODUCTS_CATALOG: ProductItem[] = [
  // Healthcare & Dental Care (From Corporate Brochure)
  {
    id: 'hc-01',
    sectorId: 'healthcare',
    name: 'RABEZ - D (Rabeprazole & Domperidone SR Capsules)',
    category: 'Gastroenterology',
    image: '/Relexa_Product_Images/Rabez-D.jpeg',
    description: 'Rabeprazole Sodium IP 20mg (EC) & Domperidone IP 30mg (SR) for rapid relief of GERD, hyperacidity, and gastric reflux.',
    specs: {
      'Active Ingredients': 'Rabeprazole Na 20mg + Domperidone 30mg SR',
      'Dosage Form': 'Hard Gelatin Capsules (Alu-Alu blister)',
      'Pharmacopeia': 'IP / BP / USP Compliance',
      'Stability': 'Zone IVb Tropical Stability Tested'
    },
    packaging: '10 x 10 Capsules / Box, 100 Boxes / Master Shipper',
    containerCapacity: '20ft FCL: 1,800,000 Capsules',
    moq: '50,000 Capsules',
    certifications: ['WHO-GMP', 'EU-GMP', 'US-FDA Audited Facility']
  },
  {
    id: 'hc-02',
    sectorId: 'healthcare',
    name: 'FERO + D3 (Calcium, Vitamin D3 & Methylcobalamin)',
    category: 'Nutraceuticals & Hematinics',
    image: '/Relexa_Product_Images/Fero-D3.jpeg',
    description: 'Advanced hematinic and osteo-vitality complex enriched with Calcium Carbonate, Vitamin D3, Methylcobalamin, and L-Methylfolate.',
    specs: {
      'Composition': 'Calcium + Vit D3 + Methylcobalamin + L-Methylfolate',
      'Dosage Form': 'Film Coated Tablets',
      'Bioavailability': 'Enhanced intestinal absorption matrix',
      'Shelf Life': '24 Months'
    },
    packaging: '10 x 10 Tablets / Box (Alu-Alu packaging)',
    containerCapacity: '20ft FCL: 2.4 Million Tablets',
    moq: '100,000 Tablets',
    certifications: ['WHO-GMP', 'ISO 22000', 'FSSAI']
  },
  {
    id: 'hc-03',
    sectorId: 'healthcare',
    name: 'DVAAND - P (Diclofenac Sodium & Paracetamol Tablets)',
    category: 'Analgesics & Anti-Inflammatory',
    image: '/Relexa_Product_Images/Rabez-D.jpeg',
    description: 'High-efficacy dual-action pain relief formulation for musculoskeletal disorders, acute trauma, and post-operative pain management.',
    specs: {
      'Active Ingredients': 'Diclofenac Sodium 50mg + Paracetamol 325mg',
      'Dissolution': 'USP Type 2 Compliant (>85% in 30 mins)',
      'Assay': '98.0% - 102.0% (HPLC)',
      'Storage': 'Below 25°C, Protected from moisture'
    },
    packaging: '10 x 10 Blisters / Box, 50 Boxes / Carton',
    containerCapacity: '20ft FCL: 2,000,000 Tablets',
    moq: '100,000 Tablets',
    certifications: ['WHO-GMP', 'COPP Available', 'ISO 9001']
  },
  {
    id: 'hc-04',
    sectorId: 'healthcare',
    name: 'REALVITA (Omega 3, Ginseng, Multivitamins & Minerals)',
    category: 'Vitality & Immunity',
    image: '/Relexa_Product_Images/Fero-D3.jpeg',
    description: 'Premium soft gelatin capsule containing Korean Ginseng extract, high-EPA/DHA Omega-3 fatty acids, 12 essential vitamins, and trace minerals.',
    specs: {
      'Form': 'Soft Gelatin Capsules',
      'Purity Standard': 'Molecularly Distilled Fish Oil',
      'Key Actives': 'Ginseng Extract + Omega-3 + Zinc + Selenium + Vit C',
      'Packaging': 'Blister Pack of 10s'
    },
    packaging: '3 x 10 Softgels / Mono-carton, 60 Cartons / Master',
    containerCapacity: '20ft FCL: 1,200,000 Softgels',
    moq: '50,000 Softgels',
    certifications: ['ISO 22000:2018', 'HACCP', 'GMP Certified']
  },
  {
    id: 'hc-05',
    sectorId: 'healthcare',
    name: 'DEVDENT-D (Medicated Toothpaste & Desensitizing Gel)',
    category: 'Dental Care',
    image: '/Relexa_Product_Images/Devdent-D.jpeg',
    description: 'Clinically proven desensitizing oral care formulation with Potassium Nitrate, Sodium Monofluorophosphate, and Triclosan.',
    specs: {
      'Active Actives': 'Potassium Nitrate 5% w/w + SMFP 0.7% w/w + Triclosan',
      'Tube Size': '50g / 100g Laminated Tubes',
      'Enamel Protection': 'Dual-action remineralizing formula',
      'pH Range': '6.5 - 7.5'
    },
    packaging: '100g Laminated Tube / Box, 72 Tubes / Shipper',
    containerCapacity: '20ft FCL: 75,000 Tubes',
    moq: '5,000 Tubes',
    certifications: ['FDA Registered', 'ISO 13485', 'CE Mark']
  },
  {
    id: 'hc-06',
    sectorId: 'healthcare',
    name: 'DSENS PASTE & MOCPAIN Dental Care Series',
    category: 'Dental Care & Analgesic Gel',
    image: '/Relexa_Product_Images/Devdent-D.jpeg',
    description: '0.4% Stannous Fluoride rapid desensitizing paste paired with MOCPAIN Benzocaine 15g Fast-acting Topical Analgesic Dental Gel.',
    specs: {
      'Dsens Paste': '0.4% Stannous Fluoride Desensitizing Gel',
      'Mocpain Gel': 'Benzocaine USP 20% w/w Topical Gel 15g',
      'Devdent Paint': 'Choline Salicylate + Tannic Acid + Lignocaine Gum Paint',
      'Safety': 'Clinically Tested for Periodontal Application'
    },
    packaging: '15g / 50g Tubes, 100 Cartons / Master Shipper',
    containerCapacity: 'Air Cargo & FCL Consolidation',
    moq: '3,000 Units',
    certifications: ['ISO 13485:2016', 'WHO-GMP', 'CE Mark']
  },

  // Frozen Foods (From Corporate Brochure)
  {
    id: 'ff-01',
    sectorId: 'frozen-foods',
    name: 'French Fries Straight Cut (9mm / 6mm)',
    category: 'Frozen Foods',
    image: '/Relexa_Product_Images/French-Fries-Straight-Cut.jpeg',
    description: 'Grade A high-solids potato fries with golden crisp exterior, fluffy interior, low oil absorption, and consistent length distribution.',
    specs: {
      'Cut Size': '9mm x 9mm Straight Cut (Also available in 6mm Shoestring)',
      'Solids Content': 'Min 28.5%',
      'Length Distribution': '> 75mm (Min 65%), < 50mm (Max 5%)',
      'Shelf Life': '24 Months at -18°C'
    },
    packaging: '4 x 2.5 kg Polybags / Master Carton (10kg Net)',
    containerCapacity: '40ft HC Reefer: 2,400 Cartons (24 MT Net)',
    moq: '1 x 40ft Reefer Container (24 MT)',
    certifications: ['BRCGS AA Grade', 'HACCP', 'Halal', 'Kosher', 'FSSAI']
  },
  {
    id: 'ff-02',
    sectorId: 'frozen-foods',
    name: 'Crinkle Fries (IQF Golden Ridged Cut)',
    category: 'Frozen Foods',
    image: '/Relexa_Product_Images/French-Fries-Straight-Cut.jpeg',
    description: 'Distinctive corrugated ridged-cut fries providing maximum surface crispness and exceptional sauce dipping hold for international QSRs.',
    specs: {
      'Cut Size': '10mm x 10mm / 11mm Ridged Crinkle',
      'Freezing Tunnel': 'IQF Fluidized Bed (-38°C)',
      'Frying Time': '3 - 3.5 mins at 175°C (350°F)',
      'Defect Count': '< 2 minor per 1000g'
    },
    packaging: '4 x 2.5 kg Polybags / Carton (10kg Net)',
    containerCapacity: '40ft Reefer: 24 Metric Tons',
    moq: '1 x 40ft Reefer Container (24 MT)',
    certifications: ['BRCGS Food Safety', 'ISO 22000', 'Halal']
  },
  {
    id: 'ff-03',
    sectorId: 'frozen-foods',
    name: 'Coated Flavoured Fries (Herb & Peri-Peri Seasoned)',
    category: 'Frozen Foods',
    image: '/Relexa_Product_Images/Coated-Flavoured-Fries.jpeg',
    description: 'Crispy batter-coated seasoned potato fries that maintain stay-crisp warmth for up to 30 minutes, ideal for delivery & takeaways.',
    specs: {
      'Coating Type': 'Clear-coat / Herb & Spiced Crunch Batter',
      'Hold Time': 'Crispness maintained > 30 mins after frying',
      'Oil Pickup': '12% lower than standard uncoated fries',
      'Temperature': '-18°C Cold Chain'
    },
    packaging: '4 x 2.5 kg Polybags / Carton (10kg Net)',
    containerCapacity: '40ft Reefer: 24 Metric Tons',
    moq: '1 x 40ft Reefer Container (24 MT)',
    certifications: ['BRCGS AA Grade', 'US-FDA Registered', 'Halal']
  },
  {
    id: 'ff-04',
    sectorId: 'frozen-foods',
    name: 'Aloo Tikki & Chilli Garlic Shotz (IQF Appetizers)',
    category: 'Frozen Foods',
    image: '/Relexa_Product_Images/Coated-Flavoured-Fries.jpeg',
    description: 'Authentic spiced potato patties and bite-sized spicy garlic poppers, crafted with natural herbs, fresh chillies, and crispy breadcrumb coating.',
    specs: {
      'Aloo Tikki Piece Wt': '40g / 50g per Patty',
      'Chilli Garlic Shotz': '12g - 15g Crunchy Poppers',
      'Cooking Method': 'Deep Fry (3 mins) or Air Fry (8 mins at 200°C)',
      'Preservatives': 'Zero artificial preservatives'
    },
    packaging: '10 x 1 kg Pouches or 4 x 2.5 kg Cartons (10kg Net)',
    containerCapacity: '40ft HC Reefer: 2,200 Cartons (22 MT Net)',
    moq: '1 x 40ft Reefer Container (22 MT)',
    certifications: ['BRCGS Food Safety', 'HACCP', 'FSSAI Export Certified']
  },

  // Pet Nutrition (From Corporate Brochure)
  {
    id: 'pn-01',
    sectorId: 'pet-nutrition',
    name: 'Dog Food (Complete Nutrition Grain-Free Recipe)',
    category: 'Pet Nutrition',
    image: '/Relexa_Product_Images/Dog-Food.jpeg',
    description: 'Complete and balanced canine nourishment formulated with real chicken, lamb, sweet potatoes, and prebiotic fibers for optimal coat and gut health.',
    specs: {
      'Crude Protein': 'Min 32.0%',
      'Crude Fat': 'Min 16.0%',
      'Life Stages': 'Puppy, Adult & Senior Breed Formulations',
      'Grain-Free': '100% Free from Corn, Wheat, and Soy'
    },
    packaging: '2.5 kg, 10 kg, 15 kg & 20 kg Multi-Wall Barrier Bags',
    containerCapacity: '40ft HC Container: 22 Metric Tons',
    moq: '5 Metric Tons per Recipe',
    certifications: ['AAFCO Compliant', 'ISO 22000:2018', 'Vet Formulated']
  },
  {
    id: 'pn-02',
    sectorId: 'pet-nutrition',
    name: 'Cat Food (Complete Taurine-Enriched Formula)',
    category: 'Pet Nutrition',
    image: '/Relexa_Product_Images/Cat-Food.jpeg',
    description: 'High-protein feline diet rich in ocean fish, chicken liver, and essential Taurine to support sharp eyesight, healthy cardiac function, and urinary tract health.',
    specs: {
      'Crude Protein': 'Min 36.0%',
      'Taurine Level': 'Min 0.20%',
      'Urinary pH Control': 'Optimized 6.2 - 6.5 range',
      'Kibble Shape': 'Small Fish / Starlet bite-sized kibble'
    },
    packaging: '1.5 kg, 3 kg, 7 kg & 10 kg Foil Bags with Zip Seal',
    containerCapacity: '40ft Container: 20 Metric Tons',
    moq: '5 Metric Tons',
    certifications: ['AAFCO Standards', 'HACCP Certified', 'Non-GMO']
  },
  {
    id: 'pn-03',
    sectorId: 'pet-nutrition',
    name: 'Horse Food & Hamster Food (Specialized Animal Diets)',
    category: 'Pet Nutrition',
    image: '/Relexa_Product_Images/Dog-Food.jpeg',
    description: 'High-energy equine performance feed for sport & working horses alongside clean seed, whole grain, and dehydrated veggie mixes for hamsters.',
    specs: {
      'Horse Feed': 'High-Digestible Fiber, Organic Selenium, Biotin for Hoof Health',
      'Hamster Feed': 'Clean Sunflower, Wheat, Flaked Corn, Extruded Pellets',
      'Aroma & Freshness': 'Nitrogen-flushed packaging for extended aroma',
      'Storage': 'Cool, dry, pest-protected storage'
    },
    packaging: '25 kg Woven PP Bags (Horse) / 500g, 1kg Pouches (Hamster)',
    containerCapacity: '20ft FCL: 14 MT / 40ft FCL: 26 MT',
    moq: '5 Metric Tons',
    certifications: ['ISO 9001', 'ISO 22000', 'Animal Welfare Feed Certified']
  },
  {
    id: 'pn-04',
    sectorId: 'pet-nutrition',
    name: 'Dog Treats & Cat Treats (Oven-Baked Bacon & Creamy Purees)',
    category: 'Pet Nutrition',
    image: '/Relexa_Product_Images/Cat-Food.jpeg',
    description: 'Oven-baked naturally delicious bacon biscuits for dogs and creamy lickable puree sticks for cats, crafted with real meat and zero artificial colors.',
    specs: {
      'Dog Treats': 'Oven-Baked Crunchy Bacon & Chicken Biscuits',
      'Cat Treats': 'Lickable Salmon & Chicken Puree Squeeze Tubes (14g x 4)',
      'Texture': 'Crunchy Tartar-Cleansing (Biscuits) / Silky Puree (Cat Sticks)',
      'All-Natural': 'Zero chemical artificial preservatives'
    },
    packaging: '200g / 400g Pouches & 4 x 14g Multi-Packs',
    containerCapacity: '20ft FCL: 8,000 kg / 40ft FCL: 18,000 kg',
    moq: '2,000 Units',
    certifications: ['Vet-Approved Formulation', 'HACCP Safety', 'ISO 22000']
  },

  // Steel Products (From Corporate Brochure)
  {
    id: 'st-01',
    sectorId: 'steel',
    name: 'HR Coil (Hot Rolled Coils & Sheets)',
    category: 'Steel Products',
    image: '/Relexa_Product_Images/HR-Coil.jpeg',
    description: 'High-tensile hot rolled steel coils meeting international structural and pressure vessel grades with full Mill Test Certificates (EN 10204 3.1).',
    specs: {
      'Width Range': '1000mm to 2000mm',
      'Thickness Range': '1.2mm to 25.4mm',
      'Coil Weight': '5 to 36 Metric Tons per Coil',
      'Grades': 'ASTM A36, S235JR, S355JR, IS2062 E250/E350, API X 42-70'
    },
    packaging: 'Eye-to-Sky or Eye-to-Wall with 4 Radial & 3 Circumferential Steel Straps',
    containerCapacity: '20ft Heavy Container: 26 MT / Breakbulk Vessel Hold',
    moq: '50 Metric Tons',
    certifications: ['EN 10204 3.1 MTC', 'CE Mark (EN 10025)', 'ISO 9001:2015']
  },
  {
    id: 'st-02',
    sectorId: 'steel',
    name: 'Flat Bar (MS Hot Rolled Flat Steel Bars)',
    category: 'Steel Products',
    image: '/Relexa_Product_Images/MS-Angle.jpeg',
    description: 'Precision hot-rolled mild steel flat bars engineered for engineering fabrication, truck trailers, grating, architectural gates, and machinery frames.',
    specs: {
      'Thickness Range': '3.0mm to 25.0mm',
      'Width Range': '12.0mm to 150.0mm',
      'Standard Length': '6.0 Meters (Custom Cut lengths available)',
      'Grades': 'ASTM A36, S275JR, S355JR, IS2062 E250/E350'
    },
    packaging: 'Secured in 1.0 to 2.5 MT Bundles with High-Tensile Steel Strapping',
    containerCapacity: '20ft Container: 25 Metric Tons / Flat Rack',
    moq: '25 Metric Tons',
    certifications: ['ISO 9001:2015', 'Mill Test Certificate 3.1', 'Lloyds Approved']
  },
  {
    id: 'st-03',
    sectorId: 'steel',
    name: 'MS Angle (Equal & Unequal Structural Angles)',
    category: 'Steel Products',
    image: '/Relexa_Product_Images/HR-Coil.jpeg',
    description: 'Hot-rolled structural steel angles with tight dimensional tolerances for power transmission towers, bridge girders, industrial sheds, and civil engineering.',
    specs: {
      'Size Range': '20x20x3mm up to 200x200x24mm',
      'Length': '6m, 9m, 12m Standard Bundles',
      'Tensile Strength': '410 - 540 MPa (High Yield)',
      'Grades': 'ASTM A36, S275JR, S355JR, IS2062 E250/E350'
    },
    packaging: 'Export Bundled with Protective Ends & Color-Coded Grade Tags',
    containerCapacity: '20ft / 40ft Open Top & Standard Containers (27 MT)',
    moq: '25 Metric Tons',
    certifications: ['CE Mark (EN 10025-2)', 'EN 10204 Type 3.1', 'SGS Pre-Shipment Inspection']
  }
];

export const GLOBAL_ROUTES: GlobalRoute[] = [
  {
    id: 'route-rotterdam',
    destination: 'Rotterdam Port, Netherlands',
    region: 'Europe & UK',
    port: 'NLRTM',
    coordinates: [51.9244, 4.4777],
    transitTime: '18 - 21 Days',
    frequency: 'Direct Weekly Sailings',
    primaryCargo: 'Pharmaceuticals, Frozen Foods, Hot-Rolled Coils'
  },
  {
    id: 'route-jebel-ali',
    destination: 'Jebel Ali Port, Dubai, UAE',
    region: 'Middle East & GCC',
    port: 'AEJEA',
    coordinates: [24.9857, 55.0273],
    transitTime: '4 - 6 Days',
    frequency: 'Bi-Weekly Express Feeder',
    primaryCargo: 'Frozen Fries, Dental Care, Structural Steel'
  },
  {
    id: 'route-newyork',
    destination: 'Port of New York / New Jersey, USA',
    region: 'North America',
    port: 'USNYC',
    coordinates: [40.6698, -74.1599],
    transitTime: '26 - 30 Days',
    frequency: 'Weekly Transatlantic Service',
    primaryCargo: 'Pet Nutrition, APIs, Cold Rolled Steel'
  },
  {
    id: 'route-singapore',
    destination: 'Port of Singapore',
    region: 'Southeast Asia & Pacific',
    port: 'SGSIN',
    coordinates: [1.2644, 103.8402],
    transitTime: '8 - 11 Days',
    frequency: 'Direct Liner Service 3x Weekly',
    primaryCargo: 'Frozen Produce, Pet Kibble, Steel Beams'
  },
  {
    id: 'route-mombasa',
    destination: 'Port of Mombasa, Kenya',
    region: 'East & Southern Africa',
    port: 'KEMBA',
    coordinates: [-4.0547, 39.6636],
    transitTime: '9 - 12 Days',
    frequency: 'Weekly Direct Feeder',
    primaryCargo: 'Essential Medicines, Agro-Produce, Galvanized Sheets'
  },
  {
    id: 'route-santos',
    destination: 'Port of Santos, Brazil',
    region: 'Latin America',
    port: 'BRSSZ',
    coordinates: [-23.9618, -46.3322],
    transitTime: '32 - 36 Days',
    frequency: 'Fortnightly South Atlantic Service',
    primaryCargo: 'Pharmaceutical Dosage Forms, Special Alloy Steel'
  }
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    code: 'US-FDA',
    name: 'U.S. Food & Drug Administration',
    authority: 'United States Dept of Health',
    sector: 'Healthcare & Frozen Foods',
    description: 'Registered foreign drug manufacturing facility and food processing establishments with verified electronic pre-notification (BTA) compliance.'
  },
  {
    code: 'WHO-GMP',
    name: 'Good Manufacturing Practices',
    authority: 'World Health Organization',
    sector: 'Healthcare & APIs',
    description: 'Strict cleanroom validation, sterile HVAC systems, batch tracing, and validation for pharmaceutical production lines.'
  },
  {
    code: 'BRCGS AA',
    name: 'BRC Global Food Standard (Grade AA)',
    authority: 'British Retail Consortium Global Standards',
    sector: 'Frozen Foods & Agriculture',
    description: 'Highest achievable audit grade for food hygiene, cold-chain HACCP controls, microbiological testing, and allergen segregation.'
  },
  {
    code: 'ISO 13485',
    name: 'Medical Devices Quality Management',
    authority: 'International Organization for Standardization',
    sector: 'Dental Care & Surgical Tools',
    description: 'Comprehensive quality management standard for design, bio-compatibility testing, and sterilization of dental instruments.'
  },
  {
    code: 'EN 10204 3.1',
    name: 'Metallic Products Inspection Certificate',
    authority: 'European Committee for Standardization',
    sector: 'Steel & Metallurgy',
    description: 'Full chemical composition analysis, yield/tensile mechanical testing, and ultrasonic crack detection verified by mill quality director.'
  },
  {
    code: 'ISO 22000',
    name: 'Food Safety Management Systems',
    authority: 'ISO Global Auditing',
    sector: 'Pet Nutrition & Human Food',
    description: 'Comprehensive biological, chemical, and physical hazards prevention across ingredient handling, extrusion, and nitrogen packaging.'
  }
];

export const COMPANY_FACTS = {
  name: 'RELEXA EXPORTS',
  tagline: 'FOUR WORLDS. ONE GLOBAL STANDARD.',
  location: 'Ahmedabad, Gujarat, India',
  fullAddress: 'Shop A-403, Rose Vill Sky, Nikol Naroda Road, Ahmedabad, Gujarat 382330, India',
  email: 'relexaexport@gmail.com',
  phones: ['+91 95742-72321', '+91 98981-16778'],
  primaryPhone: '+91 95742-72321',
  secondaryPhone: '+91 98981-16778'
};
