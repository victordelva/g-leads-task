import { Lead } from '../../types/Lead.ts'
import { useEffect, useState } from 'react'
import CloseIcon from '../../components/atoms/CloseSvg.tsx'
import { LeadValidation, validateLeadsFields } from './validateLeadAndTemplate.ts'
import { Button } from '../../components/atoms/Button.tsx'
import { api } from '../../api'
import { useUIMessages } from '../../UIProvider.tsx'
import LoadingSvg from '../../components/atoms/LoadingSvg.tsx'
import GreenCheckSvg from '../../components/atoms/GreenCheckSvg.tsx'
import RedXSvg from '../../components/atoms/RedXSvg.tsx'

export default function MessageGenerationModal({
  isOpen,
  leads,
  onClose,
}: {
  isOpen: boolean
  leads: Lead[]
  onClose: () => void
}) {
  const [messageTemplate, setMessageTemplate] = useState(`Hi {firstName}, I'm doing a survey. 
Who would you rate working in {companyName} as {gender} on a scale of 1-10?
`)
  const [validation, setValidation] = useState<LeadValidation | undefined>()
  const { showLoading, hideLoading, showAlert } = useUIMessages()
  const [loadingValidation, setLoadingValidation] = useState(false)

  useEffect(() => {
    setLoadingValidation(true)
    const interval = setInterval(() => {
      const validationData = validateLeadsFields(leads, messageTemplate)
      setValidation(validationData)
      setLoadingValidation(false)
    }, 2000)

    return () => clearInterval(interval)
  }, [messageTemplate, leads])

  const onGenerateMessage = async () => {
    showLoading()
    showAlert({
      message: 'Generating messages...',
    })
    await Promise.all(
      (validation?.leads || []).map(async (leadValidation) => {
        let message = undefined
        const leadData = leads.find((l) => l.id === leadValidation.leadId)
        if (leadValidation.isValid && leadData) {
          message = messageTemplate.replace(/{([a-zA-Z]+)}/g, (_, key: keyof Lead) => {
            return typeof leadData[key] === 'string' ? leadData[key] : ''
          })
        }

        if (message) {
          await api.leads.updateSome({ id: leadValidation.leadId, message })
        }
      })
    )
    hideLoading()
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-dvh flex justify-center items-center z-30 bg-glass">
          <div className="max-w-2xl m-auto bg-white w-full min-h-96 max-h-dvh border-2 border-gray-500 rounded-2xl shadow-xl overflow-scroll">
            <div className="flex justify-between p-2">
              <div className="font-bold text-2xl">Custom message generation</div>
              <div className={'cursor-pointer'} onClick={onClose}>
                <CloseIcon />
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="px-2 mt-2 text-xl">Message template</div>
              {loadingValidation ? (
                <LoadingSvg className="w-4 h-4 my-0 mr-2" />
              ) : (
                <>
                  {validation?.areAllValid && <GreenCheckSvg className="mr-2" />}
                  {validation?.areAllValid === false && <RedXSvg className="mr-2" />}
                </>
              )}
            </div>

            <div className="p-2">
              <textarea
                value={messageTemplate}
                onChange={(e) => setMessageTemplate(e.target.value)}
                className="border border-gray-400 rounded-lg p-2 w-full"
              ></textarea>
              <div className="mt-2">
                {validation && !loadingValidation && (
                  <>
                    {validation?.areAllValid && (
                      <div className="text-blue-600">All leads message will be generated correctly</div>
                    )}
                    {validation?.areAllValid === false && (
                      <div>
                        <div className="underline my-4 text-red-800">
                          Some leads doesn't have the correct data. So, their message will be empty
                        </div>
                        <ol className="list-decimal pl-8">
                          {validation?.leads
                            .filter((l) => !l.isValid)
                            .map((lead) => (
                              <li key={lead.leadId}>
                                {lead.firstName} {lead.lastName} has the following invalid fields:{' '}
                                <pre>{lead.invalidFields.join(', ')}</pre>
                              </li>
                            ))}
                        </ol>
                      </div>
                    )}
                  </>
                )}
                <div className="mt-6">
                  <Button disabled={!messageTemplate || loadingValidation} onClick={onGenerateMessage}>
                    {validation?.areAllValid ? 'Generate message' : 'Generate message anyway'}
                  </Button>
                  <Button className="mt-2" variant={'danger'} onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
