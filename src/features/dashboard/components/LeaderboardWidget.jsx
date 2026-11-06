import React from 'react'

export function LeaderboardWidget({
  title = 'Peringkat Kelas',
  timeframe = 'Minggu Ini',
  items,
}) {
  const defaultLeaderboard = [
    {
      rank: 1,
      name: 'Budi Santoso',
      initials: 'BS',
      avatar: null,
      xp: 1620,
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: 'Budi (Kamu)',
      initials: 'BP',
      avatar: null,
      xp: 1450,
      isCurrentUser: true,
    },
    {
      rank: 3,
      name: 'Dinda Ayu',
      initials: 'DA',
      avatar: null,
      xp: 1380,
      isCurrentUser: false,
    },
  ]

  const leaderboard = items || defaultLeaderboard

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return 'text-amber-500 font-extrabold'
      case 2:
        return 'text-primary font-extrabold'
      case 3:
        return 'text-slate-500 font-bold'
      default:
        return 'text-gray-400 font-medium'
    }
  }

  return (
    <div className="w-full p-4 bg-white rounded-2xl border border-slate-100/80 shadow-sm flex flex-col gap-4">
      {/* Bagian header peringkat */}
      <div className="flex items-center justify-between">
        <h2 className="text-zinc-900 text-lg font-bold font-sans">
          {title}
        </h2>
        <span className="text-gray-500 text-xs font-semibold tracking-wide bg-slate-100 px-3 py-1 rounded-full">
          {timeframe}
        </span>
      </div>

      {/* Daftar peringkat siswa */}
      <div className="flex flex-col gap-2">
        {leaderboard.map((user) => (
          <div
            key={user.rank}
            className={`p-2 rounded-2xl flex items-center justify-between transition-colors ${
              user.isCurrentUser
                ? 'bg-primary/10 border border-primary/20'
                : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Nomor urutan peringkat */}
              <span className={`w-2 text-center text-xs ${getRankBadge(user.rank)}`}>
                {user.rank}
              </span>

              {/* Avatar gambar atau inisial nama */}
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.isCurrentUser
                      ? 'bg-primary text-white'
                      : 'bg-slate-200 text-zinc-700'
                  }`}
                >
                  {user.initials}
                </div>
              )}

              {/* Nama siswa */}
              <span
                className={`text-sm truncate max-w-[140px] sm:max-w-[200px] ${
                  user.isCurrentUser
                    ? 'text-primary font-bold'
                    : 'text-zinc-800 font-medium'
                }`}
              >
                {user.name}
              </span>
            </div>

            {/* Total perolehan XP */}
            <span
              className={`text-xs font-bold tracking-wide ${
                user.isCurrentUser ? 'text-primary' : 'text-gray-600'
              }`}
            >
              {user.xp.toLocaleString('id-ID')} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderboardWidget
