



// import React, { useState, useEffect } from 'react';
// import { Star, Users, TrendingUp, BarChart3, MessageSquare, Download, AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useParams } from 'react-router-dom';
// import {
//   useCheckFeedbackEligibilityQuery,
//   useSubmitFeedbackMutation,
//   useGetEventFeedbackQuery,
//   useDownloadFeedbackPDFQuery,
//   useIsAuthQuery
// } from '@/state/api'; 

// export default function FeedbackPage() {
//   const { eventId } = useParams(); 
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comments, setComments] = useState('');
//   const [activeTab, setActiveTab] = useState('submit');
//   const [message, setMessage] = useState({ type: '', text: '' });

//   // Get current user info
//   const { data: authData, isLoading: authLoading } = useIsAuthQuery();
//   const userRole = authData?.user?.role || 'participant';
//   const isOrganizer = ['organizer', 'faculty', 'volunteer'].includes(userRole);

//   // Fetch eligibility
//   const { data: eligibilityData, isLoading: eligibilityLoading } = useCheckFeedbackEligibilityQuery(eventId, {
//     skip: !eventId, // Skip if no eventId
//   });

//   console.log(eligibilityData, "edhhdkjh");
  

//   // Fetch event feedback (only for organizers)
//   const { data: feedbackData1, isLoading: feedbackLoading } = useGetEventFeedbackQuery(eventId, {
//     skip: !eventId || !isOrganizer, // Skip if no eventId or not organizer
//   });

//   const feedbackData = feedbackData1?.data

//   // console.log(feedbackData, "dsjhk");
//   // console.log(feedbackData?.event, "dsjhk");
//   // console.log(feedbackData?.stats, "dsjhk");
//   // console.log(feedbackData?.feedbacks, "dsjhk");
  

//   // Submit feedback mutation
//   const [submitFeedback, { isLoading: submitLoading }] = useSubmitFeedbackMutation();

//   // Download PDF mutation
// //   const [downloadPDF, { isLoading: downloadLoading }] = useDownloadFeedbackPDFQuery();

//   const handleSubmitFeedback = async () => {
//     if (!rating) {
//       setMessage({ type: 'error', text: 'Please select a rating' });
//       return;
//     }

//     try {
//       const response = await submitFeedback({
//         eventId,
//         data: { rating, comments }
//       }).unwrap();

//       setMessage({ type: 'success', text: response.message || 'Feedback submitted successfully!' });
//       setRating(0);
//       setComments('');

//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//     } catch (error) {
//       setMessage({ 
//         type: 'error', 
//         text: error?.data?.message || 'Error submitting feedback' 
//       });
//     }
//   };

//   // const handleDownloadPDF = async () => {
//   //   try {
//   //     await downloadPDF(eventId).unwrap();
//   //     setMessage({ type: 'success', text: 'PDF downloaded successfully' });
//   //     setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//   //   } catch (error) {
//   //     setMessage({ 
//   //       type: 'error', 
//   //       text: error?.data?.message || 'Error downloading PDF' 
//   //     });
//   //   }
//   // };

//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   const StatCard = ({ icon: Icon, label, value, bgColor }) => (
//     <div className="bg-white rounded-lg border border-gray-200 p-6">
//       <div className="flex justify-between items-start">
//         <div>
//           <p className="text-gray-600 text-sm mb-2">{label}</p>
//           <p className="text-3xl font-bold text-gray-900">{value}</p>
//         </div>
//         <div className={`${bgColor} p-3 rounded-lg`}>
//           <Icon size={24} className="text-white" />
//         </div>
//       </div>
//     </div>
//   );

