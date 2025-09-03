import React, {Fragment} from "react";
import Link from "next/link";
import clsx from "clsx";
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react";
import {
  IconDeviceLaptop,
  IconGridDots,
  IconHelp,
  IconLayoutBoard,
  IconLeaf,
  IconLock,
  IconSchool,
  IconSearch,
  IconServer,
  IconUsersGroup,
} from "@tabler/icons-react";

const links = [
  {
    icon: <IconLayoutBoard />,
    label: "MyLifeWatch",
    href: "https://my.lifewatch.dev/dashboard",
  },
  {
    icon: <IconDeviceLaptop />,
    label: "NaaVRE",
    href: "https://beta.naavre.net",
  },
  {
    icon: <IconServer />,
    label: "Metadata Catalogue",
    href: "https://metadatacatalogue.lifewatch.eu/",
  },
  {
    icon: <IconSearch />,
    label: "Search",
    href: "https://search.lifewatch.eu/",
  },
  {
    icon: <IconLeaf />,
    label: "EcoPortal",
    href: "https://ecoportal.lifewatch.eu/",
  },
  {
    icon: <IconLock />,
    label: "LifeBlock",
    href: "https://www.lifeblock.eu/",
  },
  {
    icon: <IconUsersGroup />,
    label: "Community",
    href: "https://community.lifewatch.eu/",
  },
  {
    icon: <IconSchool />,
    label: "Training",
    href: "https://training.lifewatch.eu/",
  },
  {
    icon: <IconHelp />,
    label: "Help Desk",
    href: "https://helpdesk.lifewatch.eu/",
  },
]

export function LifeWatchUnifiedMenu({
  className,
}: {
  className: string
}) {
  return (
    <Menu as="div" className={className} >
      <div>
        <MenuButton
          className="hover:bg-surfaceContainer p-1 rounded-full hover:cursor-pointer"
        >
          <IconGridDots />
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
          className="mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded bg-surface shadow-lg ring-1 ring-gray-200 focus:outline-none"
          anchor="bottom end"
        >
          <div className="px-1 py-1 ">
            {links.map(link => {
              return (
                <MenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-onSurface",
                      "data-active:bg-primary data-active:!text-onPrimary",
                      "text-onSurface",
                      "group flex w-full items-center rounded px-2 py-2"
                    )}
                  >
                    <div className="flex">
                      <span className="flex-none pr-3">{link.icon}</span>
                      <span className="flex-1">{link.label}</span>
                    </div>
                  </Link>
                </MenuItem>
              )
            })}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
