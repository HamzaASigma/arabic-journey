/* ============================================================
   Arabic Journey — Content Database (part 1)
   Alphabet, vowels, numbers.
   ============================================================ */

const TATWEEL = '\u0640'; // ـ used to display connected letter forms

/* ---------- THE 28 LETTERS ----------
   joins: true  -> letter connects on both sides
          false -> letter connects only from the right
*/
const LETTERS = [
  { ch:'ا', name:'alif', sound:'aa', hint:'A long “aa” as in father. It also acts as the seat for hamza (أ إ ء).', ex:{ar:'أسد', tr:'asad', en:'lion'}, joins:false, note:'Never connects to the letter after it.' },
  { ch:'ب', name:'ba', sound:'b', hint:'“b” as in book.', ex:{ar:'باب', tr:'bāb', en:'door'}, joins:true },
  { ch:'ت', name:'ta', sound:'t', hint:'“t” as in tea.', ex:{ar:'تفاحة', tr:'tuffāḥa', en:'apple'}, joins:true },
  { ch:'ث', name:'tha', sound:'th', hint:'“th” as in think.', ex:{ar:'ثعلب', tr:'thaʿlab', en:'fox'}, joins:true },
  { ch:'ج', name:'jim', sound:'j', hint:'“j” as in jam. In Egypt it is pronounced “g” as in go.', ex:{ar:'جمل', tr:'jamal', en:'camel'}, joins:true },
  { ch:'ح', name:'ha', sound:'ḥ', hint:'A breathy H from deep in the throat — like gently fogging a mirror. Not the English h!', ex:{ar:'حصان', tr:'ḥiṣān', en:'horse'}, joins:true },
  { ch:'خ', name:'kha', sound:'kh', hint:'“kh” like Scottish loch or German Bach.', ex:{ar:'خبز', tr:'khubz', en:'bread'}, joins:true },
  { ch:'د', name:'dal', sound:'d', hint:'“d” as in door. Never connects to the letter after it.', ex:{ar:'دار', tr:'dār', en:'house'}, joins:false },
  { ch:'ذ', name:'dhal', sound:'dh', hint:'“dh” as in this / that.', ex:{ar:'ذهب', tr:'dhahab', en:'gold'}, joins:false },
  { ch:'ر', name:'ra', sound:'r', hint:'A lightly rolled r, like Spanish pero.', ex:{ar:'رمل', tr:'raml', en:'sand'}, joins:false },
  { ch:'ز', name:'zay', sound:'z', hint:'“z” as in zoo.', ex:{ar:'زيت', tr:'zayt', en:'oil'}, joins:false },
  { ch:'س', name:'sin', sound:'s', hint:'“s” as in sun.', ex:{ar:'سمك', tr:'samak', en:'fish'}, joins:true },
  { ch:'ش', name:'shin', sound:'sh', hint:'“sh” as in ship.', ex:{ar:'شمس', tr:'shams', en:'sun'}, joins:true },
  { ch:'ص', name:'sad', sound:'ṣ', hint:'An emphatic, heavy S — squeeze the back of your tongue up.', ex:{ar:'صباح', tr:'ṣabāḥ', en:'morning'}, joins:true },
  { ch:'ض', name:'dad', sound:'ḍ', hint:'The emphatic heavy D — Arabic is called “the language of ḍād”.', ex:{ar:'ضيف', tr:'ḍayf', en:'guest'}, joins:true },
  { ch:'ط', name:'ṭa', sound:'ṭ', hint:'An emphatic, heavy T with no puff of air.', ex:{ar:'طالب', tr:'ṭālib', en:'student'}, joins:true },
  { ch:'ظ', name:'ẓa', sound:'ẓ', hint:'An emphatic, heavy “dh” as in this.', ex:{ar:'ظل', tr:'ẓill', en:'shade'}, joins:true },
  { ch:'ع', name:'ʿayn', sound:'ʿ', hint:'A deep throaty sound made by tightening the throat around an “aa”. Unique to Arabic!', ex:{ar:'عين', tr:'ʿayn', en:'eye'}, joins:true },
  { ch:'غ', name:'ghayn', sound:'gh', hint:'Like a French R, or a soft gargling “g”.', ex:{ar:'غزال', tr:'ghazāl', en:'gazelle'}, joins:true },
  { ch:'ف', name:'fa', sound:'f', hint:'“f” as in fun.', ex:{ar:'فيل', tr:'fīl', en:'elephant'}, joins:true },
  { ch:'ق', name:'qaf', sound:'q', hint:'A deep K made at the very back of the mouth. Keep it separate from regular k!', ex:{ar:'قمر', tr:'qamar', en:'moon'}, joins:true },
  { ch:'ك', name:'kaf', sound:'k', hint:'“k” as in kite.', ex:{ar:'كتاب', tr:'kitāb', en:'book'}, joins:true },
  { ch:'ل', name:'lam', sound:'l', hint:'“l” as in lamp.', ex:{ar:'ليل', tr:'layl', en:'night'}, joins:true },
  { ch:'م', name:'mim', sound:'m', hint:'“m” as in moon.', ex:{ar:'مسجد', tr:'masjid', en:'mosque'}, joins:true },
  { ch:'ن', name:'nun', sound:'n', hint:'“n” as in noon.', ex:{ar:'نور', tr:'nūr', en:'light'}, joins:true },
  { ch:'ه', name:'ha', sound:'h', hint:'A light “h” as in hello (different from deep ḥā).', ex:{ar:'هدية', tr:'hadīya', en:'gift'}, joins:true },
  { ch:'و', name:'waw', sound:'w', hint:'“w” as in water. Also the long vowel “ū”. Never connects forward.', ex:{ar:'وردة', tr:'warda', en:'rose'}, joins:false, note:'Doubles as the long vowel ū.' },
  { ch:'ي', name:'ya', sound:'y', hint:'“y” as in yes. Also the long vowel “ī”.', ex:{ar:'يد', tr:'yad', en:'hand'}, joins:true, note:'Doubles as the long vowel ī.' }
];

