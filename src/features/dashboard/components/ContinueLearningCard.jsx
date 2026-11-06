import React from 'react'
import Button from '../../../components/common/Button.jsx'
import iconLanjutkan from '../../../assets/Icon-lanjutkan-dashboard.svg'

export function ContinueLearningCard({
  chapter = 'Bab 4 • Bilangan Rasional',
  title = 'Penjumlahan Pecahan Campuran',
  completedSubtopics = 4,
  totalSubtopics = 6,
  progressPercentage = 75,
  onContinue,
}) {
  return (
    <div className="w-full p-6 bg-white rounded-2xl border border-slate-100/80 shadow-sm flex flex-col gap-4">
      {/* Judul kartu & label bab */}
      <div className="flex items-center justify-between">
        <h2 className="text-zinc-900 text-lg font-bold font-sans">
          Lanjutkan Pembelajaran
        </h2>
        <span className="text-primary text-xs font-semibold tracking-wide  px-3 py-1 rounded-full">
          {chapter}
        </span>
      </div>

      {/* Kotak detail materi pembelajaran */}
      <div className="p-4 bg-slate-50/80 hover:bg-slate-100/70 transition-colors rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h3 className="text-zinc-900 text-base font-bold font-sans">
              {title}
            </h3>
            <p className="text-gray-500 text-xs font-normal">
              {completedSubtopics} dari {totalSubtopics} Sub-bab selesai ({progressPercentage}%)
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          withArrow={false}
          iconRight={
            <img
              src={iconLanjutkan}
              alt=""
              className="w-2.5 h-3 object-contain shrink-0 ml-0.5"
            />
          }
          onClick={onContinue}
          className="self-end sm:self-center"
        >
          Lanjutkan
        </Button>
      </div>

      {/* Garis indikator progres linear */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}

export default ContinueLearningCard
