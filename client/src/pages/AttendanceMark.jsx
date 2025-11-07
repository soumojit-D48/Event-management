// import { useState } from "react";
// import { useMarkAttendanceMutation } from "../state/api";
// import {QrReader} from "react-qr-reader";

// import { useParams } from "react-router-dom";

// // export default function AttendanceScanner({ eventId }) {
// export default function AttendanceScanner() {
//   const [message, setMessage] = useState("");
//   const [markAttendance] = useMarkAttendanceMutation();

//   const { eventId } = useParams();

//   const handleScan = async (data) => {
//     if (!data) return;

//     try {
//       // Parse QR code JSON (contains registrationId)
//       const qrData = JSON.parse(data);
//       const registrationId = qrData.registrationId;

//       // Automatically mark attendance
//       const res = await markAttendance({ eventId, registrationId }).unwrap();
//       setMessage(`✅ ${res.data.participant.name} checked in!`);
//     } catch (err) {
//       if (err?.data?.alreadyCheckedIn) {
//         setMessage("⚠️ Participant already checked in");
//       } else {
//         setMessage("❌ Check-in failed");
//       }
//       console.error(err);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     setMessage("❌ Camera error");
//   };

//   return (
//     <div>
//       <h2>Scan Participant QR Code</h2>
//       {/* <QrReader
//         delay={300}
//         onError={handleError}
//         onScan={handleScan}
//         style={{ width: "100%" }}
//       /> */}

//       <QrReader
//       constraints={{ facingMode: "environment" }} // ✅ specify camera
//       scanDelay={300} // instead of 'delay'
//       onResult={(result, error) => {
//         if (!!result) handleScan(result?.text);
//         if (!!error) handleError(error);
//       }}
//       style={{ width: "100%" }}
//     />
//       <p>{message}</p>
//     </div>
//   );
// }









// import { useEffect, useRef, useState } from "react";
// import { useMarkAttendanceMutation } from "../state/api";
// import { Html5Qrcode } from "html5-qrcode";
// import { useParams } from "react-router-dom";

// export default function AttendanceScanner() {
//   const { eventId } = useParams();
//   const [message, setMessage] = useState("");
//   const [markAttendance] = useMarkAttendanceMutation();
//   const scannerRef = useRef(null);

//   useEffect(() => {
//     const config = {
//       fps: 10,
//       qrbox: 250,
//     };

//     const html5QrcodeScanner = new Html5Qrcode("reader");

//     // const onScanSuccess = async (decodedText, decodedResult) => {
//     //   try {
//     //     // Parse QR code JSON (contains registrationId)
//     //     const qrData = JSON.parse(decodedText);
//     //     const registrationId = qrData.registrationId;

//     //     console.log(qrData, "ghfchfv");
//     //     console.log(registrationId, "ghfchfv");
        
//     //     // Prevent duplicate scans
//     //     html5QrcodeScanner.pause();

//     //     // Automatically mark attendance via RTK Query
//     //     const res = await markAttendance({ eventId, registrationId }).unwrap();
//     //     setMessage(`✅ ${res.data.participant.name} checked in!`);

//     //     // Resume scanning after 3 seconds
//     //     setTimeout(() => {
//     //       setMessage("");
//     //       html5QrcodeScanner.resume();
//     //     }, 3000);
//     //   } catch (err) {
//     //     console.error(err);
//     //     if (err?.data?.alreadyCheckedIn) {
//     //       setMessage("⚠️ Participant already checked in");
//     //     } else {
//     //       setMessage("❌ Check-in failed");
//     //     }
//     //     setTimeout(() => setMessage(""), 3000);
//     //   }
//     // };


//     let scanned = false;

// const onScanSuccess = async (decodedText) => {
//   if (scanned) return; // ✅ prevent duplicate
//   scanned = true;

//   try {
//     const qrData = JSON.parse(decodedText);
//     const registrationId = qrData.registrationId;

//     console.log(qrData, "tyftfgh");
//     console.log(registrationId, "tyftfghytyt");
    
//     const res = await markAttendance({ eventId, registrationId }).unwrap();
//     setMessage(`✅ ${res.data.participant.name} checked in!`);
//   } catch (err) {
//     console.error(err);
//     setMessage("❌ Check-in failed");
//   }

//   // Optional: restart scanner after 3 seconds for next participant
//   setTimeout(() => { scanned = false; }, 3000);
// };

//     const onScanFailure = (error) => {
//       // You can log or ignore scan failures
//       console.warn("QR scan failed:", error);
//     };

