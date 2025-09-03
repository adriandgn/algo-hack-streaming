'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { PlayCircle, UserCircle2 } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import { useBalance } from "@/context/BalanceContext";

export default function HomePage() {
  const { totalBalance, accountAddress } = useBalance();
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Site Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <a href="#" className="font-bold flex items-center gap-2">
            <PlayCircle className="w-6 h-6" />
            <span>VideoPlatform</span>
          </a>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="px-4 py-2 text-muted-foreground hover:text-foreground">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/browse" className="px-4 py-2 text-muted-foreground hover:text-foreground">
                  Browse
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-4 py-2 text-muted-foreground hover:text-foreground">
                  Upload
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Avatar>
            <AvatarFallback><UserCircle2 /></AvatarFallback>
          </Avatar>
          <Badge className="bg-teal-600 text-white hover:bg-teal-700">
            you are connected
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-screen-2xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video Player Section */}
          <div className="w-full lg:w-3/4">
            <h1 className="text-3xl font-bold mb-4">Video title</h1>
            <div className="mb-8 rounded-lg overflow-hidden">
              <VideoPlayer src="/BigBuckBunny.mp4" />
            </div>
            <br />
            <br />
            <h2 className="text-2xl font-bold mb-4">Recommended videos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-gray-200">
                  <PlayCircle className="w-12 h-12 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>

          {/* Account Sidebar */}
          <aside className="w-full lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback>
                      <UserCircle2 className="w-8 h-8 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}</span>
                </div>
                <div className="text-right font-bold text-lg mb-4">
                  {totalBalance} ALGO
                </div>
                <div className="flex justify-between">
                  <Button variant="outline">Add</Button>
                  <Button variant="secondary">Details</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      {/* Site Footer */}
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © {new Date().getFullYear()} VideoPlatform. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
