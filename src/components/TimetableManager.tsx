import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimetableGrid, TimeSlot } from './TimetableGrid';
import { Download, Users, User, Calendar } from 'lucide-react';

// Sample timetable data with conflict-free scheduling
const SAMPLE_SCHEDULE: TimeSlot[] = [
  // Monday
  { id: '1', subject: 'Programming', teacher: 'Dr. Smith', room: 'Room 101', time: '9:00-10:00', day: 'Monday', color: 'programming' },
  { id: '2', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 102', time: '10:00-11:00', day: 'Monday', color: 'mathematics' },
  { id: '3', subject: 'English', teacher: 'Ms. Williams', room: 'Room 103', time: '11:15-12:15', day: 'Monday', color: 'english' },
  { id: '4', subject: 'Digital Electronics', teacher: 'Dr. Brown', room: 'Room 104', time: '12:15-13:15', day: 'Monday', color: 'electronics' },
  
  // Tuesday
  { id: '5', subject: 'Computer Lab', teacher: 'Dr. Smith', room: 'Computer Lab', time: '9:00-10:00', day: 'Tuesday', color: 'lab' },
  { id: '6', subject: 'Digital Electronics', teacher: 'Dr. Brown', room: 'Room 104', time: '10:00-11:00', day: 'Tuesday', color: 'electronics' },
  { id: '7', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 102', time: '11:15-12:15', day: 'Tuesday', color: 'mathematics' },
  { id: '8', subject: 'Programming', teacher: 'Dr. Smith', room: 'Room 101', time: '14:00-15:00', day: 'Tuesday', color: 'programming' },
  
  // Wednesday
  { id: '9', subject: 'English', teacher: 'Ms. Williams', room: 'Room 103', time: '9:00-10:00', day: 'Wednesday', color: 'english' },
  { id: '10', subject: 'Programming', teacher: 'Dr. Smith', room: 'Room 101', time: '10:00-11:00', day: 'Wednesday', color: 'programming' },
  { id: '11', subject: 'Computer Lab', teacher: 'Dr. Smith', room: 'Computer Lab', time: '11:15-12:15', day: 'Wednesday', color: 'lab' },
  { id: '12', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 102', time: '14:00-15:00', day: 'Wednesday', color: 'mathematics' },
  
  // Thursday
  { id: '13', subject: 'Digital Electronics', teacher: 'Dr. Brown', room: 'Room 104', time: '9:00-10:00', day: 'Thursday', color: 'electronics' },
  { id: '14', subject: 'English', teacher: 'Ms. Williams', room: 'Room 103', time: '10:00-11:00', day: 'Thursday', color: 'english' },
  { id: '15', subject: 'Programming', teacher: 'Dr. Smith', room: 'Room 101', time: '11:15-12:15', day: 'Thursday', color: 'programming' },
  { id: '16', subject: 'Computer Lab', teacher: 'Dr. Smith', room: 'Computer Lab', time: '14:00-15:00', day: 'Thursday', color: 'lab' },
  
  // Friday
  { id: '17', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 102', time: '9:00-10:00', day: 'Friday', color: 'mathematics' },
  { id: '18', subject: 'Digital Electronics', teacher: 'Dr. Brown', room: 'Room 104', time: '10:00-11:00', day: 'Friday', color: 'electronics' },
  { id: '19', subject: 'English', teacher: 'Ms. Williams', room: 'Room 103', time: '11:15-12:15', day: 'Friday', color: 'english' },
  { id: '20', subject: 'Programming', teacher: 'Dr. Smith', room: 'Room 101', time: '14:00-15:00', day: 'Friday', color: 'programming' },
  
  // Saturday
  { id: '21', subject: 'Computer Lab', teacher: 'Dr. Smith', room: 'Computer Lab', time: '9:00-10:00', day: 'Saturday', color: 'lab' },
  { id: '22', subject: 'Mathematics', teacher: 'Prof. Johnson', room: 'Room 102', time: '10:00-11:00', day: 'Saturday', color: 'mathematics' },
  { id: '23', subject: 'Digital Electronics', teacher: 'Dr. Brown', room: 'Room 104', time: '11:15-12:15', day: 'Saturday', color: 'electronics' },
];

const TEACHERS = ['Dr. Smith', 'Prof. Johnson', 'Ms. Williams', 'Dr. Brown'];

export const TimetableManager = () => {
  const [viewType, setViewType] = useState<'student' | 'teacher' | 'combined'>('combined');
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');

  const exportToCSV = () => {
    const headers = ['Day', 'Time', 'Subject', 'Teacher', 'Room'];
    const csvContent = [
      headers.join(','),
      ...SAMPLE_SCHEDULE.map(slot => 
        [slot.day, slot.time, slot.subject, slot.teacher, slot.room].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bca-timetable-${viewType}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTeacherStats = () => {
    return TEACHERS.map(teacher => {
      const classes = SAMPLE_SCHEDULE.filter(slot => slot.teacher === teacher);
      return {
        name: teacher,
        totalClasses: classes.length,
        subjects: [...new Set(classes.map(c => c.subject))],
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6 shadow-soft">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BCA First Year Timetable
              </h1>
              <p className="text-muted-foreground mt-2">
                Conflict-free weekly schedule for students and teachers
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                variant={viewType === 'combined' ? 'default' : 'outline'}
                onClick={() => setViewType('combined')}
                className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                Combined View
              </Button>
              <Button 
                variant={viewType === 'student' ? 'default' : 'outline'}
                onClick={() => setViewType('student')}
                className="gap-2"
              >
                <Users className="w-4 h-4" />
                Student View
              </Button>
              <Button 
                variant={viewType === 'teacher' ? 'default' : 'outline'}
                onClick={() => setViewType('teacher')}
                className="gap-2"
              >
                <User className="w-4 h-4" />
                Teacher View
              </Button>
              <Button onClick={exportToCSV} variant="secondary" className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </Card>

        {/* Teacher Selection for Teacher View */}
        {viewType === 'teacher' && (
          <Card className="p-4 shadow-soft">
            <div className="flex items-center gap-4">
              <label className="font-medium">Select Teacher:</label>
              <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Choose a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {TEACHERS.map(teacher => (
                    <SelectItem key={teacher} value={teacher}>
                      {teacher}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        )}

        {/* Teacher Statistics */}
        {viewType === 'combined' && (
          <Card className="p-6 shadow-soft">
            <h3 className="text-xl font-semibold mb-4">Teacher Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {getTeacherStats().map(teacher => (
                <div key={teacher.name} className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium">{teacher.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {teacher.totalClasses} classes/week
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {teacher.subjects.map(subject => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Timetable Grid */}
        {viewType === 'combined' && (
          <TimetableGrid 
            schedule={SAMPLE_SCHEDULE}
            title="Complete BCA First Year Schedule"
            viewType="student"
          />
        )}

        {viewType === 'student' && (
          <TimetableGrid 
            schedule={SAMPLE_SCHEDULE}
            title="Student Timetable - BCA First Year"
            viewType="student"
          />
        )}

        {viewType === 'teacher' && selectedTeacher && (
          <TimetableGrid 
            schedule={SAMPLE_SCHEDULE}
            title={`Individual Teacher Schedule`}
            viewType="teacher"
            teacherFilter={selectedTeacher}
          />
        )}

        {viewType === 'teacher' && !selectedTeacher && (
          <Card className="p-8 text-center shadow-soft">
            <div className="text-muted-foreground">
              Please select a teacher to view their individual timetable.
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};