import CloseIcon from '../atoms/CloseSvg.tsx'
import { useUIMessages } from '../../UIProvider.tsx'

export default function PopUp({
  isActive,
  title = '',
  children,
}: {
  isActive: boolean
  title?: string
  children: React.ReactNode
}) {
  const { hidePopUp } = useUIMessages()

  return (
    <>
      {isActive && (
        <div className="w-dvw h-dvh absolute flex-row justify-center items-center bg-glass z-40">
          <div className="max-w-2xl border border-gray-500 rounded m-auto bg-white p-5">
            <div className="font-bold text-xl m-2 flex justify-between items-center">
              <div className="mb-2">{title}</div>
              <div className="cursor-pointer" onClick={() => hidePopUp()}>
                <CloseIcon />
              </div>
            </div>
            <div className="m-2">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}
