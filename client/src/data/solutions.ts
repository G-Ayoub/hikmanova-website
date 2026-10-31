import type { Localized } from "@/lib/i18n";

export type SolutionCategory = "AI" | "IoT" | "Platform";

export interface CaseStudy {
  challenge: Localized;
  solution: Localized;
  /** Factual outcomes only. Quantified metrics are added once confirmed by the client. */
  results: Localized[];
}

export interface Solution {
  slug: string;
  category: SolutionCategory;
  name: string;
  /** Title for search results and browser tabs (≤ 47 characters in English; " | HikmaNova" is added). */
  seoTitle: Localized;
  tagline: Localized;
  overview: Localized;
  features: Localized[];
  stack: string[];
  /** Slugs from industries.ts */
  industries: string[];
  /** Slugs from services.ts */
  services: string[];
  image: string;
  /** Named client, only when the client has agreed to be named. */
  client?: Localized;
  caseStudy?: CaseStudy;
  featured?: boolean;
  /** Equipment groups the product monitors (monitoring products). */
  monitors?: { group: Localized; items: Localized[] }[];
  benefits?: Localized[];
}

const l = (en: string, ar: string): Localized => ({ en, ar });

// Shared by the datacenter and telecom power-monitoring products.
const powerMonitoringFeatures: Localized[] = [
  l("Multi-protocol collection through SNMP (polling and traps) and Modbus TCP/RTU", "جمع البيانات عبر بروتوكولات متعددة: بروتوكول SNMP بالاستطلاع والتنبيهات، وبروتوكول Modbus TCP/RTU"),
  l("Live dashboard with real-time telemetry and an equipment topology map", "لوحة متابعة مباشرة بقياسات لحظية وخريطة لطوبولوجيا المعدات"),
  l("Threshold alerts and instant notifications", "تنبيهات عند تجاوز العتبات وإشعارات فورية"),
  l("AI anomaly detection that correlates signals such as a voltage drop, temperature rise and load spike to find the root cause", "كشف الحالات الشاذة بالذكاء الاصطناعي عبر ربط الإشارات، مثل انخفاض الجهد وارتفاع الحرارة وذروة الحمل، لتحديد السبب الجذري"),
  l("Predictive insight into gradual failures such as battery degradation", "رؤى تنبؤية للأعطال التدريجية مثل تدهور البطاريات"),
  l("Historical reporting and trend analysis", "تقارير تاريخية وتحليل للاتجاهات"),
];

const powerMonitoringBenefits: Localized[] = [
  l("Less downtime and faster incident resolution", "تقليل فترات التوقف وتسريع معالجة الحوادث"),
  l("Proactive maintenance instead of reactive repairs", "صيانة استباقية بدلاً من الإصلاح بعد العطل"),
  l("One view across multiple sites", "رؤية موحّدة لعدة مواقع"),
  l("Can be hosted on-premise, in line with data-localization rules", "إمكانية الاستضافة داخل المؤسسة بما يتوافق مع متطلبات توطين البيانات"),
];

const powerMonitoringStack = [
  "Django REST", "TimescaleDB", "Celery", "Django Channels + Redis (WebSocket)",
  "Isolation Forest / LSTM", "React dashboard", "Grafana", "SNMP", "Modbus TCP/RTU",
];

