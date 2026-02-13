"use client";

import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "@/app/(dashboard)/expenses/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddExpenseButton } from "@/components/expenses/add-expense-button";

interface ExpensesClientProps {
    data: any[];
    categories: any[];
    projects: any[];
    peoples: any[];
}

export function ExpensesClient({ data, categories, projects, peoples }: ExpensesClientProps) {
    const columns = getColumns(categories, projects, peoples);

    return (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card className="col-span-1">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Expenses</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={data}
                        filterKeys={[
                            { id: "Category", title: "Category" },
                            { id: "Description", title: "Description" },
                            { id: "People", title: "People" },
                        ]}
                        initialColumnVisibility={{
                            SubCategory: false,
                            ExpenseDetail: false,
                            Description: false,
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
