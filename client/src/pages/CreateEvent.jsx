// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { eventSchema } from "@/lib/schemas"; // import from the schema we made
// import { useCreateEventMutation } from "@/state/api"; // RTK Query endpoint
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";

// export default function CreateEventForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [createEvent] = useCreateEventMutation();

//   const form = useForm({
//     resolver: zodResolver(eventSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       venue: "",
//       startDate: "",
//       endDate: "",
//       bannerUrl: "",
//       maxParticipants: 0,
//       sessions: [],
//     },
//   });

//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);
//       // Convert date strings to ISO format (for Mongo)
//       const formattedData = {
//         ...data,
//         // startDate: new Date(data.startDate).toISOString(),
//         // endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
//         // maxParticipants: Number(data.maxParticipants),
//       };

//       console.log(formattedData, "dataaa");

//       const res = await createEvent(formattedData).unwrap();
//       toast.success("✅ Event created successfully!");
//       form.reset();
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.data?.message || "Failed to create event");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow">
//       <div className="text-center space-y-1">
//         <h1 className="text-3xl font-bold">Create New Event</h1>
//         <p className="text-gray-600">Fill out the details below</p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* Title */}
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Tech Fest 2025" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Description */}
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Describe the event in detail..."
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Venue */}
//           <FormField
//             control={form.control}
//             name="venue"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Venue</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Auditorium A, Campus" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Start Date */}
//           <FormField
//             control={form.control}
//             name="startDate"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Start Date</FormLabel>
//                 <FormControl>
//                   <Input type="date" {...field} />
//                 </FormControl>
//                 {/* <FormControl>
//                   <Input placeholder="Tech Fest 2025" {...field} />
//                 </FormControl> */}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* End Date (optional) */}
//           <FormField
//             control={form.control}
//             name="endDate"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>End Date (Optional)</FormLabel>
//                 <FormControl>
//                   <Input type="date" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Banner URL */}
//           {/* <FormField
//             control={form.control}
//             name="bannerUrl"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Banner URL</FormLabel>
//                 <FormControl>
//                   <Input placeholder="https://example.com/banner.jpg" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           /> */}

//           {/* Max Participants */}
//           <FormField
//             control={form.control}
//             name="maxParticipants"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Max Participants</FormLabel>
//                 <FormControl>
//                   <Input type="number" placeholder="e.g. 100" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Submit */}
//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Creating..." : "Create Event"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }

/*
<Card className="shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Sessions</CardTitle>
                <Button
                  type="button"
                  onClick={addSession}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Session
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {fields.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No sessions added yet. Click "Add Session" to get started.
                </p>
              ) : (
                fields.map((field, index) => (
                  <Card key={field.id} className="border-2 border-muted">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Session Title</Label>
                              <Input
                                {...register(`sessions.${index}.title`)}
                                placeholder="Keynote Speech"
                              />
                            </div>
                            <div>
                              <Label>Speaker</Label>
                              <Input
                                {...register(`sessions.${index}.speaker`)}
                                placeholder="Dr. John Doe"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Start Time</Label>
                              <Input
                                {...register(`sessions.${index}.startTime`)}
                                type="time"
                              />
                            </div>
                            <div>
                              <Label>End Time</Label>
                              <Input
                                {...register(`sessions.${index}.endTime`)}
                                type="time"
                              />
                            </div>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSession(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
*/




import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { useCreateEventMutation } from "@/state/api";

// import { useNavigate } from "react-router-dom";

import { eventSchema } from "@/lib/schemas";

export default function CreateEventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createEvent] = useCreateEventMutation();

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      startDate: "",
      endDate: "",
      maxParticipants: 0,
      banner: undefined,
      sessions: [],
    },
  });

  // Field array for sessions
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sessions",
  });

 

const onSubmit = async (data) => {
  try {
    setIsSubmitting(true);

    // Create FormData
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('venue', data.venue);
    formData.append('startDate', data.startDate);
    
    if (data.endDate) {
      formData.append('endDate', data.endDate);
    }
    
    formData.append('maxParticipants', data.maxParticipants.toString());
    
    // Append banner file
    if (data.banner) {
      formData.append('banner', data.banner);
    }
    
    // Append sessions
    if (data.sessions && data.sessions.length > 0) {
      formData.append('sessions', JSON.stringify(data.sessions));
    }

    const res = await createEvent(formData).unwrap();
    toast.success("✅ Event created successfully!");
    form.reset();
  } catch (err) {
    console.error(err);
    toast.error(err?.data?.message || "Failed to create event");
  } finally {
    setIsSubmitting(false);
  }
};

  const addSession = () => {
    append({
      title: "",
      speaker: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-gray-600">Fill out the details below</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Tech Fest 2025" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the event in detail..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Venue */}
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input placeholder="Auditorium A, Campus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Fields in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date (optional) */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date (Optional)</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Max Participants */}
          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Participants</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="e.g. 100"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Banner</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files[0])} // 👈 set the file in form
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}


          <FormField
  control={form.control}
  name="banner"
  render={({ field: { onChange, value, ...field } }) => (
    <FormItem>
      <FormLabel>Event Banner</FormLabel>
      <FormControl>
        <Input
          {...field}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onChange(file);
            }
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

          {/* Sessions Section */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sessions</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSession}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Session
              </Button>
            </div>

            {fields.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No sessions added yet. Click "Add Session" to get started.
              </p>
            )}

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border rounded-lg space-y-3 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Session {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`sessions.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Title</FormLabel>
                      <FormControl>
                        <Input placeholder="AI Workshop" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sessions.${index}.speaker`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Speaker</FormLabel>
                      <FormControl>
                        <Input placeholder="Dr. Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sessions.${index}.startTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          placeholder="10:00 AM"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`sessions.${index}.endTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          placeholder="12:00 AM"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
}




