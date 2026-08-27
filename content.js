/* ============================================================
   Arabic Journey — Content Database (part 2)
   Vocabulary, phrases, grammar lessons.
   ============================================================ */

/* ---------- VOCABULARY ---------- */
const WORDS = [
  { cat:'Greetings', items:[
    { ar:'مَرْحَبا', tr:'marḥaban', en:'hello' },
    { ar:'السَّلامُ عَلَيْكُم', tr:'as-salāmu ʿalaykum', en:'peace be upon you (hello)' },
    { ar:'أَهْلاً وَسَهْلاً', tr:'ahlan wa sahlan', en:'welcome' },
    { ar:'مَعَ السَّلامة', tr:'maʿa as-salāma', en:'goodbye' },
    { ar:'شُكْراً', tr:'shukran', en:'thank you' },
    { ar:'مِنْ فَضْلِك', tr:'min faḍlik', en:'please' },
    { ar:'نَعَم', tr:'naʿam', en:'yes' },
    { ar:'لا', tr:'lā', en:'no' },
    { ar:'آسِف', tr:'āsif', en:'sorry' },
    { ar:'كَيْفَ حالُك؟', tr:'kayfa ḥāluk?', en:'how are you?' }
  ]},
  { cat:'Family & People', items:[
    { ar:'رَجُل', tr:'rajul', en:'man' },
    { ar:'امْرَأَة', tr:'imraʾa', en:'woman' },
    { ar:'وَلَد', tr:'walad', en:'boy' },
    { ar:'بِنْت', tr:'bint', en:'girl' },
    { ar:'أَب', tr:'ab', en:'father' },
    { ar:'أُمّ', tr:'umm', en:'mother' },
    { ar:'أَخ', tr:'akh', en:'brother' },
    { ar:'أُخْت', tr:'ukht', en:'sister' },
    { ar:'صَديق', tr:'ṣadīq', en:'friend' },
    { ar:'طِفْل', tr:'tifl', en:'child' }
  ]},
  { cat:'Food & Drink', items:[
    { ar:'ماء', tr:'māʾ', en:'water' },
    { ar:'خُبْز', tr:'khubz', en:'bread' },
    { ar:'لَبَن', tr:'laban', en:'milk' },
    { ar:'شاي', tr:'shāy', en:'tea' },
    { ar:'قَهْوة', tr:'qahwa', en:'coffee' },
    { ar:'تُفّاحة', tr:'tuffāḥa', en:'apple' },
    { ar:'أَرُزّ', tr:'arruzz', en:'rice' },
    { ar:'لَحْم', tr:'laḥm', en:'meat' },
    { ar:'سُكَّر', tr:'sukkar', en:'sugar' },
    { ar:'مِلْح', tr:'milḥ', en:'salt' }
  ]},
  { cat:'Animals', items:[
    { ar:'قِطّ', tr:'qiṭṭ', en:'cat' },
    { ar:'كَلْب', tr:'kalb', en:'dog' },
    { ar:'حِصان', tr:'ḥiṣān', en:'horse' },
    { ar:'جَمَل', tr:'jamal', en:'camel' },
    { ar:'أسَد', tr:'asad', en:'lion' },
    { ar:'طَيْر', tr:'ṭayr', en:'bird' },
    { ar:'سَمَكة', tr:'samaka', en:'fish' },
    { ar:'خَروْف', tr:'kharūf', en:'sheep' }
  ]},
  { cat:'Colors', items:[
    { ar:'أَحْمَر', tr:'aḥmar', en:'red' },
    { ar:'أَزْرَق', tr:'azraq', en:'blue' },
    { ar:'أَخْضَر', tr:'akhḍar', en:'green' },
    { ar:'أَصْفَر', tr:'aṣfar', en:'yellow' },
    { ar:'أسْوَد', tr:'aswad', en:'black' },
    { ar:'أَبْيَض', tr:'abyaḍ', en:'white' },
    { ar:'بُرْتُقالِيّ', tr:'burtuqālī', en:'orange' },
    { ar:'وَرْديّ', tr:'wardī', en:'pink' }
  ]},
  { cat:'Home & Objects', items:[
    { ar:'بَيْت', tr:'bayt', en:'house' },
    { ar:'باب', tr:'bāb', en:'door' },
    { ar:'شُبّاك', tr:'shubbāk', en:'window' },
    { ar:'كُرْسيّ', tr:'kursī', en:'chair' },
    { ar:'طاوِلة', tr:'ṭāwila', en:'table' },
    { ar:'سَرير', tr:'sarīr', en:'bed' },
    { ar:'مِفْتاح', tr:'miftāḥ', en:'key' },
    { ar:'كِتاب', tr:'kitāb', en:'book' },
    { ar:'قَلَم', tr:'qalam', en:'pen' },
    { ar:'هاتِف', tr:'hātif', en:'phone' }
  ]},
  { cat:'Nature & Weather', items:[
    { ar:'شَمْس', tr:'shams', en:'sun' },
    { ar:'قَمَر', tr:'qamar', en:'moon' },
    { ar:'نَجْمة', tr:'najma', en:'star' },
    { ar:'سَماء', tr:'samāʾ', en:'sky' },
    { ar:'بَحْر', tr:'baḥr', en:'sea' },
    { ar:'جَبَل', tr:'jabal', en:'mountain' },
    { ar:'شَجَرة', tr:'shajara', en:'tree' },
    { ar:'زَهْرة', tr:'zahra', en:'flower' },
    { ar:'مَطَر', tr:'maṭar', en:'rain' },
    { ar:'ريح', tr:'rīḥ', en:'wind' }
  ]},
  { cat:'Body', items:[
    { ar:'رَأْس', tr:'raʾs', en:'head' },
    { ar:'عَيْن', tr:'ʿayn', en:'eye' },
    { ar:'أُذُن', tr:'udhun', en:'ear' },
    { ar:'فَم', tr:'fam', en:'mouth' },
    { ar:'يَد', tr:'yad', en:'hand' },
    { ar:'قَدَم', tr:'qadam', en:'foot' },
    { ar:'قَلْب', tr:'qalb', en:'heart' },
    { ar:'وَجْه', tr:'wajh', en:'face' }
  ]},
  { cat:'Time', items:[
    { ar:'يَوْم', tr:'yawm', en:'day' },
    { ar:'لَيْل', tr:'layl', en:'night' },
    { ar:'صَباح', tr:'ṣabāḥ', en:'morning' },
    { ar:'مَساء', tr:'masāʾ', en:'evening' },
    { ar:'أُسْبوُع', tr:'usbuʿ', en:'week' },
    { ar:'شَهْر', tr:'shahr', en:'month' },
    { ar:'عام', tr:'ʿām', en:'year' },
    { ar:'ساعة', tr:'sāʿa', en:'hour / clock' },
    { ar:'اليَوْم', tr:'al-yawm', en:'today' }
  ]},
  { cat:'Places', items:[
    { ar:'مَدينة', tr:'madīna', en:'city' },
    { ar:'شارِع', tr:'shāriʿ', en:'street' },
    { ar:'مَدْرَسة', tr:'madrasa', en:'school' },
    { ar:'مُسْتَشْفى', tr:'mustashfā', en:'hospital' },
    { ar:'سوق', tr:'sūq', en:'market' },
    { ar:'مَسْجِد', tr:'masjid', en:'mosque' },
    { ar:'مَطْعَم', tr:'maṭʿam', en:'restaurant' },
    { ar:'مَطار', tr:'maṭār', en:'airport' }
  ]},
  { cat:'Verbs (he-form)', items:[
    { ar:'يَكْتُبُ', tr:'yaktubu', en:'he writes' },
    { ar:'يَقْرَأُ', tr:'yaqraʾu', en:'he reads' },
    { ar:'يَأْكُلُ', tr:'yaʾkulu', en:'he eats' },
    { ar:'يَشْرَبُ', tr:'yashrabu', en:'he drinks' },
    { ar:'يَذْهَبُ', tr:'yadhhabu', en:'he goes' },
    { ar:'يَتَحَدَّثُ', tr:'yataḥaddathu', en:'he speaks' },
    { ar:'يَتَعَلَّمُ', tr:'yataʿallamu', en:'he learns' },
    { ar:'يُحِبُّ', tr:'yuḥibbu', en:'he loves' }
  ]},
  { cat:'Adjectives', items:[
    { ar:'كَبير', tr:'kabīr', en:'big' },
    { ar:'صَغير', tr:'ṣaghīr', en:'small' },
    { ar:'جَيِّد', tr:'jayyid', en:'good' },
    { ar:'سيّئ', tr:'sayyiʾ', en:'bad' },
    { ar:'جَميل', tr:'jamīl', en:'beautiful' },
    { ar:'جَديد', tr:'jadīd', en:'new' },
    { ar:'قَديم', tr:'qadīm', en:'old' },
    { ar:'سَعيد', tr:'saʿīd', en:'happy' },
    { ar:'حَزين', tr:'ḥazīn', en:'sad' }
  ]}
];

