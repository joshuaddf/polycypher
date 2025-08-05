import { GlobeLock, HatGlasses, KeyRound, LogIn } from "lucide-react";

export const SecurityInfo = [
  {
    icon: <LogIn size={20} />,
    caption: "Fast access",
    title: "Seamless login and signup.",
    description:
      "Quick, secure login and signup for easy access to PCOS detection tools, protecting user data with robust authentication.",
  },
  {
    icon: <GlobeLock size={20} />,
    caption: "Protects sensitive data",
    title: "Data encryption.",
    description:
      "AES-256 encryption safeguards PCOS health data, ensuring secure storage and transmission of sensitive information.",
  },
  {
    icon: <HatGlasses size={20} />,
    caption: "Patient data safety.",
    title: "Privacy-focused design.",
    description:
      "Built with privacy-first principles, minimizing data collection and ensuring HIPAA-compliant protection for PCOS patient info.",
  },
  {
    icon: <KeyRound size={20} />,
    caption: "Prevents unauthorized access.",
    title: "Two-factor authentication.",
    description:
      "2FA adds an extra security layer, using a device code to protect PCOS health data from unauthorized access.",
  },
];

export const howItWorks = [
  {
    title: "Complete Assessment",
    description:
      "Answer questions about your menstrual history, symptoms, and lifestyle factors",
  },
  {
    title: "AI Analysis",
    description:
      "Our advanced algorithms analyze your data against clinical patterns",
  },
  {
    title: "Get Results",
    description:
      "Receive personalized insights and recommendations for next steps",
  },
];

export const dashBoardNavLinks = [
  {
    title: "Clinical Portal",
    href: "/dashboard/clinical-portal",
  },
  {
    title: "PCOS Info",
    href: "/dashboard/pcos-info",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
  },
];
