import { Outlet } from "react-router-dom";
import Header from "./Header";
import AppSidebar from "./AppSideBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // auto-collapse on mobile
      setCollapsed(mobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = collapsed ? 80 : 250;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* pass collapsed & toggle down */}
      <Header
        sidebarWidth={isMobile ? 0 : sidebarWidth}
        onToggleSidebar={() => setCollapsed(c => !c)}
      />

      <AppSidebar
        collapsed={collapsed}
        isMobile={isMobile}
        onToggle={() => setCollapsed(c => !c)}
      />

      <div
        className={`pt-16 pb-12 transition-all duration-300`}
        style={{ paddingLeft: isMobile ? 0 : sidebarWidth }}
      >
        <main className="min-h-[calc(100vh-4rem-3rem)] overflow-y-auto p-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/30 shadow-sm p-6">
              <Outlet />
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
