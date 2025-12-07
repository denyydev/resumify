"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button, Dropdown, MenuProps } from "antd"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button size="small" disabled>
        …
      </Button>
    )
  }

  if (!session) {
    return (
      <Button
        size="small"
        type="primary"
        onClick={() => signIn("google")}
      >
        Войти через Google
      </Button>
    )
  }

  const items: MenuProps["items"] = [
    {
      key: "email",
      label: session.user?.email,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Выйти",
      onClick: () => signOut(),
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button size="small">
        {session.user?.name || "Аккаунт"}
      </Button>
    </Dropdown>
  )
}
