import type { Localized } from "@/lib/i18n";

export type IndustryIcon = "satellite" | "hotel" | "landmark" | "truck" | "trophy" | "building" | "server" | "zap";

export interface Industry {
  slug: string;
  icon: IndustryIcon;
  name: Localized;
  description: Localized;
  /** Slugs from services.ts most relevant to the sector */
  services: string[];
}

const l = (en: string, ar: string): Localized => ({ en, ar });

export const industries: Industry[] = [
  {
    slug: "telecom-satellite",
    icon: "satellite",
    name: l("Telecom & satellite", "الاتصالات والأقمار الصناعية"),
    description: l(
      "AI agents that turn CRM and technical data into answers and reports, and real-time monitoring of telecom-site power.",
      "وكلاء ذكاء اصطناعي يحوّلون بيانات CRM والبيانات الفنية إلى إجابات وتقارير، ومراقبة لحظية لأنظمة الطاقة في مواقع الاتصالات.",
    ),
    services: ["ai-agents-llm", "backend-enterprise-platforms", "iot-connected-systems"],
  },
  {
    slug: "datacenters-enterprise-it",
    icon: "server",
    name: l("Datacenters & enterprise IT", "مراكز البيانات وتقنية المعلومات المؤسسية"),
    description: l(
      "Real-time monitoring of power, cooling and network equipment, with AI that finds the root cause before an outage.",
      "مراقبة لحظية للطاقة والتبريد ومعدات الشبكة، مع ذكاء اصطناعي يحدد السبب الجذري قبل حدوث الانقطاع.",
    ),
    services: ["iot-connected-systems", "devops-sovereign-hosting", "backend-enterprise-platforms"],
  },
  {
    slug: "energy",
    icon: "zap",
    name: l("Energy", "الطاقة"),
    description: l(
      "Telemetry from rectifiers, batteries and generators turned into alerts and predictive maintenance.",
      "تحويل قياسات المقوّمات والبطاريات والمولدات إلى تنبيهات وصيانة تنبؤية.",
    ),
    services: ["iot-connected-systems", "ai-agents-llm"],
  },
  {
    slug: "hospitality",
    icon: "hotel",
    name: l("Hospitality", "الضيافة والفنادق"),
    description: l(
      "Connected cold-chain monitoring and locally hosted platforms that keep guest data in the country.",
      "مراقبة متصلة لسلسلة التبريد ومنصات مستضافة محلياً تُبقي بيانات النزلاء داخل البلد.",
    ),
    services: ["backend-enterprise-platforms", "devops-sovereign-hosting", "iot-connected-systems"],
  },
  {
    slug: "religious-tourism-events",
    icon: "landmark",
    name: l("Religious tourism & events", "السياحة الدينية والفعاليات"),
    description: l(
      "Smart cards and proximity technology for crowd management during Hajj, Umrah and large gatherings.",
      "بطاقات ذكية وتقنيات قرب لإدارة الحشود في الحج والعمرة والتجمعات الكبرى.",
    ),
    services: ["iot-connected-systems", "mobile-apps"],
  },
  {
    slug: "logistics",
    icon: "truck",
    name: l("Logistics", "الخدمات اللوجستية"),
    description: l(
      "Cross-border delivery platforms and cold-chain monitoring from warehouse to doorstep.",
      "منصات توصيل عبر الحدود ومراقبة سلسلة التبريد من المستودع إلى باب العميل.",
    ),
    services: ["mobile-apps", "backend-enterprise-platforms", "iot-connected-systems"],
  },
  {
    slug: "sports-stadiums",
    icon: "trophy",
    name: l("Sports & stadiums", "الرياضة والملاعب"),
    description: l(
      "Real-time tracking and coordination of field and stadium teams at major tournaments.",
      "تتبّع وتنسيق لحظي للفرق الميدانية وفرق الملاعب في البطولات الكبرى.",
    ),
    services: ["iot-connected-systems", "mobile-apps"],
  },
  {
    slug: "public-sector",
    icon: "building",
    name: l("Public sector", "القطاع العام"),
    description: l(
      "Sovereign, on-premises platforms that meet data-localisation and security requirements.",
      "منصات سيادية داخل المؤسسة تلبي متطلبات توطين البيانات والأمان.",
    ),
    services: ["devops-sovereign-hosting", "consulting-poc-workshops"],
  },
];
