import { useKPIContext } from "@/lib/hooks";
import { DatePickerDemo } from "./ui/date-picker";

export default function FilterOptions() {
  const { numberOfSearchResults, loading } = useKPIContext();
  return (
    <div className="flex flex-col gap-5border-b-2 p-5 border-b-2 space-y-3">
      <DatePickerDemo />
      <span>
        {loading
          ? "loading results"
          : `Showing ${numberOfSearchResults} results`}
      </span>
    </div>
  );
}
