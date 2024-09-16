import { useKPIContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function ListItems() {
  const { kpis, handleSidebarItemClick, loading } = useKPIContext();
  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }
  return (
    <>
      {kpis?.map((kpi, index) => (
        <div
          key={index}
          onClick={() => handleSidebarItemClick(kpi)}
          className={cn(
            "bg-white p-4 rounded-lg shadow-md hover:bg-gray-200 transition cursor-pointer",
            loading && "animate-pulse"
          )}
        >
          <h3 className="text-lg font-semibold">
            Team: {kpi.team || "No Team"}
          </h3>
          <p>
            Assigned:{" "}
            <span className="font-semibold">
              {kpi.assigned || "not assigned"}
            </span>
          </p>
        </div>
      ))}
    </>
  );
}
