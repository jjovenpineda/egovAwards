import {
  LayoutDashboard,
  MapPin,
  MenuSquare,
  ListTodo,
  ListChecks,
  FolderCheck,
  Settings,
  Table,
  Pencil,
} from "lucide-react";

export const dashboardLinks = [
  {
    category: "Main",
    icons: LayoutDashboard,
    items: [
      {
        href: "/",
        label: "Form",
        icons: Table,
        query: null,
      },
    ],
  },
  {
    category: "Entries",
    icons: MapPin,
    items: [
      {
        href: "/entries",
        label: "Draft",
        icons: Pencil,
        query: { filter: "Draft" },
      },
      {
        href: "/entries",
        label: "All Entries",
        icons: MenuSquare,
        query: { filter: "All" },
      },
      {
        href: "/entries",
        label: "For Review",
        icons: ListTodo,
        query: { filter: "For Review" },
      },
      {
        href: "/entries",
        label: "Graded",
        icons: ListChecks,
        query: { filter: "Graded" },
      },
      {
        href: "/entries",
        label: "Final",
        icons: FolderCheck,
        query: { filter: "Final" },
      },
    ],
  },

  {
    category: "SETTINGS",
    icons: MapPin,
    items: [
      {
        href: "/settings",
        label: "Account Settings",
        icons: Settings,
        query: null,
      },
    ],
  },
];
export const filterChecklist = [
  {
    title: "FILTER BY STATUS",
    options: ["Select All", "For Review", "Graded"],
  },
  {
    title: "FILTER BY CATEGORY",
    options: ["Select All", "G2A", "G2B", "G2C", "G2D", "G2E"],
  },
  {
    title: "FILTER BY SDGs",
    options: [
      "Select All",
      "No Poverty",
      "Zero Hunger",
      "Good Health and Well-being",
      "Quality Education",
      "Gender Equality",
      "Clean Water and Sanitation",
      "Affordable and Clean Energy",
      "Decent Work and Economic Growth",
      "Industry, Innovation, and Infrastructure",
      "Reduced Inequalities",
      "Sustainable Cities and Communities",
      "Responsible Consumption and Production",
      "Climate Action",
      "Life Below Water",
      "Life on Land",
      "Peace, Justice, and Strong Institutions",
      "Partnerships for the Goals",
    ],
  },
  {
    title: "FILTER BY REGIONS",
    options: [
      "Select All",
      "NCR",
      "CAR",
      "Region 1",
      "Region 3",
      "Region 4A",
      "Region 4B",
      "Region 5",
      "Region 6",
      "Region 8",
      "Region 9",
      "Region 11",
      "Region 12",
      "Region 13",
      "BARMM",
    ],
  },
];
