'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlayCircle, UserCircle2 } from "lucide-react";
import { useBalance } from "@/context/BalanceContext";

export default function BrowsePage() {
  const { totalBalance, accountAddress, videos } = useBalance();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Site Header - Copied from page.tsx */}
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
          <div className="flex items-center gap-4">
            <Button>Upload a video</Button>
            <Badge className="bg-teal-600 text-white hover:bg-teal-700">
              you are connected
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-screen-2xl mx-auto p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video List Section */}
          <div className="w-full lg:w-3/4">
            <h1 className="text-3xl font-bold mb-4">Your videos</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Title</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead className="text-right">Tokens</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium">{video.title}</TableCell>
                    <TableCell>{video.link}</TableCell>
                    <TableCell className="text-right">{video.tokens} ALGO</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                  <Button variant="outline">Swap</Button>
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