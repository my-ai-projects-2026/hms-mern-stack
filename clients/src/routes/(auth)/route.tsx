import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-[#111318] selection:bg-[#0066FF]/30 font-sans">
        {/* Dynamic Background Elements */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-[#0066FF] mix-blend-screen blur-[120px] opacity-10 animate-pulse pointer-events-none"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#3385ff] mix-blend-screen blur-[100px] opacity-[0.07] animate-pulse pointer-events-none"
          style={{ animationDuration: "10s", animationDelay: "1s" }}
        ></div>

        <Outlet />
      </main>
    </>
  );
}