/* Derive the four positional forms of each letter */
function formsOf(L){
  if (L.joins){
    return { iso:L.ch, fin:TATWEEL + L.ch, ini:L.ch + TATWEEL, med:TATWEEL + L.ch + TATWEEL };
  }
  return { iso:L.ch, fin:TATWEEL + L.ch, ini:L.ch, med:TATWEEL + L.ch };
}
LETTERS.forEach(L => L.forms = formsOf(L));

const SUN_LETTERS = ['ت','ث','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ل','ن'];
const MOON_LETTERS = ['ا','ب','ج','ح','خ','ع','غ','ف','ق','ك','م','ه','و','ي'];

/* ---------- HARAKAT & DIACRITICS ---------- */
const VOWELS = [
  { mark:'َ', name:'fatḥa', ar:'فَتْحَة', sound:'a', desc:'A tiny diagonal stroke above a letter: short “a” as in cat. Example: بَ reads “ba”.' },
  { mark:'ُ', name:'ḍamma', ar:'ضَمَّة', sound:'u', desc:'A tiny wāw-like loop above a letter: short “u” as in put. Example: بُ reads “bu”.' },
  { mark:'ِ', name:'kasra', ar:'كَسْرَة', sound:'i', desc:'A tiny diagonal stroke below a letter: short “i” as in sit. Example: بِ reads “bi”.' },
  { mark:'ْ', name:'sukūn', ar:'سُكُون', sound:'', desc:'A small circle above a letter meaning NO vowel follows. Example: بْ = plain b. Every letter must have a vowel or sukūn.' },
  { mark:'ّ', name:'shadda', ar:'شَدَّة', sound:'2x', desc:'Doubles the letter: hold it once closed, then pronounce it again. بَّ = bb. Example: مُدَرِّس mudarris “teacher”.' },
  { mark:'ً', name:'tanwīn fatḥ', ar:'تَنْوِين', sound:'an', desc:'Double fatḥa: adds “n” — the marker of INDEFINITE nouns. كتابٌ kitābun = “a book”. Here shown: ً = “an”.' },
  { mark:'ٌ', name:'tanwīn ḍamm', ar:'تَنْوِين', sound:'un', desc:'Double ḍamma on nouns: “-un”. بيتٌ baytun = “a house”.' },
  { mark:'ٍ', name:'tanwīn kasr', ar:'تَنْوِين', sound:'in', desc:'Double kasra under nouns: “-in”. كتابٍ kitābin = “of a book”.' }
];

const LONG_VOWELS = [
  { combo:'َ + ا', out:'ـَا', sound:'ā', desc:'fatḥa + alif = long “aa”, held twice as long. Example: بَاب bāb “door”.' },
  { combo:'ُ + و', out:'ـُو', sound:'ū', desc:'ḍamma + wāw = long “oo”. Example: نُور nūr “light”.' },
  { combo:'ِ + ي', out:'ـِي', sound:'ī', desc:'kasra + yāʾ = long “ee”. Example: كَبِير kabīr “big”.' }
];

/* ---------- NUMBERS ---------- */
const NUMBERS = [
  { v:0,    d:'٠', ar:'صِفْر',   tr:'ṣifr' },
  { v:1,    d:'١', ar:'واحِد',   tr:'wāḥid' },
  { v:2,    d:'٢', ar:'اثنان',   tr:'ithnān' },
  { v:3,    d:'٣', ar:'ثَلاثة',  tr:'thalātha' },
  { v:4,    d:'٤', ar:'أَرْبَعة', tr:'arbaʿa' },
  { v:5,    d:'٥', ar:'خَمْسة',  tr:'khamsa' },
  { v:6,    d:'٦', ar:'سِتّة',   tr:'sitta' },
  { v:7,    d:'٧', ar:'سَبعة',   tr:'sabʿa' },
  { v:8,    d:'٨', ar:'ثَمانية', tr:'thamāniya' },
  { v:9,    d:'٩', ar:'تِسعة',   tr:'tisʿa' },
  { v:10,   d:'١٠', ar:'عَشَرة', tr:'ʿashara' },
  { v:100,  d:'١٠٠', ar:'مِئة',  tr:'miʾa' },
  { v:1000, d:'١٠٠٠', ar:'أَلْف', tr:'alf' }
];
