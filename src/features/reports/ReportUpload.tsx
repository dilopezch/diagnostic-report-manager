import React, { useRef, useState } from 'react'
import { uploadReport } from '../../services/reports/reportsService'
import { useReportsStore } from '../../store/useReportsStore'
import "../../index.css"

export default function ReportUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error'; text: string } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const addReport = useReportsStore((state) => state.addReport)
  const fileInput = useRef<HTMLInputElement | null>(null)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
    handleFileChange(e.dataTransfer.files)
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);


  const fileInputHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.id === "upload-btn" || target.id === "upload-spn") {
      return;
    }

    fileInput.current?.click();
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const selectedFile = files[0]
    setFile(selectedFile)
    setMessage({ type: 'info', text: "File selected" })
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Select a file' })
      return
    }

    setUploading(true)
    setMessage({ type: 'info', text: "Uploading file..." })

    try {
      const newReport = await uploadReport(file)
      addReport(newReport)
      setMessage({ type: 'success', text: `File "${file.name}" uploaded` })
      setFile(null)

      const input = document.getElementById('file-input') as HTMLInputElement
      if (input) input.value = ''
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error uploading the file'
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full lg:w-96 flex flex-col gap-6 sticky top-10">
      <div
        className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Add Files</h3>
        <div
          className="flex flex-col items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 bg-slate-50 dark:bg-slate-800/20 px-4 py-12 transition-all cursor-pointer group"
          onClick={fileInputHandleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}>
          <div
            className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">cloud_upload</span>
          </div>
          <div className="flex flex-col items-center gap-1" >
            <p className="text-slate-900 dark:text-white text-base font-bold text-center">Upload Files
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm text-center">{file ? file.name : "Drag and drop files here or click browse"}</p>
          </div>
          <button
            id='upload-btn'
            className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors"
            onClick={handleUpload}
            disabled={!file || uploading}
            aria-busy={uploading}
            aria-label={uploading ? 'Uploading file' : 'Upload selected file'}>
            <span id='upload-spn' className="truncate">{uploading ? 'Uploading...' : 'Upload'}</span>
          </button>
          <input
            ref={fileInput}
            id="file-input"
            type="file"
            onChange={(e) => handleFileChange(e.target.files)}
            disabled={uploading}
            aria-label="Select report file"
            aria-describedby="file-help"
            className="hidden"
          />
        </div>
        <br />
        {message && <div
          className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Recent</span>
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="flex gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">            
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-green-900 dark:text-green-100">{message?.text}</p>
              </div>
            </div>
          </div>
        </div>}
      </div>

    </div>
  )
}
