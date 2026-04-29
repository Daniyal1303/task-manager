"use client";
import { useState } from "react";
import LoginPage from "@/components/login";
import TableView from "@/components/table-view";
import ListView from "@/components/list-view";
import ModalDemo from "@/components/modal-demo";
import Sidebar from "@/components/side-bar";

     type View = "login" | "table" | "list" | "modal";

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  

  if (!isLoggedIn) {
    return <LoginPage  />;
  }

  return (
    <div style={{display:"flex", height:"100vh", background:"#f5f6fa"}}>
      <Sidebar currentView={currentView} onNavigate={(v) => setCurrentView(v as View)} />
      <main style={{flex:1, overflow:"auto"}}>
        {currentView === "table" && <TableView />}
        {currentView === "list" && <ListView />}
        {currentView === "modal" && <ModalDemo />}
      </main>
    </div>
  );
}
