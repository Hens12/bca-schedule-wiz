import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditableTimeSlot } from './EditableTimeSlot';
import { TimeSlot } from './TimetableGrid';

interface EditableTimetableGridProps {
  schedule: TimeSlot[];
  title: string;
  viewType: 'student' | 'teacher';
  teacherFilter?: string;
  subjects: string[];
  teachers: string[];
  rooms: string[];
  onUpdateSchedule: (schedule: TimeSlot[]) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  '9:00-10:00',
  '10:00-11:00', 
  '11:15-12:15',
  '12:15-13:15',
  '14:00-15:00',
  '15:00-16:00'
];

export const EditableTimetableGrid = ({ 
  schedule, 
  title, 
  viewType, 
  teacherFilter, 
  subjects, 
  teachers, 
  rooms,
  onUpdateSchedule
}: EditableTimetableGridProps) => {
  const filteredSchedule = teacherFilter 
    ? schedule.filter(slot => slot.teacher === teacherFilter)
    : schedule;

  const getSlotForDayAndTime = (day: string, time: string) => {
    return filteredSchedule.find(slot => slot.day === day && slot.time === time);
  };

  const handleSaveSlot = (updatedSlot: TimeSlot) => {
    const newSchedule = schedule.map(slot => 
      slot.id === updatedSlot.id ? updatedSlot : slot
    );
    onUpdateSchedule(newSchedule);
  };

  const handleDeleteSlot = (id: string) => {
    const newSchedule = schedule.filter(slot => slot.id !== id);
    onUpdateSchedule(newSchedule);
  };

  const handleAddSlot = (newSlot: Omit<TimeSlot, 'id'>) => {
    const id = Date.now().toString();
    const slotWithId = { ...newSlot, id };
    onUpdateSchedule([...schedule, slotWithId]);
  };

  return (
    <Card className="p-6 shadow-medium">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Click on any slot to edit or add new classes
        </p>
        {teacherFilter && (
          <Badge variant="outline" className="mt-2">
            Teacher: {teacherFilter}
          </Badge>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 min-w-[800px]">
          {/* Header */}
          <div className="p-3 bg-muted rounded-lg font-semibold text-center">
            Time
          </div>
          {DAYS.map(day => (
            <div key={day} className="p-3 bg-muted rounded-lg font-semibold text-center">
              {day}
            </div>
          ))}
          
          {/* Time slots */}
          {TIME_SLOTS.map(time => (
            <div key={time} className="contents">
              <div className="p-3 bg-muted/50 rounded-lg font-medium text-center text-sm">
                {time}
              </div>
              {DAYS.map(day => {
                const slot = getSlotForDayAndTime(day, time);
                return (
                  <EditableTimeSlot
                    key={`${day}-${time}`}
                    slot={slot || null}
                    day={day}
                    time={time}
                    subjects={subjects}
                    teachers={teachers}
                    rooms={rooms}
                    onSave={handleSaveSlot}
                    onDelete={handleDeleteSlot}
                    onAdd={handleAddSlot}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};