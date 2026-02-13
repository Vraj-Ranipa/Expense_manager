"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ArrowLeft, MoreVertical, Pencil, Trash2, User } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PeopleDetailHeaderProps {
    person: {
        PeopleID: number;
        PeopleName: string;
        PeopleCode?: string | null;
        MobileNo?: string | null;
        Email?: string | null;
        IsActive?: boolean | null;
        users?: {
            ProfileImage?: string | null;
        } | null;
    };
}

export function PeopleDetailHeader({ person }: PeopleDetailHeaderProps) {
    return (
        <div className="flex-none px-4 py-3 md:px-6 border-b border-border/60 bg-background/90 backdrop-blur-xl z-50 shadow-sm sticky top-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-muted/80 transition-colors h-8 w-8">
                        <Link href="/admin/people">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="h-12 w-12 rounded-full ring-2 ring-background shadow-md overflow-hidden bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500 font-bold text-lg">
                                <Logo
                                    path={person.users?.ProfileImage}
                                    alt={person.PeopleName}
                                    fallbackClassName="h-full w-full flex items-center justify-center"
                                    fallbackIcon={<User className="h-6 w-6" />}
                                />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background flex items-center justify-center ${person.IsActive !== false ? "bg-emerald-500" : "bg-slate-400"}`}>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-xl font-bold tracking-tight text-foreground">
                                    {person.PeopleName}
                                </h1>
                                {person.IsActive !== false && (
                                    <Badge variant="secondary" className="text-[10px] px-2 h-5 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-transparent">
                                        Active
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                                <span className="font-mono bg-muted px-1.5 rounded text-[10px] text-foreground/70">#{person.PeopleCode || person.PeopleID}</span>
                                {person.MobileNo && (
                                    <>
                                        <span className="text-xs">•</span>
                                        <span>{person.MobileNo}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 ml-12 md:ml-0">
                    <Button variant="outline" size="sm" className="h-8 text-xs hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all px-3 hidden sm:flex">
                        <Pencil className="h-3.5 w-3.5 mr-1.5" />
                        Edit Details
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Person
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Person
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
