"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumeBuilderPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
    experience: "",
    linkedin: "",
    github: "",
    education: "",
    certifications: "",
  });

  const resumeRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const exportToPDF = async () => {
    const input = resumeRef.current;
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gradient-to-br from-gray-100 to-white min-h-screen">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-blue-800">Resume Builder</h1>

      <Card className="p-6 mb-8 shadow-md bg-white border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Fill Your Details</h2>
        <div className="grid gap-4">
          <Input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
          <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <div>
            <label className="block font-medium mb-1 text-gray-700">Professional Summary</label>
            <textarea name="summary" placeholder="Summary" value={form.summary} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Skills (comma separated)</label>
            <textarea name="skills" placeholder="e.g., JavaScript, React, Node.js" value={form.skills} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Experience</label>
            <textarea name="experience" placeholder="Your past work experience..." value={form.experience} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <Input name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange} />
          <Input name="github" placeholder="GitHub URL" value={form.github} onChange={handleChange} />
          <div>
            <label className="block font-medium mb-1 text-gray-700">Education</label>
            <textarea name="education" placeholder="Education details..." value={form.education} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Certifications</label>
            <textarea name="certifications" placeholder="List your certifications..." value={form.certifications} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <Button onClick={exportToPDF} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">Export as PDF</Button>
      </Card>

      <Card ref={resumeRef} className="p-8 shadow-lg bg-white border border-gray-200">
        <h2 className="text-3xl font-bold mb-2 text-blue-900">{form.fullName}</h2>
        <p className="mb-2 text-gray-700">{form.email} | {form.phone}</p>
        {(form.linkedin || form.github) && (
          <p className="mb-2 text-gray-700">
            {form.linkedin && <span>🔗 <a href={form.linkedin} className="text-blue-600 hover:underline">{form.linkedin}</a></span>}
            {form.linkedin && form.github && " | "}
            {form.github && <span>💻 <a href={form.github} className="text-blue-600 hover:underline">{form.github}</a></span>}
          </p>
        )}
        <hr className="my-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h3>
        <p className="mb-4 text-gray-700">{form.summary}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          {form.skills.split(",").map((skill, idx) => <li key={idx}>{skill.trim()}</li>)}
        </ul>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Experience</h3>
        <p className="text-gray-700">{form.experience}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Education</h3>
        <p className="mb-4 text-gray-700 whitespace-pre-line">{form.education}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Certifications</h3>
        <p className="mb-4 text-gray-700 whitespace-pre-line">{form.certifications}</p>
      </Card>
    </div>
  );
}
 