//   const renderStars = (count, isClickable = false) => {
//     return (
//       <div className="flex gap-2">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             disabled={!isClickable}
//             onClick={() => isClickable && setRating(star)}
//             onMouseEnter={() => isClickable && setHoverRating(star)}
//             onMouseLeave={() => isClickable && setHoverRating(0)}
//             className={isClickable ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
//           >
//             <Star
//               size={isClickable ? 40 : 20}
//               className={
//                 star <= (hoverRating || rating)
//                   ? 'fill-orange-400 text-orange-400'
//                   : 'text-gray-300'
//               }
//             />
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const RatingBar = ({ stars, count, percentage }) => (
//     <div className="flex items-center gap-4 mb-4">
//       <div className="flex gap-1">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             size={18}
//             className={i < stars ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
//           />
//         ))}
//       </div>
//       <div className="w-96 bg-gray-200 rounded-full h-2">
//         <div
//           className="bg-blue-600 h-2 rounded-full"
//           style={{ width: `${(count / feedbackData?.stats?.totalFeedback) * 100}%` }}
//         />
//       </div>
//       <span className="text-gray-900 font-semibold min-w-fit">{count} ({percentage}%)</span>
//     </div>
//   );

//   const stats = feedbackData?.stats;
//   console.log(stats);
  
//   const eventInfo = feedbackData?.event;
//   console.log(eventInfo);
  
//   const feedbacks = feedbackData?.feedbacks || [];
//   console.log(feedbacks);
  

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-blue-600 text-white p-8 text-center">
//         <h1 className="text-2xl font-bold">time analytics</h1>
//       </div>

//       <div className="max-w-6xl mx-auto p-6">
//         {/* Message Alert */}
//         {message.text && (
//           <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
//             <AlertCircle className={message.type === 'success' ? 'text-green-600' : 'text-red-600'} />
//             <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
//               {message.text}
//             </AlertDescription>
//           </Alert>
//         )}

//         {/* Tab Navigation */}
//         <div className="flex gap-4 mb-8 bg-white rounded-lg p-2 w-fit border border-gray-200">
//           {!isOrganizer && (
//             <button
//               onClick={() => setActiveTab('submit')}
//               className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all ${
//                 activeTab === 'submit'
//                   ? 'bg-gray-100 text-gray-900 font-semibold'
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               <MessageSquare size={18} />
//               Submit
//             </button>
//           )}

//           {isOrganizer && (
//             <>
//               <button
//                 onClick={() => setActiveTab('analytics')}
//                 className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all ${
//                   activeTab === 'analytics'
//                     ? 'bg-gray-100 text-gray-900 font-semibold'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <BarChart3 size={18} />
//                 Analytics
//               </button>
//               <button
//                 onClick={() => setActiveTab('responses')}
//                 className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all ${
//                   activeTab === 'responses'
//                     ? 'bg-gray-100 text-gray-900 font-semibold'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <Users size={18} />
//                 Responses
//               </button>
//             </>
//           )}
//         </div>

//         {/* ANALYTICS TAB */}
//         {activeTab === 'analytics' && isOrganizer && (
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Feedback Analytics</h1>
//                 <p className="text-gray-600 mt-1">Real-time insights on participant satisfaction and engagement</p>
//               </div>
//               {/* <button
//                 onClick={handleDownloadPDF}
//                 disabled={downloadLoading || feedbackLoading}
//                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all disabled:opacity-50"
//               >
//                 <Download size={18} />
//                 {downloadLoading ? 'Downloading...' : 'Download PDF'}
//               </button> */}
//             </div>

//             {feedbackLoading ? (
//               <p className="text-gray-600">Loading feedback data...</p>
//             ) : stats && eventInfo ? (
//               <>
//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-4 gap-4">
//                   <StatCard
//                     icon={Users}
//                     label="Total Responses"
//                     value={stats.totalFeedback}
//                     bgColor="bg-blue-500"
//                   />
//                   <StatCard
//                     icon={Star}
//                     label="Average Rating"
//                     value={stats.averageRating}
//                     bgColor="bg-orange-500"
//                   />
//                   <StatCard
//                     icon={TrendingUp}
//                     label="Satisfaction Rate"
//                     value="86%"
//                     bgColor="bg-green-500"
//                   />
//                   <StatCard
//                     icon={BarChart3}
//                     label="Response Rate"
//                     value="73%"
//                     bgColor="bg-blue-600"
//                   />
//                 </div>

//                 {/* Rating Distribution */}
//                 <div className="bg-white rounded-lg border border-gray-200 p-8">
//                   <h2 className="text-2xl font-bold text-gray-900 mb-2">Rating Distribution</h2>
//                   <p className="text-gray-600 mb-6">Breakdown of participant ratings across all responses</p>
                  
//                   <RatingBar 
//                     stars={5} 
//                     count={stats.ratingDistribution[5]} 
//                     percentage={Math.round((stats.ratingDistribution[5] / stats.totalFeedback) * 100)} 
//                   />
//                   <RatingBar 
//                     stars={4} 
//                     count={stats.ratingDistribution[4]} 
//                     percentage={Math.round((stats.ratingDistribution[4] / stats.totalFeedback) * 100)} 
//                   />
//                   <RatingBar 
//                     stars={3} 
//                     count={stats.ratingDistribution[3]} 
//                     percentage={Math.round((stats.ratingDistribution[3] / stats.totalFeedback) * 100)} 
//                   />
//                   <RatingBar 
//                     stars={2} 
//                     count={stats.ratingDistribution[2]} 
//                     percentage={Math.round((stats.ratingDistribution[2] / stats.totalFeedback) * 100)} 
//                   />
//                   <RatingBar 
//                     stars={1} 
//                     count={stats.ratingDistribution[1]} 
//                     percentage={Math.round((stats.ratingDistribution[1] / stats.totalFeedback) * 100)} 
//                   />
//                 </div>
//               </>
//             ) : (
//               <p className="text-gray-600">No feedback data available</p>
//             )}
//           </div>
//         )}

//         {/* SUBMIT TAB */}
//         {activeTab === 'submit' && !isOrganizer && (
//           <div className="max-w-2xl mx-auto">
//             {eligibilityLoading ? (
//               <p className="text-gray-600">Checking eligibility...</p>
//             ) : eligibilityData?.success && eligibilityData?.canSubmit ? (
//               <div className="bg-white rounded-lg border border-gray-200 p-8">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Feedback</h2>
//                 <p className="text-gray-600 mb-6">Help us improve by sharing your experience at the event</p>

//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-gray-900 font-semibold mb-4">How would you rate this event?</label>
//                     {renderStars(5, true)}
//                   </div>

//                   <div>
//                     <label className="block text-gray-900 font-semibold mb-4">Additional Comments</label>
//                     <textarea
//                       value={comments}
//                       onChange={(e) => setComments(e.target.value)}
//                       placeholder="Share your thoughts about the event..."
//                       className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                     />
//                   </div>

//                   <button
//                     onClick={handleSubmitFeedback}
//                     disabled={submitLoading}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50"
//                   >
//                     {submitLoading ? 'Submitting...' : 'Submit Feedback'}
//                   </button>
//                 </div>

//                 {eligibilityData?.remainingMinutes && (
//                   <p className="text-sm text-gray-500 mt-4 text-center">
//                     {eligibilityData.message}
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                 <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Cannot Submit Feedback</h3>
//                 <p className="text-gray-600">
//                   {eligibilityData?.reason || 'You are not eligible to submit feedback for this event.'}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* RESPONSES TAB */}
//         {activeTab === 'responses' && isOrganizer && (
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Feedback</h2>
//               <p className="text-gray-600">Latest responses from event participants</p>
//             </div>

//             {feedbackLoading ? (
//               <p className="text-gray-600">Loading responses...</p>
//             ) : feedbacks.length > 0 ? (
//               feedbacks.map((feedback) => {
//                 const initials = feedback.participant.name
//                   .split(' ')
//                   .map(n => n[0])
//                   .join('')
//                   .toUpperCase();

//                 return (
//                   <div key={feedback._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-start gap-4">
//                         <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
//                           {initials}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-2">
//                             <h3 className="font-bold text-gray-900">{feedback.participant.name}</h3>
//                             <span className="text-sm text-gray-600">{eventInfo?.title}</span>
//                           </div>
//                           <p className="text-sm text-gray-600">
//                             📅 {new Date(feedback.submittedAt).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={18}
//                             className={i < feedback.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
//                           />
//                         ))}
//                         <span className="ml-2 font-semibold text-gray-900">{feedback.rating}/5</span>
//                       </div>
//                     </div>

//                     <p className="text-gray-700">{feedback.comments}</p>
                    
//                     <div className="mt-4 pt-4 border-t border-gray-100">
//                       <p className="text-xs text-gray-500">
//                         📧 {feedback.participant.email} • {feedback.participant.department}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p className="text-gray-600">No feedback yet</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







// import { useState } from 'react';
// import { Star, Users, TrendingUp, BarChart3, MessageSquare, AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useParams } from 'react-router-dom';
// import {
//   useCheckFeedbackEligibilityQuery,
//   useSubmitFeedbackMutation,
//   useGetEventFeedbackQuery,
//   useIsAuthQuery
// } from '@/state/api';

// // Components
// import StatCard from '@/components/feedback/StatCard';
// import RatingStars from '@/components/feedback/RatingStars';
// import RatingBar from '@/components/feedback/RatingBar';
// import FeedbackCard from '@/components/feedback/FeedbackCard';
// import TabNavigation from '@/components/feedback/TabNavigation';
// import PageHeader from '@/components/feedback/PageHeader';

// export default function FeedbackPage() {
//   const { eventId } = useParams();
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comments, setComments] = useState('');
//   const [activeTab, setActiveTab] = useState('submit');
//   const [message, setMessage] = useState({ type: '', text: '' });