const WORD_TOTAL = WORDS.reduce((n,c)=> n + c.items.length, 0);

/* ---------- PHRASES ---------- */
const PHRASE_GROUPS = [
  { title:'Meeting someone', items:[
    { ar:'ما اسْمُك؟', tr:'mā ismuk?', en:"What is your name?" },
    { ar:'اسْمي حَمْزة', tr:'ismī Ḥamza', en:'My name is Hamza.' },
    { ar:'تَشَرَّفْتُ بِمَعْرِفَتِك', tr:'tasharraftu bi-maʿrifatik', en:'Nice to meet you.' },
    { ar:'مِنْ أَيْنَ أَنْتَ؟', tr:'min ayna anta?', en:'Where are you from?' },
    { ar:'أَنا مِنَ المَغْرِب', tr:'ana min al-Maghrib', en:'I am from Morocco.' }
  ]},
  { title:'Everyday kindness', items:[
    { ar:'أَنا بِخَيْر، الحَمْدُ لله', tr:'ana bikhayr, al-ḥamdulillāh', en:"I'm fine, praise be to God." },
    { ar:'نَهارُك سَعيد', tr:'nahāruk saʿīd', en:'Have a nice day.' },
    { ar:'عَفْواً', tr:'ʿafwan', en:'Excuse me / You are welcome.' },
    { ar:'لا أفْهَم', tr:'lā afham', en:"I don't understand." },
    { ar:'هَل يُمْكِنُك التَكْرار؟', tr:'hal yumkinuk at-takrār?', en:'Can you repeat that?' },
    { ar:'تَحَدَّثْ بِبُطءٍ مِنْ فَضْلِك', tr:'tahaddath bibuṭʾ min faḍlik', en:'Please speak slowly.' }
  ]},
  { title:'Out and about', items:[
    { ar:'بِكَم هذا؟', tr:'bikam hādhā?', en:'How much is this?' },
    { ar:'أَيْنَ المَحَطَّة؟', tr:'ayna al-maḥaṭṭa?', en:'Where is the station?' },
    { ar:'أُريدُ ماءً', tr:'urīdu māʾan', en:'I would like water.' },
    { ar:'الحِساب، لَوْ سَمَحْت', tr:'al-ḥisāb, law samaḥt', en:'The bill, please.' },
    { ar:'أَيْنَ الحَمّام؟', tr:'ayna al-ḥammām?', en:'Where is the bathroom?' }
  ]},
  { title:'Talking about learning', items:[
    { ar:'أَنا أَتَعَلَّمُ العَرَبِيَّة', tr:'ana ataʿallam al-ʿarabiyya', en:'I am learning Arabic.' },
    { ar:'ماذا يَعْني هذا؟', tr:'mādhā yaʿnī hādhā?', en:'What does this mean?' },
    { ar:'كَيْفَ أَقول هذا بِالعَرَبِيَّة؟', tr:'kayfa aqūlu hādhā bil-ʿarabiyya?', en:'How do I say this in Arabic?' },
    { ar:'العَرَبِيَّةُ لُغَةٌ جَميلة', tr:'al-ʿarabiyya lughatun jamīla', en:'Arabic is a beautiful language.' }
  ]}
];

const DIALOGUE = [
  { who:'A', ar:'السَّلامُ عَلَيْكُم!', tr:'As-salāmu ʿalaykum!', en:'Peace be upon you!' },
  { who:'B', ar:'وَعَلَيْكُمُ السَّلام! كَيْفَ حالُك؟', tr:'Wa ʿalaykum as-salām! Kayfa ḥāluk?', en:'And peace to you! How are you?' },
  { who:'A', ar:'أَنا بِخَيْر، الحَمْدُ لله. وما اسْمُك؟', tr:'Ana bikhayr, al-ḥamdulillāh. Wa mā ismuk?', en:"I'm well, thank God. And what's your name?" },
  { who:'B', ar:'اسْمي لَيْلى. تَشَرَّفْتُ بِمَعْرِفَتِك!', tr:'Ismī Laylā. Tasharraftu bi-maʿrifatik!', en:'My name is Layla. Delighted to meet you!' },
  { who:'A', ar:'وَأَنا أيضاً، يا لَيْلى!', tr:'Wa anā ayḍan, yā Laylā!', en:'Me too, Layla!' }
];
