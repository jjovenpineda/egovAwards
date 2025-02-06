import {
  ChartBar,
  Folder,
  FolderArchive,
  HelpCircle,
  House,
  LucideLink,
  Map,
  MapPin,
  MessageCircle,
} from "lucide-react";

export const links = [
  {
    label: "Dashboard",
    icons: MapPin,
    children: [
      { href: "######", label: "locations", icons: House },
      { href: "#######", label: "locations", icons: Map },
    ],
  },
  {
    href: "##",
    label: "Campaigns",
    icons: Folder,
  },
  {
    href: "###",
    label: "Chat",
    icons: MessageCircle,
  },
  {
    href: "####",
    label: "Support",
    icons: HelpCircle,
  },
  {
    href: "#####",
    label: "Archive",
    icons: FolderArchive,
  },
];