//   // Auth check
//   const { data: authData, isLoading: authLoading } = useIsAuthQuery();
//   const userRole = authData?.user?.role || 'participant';
//   const isOrganizer = ['organizer', 'faculty', 'volunteer'].includes(userRole);

//   // Eligibility
//   const { data: eligibilityData, isLoading: eligibilityLoading } =
//     useCheckFeedbackEligibilityQuery(eventId, {
//       skip: !eventId,
//     });

//   // Feedback data
//   const { data: feedbackApiData, isLoading: feedbackLoading } =
//     useGetEventFeedbackQuery(eventId, {
//       skip: !eventId || !isOrganizer,
//     });

//   const feedbackData = feedbackApiData?.data;
//   const stats = feedbackData?.stats;
//   const eventInfo = feedbackData?.event;
//   const feedbacks = feedbackData?.feedbacks || [];

//   // Submit Feedback
//   const [submitFeedback, { isLoading: submitLoading }] = useSubmitFeedbackMutation();

//   const handleSubmitFeedback = async () => {
//     if (!rating) {
//       setMessage({ type: 'error', text: 'Please select a rating' });
//       return;
//     }

//     try {
//       const response = await submitFeedback({
//         eventId,
//         data: { rating, comments }
//       }).unwrap();

//       setMessage({
//         type: 'success',
//         text: response.message || 'Feedback submitted successfully!'
//       });

//       setRating(0);
//       setComments('');

//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//     } catch (error) {
//       setMessage({
//         type: 'error',
//         text: error?.data?.message || 'Error submitting feedback'
//       });
//     }
//   };

//   // Loading Auth Screen
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="animate-pulse text-center">
//           <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Tabs Setup
//   const tabs = isOrganizer
//     ? [
//         { id: 'analytics', label: 'Analytics', icon: BarChart3 },
//         { id: 'responses', label: 'Responses', icon: Users },
//       ]
//     : [
//         { id: 'submit', label: 'Submit Feedback', icon: MessageSquare },
//       ];

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Page Header */}
//       <PageHeader
//         title="Event Feedback Analytics"
//         subtitle="Real-time insights and participant feedback management"
//       />

//       <div className="max-w-7xl mx-auto p-6">

//         {/* ✅ Feedback Messages */}
//         {message.text && (
//           <Alert className={`mb-6 ${
//             message.type === 'success'
//               ? 'bg-green-50 border-green-300'
//               : 'bg-red-50 border-red-300'
//           }`}>
//             <AlertCircle
//               className={
//                 message.type === 'success'
//                   ? 'text-green-600'
//                   : 'text-red-600'
//               }
//             />
//             <AlertDescription className={
//               message.type === 'success'
//                 ? 'text-green-800'
//                 : 'text-red-800'
//             }>
//               {message.text}
//             </AlertDescription>
//           </Alert>
//         )}

