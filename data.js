/* محتوى أصلي لعالم "ألدارين" — عدّله أو أضف إليه كما تشاء.
   كل نص له نسختان: ar و en. */
window.DATA = {
  world: {
    name: { ar: "Shoyu|D&D", en: "Shoyu|D&D" },
    tagline: {
      ar: "موسوعة Shoyu|D&D: التعويذات والفئات والأعراق والخلفيات والعتاد.",
      en: "The Shoyu|D&D wiki: spells, classes, races, backgrounds and equipment."
    },
    intro: {
      ar: "ألدارين أرخبيل من الجزر الطافية تربطها جسور من الريح والحجر. هنا تجد القواعد الخاصة بحملتنا.",
      en: "Aldarin is an archipelago of floating isles linked by bridges of wind and stone. Here you will find the rules for our campaign."
    }
  },

  schools: {
    evocation:     { ar: "استحضار", en: "Evocation" },
    abjuration:    { ar: "حماية", en: "Abjuration" },
    divination:    { ar: "كشف", en: "Divination" },
    transmutation: { ar: "تحويل", en: "Transmutation" },
    illusion:      { ar: "وهم", en: "Illusion" }
  },

  itemTypes: {
    weapon: { ar: "سلاح", en: "Weapon" },
    armor:  { ar: "درع", en: "Armor" },
    gear:   { ar: "عتاد", en: "Gear" }
  },

  spells: [
    { id: "gale-lash", name: { ar: "جلدة العاصفة", en: "Gale Lash" }, level: 0, school: "evocation", classes: ["stormcaller"],
      castTime: { ar: "إجراء واحد", en: "1 action" }, range: { ar: "18 متراً", en: "60 feet" },
      components: "V, S", duration: { ar: "فوري", en: "Instantaneous" },
      desc: { ar: "تطلق سوطاً من الريح نحو مخلوق تراه. يقوم الهدف بإنقاذ بالرشاقة وإلا تلقى 1d6 ضرر ريحي ودُفع 1.5 متر بعيداً عنك. يزداد الضرر إلى 2d6 في المستوى 5، و3d6 في المستوى 11.",
              en: "You flick a whip of wind at a creature you can see. The target makes a Dexterity save or takes 1d6 wind damage and is pushed 5 feet away. Damage rises to 2d6 at level 5 and 3d6 at level 11." } },

    { id: "ember-spark", name: { ar: "شرارة الجمر", en: "Ember Spark" }, level: 0, school: "evocation", classes: ["ember-warden"],
      castTime: { ar: "إجراء واحد", en: "1 action" }, range: { ar: "9 أمتار", en: "30 feet" },
      components: "V, S", duration: { ar: "فوري", en: "Instantaneous" },
      desc: { ar: "تقذف جمرة صغيرة نحو هدف. اضرب بهجوم تعويذة عن بعد؛ عند الإصابة يتلقى الهدف 1d8 ضرر نار، ويشتعل أي غرض غير محمول قابل للاحتراق.",
              en: "You hurl a small ember at a target. Make a ranged spell attack; on a hit the target takes 1d8 fire damage, and an unattended flammable object ignites." } },

    { id: "wardlight", name: { ar: "ضوء الحماية", en: "Wardlight" }, level: 1, school: "abjuration", classes: ["ember-warden", "stormcaller"],
      castTime: { ar: "إجراء إضافي", en: "1 bonus action" }, range: { ar: "اللمس", en: "Touch" },
      components: "V, S, M (شمعة صغيرة)", duration: { ar: "تركيز، حتى دقيقة", en: "Concentration, up to 1 minute" },
      desc: { ar: "تلمس حليفاً فيحيط به ضوء دافئ. يحصل على +2 لفئة الدرع ما دام التعويذة فعالة.",
              en: "You touch an ally, wreathing them in warm light. They gain a +2 bonus to AC while the spell lasts." },
      higher: { ar: "عند استخدام خانة مستوى 3 أو أعلى، يصبح بإمكانك لمس حليف إضافي لكل مستويين فوق الأول.",
                en: "When cast with a level 3 or higher slot, you may touch one additional ally for every two slot levels above 1st." } },

    { id: "tide-sense", name: { ar: "حاسة المدّ", en: "Tide Sense" }, level: 1, school: "divination", classes: ["stormcaller", "shade-walker"],
      castTime: { ar: "إجراء واحد (طقس)", en: "1 action (ritual)" }, range: { ar: "الذات", en: "Self" },
      components: "V, S", duration: { ar: "10 دقائق", en: "10 minutes" },
      desc: { ar: "تشعر بتغيّرات الهواء والماء حولك في نطاق 18 متراً، فتعرف اتجاه أي عاصفة قادمة وتكتشف المخلوقات المختبئة في الماء.",
              en: "You feel shifts in air and water within 60 feet, learning the direction of any approaching storm and detecting creatures hidden in water." } },

    { id: "cinder-wall", name: { ar: "جدار الرماد", en: "Cinder Wall" }, level: 2, school: "evocation", classes: ["ember-warden"],
      castTime: { ar: "إجراء واحد", en: "1 action" }, range: { ar: "18 متراً", en: "60 feet" },
      components: "V, S, M (حفنة رماد)", duration: { ar: "تركيز، حتى دقيقة", en: "Concentration, up to 1 minute" },
      desc: { ar: "ينبثق جدار من الجمر طوله 9 أمتار وارتفاعه 3 أمتار. من يدخله أو ينهي دوره قربه يتلقى 3d6 ضرر نار (إنقاذ بالبنية لنصف الضرر).",
              en: "A wall of embers 30 feet long and 10 feet high rises. A creature entering it or ending its turn adjacent takes 3d6 fire damage (Constitution save for half)." } },

    { id: "veil-of-dusk", name: { ar: "حجاب الغسق", en: "Veil of Dusk" }, level: 2, school: "illusion", classes: ["shade-walker"],
      castTime: { ar: "إجراء واحد", en: "1 action" }, range: { ar: "الذات", en: "Self" },
      components: "S", duration: { ar: "تركيز، حتى ساعة", en: "Concentration, up to 1 hour" },
      desc: { ar: "تلتف حولك ظلال خفيفة. تحصل على أفضلية في اختبارات التخفّي، ويصعب على الآخرين تمييز ملامحك بوضوح.",
              en: "Soft shadows wrap around you. You have advantage on Stealth checks and others struggle to make out your features." } },

    { id: "stone-skin-rite", name: { ar: "طقس جلد الحجر", en: "Stoneskin Rite" }, level: 3, school: "transmutation", classes: ["ember-warden", "shade-walker"],
      castTime: { ar: "إجراء واحد", en: "1 action" }, range: { ar: "اللمس", en: "Touch" },
      components: "V, S, M (قطعة جرانيت)", duration: { ar: "تركيز، حتى ساعة", en: "Concentration, up to 1 hour" },
      desc: { ar: "يكتسب المخلوق الملموس مقاومة للضرر القاطع والثاقب والساحق من الهجمات غير السحرية.",
              en: "The touched creature gains resistance to slashing, piercing and bludgeoning damage from nonmagical attacks." } },

    { id: "skybridge", name: { ar: "جسر السماء", en: "Skybridge" }, level: 3, school: "transmutation", classes: ["stormcaller"],
      castTime: { ar: "إجراء واحد", en: "1 action" }, range: { ar: "36 متراً", en: "120 feet" },
      components: "V, S", duration: { ar: "10 دقائق", en: "10 minutes" },
      desc: { ar: "تصنع جسراً من الرياح المتماسكة عرضه 3 أمتار يمتد حتى 36 متراً، يتحمّل وزن 10 مخلوقات متوسطة الحجم. يمكن عبوره كأنه أرض صلبة.",
              en: "You weave a bridge of solid wind 10 feet wide and up to 120 feet long, bearing the weight of ten Medium creatures. It can be crossed as solid ground." } }
  ],

  classes: [
    { id: "stormcaller", name: { ar: "مستدعي العاصفة", en: "Stormcaller" }, hitDie: "d8",
      primary: { ar: "الحكمة", en: "Wisdom" }, saves: { ar: "الرشاقة، الحكمة", en: "Dexterity, Wisdom" },
      armor: { ar: "دروع خفيفة", en: "Light armor" }, weapons: { ar: "العصي، الرماح، الأقواس القصيرة", en: "Quarterstaffs, spears, shortbows" },
      summary: { ar: "ساحر يستمد قوته من رياح الأرخبيل ويتحكم بالطقس.", en: "A caster who draws power from the archipelago winds and bends the weather." },
      features: [
        { level: 1, name: { ar: "قلب العاصفة", en: "Eye of the Storm" }, desc: { ar: "تستطيع كإجراء إضافي أن تحصل على +10 قدم سرعة مشي حتى نهاية دورك، مرات تساوي معدّل الحكمة لديك لكل راحة طويلة.", en: "As a bonus action, gain +10 feet of walking speed until your turn ends, a number of times equal to your Wisdom modifier per long rest." } },
        { level: 2, name: { ar: "همس الريح", en: "Whisper of Wind" }, desc: { ar: "تحمل رسالة قصيرة إلى مخلوق تعرفه في حدود كيلومتر واحد.", en: "You carry a short message to a creature you know within one mile." } },
        { level: 3, name: { ar: "دائرة الرعد", en: "Thunder Circle" }, desc: { ar: "تصبح تعويذاتك الريحية والرعدية تتجاهل مقاومة الضرر مرة واحدة لكل راحة قصيرة.", en: "Your wind and thunder spells ignore damage resistance once per short rest." } }
      ],
      subclasses: [
        { id: "tempest-guide", name: { ar: "مرشد العاصفة", en: "Tempest Guide" }, summary: { ar: "يوجّه رياح الأرخبيل لحماية رفاقه.", en: "Guides the archipelago winds to protect allies." },
          desc: { ar: "يتعلم مرشدو العاصفة قراءة التيارات الهوائية وتسخيرها لفتح الطرق الآمنة.", en: "Tempest Guides read and shape the air currents to open safe paths." },
          features: [
            { level: 3, name: { ar: "ممر الرياح", en: "Windway" }, desc: { ar: "يمكنك توجيه هبة من الرياح لمساعدة حليف قريب على الانسحاب بأمان.", en: "You direct a gust to help a nearby ally withdraw safely." } },
            { level: 6, name: { ar: "عين الإعصار", en: "Eye of the Gale" }, desc: { ar: "تستطيع تثبيت نفسك ورفاقك في مواجهة الرياح العاتية.", en: "You and your allies can hold steady against powerful winds." } }
          ] }
      ] },

    { id: "ember-warden", name: { ar: "حارس الجمر", en: "Ember Warden" }, hitDie: "d10",
      primary: { ar: "البنية", en: "Constitution" }, saves: { ar: "البنية، القوة", en: "Constitution, Strength" },
      armor: { ar: "دروع خفيفة ومتوسطة، الدروع", en: "Light and medium armor, shields" }, weapons: { ar: "الأسلحة البسيطة والحربية", en: "Simple and martial weapons" },
      summary: { ar: "محارب يحمل نار الأفران المقدسة ويحمي رفاقه بلهبه.", en: "A warrior carrying the sacred forge-fire, shielding allies with flame." },
      features: [
        { level: 1, name: { ar: "جلد مُسخَّن", en: "Forged Hide" }, desc: { ar: "عندما لا ترتدي درعاً، فئة درعك 11 + معدّل البنية.", en: "While unarmored, your AC is 11 + your Constitution modifier." } },
        { level: 2, name: { ar: "ضربة متوهجة", en: "Glowing Strike" }, desc: { ar: "مرة في الدور، عند إصابتك بسلاح تضيف 1d6 ضرر نار.", en: "Once per turn, when you hit with a weapon, add 1d6 fire damage." } },
        { level: 3, name: { ar: "نذر الأتون", en: "Vow of the Furnace" }, desc: { ar: "كرد فعل، تمنح حليفاً تراه مقاومة ضرر النار حتى بداية دورك القادم.", en: "As a reaction, grant an ally you see fire resistance until the start of your next turn." } }
      ],
      subclasses: [
        { id: "hearth-guardian", name: { ar: "حارس الموقد", en: "Hearth Guardian" }, summary: { ar: "يحمي رفاقه بدرع من وهج الأتون.", en: "Shields companions with the glow of the forge." },
          desc: { ar: "يقف حراس الموقد في الصفوف الأمامية، ويحوّلون حرارة الأتون إلى حماية لمن حولهم.", en: "Hearth Guardians hold the front line, turning forge heat into protection for those nearby." },
          features: [
            { level: 3, name: { ar: "وهج الحماية", en: "Warding Glow" }, desc: { ar: "تستطيع إضاءة درعك لمنح حليف قريب حماية مؤقتة.", en: "You can kindle your armor to grant a nearby ally brief protection." } },
            { level: 6, name: { ar: "قلب الأتون", en: "Forgeheart" }, desc: { ar: "تقاوم الحرارة الشديدة وتساعد حلفاءك على الصمود أمامها.", en: "You endure extreme heat and help your allies withstand it." } }
          ] }
      ] },

    { id: "shade-walker", name: { ar: "ماشي الظلال", en: "Shade Walker" }, hitDie: "d8",
      primary: { ar: "الرشاقة", en: "Dexterity" }, saves: { ar: "الرشاقة، الذكاء", en: "Dexterity, Intelligence" },
      armor: { ar: "دروع خفيفة", en: "Light armor" }, weapons: { ar: "الخناجر، السيوف القصيرة، الأقواس", en: "Daggers, shortswords, bows" },
      summary: { ar: "متسلل يتنقل عبر الظلال ويضرب من حيث لا يُنتظر.", en: "A scout who slips through shadow and strikes where none expect." },
      features: [
        { level: 1, name: { ar: "خطوة الظل", en: "Shadow Step" }, desc: { ar: "كإجراء إضافي تنتقل 9 أمتار إلى مساحة مظلمة تراها.", en: "As a bonus action, teleport 30 feet to a dim or dark space you can see." } },
        { level: 2, name: { ar: "ضربة مباغتة", en: "Ambush Strike" }, desc: { ar: "تضيف 1d6 ضرر إلى هجوم ناجح ضد هدف لم يتصرف بعد في القتال.", en: "Add 1d6 damage to a successful attack against a creature that has not yet acted in combat." } },
        { level: 3, name: { ar: "عين الليل", en: "Nightsight" }, desc: { ar: "تحصل على رؤية في الظلام بمدى 18 متراً.", en: "You gain darkvision out to 60 feet." } }
      ],
      subclasses: [
        { id: "duskblade", name: { ar: "نصل الغسق", en: "Duskblade" }, summary: { ar: "يمزج الخفاء بضربات دقيقة.", en: "Blends stealth with precise strikes." },
          desc: { ar: "يتقن نصل الغسق التحرك بين الظلال واختيار اللحظة المناسبة لضرب خصمه.", en: "Duskblades master movement between shadows and strike at the perfect moment." },
          features: [
            { level: 3, name: { ar: "ضربة الغسق", en: "Dusk Strike" }, desc: { ar: "تستفيد من الظلال لتضليل خصمك عند إصابته من موقع خفي.", en: "You use the shadows to unsettle a foe when striking from concealment." } },
            { level: 6, name: { ar: "عبور الظلال", en: "Shadow Crossing" }, desc: { ar: "تتنقل بين البقع المعتمة دون أن تكشف موضعك بسهولة.", en: "You move between dim spaces without easily revealing your position." } }
          ] }
      ] },
  ],

  races: [
    { id: "skyborn", name: { ar: "أبناء السماء", en: "Skyborn" }, size: { ar: "متوسط", en: "Medium" }, speed: { ar: "9 أمتار", en: "30 feet" },
      asi: { ar: "+2 رشاقة، +1 حكمة", en: "+2 Dexterity, +1 Wisdom" }, languages: { ar: "المشتركة، الريحية", en: "Common, Windtongue" },
      summary: { ar: "سكان الجزر العالية، خفاف الحركة وأعينهم دائماً نحو الأفق.", en: "Dwellers of the high isles, light on their feet with eyes ever on the horizon." },
      traits: [
        { name: { ar: "هبوط لطيف", en: "Gentle Landing" }, desc: { ar: "تتجاهل ضرر السقوط الأول كل راحة طويلة.", en: "You ignore the first instance of falling damage each long rest." } },
        { name: { ar: "بصر الصقر", en: "Hawk's Eye" }, desc: { ar: "أفضلية في اختبارات الإدراك المعتمدة على البصر.", en: "Advantage on Perception checks that rely on sight." } }
      ] },

    { id: "stonekin", name: { ar: "أهل الحجر", en: "Stonekin" }, size: { ar: "متوسط", en: "Medium" }, speed: { ar: "7.5 أمتار", en: "25 feet" },
      asi: { ar: "+2 بنية، +1 قوة", en: "+2 Constitution, +1 Strength" }, languages: { ar: "المشتركة، الحجرية", en: "Common, Stonetongue" },
      summary: { ar: "بنّاؤون صبورون ولدوا في المحاجر تحت الجزر.", en: "Patient builders born in the quarries beneath the isles." },
      traits: [
        { name: { ar: "جلد صخري", en: "Rocky Hide" }, desc: { ar: "تحصل على +1 لفئة الدرع عند عدم ارتداء درع ثقيل.", en: "+1 AC while not wearing heavy armor." } },
        { name: { ar: "حدس الحجارة", en: "Stonecunning" }, desc: { ar: "تُضاعف مهارتك في اختبارات التاريخ المتعلقة بالبناء والحجر.", en: "Double proficiency on History checks about stonework." } }
      ] },

    { id: "reedfolk", name: { ar: "شعب القصب", en: "Reedfolk" }, size: { ar: "صغير", en: "Small" }, speed: { ar: "9 أمتار", en: "30 feet" },
      asi: { ar: "+2 ذكاء، +1 رشاقة", en: "+2 Intelligence, +1 Dexterity" }, languages: { ar: "المشتركة، المائية", en: "Common, Watertongue" },
      summary: { ar: "سكان المستنقعات العائمة، بارعون في الصنائع والحيلة.", en: "Folk of the floating marshes, skilled in craft and cunning." },
      traits: [
        { name: { ar: "سباح بالفطرة", en: "Born Swimmer" }, desc: { ar: "سرعة سباحة 9 أمتار.", en: "Swim speed of 30 feet." } },
        { name: { ar: "يدا صانع", en: "Maker's Hands" }, desc: { ar: "تُتقن أداة حِرفية واحدة من اختيارك.", en: "Proficiency with one artisan's tool of your choice." } }
      ] }
  ],

  backgrounds: [
    { id: "caravan-guard", name: { ar: "حارس قوافل", en: "Caravan Guard" },
      skills: { ar: "الإدراك، البقاء", en: "Perception, Survival" }, tools: { ar: "مركبات برية", en: "Land vehicles" }, languages: { ar: "لغة واحدة", en: "One language" },
      summary: { ar: "حميتَ التجار على دروب الجزر لسنوات.", en: "You guarded merchants along the isle roads for years." },
      feature: { name: { ar: "رفقة الطريق", en: "Road Companions" }, desc: { ar: "تجد مأوى ووجبة عند أي قافلة تجارية مقابل ساعات حراسة.", en: "You find shelter and a meal at any trade caravan in exchange for watch duty." } } },

    { id: "lighthouse-keeper", name: { ar: "حارس المنارة", en: "Lighthouse Keeper" },
      skills: { ar: "الإدراك، الطب", en: "Perception, Medicine" }, tools: { ar: "أدوات الملاحة", en: "Navigator's tools" }, languages: { ar: "لغة واحدة", en: "One language" },
      summary: { ar: "أشعلت المنارات لهداية السفن الطائرة.", en: "You kept the beacons lit to guide the sky-ships." },
      feature: { name: { ar: "نور موثوق", en: "Trusted Light" }, desc: { ar: "يعرفك طواقم السفن ويقدمون لك ممراً مجانياً مرة كل شهر.", en: "Ship crews know you and grant you free passage once a month." } } },

    { id: "archive-scribe", name: { ar: "كاتب الأرشيف", en: "Archive Scribe" },
      skills: { ar: "التاريخ، التحقيق", en: "History, Investigation" }, tools: { ar: "أدوات الخط", en: "Calligrapher's supplies" }, languages: { ar: "لغتان", en: "Two languages" },
      summary: { ar: "قضيت شبابك بين رفوف مكتبة الجزيرة الكبرى.", en: "You spent your youth among the great isle library's shelves." },
      feature: { name: { ar: "ذاكرة المكتبة", en: "Library Memory" }, desc: { ar: "تعرف أين تجد أي مصدر مكتوب في أي مدينة كبيرة.", en: "You know where to find any written source in any large city." } } }
  ],

  equipment: [
    { id: "wind-spear", type: "weapon", name: { ar: "رمح الريح", en: "Windspear" }, cost: "15 gp", weight: "3 lb",
      damage: "1d8", dmgType: { ar: "ثاقب", en: "Piercing" }, props: { ar: "متعدد الاستخدامات (1d10)، رمي (6/18 م)", en: "Versatile (1d10), thrown (20/60)" },
      desc: { ar: "رمح خفيف مصنوع من خشب الأرخبيل، يعود إلى يد صاحبه بعد الرمي لمرة واحدة في اليوم.", en: "A light spear carved from isle timber; it returns to its owner's hand once per day after being thrown." } },

    { id: "forge-hammer", type: "weapon", name: { ar: "مطرقة الأتون", en: "Forge Hammer" }, cost: "25 gp", weight: "8 lb",
      damage: "1d12", dmgType: { ar: "ساحق", en: "Bludgeoning" }, props: { ar: "ثقيل، بيدين", en: "Heavy, two-handed" },
      desc: { ar: "مطرقة ثقيلة تُحمّى على الجمر. تضيء قليلاً في الظلام.", en: "A heavy hammer heated on embers. It glows faintly in the dark." } },

    { id: "shade-dagger", type: "weapon", name: { ar: "خنجر الظل", en: "Shade Dagger" }, cost: "10 gp", weight: "1 lb",
      damage: "1d4", dmgType: { ar: "ثاقب", en: "Piercing" }, props: { ar: "خفيف، رشيق، رمي (6/18 م)", en: "Finesse, light, thrown (20/60)" },
      desc: { ar: "خنجر أسود لا يعكس الضوء.", en: "A black dagger that does not reflect light." } },

    { id: "reed-bow", type: "weapon", name: { ar: "قوس القصب", en: "Reed Bow" }, cost: "30 gp", weight: "2 lb",
      damage: "1d6", dmgType: { ar: "ثاقب", en: "Piercing" }, props: { ar: "ذخيرة (24/96 م)، بيدين", en: "Ammunition (80/320), two-handed" },
      desc: { ar: "قوس مرن مصنوع من قصب المستنقعات، هادئ الصوت.", en: "A flexible bow of marsh reeds, quiet when loosed." } },

    { id: "leather-wrap", type: "armor", name: { ar: "لفائف جلدية", en: "Leather Wrap" }, cost: "10 gp", weight: "10 lb",
      ac: "11 + Dex", strReq: "—", stealth: { ar: "لا", en: "None" },
      desc: { ar: "درع خفيف مصنوع من جلد أسماك السماء.", en: "Light armor of skyfish leather." } },

    { id: "scale-plate", type: "armor", name: { ar: "درع القشور", en: "Scale Plate" }, cost: "50 gp", weight: "45 lb",
      ac: "14 + Dex (max 2)", strReq: "—", stealth: { ar: "عائق", en: "Disadvantage" },
      desc: { ar: "قشور معدنية تُخاط على لباد سميك.", en: "Metal scales stitched onto thick felt." } },

    { id: "granite-mail", type: "armor", name: { ar: "درع الجرانيت", en: "Granite Mail" }, cost: "200 gp", weight: "65 lb",
      ac: "17", strReq: "Str 15", stealth: { ar: "عائق", en: "Disadvantage" },
      desc: { ar: "درع ثقيل من صفائح الحجر المصقول، صناعة أهل الحجر.", en: "Heavy armor of polished stone plates, crafted by the Stonekin." } },

    { id: "sky-rope", type: "gear", name: { ar: "حبل السماء", en: "Sky Rope" }, cost: "5 gp", weight: "5 lb",
      desc: { ar: "حبل خفيف طوله 15 متراً يتحمل 400 رطل.", en: "50 feet of light rope that holds 400 lb." } },

    { id: "beacon-lamp", type: "gear", name: { ar: "مصباح المنارة", en: "Beacon Lamp" }, cost: "12 gp", weight: "2 lb",
      desc: { ar: "مصباح يضيء بنور مقوّى لمدى 18 متراً ويبقى مضيئاً تحت المطر.", en: "A lamp casting bright light 60 feet; it stays lit in rain." } },

    { id: "healers-satchel", type: "gear", name: { ar: "حقيبة المداوي", en: "Healer's Satchel" }, cost: "20 gp", weight: "3 lb",
      desc: { ar: "تحتوي على ضمادات وأعشاب تكفي 10 استعمالات.", en: "Holds bandages and herbs for 10 uses." } }
  ]
};
