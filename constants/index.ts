import {
  LayoutDashboard,
  MapPin,
  MenuSquare,
  ListTodo,
  ListChecks,
  FolderCheck,
  Settings,
  Table,
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
        label: "All Entries",
        icons: MenuSquare,
        query: { filter: "all" },
      },
      {
        href: "/entries",
        label: "For Review",
        icons: ListTodo,
        query: { filter: "review" },
      },
      {
        href: "/entries",
        label: "Graded",
        icons: ListChecks,
        query: { filter: "graded" },
      },
      {
        href: "/entries",
        label: "Final",
        icons: FolderCheck,
        query: { filter: "final" },
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
