import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/(dashboard)/")({ component: App });

function App() {
  return (
    <div>
      <section>
        <h1 className="text-2xl">Home</h1>
      </section>
    </div>
  );
}
