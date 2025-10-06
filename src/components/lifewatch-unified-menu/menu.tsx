import React, {Fragment} from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react";
import {IconGridDots} from "@tabler/icons-react";

import svgCatalogue from "./icons/catalogue.svg";
import svgCommunity from "./icons/community.svg";
import svgEcoPortal from "./icons/ecoportal.svg";
import svgHelpDesk from "./icons/helpdesk.svg";
import svgLifeBlock from "./icons/lifeblock.svg";
import svgMyLifeWatch from "./icons/mylifewatch.svg";
import svgSearch from "./icons/search.svg";
import svgTraining from "./icons/training.svg";
import svgVres from "./icons/vres.svg";

const links = [
  {
    svg: svgMyLifeWatch,
    label: "My LifeWatch",
    href: "https://my.lifewatch.dev",
  },
  {
    svg: svgSearch,
    label: "Search",
    href: "https://search.lifewatch.eu",
  },
  {
    svg: svgCatalogue,
    label: "Catalogue",
    href: "https://metadatacatalogue.lifewatch.eu",
  },
  {
    svg: svgEcoPortal,
    label: "EcoPortal",
    href: "https://ecoportal.lifewatch.eu",
  },
  {
    svg: svgVres,
    label: "NaaVRE",
    href: "https://naavre.lifewatch.dev",
  },
  {
    svg: svgLifeBlock,
    label: "LifeBlock",
    href: "https://www.lifeblock.eu",
  },
  {
    svg: svgCommunity,
    label: "Community",
    href: "https://community.lifewatch.eu",
  },
  {
    svg: svgTraining,
    label: "Training",
    href: "https://training.lifewatch.eu",
  },
  {
    svg: svgHelpDesk,
    label: "Help Desk",
    href: "https://helpdesk.lifewatch.eu",
  },
]

export function LifeWatchUnifiedMenu({
                                       className,
                                     }: {
  className: string
}) {
  return (
    <Menu as="div" className={className}>
      <div>
        <MenuButton
          className="hover:bg-surfaceContainer p-1 rounded-full hover:cursor-pointer"
        >
          <IconGridDots/>
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={clsx(
            "mt-2 origin-top-right",
            "bg-surface shadow-lg ring-1 ring-[#f2f2f2] focus:outline-none",
            "rounded-[8px]",
            "p-4",
            "grid grid-cols-3"
          )}
          anchor="bottom end"
        >
          {links.map(link => {
            return (
              <MenuItem key={link.href}>
                <Link
                  target="_blank"
                  href={link.href}
                  className={clsx(
                    "text-[#0f4e8a]",
                    "data-active:bg-gray-100",
                    "text-[14px]",
                    "rounded px-2 py-3",
                    "flex flex-col items-center"
                  )}
                >
                  <Image className="size-7 mb-1.5" src={link.svg} alt={`${link.label} icon`}/>
                  <span className="">{link.label}</span>
                </Link>
              </MenuItem>
            )
          })}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
