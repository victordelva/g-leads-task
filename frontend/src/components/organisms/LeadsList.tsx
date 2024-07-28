import { useQuery } from '@tanstack/react-query'
import {FC, useEffect, useState} from 'react'
import { api } from '../../api'
import {checkboxColumn, DataSheetGrid, keyColumn, textColumn} from "react-datasheet-grid";
import 'react-datasheet-grid/dist/style.css';
import {selectColumn} from "./DataGrid/Select/selectColumn.ts";
import {Lead} from "../../types/Lead.ts";
import LeadsActionsBar from "./LeadsActionsBar.tsx";
import {Button} from "../atoms/Button.tsx";
import {useUIMessages} from "../../UIProvider.tsx";
import MessageGenerationModal from "./MessageGeneration/MessageGenerationModal.tsx";
import {capitalize} from "lodash";

export const LeadsList: FC = () => {
  const [ leadsData, setLeadsData ] = useState<Lead[]>([]);
  const [ allSelected, setAllSelected ] = useState<boolean | null>(null);
  const { showLoading, hideLoading, showAlert, hideAlert, showPopUp, hidePopUp } = useUIMessages();
  const [showMessageModal, setShowMessageModal] = useState(false);

  const selectedLeads = leadsData.filter((lead) => lead.isSelected);

  const columns = [
    {
      ...keyColumn('isSelected', checkboxColumn),
      title: <div className="flex items-center justify-center w-full">
        <button
          className="text-xs mr-2"
          onClick={() => setAllSelected(true)}
        >
          All
        </button>
        <button
          className="text-xs"
          onClick={() => setAllSelected(false)}
        >
          None
        </button>

      </div>,
      center: true,
      headerClassName: 'w-full',
      minWidth: 180,
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
    ...keyColumn(
        'gender',
        selectColumn({
          choices: (["female", "male"])?.map((data) => {
            return {
              value: data,
              label: capitalize(data),
            };
          }),
        }),
      ),
      title: "Gender",
      disabled: true,
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
      disabled: true,
    },
    {
      ...keyColumn(
        'countryCode',
        selectColumn({
          // todo include file with all country codes
          choices: (["UK", "DE", "ES", "IN"])?.map((data) => {
            return {
              value: data,
              label: data,
            };
          }),
        }),
      ),
      title: "Country",
      disabled: true,
    },
  ];

  const leads = useQuery({
    queryKey: ['leads', 'getMany'],
    queryFn: async () => api.leads.getMany(),
  });

  useEffect(() => {
    setLeadsData((leads.data ?? []) as unknown as Lead[]);
  }, [leads.data]);

  useEffect(() => {
    if (allSelected) {
      setLeadsData((l) => (l ?? []).map((lead) => ({ ...lead, isSelected: true })));
    }
    if (allSelected === false){
      setLeadsData((l) => (l ?? []).map((lead) => ({ ...lead, isSelected: false })));
    }
    setTimeout(() => setAllSelected(null), 100);
  }, [allSelected]);


  if (leads.isLoading) return <div>Loading...</div>
  if (leads.isError) return <div>Error: {leads.error.message}</div>

  const onChange = (
    dataChanged: Record<string, Lead>[],
  ) => {
    setLeadsData(dataChanged as unknown as Lead[]);
  };

  const onConfirmDelete = () => {
    showPopUp({
      title: `Are you sure you want to delete ${selectedLeads.length} leads`,
      content: (
        <>
          <div className="my-4">
            You can not undo this action
          </div>
          <div className="gap-2 flex">
            <Button
              className="min-w-20"
              variant={'danger'}
              onClick={() => {
                onDelete();
                hidePopUp();
              }
            }>
              Yes
            </Button>
            <Button
              className="min-w-20"
              onClick={hidePopUp}
            >
              Cancel
            </Button>
          </div>
        </>
      )
    })
  }
  const onDelete = () => {
    showLoading();
    showAlert({ message: `Deleting ${selectedLeads.length} leads...` });
    const deleteAll = async () => {
      await Promise.all(selectedLeads.map(async (lead) => {
        await api.leads.delete({id :lead.id});
      }));
    }
    deleteAll().then(() => {
      setLeadsData((l) => l.filter((lead) => !lead.isSelected));
      hideLoading();
    }).catch((e) => console.log(e));
  }

  const onCloseMessageGeneration = async () => {
    setShowMessageModal(false);
    showLoading();
    await leads.refetch();
    hideLoading();
  }

  const onGuessGender = async () => {
    showLoading();
    showAlert({ message: `Guessing gender for ${selectedLeads.length} leads` });
    await Promise.all(selectedLeads.map(async (lead) => {
      await api.leads.guessGender({id: lead.id});
    }));
    await leads.refetch();
    hideAlert();
    hideLoading();
    showAlert({ message: `Gender guessed for ${selectedLeads.length} leads` });
  }

  return (
    <div>
      <h2 className="lead-list-title">All leads</h2>
      <MessageGenerationModal
        isActive={showMessageModal}
        leads={selectedLeads}
        onClose={() => onCloseMessageGeneration()}
      />
      <LeadsActionsBar
        label={`Selected ${selectedLeads.length} of ${leadsData.length}`}
        actions={
          <>
            <Button
              disabled={selectedLeads.length === 0}
              onClick={onGuessGender}>
              Guess gender
            </Button>
            <Button
              disabled={selectedLeads.length === 0}
              onClick={() => setShowMessageModal(true)}>
              Generate message
            </Button>
            <Button
              disabled={selectedLeads.length === 0}
              onClick={onConfirmDelete}>
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
      >
      </DataSheetGrid>
    </div>
  )
}
