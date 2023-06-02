"use client"
import { useSidebarRoutes } from "./RouterProvider";
import {
  AiOutlineDashboard,
  AiOutlineFileText,
  AiOutlineComment,
  AiOutlineTeam,
  AiFillHome,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import React from "react";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { routeDispatch } = useSidebarRoutes();
  const { data, status } = useSession();
  const navbarIcons = [
    { name: AiFillHome, onClick: () => { routeDispatch({ type: "Home", payload: { ...data?.user, status } }) }, label: "Home" },
    { name: AiOutlineDashboard, onClick: () => { routeDispatch({ type: "Editor", payload: { ...data?.user, status } }) }, label: "Editor" },
    { name: AiOutlineFileText, onClick: () => { routeDispatch({ type: "Posts", payload: { ...data?.user, status } }) }, label: "Posts" },
    { name: AiOutlineComment, onClick: () => { routeDispatch({ type: "Comments", payload: { ...data?.user, status } }) }, label: "Comments" },
    { name: AiOutlineCloudUpload, onClick: () => { routeDispatch({ type: "Uploads", payload: { ...data?.user, status } }) }, label: "Uploads" },
    { name: AiOutlineTeam, onClick: () => { routeDispatch({ type: "Users", payload: { ...data?.user, status } }) }, label: "Users" },
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