//     Html5Qrcode.getCameras()
//       .then((devices) => {
//         if (devices && devices.length) {
//           const cameraId = devices[0].id;
//           html5QrcodeScanner.start(cameraId, config, onScanSuccess, onScanFailure);
//         }
//       })
//       .catch((err) => console.error("Error getting cameras:", err));

//     scannerRef.current = html5QrcodeScanner;

//     return () => {
//       // Stop scanning on unmount
//       if (scannerRef.current) {
//         scannerRef.current.stop().catch((err) => console.error("Stop failed:", err));
//       }
//     };
//   }, [eventId, markAttendance]);

//   return (
//     <div>
//       <h2>Scan Participant QR Code</h2>
//       <div id="reader" style={{ width: "100%" }}></div>
//       <p>{message}</p>
//     </div>
//   );
// }










// import React, { useState, useEffect, useRef } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';
// import { CheckCircle2, XCircle, Camera, Users, Clock, User } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { useMarkAttendanceMutation } from '@/state/api';
// import { useParams } from 'react-router-dom';

// // Mock API hook - Replace with your actual RTK Query hook
// // const useMarkAttendanceMutation = () => {
// //   const [isLoading, setIsLoading] = useState(false);
  
// //   const markAttendance = async ({ eventId, registrationId }) => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch(`/api/attendance/mark/${eventId}`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include',
// //         body: JSON.stringify({ registrationId })
// //       });
// //       const data = await response.json();
// //       setIsLoading(false);
// //       return { data };
// //     } catch (error) {
// //       setIsLoading(false);
// //       throw error;
// //     }
// //   };

// //   return [markAttendance, { isLoading }];
// // };

// // const AttendanceScanner = ({ eventId }) => {
// const AttendanceScanner = () => {
//   const { eventId } = useParams();
//   const [markAttendance, { isLoading }] = useMarkAttendanceMutation();
//   const [scanResult, setScanResult] = useState(null);
//   const [scanHistory, setScanHistory] = useState([]);
//   const [isScanning, setIsScanning] = useState(true);
//   const scannerRef = useRef(null);
//   const qrScannerRef = useRef(null);

//   useEffect(() => {
//     if (!eventId) return;

//     // Initialize QR Scanner
//     const scanner = new Html5QrcodeScanner(
//       "qr-reader",
//       {
//         fps: 10,
//         qrbox: { width: 250, height: 250 },
//         aspectRatio: 1.0,
//         showTorchButtonIfSupported: true,
//       },
//       false
//     );

//     qrScannerRef.current = scanner;

//     const onScanSuccess = async (decodedText) => {
//       try {
//         // Parse QR code data
//         const qrData = JSON.parse(decodedText);
//         const { registrationId, participantName } = qrData;

//         if (!registrationId) {
//           setScanResult({
//             success: false,
//             message: "Invalid QR code format",
//           });
//           return;
//         }

//         // Pause scanning during API call
//         scanner.pause(true);

//         // Show processing state
//         setScanResult({
//           success: null,
//           message: `Processing ${participantName || 'participant'}...`,
//           isProcessing: true,
//         });

//         // Call API automatically
//         const result = await markAttendance({ eventId, registrationId });

//         if (result.data?.success) {
//           // Success - show green alert
//           const participant = result.data.data.participant;
//           setScanResult({
//             success: true,
//             message: result.data.message,
//             participant: participant.name,
//             email: participant.email,
//             time: new Date().toLocaleTimeString(),
//           });

//           // Add to history
//           setScanHistory(prev => [{
//             id: registrationId,
//             name: participant.name,
//             time: new Date().toLocaleTimeString(),
//             status: 'success'
//           }, ...prev.slice(0, 9)]); // Keep last 10

//           // Play success sound
//           playSuccessSound();

//           // Resume scanning after 2 seconds
//           setTimeout(() => {
//             setScanResult(null);
//             scanner.resume();
//           }, 2000);
//         } else {
//           // Error - show red alert
//           setScanResult({
//             success: false,
//             message: result.data?.message || "Failed to mark attendance",
//             alreadyCheckedIn: result.data?.alreadyCheckedIn,
//           });

//           // Resume scanning after 3 seconds
//           setTimeout(() => {
//             setScanResult(null);
//             scanner.resume();
//           }, 3000);
//         }
//       } catch (error) {
//         console.error("Scan error:", error);
//         setScanResult({
//           success: false,
//           message: "Invalid QR code or server error",
//         });

//         // Resume scanning after 3 seconds
//         setTimeout(() => {
//           setScanResult(null);
//           scanner.resume();
//         }, 3000);
//       }
//     };

//     const onScanError = (errorMessage) => {
//       // Silent - normal scanning behavior
//     };

