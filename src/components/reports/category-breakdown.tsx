"use client";

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const data = [
    { name: "Rent", value: 1200 },
    { name: "Food", value: 900 },
    { name: "Utilities", value: 300 },
    { name: "Entertainment", value: 400 },
    { name: "Transport", value: 200 },
];

const COLORS = [
    "#38bdf8", // Sky Blue
    "#818cf8", // Indigo
    "#c084fc", // Purple
    "#2dd4bf", // Teal
    "#fb7185", // Rose
];

export function CategoryBreakdown() {
    return (
        <div className="col-span-4 rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
            <div className="mb-6">
                <h3 className="text-lg font-bold tracking-tight text-white">
                    Spending by Category
                </h3>
                <p className="text-sm text-muted-foreground">
                    Where your money is going.
                </p>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    className="transition-all duration-300 hover:opacity-80"
                                    style={{
                                        filter: `drop-shadow(0 0 8px ${COLORS[index % COLORS.length]}80)`,
                                    }}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }: any) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-xl border border-white/10 bg-black/80 px-3 py-2 shadow-xl backdrop-blur-md">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="h-2 w-2 rounded-full"
                                                    style={{ backgroundColor: payload[0].payload.fill }}
                                                />
                                                <span className="font-semibold text-white">
                                                    {payload[0].name}:
                                                </span>
                                                <span className="font-bold text-muted-foreground">
                                                    ${payload[0].value}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Legend
                            verticalAlign="middle"
                            align="right"
                            layout="vertical"
                            iconType="circle"
                            wrapperStyle={{ paddingLeft: "20px" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
