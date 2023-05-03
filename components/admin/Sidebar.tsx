"use client"
import { useSidebarRoutes } from "./RouterProvider";
import {
  AiOutlineDashboard,
  AiOutlineFileText,
  AiOutlineComment,
  AiOutlineTeam,
  AiFillHome,
} from "react-icons/ai";
import React from "react";

const Sidebar = () => {
  const { routeDispatch } = useSidebarRoutes();

  const navbarIcons = [
    { name: AiFillHome, onClick: () => { routeDispatch({ type: "Home", payload: {} }) }, label: "Home" },
    { name: AiOutlineDashboard, onClick: () => { routeDispatch({ type: "Editor", payload: {} }) }, label: "Editor" },
    { name: AiOutlineFileText, onClick: () => { routeDispatch({ type: "Posts", payload: {} }) }, label: "Posts" },
    { name: AiOutlineComment, onClick: () => { routeDispatch({ type: "Comments", payload: {} }) }, label: "Comments" },
    { name: AiOutlineTeam, onClick: () => { routeDispatch({ type: "Users", payload: {} }) }, label: "Users" },
  ];

  return (
    <aside className="admin-sidebar admin-sidebar-left border-r border-gray-200 px-2 basis-[15%] lg:basis-[13%]">
      <nav className="space-y-8 mt-5 px-8 py-5">
        {navbarIcons.map((icon) => {
          return (
            <button
              key={icon.label}
              onClick={icon.onClick}
              className="flex items-center gap-2"
            >
              <icon.name />
              <span>{icon.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
