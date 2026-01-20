"use client"

import { useState } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const data = [
    { name: "Jan", total: 1500, income: 2400 },
    { name: "Feb", total: 2300, income: 3000 },
    { name: "Mar", total: 3200, income: 4500 },
    { name: "Apr", total: 4100, income: 9200 },
    { name: "May", total: 2800, income: 5100 },
    { name: "Jun", total: 4800, income: 6000 },
    { name: "Jul", total: 3500, income: 4800 },
    { name: "Aug", total: 2100, income: 3800 },
    { name: "Sep", total: 3900, income: 4300 },
    { name: "Oct", total: 2800, income: 3900 },
    { name: "Nov", total: 3400, income: 4600 },
    { name: "Dec", total: 1900, income: 3200 },
]

export function Overview() {
    const [activeTab, setActiveTab] = useState("overview")

    // Component for defining gradients
    const Gradients = () => (
        <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
        </defs>
    );

    return (
        <Card className="col-span-4 border-none bg-transparent shadow-none">
            <CardHeader className="px-0">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Financial Overview</CardTitle>
                        <CardDescription>
                            Comparing monthly performance.
                        </CardDescription>
                    </div>
                    {/* Tiny animated indicator */}
                    <div className="flex items-center gap-2">
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <span className="text-xs text-primary font-medium">Live Updates</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-0">
                <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
                    <TabsList className="bg-white/5 border border-white/10 p-1">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded-md transition-all">Overview</TabsTrigger>
                        <TabsTrigger value="income" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400 rounded-md transition-all">Income</TabsTrigger>
                        <TabsTrigger value="expenses" className="data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-400 rounded-md transition-all">Expenses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <Gradients />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }}
                                        content={({ active, payload, label }: any) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl p-4 shadow-2xl ring-1 ring-white/10">
                                                        <p className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider">{label}</p>
                                                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                                            <div className="flex flex-col">
                                                                <span className="text-[0.70rem] uppercase text-emerald-500/70 font-semibold">Income</span>
                                                                <span className="text-lg font-bold text-emerald-400">${payload[1].value}</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[0.70rem] uppercase text-rose-500/70 font-semibold">Expenses</span>
                                                                <span className="text-lg font-bold text-rose-400">${payload[0].value}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#f43f5e"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorTotal)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#34d399"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorIncome)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="income" className="space-y-4">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <Gradients />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip cursor={{ stroke: 'rgba(255,255,255,0.2)' }} contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                    <Area type="monotone" dataKey="income" stroke="#34d399" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>

                    <TabsContent value="expenses" className="space-y-4">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <Gradients />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip cursor={{ stroke: 'rgba(255,255,255,0.2)' }} contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                    <Area type="monotone" dataKey="total" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
