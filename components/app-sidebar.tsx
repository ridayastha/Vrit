"use client"
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from './ui/sidebar'
import { RiBox3Line, RiFlashlightLine } from '@remixicon/react'
import { appSidebarItems } from '@/data/data'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'

export default function AppSidebar() {
  const pathname = usePathname()
  const {state} = useSidebar()
  const isCollapsed = state === 'collapsed'
  return (
    <Sidebar collapsible='icon'>
        {/* Header / Logo */}
        <SidebarHeader className="my-3">
            <div className="flex items-center gap-2">
                <span className="flex bg-primary text-white size-7 items-center justify-center rounded-sm shrink-0">
                    <RiBox3Line size={20} />
                </span>
                {!isCollapsed && 
                <p className="font-extrabold">Vrit Dashboard</p>}
            </div>
        </SidebarHeader>

        {/* Navigation Content */}
        <SidebarContent className="px-2 mt-3">
            <SidebarMenu className="space-y-2">
                {appSidebarItems.map(({ id, label, Icon, href }) => (
                    <SidebarMenuItem key={id}>
                        {/* REVERTED: Standardized active background and removed manual overrides */}
                        <SidebarMenuButton className={cn("h-11", pathname == href && "bg-primary text-white hover:text-white hover:bg-primary/90" )}>
                            <Link href={href} className="flex items-center gap-3 w-full">
                                <Icon className="size-5 shrink-0" />
                                <span className="text-sm font-medium dark:text-zinc-300">{label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>

        {/* Footer Configuration */}
        <SidebarFooter className="p-2 space-y-1">
            {!isCollapsed && (
            <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm rounded-xl overflow-hidden">
                <CardHeader className="p-2 pb-2 space-y-1">
                    <div className="flex items-center gap-2">
                        {/* REVERTED: Swapped custom transparent background to standard subtle color */}
                        <span className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50">
                            <RiFlashlightLine className="size-4" />
                        </span>
                        <CardTitle className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Upgrade to Pro</CardTitle>
                    </div>
                    <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400 pl-8">
                        Unlock premium metrics & global tracking maps.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 pl-12">
                    {/* REVERTED: Removed manual text-white to let standard button foreground fill handle it */}
                    <Button variant="default" className="w-full h-9 text-xs font-medium shadow-sm">
                        Upgrade now
                    </Button>
                </CardContent>
            </Card>
            )}

            {/* User Profile Info */}
<div className={cn("flex items-center gap-4 py-3", isCollapsed ? "justify-center" : "px-2")}>
    <Avatar>
        <AvatarFallback>
            HS
        </AvatarFallback>
    </Avatar>
    {!isCollapsed && (
        <div>
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100 truncate leading-none mb-1">
                Hridaya Shrestha
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate leading-none">
                ridaya350@gmail.com
            </p>
        </div>
    )}
</div>
        </SidebarFooter>
    </Sidebar>
  )
}