export const solutions: Solution[] = [
  {
    slug: "orbix",
    category: "AI",
    name: "Orbix",
    featured: true,
    seoTitle: l("Orbix — AI CRM Agent for Data Warehouses", "أوربكس — وكيل ذكاء اصطناعي لإدارة علاقات العملاء"),
    tagline: l("AI CRM agent — ask your data warehouse in plain language", "وكيل ذكاء اصطناعي لإدارة علاقات العملاء — اسأل مستودع بياناتك بلغة طبيعية"),
    overview: l(
      "Orbix is a text-to-SQL AI agent that lets business teams query a CRM data warehouse in natural language. It routes each question to the right database, computes revenue analytics and produces ready-to-share PDF reports — without writing SQL.",
      "أوربكس وكيل ذكاء اصطناعي يحوّل الأسئلة المكتوبة بلغة طبيعية إلى استعلامات SQL، ما يتيح لفرق الأعمال استكشاف مستودع بيانات إدارة علاقات العملاء دون كتابة أي شيفرة. يوجّه كل سؤال إلى قاعدة البيانات المناسبة، ويحسب تحليلات الإيرادات، ويُصدر تقارير PDF جاهزة للمشاركة.",
    ),
    client: l("Arabsat", "عربسات"),
    features: [
      l("Text-to-SQL over a SQL Server CRM data warehouse", "تحويل النص إلى SQL على مستودع بيانات CRM مبني على SQL Server"),
      l("Dual-database routing between CRM data and PostgreSQL satellite datasheets", "توجيه ذكي بين قاعدتي بيانات: بيانات CRM وصحائف بيانات الأقمار الصناعية على PostgreSQL"),
      l("Revenue analytics with monthly normalisation and year-over-year growth", "تحليلات الإيرادات مع التوحيد الشهري ونسب النمو السنوي"),
      l("Automated PDF report generation", "توليد تلقائي لتقارير PDF"),
      l("Modular agent architecture built on Django", "بنية وكلاء معيارية مبنية على Django"),
      l("Customer behaviour analysis that surfaces hidden patterns, trends and new business opportunities", "تحليل سلوك العملاء للكشف عن الأنماط والاتجاهات الخفية وفرص الأعمال الجديدة"),
    ],
    stack: ["Python", "Django", "LLM agents", "Text-to-SQL", "SQL Server", "PostgreSQL", "PDF generation"],
    industries: ["telecom-satellite"],
    services: ["ai-agents-llm", "backend-enterprise-platforms", "consulting-poc-workshops"],
    image: "/images/abstract-2.webp",
    benefits: [
      l("Sales and marketing optimisation", "تحسين المبيعات والتسويق"),
      l("Data-driven decision support for managers", "دعم القرار المبني على البيانات للمديرين"),
      l("Better customer engagement", "تفاعل أفضل مع العملاء"),
      l("Improved operational efficiency", "تحسين الكفاءة التشغيلية"),
    ],
    caseStudy: {
      challenge: l(
        "Commercial data at Arabsat lives in a SQL Server CRM data warehouse, while satellite technical datasheets sit in a separate PostgreSQL database. Getting a revenue figure or a cross-database answer required SQL expertise and manual reporting.",
        "تتوزع البيانات التجارية لدى عربسات في مستودع بيانات CRM مبني على SQL Server، بينما تُحفظ صحائف البيانات الفنية للأقمار الصناعية في قاعدة PostgreSQL منفصلة. وكان الحصول على رقم إيرادات أو إجابة تجمع بين القاعدتين يتطلب خبرة في SQL وإعداد تقارير يدوياً.",
      ),
      solution: l(
        "We built Orbix, a modular Django-based agent that translates questions into SQL, routes them to the CRM or the satellite datasheets as needed, normalises revenue month by month, computes year-over-year growth and exports the answer as a PDF report. It was delivered to the client through a hands-on proof-of-concept deployment workshop.",
        "طوّرنا أوربكس، وهو وكيل معياري مبني على Django يحوّل الأسئلة إلى SQL، ويوجّهها إلى بيانات CRM أو صحائف بيانات الأقمار الصناعية حسب الحاجة، ويوحّد الإيرادات شهرياً، ويحسب النمو السنوي، ثم يصدّر الإجابة في تقرير PDF. وقد سُلِّم للعميل عبر ورشة عملية لنشر إثبات المفهوم.",
      ),
      results: [
        l("Proof of concept deployed and demonstrated in a workshop with the client's teams", "نشر إثبات المفهوم وعرضه في ورشة عمل مع فرق العميل"),
        l("Natural-language access to CRM and satellite data from a single interface", "وصول بلغة طبيعية إلى بيانات CRM والأقمار الصناعية من واجهة واحدة"),
        l("Revenue reports generated automatically as PDF", "إنشاء تقارير الإيرادات تلقائياً بصيغة PDF"),
      ],
    },
  },
  {
    slug: "teammonitor",
    category: "AI",
    name: "TeamMonitor",
    featured: true,
    seoTitle: l("TeamMonitor — AI Workforce Tracking for Events", "TeamMonitor — تتبّع ذكي للفرق في الفعاليات"),
    tagline: l("AI workforce tracking for large events and venues", "تتبّع ذكي للفرق الميدانية في الفعاليات والملاعب الكبرى"),
    overview: l(
      "TeamMonitor tracks and coordinates field and stadium teams in real time. IoT sensors, Bluetooth and iBeacon proximity automate presence and location, so supervisors see who is where without manual check-ins.",
      "يتتبّع TeamMonitor الفرق الميدانية وفرق الملاعب وينسّق عملها لحظياً. وتعتمد المنصة على مستشعرات إنترنت الأشياء وتقنيتي Bluetooth وiBeacon لأتمتة تسجيل الحضور وتحديد المواقع، فيعرف المشرفون مكان كل فريق دون تسجيل يدوي.",
    ),
    features: [
      l("Automated presence and location with Bluetooth and iBeacon", "تسجيل الحضور وتحديد الموقع تلقائياً عبر Bluetooth وiBeacon"),
      l("Field and stadium team management across multiple venues", "إدارة الفرق الميدانية وفرق الملاعب عبر مواقع متعددة"),
      l("IoT-driven automation of attendance and zone coverage", "أتمتة الحضور وتغطية المناطق بالاعتماد على إنترنت الأشياء"),
      l("AI-assisted supervision and live dashboards", "إشراف مدعوم بالذكاء الاصطناعي ولوحات متابعة مباشرة"),
      l("Intelligent scheduling and shift management", "جدولة ذكية وإدارة للمناوبات"),
      l("Location-based alerts and team coordination", "تنبيهات مرتبطة بالموقع وتنسيق بين الفرق"),
      l("Integration with existing project-management and enterprise systems", "تكامل مع أنظمة إدارة المشاريع والأنظمة المؤسسية القائمة"),
    ],
    stack: ["IoT", "Bluetooth Low Energy", "iBeacon", "AI analytics", "Mobile apps"],
    industries: ["sports-stadiums", "religious-tourism-events"],
    services: ["iot-connected-systems", "mobile-apps", "ai-agents-llm"],
    image: "/images/qatar-world-cup.webp",
    caseStudy: {
      challenge: l(
        "During the FIFA World Cup Qatar 2022, field and stadium teams were spread across several venues. Supervisors needed to know where each team was and whether every zone was covered, without relying on manual check-ins.",
        "خلال بطولة كأس العالم FIFA قطر 2022، توزعت الفرق الميدانية وفرق الملاعب على عدة مواقع، واحتاج المشرفون إلى معرفة مكان كل فريق والتأكد من تغطية كل منطقة دون الاعتماد على التسجيل اليدوي.",
      ),
      solution: l(
        "TeamMonitor combined IoT devices with Bluetooth and iBeacon proximity detection to log presence and movement automatically, and gave supervisors a live view of their teams.",
        "جمع TeamMonitor بين أجهزة إنترنت الأشياء وكشف القرب عبر Bluetooth وiBeacon لتسجيل الحضور والتنقل تلقائياً، ومنح المشرفين رؤية مباشرة لفرقهم.",
      ),
      results: [
        l("Used in live operations during the FIFA World Cup Qatar 2022", "استُخدم في العمليات الفعلية خلال كأس العالم FIFA قطر 2022"),
        l("Presence and location captured automatically, without manual check-ins", "تسجيل الحضور والموقع تلقائياً دون تسجيل يدوي"),
      ],
    },
  },
  {
    slug: "nusuk-card",
    category: "IoT",
    name: "Smart BLE Nusuk Card",
    featured: true,
    seoTitle: l("Nusuk Card — Hajj & Umrah Crowd Intelligence", "بطاقة نسك — ذكاء الحشود في الحج والعمرة"),
    tagline: l("Smart BLE card for Hajj and Umrah crowd management", "بطاقة نسك الذكية بتقنية BLE لإدارة الحشود في الحج والعمرة"),
    overview: l(
      "A smart Bluetooth Low Energy card and crowd-intelligence platform that helps authorities and service providers manage pilgrim crowds during Hajj and Umrah. Low-energy signals and location data — rather than camera-heavy AI — power movement prediction, congestion forecasting and smart routing. Registered as intellectual property in the Kingdom of Saudi Arabia (deposit no. 1607864).",
      "بطاقة ذكية بتقنية Bluetooth منخفضة الطاقة ومنصة لذكاء الحشود تساعد الجهات المختصة ومقدمي الخدمات على إدارة حشود الحجاج والمعتمرين. وتعتمد على إشارات منخفضة الطاقة وبيانات الموقع — بدلاً من الذكاء الاصطناعي القائم على الكاميرات — للتنبؤ بالحركة وتوقّع الازدحام والتوجيه الذكي. مسجّلة ملكيةً فكرية في المملكة العربية السعودية (رقم الإيداع 1607864).",
    ),
    features: [
      l("BLE smart card carried by each pilgrim", "بطاقة ذكية بتقنية BLE يحملها كل حاج أو معتمر"),
      l("Crowd-flow awareness for Hajj and Umrah operations", "رصد حركة الحشود لعمليات الحج والعمرة"),
      l("Works with gateways and readers installed across sites", "تعمل مع بوابات وقارئات مثبتة في المواقع"),
      l("Crowd intelligence that segments pilgrim flows by group and nationality for field teams", "ذكاء الحشود: تقسيم تدفقات الحجاج حسب المجموعة والجنسية لدعم الفرق الميدانية"),
      l("AI movement prediction that estimates a lost pilgrim's most probable location", "تنبؤ بالحركة بالذكاء الاصطناعي لتقدير الموقع الأرجح لحاج تائه"),
      l("Prioritises nearby users most likely to assist", "إعطاء الأولوية للمستخدمين القريبين الأكثر قدرة على المساعدة"),
      l("Distributed network that extends coverage without heavy dedicated infrastructure", "شبكة موزعة توسّع التغطية دون بنية تتبّع مخصصة مكلفة"),
      l("Intellectual property registered in Saudi Arabia (deposit no. 1607864)", "ملكية فكرية مسجّلة في المملكة العربية السعودية (رقم الإيداع 1607864)"),
    ],
    benefits: [
      l("Lower deployment complexity and operating cost than camera-based systems", "تعقيد نشر وتكلفة تشغيل أقل من الأنظمة القائمة على الكاميرات"),
      l("Better coordination and situational awareness for field teams", "تنسيق أفضل ووعي ميداني أعلى للفرق"),
      l("Pilgrim tracking and assistance at scale", "تتبّع الحجاج ومساعدتهم على نطاق واسع"),
    ],
    stack: ["Bluetooth Low Energy", "IoT gateways", "Mobile apps", "Dashboards"],
    industries: ["religious-tourism-events", "public-sector"],
    services: ["iot-connected-systems", "mobile-apps"],
    image: "/images/nusuk-card.webp",
    caseStudy: {
      challenge: l(
        "Hajj and Umrah bring millions of pilgrims to the same sites within a short period. Organisers need reliable, low-friction ways to understand crowd movement and support pilgrims on the ground.",
        "يجتمع ملايين الحجاج والمعتمرين في المواقع نفسها خلال فترة قصيرة، ويحتاج المنظمون إلى وسائل موثوقة وسهلة لفهم حركة الحشود ودعم الحجاج ميدانياً.",
      ),
      solution: l(
        "We designed a smart BLE card that each pilgrim carries, read by gateways placed across sites, to give organisers live crowd awareness without requiring pilgrims to use a phone.",
        "صمّمنا بطاقة ذكية بتقنية BLE يحملها كل حاج، وتقرؤها بوابات موزعة في المواقع، لتمنح المنظمين رؤية مباشرة للحشود دون أن يحتاج الحاج إلى استخدام هاتفه.",
      ),
      results: [
        l("Registered as intellectual property in the Kingdom of Saudi Arabia (deposit no. 1607864)", "سُجّلت ملكيةً فكرية في المملكة العربية السعودية (رقم الإيداع 1607864)"),
      ],
    },
  },
  {
    slug: "iot-cold-chain",
    category: "IoT",
    name: "Refrigerator IoT Monitoring",
    seoTitle: l("Refrigerator IoT Cold-Chain Monitoring", "مراقبة سلسلة التبريد بإنترنت الأشياء"),
    tagline: l("Remote cold-chain and temperature monitoring", "مراقبة سلسلة التبريد ودرجات الحرارة عن بُعد"),
    overview: l(
      "Connected sensors monitor refrigerators and cold rooms around the clock. Temperatures stream to a central dashboard, and staff are alerted the moment a unit drifts out of range.",
      "تراقب مستشعرات متصلة الثلاجات وغرف التبريد على مدار الساعة، وتُرسل درجات الحرارة إلى لوحة متابعة مركزية، ويُنبَّه الموظفون فور خروج أي وحدة عن النطاق المسموح.",
    ),
    features: [
      l("Wireless temperature sensors for fridges and cold rooms", "مستشعرات حرارة لاسلكية للثلاجات وغرف التبريد"),
      l("Real-time alerts when temperatures leave the safe range", "تنبيهات فورية عند خروج الحرارة عن النطاق الآمن"),
      l("Central dashboards with history for audits and compliance", "لوحات متابعة مركزية مع سجل تاريخي للتدقيق والامتثال"),
      l("Multi-site monitoring from one place", "مراقبة عدة مواقع من مكان واحد"),
    ],
    stack: ["IoT sensors", "MQTT", "Dashboards", "Alerting", "PostgreSQL"],
    industries: ["logistics", "hospitality"],
    services: ["iot-connected-systems", "backend-enterprise-platforms"],
    image: "/images/iot-cold-chain.svg",
  },
  {
    slug: "lamana",
    category: "Platform",
    name: "Lamana",
    featured: true,
    seoTitle: l("Lamana — France–Algeria Parcel Delivery", "لامانة — توصيل الطرود بين فرنسا والجزائر"),
    tagline: l("Cross-border parcel delivery for the France–Algeria corridor", "توصيل الطرود عبر الحدود بين فرنسا والجزائر"),
    overview: l(
      "Lamana is a logistics platform built for the diaspora, making it simple to send parcels between France and Algeria — from booking to hand-over and tracking.",
      "لامانة منصة لوجستية موجّهة للجالية، تسهّل إرسال الطرود بين فرنسا والجزائر، من الحجز إلى التسليم والتتبع.",
    ),
    features: [
      l("Parcel booking and tracking between France and Algeria", "حجز الطرود وتتبعها بين فرنسا والجزائر"),
      l("Designed around the needs of the diaspora", "مصممة وفق احتياجات الجالية"),
      l("Web and mobile experience", "تجربة عبر الويب والهاتف المحمول"),
    ],
    stack: ["Flutter", "Django", "PostgreSQL", "REST APIs"],
    industries: ["logistics"],
    services: ["mobile-apps", "backend-enterprise-platforms"],
    image: "/images/lamana.svg",
  },
  {
    slug: "datacenter-power-monitoring",
    category: "IoT",
    name: "Datacenter Power & Environment Monitoring",
    seoTitle: l("AI Data Centre Power & Environment Monitoring", "مراقبة الطاقة والبيئة في مراكز البيانات بالذكاء الاصطناعي"),
    tagline: l(
      "Real-time power and environment monitoring for datacenters, with AI-driven root cause detection",
      "مراقبة لحظية للطاقة والبيئة في مراكز البيانات مع كشف السبب الجذري بالذكاء الاصطناعي",
    ),
    overview: l(
      "An AI-powered infrastructure management platform for medium-sized data centres — the energy-efficient sites that, alongside hyperscale cloud, will run distributed AI. It monitors critical power and environment equipment from many vendors in one dashboard, detects anomalies before they become outages and pinpoints their root cause. Currently in active development.",
      "منصة لإدارة البنية التحتية مدعومة بالذكاء الاصطناعي لمراكز البيانات المتوسطة — المراكز الموفّرة للطاقة التي ستشغّل الذكاء الاصطناعي الموزّع إلى جانب السحابة الضخمة. تراقب معدات الطاقة والبيئة الحرجة من موردين متعددين في لوحة واحدة، وتكشف الحالات الشاذة قبل أن تتحول إلى انقطاعات، وتحدد سببها الجذري. قيد التطوير حالياً.",
    ),
    monitors: [
      { group: l("Power", "الطاقة"), items: [l("UPS", "أنظمة UPS"), l("PDUs", "وحدات توزيع الطاقة PDU"), l("Diesel generators", "مولدات الديزل")] },
      { group: l("Environment", "البيئة"), items: [l("Temperature", "درجة الحرارة"), l("Humidity", "الرطوبة"), l("Precision cooling (CRAC/CRAH)", "التبريد الدقيق (CRAC/CRAH)")] },
      { group: l("Network equipment", "معدات الشبكة"), items: [l("Switches", "المبدّلات (Switches)"), l("SNMP-enabled devices", "الأجهزة الداعمة لـ SNMP")] },
    ],
    features: [
      ...powerMonitoringFeatures,
      l("Multi-vendor integration in one dashboard: KSTAR, Huawei, Vertiv, Delta, Emerson, Montair and more", "تكامل متعدد الموردين في لوحة واحدة: KSTAR وHuawei وVertiv وDelta وEmerson وMontair وغيرها"),
    ],
    benefits: [
      ...powerMonitoringBenefits,
      l("Sensitive data stays on the organisation's own servers", "تبقى البيانات الحساسة على خوادم المؤسسة نفسها"),
      l("Lower energy use and cooling load, with faster, low-latency AI", "استهلاك أقل للطاقة وحمل تبريد أقل، مع ذكاء اصطناعي أسرع وزمن استجابة منخفض"),
    ],
    stack: powerMonitoringStack,
    industries: ["datacenters-enterprise-it", "energy"],
    services: ["iot-connected-systems", "ai-agents-llm", "devops-sovereign-hosting"],
    image: "/images/datacenter-power.svg",
  },
  {
    slug: "telecom-power-monitoring",
    category: "IoT",
    name: "Telecom Power Systems Monitoring",
    seoTitle: l("Telecom Site Power Monitoring with AI", "مراقبة طاقة مواقع الاتصالات بالذكاء الاصطناعي"),
    tagline: l(
      "Real-time monitoring of telecom-site power, with AI-driven root cause detection",
      "مراقبة لحظية لأنظمة الطاقة في مواقع الاتصالات مع كشف السبب الجذري بالذكاء الاصطناعي",
    ),
    overview: l(
      "A centralized platform that monitors the power infrastructure of telecom sites in real time — from rectifiers and battery banks to backup generators. It detects anomalies before they become outages and pinpoints their root cause, across every site from one view.",
      "منصة مركزية تراقب البنية التحتية للطاقة في مواقع الاتصالات لحظياً — من المقوّمات وبنوك البطاريات إلى المولدات الاحتياطية. تكشف الحالات الشاذة قبل أن تتحول إلى انقطاعات وتحدد سببها الجذري، لجميع المواقع من واجهة واحدة.",
    ),
    monitors: [
      { group: l("Power", "الطاقة"), items: [l("Rectifiers", "المقوّمات (Rectifiers)"), l("Battery banks", "بنوك البطاريات"), l("Diesel generators", "مولدات الديزل")] },
      { group: l("Environment", "البيئة"), items: [l("Site temperature", "حرارة الموقع"), l("Humidity", "الرطوبة")] },
      { group: l("Network equipment", "معدات الشبكة"), items: [l("SNMP-enabled site equipment", "معدات الموقع الداعمة لـ SNMP")] },
    ],
    features: powerMonitoringFeatures,
    benefits: powerMonitoringBenefits,
    stack: powerMonitoringStack,
    industries: ["telecom-satellite", "energy"],
    services: ["iot-connected-systems", "ai-agents-llm", "devops-sovereign-hosting"],
    image: "/images/telecom-power.svg",
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
