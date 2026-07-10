// Common Kiswahili vocabulary used to spot Kiswahili words inside lesson content
export const SWAHILI_WORDS = new Set([
  // Greetings & pleasantries
  'habari', 'jambo', 'hujambo', 'sijambo', 'karibu', 'karibuni', 'asante', 'tafadhali',
  'samahani', 'pole', 'poleni', 'kwaheri', 'kwaherini', 'njema', 'mzuri', 'sawa', 'salama',
  'hodi', 'hongera', 'shikamoo', 'marahaba', 'salamu', 'mgeni', 'wageni', 'usiku mwema',
  'lala salama', 'safiri salama', 'karibu tena', 'poa', 'vizuri', 'freshi', 'fiti',

  // Small talk / responses
  'ndiyo', 'hapana', 'sana', 'basi', 'labda', 'hapa', 'pale', 'huko', 'kule', 'tu',
  'kwa hakika', 'bila shaka', 'kwa kweli', 'inawezekana', 'haiwezekani', 'sivyo',
  'kweli', 'uongo', 'sahihi', 'makosa',

  // Time of day / time words
  'asubuhi', 'mchana', 'jioni', 'usiku', 'leo', 'kesho', 'jana', 'sasa', 'baadaye', 'mapema',
  'haraka', 'polepole', 'tena', 'kila', 'siku', 'wakati', 'saa', 'dakika', 'sekunde', 'wiki',
  'mwezi', 'mwaka', 'muda', 'zamani', 'karne', 'msimu', 'kesho kutwa', 'juzi', 'daima',
  'mara', 'mara kwa mara', 'mara moja', 'mapema sana', 'usiku wa manane',

  // Days
  'jumatatu', 'jumanne', 'jumatano', 'alhamisi', 'ijumaa', 'jumamosi', 'jumapili',

  // Months
  'januari', 'februari', 'machi', 'aprili', 'mei', 'juni', 'julai', 'agosti',
  'septemba', 'oktoba', 'novemba', 'desemba',

  // Pronouns & question words
  'mimi', 'wewe', 'yeye', 'sisi', 'ninyi', 'wao', 'huyu', 'hawa', 'hiki', 'hivi',
  'nani', 'nini', 'wapi', 'lini', 'ngapi', 'gani', 'jinsi', 'yangu', 'yako', 'yake',
  'yetu', 'yenu', 'yao', 'huu', 'hii', 'hilo', 'hizo', 'huko', 'wenyewe', 'mwenyewe',

  // Common verbs
  'kula', 'kunywa', 'kwenda', 'kuja', 'kusoma', 'kuandika', 'kuongea', 'kusema', 'kuuliza',
  'kujibu', 'kufanya', 'kuwa', 'kupenda', 'kutaka', 'kujua', 'kuelewa', 'kusikia', 'kuona',
  'kuangalia', 'kucheza', 'kulala', 'kuamka', 'kufika', 'kuondoka', 'kununua', 'kuuza',
  'kusaidia', 'kufundisha', 'kujifunza', 'kupika', 'kuoga', 'kusafiri', 'kuishi',
  'kufungua', 'kufunga', 'kuanza', 'kuisha', 'kumaliza', 'kukumbuka', 'kusahau',
  'kupika', 'kuosha', 'kusafisha', 'kuvaa', 'kuvua', 'kukaa', 'kusimama', 'kukimbia',
  'kutembea', 'kuruka', 'kuogelea', 'kuimba', 'kucheka', 'kulia', 'kuomba', 'kushukuru',
  'kuchagua', 'kupanga', 'kubadilisha', 'kutafuta', 'kupata', 'kupoteza', 'kuleta',
  'kupeleka', 'kutuma', 'kupokea', 'kulipa', 'kukopa', 'kuazima', 'kuzungumza',
  'nataka', 'napenda', 'ninajua', 'sijui', 'anasema', 'wanacheza', 'tunasoma', 'unafanya',

  // Numbers
  'moja', 'mbili', 'tatu', 'nne', 'tano', 'sita', 'saba', 'nane', 'tisa', 'kumi',
  'kumi na moja', 'ishirini', 'thelathini', 'arobaini', 'hamsini', 'sitini', 'sabini',
  'themanini', 'tisini', 'mia', 'elfu', 'milioni', 'bilioni', 'sufuri', 'nusu', 'robo',

  // Family & people
  'mama', 'baba', 'kaka', 'dada', 'mtoto', 'watoto', 'babu', 'bibi', 'mjomba', 'shangazi',
  'mke', 'mume', 'familia', 'ndugu', 'rafiki', 'bwana', 'binti', 'mvulana', 'msichana',
  'mzee', 'kijana', 'mgeni', 'jirani', 'mwanamke', 'mwanaume', 'watu', 'mtu',
  'mchumba', 'mpenzi', 'mjukuu', 'wazazi',

  // Food & drink
  'chakula', 'maji', 'chai', 'kahawa', 'mkate', 'wali', 'nyama', 'samaki', 'mboga',
  'matunda', 'ndizi', 'embe', 'chungwa', 'machungwa', 'sukari', 'chumvi', 'mafuta',
  'maziwa', 'yai', 'mayai', 'viazi', 'nazi', 'ugali', 'maharagwe', 'mchele', 'pilipili',
  'kitunguu', 'nyanya', 'tunda', 'kifungua kinywa', 'chakula cha mchana', 'chakula cha jioni',

  // Colors
  'nyeupe', 'nyeusi', 'nyekundu', 'kijani', 'njano', 'kahawia', 'rangi', 'bluu',
  'zambarau', 'kijivu', 'waridi', 'dhahabu', 'fedha',

  // Common nouns — places & objects
  'nyumba', 'shule', 'kazi', 'gari', 'barabara', 'mji', 'nchi', 'dunia', 'jua', 'nyota',
  'mvua', 'upepo', 'moto', 'ardhi', 'mlima', 'bahari', 'mto', 'msitu', 'mtu', 'watu',
  'mwalimu', 'mwanafunzi', 'kitabu', 'kalamu', 'meza', 'kiti', 'mlango', 'dirisha',
  'chumba', 'jiko', 'choo', 'duka', 'soko', 'hospitali', 'benki', 'ofisi', 'hoteli',
  'pesa', 'simu', 'kompyuta', 'lugha', 'neno', 'maneno', 'sentensi', 'darasa',
  'chuo', 'chuo kikuu', 'maktaba', 'uwanja', 'kanisa', 'msikiti', 'gereji', 'stesheni',
  'uwanja wa ndege', 'basi', 'treni', 'ndege', 'baiskeli', 'pikipiki', 'meli', 'boti',
  'mkoba', 'begi', 'fedha', 'sanduku', 'kikombe', 'sahani', 'kisu', 'uma', 'kijiko',
  'nguo', 'shati', 'suruali', 'kanzu', 'kofia', 'viatu', 'saa', 'miwani',

  // Body parts
  'kichwa', 'jicho', 'macho', 'sikio', 'masikio', 'pua', 'mdomo', 'jino', 'meno',
  'mkono', 'mikono', 'mguu', 'miguu', 'tumbo', 'moyo', 'ngozi', 'nywele',

  // Adjectives
  'kubwa', 'kidogo', 'ndogo', 'refu', 'fupi', 'zuri', 'mbaya', 'nzito', 'nyepesi',
  'baridi', 'safi', 'chafu', 'tajiri', 'maskini', 'mgonjwa', 'mzima', 'pya', 'chakavu',
  'rahisi', 'ngumu', 'karibu', 'mbali', 'juu', 'chini', 'wazi', 'giza', 'shupavu',
  'hodari', 'dhaifu', 'mrembo', 'mchafu', 'mgumu', 'laini',

  // Conjunctions & prepositions
  'na', 'au', 'lakini', 'kwa', 'katika', 'juu', 'chini', 'ndani', 'nje', 'mbele',
  'nyuma', 'kati', 'pamoja', 'bila', 'kwa sababu', 'ili', 'kama', 'kwa hiyo', 'ingawa',
  'hata', 'tangu', 'hadi', 'mpaka', 'baina',

  // Greetings-adjacent / misc common
  'kiswahili', 'swahili', 'harambee', 'uhuru', 'umoja', 'amani', 'upendo', 'furaha',
  'huzuni', 'hasira', 'woga', 'matumaini', 'ndoto', 'maisha', 'afya', 'elimu', 'utamaduni',
  'mila', 'desturi', 'sherehe', 'sikukuu', 'harusi', 'msiba',
])
