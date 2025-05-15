import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/react'
import clsx from "clsx"
import WorkflowRuns from "./VLabAssets/WorkflowRuns";
import DataProducts from "./VLabAssets/DataProducts";
import GeoDataProducts from "./VLabAssets/GeoDataProducts";
import {Fragment} from "react";

const tabs = [
  {
    title: "Workflow runs",
    panelComponent: WorkflowRuns,
  },
  {
    title: "Data Products",
    panelComponent: DataProducts,
  },
  {
    title: "Geographic data products",
    panelComponent: GeoDataProducts,
  },
]

export default function VLabAssets({slug}: {slug?: string | string[]}) {

  return (
    <div className="space-y-8">
      <p className="text-2xl font-sans">Assets</p>
      <TabGroup>
        <TabList className="mb-5 flex list-none flex-col pl-0 sm:flex-row">
          {tabs.map(tab => (
              <Tab as={Fragment} key={tab.title}>
                <button
                  className={clsx(
                    "py-1 px-8 max-h-16",
                    "data-selected:bg-secondary data-selected:text-onSecondary",
                    "bg-surface text-primaryMuted hover:text-black",
                  )}
                >
                  {tab.title}
                </button>
              </Tab>
            )
          )}
        </TabList>
        <TabPanels>
          {tabs.map((tab) => {
            return (
              <TabPanel as={Fragment} key={tab.title}>
                <tab.panelComponent slug={slug}/>
              </TabPanel>
            )
          })}
        </TabPanels>
      </TabGroup>
    </div>
  )
}
