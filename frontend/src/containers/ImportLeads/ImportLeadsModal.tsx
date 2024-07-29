import CloseIcon from '../../components/atoms/CloseSvg.tsx'
import { ChangeEvent, useEffect, useState } from 'react'
import { api } from '../../api'
import { DataSheetGrid, keyColumn, textColumn } from 'react-datasheet-grid'
import { Button } from '../../components/atoms/Button.tsx'
import styles from './styles.module.css'
import { selectColumn } from '../../components/organisms/DataGrid/Select/selectColumn.ts'
import { ProcessImportOutput } from '../../api/types/imports/processImport.ts'

const columns = [
  {
    ...keyColumn(
      'isValid',
      selectColumn({
        choices: [
          // @ts-expect-error allow boolean to avoid creating a new column type
          { value: true, label: 'Yes' },
          // @ts-expect-error allow boolean
          { value: false, label: 'No' },
        ],
      })
    ),
    title: 'Is valid?',
    disabled: true,
  },
  {
    ...keyColumn('firstName', textColumn),
    title: 'First Name',
    disabled: true,
  },
  {
    ...keyColumn('lastName', textColumn),
    title: 'Last Name',
    disabled: true,
  },
  {
    ...keyColumn('email', textColumn),
    title: 'Email',
    disabled: true,
  },
  {
    ...keyColumn('jobTitle', textColumn),
    title: 'Job Title',
    disabled: true,
  },
  {
    ...keyColumn('yearsInRole', textColumn),
    title: 'Years In Role',
    disabled: true,
  },
  {
    ...keyColumn('phoneNumber', textColumn),
    title: 'Phone Number',
    disabled: true,
  },
  {
    ...keyColumn('companyName', textColumn),
    title: 'Company Name',
    disabled: true,
  },
  {
    ...keyColumn('countryCode', textColumn),
    title: 'Country',
    disabled: true,
  },
]

export default function ImportLeadsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>(null)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [fileData, setFileData] = useState<ProcessImportOutput | undefined>(undefined)
  const onFileAdded = (data: ChangeEvent<HTMLInputElement>) => {
    const fileName = data.target.value
    if (fileName && !/(\.csv)$/i.exec(fileName)) {
      setFileErrorMessage('Please select a valid .csv file')
      return
    } else {
      setFileErrorMessage(null)
    }

    const file = data.target.files?.[0]
    setFile(file)
  }

  useEffect(() => {
    const processCsv = async (_file: File) => {
      const formData = new FormData()
      formData.append('file', _file)
      return await api.imports.process(formData)
    }
    if (file) {
      processCsv(file).then((data) => {
        setFileData(data)
      })
    }
  }, [file])

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed top-0 left-0 w-full h-dvh flex justify-center items-center z-30 bg-glass">
            <div className="max-w-6xl m-auto bg-white w-full min-h-96 max-h-dvh border-2 border-gray-500 rounded-2xl shadow-xl overflow-scroll">
              <div className="flex justify-between p-2">
                <div className="font-bold text-2xl">Import Leads from CSV</div>
                <div className={'cursor-pointer'} onClick={onClose}>
                  <CloseIcon />
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <div className="px-2 mt-2 text-xl">
                  <div className="mb-2 flex">
                    {!file && (
                      <>
                        Add new<pre> .csv </pre>file
                      </>
                    )}
                  </div>
                  <input type="file" accept=".csv" onChange={onFileAdded} />
                  {fileErrorMessage && <div className="text-red-500">{fileErrorMessage}</div>}
                </div>
              </div>
              {fileData && (
                <>
                  <div className="my-2">
                    <DataSheetGrid
                      value={fileData.leads}
                      columns={columns}
                      rowKey={'id'}
                      addRowsComponent={false}
                      cellClassName={({ rowData }) => {
                        // @ts-expect-error rowData is unknown on the library
                        if (rowData['isValid'] === false) {
                          return styles.invalid
                        }
                        return ''
                      }}
                    ></DataSheetGrid>
                  </div>
                  <div className="m-2 flex justify-end">
                    <Button className="w-72" onClick={() => console.log('subir')}>
                      Import
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
