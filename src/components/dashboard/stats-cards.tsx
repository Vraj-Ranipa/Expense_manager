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
            <MotionCard variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-card border-border shadow-none hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Balance
                    </CardTitle>
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight text-foreground">$45,231.89</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="text-emerald-600 flex items-center mr-2 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" /> 20.1%
                        </span>
                        <span>from last month</span>
                    </div>
                </CardContent>
            </MotionCard>

            <MotionCard variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-card border-border shadow-none hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Income
                    </CardTitle>
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight text-foreground">$2,350.00</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="text-emerald-600 flex items-center mr-2 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" /> 180.1%
                        </span>
                        <span>from last month</span>
                    </div>
                </CardContent>
            </MotionCard>

            <MotionCard variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-card border-border shadow-none hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight text-foreground">$12,234.00</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="text-rose-600 flex items-center mr-2 bg-rose-100 dark:bg-rose-900/30 px-2 py-0.5 rounded-full font-medium">
                            <ArrowDownRight className="h-3 w-3 mr-0.5" /> 19%
                        </span>
                        <span>from last month</span>
                    </div>
                </CardContent>
            </MotionCard>

            <MotionCard variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-card border-border shadow-none hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Active Projects
                    </CardTitle>
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold tracking-tight text-foreground">12</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="text-emerald-600 flex items-center mr-2 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full font-medium">
                            <ArrowUpRight className="h-3 w-3 mr-0.5" /> 4
                        </span>
                        <span>new projects</span>
                    </div>
                </CardContent>
            </MotionCard>
        </StaggerContainer>
    )
}
