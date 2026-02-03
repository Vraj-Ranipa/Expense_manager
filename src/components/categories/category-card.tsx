
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    MoreHorizontal,
    Edit,
    Trash,
    Copy,
    TrendingUp,
    TrendingDown,
    Calendar,
    CheckCircle2,
    XCircle,
    Tag,
    Layers
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { categories, sub_categories } from "@prisma/client"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/logo"

export type CategoryWithSubCategories = categories & {
    sub_categories: sub_categories[]
}

interface CategoryCardProps {
    category: CategoryWithSubCategories
}

export function CategoryCard({ category }: CategoryCardProps) {
    const isExpense = category.IsExpense
    const isIncome = category.IsIncome
    const isActive = category.IsActive

    return (
        <Card className={cn(
            "group relative overflow-hidden transition-all duration-300 py-0 gap-0 border border-border bg-card",
            "hover:shadow-md hover:-translate-y-1"
        )}>

            {/* Top Bar: Badge & Actions */}
            <div className="flex items-center justify-between px-4 pt-4 pb-0 relative z-20">
                <Badge
                    variant="outline"
                    className={cn("px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full border",
                        isExpense ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/40" :
                            isIncome ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40" :
                                "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800"
                    )}
                >
                    {isExpense ? "Expense" : isIncome ? "Income" : "Other"}
                </Badge>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted -mr-2">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(category.CategoryID.toString())}
                        >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/categories/${category.CategoryID}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <CardContent className="pt-2 pb-5 px-5 space-y-5 relative z-10">
                <Link href={`/admin/categories/${category.CategoryID}`} className="block h-full group/link">
                    {/* Hero Section: Logo & Name */}
                    <div className="flex items-center gap-4 mt-2">
                        <div className={cn(
                            "p-2 rounded-xl border flex items-center justify-center transition-colors bg-muted/20",
                            isExpense ? "border-red-100 dark:border-red-900/20" :
                                isIncome ? "border-emerald-100 dark:border-emerald-900/20" :
                                    "border-border"
                        )}>
                            <Logo
                                path={category.LogoPath}
                                alt={category.CategoryName}
                                fallbackClassName={cn(
                                    "h-10 w-10 flex items-center justify-center",
                                    isExpense ? "text-red-500" :
                                        isIncome ? "text-emerald-500" :
                                            "text-muted-foreground"
                                )}
                                fallbackIcon={
                                    isExpense ? <TrendingDown className="h-6 w-6" /> :
                                        isIncome ? <TrendingUp className="h-6 w-6" /> :
                                            <Tag className="h-6 w-6" />
                                }
                            />
                        </div>

                        <div className="space-y-1 min-w-0 flex-1">
                            <CardTitle className="text-base font-bold tracking-tight text-foreground line-clamp-1 group-hover/link:text-primary transition-colors">
                                {category.CategoryName}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-xs">
                                {isActive ? (
                                    <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        Active
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                                        <XCircle className="h-3.5 w-3.5" /> Inactive
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs mt-4">
                        <div className="p-2 rounded-lg border border-border bg-muted/20">
                            <p className="text-muted-foreground mb-1 font-medium text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                Created
                            </p>
                            <div className="font-semibold text-foreground">
                                {new Date(category.Created).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="p-2 rounded-lg border border-border bg-muted/20">
                            <p className="text-muted-foreground mb-1 font-medium text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                                <Layers className="h-3 w-3" />
                                Sub-Categories
                            </p>
                            <div className="font-semibold text-foreground">
                                {category.sub_categories ? category.sub_categories.length : 0} <span className="font-normal text-muted-foreground">Items</span>
                            </div>
                        </div>
                    </div>

                    {/* Sub-Categories List */}
                    {category.sub_categories && category.sub_categories.length > 0 && (
                        <div className="pt-2 mt-4 border-t border-border/50">
                            <div className="flex flex-wrap gap-1.5">
                                {category.sub_categories.slice(0, 3).map((sub) => (
                                    <span
                                        key={sub.SubCategoryID}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-muted text-muted-foreground border border-border/50 max-w-full truncate"
                                    >
                                        {sub.SubCategoryName}
                                    </span>
                                ))}
                                {category.sub_categories.length > 3 && (
                                    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                        +{category.sub_categories.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </Link>
            </CardContent>
        </Card>
    )
}
