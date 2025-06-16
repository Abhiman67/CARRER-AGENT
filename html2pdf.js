// Rename this file to html2pdf.tsx to use JSX syntax

import React, { useRef, useState } from "react";

const ResumeBuilder = () => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ fullName: "" });

  const handleExport = async () => {
    if (typeof window === "undefined" || !pdfRef.current) return;
    console.log("Export triggered");

    const html2pdf = (await import("html2pdf.js")).default;

    html2pdf()
      .from(pdfRef.current)
      .set({
        margin: 0.5,
        filename: `${form.fullName || "resume"}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <input
        type="text"
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        className="w-full border rounded p-2"
      />
      <div ref={pdfRef} className="border p-6 rounded shadow bg-white">
        <h1 className="text-xl font-bold">{form.fullName || "Your Name"}</h1>
        <p>This is a sample resume preview.</p>
      </div>
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default ResumeBuilder;