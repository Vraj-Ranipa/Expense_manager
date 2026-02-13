"use client";

import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "@/app/(dashboard)/incomes/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IncomesClientProps {
    data: any[];
    categories: any[];
    projects: any[];
    peoples: any[];
}

export function IncomesClient({ data, categories, projects, peoples }: IncomesClientProps) {
    const columns = getColumns(categories, projects, peoples);

    return (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Recent Incomes</CardTitle>
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
                            IncomeDetail: false,
                            Description: false,
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
