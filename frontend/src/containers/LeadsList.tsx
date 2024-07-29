import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { api } from '../api'
import { checkboxColumn, DataSheetGrid, keyColumn, textColumn } from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/style.css'
import { selectColumn } from '../components/organisms/DataGrid/Select/selectColumn.ts'
import { Lead } from '../types/Lead.ts'
import ActionsBar from '../components/atoms/ActionsBar.tsx'
import { Button } from '../components/atoms/Button.tsx'
import { useUIMessages } from '../UIProvider.tsx'
import MessageGenerationModal from './MessageGeneration/MessageGenerationModal.tsx'
import { capitalize } from 'lodash'
import ImportLeadsModal from './ImportLeads/ImportLeadsModal.tsx'
import countries from '../utils/countries.json'
import dayjs from 'dayjs'

export const LeadsList: FC = () => {
  const [leadsData, setLeadsData] = useState<Lead[]>([])
  const [allSelected, setAllSelected] = useState<boolean | null>(null)
  const { showLoading, hideLoading, showAlert, hideAlert, showPopUp, hidePopUp } = useUIMessages()
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showImportLeadsModal, setShowImportLeadsModal] = useState(false)

  const selectedLeads = leadsData.filter((lead) => lead.isSelected)

  const columns = [
    {
      ...keyColumn('isSelected', checkboxColumn),
      title: (
        <div className="flex items-center justify-center w-full">
          <button className="text-xs mr-2" onClick={() => setAllSelected(true)}>
            All
          </button>
          <button className="text-xs" onClick={() => setAllSelected(false)}>
            None
          </button>
        </div>
      ),
      center: true,
      headerClassName: 'w-full',
      minWidth: 180,
    },
    {
      ...keyColumn('firstName', textColumn),
      title: 'First Name',
    },
    {
      ...keyColumn('lastName', textColumn),
      title: 'Last Name',
    },
    {
      ...keyColumn(
        'gender',
        selectColumn({
          choices: ['female', 'male']?.map((data) => {
            return {
              value: data,
              label: capitalize(data),
            }
          }),
        })
      ),
      title: 'Gender',
      minWidth: 160,
    },
    {
      ...keyColumn('message', textColumn),
      title: 'Message',
      minWidth: 300,
    },
    {
      ...keyColumn('companyName', textColumn),
      title: 'Company Name',
      minWidth: 220,
    },
    {
      ...keyColumn(
        'countryCode',
        selectColumn({
          choices: countries.map((data: { code: string; name: string }) => {
            return {
              value: data.code,
              label: data.name,
            }
          }),
        })
      ),
      title: 'Country',
      minWidth: 220,
    },
    {
      ...keyColumn('jobTitle', textColumn),
      title: 'Job Title',
      minWidth: 220,
    },
    {
      ...keyColumn('email', textColumn),
      title: 'Email',
      minWidth: 220,
    },
    {
      ...keyColumn('createdAt', textColumn),
      title: 'Created at',
      minWidth: 220,
    },
  ]

  const leads = useQuery({
    queryKey: ['leads', 'getMany'],
    queryFn: async () => api.leads.getMany(),
  })

  useEffect(() => {
    setLeadsData(
      ((leads.data ?? []) as unknown as Lead[]).map((lead) => ({
        ...lead,
        createdAt: dayjs(lead.createdAt).format('DD-MM-YYYY HH:mm'),
      }))
    )
  }, [leads.data])

  useEffect(() => {
    if (allSelected) {
      setLeadsData((l) => (l ?? []).map((lead) => ({ ...lead, isSelected: true })))
    }
    if (allSelected === false) {
      setLeadsData((l) => (l ?? []).map((lead) => ({ ...lead, isSelected: false })))
    }
    setTimeout(() => setAllSelected(null), 100)
  }, [allSelected])

  if (leads.isLoading) return <div>Loading...</div>
  if (leads.isError) return <div>Error: {leads.error.message}</div>

  const onChange = (dataChanged: Record<string, Lead>[]) => {
    setLeadsData(dataChanged as unknown as Lead[])
  }

  const onConfirmDelete = () => {
    showPopUp({
      title: `Are you sure you want to delete ${selectedLeads.length} leads`,
      content: (
        <>
          <div className="my-4">You can not undo this action</div>
          <div className="gap-2 flex">
            <Button
              className="min-w-20"
              variant={'danger'}
              onClick={() => {
                onDelete()
                hidePopUp()
              }}
            >
              Yes
            </Button>
            <Button className="min-w-20" onClick={hidePopUp}>
              Cancel
            </Button>
          </div>
        </>
      ),
    })
  }
  const onDelete = () => {
    showLoading()
    showAlert({ message: `Deleting ${selectedLeads.length} leads...` })
    const deleteAll = async () => {
      await Promise.all(
        selectedLeads.map(async (lead) => {
          await api.leads.delete({ id: lead.id })
        })
      )
    }
    deleteAll()
      .then(() => {
        setLeadsData((l) => l.filter((lead) => !lead.isSelected))
        hideLoading()
      })
      .catch(() => showAlert({ message: 'Error deleting, try later', type: 'error' }))
  }

  const onCloseMessageGeneration = async () => {
    setShowMessageModal(false)
    showLoading()
    await leads.refetch()
    hideLoading()
  }

  const onCloseImportLeads = async () => {
    setShowImportLeadsModal(false)
    showLoading()
    await leads.refetch()
    hideLoading()
  }

  const onGuessGender = async () => {
    showLoading()
    showAlert({ message: `Guessing gender for ${selectedLeads.length} leads` })
    await Promise.all(
      selectedLeads.map(async (lead) => {
        await api.leads.guessGender({ id: lead.id })
      })
    )
    await leads.refetch()
    hideAlert()
    hideLoading()
    showAlert({ message: `Gender guessed for ${selectedLeads.length} leads` })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="lead-list-title">All leads</h2>
        <div>
          <Button onClick={() => setShowImportLeadsModal(true)}>Import new leads</Button>
        </div>
      </div>
      <MessageGenerationModal
        isOpen={showMessageModal}
        leads={selectedLeads}
        onClose={() => onCloseMessageGeneration()}
      />
      <ImportLeadsModal isOpen={showImportLeadsModal} onClose={onCloseImportLeads} />
      <ActionsBar
        label={`Selected ${selectedLeads.length} of ${leadsData.length}`}
        actions={
          <>
            <Button disabled={selectedLeads.length === 0} onClick={onGuessGender}>
              Guess gender
            </Button>
            <Button disabled={selectedLeads.length === 0} onClick={() => setShowMessageModal(true)}>
              Generate message
            </Button>
            <Button disabled={selectedLeads.length === 0} onClick={onConfirmDelete}>
              Delete
            </Button>
          </>
        }
      />
      <DataSheetGrid
        value={leadsData}
        columns={columns}
        rowKey="id"
        onChange={onChange}
        addRowsComponent={false}
      ></DataSheetGrid>
    </div>
  )
}
