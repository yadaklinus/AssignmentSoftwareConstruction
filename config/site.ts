export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "NEU Gombe Survey",
  description: "Student restaurant preference survey for North Eastern University Gombe.",
  navItems: [
    {
      label: "Survey",
      href: "/",
    },
    {
      label: "Admin",
      href: "/admin/dashboard",
    },
  ],
  navMenuItems: [
    {
      label: "Survey",
      href: "/",
    },
    {
      label: "Admin Dashboard",
      href: "/admin/dashboard",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
