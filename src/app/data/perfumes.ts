const perfumes = [
  {
    id: "bleu-de-chanel",
    name: "Bleu de Chanel Parfum",
    persianName: "بلو شنل پارفوم",
    brand: "Chanel",
    image: "/images/perfumes/bleu-parfum.svg",
    gender: "آقایان",
    season: "چهار فصل؛ مناسب روز و شب",
    longevity: "★★★★☆",
    sillage: "★★★★☆",
    top: "پوست لیمو، ترنج، نعناع، درمنه",
    middle: "اسطوخودوس، آناناس، شمعدانی، نت‌های سبز",
    base: "چوب صندل، سدر، آمبرووود، دانه تونکا",
    description:
      "بلو شنل پارفوم تفسیری عمیق و چوبی از مجموعه بلو شنل است؛ با شروعی مرکباتی و گیاهی که به قلبی آروماتیک و پایه‌ای گرم از چوب صندل، سدر و دانه تونکا می‌رسد.",
    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "coco-mademoiselle",
    name: "Coco Mademoiselle Eau de Parfum",
    persianName: "کوکو مادمازل",
    brand: "Chanel",
    image: "/images/perfumes/coco-mademoiselle.svg",
    gender: "بانوان",
    season: "چهار فصل",
    longevity: "★★★★☆",
    sillage: "★★★★☆",
    top: "پرتقال، ترنج، گریپ‌فروت",
    middle: "رز، یاس، لیچی",
    base: "نعناع هندی، وتیور، مشک سفید، وانیل",
    description:
      "کوکو مادمازل ادو پرفیوم رایحه‌ای کهربایی و چوبی با طراوت مرکبات، قلب گلی رز و یاس و پایه‌ای گرم از نعناع هندی و وتیور دارد.",
    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "allure-homme-sport",
    name: "Allure Homme Sport Eau de Toilette",
    persianName: "آلوره هوم اسپرت",
    brand: "Chanel",
    image: "/images/perfumes/allure-homme-sport.svg",
    gender: "آقایان",
    season: "بهار و تابستان؛ استفاده روزانه",
    longevity: "★★★☆☆",
    sillage: "★★★☆☆",
    top: "پرتقال، ماندارین خونی، نت‌های دریایی، آلدهیدها",
    middle: "فلفل، نرولی، سدر",
    base: "وانیل، دانه تونکا، مشک سفید، عنبر، وتیور، رزین اِلمی",
    description:
      "آلوره هوم اسپرت عطری چوبی و مرکباتی با حس دریایی و تمیز است؛ شروعی شاداب دارد و با فلفل، نرولی و سدر به پایه‌ای نرم از مشک، وانیل و دانه تونکا می‌رسد.",
    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "allure-homme-edition-blanche",
    name: "Allure Homme Édition Blanche Eau de Parfum",
    persianName: "آلوره هوم ادیشن بلانچ",
    brand: "Chanel",
    image: "/images/perfumes/allure-homme-edition-blanche.svg",
    gender: "آقایان",
    season: "بهار، پاییز و استفاده روزانه",
    longevity: "★★★☆☆",
    sillage: "★★★☆☆",
    top: "لیمو، ترنج",
    middle: "چوب صندل، نت‌های چوبی",
    base: "وانیل ماداگاسکار، وتیور",
    description:
      "ادیشن بلانچ ترکیبی مرکباتی و چوبی با تضاد لیموی روشن و گرمای وانیل است؛ چوب صندل و وتیور به رایحه عمق و تعادل می‌دهند.",
    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "chanel-chance",
    name: "Chance Eau de Toilette",
    persianName: "شنل چنس",
    brand: "Chanel",
    image: "/images/perfumes/chance.svg",
    gender: "بانوان",
    season: "بهار و پاییز",
    longevity: "★★★☆☆",
    sillage: "★★★☆☆",
    top: "نعناع هندی، فلفل صورتی، آناناس، سنبل، زنبق",
    middle: "لیمو، یاس، رز",
    base: "نعناع هندی، مشک، وتیور، وانیل",
    description:
      "چنس ادو تویلت رایحه‌ای شیپر و گلی است که در کنار طراوت مرکبات، نت‌های گلی و پایه‌ای از نعناع هندی، مشک و وتیور دارد.",
    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "platinum-egoiste",
    name: "Platinum Égoïste Eau de Toilette",
    persianName: "پلاتینیوم اگویست",
    brand: "Chanel",
    image: "/images/perfumes/platinum-egoiste.svg",
    gender: "آقایان",
    season: "بهار، تابستان و استفاده روزانه",
    longevity: "★★★★☆",
    sillage: "★★★★☆",
    top: "اسطوخودوس، رزماری، نرولی، پتی‌گرین",
    middle: "شمعدانی، مریم‌گلی، گالبانوم، یاس",
    base: "خزه بلوط، وتیور، سدر، چوب صندل، عنبر",
    description:
      "پلاتینیوم اگویست عطری آروماتیک و فوژه با حس سبز و تمیز است؛ ترکیب اسطوخودوس و رزماری در آغاز، قلب گیاهی و پایه‌ای چوبی و کهربایی دارد.",
    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "amouage-purpose",
    name: "Amouage Purpose",
    persianName: "آمواج پرپوس",
    brand: "Amouage",
    image: "/images/perfumes/purpose.png",
    gender: "بانوان و آقایان",
    season: "پاییز و زمستان",
    longevity: "★★★★★",
    sillage: "★★★★★",

    top: "فلفل صورتی، کندر",
    middle: "پاپیروس، چوب صندل",
    base: "زعفران، جیر، آکیگالا",

    description:
      "عطری لوکس، عمیق و اسرارآمیز از برند آمواج با رایحه‌ای چوبی و ادویه‌ای.",

    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "poison-girl",
    name: "Poison Girl",
    persianName: "پویزن گرل",
    brand: "Dior",
    image: "/images/perfumes/poison.png",
    gender: "بانوان",
    season: "پاییز و زمستان",
    longevity: "★★★★★",
    sillage: "★★★★☆",

    top: "پرتقال تلخ، لیمو",
    middle: "رز، شکوفه پرتقال",
    base: "وانیل، دانه تونکا، چوب صندل",

    description:
      "رایحه‌ای شیرین، جذاب و اغواکننده با امضای خاص دیور.",

    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "sauvage",
    name: "Sauvage",
    persianName: "ساواج",
    brand: "Dior",
    image: "/images/perfumes/sauvage.png",
    gender: "آقایان",
    season: "چهار فصل",
    longevity: "★★★★★",
    sillage: "★★★★★",

    top: "ترنج کالابریا",
    middle: "فلفل سیچوان، اسطوخودوس",
    base: "آمبروکسان، سدر",

    description:
      "یکی از پرفروش‌ترین عطرهای مردانه دنیا با رایحه‌ای مدرن و قدرتمند.",

    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "gucci-flora",
    name: "Gucci Flora",
    persianName: "گوچی فلورا",
    brand: "Gucci",
    image: "/images/perfumes/flora.png",
    gender: "بانوان",
    season: "بهار و تابستان",
    longevity: "★★★★☆",
    sillage: "★★★★☆",

    top: "گلابی، مرکبات",
    middle: "رز، گل صدتومانی",
    base: "نعناع هندی، مشک",

    description:
      "عطری لطیف، گلی و بسیار زنانه برای استفاده روزانه.",

    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "delina-exclusif",
    name: "Delina Exclusif",
    persianName: "دلینا اکسکلوسیف",
    brand: "Parfums de Marly",
    image: "/images/perfumes/delina.png",
    gender: "بانوان",
    season: "چهار فصل",
    longevity: "★★★★★",
    sillage: "★★★★★",

    top: "گلابی، سرخالو",
    middle: "رز ترکی",
    base: "وانیل، بخور، مشک",

    description:
      "رایحه‌ای لوکس و بسیار ماندگار برای بانوان خاص‌پسند.",

    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "tom-ford-f-fabulous",
    name: "F* Fabulous",
    persianName: "فاکینگ فبیولس",
    brand: "Tom Ford",
    image: "/images/perfumes/ffabulous.png",
    gender: "بانوان و آقایان",
    season: "پاییز و زمستان",
    longevity: "★★★★★",
    sillage: "★★★★★",

    top: "اسطوخودوس، مریم گلی",
    middle: "بادام تلخ، وانیل",
    base: "چرم، دانه تونکا",

    description:
      "یکی از خاص‌ترین عطرهای تام فورد با رایحه چرمی و لوکس.",

    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },

  {
    id: "creed-aventus",
    name: "Creed Aventus",
    persianName: "کرید اونتوس",
    brand: "Creed",
    image: "/images/perfumes/aventus.png",
    gender: "آقایان",
    season: "چهار فصل",
    longevity: "★★★★★",
    sillage: "★★★★★",

    top: "آناناس، ترنج، سیب",
    middle: "یاس، نعناع هندی",
    base: "خزه بلوط، وانیل، مشک",

    description:
      "یکی از مشهورترین عطرهای مردانه دنیا با رایحه‌ای شیک و ماندگار.",

    volume: ["10ml", "20ml", "30ml", "50ml", "100ml"],
  },
];

export default perfumes;
