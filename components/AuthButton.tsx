"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button, Dropdown, MenuProps } from "antd"
import { LogOut, User, ChevronDown, LogIn } from "lucide-react"
import { motion } from "framer-motion"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="h-9 w-24 rounded-lg bg-neutral-800/50 animate-pulse" />
    )
  }

  if (!session) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          size="large"
          className="group flex items-center gap-2 h-9 rounded-full border-0 bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 font-medium text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
          onClick={() => signIn("google")}
          icon={<LogIn className="h-4 w-4" />}
        >
          Sign In
        </Button>
      </motion.div>
    )
  }

  console.log(session)

  const items: MenuProps["items"] = [
    {
      key: "user",
      label: (
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-full w-full rounded-full"
              />
            ) : (
              <User className="h-4 w-4 text-cyan-400" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {session.user?.name || "User"}
            </span>
            <span className="text-xs text-neutral-400">
              {session.user?.email}
            </span>
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
      className: "!border-white/10",
    },
    {
      key: "profile",
      label: (
        <div className="flex items-center gap-2 px-2 py-1.5">
          <User className="h-4 w-4 text-neutral-400" />
          <span className="text-sm text-neutral-300">Profile</span>
        </div>
      ),
    },
    {
      key: "settings",
      label: (
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="h-4 w-4 rounded bg-gradient-to-r from-cyan-500 to-emerald-500" />
          <span className="text-sm text-neutral-300">My Resumes</span>
        </div>
      ),
    },
    {
      type: "divider",
      className: "!border-white/10",
    },
    {
      key: "logout",
      label: (
        <div className="flex items-center gap-2 px-2 py-1.5 text-red-400 hover:text-red-300">
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign Out</span>
        </div>
      ),
      onClick: () => signOut(),
    },
  ]

  return (
    <Dropdown
      menu={{
        items,
        className: "!bg-neutral-900 !border !border-white/10 !rounded-xl !p-2 !backdrop-blur-xl",
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
      >
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-full w-full rounded-full"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <User className="h-3.5 w-3.5 text-cyan-400" />
              </div>
            )}
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-xs font-medium text-white">
              {session.user?.name?.split(" ")[0] || "Account"}
            </span>
          </div>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
      </motion.div>
    </Dropdown>
  )
}