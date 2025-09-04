import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TimeSlot } from './TimetableGrid';
import { Edit, Save, X } from 'lucide-react';

interface EditableTimeSlotProps {
  slot: TimeSlot | null;
  onSave: (slot: TimeSlot) => void;
  onDelete: (id: string) => void;
  onAdd: (slot: Omit<TimeSlot, 'id'>) => void;
  day: string;
  time: string;
  subjects: string[];
  teachers: string[];
  rooms: string[];
}

const SUBJECT_COLORS: Record<string, string> = {
  'Programming': 'bg-programming/20 text-programming border-programming/30',
  'Mathematics': 'bg-mathematics/20 text-mathematics border-mathematics/30',
  'English': 'bg-english/20 text-english border-english/30',
  'Digital Electronics': 'bg-electronics/20 text-electronics border-electronics/30',
  'Computer Lab': 'bg-lab/20 text-lab border-lab/30'
};

export const EditableTimeSlot = ({ 
  slot, 
  onSave, 
  onDelete, 
  onAdd, 
  day, 
  time, 
  subjects, 
  teachers, 
  rooms 
}: EditableTimeSlotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    subject: slot?.subject || '',
    teacher: slot?.teacher || '',
    room: slot?.room || '',
  });

  const handleSave = () => {
    if (editData.subject && editData.teacher && editData.room) {
      if (slot) {
        onSave({
          ...slot,
          subject: editData.subject,
          teacher: editData.teacher,
          room: editData.room,
        });
      } else {
        onAdd({
          subject: editData.subject,
          teacher: editData.teacher,
          room: editData.room,
          day,
          time,
          color: editData.subject.toLowerCase().replace(' ', ''),
        });
      }
      setIsOpen(false);
    }
  };

  const handleDelete = () => {
    if (slot) {
      onDelete(slot.id);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="p-2 h-full">
          {slot ? (
            <div className={`p-3 rounded-lg border-2 text-center transition-all hover:shadow-soft cursor-pointer group ${SUBJECT_COLORS[slot.subject]}`}>
              <div className="font-semibold text-sm">{slot.subject}</div>
              <div className="text-xs mt-1">{slot.teacher}</div>
              <div className="text-xs opacity-75">{slot.room}</div>
              <Edit className="w-3 h-3 mx-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ) : (
            <div className="p-3 border-2 border-dashed border-border rounded-lg bg-muted/20 text-center text-muted-foreground text-xs cursor-pointer hover:bg-muted/40 transition-colors">
              <div>+ Add Class</div>
            </div>
          )}
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {slot ? 'Edit Class' : 'Add New Class'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>Day: <span className="font-medium">{day}</span></div>
            <div>Time: <span className="font-medium">{time}</span></div>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select value={editData.subject} onValueChange={(value) => setEditData(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="teacher">Teacher</Label>
              <Select value={editData.teacher} onValueChange={(value) => setEditData(prev => ({ ...prev, teacher: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map(teacher => (
                    <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="room">Room</Label>
              <Select value={editData.room} onValueChange={(value) => setEditData(prev => ({ ...prev, room: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map(room => (
                    <SelectItem key={room} value={room}>{room}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <div>
              {slot && (
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <X className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={!editData.subject || !editData.teacher || !editData.room}>
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};