import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Users, BookOpen, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ResourceManagerProps {
  subjects: string[];
  teachers: string[];
  rooms: string[];
  onUpdateSubjects: (subjects: string[]) => void;
  onUpdateTeachers: (teachers: string[]) => void;
  onUpdateRooms: (rooms: string[]) => void;
}

export const ResourceManager = ({
  subjects,
  teachers,
  rooms,
  onUpdateSubjects,
  onUpdateTeachers,
  onUpdateRooms
}: ResourceManagerProps) => {
  const [newSubject, setNewSubject] = useState('');
  const [newTeacher, setNewTeacher] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<string | null>(null);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const { toast } = useToast();

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      onUpdateSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
      toast({ title: "Success", description: "Subject added successfully" });
    }
  };

  const addTeacher = () => {
    if (newTeacher.trim() && !teachers.includes(newTeacher.trim())) {
      onUpdateTeachers([...teachers, newTeacher.trim()]);
      setNewTeacher('');
      toast({ title: "Success", description: "Teacher added successfully" });
    }
  };

  const addRoom = () => {
    if (newRoom.trim() && !rooms.includes(newRoom.trim())) {
      onUpdateRooms([...rooms, newRoom.trim()]);
      setNewRoom('');
      toast({ title: "Success", description: "Room added successfully" });
    }
  };

  const deleteSubject = (subject: string) => {
    onUpdateSubjects(subjects.filter(s => s !== subject));
    toast({ title: "Success", description: "Subject removed successfully" });
  };

  const deleteTeacher = (teacher: string) => {
    onUpdateTeachers(teachers.filter(t => t !== teacher));
    toast({ title: "Success", description: "Teacher removed successfully" });
  };

  const deleteRoom = (room: string) => {
    onUpdateRooms(rooms.filter(r => r !== room));
    toast({ title: "Success", description: "Room removed successfully" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          Manage Resources
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Timetable Resources</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Subjects Section */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Subjects</h3>
            </div>
            
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Add new subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSubject()}
              />
              <Button onClick={addSubject} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {subjects.map(subject => (
                <Badge key={subject} variant="secondary" className="flex items-center gap-1">
                  {subject}
                  <button
                    onClick={() => deleteSubject(subject)}
                    className="ml-1 hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </Card>

          {/* Teachers Section */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold">Teachers</h3>
            </div>
            
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Add new teacher"
                value={newTeacher}
                onChange={(e) => setNewTeacher(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTeacher()}
              />
              <Button onClick={addTeacher} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {teachers.map(teacher => (
                <Badge key={teacher} variant="secondary" className="flex items-center gap-1">
                  {teacher}
                  <button
                    onClick={() => deleteTeacher(teacher)}
                    className="ml-1 hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </Card>

          {/* Rooms Section */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Rooms</h3>
            </div>
            
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Add new room"
                value={newRoom}
                onChange={(e) => setNewRoom(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addRoom()}
              />
              <Button onClick={addRoom} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {rooms.map(room => (
                <Badge key={room} variant="secondary" className="flex items-center gap-1">
                  {room}
                  <button
                    onClick={() => deleteRoom(room)}
                    className="ml-1 hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};