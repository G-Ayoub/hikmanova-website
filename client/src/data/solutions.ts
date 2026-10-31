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
  /** Optional media; a "coming soon" slot is shown while these are missing. */
  video?: string;
  gallery?: string[];
  caseStudy?: CaseStudy;
  featured?: boolean;
}

const l = (en: string, ar: string): Localized => ({ en, ar });

export const solutions: Solution[] = [
  {
    slug: "orbix",
    category: "AI",
    name: "Orbix",
    featured: true,
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
    ],
    stack: ["Python", "Django", "LLM agents", "Text-to-SQL", "SQL Server", "PostgreSQL", "PDF generation"],
    industries: ["telecom-satellite"],
    services: ["ai-agents-llm", "backend-enterprise-platforms", "consulting-poc-workshops"],
    image: "/images/abstract-2.jpg",
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
    ],
    stack: ["IoT", "Bluetooth Low Energy", "iBeacon", "AI analytics", "Mobile apps"],
    industries: ["sports-stadiums", "religious-tourism-events"],
    services: ["iot-connected-systems", "mobile-apps", "ai-agents-llm"],
    image: "/images/qatar-world-cup.jpg",
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
    tagline: l("Smart BLE card for Hajj and Umrah crowd management", "بطاقة نسك الذكية بتقنية BLE لإدارة الحشود في الحج والعمرة"),
    overview: l(
      "A smart Bluetooth Low Energy card that helps authorities and service providers manage pilgrim crowds during Hajj and Umrah. The design is registered as intellectual property in the Kingdom of Saudi Arabia.",
      "بطاقة ذكية تعمل بتقنية Bluetooth منخفضة الطاقة تساعد الجهات المختصة ومقدمي الخدمات على إدارة حشود الحجاج والمعتمرين. والتصميم مسجّل ملكيةً فكرية في المملكة العربية السعودية.",
    ),
    features: [
      l("BLE smart card carried by each pilgrim", "بطاقة ذكية بتقنية BLE يحملها كل حاج أو معتمر"),
      l("Crowd-flow awareness for Hajj and Umrah operations", "رصد حركة الحشود لعمليات الحج والعمرة"),
      l("Works with gateways and readers installed across sites", "تعمل مع بوابات وقارئات مثبتة في المواقع"),
      l("Intellectual property registered in Saudi Arabia", "ملكية فكرية مسجّلة في المملكة العربية السعودية"),
    ],
    stack: ["Bluetooth Low Energy", "IoT gateways", "Mobile apps", "Dashboards"],
    industries: ["religious-tourism-events", "public-sector"],
    services: ["iot-connected-systems", "mobile-apps"],
    image: "/images/nusuk-card.jpg",
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
        l("Registered as intellectual property in the Kingdom of Saudi Arabia", "سُجّلت ملكيةً فكرية في المملكة العربية السعودية"),
      ],
    },
  },
  {
    slug: "iot-cold-chain",
    category: "IoT",
    name: "Refrigerator IoT Monitoring",
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
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
