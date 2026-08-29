import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateBrochure() {
  const pdfDoc = await PDFDocument.create();
  
  // Embed standard fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Embed Logo Image if available
  let logoImage: any = null;
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    try {
      const logoBuffer = fs.readFileSync(logoPath);
      logoImage = await pdfDoc.embedPng(logoBuffer);
    } catch (e) {
      console.warn('Could not embed logo.png:', e);
    }
  }

  // Embed Hero Images if available
  let heroPortImage: any = null;
  const heroPath = path.join(process.cwd(), 'public', 'images', 'cargo-ship.jpg');
  if (fs.existsSync(heroPath)) {
    try {
      const imgBuffer = fs.readFileSync(heroPath);
      heroPortImage = await pdfDoc.embedJpg(imgBuffer);
    } catch (e) {}
  }

  const PAGE_WIDTH = 595.28; // A4 width
  const PAGE_HEIGHT = 841.89; // A4 height

  // Colors based on the brochure design
  const darkNavy = rgb(12 / 255, 18 / 255, 34 / 255);
  const deepNavy = rgb(18 / 255, 32 / 255, 62 / 255);
  const gold = rgb(223 / 255, 186 / 255, 115 / 255);
  const brightGold = rgb(245 / 255, 218 / 255, 150 / 255);
  const lightBg = rgb(252 / 255, 250 / 255, 246 / 255);
  const white = rgb(1, 1, 1);
  const darkText = rgb(30 / 255, 35 / 255, 45 / 255);
  const grayText = rgb(95 / 255, 100 / 255, 115 / 255);
  const pharmaGreen = rgb(120 / 255, 182 / 255, 38 / 255);
  const pharmaNavy = rgb(20 / 255, 45 / 255, 85 / 255);
  const frozenOrange = rgb(230 / 255, 105 / 255, 40 / 255);
  const petBrown = rgb(205 / 255, 130 / 255, 45 / 255);
  const steelNavy = rgb(18 / 255, 38 / 255, 78 / 255);

  const addHeader = (page: any) => {
    page.drawRectangle({
      x: 0,
      y: PAGE_HEIGHT - 6,
      width: PAGE_WIDTH,
      height: 6,
      color: gold,
    });
  };

  const addFooter = (page: any, pageNum: number) => {
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: 32,
      color: lightBg,
    });
    page.drawRectangle({
      x: 0,
      y: 32,
      width: PAGE_WIDTH,
      height: 2,
      color: gold,
    });

    if (logoImage) {
      page.drawImage(logoImage, {
        x: PAGE_WIDTH - 65,
        y: 6,
        width: 38,
        height: 20,
      });
    }

    page.drawText('RELEXA EXPORTS — GLOBAL EXPORT BROCHURE', {
      x: 40,
      y: 12,
      size: 8,
      font: helveticaBold,
      color: deepNavy,
    });

    const pageStr = `Page ${pageNum} of 15`;
    page.drawText(pageStr, {
      x: PAGE_WIDTH / 2 - 25,
      y: 12,
      size: 8,
      font: helvetica,
      color: grayText,
    });
  };

  // ==========================================
  // PAGE 1: COVER PAGE
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      color: darkNavy,
    });

    if (heroPortImage) {
      page.drawImage(heroPortImage, {
        x: 0,
        y: 0,
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        opacity: 0.28,
      });
    }

    // Outer gold double frame
    page.drawRectangle({
      x: 20,
      y: 20,
      width: PAGE_WIDTH - 40,
      height: PAGE_HEIGHT - 40,
      borderColor: gold,
      borderWidth: 1.5,
    });
    page.drawRectangle({
      x: 26,
      y: 26,
      width: PAGE_WIDTH - 52,
      height: PAGE_HEIGHT - 52,
      borderColor: gold,
      borderWidth: 0.75,
    });

    // Central Oval Emblem
    page.drawRectangle({
      x: PAGE_WIDTH / 2 - 110,
      y: PAGE_HEIGHT / 2 - 120,
      width: 220,
      height: 260,
      borderColor: gold,
      borderWidth: 2,
      color: deepNavy,
    });

    if (logoImage) {
      page.drawImage(logoImage, {
        x: PAGE_WIDTH / 2 - 85,
        y: PAGE_HEIGHT / 2 - 60,
        width: 170,
        height: 120,
      });
    } else {
      page.drawText('RE', {
        x: PAGE_WIDTH / 2 - 50,
        y: PAGE_HEIGHT / 2 + 10,
        size: 70,
        font: timesRomanBold,
        color: brightGold,
      });
    }

    page.drawText('RELEXA EXPORTS', {
      x: PAGE_WIDTH / 2 - 140,
      y: 110,
      size: 26,
      font: helveticaBold,
      color: brightGold,
    });

    page.drawText('FOUR WORLDS. ONE GLOBAL STANDARD.', {
      x: PAGE_WIDTH / 2 - 125,
      y: 85,
      size: 9.5,
      font: helveticaBold,
      color: white,
    });

    page.drawText('PHARMACEUTICALS  •  FROZEN FOODS  •  PET NUTRITION  •  STEEL', {
      x: PAGE_WIDTH / 2 - 170,
      y: 65,
      size: 8,
      font: helvetica,
      color: gold,
    });
  }

  // ==========================================
  // PAGE 2: ABOUT OF RELEXA EXPORT
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 2);

    page.drawText('ABOUT OF RELEXA EXPORT', {
      x: 50,
      y: PAGE_HEIGHT - 70,
      size: 22,
      font: helveticaBold,
      color: deepNavy,
    });

    page.drawRectangle({
      x: 50,
      y: PAGE_HEIGHT - 80,
      width: 140,
      height: 3,
      color: gold,
    });

    const aboutParagraphs = [
      "Relexa Exports is a globally emerging enterprise committed to delivering excellence across multiple industries, including pharmaceuticals, pet food, frozen foods, and steel. Built on a strong foundation of trust, quality, and innovation, the company has positioned itself as a reliable partner for international markets. With a customer-centric approach and a deep understanding of global demands, Relexa Exports consistently provides products that meet the highest standards of safety, performance, and reliability.",
      "In the pharmaceutical sector, Relexa Exports focuses on delivering effective and high-quality healthcare solutions designed to improve lives. Alongside this, the company offers advanced dental care products that promote oral health and hygiene. Expanding beyond healthcare, Relexa Exports brings premium pet food solutions formulated to ensure optimal nutrition and well-being for pets. The frozen food division is dedicated to maintaining freshness, taste, and quality, delivering products that meet modern lifestyle needs while preserving nutritional value.",
      "Further strengthening its diversified portfolio, Relexa Exports is also engaged in the supply of high-grade steel, supporting infrastructure and industrial growth. Every product, whether in healthcare, nutrition, food, or materials, undergoes strict quality control processes to ensure it aligns with international standards. The company leverages advanced technology, efficient logistics, and a skilled workforce to deliver excellence at every stage—from production to distribution.",
      "With a vision to expand its global footprint, Relexa Exports is driven by innovation, integrity, and long-term partnerships. The company strives not only to meet expectations but to exceed them by offering dependable products and consistent service. By combining expertise across diverse sectors, Relexa Exports continues to contribute to healthier lives, better nutrition, and stronger industries worldwide."
    ];

    let currentY = PAGE_HEIGHT - 120;
    for (const para of aboutParagraphs) {
      page.drawRectangle({
        x: 48,
        y: currentY - 120,
        width: PAGE_WIDTH - 96,
        height: 115,
        color: white,
        borderColor: rgb(225 / 255, 230 / 255, 240 / 255),
        borderWidth: 1,
      });
      page.drawRectangle({
        x: 48,
        y: currentY - 120,
        width: 4,
        height: 115,
        color: gold,
      });

      const words = para.split(' ');
      let line = '';
      let lineY = currentY - 20;
      for (const word of words) {
        if (line.length + word.length > 76) {
          page.drawText(line, { x: 64, y: lineY, size: 9.5, font: helvetica, color: darkText });
          line = word + ' ';
          lineY -= 14;
        } else {
          line += word + ' ';
        }
      }
      if (line) {
        page.drawText(line, { x: 64, y: lineY, size: 9.5, font: helvetica, color: darkText });
      }

      currentY -= 135;
    }
  }

  // Helper for Product 3-column Cards (Pages 3-7)
  const drawPharmaCard = (page: any, x: number, y: number, itemNum: string, name: string, generic: string, benefits: string) => {
    const cardW = PAGE_WIDTH - 80;
    const cardH = 145;

    // Outer card
    page.drawRectangle({
      x,
      y,
      width: cardW,
      height: cardH,
      color: white,
      borderColor: rgb(215 / 255, 222 / 255, 235 / 255),
      borderWidth: 1,
    });

    // Left Column: Description (Navy)
    page.drawRectangle({ x, y, width: 165, height: cardH, color: pharmaNavy });
    page.drawText('FORMULATION & USE', { x: x + 12, y: y + cardH - 18, size: 7.5, font: helveticaBold, color: gold });
    
    const gWords = generic.split(' ');
    let gLine = '';
    let gY = y + cardH - 34;
    for (const w of gWords) {
      if (gLine.length + w.length > 25) {
        page.drawText(gLine, { x: x + 12, y: gY, size: 7.8, font: helvetica, color: white });
        gLine = w + ' ';
        gY -= 11;
      } else {
        gLine += w + ' ';
      }
    }
    if (gLine) page.drawText(gLine, { x: x + 12, y: gY, size: 7.8, font: helvetica, color: white });

    // Center Column: Green Header & Name
    page.drawRectangle({ x: x + 165, y, width: 170, height: cardH, color: rgb(248 / 255, 250 / 255, 254 / 255) });
    page.drawRectangle({ x: x + 165, y: y + cardH - 32, width: 170, height: 32, color: pharmaGreen });
    page.drawText(name, { x: x + 175, y: y + cardH - 22, size: 12, font: helveticaBold, color: white });

    page.drawText('RELEXA PHARMA', { x: x + 175, y: y + 36, size: 7.5, font: helveticaBold, color: deepNavy });
    page.drawText('WHO-GMP QUALITY', { x: x + 175, y: y + 22, size: 7, font: helvetica, color: pharmaGreen });

    // Right Column: Therapeutic Benefit (Navy)
    page.drawRectangle({ x: x + 335, y, width: cardW - 335, height: cardH, color: pharmaNavy });
    page.drawText('CLINICAL BENEFITS', { x: x + 346, y: y + cardH - 18, size: 7.5, font: helveticaBold, color: gold });

    const bWords = benefits.split(' ');
    let bLine = '';
    let bY = y + cardH - 34;
    for (const w of bWords) {
      if (bLine.length + w.length > 27) {
        page.drawText(bLine, { x: x + 346, y: bY, size: 7.8, font: helvetica, color: white });
        bLine = w + ' ';
        bY -= 11;
      } else {
        bLine += w + ' ';
      }
    }
    if (bLine) page.drawText(bLine, { x: x + 346, y: bY, size: 7.8, font: helvetica, color: white });

    // Number Badge (Green)
    page.drawRectangle({ x: x + cardW - 32, y: y + 8, width: 24, height: 24, color: pharmaGreen });
    page.drawText(itemNum, { x: x + cardW - 26, y: y + 15, size: 10, font: helveticaBold, color: white });
  };

  // ==========================================
  // PAGE 3: HEALTHCARE (RABEZ-D, FERO+D3)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 3);

    page.drawText('RELEXA EXPORTS – DELIVERING TRUSTED HEALTHCARE', { x: 40, y: PAGE_HEIGHT - 55, size: 14, font: helveticaBold, color: deepNavy });
    page.drawText('& SMILES WORLDWIDE', { x: 40, y: PAGE_HEIGHT - 72, size: 14, font: helveticaBold, color: deepNavy });
    
    page.drawText('“Relexa Exports delivers trusted medicines and advanced dental care products worldwide,', { x: 40, y: PAGE_HEIGHT - 94, size: 8.5, font: helvetica, color: grayText });
    page.drawText('ensuring quality, innovation, and reliability for healthier lives and brighter smiles every single day.”', { x: 40, y: PAGE_HEIGHT - 106, size: 8.5, font: helvetica, color: grayText });

    drawPharmaCard(page, 40, PAGE_HEIGHT - 270, '01', 'RABEZ - D', 
      'RABEZ-D is a combination medicine containing Rabeprazole and Domperidone, used to treat acidity, acid reflux (GERD), heartburn, indigestion, and stomach ulcers. Rabeprazole reduces excess stomach acid production, while Domperidone improves stomach movement.',
      'Helps relieve nausea and bloating. It is usually taken before meals as prescribed by a doctor for effective symptom relief.');

    drawPharmaCard(page, 40, PAGE_HEIGHT - 440, '02', 'FERO + D3', 
      'Fero + D3 is a nutritional supplement formulated with iron and Vitamin D3 to support healthy hemoglobin levels, improve energy, and help reduce fatigue caused by iron deficiency. Vitamin D3 promotes better calcium absorption, supporting strong bones and overall wellness.',
      'Regular use may help maintain immunity, vitality, and nutritional balance as part of a healthy lifestyle and diet.');
  }

  // ==========================================
  // PAGE 4: HEALTHCARE (DVAAND-P, REALVITA, DEVDENT-D)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 4);

    page.drawText('HEALTHCARE & SPECIALTY MEDICINES', { x: 40, y: PAGE_HEIGHT - 50, size: 15, font: helveticaBold, color: deepNavy });

    drawPharmaCard(page, 40, PAGE_HEIGHT - 210, '03', 'DVAAND - P',
      'DVAAND-P is a specially formulated Ayurvedic supplement designed to support women’s reproductive health and hormonal balance. It helps manage menstrual discomfort, irregular cycles, and associated symptoms naturally.',
      'Enriched with traditional herbal ingredients, it promotes overall uterine wellness, supports hormonal harmony, and enhances general well-being.');

    drawPharmaCard(page, 40, PAGE_HEIGHT - 375, '04', 'REALVITA',
      'REALVITA is a premium health and wellness supplement designed to support overall vitality, immunity, and daily nutrition. Enriched with essential vitamins, minerals, and antioxidants, it helps maintain energy levels and supports an active lifestyle.',
      'Regular use may contribute to improved wellness, enhanced stamina, and balanced nutritional intake for everyday health and well-being.');

    drawPharmaCard(page, 40, PAGE_HEIGHT - 540, '05', 'DEVDENT-D',
      'DEVDENT-D is a specially formulated dental care product designed to support oral hygiene and promote healthy teeth and gums. It helps reduce plaque buildup, freshens breath, and maintains overall dental health.',
      'Regular use can aid in preventing common oral problems while supporting strong teeth and healthy gums. Suitable for routine dental care as recommended by a dental professional.');
  }

  // ==========================================
  // PAGE 5: DENTAL & PAIN RELIEF (DSENS, MOCPAIN, DEVDENT)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 5);

    page.drawText('DENTAL CARE & TOPICAL ANALGESICS', { x: 40, y: PAGE_HEIGHT - 50, size: 15, font: helveticaBold, color: deepNavy });

    drawPharmaCard(page, 40, PAGE_HEIGHT - 210, '06', 'DSENS PASTE',
      'DSENS Paste is a specialized dental care paste formulated to support oral health and provide relief from tooth sensitivity. Its advanced formula helps protect exposed dentin, strengthens enamel, and reduces discomfort caused by hot, cold, sweet, or acidic foods.',
      'Regular use promotes healthier teeth and gums, ensuring long-lasting protection, improved comfort, and enhanced daily oral hygiene for overall dental wellness.');

    drawPharmaCard(page, 40, PAGE_HEIGHT - 375, '07', 'MOCPAIN',
      'MOCPAIN is a pain-relief medication commonly used to help reduce mild to moderate pain and inflammation associated with conditions such as muscle pain, joint pain, backache, sprains, and injuries.',
      'It works by decreasing the production of substances in the body that cause pain and swelling. Use as directed by a healthcare professional for safe and effective relief.');

    drawPharmaCard(page, 40, PAGE_HEIGHT - 540, '08', 'DEVDENT',
      'DEVDENT Gum is a specially formulated dental chew designed to support your pet’s oral health and hygiene. Regular chewing helps reduce plaque and tartar buildup, promotes fresher breath, and supports healthy teeth and gums.',
      'Made with pet-friendly ingredients, it provides a tasty and enjoyable chewing experience while contributing to daily dental care and overall well-being.');
  }

  // ==========================================
  // PAGE 6: WATER CARE & MEDICINES (DECHLOR, SENSYSURE, ACUKETO-DT)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 6);

    page.drawText('WATER CARE & CLINICAL FORMULATIONS', { x: 40, y: PAGE_HEIGHT - 50, size: 15, font: helveticaBold, color: deepNavy });

    drawPharmaCard(page, 40, PAGE_HEIGHT - 210, '09', 'DECHLOR',
      'DECHLOR is an effective water treatment solution designed to remove chlorine and harmful residues from water, making it safer for aquatic life and various industrial applications. It helps improve water quality, protects fish and plants from chlorine damage.',
      'Easy to use and fast-acting, DECHLOR ensures reliable dechlorination for optimal water conditions.');

    drawPharmaCard(page, 40, PAGE_HEIGHT - 375, '10', 'SENSYSURE',
      'SENSYSURE is a reliable and advanced healthcare solution designed to support accurate monitoring and enhanced patient care. It helps healthcare professionals make informed decisions through efficient performance and dependable results.',
      'Built with quality and precision, SENSYSURE promotes safety, convenience, and confidence in clinical environments. Its user-friendly design ensures seamless operation, making it suitable for modern healthcare settings.');

    drawPharmaCard(page, 40, PAGE_HEIGHT - 540, '11', 'ACUKETO-DT',
      'ACUKETO-DT is a medicine commonly used to help manage pain, inflammation, and swelling associated with conditions such as arthritis, muscle injuries, joint pain, and postoperative discomfort. Its dispersible tablet formulation allows easy administration.',
      'Use as directed by a healthcare professional. Follow the prescribed dosage carefully and avoid self-medication for prolonged periods.');
  }

  // ==========================================
  // PAGE 7: ANTIBIOTICS & PAIN (ACUKETO-SP, AEMOD-CV 625)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 7);

    page.drawText('ADVANCED THERAPEUTICS & ANTIBIOTICS', { x: 40, y: PAGE_HEIGHT - 55, size: 14, font: helveticaBold, color: deepNavy });

    drawPharmaCard(page, 40, PAGE_HEIGHT - 240, '12', 'ACUKETO-SP',
      'ACUKETO-SP is a combination medicine commonly used to help manage pain, inflammation, and swelling associated with conditions such as arthritis, musculoskeletal disorders, injuries, and post-operative recovery.',
      'It works by reducing inflammatory responses and relieving discomfort, helping improve mobility and daily functioning. Use as directed by a healthcare professional and follow dosage instructions.');

    drawPharmaCard(page, 40, PAGE_HEIGHT - 420, '13', 'AEMOD-CV 625',
      'Introducing Acuketo™ and Aemod-CV 625 — precision-crafted formulations designed for powerful, fast-acting relief and dependable care. Engineered with advanced science and uncompromising quality, they deliver consistent performance you can trust.',
      'Elevate healthcare standards with solutions that combine innovation, safety, and excellence—because every moment of relief matters.');
  }

  // Helper for Food & Pet Cards
  const drawFoodCard = (page: any, x: number, y: number, title: string, desc: string, badge: string, headerColor: any = frozenOrange) => {
    const cardW = PAGE_WIDTH - 80;
    const cardH = 145;

    page.drawRectangle({
      x,
      y,
      width: cardW,
      height: cardH,
      color: white,
      borderColor: rgb(225 / 255, 230 / 255, 238 / 255),
      borderWidth: 1,
    });

    page.drawRectangle({
      x,
      y: y + cardH - 32,
      width: cardW,
      height: 32,
      color: headerColor,
    });

    page.drawText(title, {
      x: x + 16,
      y: y + cardH - 22,
      size: 12,
      font: helveticaBold,
      color: white,
    });

    page.drawText(badge, {
      x: x + cardW - 75,
      y: y + cardH - 20,
      size: 8,
      font: helveticaBold,
      color: white,
    });

    const words = desc.split(' ');
    let line = '';
    let lineY = y + cardH - 50;
    for (const w of words) {
      if (line.length + w.length > 70) {
        page.drawText(line, { x: x + 16, y: lineY, size: 9, font: helvetica, color: darkText });
        line = w + ' ';
        lineY -= 14;
      } else {
        line += w + ' ';
      }
    }
    if (line) page.drawText(line, { x: x + 16, y: lineY, size: 9, font: helvetica, color: darkText });
  };

  // ==========================================
  // PAGE 8: FROZEN FOODS (STRAIGHT CUT, CRINKLE FRIES)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 8);

    page.drawText('RELEXA EXPORT – QUALITY FROZEN FOODS', { x: 40, y: PAGE_HEIGHT - 55, size: 15, font: helveticaBold, color: deepNavy });
    page.drawText('FOR WORLDWIDE MARKETS', { x: 40, y: PAGE_HEIGHT - 72, size: 15, font: helveticaBold, color: deepNavy });

    page.drawText('RELEXA EXPORT supplies premium-quality frozen food products to global markets, ensuring freshness, safety, superior taste, and consistent quality through reliable sourcing, advanced processing, and efficient export services.', {
      x: 40,
      y: PAGE_HEIGHT - 96,
      size: 8,
      font: helvetica,
      color: grayText,
    });

    drawFoodCard(page, 40, PAGE_HEIGHT - 270, 'FRENCH FRIES STRAIGHT CUT', 
      'French Fries Straight Cut are made from premium-quality potatoes, carefully processed to preserve their natural flavor and texture. Featuring a uniform cut for consistent cooking and a crispy golden finish, they are ideal for restaurants, cafés, hotels, and retail markets. Easy to prepare and versatile in use, these fries offer excellent taste, convenience, and reliable quality for customers worldwide.',
      'IQF 9MM GRADE A', frozenOrange);

    drawFoodCard(page, 40, PAGE_HEIGHT - 440, 'CRINKLE FRIES',
      'Crinkle Fries are made from premium-quality potatoes and feature a distinctive ridged cut that delivers extra crispiness and enhanced flavor. Carefully processed to maintain freshness and texture, they provide a golden, crunchy finish after cooking. Ideal for restaurants, cafés, hotels, fast-food outlets, and retail markets, these fries are easy to prepare and serve.',
      'IQF RIDGED CUT', frozenOrange);
  }

  // ==========================================
  // PAGE 9: FROZEN APPETIZERS (COATED FRIES, ALOO TIKKI, CHILLI GARLIC)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 9);

    page.drawText('FROZEN SPECIALTIES & APPETIZERS', { x: 40, y: PAGE_HEIGHT - 50, size: 15, font: helveticaBold, color: deepNavy });

    drawFoodCard(page, 40, PAGE_HEIGHT - 210, 'COATED FLAVOURED FRIES',
      'Coated Flavoured Fries are crafted from premium-quality potatoes and coated with a special seasoning blend for enhanced taste and crispiness. Designed to retain their crunchy texture for longer, they deliver a rich flavor and golden appearance after cooking. Ideal for restaurants, cafés, fast-food chains, and retail markets, these fries offer convenience and a satisfying snacking experience.',
      'SEASONED IQF', rgb(200 / 255, 95 / 255, 30 / 255));

    drawFoodCard(page, 40, PAGE_HEIGHT - 375, 'ALOO TIKKI',
      'Aloo Tikki is a delicious and versatile potato-based snack made from carefully selected potatoes and blended with flavorful spices. Crispy on the outside and soft on the inside, it offers an authentic taste and satisfying texture. Ideal for restaurants, cafés, hotels, quick-service outlets, and retail markets, it is easy to prepare and serve.',
      'HERB & SPICE PATTY', rgb(60 / 255, 125 / 255, 75 / 255));

    drawFoodCard(page, 40, PAGE_HEIGHT - 540, 'CHILLI GARLIC SHOTZ',
      'Chilli Garlic Shotz are delicious bite-sized snacks made from premium ingredients and seasoned with a rich blend of spicy chilli and aromatic garlic. Crispy, flavorful, and easy to prepare, they are perfect for restaurants, cafés, fast-food outlets, and retail markets. Their bold taste, crunchy texture, and consistent quality make them an ideal choice for snack lovers.',
      'SPICY BITES', rgb(185 / 255, 50 / 255, 45 / 255));
  }

  // ==========================================
  // PAGE 10: PET NUTRITION (DOG FOODS, CAT FOOD)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 10);

    page.drawText('RELEXA EXPORT PROVIDING SUPERIOR PET FOOD SOLUTIONS', { x: 40, y: PAGE_HEIGHT - 55, size: 13.5, font: helveticaBold, color: deepNavy });
    page.drawText('TO GLOBAL MARKETS', { x: 40, y: PAGE_HEIGHT - 72, size: 13.5, font: helveticaBold, color: deepNavy });

    page.drawText('Relexa Export delivers premium pet food solutions with balanced nutrition, high-quality ingredients, and reliable supply for global markets.', {
      x: 40,
      y: PAGE_HEIGHT - 94,
      size: 8.5,
      font: helvetica,
      color: grayText,
    });

    drawFoodCard(page, 40, PAGE_HEIGHT - 260, 'DOG FOODS — COMPLETE BALANCED NUTRITION',
      'Premium-quality dog food formulated with carefully selected ingredients to provide complete and balanced nutrition. Rich in proteins, vitamins, and essential nutrients, our products support healthy growth, strong immunity, optimal digestion, and overall well-being. Manufactured to international quality standards for global markets.',
      'GRAIN FREE FORMULAS', petBrown);

    drawFoodCard(page, 40, PAGE_HEIGHT - 430, 'CAT FOOD — COMPLETE NUTRITION FOR ALL AGES',
      'Give your cat the nutrition they deserve with our premium cat food, specially crafted using high-quality ingredients to support overall health and well-being. Rich in essential proteins, vitamins, and minerals, it promotes strong muscles, healthy digestion, a shiny coat, and lasting energy. Delicious in taste and balanced in nutrition for cats of all breeds.',
      'TAURINE ENRICHED', rgb(165 / 255, 100 / 255, 50 / 255));
  }

  // ==========================================
  // PAGE 11: PET NUTRITION (HORSE FOOD, HAMSTER FOODS)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 11);

    page.drawText('EQUINE & SMALL ANIMAL FEEDS', { x: 40, y: PAGE_HEIGHT - 50, size: 15, font: helveticaBold, color: deepNavy });

    drawFoodCard(page, 40, PAGE_HEIGHT - 250, 'HORSE FOOD — COMPLETE EQUINE NUTRITION',
      'Horsh Food offers delicious, high-quality food made with fresh ingredients and rich flavors. We focus on taste, hygiene, and customer satisfaction, serving meals that are both nutritious and enjoyable. From quick bites to hearty dishes, every item is carefully prepared to deliver a memorable dining experience where great taste meets exceptional quality every day.',
      'PERFORMANCE STAMINA', rgb(140 / 255, 90 / 255, 40 / 255));

    drawFoodCard(page, 40, PAGE_HEIGHT - 420, 'HAMSTER FOODS — COMPLETE FEED',
      'HAMSTER FOODS provides premium-quality nutrition specially crafted for hamsters and other small pets. Made with carefully selected grains, seeds, vegetables, and essential nutrients, our food supports healthy growth, energy, and overall well-being. We prioritize freshness, safety, and balanced nutrition to keep your furry companions active and happy.',
      'CLEAN SEED & GRAIN MIX', rgb(50 / 255, 115 / 255, 75 / 255));
  }

  // ==========================================
  // PAGE 12: PET TREATS (DOG TREATS, CAT TREATS)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 12);

    page.drawText('PREMIUM PET TREATS & REWARDS', { x: 40, y: PAGE_HEIGHT - 50, size: 15, font: helveticaBold, color: deepNavy });

    drawFoodCard(page, 40, PAGE_HEIGHT - 250, 'DOG TREATS — OVEN BAKED BACON BISCUITS',
      'Dog Treats are tasty, nutritious snacks specially made to reward, train, and support your dog’s overall health. Crafted with quality ingredients, they help promote healthy teeth, strong bones, and good digestion while satisfying your pet’s cravings. Perfect for dogs of all breeds and sizes, these treats provide a delicious way to show love and encourage positive behavior.',
      '100% WHOLESOME', rgb(165 / 255, 80 / 255, 40 / 255));

    drawFoodCard(page, 40, PAGE_HEIGHT - 420, 'CAT TREATS — CREAMY LICKABLE STICKS',
      'Cat Treats are tasty, nutritious snacks specially made for cats to support their health and happiness. Rich in protein and essential nutrients, they can be used as rewards during training or as a special treat between meals. Available in various flavors and textures, cat treats help strengthen the bond between pets and owners while providing enjoyable indulgence.',
      'CHICKEN & LIVER', rgb(45 / 255, 95 / 255, 80 / 255));
  }

  // ==========================================
  // PAGE 13: STEEL PRODUCTS (HR COIL + GRADE TABLE)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 13);

    page.drawText('RELEXA EXPORT PROVIDING QUALITY STEEL PRODUCTS', { x: 40, y: PAGE_HEIGHT - 50, size: 13.5, font: helveticaBold, color: deepNavy });
    page.drawText('FOR WORLDWIDE INDUSTRIES', { x: 40, y: PAGE_HEIGHT - 67, size: 13.5, font: helveticaBold, color: deepNavy });

    // HR Coil Spec Box
    page.drawRectangle({
      x: 40,
      y: PAGE_HEIGHT - 170,
      width: PAGE_WIDTH - 80,
      height: 95,
      color: steelNavy,
    });
    page.drawText('HR COIL (HOT ROLLED COILS)', { x: 55, y: PAGE_HEIGHT - 95, size: 13, font: helveticaBold, color: brightGold });
    page.drawText('Width: 1000 mm, 1250 mm, 1500 mm, 2000 mm  •  Thickness: 1.2 mm to 25.4 mm', { x: 55, y: PAGE_HEIGHT - 113, size: 8.5, font: helvetica, color: white });
    page.drawText('Coil Weight: 5 MT to 36 MT  •  Coil Inside Diameter (I.D.): 580 mm to 610 mm', { x: 55, y: PAGE_HEIGHT - 127, size: 8.5, font: helvetica, color: white });
    page.drawText('Designed for superior strength, reliable performance, and efficient processing for fabrication and construction.', { x: 55, y: PAGE_HEIGHT - 141, size: 8, font: helvetica, color: gold });

    // Table Header
    const tX = 40;
    let tY = PAGE_HEIGHT - 195;

    page.drawRectangle({ x: tX, y: tY, width: PAGE_WIDTH - 80, height: 22, color: gold });
    page.drawText('Dubai Grade', { x: tX + 6, y: tY + 6, size: 8, font: helveticaBold, color: darkNavy });
    page.drawText('UK Grade', { x: tX + 76, y: tY + 6, size: 8, font: helveticaBold, color: darkNavy });
    page.drawText('Standard', { x: tX + 136, y: tY + 6, size: 8, font: helveticaBold, color: darkNavy });
    page.drawText('Typical Uses', { x: tX + 196, y: tY + 6, size: 8, font: helveticaBold, color: darkNavy });
    page.drawText('Indian Grade', { x: tX + 381, y: tY + 6, size: 8, font: helveticaBold, color: darkNavy });

    const rows = [
      ['A36', 'S235JR', 'ASTM', 'Structure fabrication', 'IS2062 E250'],
      ['A572 GR50', 'S355JR', 'ASTM', 'High Structure Industrial Building', 'IS2062 E350'],
      ['SS400', 'S235JR', 'JIS', 'General Fabrication', 'IS2062 E250'],
      ['SPHC', '-', 'JIS', 'Commercial Quality, Forming', 'IS2062 E250'],
      ['S235JR', 'S355JR', 'EN10025', 'Structural Steel', 'IS2062 E250'],
      ['S275JR', 'S275JR', 'EN10025', 'Medium Strength Structure', 'IS2062 E275'],
      ['S355JR', 'S355JR', 'EN10025', 'Heavy Structure', 'IS2062 E350'],
      ['API X 42-70', '-', 'API', 'Pipeline Steel, Heavy Pressure Pipeline', 'API X 42 - 70'],
      ['SAE1006', '-', 'SAE', 'Pipeline Making Cold rolling', 'Commercial HR Coil']
    ];

    tY -= 20;
    let isEven = false;
    for (const r of rows) {
      page.drawRectangle({
        x: tX,
        y: tY,
        width: PAGE_WIDTH - 80,
        height: 20,
        color: isEven ? rgb(238 / 255, 241 / 255, 246 / 255) : white,
      });
      page.drawText(r[0], { x: tX + 6, y: tY + 5, size: 7.5, font: helveticaBold, color: darkText });
      page.drawText(r[1], { x: tX + 76, y: tY + 5, size: 7.5, font: helvetica, color: darkText });
      page.drawText(r[2], { x: tX + 136, y: tY + 5, size: 7.5, font: helvetica, color: darkText });
      page.drawText(r[3], { x: tX + 196, y: tY + 5, size: 7.5, font: helvetica, color: darkText });
      page.drawText(r[4], { x: tX + 381, y: tY + 5, size: 7.5, font: helveticaBold, color: steelNavy });
      tY -= 20;
      isEven = !isEven;
    }
  }

  // ==========================================
  // PAGE 14: FLAT BAR & MS ANGLE
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: lightBg });
    addHeader(page);
    addFooter(page, 14);

    page.drawText('STRUCTURAL STEEL: FLAT BAR & MS ANGLE', { x: 40, y: PAGE_HEIGHT - 50, size: 15, font: helveticaBold, color: deepNavy });

    // Section 1: FLAT BAR
    page.drawRectangle({ x: 40, y: PAGE_HEIGHT - 115, width: PAGE_WIDTH - 80, height: 55, color: steelNavy });
    page.drawText('FLAT BAR', { x: 55, y: PAGE_HEIGHT - 85, size: 12, font: helveticaBold, color: brightGold });
    page.drawText('High-quality MS flat bars manufactured for superior strength, durability, and versatility in construction.', { x: 55, y: PAGE_HEIGHT - 100, size: 8, font: helvetica, color: white });

    let tY = PAGE_HEIGHT - 140;
    page.drawRectangle({ x: 40, y: tY, width: PAGE_WIDTH - 80, height: 20, color: gold });
    page.drawText('Dubai / UK Grade', { x: 46, y: tY + 5, size: 7.5, font: helveticaBold, color: darkNavy });
    page.drawText('Standard', { x: 160, y: tY + 5, size: 7.5, font: helveticaBold, color: darkNavy });
    page.drawText('Typical Uses', { x: 240, y: tY + 5, size: 7.5, font: helveticaBold, color: darkNavy });
    page.drawText('Indian Grade', { x: 440, y: tY + 5, size: 7.5, font: helveticaBold, color: darkNavy });

    const flatRows = [
      ['ASTM A36 / S275JR', 'ASTM', 'Solar mounting system, Base Plants', 'IS2062 E250'],
      ['SS400 / S355JR', 'JIS / SS', 'General Engineering, Machinery, Fabrication', 'IS1079 CQ'],
      ['S355JR / S355JR', 'EN10025', 'Heavy structure projects, bridges', 'IS2062 E350'],
      ['S275JR / S275JR', 'EN10025', 'Structural Fabrication, Frames, Flat bar', 'IS2062 E250']
    ];

    tY -= 18;
    for (const r of flatRows) {
      page.drawRectangle({ x: 40, y: tY, width: PAGE_WIDTH - 80, height: 18, color: white });
      page.drawText(r[0], { x: 46, y: tY + 4, size: 7.5, font: helvetica, color: darkText });
      page.drawText(r[1], { x: 160, y: tY + 4, size: 7.5, font: helvetica, color: darkText });
      page.drawText(r[2], { x: 240, y: tY + 4, size: 7.5, font: helvetica, color: darkText });
      page.drawText(r[3], { x: 440, y: tY + 4, size: 7.5, font: helveticaBold, color: steelNavy });
      tY -= 18;
    }

    // Section 2: MS ANGLE
    tY -= 25;
    page.drawRectangle({ x: 40, y: tY, width: PAGE_WIDTH - 80, height: 55, color: steelNavy });
    page.drawText('MS ANGLE', { x: 55, y: tY + 30, size: 12, font: helveticaBold, color: brightGold });
    page.drawText('High-quality MS angles manufactured for superior strength, durability, and structural stability.', { x: 55, y: tY + 15, size: 8, font: helvetica, color: white });

    tY -= 20;
    page.drawRectangle({ x: 40, y: tY, width: PAGE_WIDTH - 80, height: 20, color: gold });
    page.drawText('Dubai / UK Grade', { x: 46, y: tY + 5, size: 7.5, font: helveticaBold, color: darkNavy });
    page.drawText('Standard', { x: 160, y: tY + 5, size: 7.5, font: helveticaBold, color: darkNavy });
    page.drawText('Typical Uses', { x: 240, y: tY + 5, size: 7.5, font: helveticaBold, color: darkNavy });
    page.drawText('Indian Grade', { x: 440, y: tY + 5, size: 7.5, font: helveticaBold, color: darkNavy });

    const angleRows = [
      ['ASTM A36 / S275JR', 'ASTM', 'Solar mounting system, Base Plants', 'IS2062 E250'],
      ['SS400 / S355JR', 'JIS / SS', 'General Engineering, Machinery, Fabrication', 'IS1079 CQ'],
      ['S355JR / S355JR', 'EN10025', 'Heavy structure projects, bridges', 'IS2062 E350']
    ];

    tY -= 18;
    for (const r of angleRows) {
      page.drawRectangle({ x: 40, y: tY, width: PAGE_WIDTH - 80, height: 18, color: white });
      page.drawText(r[0], { x: 46, y: tY + 4, size: 7.5, font: helvetica, color: darkText });
      page.drawText(r[1], { x: 160, y: tY + 4, size: 7.5, font: helvetica, color: darkText });
      page.drawText(r[2], { x: 240, y: tY + 4, size: 7.5, font: helvetica, color: darkText });
      page.drawText(r[3], { x: 440, y: tY + 4, size: 7.5, font: helveticaBold, color: steelNavy });
      tY -= 18;
    }
  }

  // ==========================================
  // PAGE 15: CONTACT PAGE (LET'S GET CONNECT!)
  // ==========================================
  {
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: darkNavy });

    if (heroPortImage) {
      page.drawImage(heroPortImage, {
        x: 0,
        y: 0,
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        opacity: 0.22,
      });
    }

    page.drawRectangle({
      x: 30,
      y: 30,
      width: PAGE_WIDTH - 60,
      height: PAGE_HEIGHT - 60,
      borderColor: gold,
      borderWidth: 1.5,
      color: deepNavy,
    });

    page.drawText("LET’S GET CONNECT!", {
      x: PAGE_WIDTH / 2 - 120,
      y: PAGE_HEIGHT - 150,
      size: 24,
      font: helveticaBold,
      color: brightGold,
    });

    page.drawRectangle({
      x: PAGE_WIDTH / 2 - 40,
      y: PAGE_HEIGHT - 165,
      width: 80,
      height: 2,
      color: gold,
    });

    // Email
    page.drawText('relexaexport@gmail.com', {
      x: PAGE_WIDTH / 2 - 90,
      y: PAGE_HEIGHT - 230,
      size: 15,
      font: helveticaBold,
      color: white,
    });

    // Phones
    page.drawText('+91 98981-16778  |  +91 95742-72321', {
      x: PAGE_WIDTH / 2 - 120,
      y: PAGE_HEIGHT - 290,
      size: 13,
      font: helveticaBold,
      color: white,
    });

    // Address
    page.drawText('ADDRESS', {
      x: PAGE_WIDTH / 2 - 35,
      y: PAGE_HEIGHT - 350,
      size: 11,
      font: helveticaBold,
      color: gold,
    });
    page.drawText('shop A-403 Rose vill sky nikol naroda road', {
      x: PAGE_WIDTH / 2 - 120,
      y: PAGE_HEIGHT - 380,
      size: 12,
      font: helvetica,
      color: white,
    });
    page.drawText('Ahmedabad, Gujarat 382330.', {
      x: PAGE_WIDTH / 2 - 80,
      y: PAGE_HEIGHT - 400,
      size: 12,
      font: helvetica,
      color: white,
    });

    // Footer Emblem in Page 15
    if (logoImage) {
      page.drawImage(logoImage, {
        x: PAGE_WIDTH / 2 - 50,
        y: 110,
        width: 100,
        height: 60,
      });
    } else {
      page.drawText('RE', {
        x: PAGE_WIDTH / 2 - 25,
        y: 140,
        size: 32,
        font: timesRomanBold,
        color: brightGold,
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(process.cwd(), 'public', 'brochure.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Brochure successfully generated at ${outputPath} (${pdfBytes.length} bytes, 15 pages)`);
}

generateBrochure().catch(console.error);
