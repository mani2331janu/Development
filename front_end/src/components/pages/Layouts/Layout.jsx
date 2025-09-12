import { Outlet } from "react-router-dom";
import Header from "./Header";
import AppSidebar from "./AppSideBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <AppSidebar />

      <div className="pt-16 pb-12 pl-64">
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
