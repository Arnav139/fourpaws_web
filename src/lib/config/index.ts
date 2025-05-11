import {
  Home,
  Users,
  PawPrint as Paw,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  BarChart,
  Megaphone,
  UserCog,
} from "lucide-react";

export const petSpecies = [
  "Dog",
  "Cat",
  "Bird",
  "Fish",
  "Reptile",
  "Rabbit",
  "Hamster",
  "Guinea Pig",
  "Other",
];

export const petSizes = ["Tiny", "Small", "Medium", "Large", "Extra Large"];

export const petGenders = ["Male", "Female", "Unknown"];

export const postTypes = [
  { value: "text", label: "Text Post" },
  { value: "media", label: "Media Post" },
  { value: "poll", label: "Poll" },
  { value: "link", label: "Link Share" },
  { value: "campaign", label: "Fundraising Campaign" },
  { value: "volunteer", label: "Volunteer Opportunity" },
  { value: "emergency", label: "Emergency Alert" },
];

export const emergencyTypes = [
  "Lost Pet",
  "Found Pet",
  "Medical Emergency",
  "Medical Advice",
  "Urgent Adoption",
  "Other",
];

export const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    color: "text-blue-500",
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
    color: "text-indigo-500",
  },
  {
    title: "Pets",
    href: "/pets",
    icon: Paw,
    color: "text-amber-500",
  },
  {
    title: "Posts",
    href: "/posts",
    icon: FileText,
    color: "text-emerald-500",
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    color: "text-rose-500",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart,
    color: "text-purple-500",
  },
  {
    title: "Campaigns",
    href: "/campaigns",
    icon: Megaphone,
    color: "text-orange-500",
  },
  {
    title: "Administrators",
    href: "/administrators",
    icon: UserCog,
    color: "text-cyan-500",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    color: "text-gray-500",
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
    color: "text-yellow-500",
  },
];

export const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = [".jpg", ".jpeg", ".png", ".webp"];
