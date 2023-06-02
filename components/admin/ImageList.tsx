"use client"
import { getImageList } from "@/utils/request"
import React from "react"

export default function ImageList() {
  React.useEffect(() => {
    getImageList().then(res => console.log(res)).catch(err => console.log(err))
  }, [])
  return (
    <div>
      <header>
        <h1>Image List from Uploads</h1>
      </header>
    </div>
  )
}