//         {/* ✅ Tabs */}
//         <div className="mb-8">
//           <TabNavigation
//             tabs={tabs}
//             activeTab={activeTab}
//             onTabChange={setActiveTab}
//           />
//         </div>

//         {/* ✅ ANALYTICS TAB */}
//         {activeTab === 'analytics' && isOrganizer && (
//           <div className="space-y-6 animate-in fade-in duration-500">
//             <h2 className="text-3xl font-bold">Feedback Analytics</h2>
//             <p className="text-muted-foreground">
//               Real-time insights on participant satisfaction
//             </p>

//             {feedbackLoading ? (
//               <p className="text-muted-foreground">Loading feedback...</p>
//             ) : stats ? (
//               <>
//                 {/* ✅ Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   <StatCard icon={Users} label="Total Responses" value={stats.totalFeedback} colorClass="blue" />
//                   <StatCard icon={Star} label="Average Rating" value={stats.averageRating} colorClass="orange" />
//                   <StatCard icon={TrendingUp} label="Satisfaction Rate" value="86%" colorClass="green" />
//                   <StatCard icon={BarChart3} label="Response Rate" value="73%" colorClass="indigo" />
//                 </div>

//                 {/* ✅ Rating Distribution */}
//                 <div className="bg-card rounded-lg border border-border p-8 shadow">
//                   <h3 className="text-xl font-semibold mb-2">Rating Distribution</h3>
//                   <p className="text-muted-foreground mb-4">
//                     Breakdown of ratings
//                   </p>

//                   {[5,4,3,2,1].map((star) => (
//                     <RatingBar
//                       key={star}
//                       stars={star}
//                       count={stats.ratingDistribution[star]}
//                       totalCount={stats.totalFeedback}
//                     />
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <p>No analytics available.</p>
//             )}
//           </div>
//         )}

//         {/* ✅ SUBMIT TAB */}
//         {activeTab === 'submit' && !isOrganizer && (
//           <div className="max-w-2xl mx-auto animate-in fade-in duration-500">

//             {eligibilityLoading ? (
//               <p>Checking eligibility...</p>
//             ) : eligibilityData?.canSubmit ? (
//               <div className="bg-card rounded-lg border border-border p-8 shadow">
//                 <h2 className="text-2xl font-bold mb-2">Share Your Experience</h2>
//                 <p className="text-muted-foreground mb-6">
//                   Rate the event and leave your feedback
//                 </p>

//                 <div className="space-y-6">

//                   {/* Rating stars */}
//                   <div>
//                     <label className="font-semibold mb-4 block">Rating</label>
//                     <RatingStars
//                       rating={rating}
//                       hoverRating={hoverRating}
//                       isInteractive
//                       size={40}
//                       onRatingChange={setRating}
//                       onHoverChange={setHoverRating}
//                     />
//                   </div>

//                   {/* Comments */}
//                   <div>
//                     <label className="font-semibold mb-4 block">Comments</label>
//                     <textarea
//                       value={comments}
//                       onChange={(e) => setComments(e.target.value)}
//                       placeholder="Share your thoughts..."
//                       className="w-full h-32 p-3 border border-input rounded-lg"
//                     />
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     onClick={handleSubmitFeedback}
//                     disabled={submitLoading}
//                     className="w-full bg-primary text-primary-foreground py-3 rounded-lg shadow hover:bg-primary/90 transition"
//                   >
//                     {submitLoading ? "Submitting..." : "Submit Feedback"}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-card rounded-lg border border-border p-10 text-center">
//                 <AlertCircle className="mx-auto text-muted-foreground" size={48} />
//                 <h3 className="text-lg font-semibold mt-4">Cannot Submit Feedback</h3>
//                 <p className="text-muted-foreground mt-2">
//                   {eligibilityData?.reason || "You are not eligible to submit feedback."}
//                 </p>
//               </div>
//             )}

//           </div>
//         )}

//         {/* ✅ RESPONSES TAB */}
//         {activeTab === 'responses' && isOrganizer && (
//           <div className="space-y-6 animate-in fade-in duration-500">
//             <h2 className="text-2xl font-bold">Recent Feedback</h2>
//             <p className="text-muted-foreground mb-4">
//               Latest participant responses
//             </p>

//             {feedbackLoading ? (
//               <p>Loading responses...</p>
//             ) : feedbacks.length === 0 ? (
//               <p>No feedback yet.</p>
//             ) : (
//               feedbacks.map((item) => (
//                 <FeedbackCard
//                   key={item._id}
//                   feedback={item}
//                   eventTitle={eventInfo?.title}
//                 />
//               ))
//             )}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }


















































// import React, { useState } from 'react';
// import { Star, Users, TrendingUp, BarChart3, MessageSquare, AlertCircle, Sparkles, Award, Calendar, Mail, Building } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// // Mock data for demonstration
// const mockStats = {
//   totalFeedback: 247,
//   averageRating: 4.6,
//   ratingDistribution: {
//     5: 152,
//     4: 68,
//     3: 18,
//     2: 7,
//     1: 2
//   }
// };

// const mockEventInfo = {
//   title: "Tech Innovation Summit 2024"
// };

