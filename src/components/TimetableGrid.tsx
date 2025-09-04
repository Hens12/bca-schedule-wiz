import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface TimeSlot {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  time: string;
  day: string;
  color: string;
}

interface TimetableGridProps {
  schedule: TimeSlot[];
  title: string;
  viewType: 'student' | 'teacher';
  teacherFilter?: string;
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

const SUBJECT_COLORS: Record<string, string> = {
  'Programming': 'bg-programming/20 text-programming border-programming/30',
  'Mathematics': 'bg-mathematics/20 text-mathematics border-mathematics/30',
  'English': 'bg-english/20 text-english border-english/30',
  'Digital Electronics': 'bg-electronics/20 text-electronics border-electronics/30',
  'Computer Lab': 'bg-lab/20 text-lab border-lab/30'
};

export const TimetableGrid = ({ schedule, title, viewType, teacherFilter }: TimetableGridProps) => {
  const filteredSchedule = teacherFilter 
    ? schedule.filter(slot => slot.teacher === teacherFilter)
    : schedule;

  const getSlotForDayAndTime = (day: string, time: string) => {
    return filteredSchedule.find(slot => slot.day === day && slot.time === time);
  };

  return (
    <Card className="p-6 shadow-medium">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </h2>
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
                  <div key={`${day}-${time}`} className="p-2">
                    {slot ? (
                      <div className={`p-3 rounded-lg border-2 text-center transition-all hover:shadow-soft ${SUBJECT_COLORS[slot.subject]}`}>
                        <div className="font-semibold text-sm">{slot.subject}</div>
                        <div className="text-xs mt-1">{slot.teacher}</div>
                        <div className="text-xs opacity-75">{slot.room}</div>
                      </div>
                    ) : (
                      <div className="p-3 border-2 border-dashed border-border rounded-lg bg-muted/20 text-center text-muted-foreground text-xs">
                        Free
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};