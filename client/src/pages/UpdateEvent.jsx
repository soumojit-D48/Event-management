



// import { useEffect, useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { toast } from "sonner";
// import { Plus, Trash2 } from "lucide-react";
// import { useGetEventByIdQuery, useUpdateEventMutation } from "@/state/api";

// // import { useNavigate } from "react-router-dom";

// import { eventSchema} from "@/lib/schemas";
// import { useParams } from "react-router-dom";



// export default function UpdateEvent() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { eventId } = useParams(); 

//   // ✅ Fetch event by ID
//   const { data: eventData, isLoading } = useGetEventByIdQuery(eventId, {
//     skip: !eventId,
//   });

//   if(eventData && eventData.event){ 
//     event = eventData.event
//   }

//   const [updateEvent] = useUpdateEventMutation();

//   // ✅ Initialize form
//   const form = useForm({
//     resolver: zodResolver(eventSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       venue: "",
//       startDate: "",
//       endDate: "",
//       maxParticipants: 0,
//       sessions: [],
//     },
//   });

//   // ✅ For dynamic sessions
//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: "sessions",
//   });

//   // ✅ Set form values after fetching event
//   useEffect(() => {
//     if (event) {
//         console.log(event, "shdbadhbsabhja");
//       form.reset({
//         title: event.title ,
//         description: event.description || "",
//         venue: event.venue || "",
//         startDate: event.startDate
//           ? new Date(event.startDate).toISOString().slice(0, 16)
//           : "",
//         endDate: event.endDate
//           ? new Date(event.endDate).toISOString().slice(0, 16)
//           : "",
//         maxParticipants: event.maxParticipants || 0,
//         sessions:
//           event.sessions?.map((s) => ({
//             title: s.title || "",
//             speaker: s.speaker || "",
//             startTime: s.startTime
//               ? new Date(s.startTime).toISOString().slice(0, 16)
//               : "",
//             endTime: s.endTime
//               ? new Date(s.endTime).toISOString().slice(0, 16)
//               : "",
//           })) || [],
//       });
//     }
//   }, [event, form]);

//   // ✅ Add new session
//   const addSession = () => {
//     append({
//       title: "",
//       speaker: "",
//       startTime: "",
//       endTime: "",
//     });
//   };

//   // ✅ Handle update submit
//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);

//       const formattedData = {
//         ...data,
//         maxParticipants: Number(data.maxParticipants),
//         sessions: data.sessions.map((s) => ({
//           ...s,
//           startTime: new Date(s.startTime),
//           endTime: new Date(s.endTime),
//         })),
//         startDate: new Date(data.startDate),
//         endDate: new Date(data.endDate),
//       };

//       const res = await updateEvent({
//         eventId,
//         eventData: formattedData,
//       }).unwrap();

//       toast.success("✅ Event updated successfully!");
//     } catch (err) {
//       console.error(err);
//       toast.error(err?.data?.message || "Failed to update event");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow">
//       <div className="text-center space-y-1">
//         <h1 className="text-3xl font-bold">Update Event</h1>
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

//           {/* Date Fields in Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Start Date */}
//             <FormField
//               control={form.control}
//               name="startDate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Start Date</FormLabel>
//                   <FormControl>
//                     <Input type="datetime-local" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* End Date (optional) */}
//             <FormField
//               control={form.control}
//               name="endDate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>End Date (Optional)</FormLabel>
//                   <FormControl>
//                     <Input type="datetime-local" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Max Participants */}
//           <FormField
//             control={form.control}
//             name="maxParticipants"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Max Participants</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     placeholder="e.g. 100"
//                     {...field}
//                     onChange={(e) => field.onChange(Number(e.target.value))}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Sessions Section */}
//           <div className="space-y-4 pt-4 border-t">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold">Sessions</h3>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={addSession}
//                 className="gap-2"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Session
//               </Button>
//             </div>

//             {fields.length === 0 && (
//               <p className="text-sm text-gray-500 text-center py-4">
//                 No sessions added yet. Click "Add Session" to get started.
//               </p>
//             )}

//             {fields.map((field, index) => (
//               <div
//                 key={field.id}
//                 className="p-4 border rounded-lg space-y-3 bg-gray-50"
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="font-medium text-sm">Session {index + 1}</h4>
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => remove(index)}
//                     className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name={`sessions.${index}.title`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Session Title</FormLabel>
//                       <FormControl>
//                         <Input placeholder="AI Workshop" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name={`sessions.${index}.speaker`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Speaker</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Dr. Smith" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name={`sessions.${index}.startTime`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Start Time</FormLabel>
//                       <FormControl>
//                         <Input type="datetime-local" placeholder="10:00 AM" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name={`sessions.${index}.endTime`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>End Time</FormLabel>
//                       <FormControl>
//                         <Input type="datetime-local" placeholder="12:00 AM" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Submit */}
//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Creating..." : "Create Event"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
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
import { useGetEventByIdQuery, useUpdateEventMutation } from "@/state/api";
import { eventSchema } from "@/lib/schemas";
import { useParams } from "react-router-dom";

export default function UpdateEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { eventId } = useParams();

  // ✅ Fetch event by ID
  const { data: eventData, isLoading } = useGetEventByIdQuery(eventId, {
    skip: !eventId,
  });

  const event = eventData?.event;
  const [updateEvent] = useUpdateEventMutation();

  // ✅ Initialize form
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

  // ✅ For dynamic sessions
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sessions",
  });

  // ✅ Set form values after fetching event
  useEffect(() => {
    if (event) {
      console.log(event, "shdbadhbsabhja");
      form.reset({
        title: event.title,
        description: event.description || "",
        venue: event.venue || "",
        startDate: event.startDate
          ? new Date(event.startDate).toISOString().slice(0, 16)
          : "",
        endDate: event.endDate
          ? new Date(event.endDate).toISOString().slice(0, 16)
          : "",
        maxParticipants: event.maxParticipants || 0,
        banner: undefined, // Don't set file, just leave empty
        sessions:
          event.sessions?.map((s) => ({
            title: s.title || "",
            speaker: s.speaker || "",
            startTime: s.startTime
              ? new Date(s.startTime).toISOString().slice(0, 16)
              : "",
            endTime: s.endTime
              ? new Date(s.endTime).toISOString().slice(0, 16)
              : "",
          })) || [],
      });
    }
  }, [event, form]);

  // ✅ Add new session
  const addSession = () => {
    append({
      title: "",
      speaker: "",
      startTime: "",
      endTime: "",
    });
  };

  // ✅ Handle update submit
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

      // Append banner file if user selected a new one
      if (data.banner) {
        formData.append('banner', data.banner);
      }

      // Append sessions
      if (data.sessions && data.sessions.length > 0) {
        formData.append('sessions', JSON.stringify(data.sessions));
      }

      const res = await updateEvent({
        eventId,
        eventData: formData,
      }).unwrap();

      toast.success("✅ Event updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p>Loading event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p>Event not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold">Update Event</h1>
        <p className="text-gray-600">Edit the details below</p>
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

          {/* Current Banner Display */}
          {event.bannerUrl && (
            <div className="space-y-2">
              <FormLabel>Current Banner</FormLabel>
              <img 
                src={event.bannerUrl} 
                alt="Current banner" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Upload New Banner */}
          <FormField
            control={form.control}
            name="banner"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Update Banner (Optional)</FormLabel>
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
            {isSubmitting ? "Updating..." : "Update Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
