import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-base-200 lg:px-10 py-10">
      <Outlet />
    </div>
  );
}