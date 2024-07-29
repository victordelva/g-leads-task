import { createContext, useState, useContext, ReactNode } from 'react'
import Loading from './components/atoms/Loading.tsx'
import Alert from './components/molecules/Alert.tsx'
import PopUp from './components/molecules/PopUp.tsx'

interface UIContextType {
  isLoading: boolean
  showLoading: () => void
  hideLoading: () => void
  showPopUp: ({ title, content }: { title: string; content: ReactNode }) => void
  hidePopUp: () => void
  alert: string | null
  showAlert: ({ message, type }: { message: string; type?: 'success' | 'error' }) => void
  hideAlert: () => void
}

const UIContext = createContext<UIContextType>({
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
  showPopUp: () => {},
  hidePopUp: () => {},
  alert: null,
  showAlert: () => {},
  hideAlert: () => {},
})

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState<string | null>(null)
  const [popUpContent, setPopUpContent] = useState<{ content: ReactNode; title: string } | null>(null)
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')

  const showLoading = () => setIsLoading(true)
  const hideLoading = () => setIsLoading(false)
  const showAlert = ({ message, type }: { message: string; type?: 'success' | 'error' }) => {
    setAlert(message)
    setAlertType(type ?? 'success')
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }
  const hideAlert = () => setAlert(null)
  const hidePopUp = () => setPopUpContent(null)
  const showPopUp = ({ title, content }: { title: string; content: ReactNode }) => {
    setPopUpContent({ title, content })
  }

  return (
    <UIContext.Provider
      value={{ isLoading, showLoading, hideLoading, alert, showAlert, hideAlert, showPopUp, hidePopUp }}
    >
      {isLoading && <Loading />}
      {alert && <Alert message={alert} type={alertType} />}
      {!!popUpContent && (
        <PopUp isActive={!!popUpContent} title={popUpContent.title}>
          {popUpContent.content}
        </PopUp>
      )}
      {children}
    </UIContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUIMessages = () => useContext(UIContext)
