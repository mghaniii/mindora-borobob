import React from 'react'
import Button from '../../../../components/common/Button.jsx'

const stripMarkers = (text) => String(text).replace(/[{}~]/g, '')

const formatDuration = (seconds) => `${Math.floor(seconds / 60)}m ${seconds % 60}s`

function StatBox({ label, value, valueClass = 'text-text-main' }) {
  return (
    <div className="bg-surface-card rounded-2xl p-4 flex flex-col gap-1">
      <span className="text-xs text-text-subtle font-rubik">{label}</span>
      <span className={`font-rubik text-xl font-extrabold tabular-nums ${valueClass}`}>{value}</span>
    </div>
  )
}

/**
 * Hasil kuis: skor, akurasi, XP, waktu, dan review jawaban per soal.
 */
export default function KuisResult({ config, result, onRestart, onExit }) {
  const passed = result.accuracyPercent >= 70

  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col gap-5">
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col gap-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${
              passed ? 'bg-correct/15 text-correct-dark' : 'bg-secondary/15 text-warning'
            }`}
          >
            {passed ? (
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8v5" />
                <path d="M12 16.5v.5" />
                <path d="M10.3 3.9L2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
              </svg>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="font-rubik text-2xl font-extrabold text-text-main">
              {passed ? 'Kuis Selesai, Kerja Bagus!' : 'Kuis Selesai!'}
            </h1>
            <p className="text-sm text-text-muted truncate">{config.title}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBox label="Skor Poin" value={`${result.earnedPoints}/${result.totalPoints}`} />
          <StatBox
            label="Akurasi"
            value={`${result.accuracyPercent}%`}
            valueClass={passed ? 'text-correct-dark' : 'text-warning'}
          />
          <StatBox label="XP Diperoleh" value={`+${result.xpEarned}`} valueClass="text-primary-dark" />
          <StatBox label="Waktu" value={formatDuration(result.timeSpentSeconds)} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline-primary" size="md" shape="pill" onClick={onRestart} className="flex-1 font-bold">
            Ulangi Kuis
          </Button>
          <Button variant="primary" size="md" shape="pill" withArrow onClick={onExit} className="flex-1 font-bold">
            Kembali ke Latihan
          </Button>
        </div>
      </section>

      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs animate-fade-up" style={{ animationDelay: '120ms' }}>
        <h2 className="font-rubik font-bold text-lg text-text-main">Review Jawaban</h2>
        <ul className="mt-4 divide-y divide-surface-border">
          {result.review.map((item) => {
            const status = !item.selectedOption ? 'empty' : item.isCorrect ? 'correct' : 'wrong'
            return (
              <li key={item.questionId} className="py-3 flex items-center gap-3">
                <span
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold font-rubik ${
                    status === 'correct'
                      ? 'bg-correct/15 text-correct-dark'
                      : status === 'wrong'
                        ? 'bg-wrong text-danger'
                        : 'bg-surface-card text-text-subtle'
                  }`}
                >
                  {String(item.number).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-main truncate">{stripMarkers(item.text)}</p>
                  <p className="text-xs text-text-subtle font-rubik">
                    Jawabanmu: {item.selectedOption ?? '—'} · Kunci: {item.correctOption}
                    {item.isDoubtful ? ' · ditandai ragu-ragu' : ''}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-xs font-bold font-rubik px-2.5 py-1 rounded-full ${
                    status === 'correct'
                      ? 'bg-correct/15 text-correct-dark'
                      : status === 'wrong'
                        ? 'bg-wrong text-danger'
                        : 'bg-surface-card text-text-subtle'
                  }`}
                >
                  {status === 'correct' ? 'Benar' : status === 'wrong' ? 'Salah' : 'Kosong'}
                </span>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}