import type { Localized } from "@/lib/i18n";

export type ServiceIcon = "brain" | "radio" | "smartphone" | "server" | "shield" | "presentation";

export interface Service {
  slug: string;
  icon: ServiceIcon;
  name: Localized;
  summary: Localized;
  description: Localized;
  capabilities: Localized[];
  technologies: string[];
  image: string;
}

const l = (en: string, ar: string): Localized => ({ en, ar });

export const services: Service[] = [
  {
    slug: "ai-agents-llm",
    icon: "brain",
    name: l("AI agents & LLM solutions", "وكلاء الذكاء الاصطناعي وحلول النماذج اللغوية"),
    summary: l("Text-to-SQL, chatbots and document generation on your own data.", "تحويل النص إلى SQL، وروبوتات المحادثة، وتوليد المستندات من بياناتك."),
    description: l(
      "We design AI agents that work on your data: answering questions over databases, assisting customers in Arabic, French and English, and producing documents and reports automatically. Models can run in the cloud or on your own infrastructure.",
      "نصمم وكلاء ذكاء اصطناعي يعملون على بياناتك: يجيبون عن الأسئلة من قواعد البيانات، ويساعدون العملاء بالعربية والفرنسية والإنجليزية، وينتجون المستندات والتقارير تلقائياً. ويمكن تشغيل النماذج سحابياً أو على بنيتك التحتية الخاصة.",
    ),
    capabilities: [
      l("Text-to-SQL agents over data warehouses and CRMs", "وكلاء تحويل النص إلى SQL على مستودعات البيانات وأنظمة CRM"),
      l("Multilingual chatbots and virtual assistants", "روبوتات محادثة ومساعدون افتراضيون متعددو اللغات"),
      l("Automated document and PDF report generation", "توليد المستندات وتقارير PDF تلقائياً"),
      l("Retrieval over internal documents (RAG)", "البحث والاسترجاع من المستندات الداخلية (RAG)"),
      l("On-premises deployment of open models", "نشر النماذج المفتوحة داخل مقر المؤسسة"),
    ],
    technologies: ["Python", "Django", "LLMs", "LangChain", "PostgreSQL", "SQL Server"],
    image: "/images/abstract-7.webp",
  },
  {
    slug: "iot-connected-systems",
    icon: "radio",
    name: l("IoT & connected systems", "إنترنت الأشياء والأنظمة المتصلة"),
    summary: l("BLE, NFC, iBeacon and sensors connected to real-time dashboards.", "BLE وNFC وiBeacon والمستشعرات متصلة بلوحات متابعة لحظية."),
    description: l(
      "From smart cards to sensor networks, we build connected systems end to end: hardware selection, firmware integration, gateways, cloud or on-prem back-ends and the dashboards your teams use every day.",
      "من البطاقات الذكية إلى شبكات المستشعرات، نبني الأنظمة المتصلة من البداية إلى النهاية: اختيار العتاد، ودمج البرمجيات الثابتة، والبوابات، والأنظمة الخلفية السحابية أو الداخلية، ولوحات المتابعة التي تستخدمها فرقك يومياً.",
    ),
    capabilities: [
      l("Bluetooth Low Energy and iBeacon solutions", "حلول Bluetooth منخفضة الطاقة وiBeacon"),
      l("NFC and smart card systems", "أنظمة NFC والبطاقات الذكية"),
      l("Sensor networks for temperature, presence and assets", "شبكات مستشعرات للحرارة والحضور والأصول"),
      l("Gateways, device management and alerting", "البوابات وإدارة الأجهزة والتنبيهات"),
      l("Real-time monitoring dashboards", "لوحات مراقبة لحظية"),
    ],
    technologies: ["BLE", "NFC", "iBeacon", "MQTT", "Embedded sensors", "Flutter"],
    image: "/images/abstract-4.webp",
  },
  {
    slug: "mobile-apps",
    icon: "smartphone",
    name: l("Mobile apps", "تطبيقات الهاتف المحمول"),
    summary: l("Cross-platform Flutter apps and native Android/iOS.", "تطبيقات Flutter متعددة المنصات وتطبيقات أصلية لأندرويد وiOS."),
    description: l(
      "We build mobile apps that are fast, secure and fully bilingual, including right-to-left Arabic interfaces. Apps connect to IoT devices over Bluetooth and NFC and to your enterprise back-ends.",
      "نطوّر تطبيقات هاتف سريعة وآمنة وثنائية اللغة بالكامل، بما في ذلك الواجهات العربية من اليمين إلى اليسار. وتتصل التطبيقات بأجهزة إنترنت الأشياء عبر Bluetooth وNFC وبالأنظمة الخلفية لمؤسستك.",
    ),
    capabilities: [
      l("Flutter apps for Android and iOS from one code base", "تطبيقات Flutter لأندرويد وiOS من شيفرة واحدة"),
      l("Native Android and iOS development", "تطوير أصلي لأندرويد وiOS"),
      l("Arabic RTL, French and English interfaces", "واجهات بالعربية (من اليمين لليسار) والفرنسية والإنجليزية"),
      l("BLE/NFC device integration", "التكامل مع أجهزة BLE وNFC"),
      l("App attestation and secure authentication", "التحقق من سلامة التطبيق والمصادقة الآمنة"),
    ],
    technologies: ["Flutter", "Dart", "Kotlin", "Swift", "Firebase", "Keycloak"],
    image: "/images/abstract-1.webp",
  },
  {
    slug: "backend-enterprise-platforms",
    icon: "server",
    name: l("Backend & enterprise platforms", "الأنظمة الخلفية ومنصات المؤسسات"),
    summary: l("Django, APIs and PostgreSQL platforms built to last.", "منصات مبنية على Django وواجهات برمجية وPostgreSQL صُممت لتدوم."),
    description: l(
      "We design and build the platforms behind your products: well-documented APIs, robust data models and admin tools, integrated with your existing ERP, CRM and identity systems.",
      "نصمم ونبني المنصات التي تقف خلف منتجاتك: واجهات برمجية موثقة جيداً، ونماذج بيانات متينة، وأدوات إدارة، مع التكامل مع أنظمة ERP وCRM والهوية لديك.",
    ),
    capabilities: [
      l("REST and event-driven APIs", "واجهات REST وواجهات قائمة على الأحداث"),
      l("Data modelling on PostgreSQL and SQL Server", "نمذجة البيانات على PostgreSQL وSQL Server"),
      l("Integration with ERP, CRM and identity providers", "التكامل مع أنظمة ERP وCRM ومزودي الهوية"),
      l("Admin back-offices and reporting", "لوحات الإدارة والتقارير"),
      l("Performance, testing and documentation", "الأداء والاختبار والتوثيق"),
    ],
    technologies: ["Django", "Python", "PostgreSQL", "SQL Server", "REST", "Redis"],
    image: "/images/abstract-8.webp",
  },
  {
    slug: "devops-sovereign-hosting",
    icon: "shield",
    name: l("DevOps & sovereign hosting", "DevOps والاستضافة السيادية"),
    summary: l("Docker, Kubernetes, private registries and on-prem deployment.", "Docker وKubernetes وسجلات خاصة ونشر داخل المؤسسة."),
    description: l(
      "We deploy and run your systems where your data must stay: on-premises or in national data centres. Containers, Kubernetes, private registries and API gateways give you cloud-grade operations without sending data abroad.",
      "ننشر أنظمتك ونشغّلها حيث يجب أن تبقى بياناتك: داخل مقر المؤسسة أو في مراكز البيانات الوطنية. وتمنحك الحاويات وKubernetes والسجلات الخاصة وبوابات الواجهات البرمجية عمليات بمستوى السحابة دون إرسال البيانات إلى الخارج.",
    ),
    capabilities: [
      l("Containerisation with Docker and orchestration with Kubernetes", "الحاويات باستخدام Docker والتنسيق عبر Kubernetes"),
      l("Private container registries and CI/CD pipelines", "سجلات حاويات خاصة ومسارات CI/CD"),
      l("API gateways and identity with Keycloak/JWT", "بوابات الواجهات البرمجية والهوية عبر Keycloak وJWT"),
      l("On-prem and national-cloud deployment", "النشر داخل المؤسسة وعلى السحابة الوطنية"),
      l("Monitoring, backups and managed operations", "المراقبة والنسخ الاحتياطي والتشغيل المُدار"),
    ],
    technologies: ["Docker", "Kubernetes", "Harbor", "API gateway", "Keycloak", "Prometheus"],
    image: "/images/abstract-3.webp",
  },
  {
    slug: "consulting-poc-workshops",
    icon: "presentation",
    name: l("Consulting & POC workshops", "الاستشارات وورش إثبات المفهوم"),
    summary: l("From idea to a working proof of concept with your teams.", "من الفكرة إلى إثبات مفهوم يعمل مع فرقك."),
    description: l(
      "We run short, hands-on workshops where we deploy a working proof of concept on your data and infrastructure, then help you decide what to build next and how to scale it.",
      "ننظم ورش عمل قصيرة وتطبيقية ننشر خلالها إثبات مفهوم يعمل على بياناتك وبنيتك التحتية، ثم نساعدك على تحديد الخطوة التالية وكيفية التوسع.",
    ),
    capabilities: [
      l("Discovery and use-case prioritisation", "الاستكشاف وترتيب أولويات حالات الاستخدام"),
      l("Proof-of-concept deployment workshops", "ورش نشر إثبات المفهوم"),
      l("Architecture and security reviews", "مراجعات البنية والأمان"),
      l("Roadmaps for AI and IoT adoption", "خرائط طريق لتبنّي الذكاء الاصطناعي وإنترنت الأشياء"),
      l("Team training and hand-over", "تدريب الفرق والتسليم"),
    ],
    technologies: ["Workshops", "Architecture reviews", "Roadmapping"],
    image: "/images/abstract-10.webp",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
