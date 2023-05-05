"use client"
import React from 'react'
import { useSidebarRoutes } from './RouterProvider';
import Editor from './Editor';
import Posts from './Posts';
import Comments from './Comments';
import Users from './Users';
import Dashboard from './Dashboard';
import { useRouter } from 'next/navigation';
import ImageUploads from './ImageUploads';

export default function SidebarController() {
  const { sidebarRoute } = useSidebarRoutes();
  const [routeName, setRouteName] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    setRouteName(sidebarRoute.name)
  }, [sidebarRoute])

  if (routeName === 'Home') {
    return <Dashboard />
  }
  if (routeName === 'Editor') {
    return <Editor />
  }
  if (routeName === 'Posts') {
    return <Posts />
  }
  if (routeName === 'Comments') {
    return <Comments />
  }
  if (routeName === 'Users') {
    return <Users />
  }
  if (routeName === 'Uploads') {
    return <ImageUploads />
  }
  return (
    <Dashboard />
  )
}
