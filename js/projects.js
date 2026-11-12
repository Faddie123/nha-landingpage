const projects = [
  ['Dualization of Rawalpindi - Kahuta road including 4-Lane Bridge over Sihala Railway Pass, Sihala Bypass & Kahuta Bypass Package-II KM 16+500 to KM 28+352', 'GOP/PSDP'],
  ['Construction of Additional Carriageway Petaro - Sehwan N-55, Package-IC KM 40+000 to 64+000 (Re-Advertise)', 'GOP/PSDP'],
  ['Construction of Flyover at the Junction of N-5 and N-65 at Sukkur', 'GOP/PSDP'],
  ['Construction, Rehabilitation, Improvement and Widening of Chitral - Ayun - Bumborate Road (45.94 KMs) - Package-II (29.46 KMs) Including Bamburate to Kalash Velley (18.04 KM) and BUMBER to KALASH Velley (11.42 KM)', 'GOP/PSDP'],
  ['Construction, Rehabilitation, Improment and Widening of Chitral - Ayun - Bumborate Road 45.94 KMs - Package-I (16.48 KMs) Including Approach Road (4.19 KM) and BIRIR to KALASH Velly (12.29 KM)', 'GOP/PSDP'],
  ['Dualization of Quetta Western Bypass (N-25) KM 00+000 to KM 22+700 (22.7 KM)', 'GOP/PSDP'],
  ['OCB/CAREC-Tranche-II: Construction of additional Carriageway from Shikarpur - Rajanpur of N-55 (222 km). Lot-4 Rojhan - Rajanpur section km 213+500 to km 265+350 (51.85)', 'GOP/PSDP'],
  ['Construction of Hoshab-Awaran Khuzdar (M-8) Project Section of M-8 (AWARAN-NAAL PACKAGE-2C)', 'GOP/PSDP'],
  ['Construction of Hoshab-Awaran Khuzdar (M-8) Project Section of M-8 (AWARAN-NAAL PACKAGE-2B)', 'GOP/PSDP'],
  ['Construction of Hoshab-Awaran Khuzdar (M-8) Project Section of M-8 (AWARAN-NAAL PACKAGE-2A)', 'GOP/PSDP'],
  ['Improvement & Widening of Chitral - Booni - Shundur Road. Package-II: Pret - Booni (km 38+965 ~ 78+688)', 'GOP/PSDP'],
  ['Improvement & Widening of Chitral - Booni - Shundur Road. Package-IV: Shaidas - Shundur (km 114+833 ~ 152+615)', 'GOP/PSDP'],
  ['Improvement & Widening of Chitral - Booni - Shundur Road. Package-III: Booni - Shaidas (km 78+688 ~ 114+833)', 'GOP/PSDP'],
  ['Improvement & Widening of Chitral - Booni - Shundur Road. Package-I: Chitral - Pret (km 0+000 ~ 38+965)', 'GOP/PSDP'],
  ['Construction of Sialkot (Sambrial)-Kharian Motorway 69 Kms, 4 Lane Access Controlled Facility on BOT / PPP Basis.', 'GOP/PSDP'],
  ['Construction of Hoshab - Awaran Khuzdar Section of M-8 Project, Hoshab - Awaran (146 KM), Package-1A KM 00+000 to 073+500 (73.5)', 'GOP/PSDP'],
  ['Construction of Hoshab - Awaran Khuzdar Section of M-8 Project, Hoshab - Awaran (146 KM), Package-1B KM 73+500 to 146+000 (72.5)', 'GOP/PSDP'],
  ['Rehabilitation & UP-Gradation of bela - Awaran Road Section ( Awaran - Jhaljao)', 'GOP/PSDP'],
  ['Dualization of Khuzdar - Kuchlak section of National Highway (N-25): Length 330.52 km: section-III: (km 102+000 km~171+900)', 'GOP/PSDP'],
  ['Dualization of Khuzdar - Kuchlak section of National Highway (N-25): Length 330.52 km: section-IV: (km 171+900 km~241+120)', 'GOP/PSDP'],
  ['Dualization of Khuzdar - Kuchlak section of National Highway (N-25): section -II (km 51+120 ~ km102+000)', 'GOP/PSDP'],
  ['Dualization of Khuzdar - Kuchlak Section of National Highway (N-25): Section - I (km 00+000 ~ km 51+120)', 'GOP/PSDP'],
  ['Dualization of Indus highway (N-55) Karak to Kahat Package-II (66.5 KM approx) (Sarai Gambila to Kohat)', 'GOP/PSDP'],
  ['Construction of lahore sialkot motorway (LSM) link Highway (4-lane) connecting LSM to narang mandi and narowal (73 km approxf) Package-III from km 48+000 to km 62+330 Including narowal eastern bypass (10.3 km) - total length 24.6 km.', 'GOP/PSDP'],
  ['Construction of 02 Lanes Highway from Basima to Khuzdar (N-30)', 'GOP/PSDP'],
  ['Rehabilitation & upgradation Jhal Jhao bela road KM (54+800 KM 134+690) length: 79.89 KM', 'GOP/PSDP'],
  ['CAREC (Central Asian Regional Economic Cooperation Corridor Development Program) - Tranche 1 project Construction of Additional 2 Lane Carriageway from Shikarpur to Ratodero N-55 (Section-2) KM 00+000 to 40+000 KM', 'GOP/PSDP'],
  ['Construction of Road from Nokundi to Mashkhel (102 km) on Taftan - Quetta Road', 'GOP/PSDP'],
  ['D I Khan Road Development Package: Rehabilitation and Upgradation of Pezu Tank Road 38 KM', 'GOP/PSDP'],
  ['Dualization of Kuchlac – Zhob Section Of N-50 (298km) Package-IV: Km 180+00 To Km 245+00 (Nasai to Khanozai) 65 Km', 'GOP/PSDP'],
  ['Dualization of Kuchlac – Zhob Section Of N-50 (298km) Package-V: Km 245+00 To Km 298+00 (Khanozai To Kuchlac) 53 Km', 'GOP/PSDP'],
  ['Construction of Gilgit Shandoor Road 216 KM (PACKAGE-III) KM 14O+OOO TO KM 216+376', 'GOP/PSDP'],
  ['Construction of Gilgit Shandoor Road 216 km PACKAGE-II km 70+000 to km 140+000', 'GOP/PSDP'],
  ['Construction of Gilgit Shandoor Road 216 km PACKAGE-I km 00+000 to km 70+000', 'GOP/PSDP'],
  ['Dualizaton and Improvement of Existing Yarik - Sagu - Zhob - Package-I Yarik - Sagu (50KM)', 'GOP/PSDP'],
  ['OCB/CAREC-Tranche-II: Construction of additional Carriageway from Shikarpur - Rajanpur of N-55 (222 km). Lot-2 Kandhkot - Kashmore section km 105+820 to km 164+600 (58.78 km)', 'GOP/PSDP'],
  ['Package-6 Rehabilitation of national Highway & Bridges FazilPur – D.I. Khan Lot-3 ramak - D.I. khan', 'GOP/PSDP'],
  ['Construction of Hakla on M-I to Yarik D.I.Khan Motorway (CPEC) (Pindi Gheb to Hakla) Package-V', 'GOP/PSDP'],
  ['Construction of 4-Lane Bridge Across River Indus Linking Layyah with Taunsa including 2-Lane Approach Roads and Training Works', 'GOP/PSDP'],
  ['Construction of Infrastructure and Allied work for Metro Bus Services (Peshawar Morr - Golra Morr) Package-I', 'GOP/PSDP'],
  ['Construction of Infrastructure and Allied work for Metro Bus Services (Golra Morr - N-5 Interchange) Package-II', 'GOP/PSDP'],
  ['Construction of Hakla on M-I to Yarik D.I.Khan Motorway (CPEC) (Tarap - Pindigheb) Package-IV', 'GOP/PSDP'],
  ['Construction of Hakla on M-I to Yarik D.I.Khan Motorway (CPEC) (Daud Khel - Tarap) Package-III', 'GOP/PSDP'],
  ['Construction of Hakla on M-I to Yarik D.I.Khan Motorway (CPEC) (Rehmani Khel to Kot Belian) Package-IIC', 'GOP/PSDP'],
  ['Construction of Lahore-Abdul Hakeem Section M-3', 'GOP/PSDP'],
  ['Peshawar Northern Bypass Package-3B', 'GOP/PSDP'],
  ['Dualization of old Bannu Road (Khurram to Krapa) Package-2', 'GOP/PSDP'],
  ['Dualization of old Bannu Road (Domail to Khurram) Package-1', 'GOP/PSDP'],
  ['Lowari Tunnel South Access Road N-45', 'GOP/PSDP'],
  ['Improvement and Widening of Jaglot - Skardu Road (S-1)', 'GOP/PSDP'],
  ['Rehabilitation of Bahrain - Kalam Road N-95 (Bridges Package) Package-2 Lot-2: Foreign Aid (ADB) Asian Development Bank', 'Foreign Aid (ADB)'],
  ['Peshawar Northern Bypass Package-3A', 'GOP/PSDP'],
  ['Peshawar Northern Bypass Package-2', 'GOP/PSDP'],
  ['Lowari Tunnel North Access Road N-45', 'GOP/PSDP'],
  ['Shatial - Thor Nullah Bypass', 'Others'],
  ['Construction of Khuzdar-Shadadkot Section of Gawadar - Ratodero Road M-8 Section-IV, Package-III', 'GOP/PSDP'],
  ['Construction of Lahore - Sialkot Motorway BOT', 'BOT']
];

const tableBody = document.querySelector('#projects-table-body');
const projectRows = projects.map(([title, type], index) => {
  const row = document.createElement('tr');
  row.dataset.searchRow = '';

  const numberCell = document.createElement('td');
  numberCell.textContent = String(index + 1);
  const titleCell = document.createElement('td');
  titleCell.textContent = title;
  const typeCell = document.createElement('td');
  typeCell.textContent = type;

  row.append(numberCell, titleCell, typeCell);
  tableBody.append(row);
  return row;
});

document.querySelector('[data-detail-count]').textContent = `Showing ${projectRows.length} of ${projectRows.length} projects`;
