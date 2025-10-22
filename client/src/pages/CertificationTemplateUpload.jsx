

// import { useState } from "react";
// import { useUploadCertificateTemplateMutation } from "@/state/api";
// import { Loader2, Upload } from "lucide-react";
// import { useParams } from "react-router-dom";

// // const CertificateTemplateUpload = ({ eventId }) => {
// const CertificateTemplateUpload = () => {
//   const {eventId} = useParams()   
//   const [file, setFile] = useState(null);
//   const [uploadTemplate, { isLoading }] = useUploadCertificateTemplateMutation();

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file");
//     const formData = new FormData();
//     formData.append("template", file);

//     try {
//       const res = await uploadTemplate({ eventId, formData }).unwrap();
//       if (res.success) alert("Template uploaded successfully!");
//       else alert(res.message);
//     } catch (err) {
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//         Upload Certificate Template
//       </h2>
//       <input
//         type="file"
//         accept="image/*,application/pdf"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="mb-4 border rounded p-2 w-full"
//       />
//       <button
//         onClick={handleUpload}
//         disabled={isLoading}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
//           </>
//         ) : (
//           <>
//             <Upload className="w-5 h-5" /> Upload Template
//           </>
//         )}
//       </button>
//     </div>
//   );
// };

// export default CertificateTemplateUpload;




import { useState } from "react";
import { 
  useUploadCertificateTemplateMutation,
  useGetCertificateTemplateQuery
} from "@/state/api";
import { Loader2, Upload } from "lucide-react";
import { useParams } from "react-router-dom";

const CertificateTemplateUpload = () => {
  const { eventId } = useParams();
  const [file, setFile] = useState(null);
  
  // Fetch existing template
  const { data: templateData, isLoading: isFetching } = useGetCertificateTemplateQuery(eventId);
  
  const [uploadTemplate, { isLoading: isUploading }] = useUploadCertificateTemplateMutation();

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    
    const formData = new FormData();
    formData.append("template", file);

    try {
      const res = await uploadTemplate({ eventId, formData }).unwrap();
      if (res.success) {
        alert("Template uploaded successfully!");
        setFile(null);
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(err?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Upload Certificate Template
      </h2>
      
      {/* Show existing template if available */}
      {isFetching ? (
        <div className="mb-4 p-4 bg-gray-50 rounded">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : templateData?.success && templateData?.data?.templateUrl ? (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-800 mb-2">Current Template:</p>
          <img 
            src={templateData.data.templateUrl} 
            alt="Certificate Template" 
            className="max-w-full h-auto rounded"
          />
        </div>
      ) : (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">No template uploaded yet</p>
        </div>
      )}

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 border rounded p-2 w-full"
      />
      
      <button
        onClick={handleUpload}
        disabled={isUploading || !file}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 w-full"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" /> Upload Template
          </>
        )}
      </button>
    </div>
  );
};

export default CertificateTemplateUpload;