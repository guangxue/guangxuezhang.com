import '../globals.admin.css'
import AdminNavBar from '@/components/admin/navbar';
import {
  AiOutlineDashboard,
  AiOutlineFileText,
  AiOutlineComment,
  AiOutlineTeam,
  AiFillHome,
} from 'react-icons/ai';

import { BsTerminalFill } from "react-icons/bs";
import Link from 'next/link';
import Editor from '@/components/admin/editor';

const navbarIcons = [
  {name: AiOutlineDashboard, href: "/admin", label: 'Dashboard'},
  {name: AiOutlineFileText, href: "/admin/post/create", label: 'Post'},
  {name: AiOutlineComment, href: "/admin/comments", label: 'Comments'},
  {name: AiOutlineTeam, href: "/admin/users", label: 'Users'},
]

const AdminPage = () => {
  return (
    <div className='admin-page flex'>
      <aside className="h-screen bg-zinc-50 w-40 p-2 border-r border-gray-200">
        <div>
          <Link href='/admin' className='flex gap-2 items-center ml-2 mt-1 mb-4'>
            <BsTerminalFill />
            <span>Admin</span>
          </Link>
        </div>
        <AdminNavBar navbarIcons={navbarIcons} />
      </aside>
      <div className="editor-container">
        <Editor />
      </div>
    </div>
  )
}

export default AdminPage;
