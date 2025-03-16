import React, { useState } from 'react';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const Calendar: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const [date, setDate] = useState<Date>();
  
  // Event types
  const eventTypes = [
    { value: 'meeting', label: 'Team Meeting' },
    { value: 'review', label: 'Product Review' },
    { value: 'call', label: 'Client Call' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'deadline', label: 'Deadline' },
    { value: 'social', label: 'Social Event' },
    { value: 'presentation', label: 'Presentation' },
    { value: 'planning', label: 'Planning' },
  ];
  
  // Events data
  const events = [
    { day: 3, title: 'Team Meeting', time: '10:00 AM', type: 'meeting' },
    { day: 7, title: 'Product Review', time: '2:00 PM', type: 'review' },
    { day: 12, title: 'Client Call', time: '11:30 AM', type: 'call' },
    { day: 15, title: 'Workshop', time: '9:00 AM', type: 'workshop' },
    { day: 18, title: 'Deadline', time: '5:00 PM', type: 'deadline' },
    { day: 21, title: 'Team Lunch', time: '12:30 PM', type: 'social' },
    { day: 25, title: 'Presentation', time: '3:00 PM', type: 'presentation' },
    { day: 28, title: 'Planning', time: '10:00 AM', type: 'planning' },
  ];

  const getEventTypeClass = (type: string) => {
    switch(type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'call': return 'bg-green-100 text-green-800';
      case 'workshop': return 'bg-orange-100 text-orange-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      case 'presentation': return 'bg-indigo-100 text-indigo-800';
      case 'planning': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventForDay = (day: number) => {
    return events.find(event => event.day === day);
  };

  const today = new Date().getDate(); // Current day of month

  // Form schema for event creation
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Event title must be at least 2 characters.",
    }),
    type: z.string({
      required_error: "Please select an event type.",
    }),
    date: z.date({
      required_error: "Please select a date for the event.",
    }),
    time: z.string().min(1, {
      message: "Please enter a time for the event.",
    }),
  });

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      time: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically add the event to your events list or make an API call
    console.log(values);
    toast("Event added successfully!", {
      description: `${values.title} scheduled for ${format(values.date, "MMM dd, yyyy")} at ${values.time}`,
    });
    form.reset();
  }

  return (
    <div className="min-h-screen pt-24 px-6 content-section">
      <div className="max-w-4xl mx-auto">
        <div className="mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-primary px-2 py-1 bg-primary/10 rounded-full">
            Schedule
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Calendar</h1>

        {/* Event Creation Form */}
        <div className="glass p-6 md:p-8 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Time</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input 
                            type="time" 
                            placeholder="Select time" 
                            {...field} 
                            className="flex-1"
                          />
                        </FormControl>
                        <Clock className="ml-2 h-4 w-4 text-gray-400" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">Create Event</Button>
            </form>
          </Form>
        </div>

        {/* Calendar View */}
        <div className="glass p-6 md:p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-bold">June 2023</h2>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button className="p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {days.map(day => (
              <div key={day} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {dates.map(date => {
              const event = getEventForDay(date);
              return (
                <div
                  key={date}
                  className={`relative aspect-square p-1 rounded-lg border ${
                    date === today
                      ? 'border-primary ring-1 ring-primary/30'
                      : 'border-transparent hover:border-gray-200'
                  } transition-all duration-200`}
                >
                  <div className="absolute top-1 left-2 text-sm font-medium">
                    {date}
                  </div>
                  {event && (
                    <div className={`absolute bottom-1 left-1 right-1 p-1 text-xs rounded ${getEventTypeClass(event.type)}`}>
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-xs opacity-80">{event.time}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="glass p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {events.slice(0, 4).map((event, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center p-4 rounded-lg border border-gray-100">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getEventTypeClass(event.type)} mr-4`}>
                  {event.day}
                </div>
                <div className="flex-grow mt-2 md:mt-0">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    June {event.day}, {event.time}
                  </p>
                </div>
                <button className="mt-3 md:mt-0 px-3 py-1 text-xs font-medium rounded-full bg-secondary hover:bg-secondary/70 transition-colors duration-200">
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
