"use client";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
    ComposedChart,
    defs,
    linearGradient,
    stop
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const data = [
    {
        name: "Jan",
        income: 4000,
        expense: 2400,
    },
    {
        name: "Feb",
        income: 3000,
        expense: 1398,
    },
    {
        name: "Mar",
        income: 2000,
        expense: 9800,
    },
    {
        name: "Apr",
        income: 2780,
        expense: 3908,
    },
    {
        name: "May",
        income: 1890,
        expense: 4800,
    },
    {
        name: "Jun",
        income: 2390,
        expense: 3800,
    },
    {
        name: "Jul",
        income: 3490,
        expense: 4300,
    },
];

export function MonthlyTrends() {
    return (
        <div className="col-span-8 rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
            <div className="mb-6">
                <h3 className="text-lg font-bold tracking-tight text-white">
                    Monthly Trends
                </h3>
                <p className="text-sm text-muted-foreground">
                    Income vs Expenses over time.
                </p>
            </div>
            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity={1} />
                                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.2} />
                            </linearGradient>
                            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f43f5e" stopOpacity={1} />
                                <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#ffffff"
                            opacity={0.1}
                        />
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#9ca3af" }}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            tick={{ fill: "#9ca3af" }}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.05)" }}
                            content={({ active, payload, label }: any) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-xl border border-white/10 bg-black/80 px-4 py-3 shadow-xl backdrop-blur-md">
                                            <div className="mb-2 border-b border-white/10 pb-1">
                                                <p className="text-sm font-semibold text-white">
                                                    {label}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                                        Income
                                                    </span>
                                                    <span className="font-bold text-sky-400">
                                                        ${payload[0].value}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                                        Expenses
                                                    </span>
                                                    <span className="font-bold text-rose-400">
                                                        ${payload[1].value}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "20px" }} />
                        <Bar
                            dataKey="income"
                            fill="url(#incomeGradient)"
                            radius={[4, 4, 0, 0]}
                            name="Income"
                            barSize={30}
                        />
                        <Bar
                            dataKey="expense"
                            fill="url(#expenseGradient)"
                            radius={[4, 4, 0, 0]}
                            name="Expense"
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
