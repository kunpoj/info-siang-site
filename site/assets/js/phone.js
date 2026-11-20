/* Siang visitor demo: a tappable phone. Sample data only. Copy follows PRD v8 A06 (visitor). */
(function () {
  'use strict';
  var I = {
    back: '<path d="M15 5l-7 7 7 7"/>',
    next: '<path d="M9 5l7 7-7 7"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
    share: '<path d="M12 15V4M8 8l4-4 4 4M7 11H5.5v9h13v-9H17"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none"/>',
    phones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H5a1 1 0 0 1-1-1zM20 15h-3v5h2a1 1 0 0 0 1-1z"/>',
    chat: '<path d="M4.5 18.5l1.2-3.6A7.5 7.5 0 1 1 9 18.2z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    map: '<path d="M9 5L3.5 7v12L9 17l6 2 5.5-2V5L15 7zM9 5v12M15 7v12"/>',
    list: '<path d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01"/>',
    down: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
    hash: '<path d="M9 4L7 20M17 4l-2 16M4.5 9h15M4 15h15"/>',
    qr: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
    pin: '<path d="M12 21s-6-5.3-6-10.5a6 6 0 0 1 12 0C18 15.7 12 21 12 21z"/><circle cx="12" cy="10.5" r="2"/>',
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    art: '<rect x="4" y="4" width="7" height="9" rx="1.5"/><rect x="13" y="4" width="7" height="6" rx="1.5"/><rect x="4" y="15" width="7" height="5" rx="1.5"/><rect x="13" y="12" width="7" height="8" rx="1.5"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-4 4-6 7-6s6 2 7 6"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/>',
    me: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="10" r="2.6"/><path d="M7.5 17.5c1.2-2 2.7-3 4.5-3s3.3 1 4.5 3"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };
  function ic(n, s, fill) {
    return '<svg aria-hidden="true" width="' + (s || 22) + '" height="' + (s || 22) + '" viewBox="0 0 24 24" fill="' + (fill ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + I[n] + '</svg>';
  }

  /* ---------- sample data ---------- */
  var DUR = {"bowl-a": 24.03, "bowl-c": 27.04, "cezanne-c": 30.04, "chair-a": 33.04, "degas-c": 24.03, "lautrec-c": 27.04, "vase-a": 30.04, "vase-c": 33.04, "vermeer-c": 24.03, "wave-c": 27.04};
  var W = {
    vase: { img: 'vase', ar: 1280 / 1600, t: ['หน้าต่างยามเช้า', 'Morning Window'], a: ['พลอย ส.', 'Ploy S.'], y: '2026', m: ['แก้วเป่า', 'Blown glass'], sz: '32 × 20', sale: 'available', dur: 84,
      cx: ['ผลงานทุกชิ้นในห้องนี้ค่อยๆ ทำขึ้นอย่างใจเย็น ลองไล่ดูสีเขียวที่ไหลลงจากปากแจกัน แล้วขยับตัวเล็กน้อย สีจะเปลี่ยนไปตามแสง', 'Everything in this room was made slowly. Follow the green running down from the rim, then move a little: the colour changes with the light.'],
      x: ['ฉันเป่าแก้วใบนี้ตอนเช้า สีเขียวกับสีเหลืองคือแสงที่ผ่านหน้าต่างสตูดิโอ ก่อนแดดจะแรง', 'I blew this piece in the morning. The green and yellow are the light through my studio window, before the sun gets strong.'] },
    bowl: { img: 'bowl', ar: 1600 / 1121, t: ['ความนิ่ง หมายเลข 4', 'Stillness No. 4'], a: ['ธันว์ ก.', 'Than K.'], y: '2026', m: ['เซรามิก เขียนลายด้วยมือ', 'Hand painted ceramic'], sz: '18 × 34', sale: 'reserved', dur: 108,
      cx: ['ลองก้มลงดูด้านในชาม แล้วเทียบลายด้านในกับด้านนอก ธันว์วาดทั้งสองด้านด้วยมือ', 'Lean in and look inside the bowl, then compare the inside with the outside. Than painted both by hand.'],
      x: ['ผมปั้นชามใบนี้ช้าที่สุดในชุด ดอกไม้ทุกดอกวาดด้วยมือทีละดอก ผมอยากให้มันนิ่ง เหมือนน้ำที่อยู่ในชาม', 'This is the slowest bowl in the series. Every flower is painted by hand, one at a time. I wanted it to feel still, like water resting in a bowl.'] },
    chair: { img: 'chair', ar: 1280 / 1600, t: ['หลังฝน', 'After the Rain'], a: ['พลอย ส.', 'Ploy S.'], y: '2025', m: ['ไม้และผ้าไหม', 'Wood and silk'], sz: '90 × 45 × 48', sale: 'available', dur: 72,
      cx: ['เบาะสีเหลืองคือสีที่สว่างที่สุดในห้องนี้ ลองสังเกตว่าสายตาของคุณไปหยุดที่ไหนก่อน', 'The yellow seat is the brightest colour in this room. Notice where your eyes go first.'],
      x: ['เก้าอี้ตัวนี้ทำจากไม้เก่าที่เก็บได้หลังพายุ ฉันบุเบาะด้วยผ้าไหมสีเหลือง ให้เหมือนแดดแรกหลังฝนหยุด', 'This chair is made from old wood I found after a storm. I covered the seat in yellow silk, like the first sun after the rain.'] },
    textile: { img: 'textile', ar: 1600 / 731, t: ['น้ำลง', 'Low Tide'], a: ['มีนา ร.', 'Meena R.'], y: '2026', m: ['ผ้าไหมทอมือ', 'Hand woven silk'], sz: '140 × 64', sale: 'sold', dur: 66,
      cx: ['ลองยืนห่างจากผืนผ้าสักสามก้าว ลายเล็กๆ จะรวมกันเป็นแถว เหมือนคลื่นที่ซัดเข้าฝั่ง', 'Step three paces back. The small marks join into rows, like waves coming in.'],
      x: ['ลายนี้มาจากรอยที่น้ำทิ้งไว้บนทรายตอนน้ำลง ฉันทอซ้ำทีละแถวจนเต็มผืน', 'The pattern comes from the marks the sea leaves on the sand at low tide. I wove it row by row until the cloth was full.'] },
    vermeer: { img: 'vermeer', ar: 1394 / 1600, t: ['หญิงรับใช้หลับ', 'A Maid Asleep'], a: ['Johannes Vermeer', 'Johannes Vermeer'], y: ['ราว 1656 ถึง 1657', 'ca. 1656 to 1657'], m: ['สีน้ำมันบนผ้าใบ', 'Oil on canvas'], dur: 112,
      x: ['ลองมองประตูที่เปิดแง้มอยู่ด้านหลัง เวอร์เมียร์พาสายตาเราจากหญิงที่หลับอยู่ ลึกเข้าไปในอีกห้องหนึ่งของบ้าน', 'Look at the half open door behind her. Vermeer leads our eyes from the sleeping woman, deeper into another room of the house.'] },
    cezanne: { img: 'cezanne', ar: 1600 / 1234, t: ['หุ่นนิ่งกับแอปเปิลและลูกแพร์', 'Still Life with Apples and Pears'], a: ['Paul Cézanne', 'Paul Cézanne'], y: ['ราว 1891 ถึง 1892', 'ca. 1891 to 1892'], m: ['สีน้ำมันบนผ้าใบ', 'Oil on canvas'], dur: 96,
      x: ['เซซานให้เรามองผลไม้จากหลายมุมพร้อมกัน โต๊ะจึงดูเอียง แต่ทั้งภาพกลับนิ่งอย่างน่าแปลก', 'Cézanne lets us see the fruit from several angles at once. The table seems to tilt, yet the whole picture feels strangely calm.'] },
    seurat: { img: 'seurat', ar: 1239 / 1600, t: ['การปักผ้า ภาพแม่ของศิลปิน', "Embroidery; The Artist's Mother"], a: ['Georges Seurat', 'Georges Seurat'], y: ['1882 ถึง 1883', '1882 to 1883'], m: ['ดินสอคอนเตบนกระดาษ', 'Conté crayon on paper'], dur: 88,
      x: ['ภาพนี้ไม่มีเส้นขอบเลย ซูราวาดด้วยคอนเตบนกระดาษผิวหยาบ แล้วให้แสงกับเงาสร้างรูปทรงขึ้นมาเอง', 'There are no outlines here. Seurat drew with conté crayon on rough paper and let light and shadow build the form.'] },
    degas: { img: 'degas', ar: 1140 / 1600, t: ['นักเต้นกับพัด', 'Dancer with a Fan'], a: ['Edgar Degas', 'Edgar Degas'], y: ['ราว 1880', 'ca. 1880'], m: ['สีพาสเทลและถ่านบนกระดาษ', 'Pastel and charcoal on paper'], dur: 94,
      x: ['ภาพร่างนี้คือการศึกษาท่าของนักเต้นคนกลางในภาพห้องเรียนบัลเลต์ของเดอกา สังเกตเส้นที่วาดซ้ำๆ ตรงแขนและพัด', 'This drawing is a study for the central dancer in one of Degas’s ballet classroom paintings. Look at the lines he drew again and again around the arm and fan.'] },
    klimt: { img: 'klimt', ar: 784 / 1600, t: ['เซเรนา พูลิตเซอร์ เลเดอเรอร์', 'Serena Pulitzer Lederer'], a: ['Gustav Klimt', 'Gustav Klimt'], y: '1899', m: ['สีน้ำมันบนผ้าใบ', 'Oil on canvas'], dur: 80,
      x: ['ชุดสีขาวเกือบกลืนไปกับพื้นหลัง เหลือเพียงใบหน้า ผมสีเข้ม และดวงตาที่มองกลับมาหาเรา', 'Her white dress almost melts into the background. Only her face, her dark hair and her eyes looking back at us remain.'] },
    wave: { img: 'wave', ar: 1600 / 1094, t: ['ใต้คลื่นนอกชายฝั่งคานางาวะ', 'Under the Wave off Kanagawa'], a: ['Katsushika Hokusai', 'Katsushika Hokusai'], y: ['ราว 1830 ถึง 1832', 'ca. 1830 to 1832'], m: ['ภาพพิมพ์แกะไม้', 'Woodblock print'], dur: 108,
      x: ['ภาพพิมพ์แกะไม้จากชุดทัศนียภาพของภูเขาไฟฟูจิ ภูเขาที่ใหญ่ที่สุดในญี่ปุ่นกลายเป็นเนินเล็กๆ ใต้คลื่น', 'A woodblock print from the series of views of Mount Fuji. Japan’s greatest mountain becomes a small hill under the wave.'] },
    bird: { img: 'bird', ar: 1184 / 1400, t: ['นกวิเศษ', 'Mystical Bird'], a: ['Katsushika Hokusai', 'Katsushika Hokusai'], y: ['1820 ถึง 1833', '1820 to 1833'], m: ['ภาพพิมพ์แกะไม้', 'Woodblock print'], dur: 60,
      x: ['ภาพพิมพ์สุริโมโนะ นกวิเศษคาเรียวบิงกะ ครึ่งคนครึ่งนก กำลังเป่าขลุ่ยกลางเมฆ', 'A surimono print. Karyōbinga, the mystical bird with a woman’s face, plays a flute among the clouds.'] },
    hiro: { img: 'hiro', ar: 1400 / 935, t: ['สมุดภาพฮิโรชิเงะ', 'Hiroshige Picture Album'], a: ['Utagawa Hiroshige II', 'Utagawa Hiroshige II'], y: '1862', m: ['สมุดภาพพิมพ์แกะไม้', 'Woodblock printed book'], dur: 60,
      x: ['สมุดภาพพิมพ์แกะไม้ เปิดไว้ที่หน้าชายชรายืนชมดอกซากุระ', 'A woodblock printed book, open at a page of an old man looking up at cherry blossoms.'] },
    lautrec: { img: 'lautrec', ar: 1229 / 1600, t: ['ตัวตลกหญิงนั่ง', 'The Seated Clowness'], a: ['Henri de Toulouse-Lautrec', 'Henri de Toulouse-Lautrec'], y: '1896', m: ['ภาพพิมพ์หินสี', 'Color lithograph'], dur: 90,
      x: ['ภาพพิมพ์หินจากชุด Elles ตูลูส-โลแทร็กวาดนักแสดงชื่อ Cha-U-Kao ตอนนั่งพัก ระบายสีเหลืองสดไว้ที่ปกคอ', 'A lithograph from the series Elles. Toulouse-Lautrec shows the performer Cha-U-Kao at rest, with a burst of yellow at her collar.'] }
  };
  var S = {
    quiet: { t: ['ห้องเงียบ', 'Quiet Rooms'], org: 'Demo Gallery', place: ['Demo Gallery, ย่านริมน้ำ', 'Demo Gallery, Riverside'], until: '28/02/2027', cover: 'textile', works: ['vase', 'bowl', 'chair', 'textile'], sales: true, narr: ['นภา ค.', 'Napa K.'], both: true,
      about: ['ของใช้สี่ชิ้นจากศิลปินสามคน ที่ทำขึ้นช้าๆ ให้อยู่กับบ้านได้นาน', 'Four objects by three artists, made slowly to live in a home for a long time.'] },
    look: { t: ['มองช้าๆ', 'Look Slowly'], org: 'Demo Studio', place: ['Demo Art Centre, ห้อง 2', 'Demo Art Centre, Room 2'], area: 2, until: '28/02/2027', cover: 'vermeer', works: ['vermeer', 'cezanne', 'seurat', 'degas', 'klimt'], narr: ['นภา ค.', 'Napa K.'],
      about: ['ห้าภาพจากห้าศิลปิน ที่ชวนให้หยุดดูนานกว่าปกติ', 'Five pictures by five artists that ask you to stop and look a little longer.'] },
    prints: { t: ['จากเอโดะถึงปารีส', 'From Edo to Paris'], org: 'Demo Print Club', place: ['Demo Print House, ย่านตลาดเก่า', 'Demo Print House, Old Market'], area: 2, until: '24/02/2027', cover: 'wave', works: ['wave', 'lautrec'], narr: ['ธนา ร.', 'Thana R.'],
      about: ['ภาพพิมพ์ญี่ปุ่นที่ศิลปินในปารีสหลงใหล วางคู่กับภาพพิมพ์ของศิลปินปารีสเอง', 'Japanese prints that Paris artists loved, next to a print by one of those artists.'] }
  };
  S.waves = { t: ['คลื่นบนกระดาษ', 'Waves on Paper'], org: 'Demo Print Club', place: ['Demo Art Centre, ห้อง 2', 'Demo Art Centre, Room 2'], area: 2, until: '28/02/2027', cover: 'bird', works: ['bird', 'hiro'], narr: ['ธนา ร.', 'Thana R.'],
    about: ['ภาพพิมพ์ญี่ปุ่นสองชิ้น วางไว้ผนังเดียวกับ มองช้าๆ', 'Two Japanese prints, on the same wall as Look Slowly.'] };
  S.home = { t: ['แสงในบ้าน', 'Light at Home'], org: 'Demo Studio', place: ['Demo Art Centre, ห้อง 4', 'Demo Art Centre, Room 4'], area: 2, until: '28/02/2027', cover: 'vase', works: ['vase', 'bowl', 'chair', 'textile'], narr: ['นภา ค.', 'Napa K.'], both: true,
    about: ['ของใช้สี่ชิ้นที่ทำขึ้นช้าๆ ให้แสงในบ้านเปลี่ยนไปทั้งวัน', 'Four objects made slowly, for the light inside a home.'] };
  var AREAS = [['ทั้งหมด', 'All'], ['ย่านริมน้ำ', 'Riverside'], ['ย่านตลาดเก่า', 'Old Market']];
  var FEST = [
    { s: 'look', area: 2, d: ['18/02/2027 ถึง 28/02/2027', '18/02/2027 to 28/02/2027'], pin: [212, 226] },
    { s: 'prints', area: 2, d: ['18/02/2027 ถึง 24/02/2027', '18/02/2027 to 24/02/2027'], pin: [176, 214] },
    { s: 'quiet', area: 1, d: ['09/01/2027 ถึง 28/02/2027', '09/01/2027 to 28/02/2027'], pin: [104, 132] }
  ];
  var AT = {  /* artists: name, medium, avatar work, works [work, show, index], shows */
    ploy: { n: ['พลอย ส.', 'Ploy S.'], m: ['แก้วเป่าและไม้ กรุงเทพฯ', 'Blown glass and wood, Bangkok'], av: 'vase', works: [['vase', 'quiet', 0], ['chair', 'quiet', 2]], shows: ['quiet'], bio: ['เป่าแก้วและทำเฟอร์นิเจอร์ไม้ในสตูดิโอเล็กๆ ริมคลอง ทำทีละชิ้นอย่างช้าๆ', 'Blows glass and makes wooden furniture in a small studio by the canal, one slow piece at a time.'] },
    than: { n: ['ธันว์ ก.', 'Than K.'], m: ['เซรามิก กรุงเทพฯ', 'Ceramics, Bangkok'], av: 'bowl', works: [['bowl', 'quiet', 1]], shows: ['quiet'], bio: ['ปั้นและเขียนลายเซรามิกด้วยมือ ทุกดอกวาดทีละดอก', 'Throws and hand paints ceramics, one flower at a time.'] },
    meena: { n: ['มีนา ร.', 'Meena R.'], m: ['ผ้าทอมือ กรุงเทพฯ', 'Hand weaving, Bangkok'], av: 'textile', works: [['textile', 'quiet', 3]], shows: ['quiet'], bio: ['ทอผ้าไหมด้วยมือ ลายมาจากทะเลและน้ำขึ้นน้ำลง', 'Weaves silk by hand, with patterns taken from the sea and the tides.'] }
  };
  var AOF = { vase: 'ploy', chair: 'ploy', bowl: 'than', textile: 'meena' };
  var PL = {  /* places: name, kind, cover, shows on now, area, distance */
    dg: { n: 'Demo Gallery', k: ['แกลเลอรี ย่านริมน้ำ', 'Gallery, Riverside'], cover: 'textile', shows: ['quiet'], area: 1, d: ['800 ม.', '800 m'] },
    dac: { n: 'Demo Art Centre', k: ['ศูนย์ศิลปะ ย่านตลาดเก่า', 'Art centre, Old Market'], cover: 'vermeer', shows: ['look', 'waves'], area: 2, d: ['1.4 กม.', '1.4 km'] },
    dph: { n: 'Demo Print House', k: ['ห้องภาพพิมพ์ ย่านตลาดเก่า', 'Print house, Old Market'], cover: 'wave', shows: ['prints'], area: 2, d: ['1.6 กม.', '1.6 km'] }
  };
  var PLOF = { quiet: 'dg', look: 'dac', waves: 'dac', home: 'dac', prints: 'dph' };
  var HOURS = { dg: ['เปิดวันนี้ 11:00 ถึง 19:00', 'Open today 11:00 to 19:00'], dac: ['เปิดวันนี้ 10:00 ถึง 20:00', 'Open today 10:00 to 20:00'], dph: ['เปิดวันนี้ 10:00 ถึง 18:00', 'Open today 10:00 to 18:00'] };
  /* the art feed: works from shows on now, in date order (never by likes) */
  var FEED = [['vermeer', 'look', 0], ['vase', 'quiet', 0], ['wave', 'prints', 0], ['degas', 'look', 3], ['bowl', 'quiet', 1], ['lautrec', 'prints', 1],
    ['cezanne', 'look', 1], ['chair', 'quiet', 2], ['klimt', 'look', 4], ['textile', 'quiet', 3], ['seurat', 'look', 2]];
  var FCHIPS = [['กำลังจัดแสดง', 'On now'], ['Demo Design Festival', 'Demo Design Festival'], ['สุดสัปดาห์นี้', 'This weekend'], ['เฉพาะที่ติดตาม', 'Following only']];
  var T = {
    onNow: ['กำลังจัดแสดง', 'On now'], until: ['ถึง ', 'until '], play: ['เล่นตามลำดับการเดิน', 'Play in walking order'], about: ['เกี่ยวกับนิทรรศการ', 'About this show'],
    keypad: ['พิมพ์เลขบนป้ายผลงาน', 'Type the number on the label'], open: ['เปิด', 'Open'], works: ['ผลงาน {n} ชิ้น', '{n} works'], of: ['{i} จาก {n}', '{i} of {n}'],
    artistVoice: ['เสียงศิลปิน', "Artist's voice"], sampleSnd: ['เสียงตัวอย่าง', 'Sample sound'], narr: ['บรรยายโดย {n}', 'Narrated by {n}'], fromCurator: ['จากคิวเรเตอร์', 'From the curator'], artistWords: ['คำพูดของศิลปิน', 'In the artist’s words'],
    ask: ['สอบถามผลงานนี้', 'Ask about this work'], available: ['พร้อมขาย', 'Available'], reserved: ['จองแล้ว', 'Reserved'], sold: ['ขายแล้ว', 'Sold'],
    soldNote: ['ผลงานนี้ขายแล้ว คุณยังสอบถาม {o} เกี่ยวกับศิลปินคนนี้ได้', 'This work is sold. You can still ask {o} about this artist.'],
    askSub: ['{t} โดย {a}', '{t} by {a}'], askAbout: ['เรื่องที่ถาม', 'What is this about?'], askItems: [['ซื้อผลงาน', 'สื่อมวลชน', 'อื่นๆ'], ['Buying', 'Press', 'Other']],
    name: ['ชื่อของคุณ', 'Your name'], contact: ['อีเมลของคุณ', 'Your email'], msg: ['ข้อความ', 'Message'],
    msgSample: ['ผลงานนี้ยังขายอยู่ไหมครับ อยากทราบราคาและการจัดส่ง', "Is this work still for sale? I'd like to know the price and delivery."],
    share: ['แชร์ช่องทางติดต่อของฉันกับศิลปินด้วย', 'Share my contact with the artist too'],
    receivers: ['ข้อความของคุณจะส่งถึง {o} และ {a} Siang ส่งต่อให้และไม่หักค่าใดๆ', 'Your message goes to {o} and {a}. Siang passes your message on and takes no cut.'],
    send: ['ส่ง', 'Send'], tapAgain: ['แตะอีกครั้งเพื่อส่ง', 'Tap again to send'],
    footer: ['Siang ไม่รับชำระเงินค่าผลงานศิลปะ และไม่เคยขอให้ผู้ซื้อจ่ายเงินผ่าน Siang', 'Siang never takes payment for artworks and never asks buyers to pay through Siang.'],
    sent: ['ส่งแล้ว', 'Sent.'], sentBody: ['เมื่อ {o} ตอบ คำตอบจะส่งถึงอีเมลของคุณผ่าน Siang', 'When {o} replies, the answer comes to your email through Siang.'],
    sentSum: ['ซื้อผลงาน, ส่งถึง {o} และ {a}', 'Buying, sent to {o} and {a}'], backWork: ['กลับไปที่ผลงาน', 'Back to the work'],
    fest: ['Demo Design Festival 2027', 'Demo Design Festival 2027'], festOrg: 'Demo Design Festival', festDates: ['18/02/2027 ถึง 28/02/2027', '18/02/2027 to 28/02/2027'],
    offline: ['ดาวน์โหลดไว้ดูตอนไม่มีเน็ต', 'Download for offline'], todayN: ['วันนี้ {n} รายการ', '{n} today'], map: ['แผนที่', 'Map'], list: ['รายการ', 'List'], moved: ['เลื่อนวันแล้ว', 'Date moved'],
    partOf: ['ส่วนหนึ่งของ Demo Design Festival 2027', 'Part of Demo Design Festival 2027'], by: ['โดย {o}', 'by {o}'],
    scanned: ['คุณสแกนป้าย QR ของห้อง 2', 'You scanned the QR sign for Room 2'], todayAt: ['วันนี้ที่ Demo Art Centre', 'Today at Demo Art Centre'],
    todaySub: ['ห้องนี้มี 2 นิทรรศการ เลือกนิทรรศการที่คุณกำลังดู', 'This room has 2 shows. Pick the one you are looking at.'], copied: ['คัดลอกลิงก์แล้ว', 'Link copied'], saved: ['ดาวน์โหลดแล้ว', 'Downloaded'], code: ['รหัสนิทรรศการ', 'Show code'],
    noWork: ['ไม่มีผลงานหมายเลข {n} ในนิทรรศการนี้', 'No work {n} in this show.'],
    tArt: ['ผลงาน', 'Art'], tArtist: ['ศิลปิน', 'Artists'], tPlace: ['สถานที่', 'Places'], tScan: ['สแกน', 'Scan'], tMe: ['ของฉัน', 'Me'],
    follow: ['ติดตาม', 'Follow'], following: ['ติดตามแล้ว', 'Following'], worksT: ['ผลงาน', 'Works'], showsT: ['จัดแสดงที่', 'Shows'],
    feedNote: ['เรียงตามวันที่และระยะทาง ไม่ใช่ตามความนิยม', 'Sorted by date and distance, never by popularity'], emptyFollow: ['ติดตามศิลปินหรือสถานที่ไว้ แล้วนิทรรศการใหม่ของเขาจะขึ้นที่นี่', 'Follow artists or places, and their new shows appear here.'],
    artistsSub: ['ศิลปินที่มีผลงานจัดแสดงอยู่ตอนนี้', 'Artists with work on show now'], festCard: ['เทศกาลตอนนี้', 'Festival on now'],
    nearYou: ['ใกล้คุณ', 'Near you'], onNowHere: ['กำลังจัดแสดงที่นี่', 'On now here'], savedW: ['ผลงานที่เก็บไว้', 'Saved works'], followingT: ['ที่ติดตาม', 'Following'],
    emptySaved: ['แตะหัวใจที่ผลงาน แล้วผลงานจะมาอยู่ที่นี่', 'Tap the heart on a work and it lands here.'], meNote: ['จะใช้บัญชีก็ต่อเมื่ออยากดูที่เก็บไว้ในเครื่องอื่นด้วย', 'You only need an account to keep saves and follows across devices.'],
    noFollow: ['ยังไม่ได้ติดตามใคร', 'Not following anyone yet'], inShow: ['ใน {s}', 'In {s}'],
    scanTo: ['สแกนเพื่อเปิดนิทรรศการ', 'Scan to open the show'], room2: ['ห้อง 2', 'Room 2'], scanToday: ['สแกนดูว่าวันนี้ห้องนี้มีอะไร', 'Scan to see what is on in this room today'], orCode2: ['หรือพิมพ์รหัส 8TR5WA ที่ siang.co', 'or type code 8TR5WA at siang.co'],
    dlDone: ['ดาวน์โหลดแล้ว โปรแกรม แผนที่ และข้อมูลผลงานเปิดได้แม้ไม่มีเน็ต ส่วนเสียงยังต้องใช้เน็ต', 'Downloaded. The programme, map and work details open without signal. Sound still needs signal.'],
    dirs: ['เส้นทาง', 'Directions'], openMaps: ['เปิดในแอปแผนที่', 'Opening your maps app'], openFest: ['เปิดหน้าเทศกาล', 'Open the festival page'],
    closing: ['ไปก่อนปิด', 'Go before it closes'], closesOn: ['ปิด {d}', 'Closes {d}'],
    notice: ['พลอย ส. เพิ่มผลงานใหม่', 'Ploy S. added new work'], noticeSub: ['คุณติดตาม พลอย ส. อยู่', 'You follow Ploy S.'], now: ['ตอนนี้', 'now'], orCode: ['หรือพิมพ์รหัส 4KQ7M2 ที่ siang.co', 'or type code 4KQ7M2 at siang.co']
  };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmt(s, o) { return s.replace(/\{(\w)\}/g, function (_, k) { return o[k]; }).replace(/\.\./g, '.'); }
  function mmss(t) { t = Math.max(0, Math.round(t)); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }

  function Phone(root) {
    var self = this;
    this.root = root;
    this.base = root.getAttribute('data-base') || '';
    this.L = root.getAttribute('data-lang') === 'en' ? 1 : 0;
    this.big = false;
    this.start = root.getAttribute('data-start') || 'quiet';
    this.stack = [];
    this.saved = {}; this.seen = {}; this.fol = {};
    this.app = this.start.indexOf('app:') === 0;
    this.guided = root.hasAttribute('data-guided');
    root.__phone = this;
    var me = this;
    /* one sound at a time across the page: another player starting stops this phone */
    document.addEventListener('siang:audio', function (e) { var a = me.audio; if (a && a.el !== e.detail && a.playing) { a.playing = false; if (a.el) a.el.pause(); me.paint(); } });
    this.audio = null; // {w, pos, playing}
    this.screen = root.querySelector('.pa');
    this.reset();
    setInterval(function () { self.tick(); }, 250);
    root.addEventListener('click', function (e) { self.click(e); });
    root.addEventListener('submit', function (e) { e.preventDefault(); self.keypad(e.target); });
    var r = root.parentNode.querySelector('[data-phone-reset]');
    if (r) r.addEventListener('click', function () { self.reset(); });
  }
  var P = Phone.prototype;
  P.tx = function (k) { var v = T[k]; return typeof v === 'string' ? v : v[this.L]; };
  P.v = function (a) { return typeof a === 'string' ? a : a[this.L]; };
  P.img = function (k, small) { return this.base + 'art/' + k + (small ? '-320' : '-800') + '.webp'; };
  P.reset = function () {
    this.stopAudio();
    this.stack = [];
    this.screen.innerHTML = '';
    var s = this.start;
    if (this.app) { this.go(s.slice(4)); return; }
    if (s === 'scan') this.push({ v: 'scan' }, true);
    else if (s === 'fest') this.push({ v: 'fest', area: 0, mode: 'list' }, true);
    else if (s === 'today') this.push({ v: 'today' }, true);
    else if (s.indexOf('ask:') === 0 || s.indexOf('sent:') === 0) { var a = s.split(':'), ai = +a[2]; this.push({ v: 'show', s: a[1] }, true); this.push({ v: 'work', s: a[1], i: ai }, true); this.push(a[0] === 'ask' ? { v: 'ask', s: a[1], i: ai, up: true } : { v: 'sent', s: a[1], i: ai }, true); }
    else if (s.indexOf('work:') === 0) { var q = s.split(':'); this.push({ v: 'show', s: q[1] }, true); this.seen[S[q[1]].works[+q[2]]] = 1; this.push({ v: 'work', s: q[1], i: +q[2] }, true); this.stack[0].el.classList.add('out'); }
    else this.push({ v: 'show', s: s }, true);
  };
  P.push = function (st, instant, up) {
    var prev = this.stack.length ? this.stack[this.stack.length - 1] : null;
    this.stack.push(st);
    var el = document.createElement('div');
    el.className = 'pa-layer' + (up ? ' up' : '');
    st.el = el;
    this.render(st);
    this.screen.appendChild(el);
    if (!instant) {
      el.classList.add('in');
      void el.offsetWidth;
      el.classList.remove('in');
      if (prev && !up) prev.el.classList.add('out');
    }
    this.hintLater();
  };
  P.pop = function (n) {
    n = n || 1;
    var self = this;
    for (var i = 0; i < n && this.stack.length > 1; i++) {
      var st = this.stack.pop();
      var el = st.el;
      el.classList.add(st.up ? 'down' : 'in');
      setTimeout(function (e) { return function () { e.remove(); }; }(el), 380);
    }
    var top = this.stack[this.stack.length - 1];
    if (top.v === 'show') this.render(top); // refresh Seen ticks
    top.el.classList.remove('out');
    this.hintLater();
  };
  /* app mode: tabs at the bottom, a fresh stack per tab */
  P.go = function (k) {
    this.stopAudio(); this.stack = []; this.screen.innerHTML = '';
    var tab = { art: 'art', artists: 'artists', places: 'places', me: 'me' }[k];
    if (tab) { this.push({ v: tab, root: true }, true); return; }
    if (k.indexOf('artist:') === 0) { this.push({ v: 'artists', root: true }, true); this.push({ v: 'artist', id: k.slice(7) }, true); return; }
    if (k === 'look') { this.push({ v: 'places', root: true }, true); this.push({ v: 'show', s: 'look' }, true); this.stack[0].el.classList.add('out'); return; }
    if (k.indexOf('place:') === 0) { this.push({ v: 'places', root: true }, true); this.push({ v: 'place', id: k.slice(6) }, true); return; }
    this.push({ v: 'places', root: true }, true);
    if (k === 'scan') { this.push({ v: 'scan' }, true); return; }
    this.push({ v: 'fest', area: 0, mode: k === 'map' ? 'map' : 'list', sel: k === 'map' ? 2 : null }, true);
    if (k === 'fest' || k === 'map') return;
    this.push({ v: 'show', s: 'quiet', fest: true }, true);
    if (k === 'show') return;
    this.seen.vase = 1; this.push({ v: 'work', s: 'quiet', i: 0 }, true);
    if (k === 'ask') this.push({ v: 'ask', s: 'quiet', i: 0, up: true }, true);
  };
  /* ---------- guided day (the demo page): build any step's screen at once, no sound ---------- */
  P.scene = function (k) {
    var self = this, base = function (tab) { self.stopAudio(); self.stack = []; self.screen.innerHTML = ''; self.push({ v: tab, root: true }, true); return self.top(); };
    var fest = function (o) { var st = base('art'); st.ch = 1; self.render(st); self.push({ v: 'fest', area: o.area || 0, mode: o.mode || 'list', sel: o.sel, dl: !!o.dl }, true); };
    var showAt = function (s, scanned) { base('places'); if (scanned === 'room') { self.push({ v: 'scan', room: 2 }, true); self.push({ v: 'today' }, true); } else if (scanned) self.push({ v: 'scan' }, true); self.push({ v: 'show', s: s }, true); };
    this.notice = false; this.building = true;
    switch (k) {
      case 'feed': var st = base('art'); st.ch = 0; this.render(st); break;
      case 'feedfest': st = base('art'); st.ch = 1; this.render(st); break;
      case 'fest': this.fol.ddf = false; fest({}); break;
      case 'festfol': this.fol.ddf = true; fest({}); break;
      case 'offline': this.fol.ddf = true; fest({ dl: 1 }); break;
      case 'map': this.fol.ddf = true; fest({ dl: 1, mode: 'map' }); break;
      case 'oldmarket': this.fol.ddf = true; fest({ dl: 1, mode: 'map', area: 2, sel: 0 }); break;
      case 'places': base('places'); break;
      case 'place': base('places'); this.push({ v: 'place', id: 'dac' }, true); break;
      case 'scan': base('places'); this.push({ v: 'place', id: 'dac' }, true); this.push({ v: 'scan', room: 2 }, true); break;
      case 'today': base('places'); this.push({ v: 'scan', room: 2 }, true); this.push({ v: 'today' }, true); break;
      case 'show': showAt('look', 'room'); break;
      case 'narr': showAt('look', 'room'); this.seen.vermeer = 1; this.push({ v: 'work', s: 'look', i: 0 }, true); break;
      case 'keypad': this.seen.vermeer = 1; showAt('look', 'room'); break;
      case 'degas': this.seen.vermeer = 1; this.seen.degas = 1; showAt('look', 'room'); this.push({ v: 'work', s: 'look', i: 3 }, true); break;
      case 'qscan': base('places'); this.push({ v: 'scan' }, true); break;
      case 'quiet': showAt('quiet', true); break;
      case 'vase': showAt('quiet', true); this.seen.vase = 1; this.push({ v: 'work', s: 'quiet', i: 0 }, true); break;
      case 'ask': showAt('quiet', true); this.seen.vase = 1; this.push({ v: 'work', s: 'quiet', i: 0 }, true); this.push({ v: 'ask', s: 'quiet', i: 0, up: true }, true, true); break;
      case 'sent': showAt('quiet', true); this.seen.vase = 1; this.push({ v: 'work', s: 'quiet', i: 0 }, true); this.push({ v: 'sent', s: 'quiet', i: 0, up: true }, true, true); break;
      case 'save': this.saved.vase = false; showAt('quiet', true); this.seen.vase = 1; this.push({ v: 'work', s: 'quiet', i: 0 }, true); break;
      case 'ploy': this.saved.vase = true; this.fol.ploy = false; base('artists'); this.push({ v: 'artist', id: 'ploy' }, true); break;
      case 'me': this.saved.vase = true; this.fol.ploy = true; this.fol.ddf = true; base('me'); break;
      case 'notice': this.saved.vase = true; this.fol.ploy = true; this.fol.ddf = true; st = base('me'); st.notice = true; this.render(st); break;
    }
    for (var i = 0; i < this.stack.length - 1; i++) if (!this.stack[i + 1].up) this.stack[i].el.classList.add('out');
    this.building = false; this.emit();
  };
  P.mark = function (sel) {  /* the demo page points at the one thing to tap */
    this.clearHint(); if (!sel) return;
    var st = this.top(), t = st && st.el.querySelector(sel); if (t) t.classList.add('pa-hint');
  };

  P.tabbar = function (on) {
    var self = this, tabs = [['places', 'pin', 'tPlace'], ['art', 'art', 'tArt'], ['scan', 'scan', 'tScan'], ['artists', 'user', 'tArtist'], ['me', 'me', 'tMe']];  /* PRD order: scan in the middle */
    return '<nav class="pa-tabs">' + tabs.map(function (t) { return '<button class="' + (t[0] === on ? 'on' : '') + '" data-a="tab" data-t="' + t[0] + '">' + ic(t[1], 23) + '<span>' + self.tx(t[2]) + '</span></button>'; }).join('') + '</nav>';
  };
  P.emit = function () {
    var st = this.top(); if (!st || this.building) return;  /* a scene being built says nothing until it is whole */
    try { this.root.dispatchEvent(new CustomEvent('siang:view', { bubbles: true, detail: { v: st.v, s: st.s, i: st.i, id: st.id, mode: st.mode, ch: st.ch || 0, area: st.area, sel: st.sel, dl: !!st.dl, armed: !!st.armed,
        playing: !!(this.audio && this.audio.playing), saved: Object.keys(this.saved).filter(function (k) { return this.saved[k]; }, this), fol: Object.keys(this.fol).filter(function (k) { return this.fol[k]; }, this) } })); } catch (e) {}
  };
  P.top = function () { return this.stack[this.stack.length - 1]; };
  P.rerender = function () { for (var i = 0; i < this.stack.length; i++) this.render(this.stack[i]); this.hintLater(); };
  P.render = function (st) {
    var el = st.el, sc = el.querySelector('.pa-scroll'), y = sc ? sc.scrollTop : 0;
    el.innerHTML = this['v_' + st.v](st);
    var ns = el.querySelector('.pa-scroll'); if (ns) ns.scrollTop = y;
    if (this.guided && st === this.top()) { var me = this; clearTimeout(this.et); this.et = setTimeout(function () { me.emit(); }, 0); }
  };

  /* ---------- pieces ---------- */
  P.status = function (light) {
    return '<div class="pa-status' + (light ? ' light' : '') + '"><span>9:41</span><i class="pa-island"></i><span class="pa-sig"><b></b><b></b><b></b><b></b><em></em></span></div>';
  };
  P.head = function (center, opts) {
    opts = opts || {};
    var back = this.stack.length > 1 || opts.back ? '<button class="pa-ib" data-a="back" aria-label="' + (this.L ? 'Back' : 'กลับ') + '">' + ic('back', 24) + '</button>' : '<span class="pa-ib"></span>';
    return '<header class="pa-head' + (opts.over ? ' over' : '') + '">' + back + '<span class="pa-hc">' + (center || '') + '</span><span class="pa-hr"><span class="pa-lang"><button data-a="lang">' + (this.L ? 'EN' : 'TH') + '</button></span>' + (opts.share === false ? '' : '<button class="pa-ib" data-a="share" aria-label="Share">' + ic('share', 22) + '</button>') + '</span></header>';
  };
  P.thumb = function (k, cls) { return '<span class="' + (cls || 'pa-th') + '" style="background-image:url(' + this.img(W[k] ? W[k].img : k, true) + ')"></span>'; };

  /* ---------- screens ---------- */
  P.heart = function (k, cls) { return '<button class="' + (cls || 'pa-hb') + (this.saved[k] ? ' on' : '') + '" data-a="fsave" data-k="' + k + '" aria-label="Save">' + ic('heart', 20, this.saved[k]) + '</button>'; };
  P.tile = function (f, i) {
    var w = W[f[0]];
    return '<div class="pa-tile"><button class="pa-tim" data-a="fwork" data-s="' + f[1] + '" data-i="' + f[2] + '"' + (i === 0 ? ' data-next' : '') + '><img alt="" src="' + this.img(w.img, true) + '" style="aspect-ratio:' + Math.max(.7, Math.min(1.3, w.ar)) + '"></button>' +
      this.heart(f[0]) + '<b>' + w.t[this.L] + '</b><small>' + this.v(w.a) + '</small></div>';
  };
  P.ttl = function (t, right) { return '<div class="pa-top"><div role="heading" aria-level="1" class="pa-tt">' + t + '</div>' + (right || '') + '</div>'; };
  P.v_art = function (st) {
    var L = this.L, self = this, ch = st.ch || 0, items = FEED.slice();
    if (ch === 1) items = items.filter(function (f) { return FEST.some(function (x) { return x.s === f[1]; }); });

    if (ch === 3) items = items.filter(function (f) { return self.fol[AOF[f[0]]] || self.fol[PLOF[f[1]]]; });
    var cols = ['', ''];
    items.forEach(function (f, i) { cols[i % 2] += self.tile(f, i); });
    var chips = FCHIPS.map(function (c, i) { return '<button class="pa-chip' + (ch === i ? ' on' : '') + '" data-a="fch" data-i="' + i + '">' + c[L] + '</button>'; }).join('');
    var fc = ch === 1 ? '<button class="pa-fcard sm" data-a="festo" style="background-image:linear-gradient(90deg,rgba(15,15,15,.9),rgba(15,15,15,.35)),url(' + this.img('textile') + ')"><b>' + this.tx('fest') + '</b><small>' + this.tx('openFest') + '</small></button>' : '';
    var body = fc + (items.length ? '<div class="pa-feed"><div>' + cols[0] + '</div><div>' + cols[1] + '</div></div>' : '<p class="pa-empty">' + this.tx('emptyFollow') + '</p>');
    return this.status() + '<div class="pa-scroll tb">' + this.ttl(this.tx('tArt'), '<span class="pa-ib dim">' + ic('search', 22) + '</span>') +
      '<div class="pa-pad"><div class="pa-chips">' + chips + '</div><p class="pa-note2">' + this.tx('feedNote') + '</p>' + body + '</div></div>' + this.tabbar('art');
  };
  P.folbtn = function (id) { return '<button class="pa-fol' + (this.fol[id] ? ' on' : '') + '" data-a="fol" data-id="' + id + '">' + this.tx(this.fol[id] ? 'following' : 'follow') + '</button>'; };
  P.v_artists = function () {
    var L = this.L, self = this;
    var rows = Object.keys(AT).map(function (id, i) {
      var a = AT[id];
      return '<div class="pa-arow"><button class="pa-amain" data-a="artist" data-id="' + id + '"' + (i === 0 ? ' data-next' : '') + '><span class="pa-av" style="background-image:url(' + self.img(a.av, true) + ')"></span><span class="pa-rt"><b>' + a.n[L] + '</b><small>' + a.m[L] + '</small></span></button>' + self.folbtn(id) + '</div>' +
        '<div class="pa-astrip">' + a.works.map(function (w) { return '<button data-a="fwork" data-s="' + w[1] + '" data-i="' + w[2] + '" style="background-image:url(' + self.img(w[0], true) + ')" aria-label="' + W[w[0]].t[L] + '"></button>'; }).join('') + '</div>';
    }).join('');
    return this.status() + '<div class="pa-scroll tb">' + this.ttl(this.tx('tArtist')) + '<div class="pa-pad"><p class="pa-sub">' + this.tx('artistsSub') + '</p>' + rows + '</div></div>' + this.tabbar('artists');
  };
  P.v_artist = function (st) {
    var L = this.L, self = this, a = AT[st.id], tab = st.tab || 0;
    var grid = '<div class="pa-grid">' + a.works.map(function (w, i) { return '<button data-a="fwork" data-s="' + w[1] + '" data-i="' + w[2] + '"' + (i === 0 ? ' data-next' : '') + ' style="background-image:url(' + self.img(w[0], true) + ')"><span>' + W[w[0]].t[L] + '</span></button>'; }).join('') + '</div>';
    var shows = '<div class="pa-rows">' + a.shows.map(function (k) { var s = S[k]; return '<button class="pa-row" data-a="show" data-s="' + k + '">' + self.thumb(s.cover, 'pa-th lg') + '<span class="pa-rt"><b>' + s.t[L] + '</b><small>' + s.place[L] + '</small><small>' + self.tx('until') + s.until + '</small></span>' + ic('next', 18) + '</button>'; }).join('') + '</div>';
    var body = tab === 0 ? grid + '<div class="pa-lh"><b>' + this.tx('showsT') + '</b></div>' + shows : shows;
    return this.status() + this.head('', {}) + '<div class="pa-scroll"><div class="pa-pad"><div class="pa-ahead"><span class="pa-av xl" style="background-image:url(' + this.img(a.av, true) + ')"></span>' +
      '<div class="pa-rt"><div role="heading" aria-level="2" class="pa-h2">' + a.n[L] + '</div><small>' + a.m[L] + '</small></div>' + this.folbtn(st.id) + '</div><p class="pa-about">' + a.bio[L] + '</p>' +
      '<div class="pa-seg">' + [this.tx('worksT'), this.tx('showsT')].map(function (t, i) { return '<button class="' + (tab === i ? 'on' : '') + '" data-a="atab" data-i="' + i + '">' + t + '</button>'; }).join('') + '</div>' + body + '</div></div>';
  };
  P.v_places = function () {
    var L = this.L, self = this;
    var fest = '<button class="pa-fcard" data-a="festo" data-next style="background-image:linear-gradient(180deg,rgba(15,15,15,.1),rgba(15,15,15,.85)),url(' + this.img('textile') + ')"><em>' + this.tx('festCard') + '</em><b>' + this.tx('fest') + '</b><small>' + this.tx('festDates') + '</small></button>';
    var rows = Object.keys(PL).map(function (id) {
      var p = PL[id];
      return '<button class="pa-row" data-a="place" data-id="' + id + '">' + self.thumb(p.cover, 'pa-th lg') + '<span class="pa-rt"><b>' + p.n + '</b><small>' + p.k[L] + '</small><small>' + self.tx('onNow') + ': ' + S[p.shows[0]].t[L] + '</small></span><span class="pa-dist">' + p.d[L] + '</span></button>';
    }).join('');
    return this.status() + '<div class="pa-scroll tb">' + this.ttl(this.tx('tPlace'), '<span class="pa-ib dim">' + ic('map', 22) + '</span>') + '<div class="pa-pad">' + fest +
      '<div class="pa-lh"><b>' + this.tx('nearYou') + '</b></div><div class="pa-rows">' + rows + '</div></div></div>' + this.tabbar('places');
  };
  P.v_place = function (st) {
    var L = this.L, self = this, p = PL[st.id];
    var cards = p.shows.map(function (k, i) { var s = S[k]; return '<button class="pa-card wide" data-a="show" data-s="' + k + '"' + (i === 0 ? ' data-next' : '') + '><span class="pa-cimg" style="background-image:url(' + self.img(s.cover) + ')"></span><b>' + s.t[L] + '</b><small>' + s.place[L] + '</small><small>' + self.tx('until') + s.until + '</small></button>'; }).join('');
    return this.status() + '<div class="pa-scroll"><div class="pa-banner" style="background-image:linear-gradient(180deg,rgba(15,15,15,.15),rgba(15,15,15,.55) 55%,#0F0F0F),url(' + this.img(p.cover) + ')">' + this.head('', {}) +
      '<div class="pa-bt"><div role="heading" aria-level="2">' + p.n + '</div><small>' + p.k[L] + '</small></div></div><div class="pa-pad"><div class="pa-hours"><span>' + ic('clock', 17) + HOURS[st.id][L] + '</span><span>' + p.d[L] + '</span></div>' +
      '<div class="pa-btns"><button class="pa-btn w" data-a="dirs">' + ic('compass', 18) + this.tx('dirs') + '</button>' + this.folbtn(st.id).replace('pa-fol', 'pa-btn pa-fol') + '</div>' +
      '<div class="pa-lh"><b>' + this.tx('onNowHere') + '</b></div><div class="pa-cards one">' + cards + '</div></div></div>';
  };
  P.v_me = function (st) {
    var L = this.L, self = this, ks = Object.keys(this.saved).filter(function (k) { return self.saved[k]; });
    var grid = ks.length ? '<div class="pa-grid">' + ks.map(function (k) { var f = FEED.filter(function (x) { return x[0] === k; })[0]; return '<button data-a="fwork" data-s="' + f[1] + '" data-i="' + f[2] + '" style="background-image:url(' + self.img(W[k].img, true) + ')"><span>' + W[k].t[L] + '</span></button>'; }).join('') + '</div>' : '<p class="pa-empty">' + this.tx('emptySaved') + '</p>';
    var fl = Object.keys(this.fol).filter(function (k) { return self.fol[k]; }).map(function (id) { return AT[id] ? AT[id].n[L] : PL[id] ? PL[id].n : self.tx('fest'); });
    var soon = this.fol.ddf ? '<div class="pa-lh"><b>' + this.tx('closing') + '</b></div><div class="pa-rows"><button class="pa-row" data-a="show" data-s="prints" data-fest="1">' + this.thumb(S.prints.cover, 'pa-th lg') + '<span class="pa-rt"><b>' + S.prints.t[L] + '</b><small>' + S.prints.place[L] + '</small><small>' + fmt(this.tx('closesOn'), { d: S.prints.until }) + '</small></span>' + ic('next', 18) + '</button></div>' : '';
    var note = st.notice ? '<button class="pa-notice" data-a="artistgo" data-id="ploy" data-next><span class="pa-nlogo"><i></i><i></i><i></i></span><span class="pa-rt"><b>' + this.tx('notice') + '</b><small>' + this.tx('noticeSub') + '</small></span><em>' + this.tx('now') + '</em></button>' : '';
    return this.status() + note + '<div class="pa-scroll tb">' + this.ttl(this.tx('tMe')) + '<div class="pa-pad"><div class="pa-lh"><b>' + this.tx('savedW') + '</b></div>' + grid +
      '<div class="pa-lh"><b>' + this.tx('followingT') + '</b></div><p class="pa-sub">' + (fl.length ? fl.join(', ') : this.tx('noFollow')) + '</p>' + soon + '<p class="pa-note2">' + this.tx('meNote') + '</p></div></div>' + this.tabbar('me');
  };

  P.v_scan = function (st) {
    var q = '';
    var seed = 7;
    for (var r = 0; r < 21; r++) for (var c = 0; c < 21; c++) {
      var finder = (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
      var on;
      if (finder) { var rr = r % 14, cc = c % 14; rr = r > 13 ? r - 14 : r; cc = c > 13 ? c - 14 : c; on = rr === 0 || rr === 6 || cc === 0 || cc === 6 || (rr > 1 && rr < 5 && cc > 1 && cc < 5); }
      else { seed = (seed * 9301 + 49297) % 233280; on = seed / 233280 > 0.52; }
      if (on) q += '<rect x="' + c + '" y="' + r + '" width="1" height="1"/>';
    }
    return '<div class="pa-cam">' + this.status(true) + (this.stack.length > 1 ? '<button class="pa-ib pa-camx" data-a="back" aria-label="' + (this.L ? 'Back' : 'กลับ') + '">' + ic('back', 24) + '</button>' : '') +
      '<div class="pa-wall"><div class="pa-poster" data-a="open-scan">' + (st && st.room ? '<span class="pp-org">Demo Art Centre</span><b class="pp-t">' + T.room2[0] + '</b><span class="pp-e">Room 2</span>' : '<span class="pp-org">Demo Gallery</span><b class="pp-t">ห้องเงียบ</b><span class="pp-e">Quiet Rooms</span>') +
      '<svg class="pp-qr" viewBox="-1 -1 23 23" shape-rendering="crispEdges"><rect x="-1" y="-1" width="23" height="23" fill="#fff"/><g fill="#111">' + q + '</g></svg>' +
      '<span class="pp-s">' + this.tx(st && st.room ? 'scanToday' : 'scanTo') + '</span><span class="pp-c">' + this.tx(st && st.room ? 'orCode2' : 'orCode') + '</span></div>' +
      '<i class="pa-frame"></i></div>' +
      '<button class="pa-pill" data-a="open-scan" data-next>' + ic('compass', 18) + '<span>siang.co</span></button>' +
      '<button class="pa-shutter" data-a="open-scan" aria-label="Scan"><i></i></button></div>';
  };

  P.v_fest = function (st) {
    var L = this.L, self = this;
    var items = FEST.filter(function (f) { return !st.area || f.area === st.area; });
    var chips = AREAS.map(function (a, i) { return '<button class="pa-chip' + (st.area === i ? ' on' : '') + '" data-a="area" data-i="' + i + '">' + a[L] + '</button>'; }).join('');
    var body;
    if (st.mode === 'map') {
      var pins = items.map(function (f) { var k = FEST.indexOf(f); return '<button class="pa-pin' + (st.sel === k ? ' on' : '') + '" style="left:' + f.pin[0] + 'px;top:' + f.pin[1] + 'px" data-a="pin" data-i="' + k + '"' + (k === 0 ? ' data-next' : '') + '>' + (k + 1) + '</button>'; }).join('');
      var sel = st.sel != null && items.indexOf(FEST[st.sel]) > -1 ? FEST[st.sel] : null;
      body = '<div class="pa-map"><svg viewBox="0 0 361 400" aria-hidden="true"><path d="M250 -10 C 200 80, 300 150, 240 230 S 150 330, 210 410" fill="none" stroke="#1d2b33" stroke-width="34"/>' +
        '<g stroke="#262626" stroke-width="6" fill="none"><path d="M0 120 L361 150"/><path d="M0 230 L361 200"/><path d="M90 0 L140 400"/><path d="M0 330 L361 300"/><path d="M40 0 L70 400"/></g>' +
        '<g stroke="#1e1e1e" stroke-width="3"><path d="M0 60 L361 80"/><path d="M0 180 L200 175"/><path d="M180 0 L170 400"/><path d="M0 280 L361 260"/></g></svg>' + pins +
        (sel ? '<button class="pa-mapcard" data-a="show" data-s="' + sel.s + '" data-fest="1" data-next>' + this.thumb(S[sel.s].cover) + '<span><b>' + S[sel.s].t[L] + '</b><small>' + S[sel.s].place[L] + '</small></span>' + ic('next', 18) + '</button>' : '') + '</div>';
    } else {
      body = '<div class="pa-rows">' + items.map(function (f, i) {
        var s = S[f.s];
        return '<button class="pa-row" data-a="show" data-s="' + f.s + '" data-fest="1"' + (i === 0 ? ' data-next' : '') + '>' + self.thumb(s.cover, 'pa-th lg') + '<span class="pa-rt"><b>' + s.t[L] + '</b><small>' + s.place[L] + '</small><small>' + f.d[L] + '</small>' + '</span>' + ic('next', 18) + '</button>';
      }).join('') + '</div>';
    }
    return this.status() + '<div class="pa-scroll"><div class="pa-banner" style="background-image:linear-gradient(180deg,rgba(15,15,15,.15),rgba(15,15,15,.55) 55%,#0F0F0F),url(' + this.img('textile') + ')">' +
      this.head('', {}) + '<div class="pa-bt"><span class="pa-org"><i>D</i></span><div role="heading" aria-level="2">' + this.tx('fest') + '</div><small>' + this.tx('festDates') + '</small></div></div>' +
      '<div class="pa-pad"><div class="pa-frow">' + this.folbtn('ddf') + '<button class="pa-soft" data-a="dl">' + ic(st.dl ? 'check' : 'down', 16) + this.tx(st.dl ? 'saved' : 'offline') + '</button></div>' + (st.dl ? '<p class="pa-dlnote">' + this.tx('dlDone') + '</p>' : '') + '<div class="pa-chips">' + chips + '</div>' +
      '<div class="pa-lh"><b>' + fmt(this.tx('todayN'), { n: items.length }) + '</b><button class="pa-link" data-a="mode"' + (st.mode === 'list' ? '' : '') + '>' + ic(st.mode === 'map' ? 'list' : 'map', 17) + (st.mode === 'map' ? this.tx('list') : this.tx('map')) + '</button></div>' + body + '</div></div>';
  };

  P.v_today = function () {
    var L = this.L, self = this;
    var cards = ['look', 'waves'].map(function (k, i) {
      var s = S[k];
      return '<button class="pa-card" data-a="show" data-s="' + k + '"' + (i === 0 ? ' data-next' : '') + '><span class="pa-cimg" style="background-image:url(' + self.img(s.cover) + ')"><em>' + self.tx('onNow') + '</em></span><b>' + s.t[L] + '</b><small>' + self.tx('until') + s.until + '</small><small>' + fmt(self.tx('by'), { o: s.org }) + '</small></button>';
    }).join('');
    return this.status() + this.head('<span class="pa-logo"><i></i><i></i><i></i> Siang</span>', { share: false }) + '<div class="pa-scroll"><div class="pa-pad">' +
      '<span class="pa-note">' + ic('qr', 15) + this.tx('scanned') + '</span><div role="heading" aria-level="2" class="pa-h1">' + this.tx('todayAt') + '</div><p class="pa-sub">' + this.tx('todaySub') + '</p>' +
      '<div class="pa-cards">' + cards + '</div>' +
      '<form class="pa-key" data-code><span>' + ic('hash', 18) + '</span><input maxlength="6" autocapitalize="characters" aria-label="' + this.tx('code') + '" placeholder="' + this.tx('code') + '"><button class="pa-kbtn">' + this.tx('open') + '</button></form></div></div>';
  };

  P.v_show = function (st) {
    var L = this.L, s = S[st.s], self = this;
    var rows = s.works.map(function (k, i) {
      var w = W[k];
      return '<button class="pa-wrow" data-a="work" data-i="' + i + '"' + (i === 0 ? ' data-next' : '') + '><span class="pa-n">' + (i + 1) + '</span>' + self.thumb(k) + '<span class="pa-rt"><b>' + w.t[L] + '</b><small>' + self.v(w.a) + (self.seen[k] ? ' <span class="pa-seen">' + ic('check', 13) + '</span>' : '') + '</small></span>' + ic('next', 18) + '</button>';
    }).join('');
    return this.status() + this.head('', {}) + '<div class="pa-scroll"><div class="pa-pad">' +
      '<span class="pa-cover" style="background-image:url(' + this.img(s.cover) + ')"><em>' + this.tx('onNow') + ' ' + this.tx('until') + s.until + '</em></span>' +
      '<div role="heading" aria-level="2" class="pa-h1">' + s.t[L] + '</div>' + (L ? '' : '<span class="pa-en">' + s.t[1] + '</span>') +
      '<span class="pa-place"><b>' + s.place[L] + '</b>' + (st.fest ? '<small>' + this.tx('partOf') + '</small>' : '<small>' + fmt(this.tx('by'), { o: s.org }) + '</small>') + '</span>' +
      '<div class="pa-btns"><button class="pa-btn w" data-a="playall">' + ic('phones', 18) + this.tx('play') + '</button><button class="pa-btn" data-a="about">' + this.tx('about') + '</button></div>' +
      (st.about ? '<p class="pa-about">' + s.about[L] + '</p>' : '') +
      '<form class="pa-key"><span>' + ic('hash', 18) + '</span><input inputmode="numeric" pattern="[0-9]*" maxlength="3" aria-label="' + this.tx('keypad') + '" placeholder="' + this.tx('keypad') + '"><button class="pa-kbtn">' + this.tx('open') + '</button></form>' +
      (st.err ? '<p class="pa-err">' + st.err + '</p>' : '') +
      '<div class="pa-lh"><b>' + fmt(this.tx('works'), { n: s.works.length }) + '</b></div><div class="pa-rows">' + rows + '</div></div></div>';
  };

  P.has = function (k, l) { return !Object.keys(DUR).length || !!DUR[k + '-' + l]; };
  P.dur = function (k, l) { return DUR[k + '-' + l] || W[k].dur; };
  P.player = function (k, w, layer, label, pulse) {
    var a = this.audio && this.audio.w === k && this.audio.l === layer ? this.audio : { pos: 0, playing: false };
    var d = this.dur(k, layer); label += ' <small class="pa-only">' + this.tx('sampleSnd') + '</small>';
    return '<div class="pa-player" data-l="' + layer + '"><button class="pa-pb" data-a="toggle" data-l="' + layer + '"' + (pulse ? ' data-next' : '') + ' aria-label="Play">' + ic(a.playing ? 'pause' : 'play', 24) + '</button><span class="pa-pl"><b>' + label + '</b><i class="pa-bar"><i style="width:' + (a.pos / d * 100).toFixed(2) + '%"></i></i><span class="pa-tm"><span class="pa-cur">' + mmss(a.pos) + '</span><span>' + mmss(d) + '</span></span></span></div>';
  };
  P.v_work = function (st) {
    var L = this.L, s = S[st.s], k = s.works[st.i], w = W[k];
    var sale = s.sales && w.sale ? '<span class="pa-sale ' + w.sale + '">' + this.tx(w.sale) + '</span>' : '';
    var layers = '';
    if (!s.narr || s.both) layers += (this.has(k, 'a') ? this.player(k, w, 'a', this.tx('artistVoice'), !s.sales) : '') + '<span class="pa-xh">' + this.tx('artistWords') + '</span><p class="pa-x">' + w.x[L] + '</p>';
    if (s.narr) {
      var cx = s.both ? w.cx : w.x;
      layers += (s.both ? '<i class="pa-sep"></i>' : '') + (this.has(k, 'c') ? this.player(k, w, 'c', fmt(this.tx('narr'), { n: s.narr[L] }), !s.sales && !s.both) : '') + '<span class="pa-xh">' + this.tx('fromCurator') + '</span><p class="pa-x">' + cx[L] + '</p>';
    }
    var bottom;
    if (s.sales && w.sale === 'sold') bottom = '<p class="pa-soldnote">' + fmt(this.tx('soldNote'), { o: s.org }) + '</p>';
    else if (s.sales) bottom = '<button class="pa-ask" data-a="ask" data-next>' + ic('chat', 18) + this.tx('ask') + '</button>';
    else bottom = '<span class="pa-ofs">' + fmt(this.tx('of'), { i: st.i + 1, n: s.works.length }) + '</span>';
    return this.status() + this.head('<span class="pa-of">' + fmt(this.tx('of'), { i: st.i + 1, n: s.works.length }) + '</span>', {}) +
      '<div class="pa-scroll"><div class="pa-pad pb">' +
      '<span class="pa-art' + (w.ar < 0.75 ? ' tall' : '') + '"><img alt="" src="' + this.img(w.img) + '" style="aspect-ratio:' + w.ar + '"></span>' +
      '<div class="pa-wt"><div><div role="heading" aria-level="2" class="pa-h2">' + w.t[L] + '</div>' + (L ? '' : '<span class="pa-en">' + w.t[1] + '</span>') +
      '<span class="pa-by"><b>' + this.v(w.a) + '</b>, ' + this.v(w.y) + '</span><span class="pa-med">' + w.m[L] + (w.sz ? ', ' + w.sz + (L ? ' cm' : ' ซม.') : '') + '</span></div>' +
      '<span class="pa-acts"><button class="pa-ib' + (this.saved[k] ? ' on' : '') + '" data-a="save" aria-label="Save">' + ic('heart', 24, this.saved[k]) + '</button></span></div>' + sale + layers + '</div></div>' +
      '<div class="pa-foot"><button class="pa-ib" data-a="prev"' + (st.i ? '' : ' disabled') + ' aria-label="Previous">' + ic('back', 24) + '</button>' + bottom + '<button class="pa-ib" data-a="next"' + (st.i < s.works.length - 1 ? '' : ' disabled') + ' aria-label="Next">' + ic('next', 24) + '</button></div>';
  };

  P.v_ask = function (st) {
    var L = this.L, s = S[st.s], w = W[s.works[st.i]], items = T.askItems[L];
    return '<div class="pa-sheet">' + this.status() + '<header class="pa-head"><button class="pa-ib" data-a="back" aria-label="Close">' + ic('back', 24) + '</button><span class="pa-hc"><b>' + this.tx('ask') + '</b></span><span class="pa-hr"></span></header>' +
      '<div class="pa-scroll"><div class="pa-pad pb2"><p class="pa-sub c">' + fmt(this.tx('askSub'), { t: w.t[L], a: this.v(w.a) }) + '</p>' +
      '<span class="pa-fl">' + this.tx('askAbout') + '</span><div class="pa-seg">' + items.map(function (t, i) { return '<button class="' + ((st.topic || 0) === i ? 'on' : '') + '" data-a="topic" data-i="' + i + '">' + t + '</button>'; }).join('') + '</div>' +
      '<label class="pa-field"><span>' + this.tx('name') + '</span><b>' + (L ? 'Ton' : 'ต้น') + '</b></label>' +
      '<label class="pa-field"><span>' + this.tx('contact') + '</span><b>visitor@demo.siang.co</b></label>' +
      '<label class="pa-field tall"><span>' + this.tx('msg') + '</span><b>' + this.tx('msgSample') + '</b></label>' +
      '<button class="pa-tick" data-a="sharec"><i class="' + (st.share ? 'on' : '') + '">' + (st.share ? ic('check', 14) : '') + '</i>' + this.tx('share') + '</button>' +
      '<p class="pa-fine">' + fmt(this.tx('receivers'), { o: s.org, a: this.v(w.a) }) + '</p><p class="pa-fine">' + this.tx('footer') + '</p></div></div>' +
      '<div class="pa-foot c"><button class="pa-ask' + (st.armed ? ' armed' : '') + '" data-a="send" data-next>' + (st.armed ? this.tx('tapAgain') : this.tx('send')) + '</button></div></div>';
  };

  P.v_sent = function (st) {
    var L = this.L, s = S[st.s], w = W[s.works[st.i]];
    return '<div class="pa-sheet">' + this.status() + '<div class="pa-sentw"><span class="pa-ok">' + ic('check', 30) + '</span><div role="heading" aria-level="2" class="pa-h2 c">' + this.tx('sent') + '</div><p class="pa-sub c">' + fmt(this.tx('sentBody'), { o: s.org }) + '</p>' +
      '<div class="pa-sum">' + this.thumb(s.works[st.i]) + '<span class="pa-rt"><b>' + w.t[L] + '</b><small>' + fmt(this.tx('sentSum'), { o: s.org, a: this.v(w.a) }) + '</small></span></div>' +
      '<button class="pa-ask" data-a="backwork" data-next>' + this.tx('backWork') + '</button></div></div>';
  };

  /* ---------- actions ---------- */
  P.click = function (e) {
    var b = e.target.closest('[data-a]');
    this.root.classList.add('used');
    this.clearHint();
    if (!b || !this.root.contains(b)) return;
    if (b.tagName === 'BUTTON' && b.closest('form') && b.getAttribute('data-a') == null) return;
    var a = b.getAttribute('data-a'), st = this.top();
    switch (a) {
      case 'back': if (st.v === 'work') this.stopAudio(); this.pop(); break;
      case 'lang': this.L = 1 - this.L; this.rerender(); break;
      case 'aa': this.big = !this.big; this.root.classList.toggle('big', this.big); this.rerender(); break;
      case 'open-scan': if (st.room) this.push({ v: 'today' }); else this.push({ v: 'show', s: 'quiet' }); break;
      case 'dirs': this.toast(this.tx('openMaps')); break;
      case 'artistgo': st.notice = false; this.render(st); this.push({ v: 'artist', id: b.getAttribute('data-id') }); break;
      case 'area': st.area = +b.getAttribute('data-i'); st.sel = null; this.render(st); break;
      case 'mode': st.mode = st.mode === 'map' ? 'list' : 'map'; st.sel = null; this.render(st); this.hintLater(); break;
      case 'pin': st.sel = +b.getAttribute('data-i'); this.render(st); this.hintLater(); break;
      case 'show': this.push({ v: 'show', s: b.getAttribute('data-s'), fest: !!b.getAttribute('data-fest') }); break;
      case 'about': st.about = !st.about; this.render(st); break;
      case 'work': this.openWork(st.s, +b.getAttribute('data-i')); break;
      case 'playall': this.openWork(st.s, 0, true); break;
      case 'toggle': this.toggleAudio(st, b.getAttribute('data-l')); break;
      case 'share': this.toast(this.tx('copied')); break;
      case 'dl': st.dl = !st.dl; this.render(st); break;
      case 'save': var k = S[st.s].works[st.i]; this.saved[k] = !this.saved[k]; this.render(st); this.emit(); break;
      case 'prev': case 'next':
        var ni = st.i + (a === 'next' ? 1 : -1), n = S[st.s].works.length;
        if (ni < 0 || ni >= n) break;
        var playing = this.audio && this.audio.playing ? this.audio.l : null;
        this.stopAudio(); st.i = ni; this.seen[S[st.s].works[ni]] = 1;
        this.render(st); if (playing) this.toggleAudio(st, playing); st.el.querySelector('.pa-scroll').scrollTop = 0; this.hintLater(); break;
      case 'ask': this.stopAudio(); this.render(st); this.push({ v: 'ask', s: st.s, i: st.i, up: true }, false, true); break;
      case 'topic': st.topic = +b.getAttribute('data-i'); st.armed = false; this.render(st); break;
      case 'sharec': st.share = !st.share; st.armed = false; this.render(st); break;
      case 'send':
        if (!st.armed) { st.armed = true; this.render(st); this.hintLater(); break; }
        st.v = 'sent'; this.render(st); this.hintLater(); break;
      case 'backwork': this.pop(); break;
      case 'tab': var tt = b.getAttribute('data-t'); if (tt === 'scan') this.push({ v: 'scan' }); else if (tt !== st.v) { this.go(tt); } break;
      case 'fch': st.ch = +b.getAttribute('data-i'); this.render(st); break;
      case 'fsave': var fk = b.getAttribute('data-k'); this.saved[fk] = !this.saved[fk]; this.render(st); this.emit(); break;
      case 'fwork': var fs = b.getAttribute('data-s'), fi = +b.getAttribute('data-i'); this.seen[S[fs].works[fi]] = 1; this.stopAudio(); this.push({ v: 'work', s: fs, i: fi }); break;
      case 'fol': var id = b.getAttribute('data-id'); this.fol[id] = !this.fol[id]; this.render(st); break;
      case 'artist': this.push({ v: 'artist', id: b.getAttribute('data-id') }); break;
      case 'atab': st.tab = +b.getAttribute('data-i'); this.render(st); break;
      case 'place': this.push({ v: 'place', id: b.getAttribute('data-id') }); break;
      case 'festo': this.push({ v: 'fest', area: 0, mode: 'list' }); break;
    }
  };
  P.openWork = function (s, i, play) {
    var k = S[s].works[i];
    this.seen[k] = 1;
    this.stopAudio();
    this.push({ v: 'work', s: s, i: i });
    if (play) { var l0 = S[s].narr && !S[s].both ? 'c' : 'a'; if (!this.has(k, l0)) l0 = l0 === 'a' ? 'c' : 'a'; if (this.has(k, l0)) this.toggleAudio(this.top(), l0); }
  };
  P.keypad = function (form) {
    if (form.hasAttribute('data-code')) { if (form.querySelector('input').value.trim()) this.push({ v: 'show', s: 'look' }); return; }
    var st = this.top(), n = parseInt(form.querySelector('input').value, 10), s = S[st.s];
    if (n >= 1 && n <= s.works.length) { st.err = null; this.render(st); this.openWork(st.s, n - 1); }
    else { st.err = fmt(this.tx('noWork'), { n: isNaN(n) ? '' : n }); this.render(st); }
  };
  P.toggleAudio = function (st, l) {
    var k = S[st.s].works[st.i], self = this;
    if (!this.audio || this.audio.w !== k || this.audio.l !== l) {
      this.stopAudio();
      var el = new Audio(this.base + 'audio/' + k + '-' + l + '.mp3');
      el.preload = 'auto';
      try { document.dispatchEvent(new CustomEvent('siang:audio', { detail: el })); } catch (e) {}
      this.audio = { w: k, l: l, pos: 0, playing: false, el: el };
      el.addEventListener('ended', function () { if (self.audio && self.audio.el === el) { self.audio.playing = false; self.audio.pos = self.dur(k, l); self.paint(); } });
      el.addEventListener('error', function () { if (self.audio && self.audio.el === el) self.audio.el = null; });
      this.render(st);
    }
    var au = this.audio;
    au.playing = !au.playing;
    if (au.el) { if (au.playing) { var p = au.el.play(); if (p && p.catch) p.catch(function () { au.el = null; }); } else au.el.pause(); }
    this.paint();
  };
  P.stopAudio = function () { if (this.audio) { this.audio.playing = false; if (this.audio.el) { this.audio.el.pause(); } } this.audio = null; };
  P.paint = function () {
    var a = this.audio, st = this.top(); if (!a || st.v !== 'work') return;
    var el = st.el.querySelector('.pa-player[data-l="' + a.l + '"]'); if (!el) return;
    var d = this.dur(a.w, a.l);
    el.querySelector('.pa-bar i').style.width = Math.min(100, a.pos / d * 100) + '%';
    el.querySelector('.pa-cur').textContent = mmss(a.pos);
    el.querySelector('.pa-pb').innerHTML = ic(a.playing ? 'pause' : 'play', 24);
  };
  P.tick = function () {
    var a = this.audio; if (!a || !a.playing) return;
    if (this.top().v !== 'work') return;
    var d = this.dur(a.w, a.l);
    if (a.el) a.pos = a.el.currentTime; else { a.pos += 0.25; if (a.pos >= d) { a.pos = d; a.playing = false; } }
    this.paint();
  };
  P.toast = function (t) {
    var d = document.createElement('div'); d.className = 'pa-toast'; d.textContent = t;
    this.root.appendChild(d); setTimeout(function () { d.classList.add('go'); }, 1400); setTimeout(function () { d.remove(); }, 1900);
  };
  /* a soft pulse on the natural next tap, only after a pause */
  P.clearHint = function () { clearTimeout(this.ht); var h = this.root.querySelectorAll('.pa-hint'); for (var i = 0; i < h.length; i++) h[i].classList.remove('pa-hint'); };
  P.hintLater = function () {
    var self = this; this.clearHint(); this.emit();
    if (this.guided) return;
    this.ht = setTimeout(function () { var st = self.top(); var t = st && st.el.querySelector('[data-next]'); if (t) t.classList.add('pa-hint'); }, self.root.classList.contains('used') ? 3200 : 1200);
  };

  function boot() {
    var ps = document.querySelectorAll('[data-phone]');
    for (var i = 0; i < ps.length; i++) new Phone(ps[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
