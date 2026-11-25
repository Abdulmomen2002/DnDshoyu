(function () {
  "use strict";
  var D = window.DATA;
  D.feats = D.feats || [];
  D.schools.conjuration = { ar: "استدعاء", en: "Conjuration" };
  D.schools.enchantment = { ar: "افتتان", en: "Enchantment" };
  D.schools.necromancy = { ar: "استحضار الأرواح", en: "Necromancy" };

  var KINDS = ["spells", "classes", "races", "backgrounds", "feats", "equipment"];
  var BASE = {};
  KINDS.forEach(function (k) { BASE[k] = (D[k] || []).slice(); });
  var IMP = emptyImp();
  var CUS = emptyImp();
  var CHARACTERS = [];
  var persistOk = true;
  function emptyImp() { var o = {}; KINDS.forEach(function (k) { o[k] = []; }); return o; }
  function mergeImp() { KINDS.forEach(function (k) { D[k] = BASE[k].concat(IMP[k], CUS[k]); }); }

  /* ---------- UI strings ---------- */
  var UI = {
    ar: {
      searchPh: "ابحث في الموسوعة…",       navHome: "الرئيسية", navCharacter: "الشخصية", navSheet: "ورقة الشخصية", navRules: "القواعد", navTools: "الأدوات",
      navClasses: "الفئات", navRaces: "الأعراق", navBackgrounds: "الخلفيات", navFeats: "الإنجازات", navSpells: "التعويذات", navEquipment: "العتاد", navImport: "استيراد الملفات",
      footer: "Shoyu|D&D — موسوعة D&D 5e", langBtn: "English",
      home: "الرئيسية", classes: "الفئات", races: "الأعراق", backgrounds: "الخلفيات", feats: "الإنجازات", spells: "التعويذات", equipment: "العتاد", import: "استيراد الملفات",
      sections: "الأقسام", count: "عنصر", all: "الكل", level: "المستوى", school: "المدرسة", cls: "الفئة", name: "الاسم",
      cantrip: "حيلة", levelN: "المستوى ", castTime: "زمن الإلقاء", range: "المدى", components: "المكونات", duration: "المدة",
      higher: "على مستويات أعلى", classesList: "الفئات", hitDie: "نرد الحياة", primary: "السمة الأساسية", saves: "إنقاذات",
      armor: "الدروع", weapons: "الأسلحة", features: "المزايا", size: "الحجم", speed: "السرعة", asi: "زيادات السمات",
      languages: "اللغات", traits: "السمات", skills: "المهارات", tools: "الأدوات", feature: "الميزة", type: "النوع",
      cost: "السعر", weight: "الوزن", damage: "الضرر", props: "الخصائص", ac: "فئة الدرع", strReq: "القوة المطلوبة", stealth: "التخفّي",
      description: "الوصف", noResults: "لا توجد نتائج.", searchResults: "نتائج البحث عن: ", filterPh: "فلترة بالاسم…", notFound: "الصفحة غير موجودة.",
      prerequisite: "المتطلب", proficiency: "الإتقان", spellAbility: "سمة التعويذات", slots: "خانات التعويذات", optional: "اختياري", ritual: "طقس",
      subclasses: "التخصصات الفرعية", subclass: "التخصص الفرعي", subclassDesc: "شرح التخصص", subclassFeatures: "ميزات التخصص", addSubclass: "إضافة تخصص", addSubclassFeature: "إضافة ميزة",
      characters: "شخصياتي", newCharacter: "إنشاء شخصية", characterName: "اسم الشخصية", playerName: "اسم اللاعب", characterLevel: "المستوى", race: "العرق", background: "الخلفية",
      alignment: "المحاذاة", experience: "نقاط الخبرة", abilities: "السمات", strength: "القوة", dexterity: "الرشاقة", constitution: "البنية", intelligence: "الذكاء", wisdom: "الحكمة", charisma: "الكاريزما",
      proficiencyBonus: "مكافأة الإتقان", savingThrows: "إنقاذات", skillProficient: "متقن", expertise: "إتقان مضاعف", hitPoints: "نقاط الحياة", currentHp: "الحالية", maxHp: "القصوى",
      armorClass: "فئة الدرع", initiative: "المبادرة", speed: "السرعة", hitDice: "نرد الحياة", inspiration: "إلهام", equipmentNotes: "العتاد والملاحظات", saveCharacter: "حفظ الشخصية",
      deleteCharacter: "حذف الشخصية", print: "طباعة", characterSaved: "تم حفظ الشخصية.", confirmDeleteCharacter: "هل تريد حذف هذه الشخصية؟", selectClass: "اختر الفئة",
      backupExport: "تصدير نسخة احتياطية", backupImport: "استيراد نسخة احتياطية", backupIntro: "تتضمن النسخة الاحتياطية المحتوى المستورد والمضاف يدويًا وجميع أوراق الشخصيات. عند الاستيراد تُدمج العناصر الجديدة وتُتخطى العناصر ذات المعرّفات الموجودة دون استبدال بياناتك.",
      backupInvalid: "ملف النسخة الاحتياطية غير صالح أو غير مدعوم.", backupDone: "اكتمل الاستيراد. العناصر الموجودة مسبقًا لم تُستبدل.",
      saveFailed: "تعذّر حفظ البيانات في المتصفح.",
      backupSaveError: "تعذّر حفظ النسخة المستوردة. تحقق من مساحة التخزين في المتصفح.",
      skill_acrobatics: "الأكروبات", skill_animal: "التعامل مع الحيوانات", skill_arcana: "المعرفة السحرية", skill_athletics: "الرياضة البدنية",
      skill_deception: "الخداع", skill_history: "التاريخ", skill_insight: "الحدس", skill_intimidation: "الترهيب", skill_investigation: "التحقيق",
      skill_medicine: "الطب", skill_nature: "الطبيعة", skill_perception: "الإدراك", skill_performance: "الأداء", skill_persuasion: "الإقناع",
      skill_religion: "الدين", skill_sleight: "خفة اليد", skill_stealth: "التخفّي", skill_survival: "البقاء",
      importIntro: "اختر ملفات XML من جهازك (بصيغة compendium مثل Classes.xml وRaces.xml وFeats.xml وBackgrounds.xml وملفات التعويذات). تُقرأ الملفات داخل متصفحك وتُحفظ فيه فقط ولا تُرفع إلى أي مكان.",
      importDrop: "اسحب الملفات هنا أو اخترها:", importStored: "المحتوى المستورد المحفوظ", importClear: "حذف كل المحتوى المستورد",
      importAdded: "أُضيف", importDup: "مكرر تم تخطيه", importSkipped: "غير مدعوم", importErr: "تعذّرت قراءة الملف (XML غير صالح)",
      importNoStore: "تنبيه: لا يستطيع المتصفح حفظ البيانات هنا، وستختفي عند إغلاق الصفحة.", importEmpty: "لا يوجد محتوى مستورد بعد.",
      translateBtn: "ترجم النص إلى العربية", translateNote: "الحقول المنظّمة مترجمة تلقائيًا. النصوص الطويلة تُترجم آليًا بمترجم المتصفح (Chrome 138+ أو Edge).",
      noTranslator: "مترجم المتصفح غير متاح هنا. استخدم خيار «ترجمة إلى العربية» من قائمة المتصفح (كليك يمين).",
      translating: "جارٍ الترجمة…", translated: "تمت الترجمة (ترجمة آلية، قد تحتاج مراجعة).", importHome: "استورد ملفاتك لإضافة محتوى للموقع.",
      navAdd: "إضافة محتوى", add: "إضافة محتوى", addNew: "إضافة", addTitle: "إضافة", editTitle: "تعديل", save: "حفظ", cancel: "إلغاء", del: "حذف", edit: "تعديل",
      delConfirm: "هل تريد حذف هذا العنصر نهائيًا؟", addRow: "إضافة صف", nameReq: "الاسم مطلوب.", chooseKind: "اختر نوع العنصر الذي تريد إضافته. يُحفظ في متصفحك ويمكنك تعديله أو حذفه لاحقًا.",
      summary: "وصف مختصر", dmgType: "نوع الضرر", custom: "مضاف من قبلك",
      k1_races: "عرق", k1_classes: "فئة", k1_backgrounds: "خلفية", k1_feats: "إنجاز", k1_spells: "تعويذة", k1_equipment: "عتاد"
    },
    en: {
      searchPh: "Search the wiki…",       navHome: "Home", navCharacter: "Character", navSheet: "Character Sheets", navRules: "Rules", navTools: "Tools",
      navClasses: "Classes", navRaces: "Races", navBackgrounds: "Backgrounds", navFeats: "Feats", navSpells: "Spells", navEquipment: "Equipment", navImport: "Import files",
      footer: "Shoyu|D&D — D&D 5e wiki", langBtn: "العربية",
      home: "Home", classes: "Classes", races: "Races", backgrounds: "Backgrounds", feats: "Feats", spells: "Spells", equipment: "Equipment", import: "Import files",
      sections: "Sections", count: "entries", all: "All", level: "Level", school: "School", cls: "Class", name: "Name",
      cantrip: "Cantrip", levelN: "Level ", castTime: "Casting Time", range: "Range", components: "Components", duration: "Duration",
      higher: "At Higher Levels", classesList: "Classes", hitDie: "Hit Die", primary: "Primary Ability", saves: "Saving Throws",
      armor: "Armor", weapons: "Weapons", features: "Features", size: "Size", speed: "Speed", asi: "Ability Scores",
      languages: "Languages", traits: "Traits", skills: "Skills", tools: "Tools", feature: "Feature", type: "Type",
      cost: "Cost", weight: "Weight", damage: "Damage", props: "Properties", ac: "AC", strReq: "Strength", stealth: "Stealth",
      description: "Description", noResults: "No results.", searchResults: "Search results for: ", filterPh: "Filter by name…", notFound: "Page not found.",
      prerequisite: "Prerequisite", proficiency: "Proficiencies", spellAbility: "Spellcasting Ability", slots: "Spell Slots", optional: "optional", ritual: "Ritual",
      subclasses: "Subclasses", subclass: "Subclass", subclassDesc: "Subclass description", subclassFeatures: "Subclass features", addSubclass: "Add subclass", addSubclassFeature: "Add feature",
      characters: "My characters", newCharacter: "Create character", characterName: "Character name", playerName: "Player name", characterLevel: "Level", race: "Race", background: "Background",
      alignment: "Alignment", experience: "Experience points", abilities: "Ability scores", strength: "Strength", dexterity: "Dexterity", constitution: "Constitution", intelligence: "Intelligence", wisdom: "Wisdom", charisma: "Charisma",
      proficiencyBonus: "Proficiency bonus", savingThrows: "Saving throws", skillProficient: "Proficient", expertise: "Expertise", hitPoints: "Hit points", currentHp: "Current", maxHp: "Maximum",
      armorClass: "Armor class", initiative: "Initiative", speed: "Speed", hitDice: "Hit dice", inspiration: "Inspiration", equipmentNotes: "Equipment and notes", saveCharacter: "Save character",
      deleteCharacter: "Delete character", print: "Print", characterSaved: "Character saved.", confirmDeleteCharacter: "Delete this character?", selectClass: "Choose class",
      backupExport: "Export backup", backupImport: "Import backup", backupIntro: "The backup includes imported content, manually added content, and all character sheets. Import merges new items and skips existing IDs without replacing your data.",
      backupInvalid: "The backup file is invalid or unsupported.", backupDone: "Import complete. Existing items were not replaced.",
      saveFailed: "Could not save data in this browser.",
      backupSaveError: "Could not save the imported backup. Check available browser storage.",
      skill_acrobatics: "Acrobatics", skill_animal: "Animal Handling", skill_arcana: "Arcana", skill_athletics: "Athletics",
      skill_deception: "Deception", skill_history: "History", skill_insight: "Insight", skill_intimidation: "Intimidation", skill_investigation: "Investigation",
      skill_medicine: "Medicine", skill_nature: "Nature", skill_perception: "Perception", skill_performance: "Performance", skill_persuasion: "Persuasion",
      skill_religion: "Religion", skill_sleight: "Sleight of Hand", skill_stealth: "Stealth", skill_survival: "Survival",
      importIntro: "Choose XML files from your computer (compendium format: Classes.xml, Races.xml, Feats.xml, Backgrounds.xml, spell files). Files are read and stored in your browser only; nothing is uploaded.",
      importDrop: "Drop files here or choose:", importStored: "Stored imported content", importClear: "Delete all imported content",
      importAdded: "added", importDup: "duplicates skipped", importSkipped: "unsupported", importErr: "Could not read the file (invalid XML)",
      importNoStore: "Warning: the browser cannot store data here; it will vanish when the page closes.", importEmpty: "Nothing imported yet.",
      translateBtn: "Translate text to Arabic", translateNote: "", noTranslator: "Browser translator unavailable.", translating: "Translating…", translated: "Done (machine translation).", importHome: "Import your files to add content.",
      navAdd: "Add content", add: "Add content", addNew: "Add", addTitle: "Add", editTitle: "Edit", save: "Save", cancel: "Cancel", del: "Delete", edit: "Edit",
      delConfirm: "Delete this entry permanently?", addRow: "Add row", nameReq: "Name is required.", chooseKind: "Choose what to add. It is stored in your browser and can be edited or deleted later.",
      summary: "Short summary", dmgType: "Damage type", custom: "Added by you",
      k1_races: "Race", k1_classes: "Class", k1_backgrounds: "Background", k1_feats: "Feat", k1_spells: "Spell", k1_equipment: "Equipment"
    }
  };

  var lang = "ar", theme = "light";
  try { lang = localStorage.getItem("lang") || "ar"; theme = localStorage.getItem("theme") || "light"; } catch (e) {}

  /* ---------- Arabic glossary for structured fields ---------- */
  var DICT = [];
  [
    ["Bonus Action", "إجراء إضافي"], ["Action", "إجراء"], ["Reaction", "رد فعل"],
    ["Minutes", "دقائق"], ["Minute", "دقيقة"], ["Hours", "ساعات"], ["Hour", "ساعة"], ["Days", "أيام"], ["Day", "يوم"], ["Rounds", "جولات"], ["Round", "جولة"],
    ["Instantaneous", "فوري"], ["Concentration", "تركيز"], ["up to", "حتى"], ["Until dispelled", "حتى الإبطال"], ["Special", "خاص"],
    ["Self", "الذات"], ["Touch", "اللمس"], ["Sight", "خط النظر"], ["Unlimited", "غير محدود"],
    ["feet", "قدم"], ["foot", "قدم"], ["ft", "قدم"], ["miles", "أميال"], ["mile", "ميل"],
    ["radius", "نصف قطر"], ["cone", "مخروط"], ["cube", "مكعب"], ["hemisphere", "نصف كرة"], ["sphere", "كرة"], ["cylinder", "أسطوانة"], ["line", "خط"],
    ["Strength", "القوة"], ["Dexterity", "الرشاقة"], ["Constitution", "البنية"], ["Intelligence", "الذكاء"], ["Wisdom", "الحكمة"], ["Charisma", "الكاريزما"],
    ["Acrobatics", "الأكروبات"], ["Animal Handling", "التعامل مع الحيوانات"], ["Arcana", "المعرفة السحرية"], ["Athletics", "الرياضة البدنية"],
    ["Deception", "الخداع"], ["History", "التاريخ"], ["Insight", "الحدس"], ["Intimidation", "الترهيب"], ["Investigation", "التحقيق"],
    ["Medicine", "الطب"], ["Nature", "الطبيعة"], ["Perception", "الإدراك"], ["Performance", "الأداء"], ["Persuasion", "الإقناع"],
    ["Religion", "الدين"], ["Sleight of Hand", "خفة اليد"], ["Stealth", "التخفّي"], ["Survival", "البقاء"],
    ["Tiny", "صغير جدًا"], ["Small", "صغير"], ["Medium", "متوسط"], ["Large", "كبير"], ["Huge", "ضخم"], ["Gargantuan", "هائل"]
  ].forEach(function (p) { DICT.push([new RegExp("\\b" + p[0] + "\\b", "gi"), p[1]]); });
  [["Str", "القوة"], ["Dex", "الرشاقة"], ["Con", "البنية"], ["Int", "الذكاء"], ["Wis", "الحكمة"], ["Cha", "الكاريزما"], ["All", "الكل"]]
    .forEach(function (p) { DICT.push([new RegExp("\\b" + p[0] + "\\b", "g"), p[1]]); });

  function trSimple(s) {
    s = String(s == null ? "" : s);
    if (lang !== "ar") return s;
    for (var i = 0; i < DICT.length; i++) s = s.replace(DICT[i][0], DICT[i][1]);
    return s;
  }

  function ui(k) { return (UI[lang] && UI[lang][k]) || UI.en[k] || k; }
  function t(o) { if (o == null) return ""; if (typeof o === "string") return o; return o[lang] || o.en || ""; }
  function tv(o) { return typeof o === "string" ? trSimple(o) : t(o); }
  function SEP() { return lang === "ar" ? "، " : ", "; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function byId(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }
  function norm(s) { return String(s || "").toLowerCase().replace(/[ً-ْـ]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه"); }
  function hit(q, o) {
    var n = norm(q);
    if (typeof o === "string") return norm(o).indexOf(n) !== -1;
    return !!o && (norm(o[lang]).indexOf(n) !== -1 || norm(o.en).indexOf(n) !== -1 || norm(o.ar).indexOf(n) !== -1);
  }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }

  var $content = document.getElementById("content");
  var $search = document.getElementById("globalSearch");
  var $sidebar = document.getElementById("sidebar");

  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("data-theme", theme);
    document.title = t(D.world.name);
    document.getElementById("brandName").textContent = t(D.world.name);
    document.getElementById("langBtn").textContent = ui("langBtn");
    $search.placeholder = ui("searchPh");
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) els[i].textContent = ui(els[i].getAttribute("data-i18n"));
  }

  /* ---------- render helpers ---------- */
  function link(kind, o) { return '<a href="#/' + kind + "/" + esc(o.id) + '">' + esc(t(o.name)) + "</a>"; }
  function levelLabel(n) { return n === 0 ? ui("cantrip") : ui("levelN") + n; }
  function en(s, imp) { return imp ? '<span lang="en" dir="auto">' + esc(s) + "</span>" : esc(s); }
  function prose(o, imp) {
    var s = t(o); if (!s) return "";
    return s.split(/\n\n+/).map(function (p) { return "<p" + (imp ? ' lang="en" dir="auto"' : "") + ">" + esc(p) + "</p>"; }).join("");
  }
  function dl(rows) {
    return '<div class="statblock"><dl>' + rows.filter(function (r) { return r[1] !== "" && r[1] != null; })
      .map(function (r) { return "<dt>" + esc(r[0]) + "</dt><dd>" + r[1] + "</dd>"; }).join("") + "</dl></div>";
  }
  function crumbs(listKey, name) {
    return '<div class="crumbs"><a href="#/">' + esc(ui("home")) + '</a> / <a href="#/' + listKey + '">' + esc(ui(listKey)) + "</a>" + (name ? " / " + esc(name) : "") + "</div>";
  }
  function cardGrid(kind, arr) {
    return '<div class="grid">' + arr.map(function (o) {
      return '<a class="card" href="#/' + kind + "/" + esc(o.id) + '"><h3>' + esc(t(o.name)) + "</h3><p>" + esc(tv(o.summary)) + "</p></a>";
    }).join("") + "</div>";
  }
  function setNav(key) {
    var as = $sidebar.querySelectorAll("a");
    for (var i = 0; i < as.length; i++) as[i].classList.toggle("active", as[i].getAttribute("data-nav") === key);
    $sidebar.classList.remove("open");
  }
  function cap(s) { return String(s).replace(/-/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); }); }
  function classLinks(ids) {
    return ids.map(function (id) { var c = byId(D.classes, id); return c ? link("class", c) : esc(cap(id)); }).join(SEP());
  }
  function translateBox(o) {
    if (!o || !o.imp || lang !== "ar") return "";
    return '<div class="notice"><button id="trBtn" class="btn small">' + esc(ui("translateBtn")) + '</button> <span id="trStatus" class="muted">' + esc(ui("translateNote")) + "</span></div>";
  }

  /* ---------- pages ---------- */
  function pageHome() {
    var keys = ["classes", "races", "backgrounds", "feats", "spells", "equipment"];
    var cnt = function (k) { return k === "equipment" ? D.equipment.length : D[k].length; };
    var imported = KINDS.reduce(function (n, k) { return n + IMP[k].length; }, 0);
    return '<div class="hero"><h1>' + esc(t(D.world.name)) + '</h1><p class="prose">' + esc(t(D.world.tagline)) + "</p>" +
      (imported ? "" : '<p class="muted">' + esc(ui("importHome")) + ' <a href="#/import">' + esc(ui("import")) + "</a></p>") + "</div>" +
      "<h2>" + esc(ui("sections")) + '</h2><div class="grid">' + keys.map(function (k) {
        return '<a class="card" href="#/' + k + '"><h3>' + esc(ui(k)) + "</h3><p>" + cnt(k) + " " + esc(ui("count")) + "</p></a>";
      }).join("") + '<a class="card" href="#/import"><h3>' + esc(ui("import")) + "</h3><p>" + imported + " " + esc(ui("count")) + "</p></a></div>";
  }

  /* spells */
  var spellState = { q: "", level: "", school: "", cls: "" };
  function pageSpells() {
    var schoolOpts = '<option value="">' + esc(ui("school")) + ": " + esc(ui("all")) + "</option>" + Object.keys(D.schools).map(function (k) {
      return '<option value="' + k + '"' + (spellState.school === k ? " selected" : "") + ">" + esc(t(D.schools[k])) + "</option>"; }).join("");
    var levelOpts = '<option value="">' + esc(ui("level")) + ": " + esc(ui("all")) + "</option>" + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) {
      return '<option value="' + n + '"' + (spellState.level === String(n) ? " selected" : "") + ">" + esc(levelLabel(n)) + "</option>"; }).join("");
    var clsOpts = '<option value="">' + esc(ui("cls")) + ": " + esc(ui("all")) + "</option>" + D.classes.map(function (c) {
      return '<option value="' + esc(c.id) + '"' + (spellState.cls === c.id ? " selected" : "") + ">" + esc(t(c.name)) + "</option>"; }).join("");
    return crumbs("spells") + "<h1>" + esc(ui("spells")) + "</h1>" + addBtn("spells") +
      '<div class="filters"><input id="fq" type="search" value="' + esc(spellState.q) + '" placeholder="' + esc(ui("filterPh")) + '">' +
      '<select id="fl">' + levelOpts + '</select><select id="fs">' + schoolOpts + '</select><select id="fc">' + clsOpts + "</select></div>" +
      '<div id="spellTable"></div>';
  }
  function renderSpellTable() {
    var s = spellState;
    var rows = D.spells.filter(function (sp) {
      return (!s.q || hit(s.q, sp.name)) && (s.level === "" || String(sp.level) === s.level) &&
        (!s.school || sp.school === s.school) && (!s.cls || sp.classes.indexOf(s.cls) !== -1);
    }).sort(function (a, b) { return a.level - b.level || t(a.name).localeCompare(t(b.name), lang); });
    var el = document.getElementById("spellTable");
    if (!el) return;
    if (!rows.length) { el.innerHTML = '<div class="empty">' + esc(ui("noResults")) + "</div>"; return; }
    el.innerHTML = '<div class="table-wrap"><table><thead><tr><th>' + esc(ui("name")) + "</th><th>" + esc(ui("level")) + "</th><th>" + esc(ui("school")) +
      "</th><th>" + esc(ui("castTime")) + "</th><th>" + esc(ui("classesList")) + "</th></tr></thead><tbody>" +
      rows.map(function (sp) {
        return "<tr><td>" + link("spell", sp) + "</td><td>" + esc(levelLabel(sp.level)) + "</td><td>" + esc(t(D.schools[sp.school])) +
          "</td><td>" + esc(tv(sp.castTime)) + "</td><td>" + classLinks(sp.classes) + "</td></tr>";
      }).join("") + "</tbody></table></div>";
  }
  function bindSpells() {
    var map = { fq: "q", fl: "level", fs: "school", fc: "cls" };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener("input", function () { spellState[map[id]] = el.value; renderSpellTable(); });
    });
    renderSpellTable();
  }
  function pageSpell(id) {
    var sp = byId(D.spells, id); if (!sp) return pageNotFound();
    return crumbs("spells", t(sp.name)) + "<h1>" + esc(t(sp.name)) + "</h1>" +
      '<p class="muted">' + esc(levelLabel(sp.level)) + " — " + esc(t(D.schools[sp.school])) + (sp.ritual ? " (" + esc(ui("ritual")) + ")" : "") + "</p>" +
      customBar("spells", sp) + translateBox(sp) +
      dl([[ui("castTime"), esc(tv(sp.castTime))], [ui("range"), esc(tv(sp.range))], [ui("components"), esc(sp.components)],
        [ui("duration"), esc(tv(sp.duration))], [ui("classesList"), classLinks(sp.classes)]]) +
      '<div class="prose">' + prose(sp.desc, sp.imp) + (sp.higher ? "<p><strong>" + esc(ui("higher")) + ".</strong> " + esc(t(sp.higher)) + "</p>" : "") + "</div>";
  }

  /* generic card lists (classes / races / backgrounds) */
  var CARD_KIND = { classes: "class", races: "race", backgrounds: "background" };
  var cardState = { classes: "", races: "", backgrounds: "" };
  function pageCards(key) {
    return crumbs(key) + "<h1>" + esc(ui(key)) + "</h1>" + addBtn(key) + '<div class="filters"><input id="cq" type="search" value="' + esc(cardState[key]) +
      '" placeholder="' + esc(ui("filterPh")) + '"></div><div id="cardBox"></div>';
  }
  function bindCards(key) {
    var inp = document.getElementById("cq"), box = document.getElementById("cardBox");
    function draw() {
      var q = cardState[key];
      var arr = D[key].filter(function (o) { return !q || hit(q, o.name); });
      box.innerHTML = arr.length ? cardGrid(CARD_KIND[key], arr) : '<div class="empty">' + esc(ui("noResults")) + "</div>";
    }
    inp.addEventListener("input", function () { cardState[key] = inp.value; draw(); });
    draw();
  }

  function featureBlocks(list, imp, showLevel) {
    return (list || []).map(function (f) {
      return '<div class="feature"><h4>' + en(t(f.name), imp) +
        (showLevel && f.level != null ? ' <span class="tag">' + esc(ui("level")) + " " + f.level + "</span>" : "") +
        (f.optional ? ' <span class="tag">' + esc(ui("optional")) + "</span>" : "") +
        "</h4><div>" + prose(f.desc, imp) + "</div></div>";
    }).join("");
  }
  function subclassBlocks(list, imp) {
    return (list || []).map(function (s) {
      var features = (s.features || []).slice().sort(function (a, b) { return (a.level || 0) - (b.level || 0); });
      return '<section class="subclass-block"><h3>' + esc(t(s.name)) + "</h3>" +
        (s.summary ? '<p class="muted">' + esc(tv(s.summary)) + "</p>" : "") +
        '<div class="prose">' + prose(s.desc, imp) + "</div>" +
        (features.length ? "<h4>" + esc(ui("subclassFeatures")) + "</h4>" + featureBlocks(features, imp, true) : "") + "</section>";
    }).join("");
  }

  function pageClass(id) {
    var c = byId(D.classes, id); if (!c) return pageNotFound();
    var spells = D.spells.filter(function (s) { return s.classes.indexOf(c.id) !== -1; });
    var feats = (c.features || []).slice().sort(function (a, b) { return (a.level || 0) - (b.level || 0); });
    var slotsHtml = "";
    if (c.slots && c.slots.length) {
      slotsHtml = "<h2>" + esc(ui("slots")) + '</h2><div class="table-wrap"><table><thead><tr><th>' + esc(ui("level")) + "</th><th>" + esc(ui("slots")) + "</th></tr></thead><tbody>" +
        c.slots.map(function (s) { return "<tr><td>" + s.level + "</td><td>" + esc(s.slots) + "</td></tr>"; }).join("") + "</tbody></table></div>";
    }
    return crumbs("classes", t(c.name)) + "<h1>" + esc(t(c.name)) + '</h1><p class="muted">' + esc(c.imp ? "" : tv(c.summary)) + "</p>" + customBar("classes", c) + translateBox(c) +
      dl([[ui("hitDie"), esc(c.hitDie)], [ui("primary"), esc(tv(c.primary))], [ui("saves"), esc(tv(c.saves))],
        [ui("armor"), esc(tv(c.armor))], [ui("weapons"), esc(tv(c.weapons))], [ui("proficiency"), esc(tv(c.prof))], [ui("spellAbility"), esc(tv(c.spellAbility))]]) +
      slotsHtml + (feats.length ? "<h2>" + esc(ui("features")) + "</h2>" + featureBlocks(feats, c.imp, true) : "") +
      ((c.subclasses || []).length ? "<h2>" + esc(ui("subclasses")) + "</h2>" + subclassBlocks(c.subclasses, c.imp) : "") +
      (spells.length ? "<h2>" + esc(ui("spells")) + "</h2><p>" + spells.map(function (s) { return link("spell", s); }).join(SEP()) + "</p>" : "");
  }

  function pageRace(id) {
    var r = byId(D.races, id); if (!r) return pageNotFound();
    return crumbs("races", t(r.name)) + "<h1>" + esc(t(r.name)) + '</h1><p class="muted">' + esc(r.imp ? "" : tv(r.summary)) + "</p>" + customBar("races", r) + translateBox(r) +
      dl([[ui("asi"), esc(tv(r.asi))], [ui("size"), esc(tv(r.size))], [ui("speed"), esc(tv(r.speed))], [ui("languages"), esc(tv(r.languages))], [ui("proficiency"), esc(tv(r.prof))]]) +
      "<h2>" + esc(ui("traits")) + "</h2>" + featureBlocks(r.traits, r.imp, false);
  }

  function pageBackground(id) {
    var b = byId(D.backgrounds, id); if (!b) return pageNotFound();
    var body = b.traits ? "<h2>" + esc(ui("traits")) + "</h2>" + featureBlocks(b.traits, b.imp, false)
      : "<h2>" + esc(ui("feature")) + "</h2>" + featureBlocks([b.feature], false, false);
    return crumbs("backgrounds", t(b.name)) + "<h1>" + esc(t(b.name)) + '</h1><p class="muted">' + esc(b.imp ? "" : tv(b.summary)) + "</p>" + customBar("backgrounds", b) + translateBox(b) +
      dl([[ui("skills"), esc(tv(b.skills || b.prof))], [ui("tools"), esc(tv(b.tools))], [ui("languages"), esc(tv(b.languages))]]) + body;
  }

  /* feats */
  var featState = "";
  function pageFeats() {
    return crumbs("feats") + "<h1>" + esc(ui("feats")) + "</h1>" + addBtn("feats") + '<div class="filters"><input id="ftq" type="search" value="' + esc(featState) +
      '" placeholder="' + esc(ui("filterPh")) + '"></div><div id="featBox"></div>';
  }
  function bindFeats() {
    var inp = document.getElementById("ftq"), box = document.getElementById("featBox");
    function draw() {
      var arr = D.feats.filter(function (o) { return !featState || hit(featState, o.name); }).sort(function (a, b) { return t(a.name).localeCompare(t(b.name), "en"); });
      box.innerHTML = arr.length ? '<div class="table-wrap"><table><thead><tr><th>' + esc(ui("name")) + "</th><th>" + esc(ui("prerequisite")) + "</th></tr></thead><tbody>" +
        arr.map(function (f) { return "<tr><td>" + link("feat", f) + "</td><td>" + esc(tv(f.prereq)) + "</td></tr>"; }).join("") + "</tbody></table></div>"
        : '<div class="empty">' + esc(ui("noResults")) + "</div>";
    }
    inp.addEventListener("input", function () { featState = inp.value; draw(); });
    draw();
  }
  function pageFeat(id) {
    var f = byId(D.feats, id); if (!f) return pageNotFound();
    return crumbs("feats", t(f.name)) + "<h1>" + esc(t(f.name)) + "</h1>" + customBar("feats", f) + translateBox(f) +
      dl([[ui("prerequisite"), esc(tv(f.prereq))]]) + '<div class="prose">' + prose(f.desc, f.imp) + "</div>";
  }

  /* equipment */
  var eqState = { q: "", type: "" };
  function pageEquipment() {
    var typeOpts = '<option value="">' + esc(ui("type")) + ": " + esc(ui("all")) + "</option>" + Object.keys(D.itemTypes).map(function (k) {
      return '<option value="' + k + '"' + (eqState.type === k ? " selected" : "") + ">" + esc(t(D.itemTypes[k])) + "</option>"; }).join("");
    return crumbs("equipment") + "<h1>" + esc(ui("equipment")) + "</h1>" + addBtn("equipment") +
      '<div class="filters"><input id="eq" type="search" value="' + esc(eqState.q) + '" placeholder="' + esc(ui("filterPh")) + '"><select id="et">' + typeOpts + "</select></div>" +
      '<div id="eqTables"></div>';
  }
  function eqTable(type, items) {
    var head, row;
    if (type === "weapon") {
      head = [ui("name"), ui("damage"), ui("props"), ui("cost"), ui("weight")];
      row = function (i) { return [link("item", i), esc(i.damage + " " + t(i.dmgType)), esc(t(i.props)), esc(i.cost), esc(i.weight)]; };
    } else if (type === "armor") {
      head = [ui("name"), ui("ac"), ui("strReq"), ui("stealth"), ui("cost"), ui("weight")];
      row = function (i) { return [link("item", i), esc(i.ac), esc(i.strReq), esc(t(i.stealth)), esc(i.cost), esc(i.weight)]; };
    } else {
      head = [ui("name"), ui("description"), ui("cost"), ui("weight")];
      row = function (i) { return [link("item", i), esc(t(i.desc)), esc(i.cost), esc(i.weight)]; };
    }
    return "<h2>" + esc(t(D.itemTypes[type])) + '</h2><div class="table-wrap"><table><thead><tr>' + head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
      "</tr></thead><tbody>" + items.map(function (i) { return "<tr>" + row(i).map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
  }
  function renderEq() {
    var el = document.getElementById("eqTables"); if (!el) return;
    var out = "";
    Object.keys(D.itemTypes).forEach(function (type) {
      if (eqState.type && eqState.type !== type) return;
      var items = D.equipment.filter(function (i) { return i.type === type && (!eqState.q || hit(eqState.q, i.name)); });
      if (items.length) out += eqTable(type, items);
    });
    el.innerHTML = out || '<div class="empty">' + esc(ui("noResults")) + "</div>";
  }
  function bindEq() {
    var q = document.getElementById("eq"), ty = document.getElementById("et");
    if (q) q.addEventListener("input", function () { eqState.q = q.value; renderEq(); });
    if (ty) ty.addEventListener("input", function () { eqState.type = ty.value; renderEq(); });
    renderEq();
  }
  function pageItem(id) {
    var i = byId(D.equipment, id); if (!i) return pageNotFound();
    var rows = [[ui("type"), esc(t(D.itemTypes[i.type]))], [ui("cost"), esc(i.cost)], [ui("weight"), esc(i.weight)]];
    if (i.type === "weapon") rows.push([ui("damage"), esc(i.damage + " " + t(i.dmgType))], [ui("props"), esc(t(i.props))]);
    if (i.type === "armor") rows.push([ui("ac"), esc(i.ac)], [ui("strReq"), esc(i.strReq)], [ui("stealth"), esc(t(i.stealth))]);
    return crumbs("equipment", t(i.name)) + "<h1>" + esc(t(i.name)) + "</h1>" + customBar("equipment", i) + dl(rows) + '<div class="prose">' + prose(i.desc, false) + "</div>";
  }

  /* search */
  function pageSearch(q) {
    var groups = [["spells", "spell", D.spells], ["classes", "class", D.classes], ["races", "race", D.races], ["backgrounds", "background", D.backgrounds],
      ["feats", "feat", D.feats], ["equipment", "item", D.equipment]];
    var out = "", total = 0;
    groups.forEach(function (g) {
      var res = g[2].filter(function (o) { return hit(q, o.name) || (o.summary && hit(q, o.summary)) || (o.desc && hit(q, o.desc)); });
      if (!res.length) return;
      total += res.length;
      out += "<h2>" + esc(ui(g[0])) + " (" + res.length + ")</h2><p>" + res.slice(0, 100).map(function (o) { return link(g[1], o); }).join(SEP()) + "</p>";
    });
    return "<h1>" + esc(ui("searchResults")) + esc(q) + "</h1>" + (total ? out : '<div class="empty">' + esc(ui("noResults")) + "</div>");
  }

  function pageNotFound() { return '<div class="empty">' + esc(ui("notFound")) + '<p><a href="#/">' + esc(ui("home")) + "</a></p></div>"; }

  /* ---------- storage (IndexedDB) ---------- */
  function idb() {
    return new Promise(function (res, rej) {
      try {
        var r = indexedDB.open("shoyu-dnd", 1);
        r.onupgradeneeded = function () { r.result.createObjectStore("kv"); };
        r.onsuccess = function () { res(r.result); };
        r.onerror = function () { rej(r.error); };
      } catch (e) { rej(e); }
    });
  }
  function idbGet(k) {
    return idb().then(function (db) {
      return new Promise(function (res, rej) {
        var q = db.transaction("kv").objectStore("kv").get(k);
        q.onsuccess = function () { res(q.result); };
        q.onerror = function () { rej(q.error); };
      });
    });
  }
  function idbSet(k, v) {
    return idb().then(function (db) {
      return new Promise(function (res, rej) {
        var tx = db.transaction("kv", "readwrite");
        tx.objectStore("kv").put(v, k);
        tx.oncomplete = function () { res(); };
        tx.onerror = function () { rej(tx.error); };
      });
    });
  }
  function persist() { return idbSet("imp", IMP).catch(function () { persistOk = false; }); }

  /* ---------- XML import (compendium format) ---------- */
  function child(el, tag) { for (var c = el.firstElementChild; c; c = c.nextElementSibling) if (c.tagName === tag) return c; return null; }
  function children(el, tag) { var o = []; for (var c = el.firstElementChild; c; c = c.nextElementSibling) if (c.tagName === tag) o.push(c); return o; }
  function ctext(el, tag) { var c = child(el, tag); return c ? c.textContent.replace(/\s+/g, " ").trim() : ""; }
  function paras(el) {
    var o = [];
    children(el, "text").forEach(function (x) { var s = x.textContent.replace(/[ \t]+/g, " ").trim(); if (s) o.push(s); });
    return o.join("\n\n");
  }
  var SCHOOL = { A: "abjuration", C: "conjuration", D: "divination", EN: "enchantment", EV: "evocation", I: "illusion", N: "necromancy", T: "transmutation" };
  var SIZE = { T: "Tiny", S: "Small", M: "Medium", L: "Large", H: "Huge", G: "Gargantuan" };

  function parseSpell(el) {
    var name = ctext(el, "name"); if (!name) return null;
    var classes = [];
    ctext(el, "classes").split(",").forEach(function (c) {
      var base = slug(c.replace(/\(.*\)/, "")); if (base && classes.indexOf(base) === -1) classes.push(base);
    });
    return { id: "i-" + slug(name), imp: true, name: name, level: parseInt(ctext(el, "level"), 10) || 0, school: SCHOOL[ctext(el, "school")] || "evocation",
      ritual: ctext(el, "ritual") === "YES", castTime: ctext(el, "time"), range: ctext(el, "range"), components: ctext(el, "components"),
      duration: ctext(el, "duration"), classes: classes, desc: paras(el) };
  }
  function parseClass(el) {
    var name = ctext(el, "name"); if (!name) return null;
    var hd = ctext(el, "hd"), features = [], slots = [];
    children(el, "autolevel").forEach(function (al) {
      var lvl = parseInt(al.getAttribute("level"), 10) || 0;
      var sl = ctext(al, "slots"); if (sl) slots.push({ level: lvl, slots: sl });
      children(al, "feature").forEach(function (f) {
        var fn = ctext(f, "name"); if (!fn) return;
        features.push({ level: lvl, name: fn, desc: paras(f), optional: f.getAttribute("optional") === "YES" });
      });
    });
    slots.sort(function (a, b) { return a.level - b.level; });
    var sa = ctext(el, "spellAbility");
    return { id: slug(name), imp: true, name: name, hitDie: hd ? "d" + hd : "", prof: ctext(el, "proficiency"), spellAbility: sa,
      summary: (hd ? "d" + hd : "") + (sa ? " • " + sa : ""), features: features, slots: slots };
  }
  function parseTraits(el) {
    return children(el, "trait").map(function (tr) { return { name: ctext(tr, "name"), desc: paras(tr) }; }).filter(function (x) { return x.name; });
  }
  function parseRace(el) {
    var name = ctext(el, "name"); if (!name) return null;
    var size = SIZE[ctext(el, "size")] || ctext(el, "size"), sp = ctext(el, "speed");
    if (/^\d+$/.test(sp)) sp += " ft";
    return { id: "i-" + slug(name), imp: true, name: name, size: size, speed: sp, asi: ctext(el, "ability"), prof: ctext(el, "proficiency"),
      summary: size + (sp ? " • " + sp : ""), traits: parseTraits(el) };
  }
  function parseBackground(el) {
    var name = ctext(el, "name"); if (!name) return null;
    return { id: "i-" + slug(name), imp: true, name: name, prof: ctext(el, "proficiency"), summary: ctext(el, "proficiency"), traits: parseTraits(el) };
  }
  function parseFeat(el) {
    var name = ctext(el, "name"); if (!name) return null;
    return { id: "i-" + slug(name), imp: true, name: name, prereq: ctext(el, "prerequisite"), desc: paras(el) };
  }
  var PARSERS = { spell: ["spells", parseSpell], "class": ["classes", parseClass], race: ["races", parseRace], background: ["backgrounds", parseBackground], feat: ["feats", parseFeat] };

  function importText(text) {
    var doc = new DOMParser().parseFromString(text, "application/xml");
    if (doc.getElementsByTagName("parsererror").length || !doc.documentElement) throw new Error("xml");
    var rep = { added: {}, dup: 0, skipped: 0 };
    Array.prototype.forEach.call(doc.documentElement.children, function (el) {
      var p = PARSERS[el.tagName];
      if (!p) { rep.skipped++; return; }
      var obj = p[1](el); if (!obj) return;
      var list = IMP[p[0]];
      if (byId(list, obj.id)) { rep.dup++; return; }
      list.push(obj);
      rep.added[p[0]] = (rep.added[p[0]] || 0) + 1;
    });
    return rep;
  }

  function importCountsHtml() {
    var total = KINDS.reduce(function (n, k) { return n + IMP[k].length; }, 0);
    if (!total) return '<div class="empty">' + esc(ui("importEmpty")) + "</div>";
    return '<div class="table-wrap"><table><tbody>' + KINDS.map(function (k) {
      return "<tr><td>" + esc(ui(k)) + "</td><td>" + IMP[k].length + "</td></tr>";
    }).join("") + '</tbody></table></div><p><button id="clearBtn" class="btn small">' + esc(ui("importClear")) + "</button></p>";
  }
  function pageImport() {
    return crumbs("import") + "<h1>" + esc(ui("import")) + '</h1><div class="notice">' + esc(ui("importIntro")) + "</div>" +
      (persistOk ? "" : '<div class="notice warn">' + esc(ui("importNoStore")) + "</div>") +
      '<div id="drop" class="dropzone"><p>' + esc(ui("importDrop")) + '</p><input id="fileIn" type="file" multiple accept=".xml,text/xml,application/xml"></div>' +
      '<div id="impLog"></div><h2>' + esc(ui("backupExport")) + "</h2><p>" + esc(ui("backupIntro")) + '</p>' +
      '<button id="exportBtn" type="button" class="btn">' + esc(ui("backupExport")) + '</button> <label class="btn" for="backupIn">' + esc(ui("backupImport")) +
      '</label> <input id="backupIn" type="file" accept=".json,application/json" hidden><div id="backupStatus" aria-live="polite"></div>' +
      '<h2>' + esc(ui("importStored")) + '</h2><div id="impCounts">' + importCountsHtml() + "</div>";
  }
  function makeBackup() {
    return { format: "shoyu-dnd-backup", version: 1, exportedAt: new Date().toISOString(),
      imported: IMP, custom: CUS, characters: CHARACTERS };
  }
  function validBackup(data) {
    if (!data || data.format !== "shoyu-dnd-backup" || data.version !== 1 ||
        !data.imported || !data.custom || !Array.isArray(data.characters)) return false;
    for (var i = 0; i < KINDS.length; i++) {
      var kind = KINDS[i];
      if (!Array.isArray(data.imported[kind]) || !Array.isArray(data.custom[kind])) return false;
      var lists = [data.imported[kind], data.custom[kind]];
      for (var j = 0; j < lists.length; j++) {
        for (var n = 0; n < lists[j].length; n++) {
          var item = lists[j][n];
          if (!item || typeof item !== "object" || Array.isArray(item) || typeof item.id !== "string" || !item.id) return false;
          if (kind === "classes" && (!Array.isArray(item.features) || !item.features.every(function (f) {
            return f && typeof f === "object";
          }) || (item.subclasses != null && (!Array.isArray(item.subclasses) || !item.subclasses.every(function (s) {
            return s && typeof s === "object" && Array.isArray(s.features) && s.features.every(function (f) {
              return f && typeof f === "object";
            });
          }))))) return false;
          if (kind === "spells" && !Array.isArray(item.classes)) return false;
          if (kind === "races" && (!Array.isArray(item.traits) || !item.traits.every(function (trait) {
            return trait && typeof trait === "object";
          }))) return false;
          if (kind === "backgrounds" && ((!Array.isArray(item.traits) || !item.traits.every(function (trait) {
            return trait && typeof trait === "object";
          })) && (!item.feature || typeof item.feature !== "object"))) return false;
        }
      }
    }
    return data.characters.every(function (c) { return c && typeof c.id === "string" && typeof c.name === "string"; });
  }
  function exportBackup() {
    var blob = new Blob([JSON.stringify(makeBackup(), null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url;
    a.download = "shoyu-dnd-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function importBackup(file) {
    var status = document.getElementById("backupStatus");
    file.text().then(function (text) {
      var data;
      try { data = JSON.parse(text); } catch (e) { throw new Error("invalid"); }
      if (!validBackup(data)) throw new Error("invalid");
      KINDS.forEach(function (kind) {
        [ ["imported", IMP], ["custom", CUS] ].forEach(function (pair) {
          data[pair[0]][kind].forEach(function (item) {
            if (!byId(BASE[kind], item.id) && !byId(IMP[kind], item.id) && !byId(CUS[kind], item.id)) pair[1][kind].push(item);
          });
        });
      });
      data.characters.forEach(function (c) {
        if (!CHARACTERS.some(function (existing) { return existing.id === c.id; })) CHARACTERS.push(c);
      });
      return Promise.all([idbSet("imp", IMP), idbSet("cus", CUS), idbSet("characters", CHARACTERS)]);
    }).then(function () {
      mergeImp();
      status.className = "notice";
      status.textContent = ui("backupDone");
      refreshCounts();
    }).catch(function (e) {
      status.className = "notice warn";
      status.textContent = e.message === "invalid" ? ui("backupInvalid") : ui("backupSaveError");
    });
  }
  function refreshCounts() {
    var box = document.getElementById("impCounts"); if (!box) return;
    box.innerHTML = importCountsHtml();
    bindClear();
  }
  function bindClear() {
    var b = document.getElementById("clearBtn");
    if (b) b.addEventListener("click", function () { IMP = emptyImp(); mergeImp(); persist().then(refreshCounts); refreshCounts(); });
  }
  function handleFiles(files) {
    var log = document.getElementById("impLog"), lines = [], chain = Promise.resolve();
    Array.prototype.forEach.call(files, function (f) {
      chain = chain.then(function () { return f.text(); }).then(function (text) {
        var r = importText(text);
        var parts = Object.keys(r.added).map(function (k) { return ui(k) + ": " + r.added[k]; });
        if (r.dup) parts.push(ui("importDup") + ": " + r.dup);
        if (r.skipped) parts.push(ui("importSkipped") + ": " + r.skipped);
        lines.push(f.name + " — " + (parts.length ? parts.join(SEP()) : "0"));
      }).catch(function () { lines.push(f.name + " — " + ui("importErr")); });
    });
    chain.then(persist).then(function () {
      mergeImp();
      if (log) log.innerHTML = '<div class="notice">' + lines.map(esc).join("<br>") + "</div>";
      refreshCounts();
    });
  }
  function bindImport() {
    var inp = document.getElementById("fileIn"), drop = document.getElementById("drop");
    inp.addEventListener("change", function () { handleFiles(inp.files); inp.value = ""; });
    ["dragover", "dragenter"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("over"); }); });
    ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("over"); }); });
    drop.addEventListener("drop", function (e) { if (e.dataTransfer && e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); });
    document.getElementById("exportBtn").addEventListener("click", exportBackup);
    document.getElementById("backupIn").addEventListener("change", function () {
      if (this.files && this.files[0]) importBackup(this.files[0]);
      this.value = "";
    });
    bindClear();
  }

  /* ---------- custom entries: add / edit / delete ---------- */
  var DETAIL = { spells: "spell", classes: "class", races: "race", backgrounds: "background", feats: "feat", equipment: "item" };
  function persistCus() { return idbSet("cus", CUS).catch(function () { persistOk = false; }); }
  function fld(key, label, type, extra) {
    var o = { key: key, label: label, type: type || "text" };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  var nameF = function () { return fld("name", "name"); };
  var traitCols = [["name", "name", "text"], ["desc", "description", "area"]];
  var F = {
    races: [nameF(), fld("summary", "summary", "area"), fld("size", "size"), fld("speed", "speed"), fld("asi", "asi"), fld("languages", "languages"),
      fld("prof", "proficiency"), fld("traits", "traits", "rows", { cols: traitCols })],
    classes: [nameF(), fld("summary", "summary", "area"), fld("hitDie", "hitDie"), fld("primary", "primary"), fld("saves", "saves"), fld("armor", "armor"),
      fld("weapons", "weapons"), fld("prof", "proficiency"), fld("spellAbility", "spellAbility"),
      fld("features", "features", "rows", { cols: [["level", "level", "num"], ["name", "name", "text"], ["desc", "description", "area"]] }),
      fld("subclasses", "subclasses", "subclasses")],
    backgrounds: [nameF(), fld("summary", "summary", "area"), fld("skills", "skills"), fld("tools", "tools"), fld("languages", "languages"),
      fld("traits", "traits", "rows", { cols: traitCols })],
    feats: [nameF(), fld("prereq", "prerequisite"), fld("desc", "description", "area")],
    spells: [nameF(),
      fld("level", "level", "select", { opts: function () { return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) { return [String(n), levelLabel(n)]; }); } }),
      fld("school", "school", "select", { opts: function () { return Object.keys(D.schools).map(function (k) { return [k, t(D.schools[k])]; }); } }),
      fld("ritual", "ritual", "check"), fld("castTime", "castTime"), fld("range", "range"), fld("components", "components"), fld("duration", "duration"),
      fld("classes", "classesList", "classes"), fld("desc", "description", "area"), fld("higher", "higher", "area")],
    equipment: [
      fld("type", "type", "select", { opts: function () { return Object.keys(D.itemTypes).map(function (k) { return [k, t(D.itemTypes[k])]; }); } }),
      nameF(), fld("cost", "cost"), fld("weight", "weight"),
      fld("damage", "damage", "text", { only: ["weapon"] }), fld("dmgType", "dmgType", "text", { only: ["weapon"] }), fld("props", "props", "text", { only: ["weapon"] }),
      fld("ac", "ac", "text", { only: ["armor"] }), fld("strReq", "strReq", "text", { only: ["armor"] }), fld("stealth", "stealth", "text", { only: ["armor"] }),
      fld("desc", "description", "area")]
  };

  function rowHtml(f, r) {
    r = r || {};
    return '<div class="rowitem">' + f.cols.map(function (c) {
      var v = r[c[0]] == null ? "" : r[c[0]], ph = esc(ui(c[1]));
      return c[2] === "area" ? '<textarea data-k="' + c[0] + '" rows="3" placeholder="' + ph + '">' + esc(v) + "</textarea>"
        : '<input data-k="' + c[0] + '" type="' + (c[2] === "num" ? "number" : "text") + '" placeholder="' + ph + '" value="' + esc(v) + '">';
    }).join("") + '<button type="button" class="btn small rm">×</button></div>';
  }
  function subclassHtml(s) {
    s = s || {};
    var features = s.features && s.features.length ? s.features : [{}];
    return '<div class="subclass-card"><div class="rowitem"><input data-sub="name" type="text" placeholder="' + esc(ui("subclass")) + '" value="' + esc(t(s.name)) +
      '"><button type="button" class="btn small remove-subclass">×</button></div>' +
      '<div class="field"><label>' + esc(ui("summary")) + '</label><input data-sub="summary" type="text" value="' + esc(t(s.summary)) + '"></div>' +
      '<div class="field"><label>' + esc(ui("subclassDesc")) + '</label><textarea data-sub="desc" rows="3">' + esc(t(s.desc)) + '</textarea></div>' +
      '<strong>' + esc(ui("subclassFeatures")) + '</strong>' + features.map(function (f) {
        return '<div class="subfeature-row"><input data-feature="level" type="number" min="1" max="20" placeholder="' + esc(ui("level")) + '" value="' + esc(f.level || "") +
          '"><input data-feature="name" type="text" placeholder="' + esc(ui("name")) + '" value="' + esc(t(f.name)) + '">' +
          '<textarea data-feature="desc" rows="2" placeholder="' + esc(ui("description")) + '">' + esc(t(f.desc)) + '</textarea><button type="button" class="btn small remove-subfeature">×</button></div>';
      }).join("") + '<button type="button" class="btn small add-subfeature">+ ' + esc(ui("addSubclassFeature")) + "</button></div>";
  }
  function fieldHtml(f, val) {
    var id = "f_" + f.key, label = '<label for="' + id + '">' + esc(ui(f.label)) + "</label>";
    function wrap(inner) { return '<div class="field"' + (f.only ? ' data-only="' + f.only.join(",") + '"' : "") + ">" + inner + "</div>"; }
    if (f.type === "area") return wrap(label + '<textarea id="' + id + '" rows="4">' + esc(val || "") + "</textarea>");
    if (f.type === "select") return wrap(label + '<select id="' + id + '">' + f.opts().map(function (o) {
      return '<option value="' + esc(o[0]) + '"' + (String(val) === o[0] ? " selected" : "") + ">" + esc(o[1]) + "</option>"; }).join("") + "</select>");
    if (f.type === "check") return wrap('<label><input type="checkbox" id="' + id + '"' + (val ? " checked" : "") + "> " + esc(ui(f.label)) + "</label>");
    if (f.type === "classes") return wrap(label + '<div id="' + id + '" class="checks">' + D.classes.map(function (c) {
      return '<label class="chk"><input type="checkbox" value="' + esc(c.id) + '"' + ((val || []).indexOf(c.id) !== -1 ? " checked" : "") + "> " + esc(t(c.name)) + "</label>"; }).join("") + "</div>");
    if (f.type === "rows") return wrap(label + '<div id="' + id + '" class="rowsbox">' + (val || []).map(function (r) { return rowHtml(f, r); }).join("") +
      '</div><button type="button" class="btn small addrow" data-key="' + f.key + '">+ ' + esc(ui("addRow")) + "</button>");
    if (f.type === "subclasses") return wrap(label + '<div id="' + id + '" class="subclasses-editor">' + (val || []).map(subclassHtml).join("") +
      '</div><button type="button" class="btn small add-subclass">+ ' + esc(ui("addSubclass")) + "</button>");
    return wrap(label + '<input id="' + id + '" type="text" value="' + esc(val == null ? "" : val) + '">');
  }
  function fixParas(s) { return s.replace(/\r?\n+/g, "\n\n"); }

  function pageAdd(kind, id) {
    if (!F[kind]) {
      return crumbs("add") + "<h1>" + esc(ui("add")) + '</h1><p class="muted">' + esc(ui("chooseKind")) + '</p><div class="grid">' + Object.keys(F).map(function (k) {
        return '<a class="card" href="#/add/' + k + '"><h3>' + esc(ui("k1_" + k)) + "</h3><p>" + esc(ui(k)) + " (" + CUS[k].length + ")</p></a>";
      }).join("") + "</div>";
    }
    var obj = id ? byId(CUS[kind], id) : null;
    if (id && !obj) return pageNotFound();
    return crumbs("add") + "<h1>" + esc(ui(obj ? "editTitle" : "addTitle")) + ": " + esc(ui("k1_" + kind)) + '</h1><form id="addForm">' +
      F[kind].map(function (f) { return fieldHtml(f, obj ? obj[f.key] : (f.type === "rows" ? [{}] : (f.type === "subclasses" ? [] : ""))); }).join("") +
      '<p><button class="btn" type="submit">' + esc(ui("save")) + '</button> <a class="btn" href="#/' + (obj ? DETAIL[kind] + "/" + obj.id : kind) + '">' + esc(ui("cancel")) + "</a></p></form>";
  }
  function readForm(kind) {
    var o = {};
    F[kind].forEach(function (f) {
      var el = document.getElementById("f_" + f.key);
      if (f.type === "check") o[f.key] = el.checked;
      else if (f.type === "classes") o[f.key] = Array.prototype.map.call(el.querySelectorAll("input:checked"), function (i) { return i.value; });
      else if (f.type === "rows") o[f.key] = Array.prototype.map.call(el.querySelectorAll(".rowitem"), function (row) {
        var r = {};
        f.cols.forEach(function (c) {
          var v = row.querySelector('[data-k="' + c[0] + '"]').value.trim();
          r[c[0]] = c[2] === "num" ? (parseInt(v, 10) || 1) : (c[2] === "area" ? fixParas(v) : v);
        });
        return r;
      }).filter(function (r) { return r.name; });
      else if (f.type === "subclasses") o[f.key] = Array.prototype.map.call(el.querySelectorAll(".subclass-card"), function (card) {
        var s = {};
        Array.prototype.forEach.call(card.querySelectorAll("[data-sub]"), function (input) { s[input.getAttribute("data-sub")] = input.value.trim(); });
        s.features = Array.prototype.map.call(card.querySelectorAll(".subfeature-row"), function (row) {
          return {
            level: Math.max(1, parseInt(row.querySelector('[data-feature="level"]').value, 10) || 1),
            name: row.querySelector('[data-feature="name"]').value.trim(),
            desc: fixParas(row.querySelector('[data-feature="desc"]').value.trim())
          };
        }).filter(function (feature) { return feature.name; });
        return s;
      }).filter(function (s) { return s.name; });
      else { var v = el.value.trim(); o[f.key] = f.type === "area" ? fixParas(v) : v; }
    });
    if (kind === "spells") o.level = parseInt(o.level, 10) || 0;
    return o;
  }
  function bindAdd(kind, id) {
    var form = document.getElementById("addForm"); if (!form) return;
    var typeSel = document.getElementById("f_type");
    function toggle() {
      var v = typeSel ? typeSel.value : "";
      Array.prototype.forEach.call(form.querySelectorAll("[data-only]"), function (d) {
        d.style.display = d.getAttribute("data-only").split(",").indexOf(v) !== -1 ? "" : "none";
      });
    }
    if (typeSel) typeSel.addEventListener("change", toggle);
    toggle();
    form.addEventListener("click", function (e) {
      var add = e.target.closest ? e.target.closest(".addrow") : null, rm = e.target.closest ? e.target.closest(".rm") : null;
      var addSubclass = e.target.closest ? e.target.closest(".add-subclass") : null;
      var addFeature = e.target.closest ? e.target.closest(".add-subfeature") : null;
      var removeSubclass = e.target.closest ? e.target.closest(".remove-subclass") : null;
      var removeFeature = e.target.closest ? e.target.closest(".remove-subfeature") : null;
      if (addSubclass) {
        document.getElementById("f_subclasses").insertAdjacentHTML("beforeend", subclassHtml({ features: [{}] }));
      } else if (addFeature) {
        addFeature.insertAdjacentHTML("beforebegin", '<div class="subfeature-row"><input data-feature="level" type="number" min="1" max="20" placeholder="' + esc(ui("level")) +
          '"><input data-feature="name" type="text" placeholder="' + esc(ui("name")) + '"><textarea data-feature="desc" rows="2" placeholder="' + esc(ui("description")) +
          '"></textarea><button type="button" class="btn small remove-subfeature">×</button></div>');
      } else if (removeSubclass) {
        removeSubclass.parentNode.parentNode.parentNode.removeChild(removeSubclass.parentNode.parentNode);
      } else if (removeFeature) {
        removeFeature.parentNode.parentNode.removeChild(removeFeature.parentNode);
      } else if (add) {
        var key = add.getAttribute("data-key"), f = null;
        F[kind].forEach(function (x) { if (x.key === key) f = x; });
        document.getElementById("f_" + key).insertAdjacentHTML("beforeend", rowHtml(f, {}));
      } else if (rm) { rm.parentNode.parentNode.removeChild(rm.parentNode); }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var o = readForm(kind);
      if (!o.name) { alert(ui("nameReq")); return; }
      o.custom = true;
      o.id = id || "c-" + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36);
      var list = CUS[kind], idx = -1;
      for (var i = 0; i < list.length; i++) if (list[i].id === o.id) idx = i;
      if (idx > -1) list[idx] = o; else list.push(o);
      persistCus().then(function () { mergeImp(); location.hash = "#/" + DETAIL[kind] + "/" + o.id; });
    });
  }
  function customBar(kind, o) {
    if (!o || !o.custom) return "";
    return '<div class="notice"><span class="tag">' + esc(ui("custom")) + '</span> <a class="btn small" href="#/add/' + kind + "/" + esc(o.id) + '">' + esc(ui("edit")) +
      '</a> <button type="button" id="delBtn" class="btn small" data-kind="' + kind + '" data-id="' + esc(o.id) + '">' + esc(ui("del")) + "</button></div>";
  }
  function bindCustomBar() {
    var b = document.getElementById("delBtn"); if (!b) return;
    b.addEventListener("click", function () {
      if (!confirm(ui("delConfirm"))) return;
      var kind = b.getAttribute("data-kind"), id = b.getAttribute("data-id");
      CUS[kind] = CUS[kind].filter(function (x) { return x.id !== id; });
      persistCus().then(function () { mergeImp(); location.hash = "#/" + kind; });
    });
  }
  function addBtn(kind) { return '<p><a class="btn small" href="#/add/' + kind + '">+ ' + esc(ui("addNew")) + "</a></p>"; }

  /* ---------- character sheets ---------- */
  var ABILITIES = [
    ["strength", "strength"], ["dexterity", "dexterity"], ["constitution", "constitution"],
    ["intelligence", "intelligence"], ["wisdom", "wisdom"], ["charisma", "charisma"]
  ];
  var SKILLS = [
    ["acrobatics", "skill_acrobatics", "dexterity"], ["animal", "skill_animal", "wisdom"],
    ["arcana", "skill_arcana", "intelligence"], ["athletics", "skill_athletics", "strength"],
    ["deception", "skill_deception", "charisma"], ["history", "skill_history", "intelligence"],
    ["insight", "skill_insight", "wisdom"], ["intimidation", "skill_intimidation", "charisma"],
    ["investigation", "skill_investigation", "intelligence"], ["medicine", "skill_medicine", "wisdom"],
    ["nature", "skill_nature", "intelligence"], ["perception", "skill_perception", "wisdom"],
    ["performance", "skill_performance", "charisma"], ["persuasion", "skill_persuasion", "charisma"],
    ["religion", "skill_religion", "intelligence"], ["sleight", "skill_sleight", "dexterity"],
    ["stealth", "skill_stealth", "dexterity"], ["survival", "skill_survival", "wisdom"]
  ];
  function newCharacter() {
    var stats = {}, skills = {}, saves = {};
    ABILITIES.forEach(function (a) { stats[a[0]] = 10; saves[a[0]] = false; });
    SKILLS.forEach(function (s) { skills[s[0]] = { proficient: false, expertise: false }; });
    return { name: "", player: "", classId: "", subclass: "", raceId: "", backgroundId: "", level: 1, alignment: "",
      experience: 0, stats: stats, skills: skills, saves: saves, proficiencyBonus: 2, hp: 0, maxHp: 0, armorClass: 10,
      initiative: 0, speed: "", hitDice: "", inspiration: false, notes: "" };
  }
  function selectedOptions(kind, selected, title) {
    var data = D[kind] || [];
    return '<option value="">' + esc(ui(title)) + "</option>" + data.map(function (item) {
      return '<option value="' + esc(item.id) + '"' + (item.id === selected ? " selected" : "") + ">" + esc(t(item.name)) + "</option>";
    }).join("");
  }
  function characterField(id, key, type, value, min, max) {
    return '<div class="field"><label for="' + id + '">' + esc(ui(key)) + '</label><input id="' + id + '" type="' + type +
      '" value="' + esc(value == null ? "" : value) + '"' + (min == null ? "" : ' min="' + min + '"') +
      (max == null ? "" : ' max="' + max + '"') + "></div>";
  }
  function characterForm(character, id) {
    var c = character || newCharacter(), stats = c.stats || {}, skills = c.skills || {}, saves = c.saves || {};
    var identity = '<form id="characterForm"><div class="character-grid">' +
      characterField("ch_name", "characterName", "text", c.name) + characterField("ch_player", "playerName", "text", c.player) +
      '<div class="field"><label for="ch_class">' + esc(ui("classes")) + '</label><select id="ch_class">' + selectedOptions("classes", c.classId, "selectClass") + "</select></div>" +
      characterField("ch_subclass", "subclass", "text", c.subclass) +
      '<div class="field"><label for="ch_race">' + esc(ui("race")) + '</label><select id="ch_race">' + selectedOptions("races", c.raceId, "race") + "</select></div>" +
      '<div class="field"><label for="ch_background">' + esc(ui("background")) + '</label><select id="ch_background">' + selectedOptions("backgrounds", c.backgroundId, "background") + "</select></div>" +
      characterField("ch_level", "characterLevel", "number", c.level, 1, 20) + characterField("ch_alignment", "alignment", "text", c.alignment) +
      characterField("ch_xp", "experience", "number", c.experience, 0) + "</div><h2>" + esc(ui("abilities")) + '</h2><div class="ability-grid">' +
      ABILITIES.map(function (a) { return characterField("stat_" + a[0], a[1], "number", stats[a[0]] == null ? 10 : stats[a[0]], 1, 30); }).join("") +
      characterField("ch_pb", "proficiencyBonus", "number", c.proficiencyBonus, 0, 20) + "</div><h2>" + esc(ui("savingThrows")) +
      '</h2><div class="saving-grid">' + ABILITIES.map(function (a) {
        return '<label class="chk"><input type="checkbox" data-save="' + a[0] + '"' + (saves[a[0]] ? " checked" : "") + "> " +
          esc(ui(a[1])) + ' <strong data-save-mod="' + a[0] + '"></strong></label>';
      }).join("") + "</div><h2>" + esc(ui("skills")) + '</h2><p class="muted">' + esc(ui("skillProficient")) + " / " + esc(ui("expertise")) +
      '</p><div class="skill-grid">' + SKILLS.map(function (s) {
        var entry = skills[s[0]] || {};
        return '<div class="skill-row"><span>' + esc(ui(s[1])) + '</span><label class="chk"><input type="checkbox" data-skill="' + s[0] +
          '" data-kind="proficient"' + (entry.proficient ? " checked" : "") + "> " + esc(ui("skillProficient")) +
          '</label><label class="chk"><input type="checkbox" data-skill="' + s[0] + '" data-kind="expertise"' + (entry.expertise ? " checked" : "") +
          '> ' + esc(ui("expertise")) + '</label><strong data-skill-mod="' + s[0] + '"></strong></div>';
      }).join("") + "</div><h2>" + esc(ui("hitPoints")) + '</h2><div class="character-grid">' +
      characterField("ch_hp", "currentHp", "number", c.hp, 0) + characterField("ch_maxhp", "maxHp", "number", c.maxHp, 0) +
      characterField("ch_ac", "armorClass", "number", c.armorClass, 0) + characterField("ch_init", "initiative", "number", c.initiative) +
      characterField("ch_speed", "speed", "text", c.speed) + characterField("ch_hitdice", "hitDice", "text", c.hitDice) +
      '</div><div class="field"><label class="chk"><input id="ch_inspiration" type="checkbox"' + (c.inspiration ? " checked" : "") +
      "> " + esc(ui("inspiration")) + '</label></div><div class="field"><label for="ch_notes">' + esc(ui("equipmentNotes")) +
      '</label><textarea id="ch_notes" rows="5">' + esc(c.notes || "") + '</textarea></div><p><button class="btn" type="submit">' + esc(ui("saveCharacter")) +
      '</button> <button class="btn" type="button" id="printCharacter">' + esc(ui("print")) + "</button> " +
      (id ? '<button class="btn" type="button" id="deleteCharacter">' + esc(ui("deleteCharacter")) + "</button> " : "") +
      '<span id="characterStatus" class="muted" aria-live="polite"></span></p></form>';
    return identity;
  }
  function pageCharacters(id) {
    if (id === "new") return crumbs("characters") + "<h1>" + esc(ui("newCharacter")) + "</h1>" + characterForm(newCharacter(), "");
    if (id) {
      var c = CHARACTERS.filter(function (item) { return item.id === id; })[0];
      return c ? crumbs("characters", esc(c.name)) + "<h1>" + esc(c.name) + "</h1>" + characterForm(c, id) : pageNotFound();
    }
    return crumbs("characters") + "<h1>" + esc(ui("characters")) + '</h1><p><a class="btn small" href="#/characters/new">+ ' + esc(ui("newCharacter")) +
      '</a></p>' + (CHARACTERS.length ? '<div class="grid">' + CHARACTERS.map(function (item) {
        var cls = byId(D.classes, item.classId), race = byId(D.races, item.raceId);
        return '<a class="card" href="#/characters/' + esc(item.id) + '"><h3>' + esc(item.name) + '</h3><p>' + esc(ui("characterLevel")) + " " +
          esc(item.level) + (cls ? " · " + esc(t(cls.name)) : "") + (race ? " · " + esc(t(race.name)) : "") + "</p></a>";
      }).join("") + "</div>" : '<div class="empty">' + esc(ui("importEmpty")) + "</div>");
  }
  function abilityModifier(score) { return Math.floor(((parseInt(score, 10) || 0) - 10) / 2); }
  function signed(n) { return (n >= 0 ? "+" : "") + n; }
  function updateCharacterMath(form) {
    var pb = parseInt(form.querySelector("#ch_pb").value, 10) || 0;
    ABILITIES.forEach(function (a) {
      var score = parseInt(form.querySelector("#stat_" + a[0]).value, 10) || 0;
      var save = form.querySelector('[data-save-mod="' + a[0] + '"]');
      save.textContent = signed(abilityModifier(score) + (form.querySelector('[data-save="' + a[0] + '"]').checked ? pb : 0));
    });
    SKILLS.forEach(function (s) {
      var entry = form.querySelectorAll('[data-skill="' + s[0] + '"]');
      var proficient = entry[0].checked || entry[1].checked, expert = entry[1].checked;
      var mod = abilityModifier(form.querySelector("#stat_" + s[2]).value) + (proficient ? pb * (expert ? 2 : 1) : 0);
      form.querySelector('[data-skill-mod="' + s[0] + '"]').textContent = signed(mod);
    });
  }
  function bindCharacter(id) {
    var form = document.getElementById("characterForm");
    if (!form) return;
    form.addEventListener("input", function () { updateCharacterMath(form); });
    form.addEventListener("change", function (event) {
      var target = event.target;
      if (target.matches('[data-skill][data-kind="expertise"]') && target.checked) {
        form.querySelector('[data-skill="' + target.getAttribute("data-skill") + '"][data-kind="proficient"]').checked = true;
      }
      updateCharacterMath(form);
    });
    updateCharacterMath(form);
    document.getElementById("printCharacter").addEventListener("click", function () { window.print(); });
    var del = document.getElementById("deleteCharacter");
    if (del) del.addEventListener("click", function () {
      if (!confirm(ui("confirmDeleteCharacter"))) return;
      CHARACTERS = CHARACTERS.filter(function (item) { return item.id !== id; });
      idbSet("characters", CHARACTERS).then(function () { location.hash = "#/characters"; }).catch(function () {
        document.getElementById("characterStatus").textContent = ui("saveFailed");
      });
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var character = newCharacter(), name = document.getElementById("ch_name").value.trim();
      if (!name) {
        document.getElementById("ch_name").focus();
        return;
      }
      character.id = id || ("ch-" + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36));
      character.name = name;
      character.player = document.getElementById("ch_player").value.trim();
      character.classId = document.getElementById("ch_class").value;
      character.subclass = document.getElementById("ch_subclass").value.trim();
      character.raceId = document.getElementById("ch_race").value;
      character.backgroundId = document.getElementById("ch_background").value;
      character.level = parseInt(document.getElementById("ch_level").value, 10) || 1;
      character.alignment = document.getElementById("ch_alignment").value.trim();
      character.experience = parseInt(document.getElementById("ch_xp").value, 10) || 0;
      ABILITIES.forEach(function (a) {
        character.stats[a[0]] = parseInt(document.getElementById("stat_" + a[0]).value, 10) || 0;
        character.saves[a[0]] = form.querySelector('[data-save="' + a[0] + '"]').checked;
      });
      SKILLS.forEach(function (s) {
        var selected = form.querySelectorAll('[data-skill="' + s[0] + '"]');
        character.skills[s[0]] = { proficient: selected[0].checked || selected[1].checked, expertise: selected[1].checked };
      });
      character.proficiencyBonus = parseInt(document.getElementById("ch_pb").value, 10) || 0;
      character.hp = parseInt(document.getElementById("ch_hp").value, 10) || 0;
      character.maxHp = parseInt(document.getElementById("ch_maxhp").value, 10) || 0;
      character.armorClass = parseInt(document.getElementById("ch_ac").value, 10) || 0;
      character.initiative = parseInt(document.getElementById("ch_init").value, 10) || 0;
      character.speed = document.getElementById("ch_speed").value.trim();
      character.hitDice = document.getElementById("ch_hitdice").value.trim();
      character.inspiration = document.getElementById("ch_inspiration").checked;
      character.notes = document.getElementById("ch_notes").value.trim();
      var idx = CHARACTERS.findIndex(function (item) { return item.id === character.id; });
      if (idx === -1) CHARACTERS.push(character); else CHARACTERS[idx] = character;
      idbSet("characters", CHARACTERS).then(function () {
        location.hash = "#/characters/" + character.id;
      }).catch(function () { document.getElementById("characterStatus").textContent = ui("saveFailed"); });
    });
  }

  /* ---------- on-page translation (browser Translator API) ---------- */
  var TCACHE = {};
  function bindTranslate() {
    var btn = document.getElementById("trBtn"); if (!btn) return;
    btn.addEventListener("click", function () {
      var status = document.getElementById("trStatus");
      if (typeof Translator === "undefined") { status.textContent = ui("noTranslator"); return; }
      var opts = { sourceLanguage: "en", targetLanguage: "ar" };
      status.textContent = ui("translating");
      Promise.resolve(Translator.availability(opts)).then(function (av) {
        if (av === "unavailable") throw new Error("na");
        return Translator.create(opts);
      }).then(function (tr) {
        var els = Array.prototype.slice.call($content.querySelectorAll('[lang="en"]')), chain = Promise.resolve();
        els.forEach(function (el) {
          chain = chain.then(function () {
            var src = el.textContent;
            if (TCACHE[src]) return TCACHE[src];
            return tr.translate(src).then(function (out) { TCACHE[src] = out; return out; });
          }).then(function (out) { el.textContent = out; el.setAttribute("lang", "ar"); });
        });
        return chain;
      }).then(function () { status.textContent = ui("translated"); })
        .catch(function () { status.textContent = ui("noTranslator"); });
    });
  }

  /* ---------- router ---------- */
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    var qi = h.indexOf("?"), path = qi === -1 ? h : h.slice(0, qi), query = qi === -1 ? "" : h.slice(qi + 1);
    var p = path.split("/").filter(Boolean).map(decodeURIComponent);
    var html, nav = p[0] || "home", after = null;
    var list = {
      spells: [pageSpells, bindSpells],
      classes: [function () { return pageCards("classes"); }, function () { bindCards("classes"); }],
      races: [function () { return pageCards("races"); }, function () { bindCards("races"); }],
      backgrounds: [function () { return pageCards("backgrounds"); }, function () { bindCards("backgrounds"); }],
      feats: [pageFeats, bindFeats], equipment: [pageEquipment, bindEq], "import": [pageImport, bindImport]
    };
    var detail = { spell: [pageSpell, "spells"], "class": [pageClass, "classes"], race: [pageRace, "races"], background: [pageBackground, "backgrounds"],
      feat: [pageFeat, "feats"], item: [pageItem, "equipment"] };

    if (!p.length) html = pageHome();
    else if (p[0] === "characters") {
      html = pageCharacters(p[1]);
      nav = "characters";
      after = function () { bindCharacter(p[1] === "new" ? "" : p[1]); };
    }
    else if (p[0] === "search") {
      var m = /(?:^|&)q=([^&]*)/.exec(query), q = m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
      html = pageSearch(q); nav = "";
    } else if (p[0] === "add") { html = pageAdd(p[1], p[2]); nav = "add"; after = function () { bindAdd(p[1], p[2]); }; }
    else if (list[p[0]] && p.length === 1) { html = list[p[0]][0](); after = list[p[0]][1]; }
    else if (detail[p[0]] && p[1]) { html = detail[p[0]][0](p[1]); nav = detail[p[0]][1]; after = function () { bindTranslate(); bindCustomBar(); }; }
    else { html = pageNotFound(); nav = ""; }

    $content.innerHTML = html;
    if (after) after();
    setNav(nav);
    window.scrollTo(0, 0);
  }

  /* ---------- events ---------- */
  var timer;
  $search.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      var q = $search.value.trim();
      if (q) location.hash = "#/search?q=" + encodeURIComponent(q);
      else if (/^#\/search/.test(location.hash)) location.hash = "#/";
    }, 250);
  });
  document.getElementById("langBtn").addEventListener("click", function () {
    lang = lang === "ar" ? "en" : "ar";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    applyLang(); route();
  });
  document.getElementById("themeBtn").addEventListener("click", function () {
    theme = theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", theme); } catch (e) {}
    applyLang();
  });
  document.getElementById("menuBtn").addEventListener("click", function () { $sidebar.classList.toggle("open"); });
  window.addEventListener("hashchange", route);

  /* ---------- start ---------- */
  applyLang();
  idbGet("imp").then(function (v) {
    if (v) KINDS.forEach(function (k) { IMP[k] = v[k] || []; });
    return idbGet("cus");
  }).then(function (v) {
    if (v) KINDS.forEach(function (k) { CUS[k] = v[k] || []; });
    return idbGet("characters");
  }).then(function (v) {
    if (Array.isArray(v)) CHARACTERS = v;
  }).catch(function () { persistOk = false; }).then(function () {
    mergeImp();
    route();
  });
})();
