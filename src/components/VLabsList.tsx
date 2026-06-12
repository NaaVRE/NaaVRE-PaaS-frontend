"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import {useDebouncedValue} from "@mantine/hooks";
import clsx from "clsx";

import {VLab, VLabLabel} from "@/types/vlab";
import {VLabLabelChip, VLabLabelChips} from "@/components/VLabLabelChips";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

function CheckIcon() {
  return (
    <div className="flex items-center">
      <svg viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
           className="h-2"
      >
        <path
          d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z"
          fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
      </svg>
    </div>
  )
}

export function VLabsList({
  listUrl,
  labelsListUrl,
  title,
  showErrors = true,
  showLoading = true,
  enableFilters = false,
}: {
  listUrl: string;
  labelsListUrl?: string;
  showErrors?: boolean;
  showLoading?: boolean;
  title?: string;
  enableFilters?: boolean;
}) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [vlabs, setVlabs] = useState<Array<VLab>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState(() => searchParams?.get("search") ?? "");
  const [availableLabels, setAvailableLabels] = useState<Array<VLabLabel>>([]);
  const [activeLabels, setActiveLabels] = useState<Set<string>>(() => {
    const labels = searchParams?.get("labels");
    return labels ? new Set(labels.split(",").filter(Boolean)) : new Set();
  });
  const [debouncedSearch] = useDebouncedValue(search, 200);

  // Update URL searchParams
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    if (enableFilters && debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    // activeLabels are handled manually because URLSearchParams.toString percent-encodes commas
    params.delete("labels");
    let paramsStr = params.toString()
    if (enableFilters && activeLabels.size > 0) {
      const labelsStr = `labels=${Array.from(activeLabels).join(",")}`;
      paramsStr = paramsStr ? `${paramsStr}&${labelsStr}` : labelsStr;
    }
    router.replace(`${pathname}?${paramsStr}`);
  }, [router, pathname, searchParams, enableFilters, debouncedSearch, activeLabels])

  // Fetch labels
  useEffect(() => {
    if (!enableFilters || !labelsListUrl) {
      return;
    }
    fetch(labelsListUrl)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => setAvailableLabels(data.results ?? data))
      .catch(() => {});
  }, [enableFilters, labelsListUrl]);

  // Fetch labs
  useEffect(() => {
    if (!listUrl) {
      return
    }
    setLoading(true)
    setError(false)

    const url = new URL(listUrl);
    if (enableFilters && searchParams) {
      searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        return res.json()
      })
      .then((data) => {
        setVlabs(data.results);
      })
      .catch((exception) => {
        console.log(exception)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [listUrl, enableFilters, searchParams]);

  function toggleLabel(labelTitle: string) {
    const next = new Set(activeLabels);
    if (next.has(labelTitle)) {
      next.delete(labelTitle)
    } else {
      next.add(labelTitle)
    }
    setActiveLabels(next)
  }

  if (error && showErrors) {
    return (
      <div className='grid grid-cols-1 gap-4'>
        <div className="rounded overflow-hidden shadow-lg bg-red-100 border border-red-400 text-red-700  p-5">
          Something went wrong while loading virtual labs.
        </div>
      </div>
    )
  }

  return (
    <>
      {title && (vlabs.length > 0 || enableFilters) && (
        <div className='gap-4 text-lg'>
          <h2>{title}</h2>
        </div>
      )}

      {enableFilters && (
        <>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="
              w-full mb-2 px-3 py-1
              rounded-full
              bg-surface shadow-sm
              "
          />
          {availableLabels.length > 0 && (
            <div className="flex flex-wrap mb-2">
              {availableLabels.map(label => {
                const filtered = activeLabels.size !== 0;
                const active = activeLabels.has(label.title)
                return (
                  <VLabLabelChip
                    key={label.title}
                    label={label}
                    as={'button'}
                    onClick={() => {
                      toggleLabel(label.title)
                    }}
                    start={(filtered && active) ? <CheckIcon/> : undefined}
                    className={clsx(
                      "cursor-pointer shadow-sm",
                      (filtered && !active) ? "bg-surface border-transparent text-onSurface" : ""
                    )}
                  />
                )
              })}
            </div>
          )}
        </>
      )}


      <ul
        aria-label={`${title} list`}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      >
        {loading && showLoading ? (
          <li className="rounded overflow-hidden shadow-lg bg-surface animate">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-30 m-1 object-cover"
                src={`${basePath}/vlab-loading.svg`}
                alt="Loading virtual lab image"
              />
              <div className="font-bold text-l mb-2 bg-primaryMuted text-onPrimary p-5">
                <p className="animate-pulse">
                  <span
                    className="inline-block min-h-[1em] w-6/12 flex-auto cursor-wait bg-onPrimary align-middle opacity-50"></span>
                </p>
              </div>
              <div className="px-3 py-2">
                <p className="text-base truncate animate-pulse ...">
                  <span
                    className="inline-block min-h-[0.6em] w-6/12 flex-auto cursor-wait bg-onSurface align-middle opacity-50"></span>
                </p>
              </div>
            </div>
          </li>
        ) : (
          vlabs.map((vlab: VLab) => {
            return (
              <li
                key={vlab.slug}
                className="
                  rounded overflow-hidden shadow-lg bg-surface
                    [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-primary [&:has(:focus-visible)]:outline-none
                "
              >
                <Link
                  aria-label={vlab.title}
                  href={`/vl/${vlab.slug}`}
                  className="
                  "
                >
                  <div>
                    <div
                      className="flex justify-between items-end"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="h-30 m-1 object-cover"
                        src={vlab.image || `${basePath}/vlab-default.svg`}
                        alt={`${vlab.title} image`}
                      />
                      <VLabLabelChips labels={vlab.labels}/>
                    </div>
                    <div className="font-bold text-l mb-2 bg-primary text-onPrimary p-5">{vlab.title}</div>
                    <div className="px-3 py-2">
                      <p className="text-onSurface line-clamp-2">
                        {vlab.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </>
  )
}
