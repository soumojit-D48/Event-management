

// import React, { useState, useEffect } from 'react';
// import { Star, Users, TrendingUp, BarChart3, MessageSquare, Download, AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// export default function FeedbackApp() {
//   const [activeTab, setActiveTab] = useState('analytics');
//   const [feedbackData, setFeedbackData] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comments, setComments] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [eligibility, setEligibility] = useState(null);
//   const [userRole, setUserRole] = useState('participant'); // Mock - get from auth
//   const eventId = '68eaa8c8abdf8d5af85e2209'; // Replace with actual

//   useEffect(() => {
//     checkEligibility();
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'analytics' || activeTab === 'responses') {
//       if (userRole !== 'participant') {
//         fetchFeedbackData();
//       }
//     }
//   }, [activeTab, userRole]);

//   const checkEligibility = async () => {
//     try {
//       // Mock API call
//       const mockData = {
//         success: true,
//         canSubmit: true,
//         remainingMinutes: 1440,
//         message: 'Feedback window closes in 24 hours'
//       };
//       setEligibility(mockData);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const fetchFeedbackData = async () => {
//     try {
//       setLoading(true);
//       // Mock data
//       const mockData = {
//         success: true,
//         data: {
//           event: {
//             id: 'evt-1',
//             title: 'Tech Symposium 2025',
//             startDate: '2025-03-15T09:00:00',
//             endDate: '2025-03-15T17:00:00'
//           },
//           stats: {
//             totalFeedback: 247,
//             averageRating: '4.3',
//             ratingDistribution: {
//               5: 142,
//               4: 63,
//               3: 28,
//               2: 10,
//               1: 4
//             }
//           },
//           feedbacks: [
//             {
//               _id: '1',
//               participant: { name: 'Rahul Sharma', email: 'rahul@example.com', department: 'CSE' },
//               rating: 5,
//               comments: 'Excellent organization and very informative sessions. The speakers were top-notch and the venue was perfect.',
//               submittedAt: '2025-03-15T10:30:00'
//             },
//             {
//               _id: '2',
//               participant: { name: 'Priya Patel', email: 'priya@example.com', department: 'ECE' },
//               rating: 4,
//               comments: 'Great event overall. Would have liked more hands-on workshops, but the networking opportunities were fantastic.',
//               submittedAt: '2025-03-15T11:45:00'
//             }
//           ]
//         }
//       };
//       setFeedbackData(mockData.data);
//     } catch (error) {
//       setMessage({ type: 'error', text: 'Error fetching feedback' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitFeedback = async (e) => {
//     e.preventDefault?.();
    
//     if (!rating) {
//       setMessage({ type: 'error', text: 'Please select a rating' });
//       return;
//     }

//     try {
//       setLoading(true);
//       // Mock submission
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       setMessage({ type: 'success', text: 'Feedback submitted successfully!' });
//       setRating(0);
//       setComments('');
      
//       setTimeout(() => {
//         setMessage({ type: '', text: '' });
//         checkEligibility();
//       }, 3000);
//     } catch (error) {
//       setMessage({ type: 'error', text: 'Error submitting feedback' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownloadPDF = async () => {
//     try {
//       setLoading(true);
//       // Mock PDF download
//       alert('PDF downloaded: feedback-Tech-Symposium-2025.pdf');
//       setMessage({ type: 'success', text: 'PDF downloaded successfully' });
//       setTimeout(() => setMessage({ type: '', text: '' }), 3000);
//     } catch (error) {
//       setMessage({ type: 'error', text: 'Error downloading PDF' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isOrganizer = userRole === 'organizer' || userRole === 'faculty' || userRole === 'volunteer';

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
//           <button
//             onClick={() => setActiveTab('analytics')}
//             className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all ${
//               activeTab === 'analytics'
//                 ? 'bg-gray-100 text-gray-900 font-semibold'
//                 : 'text-gray-600 hover:bg-gray-50'
//             }`}
//             disabled={!isOrganizer && activeTab === 'analytics'}
//           >
//             <BarChart3 size={18} />
//             Analytics
//           </button>
//           <button
//             onClick={() => setActiveTab('submit')}
//             className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all ${
//               activeTab === 'submit'
//                 ? 'bg-gray-100 text-gray-900 font-semibold'
//                 : 'text-gray-600 hover:bg-gray-50'
//             }`}
//             disabled={isOrganizer}
//           >
//             <MessageSquare size={18} />
//             Submit
//           </button>
//           <button
//             onClick={() => setActiveTab('responses')}
//             className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all ${
//               activeTab === 'responses'
//                 ? 'bg-gray-100 text-gray-900 font-semibold'
//                 : 'text-gray-600 hover:bg-gray-50'
//             }`}
//             disabled={!isOrganizer && activeTab === 'responses'}
//           >
//             <Users size={18} />
//             Responses
//           </button>
//         </div>

//         {/* ANALYTICS TAB */}
//         {activeTab === 'analytics' && isOrganizer && (
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900">Feedback Analytics</h1>
//                 <p className="text-gray-600 mt-1">Real-time insights on participant satisfaction and engagement</p>
//               </div>
//               <button
//                 onClick={handleDownloadPDF}
//                 disabled={loading}
//                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all disabled:opacity-50"
//               >
//                 <Download size={18} />
//                 Download PDF
//               </button>
//             </div>

//             {feedbackData && (
//               <>
//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-4 gap-4">
//                   <StatCard
//                     icon={Users}
//                     label="Total Responses"
//                     value={feedbackData.stats.totalFeedback}
//                     bgColor="bg-blue-500"
//                   />
//                   <StatCard
//                     icon={Star}
//                     label="Average Rating"
//                     value={feedbackData.stats.averageRating}
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
                  
//                   <RatingBar stars={5} count={feedbackData.stats.ratingDistribution[5]} percentage={Math.round((feedbackData.stats.ratingDistribution[5] / feedbackData.stats.totalFeedback) * 100)} />
//                   <RatingBar stars={4} count={feedbackData.stats.ratingDistribution[4]} percentage={Math.round((feedbackData.stats.ratingDistribution[4] / feedbackData.stats.totalFeedback) * 100)} />
//                   <RatingBar stars={3} count={feedbackData.stats.ratingDistribution[3]} percentage={Math.round((feedbackData.stats.ratingDistribution[3] / feedbackData.stats.totalFeedback) * 100)} />
//                   <RatingBar stars={2} count={feedbackData.stats.ratingDistribution[2]} percentage={Math.round((feedbackData.stats.ratingDistribution[2] / feedbackData.stats.totalFeedback) * 100)} />
//                   <RatingBar stars={1} count={feedbackData.stats.ratingDistribution[1]} percentage={Math.round((feedbackData.stats.ratingDistribution[1] / feedbackData.stats.totalFeedback) * 100)} />
//                 </div>
//               </>
//             )}
//           </div>
//         )}

//         {/* SUBMIT TAB */}
//         {activeTab === 'submit' && !isOrganizer && (
//           <div className="max-w-2xl mx-auto">
//             {eligibility?.canSubmit ? (
//               <div className="bg-white rounded-lg border border-gray-200 p-8">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Feedback</h2>
//                 <p className="text-gray-600 mb-6">Help us improve by sharing your experience at {feedbackData?.event?.title || 'this event'}</p>

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
//                     disabled={loading}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50"
//                   >
//                     {loading ? 'Submitting...' : 'Submit Feedback'}
//                   </button>
//                 </div>

//                 {eligibility?.remainingMinutes && (
//                   <p className="text-sm text-gray-500 mt-4 text-center">
//                     {eligibility.message}
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//                 <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Cannot Submit Feedback</h3>
//                 <p className="text-gray-600">
//                   {eligibility?.reason || 'You are not eligible to submit feedback for this event.'}
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

//             {feedbackData?.feedbacks?.map((feedback) => {
//               const initials = feedback.participant.name
//                 .split(' ')
//                 .map(n => n[0])
//                 .join('')
//                 .toUpperCase();

//               return (
//                 <div key={feedback._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex items-start gap-4">
//                       <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
//                         {initials}
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <h3 className="font-bold text-gray-900">{feedback.participant.name}</h3>
//                           <span className="text-sm text-gray-600">{feedbackData.event.title}</span>
//                         </div>
//                         <p className="text-sm text-gray-600 flex gap-2">
//                           📅 {new Date(feedback.submittedAt).toLocaleString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-1 text-lg">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={18}
//                           className={i < feedback.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
//                         />
//                       ))}
//                       <span className="ml-2 font-semibold text-gray-900">{feedback.rating}/5</span>
//                     </div>
//                   </div>

//                   <p className="text-gray-700">{feedback.comments}</p>
                  
//                   <div className="mt-4 pt-4 border-t border-gray-100">
//                     <p className="text-xs text-gray-500">
//                       📧 {feedback.participant.email} • {feedback.participant.department}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Participant cannot see organizer content */}
//         {!isOrganizer && (activeTab === 'analytics' || activeTab === 'responses') && (
//           <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
//             <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
//             <p className="text-gray-600">Only organizers, coordinators, and volunteers can view feedback analytics and responses.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
















import React, { useState, useEffect } from 'react';
import { Star, Users, TrendingUp, BarChart3, MessageSquare, Download, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useParams } from 'react-router-dom';
import {
  useCheckFeedbackEligibilityQuery,
  useSubmitFeedbackMutation,
  useGetEventFeedbackQuery,
  useDownloadFeedbackPDFQuery,
  useIsAuthQuery
} from '@/state/api'; // Your RTK Query hooks

export default function FeedbackPage() {
  const { eventId } = useParams(); // Get event ID from URL params
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
    skip: !eventId, // Skip if no eventId
  });

  // Fetch event feedback (only for organizers)
  const { data: feedbackData, isLoading: feedbackLoading } = useGetEventFeedbackQuery(eventId, {
    skip: !eventId || !isOrganizer, // Skip if no eventId or not organizer
  });

  // Submit feedback mutation
  const [submitFeedback, { isLoading: submitLoading }] = useSubmitFeedbackMutation();

  // Download PDF mutation
