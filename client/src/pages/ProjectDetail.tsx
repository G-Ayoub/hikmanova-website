import Layout from "@/components/Layout";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const projectsData: Record<string, any> = {
  "fifa-team-monitor": {
    title: "TeamMonitor - AI-Powered Workforce Tracking & Management",
    category: "AI",
    year: 2025,
    description: "AI-powered workforce tracking platform for real-time monitoring, optimization, and coordination of large-scale field teams",
    image: "/images/qatar-world-cup.jpg",
    context: "During the FIFA World Cup 2022, managing thousands of distributed field personnel across multiple venues created operational complexity, delayed reporting, and limited real-time visibility for decision-makers.",
    approach: "We developed an AI-driven workforce management platform integrating real-time GPS tracking, predictive analytics, automated attendance logging, and performance dashboards. The system leveraged machine learning models to forecast staffing needs and optimize task allocation dynamically.",
    results: [
      "Real-time tracking of 5,000+ field staff",
      "35% improvement in response time to incidents",
      "Automated attendance and shift validation",
      "20% increase in operational efficiency",
      "Centralized command dashboard for live monitoring"
    ],
    gallery: ["/images/qatar-world-cup.jpg", "/images/abstract-1.jpg", "/images/abstract-2.jpg"],
    technologies: ["Python", "TensorFlow", "React", "Node.js", "PostgreSQL", "Docker", "AWS"],
    relatedProjects: ["neural-vision-platform", "data-pipeline-architecture"]
  },
  "nusuk-smart-card": {
    title: "Nusuk Smart Card Enhancement",
    category: "AI",
    year: 2025,
    description: "AI-enhanced smart card system for secure identity verification, crowd management, and service optimization for pilgrims",
    image: "/images/nusuk-card.jpg",
    context: "The existing Nusuk smart card system required modernization to improve identity verification speed, enhance security, and provide better analytics for managing millions of pilgrims efficiently.",
    approach: "We integrated artificial intelligence with biometric verification, real-time validation systems, and predictive crowd analytics. The platform included secure QR/NFC authentication, fraud detection algorithms, and centralized data dashboards for authorities.",
    results: [
      "40% faster identity verification process",
      "Enhanced fraud detection with AI anomaly detection",
      "Real-time crowd flow analytics",
      "Improved pilgrim service coordination",
      "Scalable infrastructure supporting millions of users"
    ],
    gallery: ["/images/nusuk-card.jpg", "/images/abstract-4.jpg", "/images/abstract-3.jpg"],
    technologies: ["Python", "TensorFlow", "OpenCV", "Node.js", "PostgreSQL", "Kubernetes", "Docker"],
    relatedProjects: ["predictive-analytics-engine", "cloud-infrastructure-optimization"]
  },
  "neural-vision-platform": {
    title: "Neural Vision Platform",
    category: "AI",
    year: 2025,
    description: "Advanced computer vision system for real-time object detection and classification",
    image: "/images/abstract-1.jpg",
    context: "Our client needed a robust computer vision solution to automate quality control in their manufacturing process. Manual inspection was time-consuming and prone to human error.",
    approach: "We developed a deep learning-based system using state-of-the-art convolutional neural networks (CNNs) trained on thousands of product images. The system was deployed on edge devices for real-time processing with minimal latency.",
    results: [
      "99.2% accuracy in defect detection",
      "50% reduction in inspection time",
      "Eliminated 95% of manual inspection errors",
      "ROI achieved in 6 months",
    ],
    gallery: ["/images/abstract-2.jpg", "/images/abstract-3.jpg", "/images/abstract-4.jpg"],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "CUDA", "Docker"],
    relatedProjects: ["predictive-analytics-engine", "data-pipeline-architecture"],
  },
  "data-pipeline-architecture": {
    title: "Data Pipeline Architecture",
    category: "Data",
    year: 2025,
    description: "Scalable ETL pipeline processing millions of records daily",
    image: "/images/abstract-2.jpg",
    context: "The client was struggling with data silos and inconsistent reporting across departments. Their legacy systems couldn't handle the growing data volume.",
    approach: "We designed and implemented a modern data pipeline using Apache Spark and Kafka, enabling real-time data ingestion, transformation, and loading. The system supports both batch and streaming workloads.",
    results: [
      "Process 50M+ records daily",
      "99.99% uptime SLA",
      "Sub-second query latency",
      "60% reduction in data processing costs",
    ],
    gallery: ["/images/abstract-5.jpg", "/images/abstract-6.jpg", "/images/abstract-7.jpg"],
    technologies: ["Apache Spark", "Kafka", "Airflow", "PostgreSQL", "Kubernetes", "Terraform"],
    relatedProjects: ["realtime-data-warehouse", "cloud-infrastructure-optimization"],
  },
  "cloud-infrastructure-optimization": {
    title: "Cloud Infrastructure Optimization",
    category: "Cloud",
    year: 2025,
    description: "Reduced cloud costs by 40% through intelligent optimization",
    image: "/images/abstract-3.jpg",
    context: "The client's cloud spending was spiraling out of control with inefficient resource allocation and underutilized services.",
    approach: "We conducted a comprehensive cloud audit, identified optimization opportunities, and implemented auto-scaling policies, reserved instances, and spot instances. We also consolidated redundant services.",
    results: [
      "40% reduction in cloud costs",
      "Improved application performance",
      "Better resource utilization",
      "Automated cost monitoring",
    ],
    gallery: ["/images/abstract-8.jpg", "/images/abstract-9.jpg", "/images/abstract-10.jpg"],
    technologies: ["AWS", "Terraform", "CloudFormation", "Kubernetes", "Prometheus", "Grafana"],
    relatedProjects: ["kubernetes-migration", "data-pipeline-architecture"],
  },
  "robotics-control-system": {
    title: "Robotics Control System",
    category: "IoT & IIoT",
    year: 2025,
    description: "Autonomous robotics control system with ML-based path planning",
    image: "/images/abstract-4.jpg",
    context: "The client needed an autonomous robotic system for warehouse automation with intelligent navigation and obstacle avoidance.",
    approach: "We developed a comprehensive control system using ROS (Robot Operating System) with machine learning-based path planning algorithms. The system integrates LIDAR, cameras, and IMU sensors.",
    results: [
      "95% autonomous operation",
      "Real-time obstacle detection",
      "30% improvement in warehouse efficiency",
      "Scalable to fleet management",
    ],
    gallery: ["/images/abstract-3.jpg", "/images/abstract-6.jpg", "/images/abstract-11.jpg"],
    technologies: ["ROS", "Python", "C++", "LIDAR", "TensorFlow", "Gazebo"],
    relatedProjects: ["neural-vision-platform", "autonomous-delivery-robot"],
  },
  "ecommerce-platform": {
    title: "E-Commerce Platform",
    category: "Software Engineering",
    year: 2025,
    description: "Full-stack e-commerce platform with AI recommendations",
    image: "/images/abstract-5.jpg",
    context: "The client wanted to launch a modern e-commerce platform with personalized recommendations and real-time inventory management.",
    approach: "We built a full-stack platform using React, Node.js, and PostgreSQL with machine learning-powered recommendation engine. The system handles millions of transactions daily.",
    results: [
      "20% increase in average order value",
      "99.9% uptime",
      "Sub-second page load times",
      "Seamless integration with existing systems",
    ],
    gallery: ["/images/abstract-7.jpg", "/images/abstract-8.jpg", "/images/abstract-12.jpg"],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Elasticsearch", "Docker"],
    relatedProjects: ["data-pipeline-architecture", "predictive-analytics-engine"],
  },
  "predictive-analytics-engine": {
    title: "Predictive Analytics Engine",
    category: "AI",
    year: 2025,
    description: "Machine learning engine for predictive analytics",
    image: "/images/abstract-6.jpg",
    context: "The client needed predictive analytics to forecast demand and identify market trends for better business planning.",
    approach: "We developed an ensemble machine learning model combining multiple algorithms for demand forecasting. The system includes automated feature engineering and model retraining.",
    results: [
      "85% forecast accuracy",
      "Reduced inventory costs",
      "Improved demand planning",
      "Real-time predictions",
    ],
    gallery: ["/images/abstract-4.jpg", "/images/abstract-5.jpg", "/images/abstract-9.jpg"],
    technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "FastAPI", "PostgreSQL"],
    relatedProjects: ["neural-vision-platform", "data-pipeline-architecture"],
  },
  "realtime-data-warehouse": {
    title: "Real-Time Data Warehouse",
    category: "Data",
    year: 2025,
    description: "Enterprise data warehouse supporting real-time queries",
    image: "/images/abstract-7.jpg",
    context: "The client needed a data warehouse that could support real-time analytics while maintaining historical data for trend analysis.",
    approach: "We implemented a modern data warehouse using Snowflake with real-time data ingestion pipelines. The system supports complex analytical queries with sub-second response times.",
    results: [
      "Real-time analytics capability",
      "Support for 1000+ concurrent users",
      "Reduced query latency by 90%",
      "Cost-effective scaling",
    ],
    gallery: ["/images/abstract-8.jpg", "/images/abstract-10.jpg", "/images/abstract-12.jpg"],
    technologies: ["Snowflake", "dbt", "Fivetran", "Tableau", "Python", "SQL"],
    relatedProjects: ["data-pipeline-architecture", "cloud-infrastructure-optimization"],
  },
  "kubernetes-migration": {
    title: "Kubernetes Migration",
    category: "Cloud",
    year: 2025,
    description: "Migrated legacy applications to Kubernetes",
    image: "/images/abstract-8.jpg",
    context: "The client's legacy infrastructure was difficult to scale and maintain. They needed to modernize their deployment process.",
    approach: "We containerized their applications, set up a Kubernetes cluster, and implemented CI/CD pipelines. The migration was done with zero downtime.",
    results: [
      "Improved scalability",
      "Reduced operational overhead",
      "Faster deployment cycles",
      "Better resource utilization",
    ],
    gallery: ["/images/abstract-9.jpg", "/images/abstract-10.jpg", "/images/abstract-11.jpg"],
    technologies: ["Kubernetes", "Docker", "Helm", "GitLab CI/CD", "Prometheus", "ELK Stack"],
    relatedProjects: ["cloud-infrastructure-optimization", "data-pipeline-architecture"],
  },
  "autonomous-delivery-robot": {
    title: "Autonomous Delivery Robot",
    category: "IoT & IIoT",
    year: 2025,
    description: "Autonomous delivery robot with computer vision and navigation",
    image: "/images/abstract-9.jpg",
    context: "The client wanted to automate last-mile delivery with autonomous robots for urban environments.",
    approach: "We developed a complete autonomous delivery system with computer vision for navigation, real-time traffic awareness, and secure package handling. The system includes cloud-based fleet management.",
    results: [
      "Autonomous operation in urban environments",
      "Real-time traffic adaptation",
      "99.5% successful deliveries",
      "Scalable fleet management",
    ],
    gallery: ["/images/abstract-10.jpg", "/images/abstract-11.jpg", "/images/abstract-12.jpg"],
    technologies: ["ROS", "Python", "TensorFlow", "GPS/GNSS", "LTE/5G", "Cloud APIs"],
    relatedProjects: ["robotics-control-system", "neural-vision-platform"],
  },
  "cryptocurrency-investment-platform": {
    title: "Cryptocurrency Investment Platform",
    category: "Software Engineering",
    year: 2025,
    description: "Secure cryptocurrency investment platform with real-time market analytics and portfolio management",
    image: "/images/abstract-2.jpg",
    context: "The client needed a modern cryptocurrency investment platform that could handle high-frequency trading, real-time market data, and secure asset management for thousands of concurrent users.",
    approach: "We built a full-stack platform using React for the frontend and Node.js for the backend, integrated with major cryptocurrency exchanges via APIs. The system includes real-time WebSocket connections for market data, advanced portfolio analytics, and multi-signature wallet security.",
    results: [
      "Support for 10,000+ concurrent users",
      "Real-time market data with <100ms latency",
      "Advanced portfolio analytics and risk management",
      "99.99% uptime SLA",
      "Secure multi-signature wallet implementation"
    ],
    gallery: ["/images/abstract-2.jpg", "/images/abstract-1.jpg", "/images/abstract-2.jpg"],
    technologies: ["React", "Node.js", "PostgreSQL", "WebSocket", "Redis", "AWS", "Docker"],
    relatedProjects: ["data-pipeline-architecture", "ecommerce-platform"]
  },
  "smart-chatbot-customer-service": {
    title: "Smart Chatbot for Customer Service",
    category: "AI",
    year: 2025,
    description: "AI-powered chatbot system for intelligent customer service and support automation",
    image: "/images/abstract-2.jpg",
    context: "The client's customer support team was overwhelmed with repetitive inquiries, leading to long response times and customer dissatisfaction. They needed an intelligent system to handle common questions while seamlessly escalating complex issues to human agents.",
    approach: "We developed an advanced chatbot using natural language processing and machine learning. The system uses intent recognition, entity extraction, and context management to understand customer queries. It integrates with their CRM system and knowledge base, with intelligent routing to human agents when needed.",
    results: [
      "Handles 70% of customer inquiries automatically",
      "Average response time reduced from 2 hours to <1 minute",
      "Customer satisfaction score improved by 35%",
      "30% reduction in support team workload",
      "24/7 availability across multiple channels"
    ],
    gallery: ["/images/abstract-2.jpg", "/images/abstract-3.jpg", "/images/abstract-4.jpg"],
    technologies: ["Python", "NLP", "TensorFlow", "Node.js", "React", "PostgreSQL", "AWS"],
    relatedProjects: ["neural-vision-platform", "predictive-analytics-engine"]
  },
  "intervention-vouchers-erp": {
    title: "Intervention Vouchers ERP System",
    category: "Software Engineering",
    year: 2025,
    description: "Enterprise resource planning system for managing intervention vouchers and field operations",
    image: "/images/abstract-2.jpg",
    context: "The organization needed to streamline their intervention voucher management process, which was previously handled through manual paperwork and spreadsheets. This led to delays, errors, and difficulty tracking field operations across multiple locations.",
    approach: "We developed a comprehensive ERP system with modules for voucher creation, approval workflows, field team management, and real-time tracking. The system includes mobile apps for field teams, automated reporting, and integration with accounting systems.",
    results: [
      "Processing time reduced by 80%",
      "Error rate decreased from 15% to <1%",
      "Real-time visibility into all field operations",
      "Automated approval workflows",
      "Comprehensive audit trails and compliance reporting"
    ],
    gallery: ["/images/abstract-2.jpg", "/images/abstract-5.jpg", "/images/abstract-6.jpg"],
    technologies: ["React", "Node.js", "PostgreSQL", "React Native", "Docker", "AWS"],
    relatedProjects: ["ecommerce-platform", "data-pipeline-architecture"]
  },
  "technological-dependency-research": {
    title: "Technological Dependency Research Platform",
    category: "Data",
    year: 2025,
    description: "Research platform for analyzing technological dependencies and supply chain risks",
    image: "/images/abstract-2.jpg",
    context: "Organizations needed better tools to understand their technological dependencies and identify potential supply chain risks. Manual analysis was time-consuming and incomplete.",
    approach: "We built a comprehensive research platform that analyzes technology stacks, identifies dependencies, and maps supply chain relationships. The platform uses web scraping, API integrations, and machine learning to identify risks and provide actionable insights.",
    results: [
      "Analyzed 5,000+ technology dependencies",
      "Identified critical supply chain risks",
      "Automated dependency tracking and updates",
      "Risk scoring and prioritization system",
      "Executive dashboards for decision-making"
    ],
    gallery: ["/images/abstract-2.jpg", "/images/abstract-7.jpg", "/images/abstract-8.jpg"],
    technologies: ["Python", "Scrapy", "PostgreSQL", "React", "Node.js", "Elasticsearch"],
    relatedProjects: ["data-pipeline-architecture", "predictive-analytics-engine"]
  },
};


export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData[slug || ""];

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist.</p>
            <Link href="/projects">
              <Button>Back to Projects</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedProjects = project.relatedProjects
    .map((slug: string) => ({ slug, ...projectsData[slug] } as any))
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container">
          <Link href="/projects">
            <a className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </a>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{project.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
              <p className="text-sm text-muted-foreground">Completed in {project.year}</p>
            </div>
            <div className="rounded-lg overflow-hidden h-96">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-serif font-bold mb-6">Context</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.context}</p>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-serif font-bold mb-6">Our Approach</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{project.approach}</p>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-serif font-bold mb-8">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.results.map((result: string, idx: number) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                </div>
                <p className="text-lg">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold mb-8">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((image: string, idx: number) => (
              <div key={idx} className="rounded-lg overflow-hidden h-64">
                <img
                  src={image}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-serif font-bold mb-8">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech: string, idx: number) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-serif font-bold mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((related: any) => (
                <Link key={related.slug} href={`/projects/${related.slug}`}>
                  <a className="group card-hover rounded-lg overflow-hidden bg-card border border-border">
                    <div className="relative overflow-hidden h-48 bg-muted">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {related.description}
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Interested in a Similar Project?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss how we can help you achieve your goals
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2">
              Get In Touch
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

