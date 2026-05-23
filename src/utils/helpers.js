export function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

// Usa componentes locais da data (evita o bug de fuso do toISOString,
// que em America/Maceio (UTC-3) podia "pular" pro dia seguinte à noite).
export function getTodayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function isOverdue(dateStr) {
  if (!dateStr) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dateStr + 'T00:00:00')
  return due < today
}

export function isDueToday(dateStr) {
  if (!dateStr) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dateStr + 'T00:00:00')
  return due.getTime() === today.getTime()
}

export function isDueSoon(dateStr, days = 3) {
  if (!dateStr) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dateStr + 'T00:00:00')
  const diff = (due - today) / (1000 * 60 * 60 * 24)
  return diff > 0 && diff <= days
}

export function getPriorityLabel(p) {
  return { urgente: 'Urgente', normal: 'Normal', pode_esperar: 'Pode esperar' }[p] || p
}

export function getStatusLabel(s) {
  return {
    a_fazer: 'A fazer',
    em_andamento: 'Em andamento',
    feito: 'Finalizado',
    agendada: 'Agendada',
  }[s] || s
}

export function getPriorityColor(p) {
  return { urgente: '#ef4444', normal: '#3B82F6', pode_esperar: '#6b7280' }[p] || '#6b7280'
}

export function formatMinutes(min) {
  if (min < 60) return `${min}min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m ? `${h}h${m}min` : `${h}h`
}

export function msToTime(ms) {
  if (ms <= 0) return '00:00'
  const totalSec = Math.floor(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export function getCompanyTextColor(bgColor) {
  if (!bgColor) return '#ffffff'
  const hex = bgColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

/* ─── Kanban / Recorrência ─── */

// Colunas do Kanban (na ordem). "feito" é exibido como "Finalizado".
export const STATUS_COLUMNS = [
  { value: 'a_fazer', label: 'A fazer' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'feito', label: 'Finalizado' },
]

// 0 = Domingo ... 6 = Sábado (compatível com Date.getDay())
export const WEEKDAYS = [
  { value: 0, short: 'Dom' },
  { value: 1, short: 'Seg' },
  { value: 2, short: 'Ter' },
  { value: 3, short: 'Qua' },
  { value: 4, short: 'Qui' },
  { value: 5, short: 'Sex' },
  { value: 6, short: 'Sáb' },
]

export function getRecorrenciaLabel(tipo, dias) {
  if (tipo === 'diaria') return 'Diária'
  if (tipo === 'semanal') return 'Semanal'
  if (tipo === 'dias_semana') {
    const map = WEEKDAYS.reduce((acc, w) => { acc[w.value] = w.short; return acc }, {})
    const arr = (dias || []).slice().sort((a, b) => a - b).map(d => map[d]).filter(Boolean)
    return arr.length ? arr.join(', ') : 'Dias da semana'
  }
  return ''
}

// Próxima ocorrência ESTRITAMENTE depois de `fromStr` (YYYY-MM-DD).
export function getNextOccurrence(tipo, dias, fromStr) {
  const toStr = (d) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }
  const base = new Date((fromStr || getTodayStr()) + 'T00:00:00')

  if (tipo === 'diaria') {
    base.setDate(base.getDate() + 1)
    return toStr(base)
  }
  if (tipo === 'semanal') {
    base.setDate(base.getDate() + 7)
    return toStr(base)
  }
  if (tipo === 'dias_semana') {
    const set = (dias || []).map(Number)
    if (set.length) {
      for (let i = 1; i <= 7; i++) {
        const d = new Date(base)
        d.setDate(d.getDate() + i)
        if (set.includes(d.getDay())) return toStr(d)
      }
    }
  }
  // fallback: amanhã
  base.setDate(base.getDate() + 1)
  return toStr(base)
}
