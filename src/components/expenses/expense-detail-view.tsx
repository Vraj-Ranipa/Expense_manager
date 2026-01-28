"use client";

import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    ArrowLeft,
    Calendar,
    User,
    Briefcase,
    FileText,
    Tag,
    Layers,
    Paperclip,
    Phone,
    Mail,
    Hash,
    Clock,
    Edit,
    Trash2,
    ExternalLink,
    Sparkles,
    Share2,
    Copy,
    Receipt,
    MoreVertical,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/shared/logo";
import { motion } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteExpense } from "@/actions/expenses";

interface ExpenseDetailViewProps {
    expense: any; // Using any for simplicity in this generated transition, ideally typed
}

export function ExpenseDetailView({ expense }: ExpenseDetailViewProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#0a0a0a] overflow-hidden relative selection:bg-rose-500/30">
            {/* Ambient Aurora Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
                <div className="hidden md:block absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-purple-500/10 rounded-full blur-[100px] animate-float" />
            </div>

            {/* Top Navigation Bar */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex-none px-4 py-4 md:px-8 flex items-center justify-between z-20 backdrop-blur-md bg-black/20 border-b border-white/5"
            >
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="rounded-xl h-10 w-10 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 transition-all text-muted-foreground"
                    >
                        <Link href="/expenses">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-lg font-bold text-white flex items-center gap-2">
                            Expense Details
                            <Badge variant="outline" className="font-mono text-[10px] bg-white/5 border-white/10 text-muted-foreground h-5">
                                #{expense.ExpenseID}
                            </Badge>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-white hover:bg-white/10 rounded-lg hidden sm:flex">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-9 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white gap-2 text-xs font-medium">
                                <span className="hidden sm:inline">Actions</span>
                                <MoreVertical className="h-3.5 w-3.5 sm:hidden" />
                                <span className="hidden sm:inline-block"><MoreVertical className="h-3.5 w-3.5 ml-1 opacity-50" /></span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl min-w-[160px]">
                            <DropdownMenuItem asChild>
                                <Link href={`/expenses/${expense.ExpenseID}/edit`} className="focus:bg-primary/20 focus:text-primary cursor-pointer gap-2 flex w-full">
                                    <Edit className="h-3.5 w-3.5" /> Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="focus:bg-rose-500/20 focus:text-rose-400 cursor-pointer gap-2 text-rose-500"
                                onClick={async () => {
                                    if (confirm("Are you sure you want to delete this expense?")) {
                                        await deleteExpense(expense.ExpenseID);
                                    }
                                }}
                            >
                                <Trash2 className="h-3.5 w-3.5" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </motion.div>

            {/* Main Scrollable Content */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide z-10"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">

                    {/* LEFT COLUMN: HERO + CONTEXT (Span 4) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* HERO CARD - HOLOGRAPHIC */}
                        <motion.div variants={item} className="relative group perspective-1000">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-black/60 p-6 backdrop-blur-xl shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                                <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                                    <div className="w-32 h-32 bg-rose-500 rounded-full blur-[60px]" />
                                </div>
                                <div className="relative z-10 flex flex-col justify-between h-full gap-8">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner backdrop-blur-md">
                                            <Receipt className="h-6 w-6 text-rose-400" />
                                        </div>
                                        <Badge className="bg-rose-500/20 text-rose-300 border-rose-500/30 uppercase text-[10px] tracking-widest px-2 py-0.5">
                                            Expense
                                        </Badge>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground text-xs uppercase tracking-widest font-medium mb-1 pl-1">Total Amount</p>
                                        <div className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-300 to-rose-200 drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                                            {formatCurrency(Number(expense.Amount))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                                        <div className="p-2 rounded-lg bg-rose-500/10">
                                            <Calendar className="h-4 w-4 text-rose-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Date</p>
                                            <p className="text-sm font-semibold text-white">{format(new Date(expense.ExpenseDate), "MMMM d, yyyy")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* PROJECT CONTEXT CARD */}
                        <motion.div variants={item} className="rounded-3xl border border-white/10 bg-black/40 p-1 backdrop-blur-xl">
                            <div className="rounded-[20px] bg-white/5 p-5 relative overflow-hidden group">
                                {/* Watermark */}
                                <Briefcase className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 -rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Briefcase className="h-4 w-4 text-sky-400" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Project Context</h3>
                                    </div>

                                    {expense.projects ? (
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <Logo
                                                    path={expense.projects.ProjectLogo}
                                                    alt={expense.projects.ProjectName}
                                                    fallbackClassName="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400"
                                                    fallbackIcon={<Briefcase className="h-6 w-6" />}
                                                />
                                                <div>
                                                    <h4 className="text-lg font-bold text-white leading-tight">{expense.projects.ProjectName}</h4>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className={`h-1.5 w-1.5 rounded-full ${expense.projects.IsActive ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-muted"}`} />
                                                        <p className="text-xs text-muted-foreground font-medium">{expense.projects.IsActive ? "Active Project" : "Inactive"}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <Separator className="bg-white/10" />

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-[10px] text-muted-foreground uppercase mb-1">Start</p>
                                                    <p className="text-xs font-mono text-sky-200">{expense.projects.ProjectStartDate ? format(new Date(expense.projects.ProjectStartDate), "MMM d, yyyy") : "N/A"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-muted-foreground uppercase mb-1">End</p>
                                                    <p className="text-xs font-mono text-sky-200">{expense.projects.ProjectEndDate ? format(new Date(expense.projects.ProjectEndDate), "MMM d, yyyy") : "Ongong"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                                            <Briefcase className="h-8 w-8 opacity-20 mb-2" />
                                            <p className="text-xs">No project linked</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* MIDDLE COLUMN: DETAILS (Span 4) */}
                    <motion.div variants={item} className="lg:col-span-4 flex flex-col h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-black/60 p-1 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Watermark */}
                        <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] text-white/[0.02] -rotate-45 pointer-events-none" />

                        <div className="rounded-[20px] bg-[#0a0a0a]/50 flex-1 p-6 relative z-10 flex flex-col">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <h3 className="tex-sm font-bold uppercase tracking-wider text-white">Details & Notes</h3>
                            </div>

                            <div className="space-y-8 flex-1">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">Expense Title</label>
                                    <p className="text-xl md:text-2xl font-medium text-white leading-relaxed">
                                        {expense.ExpenseDetail || <span className="text-muted-foreground italic text-lg">No title provided</span>}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">Description</label>
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 leading-relaxed text-sm text-muted-foreground min-h-[100px]">
                                        {expense.Description || "No additional description notes."}
                                    </div>
                                </div>
                            </div>

                            {expense.AttachmentPath && (
                                <div className="mt-8 pt-6 border-t border-white/10">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 group cursor-pointer hover:bg-blue-500/20 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Paperclip className="h-5 w-5 text-blue-400" />
                                            <div>
                                                <p className="text-xs font-bold text-blue-200">Attachment</p>
                                                <p className="text-[10px] text-blue-400/70 truncate max-w-[150px]">{expense.AttachmentPath}</p>
                                            </div>
                                        </div>
                                        <ExternalLink className="h-4 w-4 text-blue-400 opacity-50 group-hover:opacity-100" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: META (Span 4) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* CLASSIFICATION */}
                        <motion.div variants={item} className="rounded-3xl border border-white/10 bg-black/40 p-1 backdrop-blur-xl">
                            <div className="rounded-[20px] bg-white/5 p-5 relative overflow-hidden group h-full">
                                <Tag className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Tag className="h-4 w-4 text-emerald-400" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Classification</h3>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] text-muted-foreground uppercase mb-2 font-bold">Category</p>
                                            <div className="flex items-center gap-4">
                                                <Logo
                                                    path={expense.categories?.LogoPath}
                                                    alt={expense.categories?.CategoryName}
                                                    fallbackClassName="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg flex items-center justify-center text-white text-xl font-bold"
                                                    fallbackIcon={<span>{expense.categories?.CategoryName?.charAt(0) || "U"}</span>}
                                                />
                                                <div>
                                                    <p className="text-xl font-bold text-white">{expense.categories?.CategoryName || "Uncategorized"}</p>
                                                    <p className="text-xs text-muted-foreground">{expense.categories?.Description || "No category description"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator className="bg-white/10" />

                                        <div>
                                            <p className="text-[10px] text-muted-foreground uppercase mb-2 font-bold">Sub-Category</p>
                                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                                <Layers className="h-5 w-5 text-emerald-400" />
                                                <p className="text-sm font-medium text-emerald-100">{expense.sub_categories?.SubCategoryName || "None"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* PAYER DETAILS */}
                        <motion.div variants={item} className="rounded-3xl border border-white/10 bg-black/40 p-1 backdrop-blur-xl">
                            <div className="rounded-[20px] bg-white/5 p-5 relative overflow-hidden group h-full">
                                <User className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 -rotate-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-6">
                                        <User className="h-4 w-4 text-orange-400" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Payer Details</h3>
                                    </div>

                                    {expense.peoples ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                    {expense.peoples.PeopleName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-base font-bold text-white">{expense.peoples.PeopleName}</p>
                                                    <Badge variant="secondary" className="mt-1 bg-white/10 text-orange-200 hover:bg-white/20 border-transparent text-[10px]">{expense.peoples.PeopleCode || "N/A"}</Badge>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-2 pt-2">
                                                {expense.peoples.Email && (
                                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground/80">{expense.peoples.Email}</span>
                                                    </div>
                                                )}
                                                {expense.peoples.MobileNo && (
                                                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span className="text-xs text-muted-foreground/80 font-mono">{expense.peoples.MobileNo}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-6 text-center">
                                            <p className="text-xs text-muted-foreground mb-1">No payer assigned</p>
                                            <Button variant="link" className="text-orange-400 h-auto p-0 text-xs">Assign Payer</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* METADATA */}
                        <motion.div variants={item} className="flex items-center justify-between px-4 py-2 opacity-50 text-[10px] uppercase tracking-widest text-muted-foreground">
                            <span>Created: {format(new Date(expense.Created), "MMM d, HH:mm")}</span>
                            <span>ID: {expense.ExpenseID}</span>
                        </motion.div>

                    </div>

                </div>
            </motion.div>
        </div>
    );
}
