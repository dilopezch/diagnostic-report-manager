import { useState } from 'react'
import { uploadReport } from '../../services/reports/reportsService'
import { useReportsStore } from '../../store/useReportsStore'
import "../../index.css"

export default function ReportUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error'; text: string } | null>(null)
  const addReport = useReportsStore((state) => state.addReport)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setMessage({ type: 'info', text: "File selected"})
  }

  const alertColor = (messagerType: string | undefined) => {
    if(!messagerType || messagerType === 'info'){
      return 'blue'
    }

    if(messagerType=== 'error'){
      return 'red'
    }
    
    return 'green'
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Select a file' })
      return
    }

    setUploading(true)
    setMessage({ type: 'info', text: "Uploading file..."})

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
    <div>
      <h3 id="upload-heading" className=''>Upload Report</h3>
      <div
        style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}
        role="group"
        aria-labelledby="upload-heading"
      >
        <label htmlFor="file-input" style={{ display: 'block', marginBottom: 8 }}>
          <span style={{ display: 'none' }}>Select a report file to upload</span>
        </label>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          aria-label="Select report file"
          aria-describedby="file-help"
          style={{ flex: 1 }}
        />
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          aria-busy={uploading}
          aria-label={uploading ? 'Uploading file' : 'Upload selected file'}
          style={{ padding: '8px 16px' }}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      <p
          role='alert' 
          aria-live="assertive"
          style={{ 
          marginTop: 8, 
          color: alertColor(message?.type)
        }}          
        >
          {message?.text}
        </p>      
    </div>
  )
}
