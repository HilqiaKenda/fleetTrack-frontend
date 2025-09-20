import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import TruckIcon from "@heroicons/react/24/outline/TruckIcon";
import { MapPinIcon } from "@heroicons/react/24/outline";

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <MapPinIcon className="w-6 h-6 text-primary" />
            <p className="font-bold text-inherit">FleetTracker</p>
            <TruckIcon className="w-6 h-6 text-primary" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          <Link href={"/log"}>
            <p>Log</p>
          </Link>
          <Link href={"/trips"}>
            <p>Trips</p>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent> */}
    </HeroUINavbar>
  );
};