// const mockFeedbacks = [
//   {
//     _id: '1',
//     participant: {
//       name: 'Sarah Johnson',
//       email: 'sarah.j@university.edu',
//       department: 'Computer Science'
//     },
//     rating: 5,
//     comments: 'Excellent event! The speakers were engaging and the topics were highly relevant to current industry trends. Would love to attend more events like this.',
//     submittedAt: new Date('2024-11-05T10:30:00')
//   },
//   {
//     _id: '2',
//     participant: {
//       name: 'Michael Chen',
//       email: 'm.chen@university.edu',
//       department: 'Engineering'
//     },
//     rating: 4,
//     comments: 'Great organization and content. The networking opportunities were valuable. Only suggestion would be to have longer Q&A sessions.',
//     submittedAt: new Date('2024-11-05T14:20:00')
//   },
//   {
//     _id: '3',
//     participant: {
//       name: 'Emma Williams',
//       email: 'e.williams@university.edu',
//       department: 'Business Administration'
//     },
//     rating: 5,
//     comments: 'Phenomenal experience! The workshops were hands-on and practical. The venue was perfect and everything ran smoothly.',
//     submittedAt: new Date('2024-11-06T09:15:00')
//   }
// ];

// export default function FeedbackPage() {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comments, setComments] = useState('');
//   const [activeTab, setActiveTab] = useState('analytics');
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const isOrganizer = true; // Toggle this to see participant view

//   const handleSubmitFeedback = () => {
//     if (!rating) {
//       setMessage({ type: 'error', text: 'Please select a rating before submitting' });
//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//       return;
//     }

//     setMessage({ type: 'success', text: 'Thank you! Your feedback has been submitted successfully.' });
//     setIsSubmitted(true);
//     setTimeout(() => setMessage({ type: '', text: '' }), 5000);
//   };

//   const StatCard = ({ icon: Icon, label, value, bgColor, trend }) => (
//     <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
//       <div className="flex justify-between items-start">
//         <div className="flex-1">
//           <p className="text-gray-500 text-sm font-medium mb-2">{label}</p>
//           <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
//             {value}
//           </p>
//           {trend && (
//             <p className="text-sm text-emerald-600 font-semibold flex items-center gap-1">
//               <TrendingUp size={14} /> {trend}
//             </p>
//           )}
//         </div>
//         <div className={`${bgColor} p-4 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
//           <Icon size={26} className="text-white" />
//         </div>
//       </div>
//     </div>
//   );

//   const renderStars = (count, isClickable = false) => {
//     return (
//       <div className="flex gap-3 justify-center">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             disabled={!isClickable}
//             onClick={() => isClickable && setRating(star)}
//             onMouseEnter={() => isClickable && setHoverRating(star)}
//             onMouseLeave={() => isClickable && setHoverRating(0)}
//             className={`${isClickable ? 'cursor-pointer transition-all duration-200 hover:scale-125 active:scale-95' : 'cursor-default'} focus:outline-none`}
//           >
//             <Star
//               size={isClickable ? 52 : 20}
//               className={`transition-all duration-200 ${
//                 star <= (hoverRating || rating)
//                   ? 'fill-amber-400 text-amber-400 drop-shadow-lg'
//                   : 'text-gray-300 hover:text-gray-400'
//               }`}
//             />
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const RatingBar = ({ stars, count, percentage }) => (
//     <div className="flex items-center gap-4 mb-4 group">
//       <div className="flex gap-1 min-w-[110px]">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             size={18}
//             className={i < stars ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
//           />
//         ))}
//       </div>
//       <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
//         <div
//           className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
//           style={{ width: `${(count / mockStats.totalFeedback) * 100}%` }}
//         />
//       </div>
//       <span className="text-gray-700 font-bold min-w-[100px] text-right">
//         {count} <span className="text-gray-500 font-normal">({percentage}%)</span>
//       </span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 shadow-xl">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-center gap-3 mb-2">
//             <Sparkles size={32} className="animate-pulse" />
//             <h1 className="text-4xl font-bold tracking-tight">Event Feedback Hub</h1>
//           </div>
//           <p className="text-center text-blue-100 text-lg">Real-time insights and participant engagement analytics</p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-6 md:p-8">
//         {/* Message Alert */}
//         {message.text && (
//           <div className="mb-6 animate-in slide-in-from-top duration-300">
//             <Alert className={`${message.type === 'success' ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'} shadow-lg`}>
//               <AlertCircle className={message.type === 'success' ? 'text-emerald-600' : 'text-red-600'} />
//               <AlertDescription className={`${message.type === 'success' ? 'text-emerald-800' : 'text-red-800'} font-medium`}>
//                 {message.text}
//               </AlertDescription>
//             </Alert>
//           </div>
//         )}

//         {/* Tab Navigation */}
//         <div className="flex gap-2 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-2 w-fit border border-gray-200 shadow-lg mx-auto">
//           {!isOrganizer && (
//             <button
//               onClick={() => setActiveTab('submit')}
//               className={`px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-semibold ${
//                 activeTab === 'submit'
//                   ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
//                   : 'text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               <MessageSquare size={20} />
//               Submit Feedback
//             </button>
//           )}

//           {isOrganizer && (
//             <>
//               <button
//                 onClick={() => setActiveTab('analytics')}
//                 className={`px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-semibold ${
//                   activeTab === 'analytics'
//                     ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 <BarChart3 size={20} />
//                 Analytics
//               </button>
//               <button
//                 onClick={() => setActiveTab('responses')}
//                 className={`px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-semibold ${
//                   activeTab === 'responses'
//                     ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
//                     : 'text-gray-600 hover:bg-gray-100'
//                 }`}
//               >
//                 <Users size={20} />
//                 Responses
//               </button>
//             </>
//           )}
//         </div>

//         {/* ANALYTICS TAB */}
//         {activeTab === 'analytics' && isOrganizer && (
//           <div className="space-y-8 animate-in fade-in duration-500">
//             <div className="text-center mb-8">
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-3">
//                 Feedback Analytics Dashboard
//               </h1>
//               <p className="text-gray-600 text-lg">Real-time insights on participant satisfaction and engagement metrics</p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <StatCard
//                 icon={Users}
//                 label="Total Responses"
//                 value={mockStats.totalFeedback}
//                 bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
//                 trend="+12% this week"
//               />
//               <StatCard
//                 icon={Star}
//                 label="Average Rating"
//                 value={mockStats.averageRating}
//                 bgColor="bg-gradient-to-br from-amber-500 to-orange-500"
//                 trend="+0.3 points"
//               />
//               <StatCard
//                 icon={TrendingUp}
//                 label="Satisfaction Rate"
//                 value="89%"
//                 bgColor="bg-gradient-to-br from-emerald-500 to-green-600"
//                 trend="+5% increase"
//               />
//               <StatCard
//                 icon={Award}
//                 label="Response Rate"
//                 value="76%"
//                 bgColor="bg-gradient-to-br from-purple-500 to-indigo-600"
//                 trend="+8% growth"
//               />
//             </div>

//             {/* Rating Distribution */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xl">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
//                   <BarChart3 size={24} className="text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900">Rating Distribution</h2>
//                   <p className="text-gray-500">Breakdown of participant ratings across all responses</p>
//                 </div>
//               </div>
              
//               <div className="space-y-2 mt-8">
//                 <RatingBar 
//                   stars={5} 
//                   count={mockStats.ratingDistribution[5]} 
//                   percentage={Math.round((mockStats.ratingDistribution[5] / mockStats.totalFeedback) * 100)} 
//                 />
//                 <RatingBar 
//                   stars={4} 
//                   count={mockStats.ratingDistribution[4]} 
//                   percentage={Math.round((mockStats.ratingDistribution[4] / mockStats.totalFeedback) * 100)} 
//                 />
//                 <RatingBar 
//                   stars={3} 
//                   count={mockStats.ratingDistribution[3]} 
//                   percentage={Math.round((mockStats.ratingDistribution[3] / mockStats.totalFeedback) * 100)} 
//                 />
//                 <RatingBar 
//                   stars={2} 
//                   count={mockStats.ratingDistribution[2]} 
//                   percentage={Math.round((mockStats.ratingDistribution[2] / mockStats.totalFeedback) * 100)} 
//                 />
//                 <RatingBar 
//                   stars={1} 
//                   count={mockStats.ratingDistribution[1]} 
//                   percentage={Math.round((mockStats.ratingDistribution[1] / mockStats.totalFeedback) * 100)} 
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* SUBMIT TAB */}
//         {activeTab === 'submit' && !isOrganizer && (
//           <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
//             {!isSubmitted ? (
//               <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-xl">
//                 <div className="text-center mb-8">
//                   <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
//                     <MessageSquare size={32} className="text-white" />
//                   </div>
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
//                   <p className="text-gray-600 text-lg">Help us improve by providing your valuable feedback</p>
//                 </div>

