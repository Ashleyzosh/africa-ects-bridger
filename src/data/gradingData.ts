// Core data types for the grading conversion system
// Designed to be easily migrated to a database later

export interface Country {
  id: string;
  name: string;
  code: string;
  region: string;
}

export interface University {
  id: string;
  name: string;
  countryId: string;
  shortName?: string;
}

export interface GradeScaleItem {
  grade: string;
  minScore: number;
  maxScore: number;
  description?: string;
}

export interface GradingScale {
  id: string;
  universityId: string;
  name: string;
  type: 'numeric' | 'letter' | 'percentage' | 'mixed';
  minValue: number;
  maxValue: number;
  passingGrade: number;
  items: GradeScaleItem[];
  programYears?: number;
  totalSemesters?: number;
}

export interface ECTSGrade {
  letter: string;
  numeric: number;
  description: string;
  percentage: string;
}

// ECTS Grading Scale
export const ECTS_GRADES: ECTSGrade[] = [
  { letter: 'A', numeric: 1.0, description: 'Excellent', percentage: 'Top 10%' },
  { letter: 'B', numeric: 1.7, description: 'Very Good', percentage: 'Next 25%' },
  { letter: 'C', numeric: 2.3, description: 'Good', percentage: 'Next 30%' },
  { letter: 'D', numeric: 3.0, description: 'Satisfactory', percentage: 'Next 25%' },
  { letter: 'E', numeric: 4.0, description: 'Sufficient', percentage: 'Next 10%' },
  { letter: 'F', numeric: 5.0, description: 'Fail', percentage: 'Bottom' },
];

// Sample African Countries
export const COUNTRIES: Country[] = [
  { id: 'nga', name: 'Nigeria', code: 'NG', region: 'West Africa' },
  { id: 'ken', name: 'Kenya', code: 'KE', region: 'East Africa' },
  { id: 'zaf', name: 'South Africa', code: 'ZA', region: 'Southern Africa' },
  { id: 'egy', name: 'Egypt', code: 'EG', region: 'North Africa' },
  { id: 'gha', name: 'Ghana', code: 'GH', region: 'West Africa' },
  { id: 'eth', name: 'Ethiopia', code: 'ET', region: 'East Africa' },
  { id: 'uga', name: 'Uganda', code: 'UG', region: 'East Africa' },
  { id: 'tza', name: 'Tanzania', code: 'TZ', region: 'East Africa' },
];

