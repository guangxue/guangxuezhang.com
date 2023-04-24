import Link from "next/link";
import {
  AiOutlineDashboard,
  AiOutlineFileText,
  AiOutlineComment,
  AiOutlineTeam,
  AiFillHome,
} from "react-icons/ai";

const navbarIcons = [
  { name: AiFillHome, href: "/", label: "Home" },
  { name: AiOutlineDashboard, href: "/admin", label: "Dashboard" },
  { name: AiOutlineFileText, href: "/admin/post/create", label: "Post" },
  { name: AiOutlineComment, href: "/admin/comments", label: "Comments" },
  { name: AiOutlineTeam, href: "/admin/users", label: "Users" },
];

const SideBar = () => {
  return (
    <aside className="admin-sidebar admin-sidebar-left border-r border-gray-200 h-screen px-2">
      <nav className="space-y-6 mt-5">
        {navbarIcons.map((icon) => {
          return (
            <Link
              key={icon.href}
              href={icon.href}
              className="flex items-center gap-2"
            >
              <icon.name />
              <span>{icon.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
