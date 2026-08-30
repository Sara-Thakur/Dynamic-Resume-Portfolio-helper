import React, { useState } from 'react';
import { Download, Loader2, CheckCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const ExportPDFButton = ({ elementId = 'resume-preview', filename = 'ATS_Resume.pdf' }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { formData } = usePortfolio();

  const handleDownloadPDF = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      alert('Resume element not found for PDF export.');
      return;
    }

    setDownloading(true);
    setDownloadSuccess(false);

    try {
      // Dynamic import of html2pdf.js for optimal browser compatibility
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const userName = (formData.personal?.fullName || 'ATS_Resume').replace(/[^a-zA-Z0-9]/g, '_');
      const outputFilename = `${userName}_ATS_Resume.pdf`;

      const options = {
        margin: [10, 10, 10, 10], // top, left, bottom, right in mm
        filename: outputFilename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };

      await html2pdf().set(options).from(element).save();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF Export Error:', err);
      // Fallback native window.print() if html2pdf fails
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownloadPDF}
      disabled={downloading}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-all ${
        downloadSuccess
          ? 'bg-emerald-600 hover:bg-emerald-700'
          : downloading
          ? 'bg-slate-400 cursor-wait'
          : 'bg-sky-600 hover:bg-sky-700 active:scale-95 shadow-sky-600/20'
      }`}
    >
      {downloading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Generating ATS PDF...</span>
        </>
      ) : downloadSuccess ? (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>PDF Downloaded!</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span>Download ATS-Friendly PDF</span>
        </>
      )}
    </button>
  );
};