//   const [downloadPDF, { isLoading: downloadLoading }] = useDownloadFeedbackPDFQuery();

  const handleSubmitFeedback = async () => {
    if (!rating) {
      setMessage({ type: 'error', text: 'Please select a rating' });
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

  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(eventId).unwrap();
      setMessage({ type: 'success', text: 'PDF downloaded successfully' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error?.data?.message || 'Error downloading PDF' 
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, bgColor }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const renderStars = (count, isClickable = false) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!isClickable}
            onClick={() => isClickable && setRating(star)}
            onMouseEnter={() => isClickable && setHoverRating(star)}
            onMouseLeave={() => isClickable && setHoverRating(0)}
            className={isClickable ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
          >
            <Star
              size={isClickable ? 40 : 20}
              className={
                star <= (hoverRating || rating)
                  ? 'fill-orange-400 text-orange-400'
                  : 'text-gray-300'
              }
            />
          </button>
        ))}
      </div>
    );
  };

  const RatingBar = ({ stars, count, percentage }) => (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < stars ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
          />
        ))}
      </div>
      <div className="w-96 bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${(count / feedbackData?.stats?.totalFeedback) * 100}%` }}
        />
      </div>
      <span className="text-gray-900 font-semibold min-w-fit">{count} ({percentage}%)</span>
    </div>
  );

  const stats = feedbackData?.stats;
  const eventInfo = feedbackData?.event;
  const feedbacks = feedbackData?.feedbacks || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-8 text-center">
        <h1 className="text-2xl font-bold">time analytics</h1>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Message Alert */}
        {message.text && (
          <Alert className={`mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <AlertCircle className={message.type === 'success' ? 'text-green-600' : 'text-red-600'} />
            <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 bg-white rounded-lg p-2 w-fit border border-gray-200">
          {!isOrganizer && (
            <button
              onClick={() => setActiveTab('submit')}
              className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all ${
                activeTab === 'submit'
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare size={18} />
              Submit
            </button>
          )}

          {isOrganizer && (
            <>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BarChart3 size={18} />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('responses')}
                className={`px-6 py-2 rounded-md flex items-center gap-2 transition-all ${
                  activeTab === 'responses'
                    ? 'bg-gray-100 text-gray-900 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users size={18} />
                Responses
              </button>
            </>
          )}
        </div>

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && isOrganizer && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Feedback Analytics</h1>
                <p className="text-gray-600 mt-1">Real-time insights on participant satisfaction and engagement</p>
              </div>
              {/* <button
                onClick={handleDownloadPDF}
                disabled={downloadLoading || feedbackLoading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all disabled:opacity-50"
              >
                <Download size={18} />
                {downloadLoading ? 'Downloading...' : 'Download PDF'}
              </button> */}
            </div>

            {feedbackLoading ? (
              <p className="text-gray-600">Loading feedback data...</p>
            ) : stats && eventInfo ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <StatCard
                    icon={Users}
                    label="Total Responses"
                    value={stats.totalFeedback}
                    bgColor="bg-blue-500"
                  />
                  <StatCard
                    icon={Star}
                    label="Average Rating"
                    value={stats.averageRating}
                    bgColor="bg-orange-500"
                  />
                  <StatCard
                    icon={TrendingUp}
                    label="Satisfaction Rate"
                    value="86%"
                    bgColor="bg-green-500"
                  />
                  <StatCard
                    icon={BarChart3}
                    label="Response Rate"
                    value="73%"
                    bgColor="bg-blue-600"
                  />
                </div>

                {/* Rating Distribution */}
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Rating Distribution</h2>
                  <p className="text-gray-600 mb-6">Breakdown of participant ratings across all responses</p>
                  
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
              </>
            ) : (
              <p className="text-gray-600">No feedback data available</p>
            )}
          </div>
        )}

        {/* SUBMIT TAB */}
        {activeTab === 'submit' && !isOrganizer && (
          <div className="max-w-2xl mx-auto">
            {eligibilityLoading ? (
              <p className="text-gray-600">Checking eligibility...</p>
            ) : eligibilityData?.success && eligibilityData?.canSubmit ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Feedback</h2>
                <p className="text-gray-600 mb-6">Help us improve by sharing your experience at the event</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-4">How would you rate this event?</label>
                    {renderStars(5, true)}
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-4">Additional Comments</label>
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Share your thoughts about the event..."
                      className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmitFeedback}
                    disabled={submitLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50"
                  >
                    {submitLoading ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>

                {eligibilityData?.remainingMinutes && (
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    {eligibilityData.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cannot Submit Feedback</h3>
                <p className="text-gray-600">
                  {eligibilityData?.reason || 'You are not eligible to submit feedback for this event.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* RESPONSES TAB */}
        {activeTab === 'responses' && isOrganizer && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Feedback</h2>
              <p className="text-gray-600">Latest responses from event participants</p>
            </div>

            {feedbackLoading ? (
              <p className="text-gray-600">Loading responses...</p>
            ) : feedbacks.length > 0 ? (
              feedbacks.map((feedback) => {
                const initials = feedback.participant.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .toUpperCase();

                return (
                  <div key={feedback._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900">{feedback.participant.name}</h3>
                            <span className="text-sm text-gray-600">{eventInfo?.title}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            📅 {new Date(feedback.submittedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < feedback.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}
                          />
                        ))}
                        <span className="ml-2 font-semibold text-gray-900">{feedback.rating}/5</span>
                      </div>
                    </div>

                    <p className="text-gray-700">{feedback.comments}</p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        📧 {feedback.participant.email} • {feedback.participant.department}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600">No feedback yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}





