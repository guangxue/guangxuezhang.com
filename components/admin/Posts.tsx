"use client"
import React from 'react';
import Image from 'next/image';
import { useSidebarRoutes } from './RouterProvider';

type PostProps = {
  id: string,
  slug: string,
  logo: string,
  title: string,
  intro: string,
  publish: string,
}

export default function Posts() {
  const [posts, setPosts] = React.useState([])
  const [deleteOrNot, setDelete] = React.useState(0)
  const [editOrNot, setEdit] = React.useState(0)
  const { routeDispatch } = useSidebarRoutes();

  // fetch blog metadata for the first time rendering
  React.useEffect(() => {
    const postData = { name: "getPostMetadata" }
    fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(data => {
        return data.json();
      })
      .then(blog => {
        setPosts(blog);
      })
  }, [])

  // save/delet post & trigger inputEvent
  React.useEffect(() => {
    const content = "true";

    if (deleteOrNot > 0) {
      const id = deleteOrNot
      const deldata = { content, id, name: "deletePostById" }
      fetch("api/blog/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deldata),
      }).then(resq => {
        return resq.json();
      }).then(res => {
        console.log("res from delete: ", res)
      })
    }

    if (editOrNot > 0) {
      const id = editOrNot;
      const editData = { id, name: "getPostContentById" }
      fetch("api/blog/metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      }).then(resq => {
        return resq.json();
      }).then(res => {
        const { content } = res;
        routeDispatch({ type: "Editor", payload: { content, id } })
      })
    }

    return () => {
      setDelete(0)
      setEdit(0)
    }
  }, [deleteOrNot, editOrNot, routeDispatch])

  async function updateMetaData(evt: React.FormEvent) {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    const updateInfo = {
      title: target.post_title.value,
      slug: target.post_slug.value,
      logo: target.post_logo.value,
      intro: target.post_intro.value,
    }
    const id = target.post_id.value;
    const postData = { name: "updateMetadata", updates: updateInfo, id }
    fetch("/api/blog/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(data => {
        return data.json();
      })
      .then(updatedRes => {
        console.log("updatedRes:", updatedRes);
      })
  };



  return (
    <div className='flex gap-6 flex-wrap flex-grow justify-center items-center p-6 overflow-auto'>
      <div className='basis-full'>
        <h1>Update Post Metadata</h1>
      </div>
      {posts.map((post: PostProps) => {
        return (
          <form onSubmit={updateMetaData} key={post.id} className='flex flex-col gap-3 basis-full lg:basis-[47%] border'>
            <input type="hidden" name='post_id' value={post.id} />
            <div className='flex flex-wrap items-center gap-3 p-5 border-b bg-slate-100  focus:border-gray-400 focus:bg-white focus:outline-none'>
              <div className=''>
                <Image src={post.logo} alt='' width={30} height={30} />
              </div>
              <div className='font-semibold'>{post.title}</div>
            </div>
            <div className='flex flex-wrap items-center gap-3 p-5'>
              <span className='font-semibold text-gray-700'>Title:</span>
              <span className='flex-grow'><input className='text-gray-700 w-full p-2 border border-slate-100 rounded  bg-gray-50 focus:border-gray-400 focus:bg-white focus:outline-none' name="post_title" defaultValue={post.title} type="text" /></span>
            </div>
            <div className='flex flex-wrap items-center gap-3 p-5'>
              <span className="font-semibold text-gray-700">Slug: </span>
              <span className='flex-grow'><input className='text-gray-700 w-full p-2 border border-slate-100 rounded  bg-gray-50 focus:border-gray-400 focus:bg-white focus:outline-none' name='post_slug' defaultValue={post.slug} type="text" /></span>
            </div>
            <div className='flex flex-wrap items-center gap-3 p-5'>
              <span className="font-semibold text-gray-700">Logo: </span>
              <span className='flex-grow'><input name='post_logo' defaultValue={post.logo} className='text-gray-700 w-full p-2 rounded bg-gray-50  border border-slate-100 focus:border-gray-400 focus:bg-white focus:outline-none' type="text" /></span>
            </div>
            <div className='flex flex-wrap items-center gap-3 p-5'>
              <span className="font-semibold text-gray-700">Intro: </span>
              <span className='flex-grow'><textarea name='post_intro' spellCheck="false" defaultValue={post.intro} className='text-gray-700 w-full p-2 rounded resize-none border border-slate-100 bg-gray-50 focus:border-gray-400 focus:bg-white focus:outline-none' ></textarea></span>
            </div>
            <div className='flex gap-5 p-5'>
              <div><button className='bg-sky-600  hover:bg-sky-700 border-sky-500 px-5 py-2.5 text-zinc-100 rounded shadow-sm text-sm font-semibold' onClick={() => setEdit(+post.id)}>Edit</button></div>
              <div><button className='bg-sky-600  hover:bg-sky-700 border-sky-500 px-5 py-2.5 text-zinc-100 rounded shadow-sm text-sm font-semibold' onClick={() => setDelete(+post.id)}>Delete</button></div>
              <div><button className='bg-sky-600  hover:bg-sky-700 border-sky-500 px-5 py-2.5 text-zinc-100 rounded shadow-sm text-sm font-semibold'>Update</button></div>
            </div>
          </form>
        )
      })}
    </div>
  )

}
