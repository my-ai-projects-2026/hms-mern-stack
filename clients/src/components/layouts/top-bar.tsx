import { Link } from "@tanstack/react-router";
import { Asterisk, Bell, Settings } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Patients", path: "/patients" },
  { label: "Appointments", path: "/appointments" },
  { label: "Doctors", path: "/doctors" },
  { label: "Labs", path: "/labs" },
];

const Topbar = () => {
  return (
    <header className="fixed top-[15px] left-[15px] right-[15px] z-50 flex h-[72px] items-center justify-between px-6 border border-white/5 bg-[#161a22]/80 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 ml-2">
        <div className="bg-[#0066FF] p-1.5 rounded-lg shadow-[0_0_15px_rgba(0,102,255,0.4)] relative">
          <Asterisk className="size-5 text-white stroke-[3]" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white mb-0.5">
          MedEx
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-1.5">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.path as any}
            activeProps={{
              className:
                "bg-[#0066FF] text-white shadow-[0_4px_14px_0_rgba(0,102,255,0.39)] pointer-events-none",
            }}
            inactiveProps={{
              className:
                "text-[#8B93A0] hover:text-[#E2E8F0] hover:bg-white/[0.03]",
            }}
            className="px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-200 outline-none"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-4 mr-2">
        <button className="flex items-center justify-center size-9 rounded-full text-[#8B93A0] hover:text-white hover:bg-white/[0.05] transition-colors relative">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#FF3B30] rounded-full"></span>
        </button>
        <button className="flex items-center justify-center size-9 rounded-full text-[#8B93A0] hover:text-white hover:bg-white/[0.05] transition-colors">
          <Settings className="size-5" />
        </button>
        <div className="size-8 rounded-full bg-slate-700 overflow-hidden border border-white/10 cursor-pointer hover:border-white/30 transition-colors ml-1">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=doctor&backgroundColor=e2e8f0"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
