"use client"
import React from 'react';
import { useSession } from 'next-auth/react';

type ActionType = {
  type: "Home" | "Editor" | "Posts" | "Comments" | "Users" | "Uploads" | "ImageList" | "SignIn" | "init",
  payload: any;
}

type RoutesType = {
  sidebarState: any,
  routeDispatch: React.Dispatch<ActionType>,
}

// function createInitState(userInfo: any, status: string) {
//   if (userInfo) {
//     console.log('--- FOUND userInfo ----');
//     console.log(userInfo, status)
//     return { route: 'Home', editContent: "", role: "", postId: 0, ...userInfo, status }
//   }
// }

const initState = { route: 'Home', editContent: "", role: "", postId: 0 };
const RouteContext = React.createContext<RoutesType>({ sidebarState: {}, routeDispatch: () => { } });

export default function RouterProvider({ children }: { children: React.ReactNode; }) {
  const { data, status } = useSession();
  const [routestate, dispatch] = React.useReducer(reducer, {});

  React.useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: 'init', payload: { ...data.user, status } })
    }
  }, [status, data]);


  function reducer(state: typeof initState, action: ActionType) {
    switch (action.payload.status) {
      case 'authenticated':
        return { route: action.type, ...action.payload }
      default:
        return { ...state, route: "SignIn", ...action.payload };
    }
  }

  let contextValue = {
    sidebarState: routestate,
    routeDispatch: dispatch,
  }

  return (
    <RouteContext.Provider value={contextValue}>
      {status === 'authenticated' && children}
      {/**
       * 1. <Header />
       * 2. <Sidebar />
       * 3. <SidebarController />
       */}
    </RouteContext.Provider>
  )
}

export const useSidebarRoutes = () => React.useContext(RouteContext);