//                 <div className="space-y-8">
//                   <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
//                     <label className="block text-gray-900 font-bold text-xl mb-6 text-center">
//                       How would you rate this event?
//                     </label>
//                     {renderStars(5, true)}
//                     {rating > 0 && (
//                       <p className="text-center mt-4 text-lg font-semibold text-gray-700">
//                         You rated: {rating} out of 5 stars
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-gray-900 font-bold text-lg mb-4">Additional Comments</label>
//                     <textarea
//                       value={comments}
//                       onChange={(e) => setComments(e.target.value)}
//                       placeholder="Tell us what you loved, or what we could improve..."
//                       className="w-full h-40 p-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-gray-700"
//                     />
//                   </div>

//                   <button
//                     onClick={handleSubmitFeedback}
//                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-lg"
//                   >
//                     Submit Your Feedback
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xl animate-in zoom-in duration-500">
//                 <div className="inline-flex p-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-lg">
//                   <Award size={48} className="text-white" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h3>
//                 <p className="text-gray-600 text-lg mb-6">
//                   Your feedback has been submitted successfully. We appreciate you taking the time to share your thoughts!
//                 </p>
//                 <div className="flex gap-2 justify-center">
//                   {[...Array(rating)].map((_, i) => (
//                     <Star key={i} size={24} className="fill-amber-400 text-amber-400" />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* RESPONSES TAB */}
//         {activeTab === 'responses' && isOrganizer && (
//           <div className="space-y-6 animate-in fade-in duration-500">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-2">
//                 Recent Feedback
//               </h2>
//               <p className="text-gray-600 text-lg">Latest responses from event participants</p>
//             </div>

//             <div className="space-y-6">
//               {mockFeedbacks.map((feedback, index) => {
//                 const initials = feedback.participant.name
//                   .split(' ')
//                   .map(n => n[0])
//                   .join('')
//                   .toUpperCase();

