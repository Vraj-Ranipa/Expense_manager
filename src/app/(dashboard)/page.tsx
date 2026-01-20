import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { FadeIn, SlideIn } from "@/components/ui/motion-ui"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <FadeIn duration={0.6} className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
          Dashboard
        </h2>
        <div className="flex items-center space-x-2">
          <Button className="shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-shadow">
            <Download className="mr-2 h-4 w-4" />
            Download Reports
          </Button>
        </div>
      </FadeIn>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Row */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <StatsCards />
        </div>

        {/* Main Chart Area */}
        <SlideIn delay={0.2} direction="up" className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border border-white/5 bg-white/5 p-1 backdrop-blur-md shadow-lg shadow-black/20 hover:border-white/10 transition-colors duration-500">
          <Overview />
        </SlideIn>

        {/* Side Panel / Recent Transactions */}
        <SlideIn delay={0.3} direction="right" className="col-span-1 md:col-span-2 lg:col-span-1 rounded-2xl border border-white/5 bg-white/5 p-1 backdrop-blur-md shadow-lg shadow-black/20 hover:border-white/10 transition-colors duration-500">
          <RecentTransactions />
        </SlideIn>
      </div>
    </div>
  )
}
