'use client';

export const dynamic = 'force-dynamic';

import { createClient } from '@/lib/supabase/client';
import { getCurrentUserWithRole } from '@/lib/supabase/profile';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  Calendar, 
  ClipboardList, 
  Image as ImageIcon, 
  Settings, 
  Edit, 
  Trash2, 
  ExternalLink,
  Save,
  X,
  CheckCircle2,
  Clock,
  User,
  Phone,
  Mail,
  PlusCircle,
  LogOut,
  Loader2,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Pagination state
  const [bookingsPage, setBookingsPage] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const bookingsPerPage = 10;
  
  // Rescheduling state
  const [reschedulingBooking, setReschedulingBooking] = useState<any>(null);
  
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
        const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
        const userEmail = user.email?.toLowerCase();
        
        if (!userEmail || !adminEmails.includes(userEmail)) {
          toast({
            title: 'Access Denied',
            description: 'You do not have permission to view the dashboard.',
            variant: 'destructive',
          });
          router.push('/login');
          return;
        }
        await Promise.all([fetchServices(), fetchBookings(1), fetchGalleryImages()]);
        setIsLoading(false);
      }
    };
    checkUser();
  }, [supabase, router]);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setServices(data);
    }
  };

  const fetchBookings = async (page: number = bookingsPage) => {
    const from = (page - 1) * bookingsPerPage;
    const to = from + bookingsPerPage - 1;

    const { data, error, count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (!error && data) {
      setBookings(data);
      if (count !== null) setTotalBookings(count);
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (!error) {
      toast({ title: 'Success', description: `Booking ${status}ed successfully!` });
      fetchBookings();
    } else {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleRescheduleBooking = async () => {
    if (reschedulingBooking) {
      const { error } = await supabase
        .from('bookings')
        .update({
          date: reschedulingBooking.date,
          time: reschedulingBooking.time,
          status: 'rescheduled'
        })
        .eq('id', reschedulingBooking.id);

      if (!error) {
        toast({ title: 'Success', description: 'Booking rescheduled successfully!' });
        fetchBookings();
        setReschedulingBooking(null);
      } else {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
    }
  };

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setGalleryImages(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  // New service state
  const [newService, setNewService] = useState({
    title: '',
    price: '',
    short_description: '',
    duration: '',
  });

  const handleAddService = async () => {
    if (newService.title && newService.price) {
      const { error } = await supabase
        .from('services')
        .insert([newService]);

      if (!error) {
        toast({ title: 'Success', description: 'Service added successfully!' });
        fetchServices();
        setNewService({ title: '', price: '', short_description: '', duration: '' });
        setIsAddingService(false);
      } else {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
    }
  };

  const handleUpdateService = async () => {
    if (editingService) {
      const { error } = await supabase
        .from('services')
        .update({
          title: editingService.title,
          price: editingService.price,
          short_description: editingService.short_description,
          duration: editingService.duration,
        })
        .eq('id', editingService.id);

      if (!error) {
        toast({ title: 'Success', description: 'Service updated successfully!' });
        fetchServices();
        setEditingService(null);
      } else {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
    }
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (!error) {
        toast({ title: 'Success', description: 'Service deleted successfully!' });
        fetchServices();
      } else {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: 'Error', description: uploadError.message, variant: 'destructive' });
      setIsUploading(false);
      return;
    }

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    // 3. Save to Database
    const { error: dbError } = await supabase
      .from('gallery_images')
      .insert([{ url: publicUrl }]);

    if (dbError) {
      toast({ title: 'Error', description: dbError.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Image uploaded to gallery!' });
      fetchGalleryImages();
    }
    setIsUploading(false);
  };

  const handleDeleteImage = async (id: string, url: string) => {
    if (confirm('Delete this image?')) {
      // Extract file path from URL
      const pathParts = url.split('/storage/v1/object/public/gallery/');
      const filePath = pathParts[1];

      if (filePath) {
        await supabase.storage.from('gallery').remove([filePath]);
      }

      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (!error) {
        toast({ title: 'Success', description: 'Image removed.' });
        fetchGalleryImages();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dashboard Header */}
      <header className="bg-background border-b px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="bg-primary/10 p-2 rounded-lg shrink-0">
            <LayoutGrid className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-bold truncate">Dashboard</h1>
            <p className="text-[10px] md:text-xs text-muted-foreground truncate hidden sm:block">Manage services and bookings</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2">
          <Button variant="outline" size="sm" onClick={handleLogout} className="h-8 md:h-9 px-2 md:px-3">
            <LogOut className="h-4 w-4 md:mr-2" /> 
            <span className="hidden md:inline">Logout</span>
          </Button>
          <Button variant="outline" size="sm" asChild className="h-8 md:h-9 px-2 md:px-3 hidden xs:flex sm:flex">
            <a href="/" target="_blank">
              <span className="hidden md:inline">View Site</span> <ExternalLink className="h-4 w-4 md:ml-2" />
            </a>
          </Button>
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0 ml-1">
            {user?.email?.substring(0, 2).toUpperCase() || 'AD'}
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <Tabs defaultValue="services" className="space-y-6">
          <div className="overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
            <TabsList className="flex w-max min-w-full lg:w-[600px] h-10">
              <TabsTrigger value="services" className="px-6 flex-1">Services</TabsTrigger>
              <TabsTrigger value="bookings" className="px-6 flex-1">Bookings</TabsTrigger>
              <TabsTrigger value="gallery" className="px-6 flex-1">Gallery</TabsTrigger>
            </TabsList>
          </div>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search services..." className="pl-9" />
              </div>
              <Button onClick={() => setIsAddingService(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Service
              </Button>
            </div>

            {isAddingService && (
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle>Add New Service</CardTitle>
                  <CardDescription>Fill in the details to add a new service to your clinic.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service Title</label>
                    <Input 
                      placeholder="e.g. Laser Whitening" 
                      value={newService.title}
                      onChange={(e) => setNewService({...newService, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price (₦)</label>
                    <Input 
                      placeholder="e.g. ₦45,000" 
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Short Description</label>
                    <Input 
                      placeholder="Brief summary of the service" 
                      value={newService.short_description}
                      onChange={(e) => setNewService({...newService, short_description: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <Input 
                      placeholder="e.g. 1-2 hours" 
                      value={newService.duration}
                      onChange={(e) => setNewService({...newService, duration: e.target.value})}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t pt-4">
                  <Button variant="ghost" onClick={() => setIsAddingService(false)}>Cancel</Button>
                  <Button onClick={handleAddService}>Save Service</Button>
                </CardFooter>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={service.id || index} className="flex flex-col group">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {service.price}
                      </Badge>
                    </div>
                    <CardDescription>{service.duration}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {service.short_description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 border-t pt-4 bg-muted/20 group-hover:bg-muted/50 transition-colors">
                    <Button variant="ghost" size="sm" onClick={() => setEditingService(service)}>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDeleteService(service.id)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader className="px-4 md:px-6">
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>View and manage appointment requests from your website.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="overflow-x-auto">
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.length > 0 ? bookings.map((booking, i) => (
                      <TableRow key={booking.id || i}>
                        <TableCell>
                          <div className="font-medium">{booking.customer_name}</div>
                          <div className="text-xs text-muted-foreground">{booking.customer_email}</div>
                        </TableCell>
                        <TableCell>{booking.service_title}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                            <span className="text-xs text-muted-foreground">{booking.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={booking.status === 'confirmed' ? 'default' : booking.status === 'rejected' ? 'destructive' : 'secondary'} 
                            className={booking.status === 'confirmed' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')}
                                >
                                  Accept
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-destructive border-destructive/20 hover:bg-destructive/10"
                                  onClick={() => handleUpdateBookingStatus(booking.id, 'rejected')}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => setReschedulingBooking({ ...booking })}
                            >
                              <Calendar className="h-4 w-4 mr-1" /> Reschedule
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                          No bookings found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

                {/* Pagination UI */}
                {totalBookings > bookingsPerPage && (
                  <div className="flex items-center justify-between mt-6 px-2">
                    <p className="text-sm text-muted-foreground">
                      Showing {Math.min(totalBookings, (bookingsPage - 1) * bookingsPerPage + 1)} to {Math.min(totalBookings, bookingsPage * bookingsPerPage)} of {totalBookings} bookings
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={bookingsPage === 1}
                        onClick={() => {
                          const newPage = bookingsPage - 1;
                          setBookingsPage(newPage);
                          fetchBookings(newPage);
                        }}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={bookingsPage * bookingsPerPage >= totalBookings}
                        onClick={() => {
                          const newPage = bookingsPage + 1;
                          setBookingsPage(newPage);
                          fetchBookings(newPage);
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Transformations Gallery</h2>
              <div className="flex items-center gap-2">
                {isUploading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                <Button variant="default" className="relative" disabled={isUploading}>
                  <Upload className="mr-2 h-4 w-4" /> 
                  {isUploading ? 'Uploading...' : 'Upload New Image'}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                    accept="image/*"
                    disabled={isUploading}
                  />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {galleryImages.length > 0 ? galleryImages.map((img) => (
                <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden border shadow-sm">
                  <img 
                    src={img.url} 
                    alt="Gallery item" 
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      className="h-8 w-8 rounded-full shadow-lg"
                      onClick={() => handleDeleteImage(img.id, img.url)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Mobile delete button */}
                  <div className="absolute top-2 right-2 md:hidden">
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      className="h-7 w-7 rounded-full bg-red-500/80 backdrop-blur-sm"
                      onClick={() => handleDeleteImage(img.id, img.url)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl bg-muted/20">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No images in gallery yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Service Dialog */}
      {editingService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Edit Service</CardTitle>
                <CardDescription>Modify details for {editingService.title}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setEditingService(null)}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Title</label>
                <Input 
                  value={editingService.title}
                  onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price (₦)</label>
                <Input 
                  value={editingService.price}
                  onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">Short Description</label>
                <Input 
                  value={editingService.short_description || ''}
                  onChange={(e) => setEditingService({...editingService, short_description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Input 
                  value={editingService.duration}
                  onChange={(e) => setEditingService({...editingService, duration: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="ghost" onClick={() => setEditingService(null)}>Cancel</Button>
              <Button onClick={handleUpdateService}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Reschedule Booking Dialog */}
      {reschedulingBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Reschedule Appointment</CardTitle>
                <CardDescription>Update the date and time for {reschedulingBooking.customer_name}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setReschedulingBooking(null)}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Date</label>
                <Input 
                  type="date"
                  value={reschedulingBooking.date}
                  onChange={(e) => setReschedulingBooking({...reschedulingBooking, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Time</label>
                <Input 
                  placeholder="e.g. 10:00 AM"
                  value={reschedulingBooking.time}
                  onChange={(e) => setReschedulingBooking({...reschedulingBooking, time: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
              <Button variant="ghost" onClick={() => setReschedulingBooking(null)}>Cancel</Button>
              <Button onClick={handleRescheduleBooking}>
                <Save className="mr-2 h-4 w-4" /> Update Schedule
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
