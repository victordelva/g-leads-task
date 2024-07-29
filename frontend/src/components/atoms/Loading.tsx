import LoadingSvg from './LoadingSvg.tsx'

export default function Loading() {
  return (
    <div className="w-dvw h-dvh absolute flex justify-center items-center bg-glass z-40">
      <LoadingSvg />
    </div>
  )
}