//                 return (
//                   <div 
//                     key={feedback._id} 
//                     className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
//                     style={{ animationDelay: `${index * 100}ms` }}
//                   >
//                     <div className="flex items-start justify-between mb-6">
//                       <div className="flex items-start gap-5">
//                         <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
//                           {initials}
//                         </div>
//                         <div>
//                           <div className="flex flex-wrap items-center gap-3 mb-2">
//                             <h3 className="font-bold text-gray-900 text-xl">{feedback.participant.name}</h3>
//                             <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
//                               {mockEventInfo.title}
//                             </span>
//                           </div>
//                           <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                             <span className="flex items-center gap-1">
//                               <Calendar size={16} className="text-blue-500" />
//                               {new Date(feedback.submittedAt).toLocaleDateString('en-US', { 
//                                 month: 'short', 
//                                 day: 'numeric', 
//                                 year: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit'
//                               })}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             size={18}
//                             className={i < feedback.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
//                           />
//                         ))}
//                         <span className="ml-1 font-bold text-gray-900">{feedback.rating}/5</span>
//                       </div>
//                     </div>

//                     <p className="text-gray-700 leading-relaxed text-lg mb-6 pl-21">{feedback.comments}</p>
                    
//                     <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500 pl-21">
//                       <span className="flex items-center gap-2">
//                         <Mail size={16} className="text-blue-500" />
//                         {feedback.participant.email}
//                       </span>
//                       <span className="flex items-center gap-2">
//                         <Building size={16} className="text-indigo-500" />
//                         {feedback.participant.department}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



































import React, { useState, useEffect } from 'react';
import { Star, Users, TrendingUp, BarChart3, MessageSquare, AlertCircle, Sparkles, Award, Calendar, Mail, Building } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Note: Replace these imports with your actual API hooks
import {
  useCheckFeedbackEligibilityQuery,
  useSubmitFeedbackMutation,
  useGetEventFeedbackQuery,
  useIsAuthQuery
} from '@/state/api';
import { useParams } from 'react-router-dom';

