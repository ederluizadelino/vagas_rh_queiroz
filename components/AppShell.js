import Sidebar from "./Sidebar";
export default function AppShell({ children }) {
  return (
    <div className="container-shell">
      <Sidebar />
      <main className="flex-1 space-y-6">{children}</main>
    </div>
  );
}
