export const profile = {
  name: "David N. Efhan",
  role: "INFORMATION TECHNOLOGY GRADUATE",
  subtitle: "Full-Stack Web & Android Developer",
  location: "General Santos City, Philippines",
  phone: "0991 790 8624",
  email: "efhandavid53@gmail.com",
  github: "github.com/sna72419-sys",
  githubUrl: "https://github.com/sna72419-sys",
  summary:
    "Information Technology graduate and hands-on software developer with experience building full-stack web and Android applications. Skilled in Laravel, Next.js, Java, SQL, and modern web technologies. Developed and deployed real-world systems including POS, inventory management, and medical mission platforms. Seeking an opportunity to apply technical skills, continue learning, and contribute to organizational success.",
};

export const skills = {
  Languages: ["Java", "PHP", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
  "Frameworks & Data": [
    "Android SDK",
    "Laravel",
    "Next.js",
    "React",
    "Supabase",
    "SQLite",
    "Tailwind CSS",
  ],
  "Tools & Practices": [
    "Git",
    "GitHub",
    "REST APIs",
    "Vite",
    "PHPUnit",
    "Vitest",
    "Responsive Design",
    "Auth & Authorization",
    "Data Validation",
    "Microsoft Office",
  ],
};

export const experience = [
  {
    title: "Information Technology Intern",
    org: "CMO-IBA (Integrated Barangay Affairs)",
    period: "January 2026 — March 2026",
    points: [
      "Developed and delivered an inventory management system for office operations.",
      "Created organizational, signage, certificate, and public-service layout materials.",
      "Assisted in data encoding, inventory records management, and document processing.",
      "Supported barangay service activities while maintaining confidentiality and accuracy.",
    ],
  },
];

export type Project = {
  id: string;
  receiptNo: string;
  title: string;
  type: string;
  year: string;
  stack: string[];
  liveUrl?: string;
  lineItems: string[];
};

export const projects: Project[] = [
  {
    id: "pos-management",
    receiptNo: "0001",
    title: "POS Management",
    type: "Thesis Project — Android Application",
    year: "2026",
    stack: ["Java", "Android SDK", "SQLite", "Supabase", "Retrofit", "NanoHTTPD", "ZXing"],
    lineItems: [
      "Offline-capable POS + inventory app",
      "Barcode scanning, product/customer mgmt",
      "Cash & A/R sales, receipts, stock tracking",
      "Returns / exchanges, PDF reports",
      "LAN host-client sync, offline queueing",
      "Supabase cloud backup/restore, encrypted prefs",
    ],
  },
  {
    id: "easy-inventory-manager",
    receiptNo: "0002",
    title: "Easy Inventory Manager",
    type: "Academic Activity — Web Application",
    year: "2026",
    stack: ["Laravel 12", "PHP", "Tailwind CSS", "PHPUnit"],
    liveUrl: "https://easy-inventory-manager.site",
    lineItems: [
      "Role-based admin/staff workflows",
      "Barcode cashiering, stock-in/out",
      "Sales receipts, dashboards",
      "Low-stock alerts, audit logs",
      "Row-locking transactions, security headers",
      "Soft delete/restore, automated tests",
    ],
  },
  {
    id: "missioncare-hub",
    receiptNo: "0003",
    title: "MissionCare Hub",
    type: "Medical Mission — Full-Stack Web Project",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vitest"],
    liveUrl: "https://medical-mission-chi.vercel.app",
    lineItems: [
      "Outreach platform: activities & schedules",
      "Stories, photo galleries, proposal docs",
      "YouTube videos, contact/support content",
      "Editable site settings",
      "Supabase SSR auth & authorization",
      "Rate-limited APIs, caching, utility tests",
    ],
  },
];

export const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Ramon Magsaysay Memorial Colleges",
  location: "General Santos City, Philippines",
  period: "2023 — 2026",
};