export default function FeedbackPage() {

  const {eventId} = useParams()
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [activeTab, setActiveTab] = useState('submit');
  const [message, setMessage] = useState({ type: '', text: '' });

  // Get current user info
  const { data: authData, isLoading: authLoading } = useIsAuthQuery();
  const userRole = authData?.user?.role || 'participant';
  const isOrganizer = ['organizer', 'faculty', 'volunteer'].includes(userRole);

  // Fetch eligibility
  const { data: eligibilityData, isLoading: eligibilityLoading } = useCheckFeedbackEligibilityQuery(eventId, {
    skip: !eventId,
  });

  // Fetch event feedback (only for organizers)
  const { data: feedbackData1, isLoading: feedbackLoading } = useGetEventFeedbackQuery(eventId, {
    skip: !eventId || !isOrganizer,
  });

  const feedbackData = feedbackData1?.data;

  // Submit feedback mutation
  const [submitFeedback, { isLoading: submitLoading }] = useSubmitFeedbackMutation();

  useEffect(() => {
    if (isOrganizer) {
      setActiveTab('analytics');
    }
  }, [isOrganizer]);

  const handleSubmitFeedback = async () => {
    if (!rating) {
      setMessage({ type: 'error', text: 'Please select a rating before submitting' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    try {
      const response = await submitFeedback({
        eventId,
        data: { rating, comments }
      }).unwrap();

      setMessage({ type: 'success', text: response.message || 'Feedback submitted successfully!' });
      setRating(0);
      setComments('');

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error?.data?.message || 'Error submitting feedback' 
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, bgColor, trend }) => (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-500 text-sm font-medium mb-2">{label}</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
            {value}
          </p>
          {trend && (
            <p className="text-sm text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp size={14} /> {trend}
            </p>
          )}
        </div>
        <div className={`${bgColor} p-4 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <Icon size={26} className="text-white" />
        </div>
      </div>
    </div>
  );

  const renderStars = (count, isClickable = false) => {
    return (
      <div className="flex gap-3 justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && setRating(star)}
            onMouseEnter={() => isClickable && setHoverRating(star)}
            onMouseLeave={() => isClickable && setHoverRating(0)}
            className={`${isClickable ? 'cursor-pointer transition-all duration-200 hover:scale-125 active:scale-95' : 'cursor-default'} focus:outline-none`}
          >
            <Star
              size={isClickable ? 52 : 20}
              className={`transition-all duration-200 ${
                star <= (hoverRating || rating)
                  ? 'fill-amber-400 text-amber-400 drop-shadow-lg'
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const RatingBar = ({ stars, count, percentage }) => (
    <div className="flex items-center gap-4 mb-4 group">
      <div className="flex gap-1 min-w-[110px]">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < stars ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
          />
        ))}
      </div>
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-gray-700 font-bold min-w-[100px] text-right">
        {count} <span className="text-gray-500 font-normal">({percentage}%)</span>
      </span>
    </div>
  );

  const stats = feedbackData?.stats;
  const eventInfo = feedbackData?.event;
  const feedbacks = feedbackData?.feedbacks || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles size={32} className="animate-pulse" />
            <h1 className="text-4xl font-bold tracking-tight">Event Feedbacks</h1>
          </div>
          <p className="text-center text-blue-100 text-lg">Real-time insights and participant engagement analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Message Alert */}
        {message.text && (
          <div className="mb-6 animate-in slide-in-from-top duration-300">
            <Alert className={`${message.type === 'success' ? 'bg-emerald-50 border-emerald-300' : 'bg-red-50 border-red-300'} shadow-lg`}>
              <AlertCircle className={message.type === 'success' ? 'text-emerald-600' : 'text-red-600'} />
              <AlertDescription className={`${message.type === 'success' ? 'text-emerald-800' : 'text-red-800'} font-medium`}>
                {message.text}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-2 w-fit border border-gray-200 shadow-lg mx-auto">
          {!isOrganizer && (
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-semibold ${
                activeTab === 'submit'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={20} />
              Submit Feedback
            </button>
          )}

          {isOrganizer && (
            <>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-semibold ${
                  activeTab === 'analytics'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 size={20} />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('responses')}
                className={`px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-semibold ${
                  activeTab === 'responses'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users size={20} />
                Responses
              </button>
            </>
          )}
        </div>

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && isOrganizer && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-3">
                Feedback Analytics Dashboard
              </h1>
              <p className="text-gray-600 text-lg">Real-time insights on participant satisfaction and engagement metrics</p>
            </div>

            {feedbackLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-gray-600 font-medium">Loading feedback data...</p>
              </div>
            ) : stats && eventInfo ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={Users}
                    label="Total Responses"
                    value={stats.totalFeedback}
                    bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
                    trend="+12% this week"
                  />
                  <StatCard
                    icon={Star}
                    label="Average Rating"
                    value={stats.averageRating}
                    bgColor="bg-gradient-to-br from-amber-500 to-orange-500"
                    trend="+0.3 points"
                  />
                  <StatCard
                    icon={TrendingUp}
                    label="Satisfaction Rate"
                    value="89%"
                    bgColor="bg-gradient-to-br from-emerald-500 to-green-600"
                    trend="+5% increase"
                  />
                  <StatCard
                    icon={Award}
                    label="Response Rate"
                    value="76%"
                    bgColor="bg-gradient-to-br from-purple-500 to-indigo-600"
                    trend="+8% growth"
                  />
                </div>

                {/* Rating Distribution */}
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                      <BarChart3 size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Rating Distribution</h2>
                      <p className="text-gray-500">Breakdown of participant ratings across all responses</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-8">
                    <RatingBar 
                      stars={5} 
                      count={stats.ratingDistribution[5]} 
                      percentage={Math.round((stats.ratingDistribution[5] / stats.totalFeedback) * 100)} 
                    />
                    <RatingBar 
                      stars={4} 
                      count={stats.ratingDistribution[4]} 
                      percentage={Math.round((stats.ratingDistribution[4] / stats.totalFeedback) * 100)} 
                    />
                    <RatingBar 
                      stars={3} 
                      count={stats.ratingDistribution[3]} 
                      percentage={Math.round((stats.ratingDistribution[3] / stats.totalFeedback) * 100)} 
                    />
                    <RatingBar 
                      stars={2} 
                      count={stats.ratingDistribution[2]} 
                      percentage={Math.round((stats.ratingDistribution[2] / stats.totalFeedback) * 100)} 
                    />
                    <RatingBar 
                      stars={1} 
                      count={stats.ratingDistribution[1]} 
                      percentage={Math.round((stats.ratingDistribution[1] / stats.totalFeedback) * 100)} 
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-lg">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No feedback data available</p>
              </div>
            )}
          </div>
        )}

        {/* SUBMIT TAB */}
        {activeTab === 'submit' && !isOrganizer && (
          <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            {eligibilityLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-gray-600 font-medium">Checking eligibility...</p>
              </div>
            ) : eligibilityData?.success && eligibilityData?.canSubmit ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-xl">
                <div className="text-center mb-8">
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                    <MessageSquare size={32} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
                  <p className="text-gray-600 text-lg">Help us improve by providing your valuable feedback</p>
                </div>

                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
                    <label className="block text-gray-900 font-bold text-xl mb-6 text-center">
                      How would you rate this event?
                    </label>
                    {renderStars(5, true)}
                    {rating > 0 && (
                      <p className="text-center mt-4 text-lg font-semibold text-gray-700">
                        You rated: {rating} out of 5 stars
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-900 font-bold text-lg mb-4">Additional Comments</label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Tell us what you loved, or what we could improve..."
                      className="w-full h-40 p-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-gray-700"
                    />
                  </div>

                  <button
                    onClick={handleSubmitFeedback}
                    disabled={submitLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitLoading ? 'Submitting...' : 'Submit Your Feedback'}
                  </button>
                </div>

                {eligibilityData?.remainingMinutes && (
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    {eligibilityData.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xl">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Cannot Submit Feedback</h3>
                <p className="text-gray-600 text-lg">
                  {eligibilityData?.reason || 'You are not eligible to submit feedback for this event.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* RESPONSES TAB */}
        {activeTab === 'responses' && isOrganizer && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-2">
                Recent Feedback
              </h2>
              <p className="text-gray-600 text-lg">Latest responses from event participants</p>
            </div>

            {feedbackLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                <p className="text-gray-600 font-medium">Loading responses...</p>
              </div>
            ) : feedbacks.length > 0 ? (
              <div className="space-y-6">
                {feedbacks.map((feedback, index) => {
                  const initials = feedback.participant.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase();

                  return (
                    <div 
                      key={feedback._id} 
                      className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-5">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg flex-shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <h3 className="font-bold text-gray-900 text-xl">{feedback.participant.name}</h3>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                                {eventInfo?.title}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar size={16} className="text-blue-500" />
                                {new Date(feedback.submittedAt).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 flex-shrink-0">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={i < feedback.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                            />
                          ))}
                          <span className="ml-1 font-bold text-gray-900">{feedback.rating}/5</span>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed text-lg mb-6">{feedback.comments}</p>
                      
                      <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <Mail size={16} className="text-blue-500" />
                          {feedback.participant.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <Building size={16} className="text-indigo-500" />
                          {feedback.participant.department}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-lg">
                <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No feedback responses yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}