//     scanner.render(onScanSuccess, onScanError);

//     return () => {
//       if (qrScannerRef.current) {
//         qrScannerRef.current.clear().catch(console.error);
//       }
//     };
//   }, [eventId, markAttendance]);

//   const playSuccessSound = () => {
//     const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVanm8LBcFglAnN7v');
//     audio.play().catch(() => {});
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//             <Camera className="w-8 h-8 text-indigo-600" />
//             Attendance Scanner
//           </h1>
//           <p className="text-gray-600 mt-1">Scan participant QR codes to mark attendance</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Scanner Section */}
//           <div className="md:col-span-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Camera className="w-5 h-5" />
//                   QR Code Scanner
//                 </CardTitle>
//                 <CardDescription>
//                   Point your camera at the participant's QR code
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {/* QR Scanner */}
//                 <div 
//                   id="qr-reader" 
//                   ref={scannerRef}
//                   className="rounded-lg overflow-hidden border-4 border-indigo-200"
//                 />

//                 {/* Scan Result Alert */}
//                 {scanResult && (
//                   <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
//                     {scanResult.isProcessing ? (
//                       <Alert className="border-blue-200 bg-blue-50">
//                         <div className="flex items-center gap-3">
//                           <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
//                           <AlertDescription className="text-blue-900 font-medium">
//                             {scanResult.message}
//                           </AlertDescription>
//                         </div>
//                       </Alert>
//                     ) : scanResult.success ? (
//                       <Alert className="border-green-200 bg-green-50">
//                         <CheckCircle2 className="h-5 w-5 text-green-600" />
//                         <AlertDescription className="text-green-900">
//                           <div className="font-semibold text-lg">{scanResult.message}</div>
//                           <div className="mt-2 space-y-1 text-sm">
//                             <div className="flex items-center gap-2">
//                               <User className="w-4 h-4" />
//                               <span>{scanResult.participant}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <Clock className="w-4 h-4" />
//                               <span>{scanResult.time}</span>
//                             </div>
//                           </div>
//                         </AlertDescription>
//                       </Alert>
//                     ) : (
//                       <Alert className="border-red-200 bg-red-50">
//                         <XCircle className="h-5 w-5 text-red-600" />
//                         <AlertDescription className="text-red-900">
//                           <div className="font-semibold">{scanResult.message}</div>
//                           {scanResult.alreadyCheckedIn && (
//                             <div className="text-sm mt-1">Participant was already checked in earlier</div>
//                           )}
//                         </AlertDescription>
//                       </Alert>
//                     )}
//                   </div>
//                 )}

