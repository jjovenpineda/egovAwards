"use client";

import SideBar from "@/components/shared/side-bar";
import TopBar from "@/components/shared/top-bar";
/* import useInactivityTimeout from "@/hooks/use-inactibe-timeout";
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* const { isInactive, resetInactivity } = useInactivityTimeout();
    const handleUserResponse = (response: string) => {
    if (response === "yes") {
      resetInactivity();
    } else {
      localStorage.clear();
    }
  }; */
  return (
    <main className="flex bg-slate-50">
      <div>
        <SideBar />
      </div>

      <div className="w-full">
        <TopBar />
        {children}
      </div>
      {/*   {isInactive && (
        <div className="inactivity-dialog">
          <p>Are you still there?</p>
          <button onClick={() => handleUserResponse("yes")}>Yes</button>
          <button onClick={() => handleUserResponse("no")}>No</button>
        </div>
      )} */}
    </main>
  );
}
