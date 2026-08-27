/* ============================================================
   Arabic Journey — Content Database (part 3)
   Grammar lessons, from first steps to building sentences.
   ============================================================ */

const GRAMMAR = [
  {
    title:'1. How Arabic works — the big picture',
    body:`<p>Arabic is written <b>right to left</b>, has <b>28 letters</b>, and almost every word is built from a
    <b>3-letter root</b>. Short vowels are usually not written — fluent readers supply them from context.</p>
    <div class="callout">Strategy: master the alphabet and its sounds first (weeks 1–2). Everything else in Arabic stands on it.</div>`
  },
  {
    title:'2. The short vowels (harakat)',
    body:`<p>Three tiny marks carry the short vowels:</p>
    <table class="tbl"><tr><th>Mark</th><th>Name</th><th>Sound</th><th>Example</th></tr>
    <tr><td class="arabic">ـَ</td><td>fatḥa</td><td>a</td><td class="arabic">بَ</td></tr>
    <tr><td class="arabic">ـُ</td><td>ḍamma</td><td>u</td><td class="arabic">بُ</td></tr>
    <tr><td class="arabic">ـِ</td><td>kasra</td><td>i</td><td class="arabic">بِ</td></tr></table>
    <p>A letter with <span class="arabic">سُكُون</span> (<span class="arabic">ْ</span>) carries no vowel at all.
    In children's books and the Qur'an every letter is marked; in newspapers most marks are dropped.</p>`
  },
  {
    title:'3. The long vowels',
    body:`<p>Stretch a vowel by adding its "mirror" letter:</p>
    <ul>
      <li><span class="arabic">بَا</span> bā — fatḥa + alif → “aa”</li>
      <li><span class="arabic">بُو</span> bū — ḍamma + wāw → “oo”</li>
      <li><span class="arabic">بِي</span> bī — kasra + yāʾ → “ee”</li>
    </ul>
    <p>Length changes meaning: <span class="arabic">جَلَسَ</span> jalasa “he sat” vs <span class="arabic">جالَسَ</span> jālasa “he sat with someone”.</p>`
  },
  {
    title:'4. Tanween — the mark of “a/an”',
    body:`<p>Arabic has no word for “a”. Instead, indefinite nouns end in a doubled vowel (tanwīn):</p>
    <table class="tbl"><tr><th>Arabic</th><th>Reads</th><th>Meaning</th></tr>
    <tr><td class="arabic">بَيْتٌ</td><td>baytun</td><td>a house</td></tr>
    <tr><td class="arabic">كِتابٌ</td><td>kitābun</td><td>a book</td></tr>
    <tr><td class="arabic">شُكْراً</td><td>shukran</td><td>a thanks → thank you</td></tr></table>`
  },
  {
    title:'5. Shadda — doubling a letter',
    body:`<p>The small “w” above a letter (<span class="arabic">ّ</span>) means: pronounce this letter twice.
    The previous vowel closes onto the doubled letter, then it opens again.</p>
    <ul>
      <li><span class="arabic">مُدَرِّس</span> mudarris — teacher</li>
      <li><span class="arabic">مَدْرَسة</span> madrasa — school</li>
    </ul>`
  },
  {
    title:'6. Sun & moon letters — how ال really sounds',
    body:`<p>The prefix <span class="arabic">ال</span> al- means “the”. With <b>moon letters</b> you hear both sounds:
    <span class="arabic">القَمَر</span> al-qamar “the moon”. With <b>sun letters</b> the l melts into the next letter,
    which doubles instead: <span class="arabic">الشَّمْس</span> ash-shams “the sun” (never al-shams).</p>
    <p><b>Sun:</b> <span class="arabic">ت ث د ذ ر ز س ش ص ض ط ظ ل ن</span><br>
       <b>Moon:</b> <span class="arabic">ا ب ج ح خ ع غ ف ق ك م ه و ي</span></p>`
  },
  {
    title:'7. Gender — masculine & feminine',
    body:`<p>Every noun is masculine or feminine. Most feminine nouns end in <span class="arabic">ة</span>:</p>
    <ul>
      <li><span class="arabic">كِتاب</span> kitāb — book (m.) / <span class="arabic">سيّارة</span> sayyāra — car (f.)</li>
      <li>Adjectives must agree: <span class="arabic">كِتابٌ جَديد</span> kitāb jadīd “a new book” ·
      <span class="arabic">سيّارةٌ جَديدة</span> sayyāratun jadīda “a new car”.</li>
    </ul>`
  },
  {
    title:'8. Pronouns',
    body:`<table class="tbl"><tr><th>Arabic</th><th>Sounds</th><th>Meaning</th></tr>
    <tr><td class="arabic">أَنا</td><td>anā</td><td>I</td></tr>
    <tr><td class="arabic">أَنْتَ</td><td>anta</td><td>you (m.)</td></tr>
    <tr><td class="arabic">أَنْتِ</td><td>anti</td><td>you (f.)</td></tr>
    <tr><td class="arabic">هوَ</td><td>huwa</td><td>he</td></tr>
    <tr><td class="arabic">هيَ</td><td>hiya</td><td>she</td></tr>
    <tr><td class="arabic">نَحْنُ</td><td>naḥnu</td><td>we</td></tr>
    <tr><td class="arabic">أَنْتُم</td><td>antum</td><td>you (pl)</td></tr>
    <tr><td class="arabic">هُم</td><td>hum</td><td>they</td></tr></table>`
  },
  {
    title:'9. Your first sentences — no verb needed!',
    body:`<p>Arabic drops “is/are” in the present. Just put noun + adjective, or pronoun + noun:</p>
    <ul>
      <li><span class="arabic">البَيْتُ كَبيرٌ</span> al-baytu kabīrun — The house is big.</li>
      <li><span class="arabic">أَنا طالِبٌ</span> ana ṭālibun — I am a student.</li>
      <li>Negative: <span class="arabic">البَيْتُ لَيْسَ كبيراً</span> — The house is not big.</li>
    </ul>`
  },
  {
    title:'10. Possession — iḍāfa & suffixes',
    body:`<p>To say “X of Y”, glue two nouns together; the second takes kasra:</p>
    <ul>
      <li><span class="arabic">بابُ البَيْتِ</span> bāb al-bayt — the door of the house</li>
      <li>Add a suffix for “my, your, his”: <span class="arabic">كِتابي</span> kitābī my book ·
      <span class="arabic">بيتُك</span> baytuk your house · <span class="arabic">كِتابُه</span> kitābuhu his book.</li>
    </ul>`
  },
  {
    title:'11. Past-tense verbs',
    body:`<p>Past verbs conjugate with suffixes on the 3-letter root. Take ك-ت-ب (writing):</p>
    <table class="tbl"><tr><th>Arabic</th><th>Sounds</th><th>Meaning</th></tr>
    <tr><td class="arabic">كَتَبَ</td><td>kataba</td><td>he wrote</td></tr>
    <tr><td class="arabic">كَتَبَتْ</td><td>katabat</td><td>she wrote</td></tr>
    <tr><td class="arabic">كَتَبْتُ</td><td>katabtu</td><td>I wrote</td></tr>
    <tr><td class="arabic">كَتَبْتَ</td><td>katabta</td><td>you wrote</td></tr>
    <tr><td class="arabic">كَتَبْنا</td><td>katabnā</td><td>we wrote</td></tr></table>`
  },
  {
    title:'12. Present-tense verbs',
    body:`<p>Present verbs add prefixes (and sometimes endings):</p>
    <table class="tbl"><tr><th>Arabic</th><th>Sounds</th><th>Meaning</th></tr>
    <tr><td class="arabic">أَكْتُبُ</td><td>aktubu</td><td>I write</td></tr>
    <tr><td class="arabic">تَكْتُبُ</td><td>taktubu</td><td>you write</td></tr>
    <tr><td class="arabic">يَكْتُبُ</td><td>yaktubu</td><td>he writes</td></tr>
    <tr><td class="arabic">نَكْتُبُ</td><td>naktubu</td><td>we write</td></tr></table>
    <p>Notice the pattern a- / ta- / ya- / na- before the same three root letters.</p>`
  },
  {
    title:'13. The root system — one root, many words',
    body:`<p>Almost all Arabic words grow from 3 root letters. Root <b>ك-ت-ب</b> (write):</p>
    <ul>
      <li><span class="arabic">كِتاب</span> kitāb — book</li>
      <li><span class="arabic">كاتِب</span> kātib — writer</li>
      <li><span class="arabic">مَكْتَب</span> maktab — office / desk</li>
      <li><span class="arabic">مَكْتَبة</span> maktaba — library</li>
      <li><span class="arabic">مَكْتوب</span> maktūb — written / destiny</li>
    </ul>
    <p>Learn roots and patterns (not single words) and your vocabulary multiplies itself.</p>`
  },
  {
    title:'14. Numbers & plurals — a friendly warning',
    body:`<p>Plurals are often “broken” (irregular): <span class="arabic">كِتاب</span> →
    <span class="arabic">كُتُب</span> kutub “books”, <span class="arabic">وَلَد</span> →
    <span class="arabic">أَوْلاد</span> awlād “boys”. Learn each plural with its word, like English “child/children”.
    Bonus oddity: numbers take the opposite gender of what they count.</p>`
  },
  {
    title:'15. Your roadmap to fluency',
    body:`<ol>
      <li><b>Alphabet + sounds</b> — until reading feels automatic.</li>
      <li><b>300 core words</b> — drill the flashcards here daily.</li>
      <li><b>Sentence patterns</b> — lessons 9–12 give you 80% of everyday speech.</li>
      <li><b>Listening</b> — cartoons and slow news (e.g. children's shows) beat textbooks.</li>
      <li><b>Speaking from day one</b> — reuse the dialogue section out loud, shadow native audio.</li>
    </ol>
    <div class="callout">Consistency beats intensity: 15 focused minutes daily will get you conversational within months.</div>`
  }
];
