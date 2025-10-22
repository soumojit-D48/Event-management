import { use, useEffect } from "react";
import {
  useCheckCertificateEligibilityQuery,
  useGenerateCertificateMutation,
  useGetMyCertificateQuery,
} from "@/state/api";
import {
  Award,
  Download,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";

// const ParticipantCertificatePage = ({ eventId }) => {
const ParticipantCertificatePage = () => {
    const {eventId} = useParams()
    const eventTitle = "Event"
  // Check eligibility
  const {
    data: eligibilityData,
    isLoading: loading,
    refetch,
  } = useCheckCertificateEligibilityQuery(eventId);

  // Generate certificate
  const [generateCertificate, { isLoading: generating }] =
    useGenerateCertificateMutation();

  // Get my certificate
  const { data: myCertData, refetch: refetchCert } =
    useGetMyCertificateQuery(eventId);

  const eligibility = eligibilityData?.data || {};
  const certificateUrl = myCertData?.data?.certificateUrl || eligibility.certificateUrl;

  const handleGenerateCertificate = async () => {
    try {
      const res = await generateCertificate(eventId).unwrap();
      if (res.success) {
        alert("Certificate generated successfully!");
        refetch();
        refetchCert();
      } else {
        alert("Failed to generate: " + res.message);
      }
    } catch (err) {
      alert("Certificate generation failed");
    }
  };

  const handleDownload = () => {
    if (certificateUrl) {
      window.open(certificateUrl, "_blank");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Certificate</h1>
              <p className="text-gray-600">{eventTitle}</p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="space-y-3 mb-6">
            {/* Attendance */}
            <StatusCard
              valid={eligibility.hasAttended}
              title="Event Attendance"
              validMsg="You have attended this event"
              invalidMsg="You must attend the event to receive a certificate"
            />
            {/* Template */}
            <StatusCard
              valid={eligibility.hasTemplate}
              title="Certificate Template"
              validMsg="Template is available"
              invalidMsg="Organizer has not uploaded a certificate template yet"
              warn
            />
            {/* Enabled */}
            <StatusCard
              valid={eligibility.certificatesEnabled}
              title="Certificate Distribution"
              validMsg="Certificates are enabled for this event"
              invalidMsg="Certificates are not enabled yet"
              warn
            />
          </div>

          {/* Action Section */}
          <div className="border-t pt-6">
            {certificateUrl ? (
              <CertificateGenerated onDownload={handleDownload} />
            ) : eligibility.canGenerate ? (
              <GenerateButton
                generating={generating}
                onGenerate={handleGenerateCertificate}
              />
            ) : (
              <PendingMessage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Small reusable UI pieces
const StatusCard = ({ valid, title, validMsg, invalidMsg, warn }) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
      valid
        ? "bg-green-50 border-green-200"
        : warn
        ? "bg-yellow-50 border-yellow-200"
        : "bg-red-50 border-red-200"
    }`}
  >
    {valid ? (
      <CheckCircle className="w-6 h-6 text-green-600" />
    ) : warn ? (
      <AlertCircle className="w-6 h-6 text-yellow-600" />
    ) : (
      <XCircle className="w-6 h-6 text-red-600" />
    )}
    <div>
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-sm text-gray-600">{valid ? validMsg : invalidMsg}</p>
    </div>
  </div>
);

const CertificateGenerated = ({ onDownload }) => (
  <div className="text-center">
    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-4">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Certificate Generated!
      </h3>
      <p className="text-gray-600 mb-4">
        Your certificate has been generated and is ready to download
      </p>
    </div>
    <button
      onClick={onDownload}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
    >
      <Download className="w-5 h-5" />
      Download Certificate
    </button>
  </div>
);

const GenerateButton = ({ generating, onGenerate }) => (
  <div className="text-center">
    <p className="text-gray-700 mb-4">
      You are eligible to generate your certificate!
    </p>
    <button
      onClick={onGenerate}
      disabled={generating}
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
    >
      {generating ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" /> Generating...
        </>
      ) : (
        <>
          <Award className="w-5 h-5" /> Generate Certificate
        </>
      )}
    </button>
  </div>
);

const PendingMessage = () => (
  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
    <p className="text-gray-600">
      You’re not yet eligible to generate your certificate.
    </p>
  </div>
);

export default ParticipantCertificatePage;
