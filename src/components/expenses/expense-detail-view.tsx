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
    Edit,
    Trash2,
    MoreHorizontal,
    Receipt,
    DollarSign,
    CreditCard
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/shared/logo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { deleteExpense } from "@/actions/expenses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ExpenseDetailViewProps {
    expense: any;
}

export function ExpenseDetailView({ expense }: ExpenseDetailViewProps) {
    return (
        <div className="flex flex-col min-h-screen w-full bg-muted/5">
            {/* Sticky Header */}
            <div className="flex-none px-4 py-3 md:px-6 border-b border-border/60 bg-background/90 backdrop-blur-xl z-50 shadow-sm sticky top-0">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-muted/80 transition-colors h-8 w-8">
                            <Link href="/expenses">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>

                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                                <Receipt className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-xl font-bold tracking-tight text-foreground">
                                        Expense Details
                                    </h1>
                                    <Badge variant="secondary" className="font-mono text-xs px-2 h-6 border-transparent bg-muted text-muted-foreground">
                                        #{expense.ExpenseID}
                                    </Badge>
                                    <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none px-2 h-6">
                                        Logged
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>Created {format(new Date(expense.Created), "MMMM do, yyyy")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 ml-auto sm:ml-0">
                        <Button variant="outline" size="sm" asChild className="h-8 text-xs hover:border-rose-500/50 hover:bg-rose-500/5 transition-all px-3 hidden sm:flex cursor-pointer">
                            <Link href={`/expenses/${expense.ExpenseID}/edit`}>
                                <Edit className="h-3.5 w-3.5 mr-1.5" />
                                Edit Expense
                            </Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 sm:hidden">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={`/expenses/${expense.ExpenseID}/edit`} className="flex w-full cursor-pointer">
                                        <Edit className="mr-2 h-4 w-4" /> Edit Expense
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={async () => {
                                        if (confirm("Are you sure you want to delete this expense?")) {
                                            await deleteExpense(expense.ExpenseID);
                                        }
                                    }}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Expense
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 text-xs shadow-sm hover:shadow-md transition-all px-3 hidden sm:flex bg-red-600 hover:bg-red-700"
                            onClick={async () => {
                                if (confirm("Are you sure you want to delete this expense?")) {
                                    await deleteExpense(expense.ExpenseID);
                                }
                            }}
                        >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-6 max-w-[1800px] mx-auto w-full p-4 md:p-6">
                {/* Top Row: Financials */}
                <section className="shrink-0">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 px-1">
                        <DollarSign className="h-5 w-5 text-rose-500" />
                        Financial Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-gradient-to-br from-[#FFEBEE] to-[#FFCDD2] dark:from-rose-950/30 dark:to-background border-none shadow-sm h-32 flex items-center justify-center relative overflow-hidden group col-span-1 md:col-span-2">
                            <div className="absolute inset-0 bg-white/40 dark:bg-transparent" />
                            <CardContent className="p-0 flex flex-col items-center justify-center text-center relative z-10 w-full">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                                    <span className="text-sm font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Total Amount</span>
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-rose-500 mb-1">
                                    {formatCurrency(Number(expense.Amount))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-sm h-32 flex items-center justify-center">
                            <CardContent className="p-0 flex flex-col items-center justify-center text-center w-full">
                                <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Date Paid</span>
                                </div>
                                <div className="text-xl font-semibold text-foreground">
                                    {format(new Date(expense.ExpenseDate), "MMMM d, yyyy")}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {format(new Date(expense.ExpenseDate), "EEEE")}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-6">
                    {/* Left Column: Details (3 cols - 60%) */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <FileText className="h-5 w-5 text-indigo-500" />
                                About Expense
                            </h3>
                            <Card className="shadow-sm border-border/60 bg-card/50 backdrop-blur-sm h-full">
                                <CardContent className="p-6 space-y-8">
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Expense Title</h4>
                                        <p className="text-lg font-medium leading-relaxed text-foreground">
                                            {expense.ExpenseDetail || "No title provided"}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</h4>
                                        <div className="text-sm leading-relaxed text-foreground/80 font-medium p-4 rounded-md bg-muted/30 border border-border/50 min-h-[120px]">
                                            {expense.Description || "No additional description notes."}
                                        </div>
                                    </div>

                                    {expense.AttachmentPath && (
                                        <div className="space-y-2 pt-4 border-t border-border/50">
                                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Attachment</h4>
                                            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 group cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-md bg-white dark:bg-blue-900/30 text-blue-500">
                                                        <Paperclip className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">View Attachment</p>
                                                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">{expense.AttachmentPath}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column: Context (2 cols - 40%) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Layers className="h-5 w-5 text-orange-500" />
                                Context & Classification
                            </h3>

                            {/* Project Context */}
                            <Card className="shadow-sm border-border/60 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Project</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {expense.projects ? (
                                        <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 border border-border/50">
                                            <Logo
                                                path={expense.projects.ProjectLogo}
                                                alt={expense.projects.ProjectName}
                                                fallbackClassName="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold"
                                                fallbackIcon={<Briefcase className="h-5 w-5" />}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/admin/projects/${expense.projects.ProjectID}`} className="text-base font-semibold hover:underline decoration-indigo-500 underline-offset-4 line-clamp-1">
                                                    {expense.projects.ProjectName}
                                                </Link>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className={cn("h-1.5 w-1.5 rounded-full", expense.projects.IsActive ? "bg-emerald-500" : "bg-muted-foreground")} />
                                                    <p className="text-xs text-muted-foreground font-medium">{expense.projects.IsActive ? "Active Project" : "Inactive"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-dashed border-border text-muted-foreground">
                                            <Briefcase className="h-4 w-4" />
                                            <span className="text-sm">No project linked</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Classification */}
                            <Card className="shadow-sm border-border/60 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Classification</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Logo
                                            path={expense.categories?.LogoPath}
                                            alt={expense.categories?.CategoryName}
                                            fallbackClassName="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-md flex items-center justify-center text-white text-lg font-bold"
                                            fallbackIcon={<span>{expense.categories?.CategoryName?.charAt(0) || "U"}</span>}
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">Category</p>
                                            <p className="text-lg font-bold text-foreground">{expense.categories?.CategoryName || "Uncategorized"}</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-muted-foreground">Sub-Category</span>
                                        <Badge variant="outline" className="font-medium">
                                            {expense.sub_categories?.SubCategoryName || "None"}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Paid To Info */}
                            <Card className="shadow-sm border-border/60 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Paid To</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {expense.peoples ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                                                    {expense.peoples.PeopleName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-foreground">{expense.peoples.PeopleName}</p>
                                                    <p className="text-xs text-muted-foreground">{expense.peoples.PeopleCode || "No Code"}</p>
                                                </div>
                                            </div>

                                            {(expense.peoples.Email || expense.peoples.MobileNo) && (
                                                <div className="grid grid-cols-1 gap-2 p-3 rounded-lg bg-muted/30 border border-border/50 text-xs">
                                                    {expense.peoples.Email && (
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            <Mail className="h-3 w-3" />
                                                            <span className="truncate">{expense.peoples.Email}</span>
                                                        </div>
                                                    )}
                                                    {expense.peoples.MobileNo && (
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            <Phone className="h-3 w-3" />
                                                            <span className="font-mono">{expense.peoples.MobileNo}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-dashed border-border text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            <span className="text-sm">No payer information</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
