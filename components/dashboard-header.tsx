"use client"
import Link from "next/link"
import { Home, ShoppingBag, Calendar, MessageSquare, User, Settings, Menu, Bell, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-slate-300 hover:text-white md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-slate-900 text-white border-slate-700">
            <MobileNav />
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600"></span>
          <span className="font-bold text-xl hidden md:inline-block">Ayurveda X</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/dashboard" className="text-white transition-colors hover:text-emerald-400">
            Dashboard
          </Link>
          <Link href="/shop" className="text-slate-300 transition-colors hover:text-white">
            Shop
          </Link>
          <Link href="/consultations" className="text-slate-300 transition-colors hover:text-white">
            Consultations
          </Link>
          <Link href="/assistant" className="text-slate-300 transition-colors hover:text-white">
            AI Assistant
          </Link>
          <Link href="/learn" className="text-slate-300 transition-colors hover:text-white">
            Learn
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
            <Sun className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-emerald-400 font-medium">
                  NS
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700 text-white" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-700">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-700">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-700">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <div className="flex flex-col h-full">
      <div className="py-4 flex items-center">
        <span className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600"></span>
        <span className="font-bold text-xl ml-2">Ayurveda X</span>
      </div>
      <div className="space-y-3 mt-6">
        <Link href="/dashboard" className="flex items-center py-2 text-white">
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </Link>
        <Link href="/shop" className="flex items-center py-2 text-slate-300 hover:text-white">
          <ShoppingBag className="mr-3 h-5 w-5" />
          Shop
        </Link>
        <Link href="/consultations" className="flex items-center py-2 text-slate-300 hover:text-white">
          <Calendar className="mr-3 h-5 w-5" />
          Consultations
        </Link>
        <Link href="/assistant" className="flex items-center py-2 text-slate-300 hover:text-white">
          <MessageSquare className="mr-3 h-5 w-5" />
          AI Assistant
        </Link>
        <Link href="/learn" className="flex items-center py-2 text-slate-300 hover:text-white">
          <User className="mr-3 h-5 w-5" />
          Learn
        </Link>
      </div>
    </div>
  )
}