// All NUC-Approved Universities in Nigeria
export const UNIVERSITIES: University[] = [
  // === FEDERAL UNIVERSITIES IN NIGERIA ===
  { id: 'atbu', name: 'Abubakar Tafawa Balewa University, Bauchi', countryId: 'nga', shortName: 'ATBU' },
  { id: 'abu', name: 'Ahmadu Bello University, Zaria', countryId: 'nga', shortName: 'ABU' },
  { id: 'buk', name: 'Bayero University, Kano', countryId: 'nga', shortName: 'BUK' },
  { id: 'fugashua', name: 'Federal University Gashua, Yobe', countryId: 'nga', shortName: 'FUGASHUA' },
  { id: 'fupre', name: 'Federal University of Petroleum Resources, Effurun', countryId: 'nga', shortName: 'FUPRE' },
  { id: 'futa', name: 'Federal University of Technology, Akure', countryId: 'nga', shortName: 'FUTA' },
  { id: 'futminna', name: 'Federal University of Technology, Minna', countryId: 'nga', shortName: 'FUTMINNA' },
  { id: 'futo', name: 'Federal University of Technology, Owerri', countryId: 'nga', shortName: 'FUTO' },
  { id: 'fud', name: 'Federal University, Dutse, Jigawa State', countryId: 'nga', shortName: 'FUD' },
  { id: 'fudma', name: 'Federal University, Dutsin-Ma, Katsina', countryId: 'nga', shortName: 'FUDMA' },
  { id: 'fukashere', name: 'Federal University, Kashere, Gombe State', countryId: 'nga', shortName: 'FUKASHERE' },
  { id: 'fulafia', name: 'Federal University, Lafia, Nasarawa State', countryId: 'nga', shortName: 'FULAFIA' },
  { id: 'fulokoja', name: 'Federal University, Lokoja, Kogi State', countryId: 'nga', shortName: 'FULOKOJA' },
  { id: 'funai', name: 'Alex Ekwueme University, Ndufu-Alike, Ebonyi State', countryId: 'nga', shortName: 'FUNAI' },
  { id: 'fuotuoke', name: 'Federal University, Otuoke, Bayelsa', countryId: 'nga', shortName: 'FUOTUOKE' },
  { id: 'fuoye', name: 'Federal University, Oye-Ekiti, Ekiti State', countryId: 'nga', shortName: 'FUOYE' },
  { id: 'fuwukari', name: 'Federal University, Wukari, Taraba State', countryId: 'nga', shortName: 'FUWUKARI' },
  { id: 'fubk', name: 'Federal University, Birnin Kebbi', countryId: 'nga', shortName: 'FUBK' },
  { id: 'fugusau', name: 'Federal University, Gusau Zamfara', countryId: 'nga', shortName: 'FUGUSAU' },
  { id: 'mouau', name: 'Michael Okpara University of Agricultural Umudike', countryId: 'nga', shortName: 'MOUAU' },
  { id: 'mautech', name: 'Modibbo Adama University of Technology, Yola', countryId: 'nga', shortName: 'MAUTECH' },
  { id: 'noun', name: 'National Open University of Nigeria, Abuja', countryId: 'nga', shortName: 'NOUN' },
  { id: 'polac', name: 'Nigeria Police Academy Wudil', countryId: 'nga', shortName: 'POLAC' },
  { id: 'nda', name: 'Nigerian Defence Academy Kaduna', countryId: 'nga', shortName: 'NDA' },
  { id: 'unizik', name: 'Nnamdi Azikiwe University, Awka', countryId: 'nga', shortName: 'UNIZIK' },
  { id: 'oau', name: 'Obafemi Awolowo University, Ile-Ife', countryId: 'nga', shortName: 'OAU' },
  { id: 'uniabuja', name: 'University of Abuja, Gwagwalada', countryId: 'nga', shortName: 'UNIABUJA' },
  { id: 'funaab', name: 'Federal University of Agriculture, Abeokuta', countryId: 'nga', shortName: 'FUNAAB' },
  { id: 'ust', name: 'Joseph Sarwuan Tarka University, Makurdi', countryId: 'nga', shortName: 'UST' },
  { id: 'uniben', name: 'University of Benin', countryId: 'nga', shortName: 'UNIBEN' },
  { id: 'unical', name: 'University of Calabar', countryId: 'nga', shortName: 'UNICAL' },
  { id: 'ui', name: 'University of Ibadan', countryId: 'nga', shortName: 'UI' },
  { id: 'unilorin', name: 'University of Ilorin', countryId: 'nga', shortName: 'UNILORIN' },
  { id: 'unijos', name: 'University of Jos', countryId: 'nga', shortName: 'UNIJOS' },
  { id: 'unilag', name: 'University of Lagos', countryId: 'nga', shortName: 'UNILAG' },
  { id: 'unimaid', name: 'University of Maiduguri', countryId: 'nga', shortName: 'UNIMAID' },
  { id: 'unn', name: 'University of Nigeria, Nsukka', countryId: 'nga', shortName: 'UNN' },
  { id: 'uniport', name: 'University of Port-Harcourt', countryId: 'nga', shortName: 'UNIPORT' },
  { id: 'uniuyo', name: 'University of Uyo', countryId: 'nga', shortName: 'UNIUYO' },
  { id: 'udusok', name: 'Usumanu Danfodiyo University', countryId: 'nga', shortName: 'UDUSOK' },
  { id: 'nmu', name: 'Nigerian Maritime University Okerenkoko, Delta State', countryId: 'nga', shortName: 'NMU' },
  { id: 'afit', name: 'Air Force Institute of Technology, Kaduna', countryId: 'nga', shortName: 'AFIT' },
  { id: 'naub', name: 'Nigerian Army University Biu', countryId: 'nga', shortName: 'NAUB' },
  { id: 'fuhs-otukpo', name: 'Federal University of Health Sciences, Otukpo, Benue State', countryId: 'nga', shortName: 'FUHS-OTUKPO' },
  { id: 'fuaz', name: 'Federal University of Agriculture, Zuru, Kebbi State', countryId: 'nga', shortName: 'FUAZ' },
  { id: 'futbabura', name: 'Federal University of Technology, Babura, Jigawa State', countryId: 'nga', shortName: 'FUTBABURA' },
  { id: 'futia', name: 'Federal University of Technology, Ikot Abasi, Akwa Ibom State', countryId: 'nga', shortName: 'FUTIA' },
  { id: 'fuhs-azare', name: 'Federal University of Health Sciences, Azare, Bauchi State', countryId: 'nga', shortName: 'FUHS-AZARE' },
  { id: 'fuhs-ila', name: 'Federal University of Health Sciences, Ila Orangun, Osun State', countryId: 'nga', shortName: 'FUHS-ILA' },
  { id: 'dnufms', name: 'David Nweze Umahi Federal University of Medical Sciences, Uburu', countryId: 'nga', shortName: 'DNUFMS' },
  { id: 'adun', name: 'Admiralty University Ibusa, Delta State', countryId: 'nga', shortName: 'ADUN' },
  { id: 'futd', name: 'Federal University of Transportation Daura, Katsina', countryId: 'nga', shortName: 'FUTD' },
  { id: 'aaau', name: 'African Aviation and Aerospace University', countryId: 'nga', shortName: 'AAAU' },
  { id: 'nust', name: 'National University of Science and Technology, Abuja', countryId: 'nga', shortName: 'NUST' },
  { id: 'fuab', name: 'Federal University of Agriculture Bassam-Biri, Bayelsa', countryId: 'nga', shortName: 'FUAB' },
  { id: 'fuhs-kwale', name: 'Federal University of Health Sciences Kwale, Delta State', countryId: 'nga', shortName: 'FUHS-KWALE' },
  { id: 'fuhs-katsina', name: 'Federal University of Health Sciences, Katsina', countryId: 'nga', shortName: 'FUHS-KATSINA' },
  { id: 'fuam', name: 'Federal University of Agriculture, Mubi', countryId: 'nga', shortName: 'FUAM' },
  { id: 'fuez', name: 'Federal University of Education, Zaria, Kaduna State', countryId: 'nga', shortName: 'FUEZ' },
  { id: 'aifuoe', name: 'Alvan Ikoku Federal University of Education, Owerri, Imo State', countryId: 'nga', shortName: 'AIFUOE' },
  { id: 'fuek', name: 'Federal University of Education, Kano', countryId: 'nga', shortName: 'FUEK' },
  { id: 'aueo', name: 'Adeyemi University of Education, Ondo', countryId: 'nga', shortName: 'AUEO' },

  // === STATE UNIVERSITIES IN NIGERIA ===
  { id: 'absu', name: 'Abia State University, Uturu', countryId: 'nga', shortName: 'ABSU' },
  { id: 'adsu', name: 'Adamawa State University Mubi', countryId: 'nga', shortName: 'ADSU' },
  { id: 'aaua', name: 'Adekunle Ajasin University, Akungba', countryId: 'nga', shortName: 'AAUA' },
  { id: 'aksu', name: 'Akwa Ibom State University, Ikot Akpaden', countryId: 'nga', shortName: 'AKSU' },
  { id: 'aau', name: 'Ambrose Alli University, Ekpoma', countryId: 'nga', shortName: 'AAU' },
  { id: 'coou', name: 'Chukwuemeka Odumegwu Ojukwu University, Uli', countryId: 'nga', shortName: 'COOU' },
  { id: 'basug', name: 'Bauchi State University, Gadau', countryId: 'nga', shortName: 'BASUG' },
  { id: 'bsum', name: 'Benue State University, Makurdi', countryId: 'nga', shortName: 'BSUM' },
  { id: 'ysu', name: 'Yobe State University, Damaturu', countryId: 'nga', shortName: 'YSU' },
  { id: 'crutech', name: 'Cross River State University of Technology, Calabar', countryId: 'nga', shortName: 'CRUTECH' },
  { id: 'delsu', name: 'Delta State University Abraka', countryId: 'nga', shortName: 'DELSU' },
  { id: 'ebsu', name: 'Ebonyi State University, Abakaliki', countryId: 'nga', shortName: 'EBSU' },
  { id: 'eksu', name: 'Ekiti State University', countryId: 'nga', shortName: 'EKSU' },
  { id: 'esut', name: 'Enugu State University of Science and Technology, Enugu', countryId: 'nga', shortName: 'ESUT' },
  { id: 'gsu', name: 'Gombe State University, Gombe', countryId: 'nga', shortName: 'GSU' },
  { id: 'ibbul', name: 'Ibrahim Badamasi Babangida University, Lapai', countryId: 'nga', shortName: 'IBBUL' },
  { id: 'iaue', name: 'Ignatius Ajuru University of Education, Rumuolumeni', countryId: 'nga', shortName: 'IAUE' },
  { id: 'imsu', name: 'Imo State University, Owerri', countryId: 'nga', shortName: 'IMSU' },
  { id: 'slu', name: 'Sule Lamido University, Kafin Hausa, Jigawa', countryId: 'nga', shortName: 'SLU' },
  { id: 'kasu', name: 'Kaduna State University, Kaduna', countryId: 'nga', shortName: 'KASU' },
  { id: 'kust', name: 'Kano University of Science & Technology, Wudil', countryId: 'nga', shortName: 'KUST' },
  { id: 'ksusta', name: 'Kebbi State University of Science and Technology, Aliero', countryId: 'nga', shortName: 'KSUSTA' },
  { id: 'pau', name: 'Prince Abubakar Audu University Anyigba', countryId: 'nga', shortName: 'PAU' },
  { id: 'kwasu', name: 'Kwara State University, Ilorin', countryId: 'nga', shortName: 'KWASU' },
  { id: 'lautech', name: 'Ladoke Akintola University of Technology, Ogbomoso', countryId: 'nga', shortName: 'LAUTECH' },
  { id: 'osustech', name: 'Ondo State University of Science and Technology Okitipupa', countryId: 'nga', shortName: 'OSUSTECH' },
  { id: 'rsu', name: 'Rivers State University', countryId: 'nga', shortName: 'RSU' },
  { id: 'oou', name: 'Olabisi Onabanjo University, Ago Iwoye', countryId: 'nga', shortName: 'OOU' },
  { id: 'lasu', name: 'Lagos State University, Ojo', countryId: 'nga', shortName: 'LASU' },
  { id: 'ndu', name: 'Niger Delta University Yenagoa', countryId: 'nga', shortName: 'NDU' },
  { id: 'nsuk', name: 'Nasarawa State University Keffi', countryId: 'nga', shortName: 'NSUK' },
  { id: 'plasu', name: 'Plateau State University Bokkos', countryId: 'nga', shortName: 'PLASU' },
  { id: 'tasued', name: 'Tai Solarin University of Education Ijebu Ode', countryId: 'nga', shortName: 'TASUED' },
  { id: 'umyu', name: "Umar Musa Yar' Adua University Katsina", countryId: 'nga', shortName: 'UMYU' },
  { id: 'uniosun', name: 'Osun State University Osogbo', countryId: 'nga', shortName: 'UNIOSUN' },
  { id: 'tsu', name: 'Taraba State University, Jalingo', countryId: 'nga', shortName: 'TSU' },
  { id: 'ssu', name: 'Sokoto State University', countryId: 'nga', shortName: 'SSU' },
  { id: 'ymsu', name: 'Yusuf Maitama Sule University Kano', countryId: 'nga', shortName: 'YMSU' },
  { id: 'tech-u', name: 'First Technical University Ibadan', countryId: 'nga', shortName: 'TECH-U' },
  { id: 'unimed', name: 'Ondo State University of Medical Sciences', countryId: 'nga', shortName: 'UNIMED' },
  { id: 'edsu', name: 'Edo State University Uzairue', countryId: 'nga', shortName: 'EDSU' },
  { id: 'kozmauniv', name: 'Kingsley Ozumba Mbadiwe University Ogboko, Imo State', countryId: 'nga', shortName: 'KOZMAUNIV' },
  { id: 'uat', name: 'University of Africa Toru Orua, Bayelsa State', countryId: 'nga', shortName: 'UAT' },
  { id: 'bosu', name: 'Bornu State University, Maiduguri', countryId: 'nga', shortName: 'BOSU' },
  { id: 'maustech', name: 'Moshood Abiola University of Science and Technology Abeokuta', countryId: 'nga', shortName: 'MAUSTECH' },
  { id: 'gsust', name: 'Gombe State University of Science and Technology', countryId: 'nga', shortName: 'GSUST' },
  { id: 'zamsu', name: 'Zamfara State University', countryId: 'nga', shortName: 'ZAMSU' },
  { id: 'bmu', name: 'Bayelsa Medical University', countryId: 'nga', shortName: 'BMU' },
  { id: 'uaes', name: 'University of Agriculture and Environmental Sciences Umuagwo, Imo State', countryId: 'nga', shortName: 'UAES' },
  { id: 'custech', name: 'Confluence University of Science and Technology Osara, Kogi', countryId: 'nga', shortName: 'CUSTECH' },
  { id: 'unidel', name: 'University of Delta, Agbor', countryId: 'nga', shortName: 'UNIDEL' },
  { id: 'deltatech', name: 'Delta University of Science and Technology, Ozoro', countryId: 'nga', shortName: 'DELTATECH' },
  { id: 'dou', name: 'Dennis Osadebe University, Asaba', countryId: 'nga', shortName: 'DOU' },
  { id: 'bouesti', name: 'Bamidele Olumilua University of Science and Technology Ikere, Ekiti State', countryId: 'nga', shortName: 'BOUESTI' },
  { id: 'lasued', name: 'Lagos State University of Education, Ijanikin', countryId: 'nga', shortName: 'LASUED' },
  { id: 'lasustech', name: 'Lagos State University of Science and Technology Ikorodu', countryId: 'nga', shortName: 'LASUSTECH' },
  { id: 'shesue', name: 'Shehu Shagari University of Education, Sokoto', countryId: 'nga', shortName: 'SHESUE' },
  { id: 'sumas', name: 'State University of Medical and Applied Sciences, Igbo-Eno, Enugu', countryId: 'nga', shortName: 'SUMAS' },
  { id: 'unilesa', name: 'University of Ilesa, Osun State', countryId: 'nga', shortName: 'UNILESA' },
  { id: 'eaueo', name: 'Emanuel Alayande University of Education Oyo', countryId: 'nga', shortName: 'EAUEO' },
  { id: 'sarue', name: "Sa'adatu Rimi University of Education", countryId: 'nga', shortName: 'SARUE' },
  { id: 'ksuk', name: 'Kogi State University, Kabba', countryId: 'nga', shortName: 'KSUK' },
  { id: 'akum', name: 'AbdulKadir Kure University, Minna Niger State', countryId: 'nga', shortName: 'AKUM' },

  // === PRIVATE UNIVERSITIES IN NIGERIA ===
  { id: 'achievers', name: 'Achievers University, Owo', countryId: 'nga', shortName: 'ACHIEVERS' },
  { id: 'adeleke', name: 'Adeleke University, Ede', countryId: 'nga', shortName: 'ADELEKE' },
  { id: 'abuad', name: 'Afe Babalola University, Ado-Ekiti', countryId: 'nga', shortName: 'ABUAD' },
  { id: 'acu', name: 'Ajayi Crowther University, Ibadan', countryId: 'nga', shortName: 'ACU' },
  { id: 'alhikmah', name: 'Al-Hikmah University, Ilorin', countryId: 'nga', shortName: 'ALHIKMAH' },
  { id: 'alqalam', name: 'Al-Qalam University, Katsina', countryId: 'nga', shortName: 'ALQALAM' },
  { id: 'aun', name: 'American University of Nigeria, Yola', countryId: 'nga', shortName: 'AUN' },
  { id: 'augustine', name: 'Augustine University', countryId: 'nga', shortName: 'AUGUSTINE' },
  { id: 'babcock', name: 'Babcock University, Ilishan-Remo', countryId: 'nga', shortName: 'BABCOCK' },
  { id: 'baze', name: 'Baze University', countryId: 'nga', shortName: 'BAZE' },
  { id: 'bells', name: 'Bells University of Technology, Otta', countryId: 'nga', shortName: 'BELLS' },
  { id: 'biu', name: 'Benson Idahosa University, Benin City', countryId: 'nga', shortName: 'BIU' },
  { id: 'bingham', name: 'Bingham University, New Karu', countryId: 'nga', shortName: 'BINGHAM' },
  { id: 'bowen', name: 'Bowen University, Iwo', countryId: 'nga', shortName: 'BOWEN' },
  { id: 'caleb', name: 'Caleb University, Lagos', countryId: 'nga', shortName: 'CALEB' },
  { id: 'caritas', name: 'Caritas University, Enugu', countryId: 'nga', shortName: 'CARITAS' },
  { id: 'chrisland', name: 'Chrisland University', countryId: 'nga', shortName: 'CHRISLAND' },
  { id: 'covenant', name: 'Covenant University Ota', countryId: 'nga', shortName: 'COVENANT' },
  { id: 'crawford', name: 'Crawford University Igbesa', countryId: 'nga', shortName: 'CRAWFORD' },
  { id: 'crescent', name: 'Crescent University', countryId: 'nga', shortName: 'CRESCENT' },
  { id: 'ecu', name: 'Edwin Clark University, Kaigbodo', countryId: 'nga', shortName: 'ECU' },
  { id: 'elizade', name: 'Elizade University, Ilara-Mokin', countryId: 'nga', shortName: 'ELIZADE' },
  { id: 'evangel', name: 'Evangel University, Akaeze', countryId: 'nga', shortName: 'EVANGEL' },
  { id: 'fountain', name: 'Fountain University, Oshogbo', countryId: 'nga', shortName: 'FOUNTAIN' },
  { id: 'gouni', name: 'Godfrey Okoye University, Ugwuomu-Nike', countryId: 'nga', shortName: 'GOUNI' },
  { id: 'gregory', name: 'Gregory University, Uturu', countryId: 'nga', shortName: 'GREGORY' },
  { id: 'hallmark', name: 'Hallmark University, Ijebi Itele, Ogun', countryId: 'nga', shortName: 'HALLMARK' },
  { id: 'hezekiah', name: 'Hezekiah University, Umudi', countryId: 'nga', shortName: 'HEZEKIAH' },
  { id: 'igbinedion', name: 'Igbinedion University Okada', countryId: 'nga', shortName: 'IGBINEDION' },
  { id: 'jabu', name: 'Joseph Ayo Babalola University, Ikeji-Arakeji', countryId: 'nga', shortName: 'JABU' },
  { id: 'kingsuniv', name: 'Kings University, Ode Omu', countryId: 'nga', shortName: 'KINGSUNIV' },
  { id: 'kwararafa', name: 'Kwararafa University, Wukari', countryId: 'nga', shortName: 'KWARARAFA' },
  { id: 'landmark', name: 'Landmark University, Omu-Aran', countryId: 'nga', shortName: 'LANDMARK' },
  { id: 'lcu', name: 'Lead City University, Ibadan', countryId: 'nga', shortName: 'LCU' },
  { id: 'madonna', name: 'Madonna University, Okija', countryId: 'nga', shortName: 'MADONNA' },
  { id: 'mcpherson', name: 'Mcpherson University, Seriki Sotayo, Ajebo', countryId: 'nga', shortName: 'MCPHERSON' },
  { id: 'mciu', name: 'Micheal & Cecilia Ibru University', countryId: 'nga', shortName: 'MCIU' },
  { id: 'mtu', name: 'Mountain Top University', countryId: 'nga', shortName: 'MTU' },
  { id: 'nileuniv', name: 'Nile University of Nigeria, Abuja', countryId: 'nga', shortName: 'NILEUNIV' },
  { id: 'novena', name: 'Novena University, Ogume', countryId: 'nga', shortName: 'NOVENA' },
  { id: 'obong', name: 'Obong University, Obong Ntak', countryId: 'nga', shortName: 'OBONG' },
  { id: 'oduduwa', name: 'Oduduwa University, Ipetumodu', countryId: 'nga', shortName: 'ODUDUWA' },
  { id: 'pau-lagos', name: 'Pan-Atlantic University, Lagos', countryId: 'nga', shortName: 'PAU' },
  { id: 'pauluniv', name: 'Paul University, Awka', countryId: 'nga', shortName: 'PAULUNIV' },
  { id: 'run', name: "Redeemer's University, Ede", countryId: 'nga', shortName: 'RUN' },
  { id: 'renaissance', name: 'Renaissance University, Enugu', countryId: 'nga', shortName: 'RENAISSANCE' },
  { id: 'rhema', name: 'Rhema University, Obeama-Asa', countryId: 'nga', shortName: 'RHEMA' },
  { id: 'ritman', name: 'Ritman University, Ikot Ekpene, Akwa Ibom', countryId: 'nga', shortName: 'RITMAN' },
  { id: 'salemuniv', name: 'Salem University, Lokoja', countryId: 'nga', shortName: 'SALEMUNIV' },
  { id: 'gvu', name: 'Glorious Vision University, Ogwa, Edo State', countryId: 'nga', shortName: 'GVU' },
  { id: 'southwestern', name: 'Southwestern University, Oku Owa', countryId: 'nga', shortName: 'SOUTHWESTERN' },
  { id: 'summit', name: 'Summit University, Offa', countryId: 'nga', shortName: 'SUMMIT' },
  { id: 'tansian', name: 'Tansian University, Umunya', countryId: 'nga', shortName: 'TANSIAN' },
  { id: 'unimkar', name: 'University of Mkar, Mkar', countryId: 'nga', shortName: 'UNIMKAR' },
  { id: 'veritas', name: 'Veritas University, Abuja', countryId: 'nga', shortName: 'VERITAS' },
  { id: 'wellspring', name: 'Wellspring University, Evbuobanosa', countryId: 'nga', shortName: 'WELLSPRING' },
  { id: 'wesley', name: 'Wesley University Ondo', countryId: 'nga', shortName: 'WESLEY' },
  { id: 'wdu', name: 'Western Delta University, Oghara Delta State', countryId: 'nga', shortName: 'WDU' },
  { id: 'christopher', name: 'Christopher University Mowe', countryId: 'nga', shortName: 'CHRISTOPHER' },
  { id: 'kdu', name: 'Kola Daisi University Ibadan, Oyo State', countryId: 'nga', shortName: 'KDU' },
  { id: 'anchor', name: 'Anchor University Ayobo Lagos State', countryId: 'nga', shortName: 'ANCHOR' },
  { id: 'dominican', name: 'Dominican University Ibadan Oyo State', countryId: 'nga', shortName: 'DOMINICAN' },
  { id: 'legacy', name: 'Legacy University, Okija Anambra State', countryId: 'nga', shortName: 'LEGACY' },
  { id: 'aju', name: 'Arthur Javis University Akpoyubo Cross river State', countryId: 'nga', shortName: 'AJU' },
  { id: 'ojaja', name: 'Ojaja University Eiyenkorin, Kwara State', countryId: 'nga', shortName: 'OJAJA' },
  { id: 'ccu', name: 'Coal City University Enugu State', countryId: 'nga', shortName: 'CCU' },
  { id: 'clifford', name: 'Clifford University Owerrinta Abia State', countryId: 'nga', shortName: 'CLIFFORD' },
  { id: 'spiritan', name: 'Spiritan University, Nneochi Abia State', countryId: 'nga', shortName: 'SPIRITAN' },
  { id: 'precious', name: 'Precious Cornerstone University, Oyo', countryId: 'nga', shortName: 'PRECIOUS' },
  { id: 'pums', name: 'PAMO University of Medical Sciences, Portharcourt', countryId: 'nga', shortName: 'PUMS' },
  { id: 'atibauniv', name: 'Atiba University Oyo', countryId: 'nga', shortName: 'ATIBAUNIV' },
  { id: 'ekounimed', name: 'Eko University of Medical and Health Sciences Ijanikin, Lagos', countryId: 'nga', shortName: 'EKOUNIMED' },
  { id: 'skyline', name: 'Skyline University, Kano', countryId: 'nga', shortName: 'SKYLINE' },
  { id: 'greenfield', name: 'Greenfield University, Kaduna', countryId: 'nga', shortName: 'GREENFIELD' },
  { id: 'dominion', name: 'Dominion University Ibadan, Oyo State', countryId: 'nga', shortName: 'DOMINION' },
  { id: 'trinity', name: 'Trinity University Ogun State', countryId: 'nga', shortName: 'TRINITY' },
  { id: 'westland', name: 'Westland University Iwo, Osun State', countryId: 'nga', shortName: 'WESTLAND' },
  { id: 'topfaith', name: 'Topfaith University, Mkpatak, Akwa Ibom State', countryId: 'nga', shortName: 'TOPFAITH' },
  { id: 'tau', name: 'Thomas Adewumi University, Oko-Irese, Kwara State', countryId: 'nga', shortName: 'TAU' },
  { id: 'maranathan', name: 'Maranathan University, Mgbidi, Imo State', countryId: 'nga', shortName: 'MARANATHAN' },
  { id: 'avemaria', name: 'Ave Maria University, Piyanko, Nasarawa State', countryId: 'nga', shortName: 'AVEMARIA' },
  { id: 'alistiqama', name: 'Al-Istiqama University, Sumaila, Kano State', countryId: 'nga', shortName: 'ALISTIQAMA' },
  { id: 'mudiame', name: 'Mudiame University, Irrua, Edo State', countryId: 'nga', shortName: 'MUDIAME' },
  { id: 'havilla', name: 'Havilla University, Nde-Ikom, Cross River State', countryId: 'nga', shortName: 'HAVILLA' },
  { id: 'claretian', name: 'Claretian University of Nigeria, Nekede, Imo State', countryId: 'nga', shortName: 'CLARETIAN' },
  { id: 'nokuniv', name: 'NOK University, Kachia, Kaduna State', countryId: 'nga', shortName: 'NOKUNIV' },
  { id: 'karlkumm', name: 'Karl-Kumm University, Vom, Plateau State', countryId: 'nga', shortName: 'KARLKUMM' },
  { id: 'jhu', name: 'James Hope University, Lagos, Lagos State', countryId: 'nga', shortName: 'JHU' },
  { id: 'maaun', name: 'Maryam Abacha American University of Nigeria, Kano State', countryId: 'nga', shortName: 'MAAUN' },
  { id: 'capitalcity', name: 'Capital City University, Kano State', countryId: 'nga', shortName: 'CAPITALCITY' },
  { id: 'apu', name: 'Ahman Pategi University, Kwara State', countryId: 'nga', shortName: 'APU' },
  { id: 'unioffa', name: 'University of Offa, Kwara State', countryId: 'nga', shortName: 'UNIOFFA' },
  { id: 'mewar', name: 'Mewar International University, Masaka, Nasarawa State', countryId: 'nga', shortName: 'MEWAR' },
  { id: 'edusoko', name: 'Edusoko University, Bida, Niger State', countryId: 'nga', shortName: 'EDUSOKO' },
  { id: 'philomath', name: 'Philomath University, Kuje, Abuja', countryId: 'nga', shortName: 'PHILOMATH' },
  { id: 'khadija', name: 'Khadija University, Majia, Jigawa State', countryId: 'nga', shortName: 'KHADIJA' },
  { id: 'anan', name: 'Anan University, Kwall, Plateau State', countryId: 'nga', shortName: 'ANAN' },
  { id: 'neu', name: 'North Eastern University, Gombe', countryId: 'nga', shortName: 'NEU' },
  { id: 'alansar', name: 'Al-Ansar University, Maiduguri, Borno', countryId: 'nga', shortName: 'ALANSAR' },
  { id: 'mlu', name: 'Margaret Lawrence University, Umunede, Delta State', countryId: 'nga', shortName: 'MLU' },
  { id: 'kiru', name: 'Khalifa Isiyaku Rabiu University, Kano', countryId: 'nga', shortName: 'KIRU' },
  { id: 'sportsuni', name: 'Sports University, Idumuje, Ugboko, Delta State', countryId: 'nga', shortName: 'SPORTSUNI' },
  { id: 'babaahmed', name: 'Baba Ahmed University, Kano State', countryId: 'nga', shortName: 'BABAAHMED' },
  { id: 'saisa', name: 'Saisa University of Medical Sciences and Technology, Sokoto State', countryId: 'nga', shortName: 'SAISA' },
  { id: 'nbu', name: 'Nigerian British University, Asa, Abia State', countryId: 'nga', shortName: 'NBU' },
  { id: 'peteruniv', name: 'Peter University, Achina-Onneh Anambra State', countryId: 'nga', shortName: 'PETERUNIV' },
  { id: 'newgate', name: 'Newgate University, Minna, Niger State', countryId: 'nga', shortName: 'NEWGATE' },
  { id: 'eun', name: 'European University of Nigeria, Duboyi, FCT', countryId: 'nga', shortName: 'EUN' },
  { id: 'nwu', name: 'NorthWest University Sokoto State', countryId: 'nga', shortName: 'NWU' },
  { id: 'rayhaan', name: 'Rayhaan University, Kebbi', countryId: 'nga', shortName: 'RAYHAAN' },
  { id: 'mku', name: 'Muhammad Kamalud University Kwara', countryId: 'nga', shortName: 'MKU' },
  { id: 'sammaris', name: 'Sam Maris University, Ondo', countryId: 'nga', shortName: 'SAMMARIS' },
  { id: 'aletheia', name: 'Aletheia University, Ago-Iwoye Ogun State', countryId: 'nga', shortName: 'ALETHEIA' },
  { id: 'luxmundi', name: 'Lux Mundi University Umuahia, Abia State', countryId: 'nga', shortName: 'LUXMUNDI' },
  { id: 'maduka', name: 'Maduka University, Ekwegbe, Enugu State', countryId: 'nga', shortName: 'MADUKA' },
  { id: 'peaceland', name: 'PeaceLand University, Enugu State', countryId: 'nga', shortName: 'PEACELAND' },
  { id: 'amadeus', name: 'Amadeus University, Amizi, Abia State', countryId: 'nga', shortName: 'AMADEUS' },
  { id: 'visionuniv', name: 'Vision University, Ikogbo, Ogun State', countryId: 'nga', shortName: 'VISIONUNIV' },
  { id: 'azman', name: 'Azman University, Kano State', countryId: 'nga', shortName: 'AZMAN' },
  { id: 'huda', name: 'Huda University, Gusau, Zamafara State', countryId: 'nga', shortName: 'HUDA' },
  { id: 'francobritish', name: 'Franco British International University, Kaduna State', countryId: 'nga', shortName: 'FRANCOBRITISH' },
  { id: 'cun', name: 'Canadian University of Nigeria, Abuja', countryId: 'nga', shortName: 'CUN' },
  { id: 'gerar', name: 'Gerar University of Medical Science Imope Ijebu, Ogun State', countryId: 'nga', shortName: 'GERAR' },
  { id: 'britishcan', name: 'British Canadian University, Obufu Cross River State', countryId: 'nga', shortName: 'BRITISHCAN' },
  { id: 'hensard', name: 'Hensard University, Toru-Orua, Sagbama, Bayelsa State', countryId: 'nga', shortName: 'HENSARD' },
  { id: 'amaj', name: 'Amaj University, Kwali, Abuja', countryId: 'nga', shortName: 'AMAJ' },
  { id: 'phoenix', name: 'Phoenix University, Agwada, Nasarawa State', countryId: 'nga', shortName: 'PHOENIX' },
  { id: 'wigwe', name: 'Wigwe University, Isiokpo Rivers State', countryId: 'nga', shortName: 'WIGWE' },
  { id: 'hillside', name: 'Hillside University of Science and Technology, Okemisi, Ekiti State', countryId: 'nga', shortName: 'HILLSIDE' },
  { id: 'uniniger', name: 'University on the Niger, Umunya, Anambra state', countryId: 'nga', shortName: 'UNINIGER' },
  { id: 'elrazi', name: 'Elrazi Medical University Yargaya University, Kano State', countryId: 'nga', shortName: 'ELRAZI' },
  { id: 'venite', name: 'Venite University, Iloro-Ekiti, Ekiti State', countryId: 'nga', shortName: 'VENITE' },
  { id: 'shanahan', name: 'Shanahan University Onitsha, Anambra State', countryId: 'nga', shortName: 'SHANAHAN' },
  { id: 'duke', name: 'The Duke Medical University, Calabar, Cross River State', countryId: 'nga', shortName: 'DUKE' },
  { id: 'mercy', name: 'Mercy Medical University, Iwo, Ogun State', countryId: 'nga', shortName: 'MERCY' },
  { id: 'cosmopolitan', name: 'Cosmopolitan University Abuja', countryId: 'nga', shortName: 'COSMOPOLITAN' },
  { id: 'miva', name: 'Miva Open University, Abuja FCT', countryId: 'nga', shortName: 'MIVA' },
  { id: 'iconic', name: 'Iconic Open University, Sokoto State', countryId: 'nga', shortName: 'ICONIC' },
  { id: 'westmidlands', name: 'West Midlands Open University, Ibadan, Oyo State', countryId: 'nga', shortName: 'WESTMIDLANDS' },
  { id: 'almuhibbah', name: 'Al-Muhibbah Open University, Abuja', countryId: 'nga', shortName: 'ALMUHIBBAH' },
  { id: 'elamin', name: 'El-Amin University, Minna, Niger State', countryId: 'nga', shortName: 'ELAMIN' },
  { id: 'cpes', name: 'College of Petroleum and Energy Studies, Kaduna State', countryId: 'nga', shortName: 'CPES' },
  { id: 'jeweluniv', name: 'Jewel University, Gombe state', countryId: 'nga', shortName: 'JEWELUNIV' },
  { id: 'primeuniv', name: 'Prime University, Kuje, FCT Abuja', countryId: 'nga', shortName: 'PRIMEUNIV' },
  { id: 'nutm', name: 'Nigerian University of Technology and Management, Apapa, Lagos State', countryId: 'nga', shortName: 'NUTM' },
  { id: 'albayan', name: 'Al-Bayan University, Ankpa, Kogi State', countryId: 'nga', shortName: 'ALBAYAN' },
  { id: 'lighthouse', name: 'Lighthouse University, Evbobanosa, Edo State', countryId: 'nga', shortName: 'LIGHTHOUSE' },
  { id: 'aue', name: 'African University of Economics, FCT, Abuja', countryId: 'nga', shortName: 'AUE' },

  // === OTHER AFRICAN COUNTRIES ===
  // Kenya
  { id: 'uon', name: 'University of Nairobi', countryId: 'ken', shortName: 'UoN' },
  { id: 'ku', name: 'Kenyatta University', countryId: 'ken', shortName: 'KU' },
  
  // South Africa
  { id: 'uct', name: 'University of Cape Town', countryId: 'zaf', shortName: 'UCT' },
  { id: 'wits', name: 'University of the Witwatersrand', countryId: 'zaf', shortName: 'Wits' },
  
  // Egypt
  { id: 'cu', name: 'Cairo University', countryId: 'egy', shortName: 'CU' },
  { id: 'auc', name: 'American University in Cairo', countryId: 'egy', shortName: 'AUC' },
  
  // Ghana
  { id: 'ug', name: 'University of Ghana', countryId: 'gha', shortName: 'UG' },
  
  // Ethiopia
  { id: 'aau-eth', name: 'Addis Ababa University', countryId: 'eth', shortName: 'AAU' },
  
  // Uganda
  { id: 'mak', name: 'Makerere University', countryId: 'uga', shortName: 'MAK' },
  
  // Tanzania
  { id: 'udsm', name: 'University of Dar es Salaam', countryId: 'tza', shortName: 'UDSM' },
];

// Grading Scales
export const GRADING_SCALES: GradingScale[] = [
  // Nigeria - 5.0 scale (Standard for most Nigerian Universities)
  {
    id: 'nga-5point',
    universityId: 'ui',
    name: 'Nigerian 5-Point GPA Scale',
    type: 'numeric',
    minValue: 0,
    maxValue: 5.0,
    passingGrade: 2.0,
    programYears: 4,
    totalSemesters: 8,
    items: [
      { grade: 'A', minScore: 4.5, maxScore: 5.0, description: 'First Class Honours' },
      { grade: 'B', minScore: 3.5, maxScore: 4.49, description: 'Second Class Honours (Upper)' },
      { grade: 'C', minScore: 2.5, maxScore: 3.49, description: 'Second Class Honours (Lower)' },
      { grade: 'D', minScore: 2.0, maxScore: 2.49, description: 'Third Class Honours' },
      { grade: 'E', minScore: 1.0, maxScore: 1.99, description: 'Pass' },
      { grade: 'F', minScore: 0, maxScore: 0.99, description: 'Fail' },
    ],
  },
  
  // Kenya - 4.0 scale
  {
    id: 'ken-4point',
    universityId: 'uon',
    name: 'Kenyan University GPA Scale',
    type: 'numeric',
    minValue: 0,
    maxValue: 4.0,
    passingGrade: 1.0,
    programYears: 4,
    totalSemesters: 8,
    items: [
      { grade: 'A', minScore: 3.7, maxScore: 4.0, description: 'First Class Honours' },
      { grade: 'A-', minScore: 3.3, maxScore: 3.69, description: 'First Class Honours' },
      { grade: 'B+', minScore: 3.0, maxScore: 3.29, description: 'Upper Second Class' },
      { grade: 'B', minScore: 2.7, maxScore: 2.99, description: 'Upper Second Class' },
      { grade: 'B-', minScore: 2.3, maxScore: 2.69, description: 'Lower Second Class' },
      { grade: 'C+', minScore: 2.0, maxScore: 2.29, description: 'Lower Second Class' },
      { grade: 'C', minScore: 1.7, maxScore: 1.99, description: 'Pass' },
      { grade: 'C-', minScore: 1.3, maxScore: 1.69, description: 'Pass' },
      { grade: 'D+', minScore: 1.0, maxScore: 1.29, description: 'Pass' },
      { grade: 'D', minScore: 0.7, maxScore: 0.99, description: 'Fail' },
      { grade: 'E', minScore: 0, maxScore: 0.69, description: 'Fail' },
    ],
  },
  
  // South Africa - Percentage scale
  {
    id: 'zaf-percentage',
    universityId: 'uct',
    name: 'South African Percentage Scale',
    type: 'percentage',
    minValue: 0,
    maxValue: 100,
    passingGrade: 50,
    programYears: 3,
    totalSemesters: 6,
    items: [
      { grade: '75+', minScore: 75, maxScore: 100, description: 'First Class' },
      { grade: '70-74', minScore: 70, maxScore: 74, description: 'Upper Second Class' },
      { grade: '60-69', minScore: 60, maxScore: 69, description: 'Lower Second Class' },
      { grade: '50-59', minScore: 50, maxScore: 59, description: 'Pass' },
      { grade: '0-49', minScore: 0, maxScore: 49, description: 'Fail' },
    ],
  },
  
  // Egypt - Letter grade system
  {
    id: 'egy-letter',
    universityId: 'cu',
    name: 'Egyptian University Letter Grade System',
    type: 'letter',
    minValue: 0,
    maxValue: 100,
    passingGrade: 60,
    programYears: 4,
    totalSemesters: 8,
    items: [
      { grade: 'A+', minScore: 95, maxScore: 100, description: 'Excellent' },
      { grade: 'A', minScore: 90, maxScore: 94, description: 'Excellent' },
      { grade: 'B+', minScore: 85, maxScore: 89, description: 'Very Good' },
      { grade: 'B', minScore: 80, maxScore: 84, description: 'Very Good' },
      { grade: 'C+', minScore: 75, maxScore: 79, description: 'Good' },
      { grade: 'C', minScore: 70, maxScore: 74, description: 'Good' },
      { grade: 'D+', minScore: 65, maxScore: 69, description: 'Pass' },
      { grade: 'D', minScore: 60, maxScore: 64, description: 'Pass' },
      { grade: 'F', minScore: 0, maxScore: 59, description: 'Fail' },
    ],
  },
  
  // Ghana - Letter grade system
  {
    id: 'gha-letter',
    universityId: 'ug',
    name: 'Ghanaian University Grading System',
    type: 'letter',
    minValue: 0,
    maxValue: 100,
    passingGrade: 50,
    programYears: 4,
    totalSemesters: 8,
    items: [
      { grade: 'A', minScore: 80, maxScore: 100, description: 'First Class' },
      { grade: 'B+', minScore: 70, maxScore: 79, description: 'Second Class Upper' },
      { grade: 'B', minScore: 60, maxScore: 69, description: 'Second Class Lower' },
      { grade: 'C+', minScore: 55, maxScore: 59, description: 'Third Class' },
      { grade: 'C', minScore: 50, maxScore: 54, description: 'Pass' },
      { grade: 'D', minScore: 45, maxScore: 49, description: 'Fail' },
      { grade: 'E', minScore: 0, maxScore: 44, description: 'Fail' },
    ],
  },
];

// Utility functions to get data
export const getCountries = () => COUNTRIES;

export const getUniversitiesByCountry = (countryId: string) => 
  UNIVERSITIES.filter(uni => uni.countryId === countryId);

export const getGradingScaleByUniversity = (universityId: string) => {
  // First try to find a specific scale for the university
  const specificScale = GRADING_SCALES.find(scale => scale.universityId === universityId);
  if (specificScale) return specificScale;
  
  // Fall back to Nigerian 5.0 scale for Nigerian universities without specific scales
  const university = getUniversityById(universityId);
  if (university?.countryId === 'nga') {
    return GRADING_SCALES.find(scale => scale.id === 'nga-5point');
  }
  
  return undefined;
};

export const getCountryById = (id: string) => 
  COUNTRIES.find(country => country.id === id);

export const getUniversityById = (id: string) => 
  UNIVERSITIES.find(uni => uni.id === id);
