import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

// Load worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Step5Agreement = ({ formData, setFormData, nextStep,prevStep }) => {
  const [numPages, setNumPages] = useState(null);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Moto Trekkin Rental Agreement</h2>
      <div className="border h-[500px] overflow-y-scroll">
        <Document
          file="/agreement.pdf" // put agreement file in /public folder
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>

      <label className="mt-4 block">
        <input
          type="checkbox"
          checked={formData.agreed || false}
          onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
        />
        I have read and agree to the rental agreement
      </label>

       <div className="flex justify-between mt-4">
  <button
    onClick={prevStep}
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
  >
    Previous
  </button>
  <button
    onClick={nextStep}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Next
  </button>
</div>

    </div>
  );
};

export default Step5Agreement;