//                 {/* Loading State */}
//                 {isLoading && (
//                   <div className="mt-4 flex items-center justify-center gap-2 text-indigo-600">
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent" />
//                     <span className="text-sm font-medium">Marking attendance...</span>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Recent Scans Sidebar */}
//           <div>
//             <Card className="sticky top-4">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Users className="w-5 h-5" />
//                   Recent Check-ins
//                 </CardTitle>
//                 <CardDescription>
//                   Last 10 scanned participants
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {scanHistory.length === 0 ? (
//                   <div className="text-center py-8 text-gray-400">
//                     <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                     <p className="text-sm">No scans yet</p>
//                   </div>
//                 ) : (
//                   <div className="space-y-2">
//                     {scanHistory.map((scan, index) => (
//                       <div
//                         key={`${scan.id}-${index}`}
//                         className="p-3 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-1 duration-300"
//                       >
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="font-medium text-gray-900 text-sm">
//                               {scan.name}
//                             </div>
//                             <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
//                               <Clock className="w-3 h-3" />
//                               {scan.time}
//                             </div>
//                           </div>
//                           <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Instructions */}
//         <Card className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
//           <CardContent className="pt-6">
//             <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//               <Camera className="w-5 h-5 text-indigo-600" />
//               How to Use
//             </h3>
//             <ol className="space-y-2 text-sm text-gray-700">
//               <li className="flex items-start gap-2">
//                 <Badge variant="outline" className="mt-0.5">1</Badge>
//                 <span>Ask the participant to show their QR code</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Badge variant="outline" className="mt-0.5">2</Badge>
//                 <span>Point your camera at the QR code</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Badge variant="outline" className="mt-0.5">3</Badge>
//                 <span>Wait for automatic scanning and attendance marking</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <Badge variant="outline" className="mt-0.5">4</Badge>
//                 <span>Success message will appear automatically</span>
//               </li>
//             </ol>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AttendanceScanner;



















import React, { useState, useEffect, useRef, use } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { CheckCircle2, XCircle, Camera, Users, Clock, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMarkAttendanceMutation } from '@/state/api';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layoutComponents/DashboardLayout';



const AttendanceScanner = () => {
  const {eventId} = useParams();
  const [markAttendance, { isLoading }] = useMarkAttendanceMutation();
  const [scanResult, setScanResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef(null);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    if (!eventId) return;

    // Initialize QR Scanner
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
      },
      false
    );

    qrScannerRef.current = scanner;

    const onScanSuccess = async (decodedText) => {
      try {
        // Parse QR code data
        const qrData = JSON.parse(decodedText);
        const { registrationId, eventId, participantName } = qrData;

        if (!registrationId) {
          setScanResult({
            success: false,
            message: "Invalid QR code: Missing registrationId",
          });
          return;
        }

        if (!eventId) {
          setScanResult({
            success: false,
            message: "Invalid QR code: Missing eventId",
          });
          return;
        }

        // Pause scanning during API call
        scanner.pause(true);

        // Show processing state
        setScanResult({
          success: null,
          message: `Processing ${participantName || 'participant'}...`,
          isProcessing: true,
        });

        // Call API automatically
        const result = await markAttendance({ eventId, registrationId });

        if (result.data?.success) {
          // Success - show green alert
          const participant = result.data.data.participant;
          setScanResult({
            success: true,
            message: result.data.message,
            participant: participant.name,
            email: participant.email,
            time: new Date().toLocaleTimeString(),
          });

          // Add to history
          setScanHistory(prev => [{
            id: registrationId,
            name: participant.name,
            time: new Date().toLocaleTimeString(),
            status: 'success'
          }, ...prev.slice(0, 9)]); // Keep last 10

          // Play success sound
          playSuccessSound();

          // Resume scanning after 2 seconds
          setTimeout(() => {
            setScanResult(null);
            scanner.resume();
          }, 2000);
        } else {
          // Error - show red alert
          setScanResult({
            success: false,
            message: result.data?.message || "Failed to mark attendance",
            alreadyCheckedIn: result.data?.alreadyCheckedIn,
          });

          // Resume scanning after 3 seconds
          setTimeout(() => {
            setScanResult(null);
            scanner.resume();
          }, 3000);
        }
      } catch (error) {
        console.error("Scan error:", error);
        setScanResult({
          success: false,
          message: "Invalid QR code or server error",
        });

        // Resume scanning after 3 seconds
        setTimeout(() => {
          setScanResult(null);
          scanner.resume();
        }, 3000);
      }
    };






    const onScanError = (errorMessage) => {
      // Silent - normal scanning behavior

      console.log(errorMessage, "");
      
    };

    scanner.render(onScanSuccess, onScanError);

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch(console.error);
      }
    };
  }, [eventId, markAttendance]);

  const playSuccessSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVanm8LBcFglAnN7v');
    audio.play().catch(() => {});
  };

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Camera className="w-8 h-8 text-indigo-600" />
            Attendance Scanner
          </h1>
          <p className="text-gray-600 mt-1">Scan participant QR codes to mark attendance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Scanner Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  QR Code Scanner
                </CardTitle>
                <CardDescription>
                  Point your camera at the participant's QR code
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* QR Scanner */}
                <div 
                  id="qr-reader" 
                  ref={scannerRef}
                  className="rounded-lg overflow-hidden border-4 border-indigo-200"
                />

                {/* Scan Result Alert */}
                {scanResult && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {scanResult.isProcessing ? (
                      <Alert className="border-blue-200 bg-blue-50">
                        <div className="flex items-center gap-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent" />
                          <AlertDescription className="text-blue-900 font-medium">
                            {scanResult.message}
                          </AlertDescription>
                        </div>
                      </Alert>
                    ) : scanResult.success ? (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <AlertDescription className="text-green-900">
                          <div className="font-semibold text-lg">{scanResult.message}</div>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{scanResult.participant}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{scanResult.time}</span>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert className="border-red-200 bg-red-50">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <AlertDescription className="text-red-900">
                          <div className="font-semibold">{scanResult.message}</div>
                          {scanResult.alreadyCheckedIn && (
                            <div className="text-sm mt-1">Participant was already checked in earlier</div>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                {/* Loading State */}
                {isLoading && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-indigo-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent" />
                    <span className="text-sm font-medium">Marking attendance...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Scans Sidebar */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Check-ins
                </CardTitle>
                <CardDescription>
                  Last 10 scanned participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                {scanHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No scans yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {scanHistory.map((scan, index) => (
                      <div
                        key={`${scan.id}-${index}`}
                        className="p-3 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-1 duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">
                              {scan.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {scan.time}
                            </div>
                          </div>
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-600" />
              How to Use
            </h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">1</Badge>
                <span>Ask the participant to show their QR code</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">2</Badge>
                <span>Point your camera at the QR code</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">3</Badge>
                <span>Wait for automatic scanning and attendance marking</span>
              </li>
              <li className="flex items-start gap-2">
                <Badge variant="outline" className="mt-0.5">4</Badge>
                <span>Success message will appear automatically</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default AttendanceScanner;



//     const onScanSuccess = async (decodedText) => {
//   try {
//     // 1. Parse QR code
//     console.log('🔍 Raw QR Data:', decodedText);
//     const qrData = JSON.parse(decodedText);
//     console.log('📱 Parsed QR:', qrData);
    
//     // 2. Extract fields
//     const { registrationId, eventId: qrEventId, participantName } = qrData;
    
//     // 3. Validate
//     console.log('✅ Registration ID:', registrationId);
//     console.log('✅ QR Event ID:', qrEventId);
//     console.log('✅ Current Event ID:', eventId);
    
//     if (!registrationId) {
//       console.error('❌ Missing registrationId in QR');
//       setScanResult({
//         success: false,
//         message: "Invalid QR code: Missing registration ID"
//       });
//       setTimeout(() => {
//         setScanResult(null);
//         scanner.resume();
//       }, 3000);
//       return;
//     }

//     // 4. Check event match
//     if (qrEventId && qrEventId !== eventId) {
//       console.error('❌ Event mismatch:', { qrEventId, currentEventId: eventId });
//       setScanResult({
//         success: false,
//         message: "This QR code is for a different event"
//       });
//       setTimeout(() => {
//         setScanResult(null);
//         scanner.resume();
//       }, 3000);
//       return;
//     }

//     // 5. Pause scanner
//     scanner.pause(true);

//     // 6. Show processing
//     setScanResult({
//       success: null,
//       message: `Processing ${participantName || 'participant'}...`,
//       isProcessing: true
//     });

//     // 7. Prepare API call
//     const apiPayload = { eventId, registrationId };
//     console.log('📤 Sending to API:', apiPayload);
//     console.log('📍 API URL:', `/api/attendance/mark/${eventId}`);

//     // 8. Call API with .unwrap()
//     try {
//       const result = await markAttendance(apiPayload).unwrap();
//       console.log('✅ API Success:', result);

//       // Success handling
//       const participant = result.data.participant;
//       setScanResult({
//         success: true,
//         message: result.message,
//         participant: participant.name,
//         email: participant.email,
//         time: new Date().toLocaleTimeString(),
//         alreadyCheckedIn: result.alreadyCheckedIn || false,
//       });

//       // Add to history
//       setScanHistory(prev => [{
//         id: registrationId,
//         name: participant.name,
//         time: new Date().toLocaleTimeString(),
//         status: 'success'
//       }, ...prev.slice(0, 9)]);

//       // Play sound
//       playSuccessSound();

//       // Resume after 2 seconds
//       setTimeout(() => {
//         setScanResult(null);
//         scanner.resume();
//       }, 2000);

//     } catch (apiError) {
//       // API call failed
//       console.error('❌ API Error:', apiError);
//       console.error('❌ Error Status:', apiError.status);
//       console.error('❌ Error Data:', apiError.data);
//       console.error('❌ Error Original:', apiError.originalStatus);

//       let errorMessage = "Server error";
//       let alreadyCheckedIn = false;

//       // Extract error details
//       if (apiError.data) {
//         errorMessage = apiError.data.message || errorMessage;
//         alreadyCheckedIn = apiError.data.alreadyCheckedIn || false;
        
//         console.log('📋 Backend Message:', errorMessage);
//         console.log('📋 Already Checked In?:', alreadyCheckedIn);
//       } else if (apiError.error) {
//         errorMessage = apiError.error;
//       }

//       setScanResult({
//         success: false,
//         message: errorMessage,
//         alreadyCheckedIn: alreadyCheckedIn,
//       });

//       // Resume after 3 seconds
//       setTimeout(() => {
//         setScanResult(null);
//         scanner.resume();
//       }, 3000);
//     }

//   } catch (parseError) {
//     // JSON parse error
//     console.error('❌ QR Parse Error:', parseError);
//     console.error('❌ Invalid QR Content:', decodedText);
    
//     setScanResult({
//       success: false,
//       message: "Invalid QR code format (not JSON)",
//     });

//     setTimeout(() => {
//       setScanResult(null);
//       scanner.resume();
//     }, 3000);
//   }
// };