
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { User, UserRound, Mail, MapPin, Calendar, Briefcase } from 'lucide-react';

interface MemberProps {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
  email: string;
  location: string;
  joinedDate: string;
  bio: string;
  department: string;
  status: 'online' | 'offline' | 'away';
}

const members: MemberProps[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Product Designer",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400",
    initials: "AM",
    email: "alex.morgan@example.com",
    location: "San Francisco, CA",
    joinedDate: "Joined March 2023",
    bio: "UI/UX enthusiast with a passion for accessible design systems",
    department: "Design",
    status: "online"
  },
  {
    id: 2,
    name: "Jordan Lee",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=400",
    initials: "JL",
    email: "jordan.lee@example.com",
    location: "Berlin, Germany",
    joinedDate: "Joined January 2022",
    bio: "React and TypeScript expert, loves creating smooth user experiences",
    department: "Engineering",
    status: "online"
  },
  {
    id: 3,
    name: "Taylor Kim",
    role: "Product Manager",
    initials: "TK",
    email: "taylor.kim@example.com",
    location: "New York, NY",
    joinedDate: "Joined August 2021",
    bio: "Focused on bringing products from concept to market with user-centric approach",
    department: "Product",
    status: "away"
  },
  {
    id: 4,
    name: "Riley Singh",
    role: "Backend Engineer",
    avatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400",
    initials: "RS",
    email: "riley.singh@example.com",
    location: "Toronto, Canada",
    joinedDate: "Joined October 2022",
    bio: "Cloud infrastructure expert specializing in serverless architectures",
    department: "Engineering",
    status: "offline"
  }
];

const MemberCard: React.FC<{ member: MemberProps }> = ({ member }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="p-4 pb-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                  {member.avatar ? (
                    <AvatarImage src={member.avatar} alt={member.name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {member.initials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span 
                  className={`absolute -right-1 -bottom-1 block h-3.5 w-3.5 rounded-full border-2 border-white
                    ${member.status === 'online' ? 'bg-green-500' : 
                      member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'}`}
                />
              </div>
              <div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <Briefcase size={14} className="text-muted-foreground" />
                  <span>{member.role}</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{member.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{member.joinedDate}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center">
            <span className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">
              {member.department}
            </span>
          </CardFooter>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{member.name}</h4>
          <p className="text-sm text-muted-foreground">{member.bio}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const Members: React.FC = () => {
  return (
    <div className="container py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Our amazing team building the future together
        </p>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Members;
