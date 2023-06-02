"use client"
import {
  FcTemplate,
  FcDocument,
  FcSms,
  FcKindle,
  FcConferenceCall,
  FcStackOfPhotos,
  FcUpload,
  FcNews,
  FcNook,
} from "react-icons/fc";
import { useSidebarRoutes } from "./RouterProvider";

export default function Dashboard() {
  const { sidebarState, routeDispatch } = useSidebarRoutes();

  return (
    <div className='flex flex-col w-screen p-6 gap-8'>
      <h1>Dashboard</h1>
      <div className="flex flex-wrap gap-8">
        <button
          onClick={() => { routeDispatch({ type: "Editor", payload: {} }) }}
          className="flex flex-col items-center w-[188px] h-[166px] px-12 py-4 shadow-md border hover:border-slate-300 hover:bg-slate-500 hover:text-slate-100 transition-all">
          <FcNook className="w-[3.9rem] h-[3.9rem]" />
          <h2 className="text-sm font-semibold mt-3">Editor</h2>
        </button>
        <button
          onClick={() => { routeDispatch({ type: "Posts", payload: {} }) }}
          className="flex flex-col items-center w-[188px] h-[166px] px-12 py-4 shadow-md border hover:border-slate-300 hover:bg-slate-500 hover:text-slate-100 transition-all">
          <FcNews className="w-[3.9rem] h-[3.9rem]" />
          <h2 className="text-sm font-semibold mt-3">Posts</h2>
          <h3 className="text-xl font-bold">6</h3>
        </button>
        <button
          onClick={() => { routeDispatch({ type: "ImageList", payload: {} }) }}
          className="flex flex-col items-center w-[188px] h-[166px] px-12 py-4 shadow-md border hover:border-slate-300 hover:bg-slate-500 hover:text-slate-100 transition-all">
          <FcStackOfPhotos className="w-[3.9rem] h-[3.9rem]" />
          <h2 className="text-sm font-semibold mt-3">Images</h2>
          <h3 className="text-xl font-bold">10</h3>
        </button>
        <button
          onClick={() => { routeDispatch({ type: "Users", payload: {} }) }}
          className="flex flex-col items-center w-[188px] h-[166px] px-12 py-4 shadow-md border hover:border-slate-300 hover:bg-slate-500 hover:text-slate-100 transition-all">
          <FcConferenceCall className="w-[3.9rem] h-[3.9rem]" />
          <h2 className="text-sm font-semibold mt-3">Visitors</h2>
          <h3 className="text-xl font-bold">10</h3>
        </button>
        <button
          onClick={() => { routeDispatch({ type: "Comments", payload: {} }) }}
          className="flex flex-col items-center w-[188px] h-[166px] px-12 py-4 shadow-md border hover:border-slate-300 hover:bg-slate-500 hover:text-slate-100 transition-all">
          <FcSms className="w-[3.9rem] h-[3.9rem]" />
          <h2 className="text-sm font-semibold mt-3">Comments</h2>
          <h3 className="text-xl font-bold">10</h3>
        </button>
        <button
          onClick={() => { routeDispatch({ type: "Uploads", payload: {} }) }}
          className="flex flex-col items-center w-[188px] h-[166px] px-12 py-4 shadow-md border hover:border-slate-300 hover:bg-slate-500 hover:text-slate-100 transition-all">
          <FcUpload className="w-[3.9rem] h-[3.9rem]" />
          <h2 className="text-sm font-semibold mt-3">Uploads</h2>
          <h3 className="text-xl font-bold">10</h3>
        </button>
      </div>
    </div>
  )
}
