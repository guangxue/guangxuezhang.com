"use client"
import React from 'react';
import Image from 'next/image';
import { useSidebarRoutes } from './RouterProvider';
import {
  getPostContentById,
  getPostMetadata,
  updatePostIntro,
  updatePostLogo,
  updatePostSlug,
  updatePostTitle,
  remoteImagePath,
} from '@/utils/request';

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
  const { sidebarState, routeDispatch } = useSidebarRoutes();

  /**
   * fetch blog metadata for the first time rendering
   */
  React.useEffect(() => {
    getPostMetadata()
      .then(blog => {
        setPosts(blog);
      })
      .catch(err => {
        console.log(err)
        setPosts([])
      })
  }, [])

  /**
   * save/delete post & trigger inputEvent
   */
  React.useEffect(() => {
    if (deleteOrNot > 0) {
      // deletePostById();
    }
    if (editOrNot > 0) {
      const id = editOrNot;
      getPostContentById(id).then(editContent => {
        routeDispatch({ type: "Editor", payload: { editContent, id, status: sidebarState.status } })
      }).catch(err => {
        console.log(err)
      })
    }

    return () => {
      setDelete(0)
      setEdit(0)
    }
  }, [deleteOrNot, editOrNot, routeDispatch, sidebarState])

  type InputElement = HTMLInputElement & HTMLTextAreaElement;

  async function updateMetaData(evt: React.FormEvent) {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    const inputName = target.elements.item(1)!.getAttribute("name");
    const input = target.elements.item(1)! as InputElement;
    const id = target.post_id.value

    switch (inputName) {
      case "post_title":
        updatePostTitle(id, input.value).then(res => console.log(res)).catch(err => console.log(err));
        break;
      case "post_slug":
        updatePostSlug(id, input.value).then(res => console.log(res)).catch(err => console.log(err));
        break;
      case "post_logo":
        updatePostLogo(id, input.value).then(res => console.log(res)).catch(err => console.log(err));
        break;
      case "post_intro":
        updatePostIntro(id, input.value).then(res => console.log(res)).catch(err => console.log(err));
        break;
      default:
        break;
    }
  };
  return (
    <div className='flex gap-6 flex-wrap flex-grow justify-center items-center p-6 overflow-auto'>
      <div className='basis-full'>
        <h1>Update Post Metadata</h1>
      </div>
      {posts.map((post: PostProps) => {
        return (
          <div key={post.id} className='flex flex-col basis-full lg:basis-[47%] border'>
            <div className='flex flex-wrap items-center gap-3 p-5 border-b bg-slate-100  focus:border-gray-400 focus:bg-white focus:outline-none'>
              <div className=''>
                <Image src={`${remoteImagePath}${post.logo}`} alt={''} width={30} height={30} />
              </div>
              <div className='font-semibold'>{post.title}</div>
            </div>
            <form onSubmit={updateMetaData} className='flex flex-wrap items-center gap-3 p-5'>
              <input type="hidden" name='post_id' value={post.id} />
              <div className='font-semibold text-gray-700'>Title:</div>
              <div className='flex-grow'><input className='text-gray-700 w-full p-2 border border-slate-100 rounded  bg-gray-50 focus:border-gray-400 focus:bg-white focus:outline-none' name="post_title" defaultValue={post.title} type="text" /></div>
              <div><button className='  bg-sky-600 hover:bg-sky-700 text-zinc-100 px-5 py-2.5  rounded shadow-sm text-sm font-semibold'>update</button></div>
            </form>
            <form onSubmit={updateMetaData} className='flex flex-wrap items-center gap-3 p-5'>
              <input type="hidden" name='post_id' value={post.id} />
              <div className="font-semibold text-gray-700">Slug: </div>
              <div className='flex-grow'><input className='text-gray-700 w-full p-2 border border-slate-100 rounded  bg-gray-50 focus:border-gray-400 focus:bg-white focus:outline-none' name='post_slug' defaultValue={post.slug} type="text" /></div>
              <div><button className=' bg-sky-600 hover:bg-sky-700 text-zinc-100 px-5 py-2.5 rounded shadow-sm text-sm font-semibold'>update</button></div>
            </form>
            <form onSubmit={updateMetaData} className='flex flex-wrap items-center gap-3 p-5'>
              <input type="hidden" name='post_id' value={post.id} />
              <div className="font-semibold text-gray-700">Logo: </div>
              <div className='flex-grow'><input name='post_logo' defaultValue={post.logo} className='text-gray-700 w-full p-2 rounded bg-gray-50  border border-slate-100 focus:border-gray-400 focus:bg-white focus:outline-none' type="text" /></div>
              <div><button className=' bg-sky-600 hover:bg-sky-700 text-zinc-100 px-5 py-2.5 rounded shadow-sm text-sm font-semibold'>update</button></div>
            </form>
            <form onSubmit={updateMetaData} className='flex flex-wrap items-center gap-3 p-5'>
              <input type="hidden" name='post_id' value={post.id} />
              <div className="font-semibold text-gray-700">Intro: </div>
              <div className='flex-grow'><textarea name='post_intro' spellCheck="false" defaultValue={post.intro} rows={4} className='text-gray-700 w-full p-2 rounded resize-none border border-slate-100 bg-gray-50 focus:border-gray-400 focus:bg-white focus:outline-none' ></textarea></div>
              <div><button className=' bg-sky-600 hover:bg-sky-700 text-zinc-100 px-5 py-2.5 rounded shadow-sm text-sm font-semibold'>update</button></div>
            </form>
            <div className='flex gap-5 p-5'>
              <div><button className='bg-sky-600  hover:bg-sky-700 border-sky-500 px-5 py-2.5 text-zinc-100 rounded shadow-sm text-sm font-semibold' onClick={(e) => { e.preventDefault(); setEdit(+post.id) }}>Edit</button></div>
              {/* <div><button className='bg-sky-600  hover:bg-sky-700 border-sky-500 px-5 py-2.5 text-zinc-100 rounded shadow-sm text-sm font-semibold'>Update All</button></div> */}
            </div>
          </div>
        )
      })}
    </div>
  )

}
