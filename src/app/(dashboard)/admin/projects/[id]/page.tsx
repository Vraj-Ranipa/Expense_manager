
import { prisma } from "@/lib/prisma";
import { serializeData } from "@/lib/serialization";
import { notFound } from "next/navigation";
import { ProjectDetailHeader } from "@/components/projects/project-detail-header";
import { ProjectFinancials } from "@/components/projects/project-financials";
import { RelatedTransactions } from "@/components/projects/related-transactions";
import { ProjectExpenseBreakdown } from "@/components/projects/project-expense-breakdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Activity, Calendar, FileText, PieChart } from "lucide-react";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
        return notFound();
    }

    const project = await prisma.projects.findUnique({
        where: {
            ProjectID: projectId,
        },
        include: {
            expenses: {
                orderBy: {
                    ExpenseDate: 'desc'
                },
                take: 50,
                include: {
                    categories: true
                }
            },
            incomes: {
                orderBy: {
                    IncomeDate: 'desc'
                },
                take: 50,
                include: {
                    categories: true
                }
            }
        },
    });

    if (!project) {
        return notFound();
    }

    const serializedProject = serializeData(project);

    return (
        <div className="flex flex-col min-h-screen w-full bg-muted/5">
            <ProjectDetailHeader project={serializedProject} />

            <div className="flex-1 flex flex-col gap-6 max-w-[1800px] mx-auto w-full p-4 md:p-6">
                {/* Top Row: Financials */}
                <section className="shrink-0">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 px-1">
                        <Activity className="h-5 w-5 text-indigo-500" />
                        Financial Overview
                    </h3>
                    <ProjectFinancials expenses={serializedProject.expenses} incomes={serializedProject.incomes} />
                </section>

                {/* Main Content Grid 2 columns */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pb-6">
                    {/* Left Column: Project Info (2 cols - 40%) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* About Project */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <FileText className="h-5 w-5 text-orange-500" />
                                About Project
                            </h3>
                            <Card className="shadow-sm border-border/60 bg-card/50 backdrop-blur-sm">
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-1.5">
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Description</h4>
                                        <p className="text-sm leading-relaxed text-foreground/80 font-medium">
                                            {serializedProject.Description || "No description provided."}
                                        </p>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Additional Notes</h4>
                                        <div className="text-sm leading-relaxed text-foreground/80 font-medium p-3 rounded-md bg-muted/30 border border-border/50">
                                            {serializedProject.ProjectDetail || "No additional notes."}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                                        <div className="space-y-1 pt-4">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                                                <Calendar className="h-3 w-3" /> Start Date
                                            </div>
                                            <p className="font-semibold text-sm pl-5">
                                                {serializedProject.ProjectStartDate ? format(new Date(serializedProject.ProjectStartDate), "MMMM do, yyyy") : "Not set"}
                                            </p>
                                        </div>
                                        <div className="space-y-1 pt-4 border-l border-border/50 pl-4">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                                                <Calendar className="h-3 w-3" /> End Date
                                            </div>
                                            <p className="font-semibold text-sm pl-5">
                                                {serializedProject.ProjectEndDate ? format(new Date(serializedProject.ProjectEndDate), "MMMM do, yyyy") : "Ongoing"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column: Transactions (3 cols - 60%) */}
                    <div className="lg:col-span-3 h-full min-h-0">
                        <RelatedTransactions expenses={serializedProject.expenses} incomes={serializedProject.incomes} />
                    </div>
                </div>
            </div>
        </div>
    );
}
