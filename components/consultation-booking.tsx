'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { addDays } from 'date-fns';
const router = useRouter();
// Mock data for doctors/practitioners
const practitioners = [
  {
    id: 1,
    name: 'Dr. Anjali Sharma',
    specialty: 'Ayurvedic Physician',
    expertise: ['Vata disorders', 'Panchakarma', 'Rasayana'],
    experience: '15 years',
    rating: 4.9,
    reviews: 124,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    name: 'Dr. Rajesh Patel',
    specialty: 'Ayurvedic Practitioner',
    expertise: ['Pitta disorders', 'Digestive health', 'Herbal medicine'],
    experience: '12 years',
    rating: 4.8,
    reviews: 98,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 3,
    name: 'Dr. Meera Singh',
    specialty: 'Ayurvedic Consultant',
    expertise: ['Kapha disorders', "Women's health", 'Ayurvedic diet'],
    experience: '10 years',
    rating: 4.7,
    reviews: 86,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 4,
    name: 'Dr. Vikram Joshi',
    specialty: 'Ayurvedic Specialist',
    expertise: ['Joint disorders', 'Stress management', 'Detoxification'],
    experience: '18 years',
    rating: 4.9,
    reviews: 145,
    image: '/placeholder.svg?height=100&width=100',
  },
];

// Mock time slots
const timeSlots = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
];

// Mock upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    practitioner: 'Dr. Anjali Sharma',
    date: 'Tomorrow',
    time: '10:30 AM',
    type: 'Video Consultation',
    duration: '30 min',
  },
];

