import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Topbar } from "#/components/layouts";

export const Route = createFileRoute("/(main)")({
  component: MainLayout,
});
function MainLayout() {
  return (
    <div className="min-h-screen bg-[#111318] text-slate-200 font-sans selection:bg-[#0066FF]/30 overflow-hidden flex flex-col">
      <Topbar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 pt-[100px] bg-[#111318]">
        <div className="max-w-[1600px] mx-auto h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
