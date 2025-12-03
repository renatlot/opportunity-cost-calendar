import { Edit2, Trash2, Plus } from 'lucide-react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useTimeBoxStore } from '@/store'
import { TimeBox } from '@/types'

interface TimeBoxListProps {
  onCreateTimeBox?: () => void
  onEditTimeBox?: (timeBox: TimeBox) => void
  onDeleteTimeBox?: (id: string) => void
}

export default function TimeBoxList({ 
  onCreateTimeBox,
  onEditTimeBox,
  onDeleteTimeBox
}: TimeBoxListProps) {
  const timeBoxes = useTimeBoxStore((state) => state.timeBoxes)

  const handleDelete = (id: string, name: string) => {
    const confirmed = window.confirm(
      `Delete time box "${name}"? It will be removed from all days in your calendar.`
    )
    
    if (confirmed && onDeleteTimeBox) {
      onDeleteTimeBox(id)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-wealth-dark">
            Time Box Templates
          </h3>
          <p className="text-sm text-gray-600">
            Recurring daily structure
          </p>
        </div>
        {onCreateTimeBox && (
          <Button size="sm" onClick={onCreateTimeBox}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        )}
      </div>

      {timeBoxes.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-gray-500 text-sm mb-4">
            No time boxes yet. Create templates to structure your ideal day.
          </p>
          {onCreateTimeBox && (
            <Button onClick={onCreateTimeBox}>
              <Plus className="w-4 h-4 mr-2" />
              Create Time Box
            </Button>
          )}
        </Card>
      ) : (
        <div className="space-y-2">
          {timeBoxes.map((timeBox) => (
            <Card key={timeBox.id} className="p-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded flex-shrink-0"
                  style={{ 
                    backgroundColor: timeBox.color,
                    opacity: timeBox.opacity 
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-wealth-dark truncate">
                    {timeBox.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {timeBox.startTime} - {timeBox.endTime}
                  </p>
                </div>
                <div className="flex gap-1">
                  {onEditTimeBox && (
                    <button
                      onClick={() => onEditTimeBox(timeBox)}
                      className="p-2 text-gray-600 hover:text-wealth-emerald hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-wealth-emerald"
                      aria-label={`Edit ${timeBox.name}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                  {onDeleteTimeBox && (
                    <button
                      onClick={() => handleDelete(timeBox.id, timeBox.name)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label={`Delete ${timeBox.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
