import { useState } from 'react'
import { uploadReport } from '../../services/reports/reportsService'
import { useReportsStore } from '../../store/useReportsStore'

export default function ReportUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const addReport = useReportsStore((state) => state.addReport)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setMessage(null)
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Select a file' })
      return
    }

    setUploading(true)
    setMessage(null)

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
    <div className="card" style={{ marginBottom: 16 }}>
      <h3>Upload Report</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ flex: 1 }}
        />
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{ padding: '8px 16px' }}
        >
          {uploading ? 'Uploading...' : 'upload'}
        </button>
      </div>
      {message && (
        <p style={{ 
          marginTop: 8, 
          color: message.type === 'error' ? 'red' : 'green' 
        }}>
          {message.text}
        </p>
      )}
    </div>
  )
}
