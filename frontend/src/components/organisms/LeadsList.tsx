import { useQuery } from '@tanstack/react-query'
import {FC, useEffect, useState} from 'react'
import { api } from '../../api'
import {checkboxColumn, DataSheetGrid, keyColumn, textColumn} from "react-datasheet-grid";
import 'react-datasheet-grid/dist/style.css';
import {selectColumn} from "./DataGrid/Select/selectColumn.ts";
import {Lead} from "../../types/Lead.ts";

export const LeadsList: FC = () => {
  const [ leadsData, setLeadsData ] = useState<Lead[]>([]);
  const [ allSelected, setAllSelected ] = useState<boolean>(false);

  const countSelected = leadsData.filter((lead) => lead.isSelected).length;

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
        'countryCode',
        selectColumn({
          choices: (["UK", "DE", "ES", "IN"])?.map((data) => {
            return {
              value: data,
              label: data,
            };
          }),
        }),
      ),
      title: "Country",
    },
  ];

  const leads = useQuery({
    queryKey: ['leads', 'getMany'],
    queryFn: async () => api.leads.getMany(),
  });

  console.log(leadsData);

  useEffect(() => {
    setLeadsData((leads.data ?? []) as unknown as Lead[]);
  }, [leads.data]);

  useEffect(() => {
    if (allSelected === true) {
      setLeadsData((leadsData ?? []).map((lead) => ({ ...lead, isSelected: true })));
    } else {
      setLeadsData((leadsData ?? []).map((lead) => ({ ...lead, isSelected: false })));
    }
  }, [allSelected]);


  if (leads.isLoading) return <div>Loading...</div>
  if (leads.isError) return <div>Error: {leads.error.message}</div>

  const onChange = (
    dataChanged: Record<string, Lead>[],
    /** operation: {
      fromRowIndex: number;
      toRowIndex: number;
      type: 'CREATE' | 'UPDATE' | 'DELETE';
    }[],
      */
  ) => {
    setLeadsData(dataChanged as unknown as Lead[]);
  };

  return (
    <div>
      <h2 className="lead-list-title">All leads</h2>
      <p>
        <code>POST</code> <code>/leads</code>
      </p>
      <div className="w-full">
        <div>
          {countSelected} selecionados
        </div>
      </div>
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