export default function ConsultationBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState('video');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleBookAppointment = () => {
    setIsConfirmationOpen(true);
    router.push('/RTC_testing');
  };

  return (
    <div className='space-y-6 text-white'>
      <Tabs defaultValue='book' className='space-y-4'>
        <TabsList className='bg-slate-800 border border-slate-700'>
          <TabsTrigger
            value='book'
            className='data-[state=active]:bg-slate-700 data-[state=active]:text-white'
          >
            Book Consultation
          </TabsTrigger>
          <TabsTrigger
            value='upcoming'
            className='data-[state=active]:bg-slate-700 data-[state=active]:text-white'
          >
            Upcoming Appointments
          </TabsTrigger>
          <TabsTrigger
            value='past'
            className='data-[state=active]:bg-slate-700 data-[state=active]:text-white'
          >
            Past Consultations
          </TabsTrigger>
        </TabsList>

        <TabsContent value='book' className='space-y-4'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2'>
              <Card className='bg-slate-800/60 border-slate-700'>
                <CardHeader>
                  <CardTitle>Select a Practitioner</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {practitioners.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={`flex flex-col md:flex-row gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedDoctor === doctor.id
                          ? 'bg-slate-700'
                          : 'bg-slate-800 hover:bg-slate-700/70'
                      }`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <Avatar className='h-16 w-16'>
                        <AvatarImage src={doctor.image} />
                        <AvatarFallback className='bg-emerald-800 text-emerald-100'>
                          {doctor.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className='space-y-2 flex-1'>
                        <div className='flex flex-wrap justify-between'>
                          <div>
                            <h3 className='font-semibold text-lg'>
                              {doctor.name}
                            </h3>
                            <p className='text-sm text-slate-400'>
                              {doctor.specialty}
                            </p>
                          </div>
                          <div className='text-right'>
                            <div className='flex items-center justify-end'>
                              <span className='text-amber-400'>★</span>
                              <span className='ml-1 font-medium'>
                                {doctor.rating}
                              </span>
                              <span className='text-sm text-slate-400 ml-1'>
                                ({doctor.reviews} reviews)
                              </span>
                            </div>
                            <p className='text-sm text-slate-400'>
                              {doctor.experience} experience
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {doctor.expertise.map((item, index) => (
                            <Badge
                              key={index}
                              variant='outline'
                              className='bg-slate-700/50 hover:bg-slate-700/70 text-emerald-300 border-emerald-800'
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className='bg-slate-800/60 border-slate-700'>
                <CardHeader>
                  <CardTitle>Schedule Appointment</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='font-medium'>Consultation Type</div>
                    <Select
                      value={consultationType}
                      onValueChange={setConsultationType}
                    >
                      <SelectTrigger className='bg-slate-900 border-slate-700'>
                        <SelectValue placeholder='Select type' />
                      </SelectTrigger>
                      <SelectContent className='bg-slate-800 border-slate-700 text-white'>
                        <SelectItem value='video'>
                          Video Consultation
                        </SelectItem>
                        <SelectItem value='voice'>Voice Call</SelectItem>
                        <SelectItem value='in-person'>
                          In-Person Visit
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <div className='font-medium'>Select Date</div>
                    <Calendar
                      mode='single'
                      selected={date}
                      onSelect={setDate}
                      className='bg-slate-800 text-white border border-slate-700 rounded-md'
                      disabled={(date) =>
                        date < new Date() || date > addDays(new Date(), 30)
                      }
                    />
                  </div>

                  {date && (
                    <div className='space-y-2'>
                      <div className='font-medium'>Available Time Slots</div>
                      <div className='grid grid-cols-3 gap-2'>
                        {timeSlots.map((time, index) => (
                          <Button
                            key={index}
                            variant={
                              selectedTimeSlot === time ? 'default' : 'outline'
                            }
                            className={
                              selectedTimeSlot === time
                                ? 'bg-emerald-500 hover:bg-emerald-600'
                                : 'hover:bg-slate-700 border-slate-700'
                            }
                            onClick={() => setSelectedTimeSlot(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    className='w-full mt-4 bg-emerald-500 hover:bg-emerald-600'
                    disabled={!selectedDoctor || !date || !selectedTimeSlot}
                    onClick={handleBookAppointment}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value='upcoming'>
          <Card className='bg-slate-800/60 border-slate-700'>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className='space-y-4'>
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className='flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-slate-700 rounded-lg'
                    >
                      <div className='space-y-1 text-center md:text-left'>
                        <h3 className='font-semibold'>
                          {appointment.practitioner}
                        </h3>
                        <div className='text-sm text-slate-400'>
                          {appointment.type} • {appointment.duration}
                        </div>
                        <div className='text-sm font-medium'>
                          {appointment.date} at {appointment.time}
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          className='border-slate-600 hover:bg-slate-600 hover:text-white'
                        >
                          Reschedule
                        </Button>
                        <Button className='bg-emerald-500 hover:bg-emerald-600'>
                          Join Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-12'>
                  <p className='text-slate-400'>No upcoming appointments</p>
                  <Button
                    variant='link'
                    className='text-emerald-400 hover:text-emerald-300 mt-2'
                    onClick={() =>
                      document.querySelector('[data-value="book"]')?.click()
                    }
                  >
                    Book a consultation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='past'>
          <Card className='bg-slate-800/60 border-slate-700'>
            <CardHeader>
              <CardTitle>Past Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-center py-12'>
                <p className='text-slate-400'>No past consultations found</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className='bg-slate-800 border-slate-700 text-white'>
          <DialogHeader>
            <DialogTitle>Confirm Your Appointment</DialogTitle>
            <DialogDescription className='text-slate-400'>
              Please review your appointment details below.
            </DialogDescription>
          </DialogHeader>

          {selectedDoctor && date && selectedTimeSlot && (
            <div className='space-y-4 py-4'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-14 w-14'>
                  <AvatarImage
                    src={
                      practitioners.find((d) => d.id === selectedDoctor)?.image
                    }
                  />
                  <AvatarFallback className='bg-emerald-800 text-emerald-100'>
                    {practitioners
                      .find((d) => d.id === selectedDoctor)
                      ?.name.split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-semibold text-lg'>
                    {practitioners.find((d) => d.id === selectedDoctor)?.name}
                  </h3>
                  <p className='text-sm text-slate-400'>
                    {
                      practitioners.find((d) => d.id === selectedDoctor)
                        ?.specialty
                    }
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 pt-4 border-t border-slate-700'>
                <div>
                  <p className='text-sm text-slate-400'>Date</p>
                  <p className='font-medium'>{date.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className='text-sm text-slate-400'>Time</p>
                  <p className='font-medium'>{selectedTimeSlot}</p>
                </div>
                <div>
                  <p className='text-sm text-slate-400'>Type</p>
                  <p className='font-medium'>
                    {consultationType === 'video'
                      ? 'Video Consultation'
                      : consultationType === 'voice'
                      ? 'Voice Call'
                      : 'In-Person Visit'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-slate-400'>Duration</p>
                  <p className='font-medium'>30 minutes</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsConfirmationOpen(false)}
              className='border-slate-700 hover:bg-slate-700'
            >
              Cancel
            </Button>
            <Button
              className='bg-emerald-500 hover:bg-emerald-600'
              onClick={() => setIsConfirmationOpen(false)}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
