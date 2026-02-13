import { prisma } from "@/lib/prisma"
import { serializeData } from "@/lib/serialization"
import { notFound } from "next/navigation"
import { PeopleDetailHeader } from "@/components/people/people-detail-header"
import { PeopleFinancials } from "@/components/people/people-financials"
import { PeopleRelatedTransactions } from "@/components/people/people-related-transactions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Phone, Mail, FileText, Calendar } from "lucide-react"

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function PeopleDetailPage({ params }: PageProps) {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    if (isNaN(id)) notFound()

    const person = await prisma.peoples.findUnique({
        where: { PeopleID: id },
        include: {
            users: true,
            expenses: {
                orderBy: { ExpenseDate: 'desc' },
                include: {
                    categories: true
                }
            },
            incomes: {
                orderBy: { IncomeDate: 'desc' },
                include: {
                    categories: true
                }
            }
        }
    })

    if (!person) notFound()

    const serializedPerson = serializeData(person)

    return (
        <div className="flex flex-col min-h-screen w-full bg-muted/5 anime-fade-in">
            {/* Header */}
            <PeopleDetailHeader person={serializedPerson} />

            <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 md:p-6 flex flex-col gap-6">

                {/* Financial Overview */}
                <section className="shrink-0">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 px-1">
                        <FileText className="h-5 w-5 text-indigo-500" />
                        Financial Overview
                    </h3>
                    <PeopleFinancials expenses={serializedPerson.expenses} incomes={serializedPerson.incomes} />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full min-h-0">
                    {/* Left Column: Details (2 cols) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <FileText className="h-5 w-5 text-orange-500" />
                                Contact Details
                            </h3>
                            <Card className="shadow-sm border-border/60 bg-card/50 backdrop-blur-sm">
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm">Contact information and notes</p>
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <div className="flex items-center gap-4 p-3 rounded-lg border bg-background/50">
                                            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                                <Phone className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Mobile Number</p>
                                                <p className="font-semibold text-foreground">{serializedPerson.MobileNo || "Not Provided"}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 p-3 rounded-lg border bg-background/50">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                <Mail className="h-5 w-5" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Email Address</p>
                                                <p className="font-semibold text-foreground truncate">{serializedPerson.Email || "Not Provided"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2 border-t border-border/50">
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-4">Notes</h4>
                                        <div className="text-sm leading-relaxed text-foreground/80 font-medium p-3 rounded-md bg-muted/30 border border-border/50 min-h-[80px]">
                                            {serializedPerson.Description || "No notes available."}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column: Transactions (3 cols) */}
                    <div className="lg:col-span-3 h-full min-h-0">
                        <PeopleRelatedTransactions expenses={serializedPerson.expenses} incomes={serializedPerson.incomes} />
                    </div>
                </div>
            </main>
        </div>
    )
}

// Helper for class merging if not imported from utility
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
