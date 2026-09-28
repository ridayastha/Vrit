import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/app-sidebar'
import Header from '@/components/header'

export default function Layout({children}:{children:React.ReactNode}) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className='w-full'><Header />{children}</div>
    </SidebarProvider>
  )
}
