"use client"
import React from 'react';
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
    console.log("posting Data...");
    console.log(postData);
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
    <div className='flex gap-6 flex-wrap flex-grow justify-center items-center'>
      {posts.map((post: PostProps) => {
        return (
          <form onSubmit={updateMetaData} key={post.id} className='flex flex-col gap-3 bg-slate-100 p-5 basis-full lg:basis-[47%] border'>
            <input type="hidden" name='post_id' value={post.id} />
            <div className='flex flex-wrap items-center gap-3'>
              <span className='basis-full'>title: </span>
              <span className='flex-grow'><input name="post_title" defaultValue={post.title} className='w-full p-2' type="text" /></span>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <span className="basis-full">Slug: </span>
              <span className='flex-grow'><input name='post_slug' defaultValue={post.slug} className='w-full p-2' type="text" /></span>
            </div>
            <div className='flex flex-wrap items-center gap-3'>
              <span className="basis-full">Logo name: </span>
              <span className='flex-grow'><input name='post_logo' defaultValue={post.logo} className='w-full p-2' type="text" /></span>
            </div>
            {/* <div className='flex flex-wrap items-center gap-3'>
              <span className="basis-full">Publish: </span>
              <span className='flex-grow'><input name='post_publish' defaultValue={post.publish} className='w-full p-2' type="text" /></span>
            </div> */}
            <div className='flex flex-wrap items-center gap-3'>
              <span className="basis-full">Intro: </span>
              <span className='flex-grow'><input name='post_intro' defaultValue={post.intro} className='w-full p-2' type="text" /></span>
            </div>
            <div className='flex gap-5'>
              <div><button onClick={() => setEdit(+post.id)}>Edit</button></div>
              <div className=''><button onClick={() => setDelete(+post.id)}>Delete</button></div>
              <div className=''><button>Update</button></div>
            </div>
          </form>
        )
      })}
    </div>
  )

}
