"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
     SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {SidebarItems} from "@/app/company/sidebarData";

// Menu items.


const AppSidebar = () => {
    // const {logout} = useLogout();

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-semibold">Company Name</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>


                {/*<SidebarFooter>*/}
                {/*    <SidebarMenu>*/}
                {/*        <SidebarMenuItem>*/}
                {/*            <SidebarMenuButton asChild>*/}
                {/*                <button onClick={logout} className="flex items-center space-x-2">*/}
                {/*                    <span>Logout</span>*/}
                {/*                </button>*/}
                {/*            </SidebarMenuButton>*/}
                {/*        </SidebarMenuItem>*/}
                {/*    </SidebarMenu>*/}
                {/*</SidebarFooter>*/}


            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar;