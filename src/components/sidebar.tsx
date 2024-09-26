"use client";

import { useKPIContext } from "@/lib/hooks";
import FilterOptions from "./filter-options";
import Spinner from "./spinner";
import ListItems from "./list-items";

export default function Sidebar() {
  const { kpis, loading } = useKPIContext();

  return (
    <div className="flex flex-col md:w-[440px]">
      <FilterOptions />
      {loading ? (
        <Spinner />
      ) : kpis ? (
        <div className=" overflow-y-scroll mt-0">
          <ListItems />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
