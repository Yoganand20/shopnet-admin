"use client"

import * as React from "react"
import {
  Bot,
  Command,
  Frame,
  PieChart,
  User2Icon,
  BoxIcon
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { setActiveTable } from "@/lib/slice/tableSlice"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useDispatch<AppDispatch>();
  const activeTable = useSelector((state: RootState) => state.table.activeTable);

  const data = {
    navMain: [
      {
        title: "Categories",
        url: "#",
        icon: PieChart,
        isActive: activeTable === "categories",
        onClick: () => dispatch(setActiveTable({ key: "categories" })),
      },
      {
        title: "Attributes",
        url: "#",
        icon: Frame,
        isActive: activeTable === "attributes",
        onClick: () => dispatch(setActiveTable({ key: "attributes" })),
        items: [
          {
            title: "Attribute Values", url: "#", onClick: () => dispatch(setActiveTable({ key: "attributesValues" }))
          }
        ]
      },
      {
        title: "Products",
        url: "#",
        icon: Bot,
      },
      {
        title: "Users",
        url: "#",
        icon: User2Icon,
      },
      {
        title: "Orders",
        url: "#",
        icon: BoxIcon,
      },
    ],
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">ShopNet</span>
                  <span className="truncate text-xs">E-Commerce App</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>

        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
