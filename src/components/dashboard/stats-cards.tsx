import {
    MotionCard,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DollarSign, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Activity } from "lucide-react"
import { StaggerContainer, FadeIn } from "@/components/ui/motion-ui"

export function StatsCards() {
    return (
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MotionCard variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="glass-card bg-gradient-to-br from-violet-500/10 to-transparent border-violet-500/20 data-[state=active]:border-violet-500/50 shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-500 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Balance
                    </CardTitle>
                    <div className="h-10 w-10 rounded-xl bg-violet-500/20 flex items-center justify-center shadow-inner shadow-violet-500/10">
                        <Wallet className="h-5 w-5 text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-300 to-white bg-clip-text text-transparent drop-shadow-sm">$45,231.89</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="text-emerald-400 flex items-center mr-2 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" /> 20.1%
                        </span>
                        <span>from last month</span>
                    </div>
                </CardContent>
            </MotionCard>

            <MotionCard variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="glass-card bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Income
                    </CardTitle>
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shadow-inner shadow-emerald-500/10">
                        <DollarSign className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 to-white bg-clip-text text-transparent drop-shadow-sm">$2,350.00</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="text-emerald-400 flex items-center mr-2 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" /> 180.1%
                        </span>
                        <span>from last month</span>
                    </div>
                </CardContent>
            </MotionCard>

            <MotionCard variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="glass-card bg-gradient-to-br from-rose-500/10 to-transparent border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all duration-500 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
                    <div className="h-10 w-10 rounded-xl bg-rose-500/20 flex items-center justify-center shadow-inner shadow-rose-500/10">
                        <CreditCard className="h-5 w-5 text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-rose-300 to-white bg-clip-text text-transparent drop-shadow-sm">$12,234.00</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="text-rose-400 flex items-center mr-2 bg-rose-500/10 px-2 py-0.5 rounded-full font-medium border border-rose-500/20 shadow-[0_0_10px_rgba(251,113,133,0.2)]">
                            <ArrowDownRight className="h-3 w-3 mr-0.5" /> 19%
                        </span>
                        <span>from last month</span>
                    </div>
                </CardContent>
            </MotionCard>

            <MotionCard variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="glass-card bg-gradient-to-br from-cyan-500/10 to-transparent border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-500 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Active Projects
                    </CardTitle>
                    <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shadow-inner shadow-cyan-500/10">
                        <Activity className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent drop-shadow-sm">12</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="text-cyan-400 flex items-center mr-2 bg-cyan-500/10 px-2 py-0.5 rounded-full font-medium border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" /> 4
                        </span>
                        <span>new projects</span>
                    </div>
                </CardContent>
            </MotionCard>
        </StaggerContainer>
    )
}
