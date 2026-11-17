import React from 'react'

/**
 * Kartu rumus bantuan (kolom kanan bawah desain).
 */
export default function KuisFormulaCard({ formula }) {
  if (!formula) return null
  return (
    <section className="bg-white rounded-3xl p-6 shadow-xs animate-fade-up" style={{ animationDelay: '180ms' }}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-rubik font-bold text-base text-text-main">{formula.title}</h2>
        <span className="text-primary font-bold text-lg font-rubik" aria-hidden="true">
          Σ
        </span>
      </div>
      <p className="mt-4 bg-surface-card rounded-xl px-4 py-3.5 text-center font-mono text-sm font-bold text-primary-dark tracking-wide">
        {formula.expression}
      </p>
    </section>
  )
}