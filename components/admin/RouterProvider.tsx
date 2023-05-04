"use client"
import React from 'react';

const initState = {
  name: "Dash",
  content: "",
  id: 0
}

type ActionType = {
  type: "Main" | "Home" | "Editor" | "Posts" | "Comments" | "Users",
  payload: any;
}

function reducer(state: typeof initState, action: ActionType) {
  switch (action.type) {
    case "Home":
      return { name: "Home", ...action.payload }
    case "Editor":
      return { name: "Editor", ...action.payload }
    case "Posts":
      return { name: "Posts", ...action.payload }
    case "Comments":
      return { name: "Comments", ...action.payload }
    case "Users":
      return { name: "Users", ...action.payload }
    default:
      throw new Error("<Err:Actions NotFound>");
  }
}

type RoutesType = {
  sidebarRoute: typeof initState,
  routeDispatch: React.Dispatch<ActionType>,
}

const RouteContext = React.createContext<RoutesType>({ sidebarRoute: initState, routeDispatch: () => { } });

export default function RouterProvider({ children }: { children: React.ReactNode; }) {
  const [routestate, dispatch] = React.useReducer(reducer, initState);

  const contextValue = {
    sidebarRoute: routestate,
    routeDispatch: dispatch,
  }
  return (
    <RouteContext.Provider value={contextValue}>
      {children}
    </RouteContext.Provider>
  )
}

export const useSidebarRoutes = () => React.useContext(RouteContext);
