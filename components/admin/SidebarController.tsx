"use client"
import React from 'react';
import { useSidebarRoutes } from './RouterProvider';
import Editor from './Editor';
import Posts from './Posts';
import Comments from './Comments';
import Users from './Users';
import Dashboard from './Dashboard';
import ImageUploads from './ImageUploads';
import ImageList from './ImageList';
import { signOut } from "next-auth/react";

export default function SidebarController() {
  const { sidebarState } = useSidebarRoutes();
  const [routeName, setRouteName] = React.useState("");

  React.useEffect(() => {
    setRouteName(sidebarState.route)
  }, [sidebarState])

  if (routeName === 'SignIn') {
    signOut({ callbackUrl: "/signin/admin" })
  }

  switch (routeName) {
    case 'Home':
      return <Dashboard />
    case 'Editor':
      return <Editor />
    case 'Posts':
      return <Posts />
    case 'Comments':
      return <Comments />
    case 'Users':
      return <Users />
    case 'Uploads':
      return <ImageUploads />
    case 'ImageList':
      return <ImageList />
    default:
      return <Dashboard />
  }

}
