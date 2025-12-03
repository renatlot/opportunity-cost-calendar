import { useMemo } from 'react'
import { TrendingUp, Clock, DollarSign, BarChart3 } from 'lucide-react'

import Card from '@/components/ui/Card'
import { useProjectStore, useTimeLogStore } from '@/store'
import { formatCurrency } from '@/lib/utils'

interface AnalyticsDashboardProps {
  startDate?: string
  endDate?: string
}

export default function AnalyticsDashboard({ startDate, endDate }: AnalyticsDashboardProps) {
  const projects = useProjectStore((state) => state.projects)
  const timeLogs = useTimeLogStore((state) => state.timeLogs)

  const analytics = useMemo(() => {
    let filteredLogs = timeLogs

    if (startDate) {
      filteredLogs = filteredLogs.filter(log => log.date >= startDate)
    }
    if (endDate) {
      filteredLogs = filteredLogs.filter(log => log.date <= endDate)
    }

    const totalValue = filteredLogs.reduce((sum, log) => sum + log.value, 0)
    const totalHours = filteredLogs.reduce((sum, log) => sum + log.duration, 0)
    const avgHourlyRate = totalHours > 0 ? totalValue / totalHours : 0

    // Project breakdown
    const projectStats = projects.map(project => {
      const projectLogs = filteredLogs.filter(log => log.projectId === project.id)
      const hours = projectLogs.reduce((sum, log) => sum + log.duration, 0)
      const value = projectLogs.reduce((sum, log) => sum + log.value, 0)
      return {
        project,
        hours,
        value,
        percentage: totalValue > 0 ? (value / totalValue) * 100 : 0,
      }
    }).filter(stat => stat.hours > 0)
      .sort((a, b) => b.value - a.value)

    // High-value vs low-value (threshold: $300/hr)
    const highValueLogs = filteredLogs.filter(log => {
      const project = projects.find(p => p.id === log.projectId)
      return project && project.hourlyRate >= 300
    })
    const highValueTotal = highValueLogs.reduce((sum, log) => sum + log.value, 0)
    const highValueHours = highValueLogs.reduce((sum, log) => sum + log.duration, 0)

    return {
      totalValue,
      totalHours,
      avgHourlyRate,
      projectStats,
      highValueTotal,
      highValueHours,
      highValuePercentage: totalValue > 0 ? (highValueTotal / totalValue) * 100 : 0,
    }
  }, [timeLogs, projects, startDate, endDate])

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-wealth-gold/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-wealth-gold" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Value</p>
              <p className="text-xl font-value text-wealth-gold">
                {formatCurrency(analytics.totalValue)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Hours</p>
              <p className="text-xl font-semibold text-wealth-dark">
                {analytics.totalHours.toFixed(1)}h
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg Rate</p>
              <p className="text-xl font-semibold text-wealth-dark">
                {formatCurrency(analytics.avgHourlyRate)}/hr
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-wealth-emerald/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-wealth-emerald" />
            </div>
            <div>
              <p className="text-xs text-gray-500">High-Value</p>
              <p className="text-xl font-semibold text-wealth-emerald">
                {analytics.highValuePercentage.toFixed(0)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Project Breakdown */}
      {analytics.projectStats.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-wealth-dark mb-4">
            Project Breakdown
          </h3>
          <div className="space-y-3">
            {analytics.projectStats.map(({ project, hours, value, percentage }) => (
              <div key={project.id}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-sm font-medium text-wealth-dark">
                      {project.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      {hours.toFixed(1)}h
                    </span>
                    <span className="text-sm font-semibold text-wealth-gold">
                      {formatCurrency(value)}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: project.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* High-Value Analysis */}
      {analytics.totalHours > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-wealth-dark mb-4">
            High-Value Time Analysis
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">High-Value Projects (≥$300/hr)</p>
              <p className="text-2xl font-value text-wealth-emerald">
                {formatCurrency(analytics.highValueTotal)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {analytics.highValueHours.toFixed(1)} hours
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Other Projects</p>
              <p className="text-2xl font-value text-gray-600">
                {formatCurrency(analytics.totalValue - analytics.highValueTotal)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {(analytics.totalHours - analytics.highValueHours).toFixed(1)} hours
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {analytics.totalHours === 0 && (
        <Card className="p-12 text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No time logged yet</p>
          <p className="text-sm text-gray-400">
            Start logging time to see your analytics
          </p>
        </Card>
      )}
    </div>
  )
}
