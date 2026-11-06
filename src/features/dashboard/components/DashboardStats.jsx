import React from 'react'

export function DashboardStats({
  streakDays = 3,
  totalXp = 420,
  completedModules = 12,
}) {
  // Daftar data metrik ringkasan (Streak, XP, dan Modul Selesai)
  const stats = [
    {
      id: 'streak',
      title: 'Streak Belajar',
      value: `${streakDays} Hari`,
      subValue: 'Berturut',
      iconBg: 'bg-secondary/15',
      iconColor: 'text-secondary',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.75 2.062a.75.75 0 00-.75.75c0 1.258-.337 2.457-.96 3.518-.54 1.01-1.328 1.954-2.27 2.895C7.393 10.603 6 12.35 6 15a6 6 0 1012 0c0-2.31-1.077-4.108-2.355-5.632-.977-1.165-2.074-2.222-2.895-3.55a9.78 9.78 0 01-1.05-3.756.75.75 0 00-.75-.75z" />
        </svg>
      ),
    },
    {
      id: 'xp',
      title: 'Total Poin',
      value: `${totalXp} XP`,
      subValue: null,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
    {
      id: 'modules',
      title: 'Modul Selesai',
      value: `${completedModules} Modul`,
      subValue: null,
      iconBg: 'bg-correct/15',
      iconColor: 'text-correct',
      icon: (
        <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((item) => (
        <div
          key={item.id}
          className="p-5 bg-white rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className={`w-12 h-12 ${item.iconBg} ${item.iconColor} rounded-2xl flex items-center justify-center shrink-0`}>
            {item.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-xs font-medium font-sans">
              {item.title}
            </span>
            <span className="text-zinc-900 text-lg font-bold font-sans">
              {item.value} {item.subValue && <span className="text-xs font-normal text-gray-500 block sm:inline">{item.subValue}</span>}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats
