// Camada de dados 100% local (localStorage) — sem backend, sem conta, sem configuração.
const STORAGE_KEY = 'revide_db_v1'

function seedDb() {
  return {
    empresas: [
      { id: 1, nome: 'Dzoom', cor: '#3B82F6', criado_em: new Date().toISOString() },
      { id: 2, nome: '4improvements', cor: '#6366f1', criado_em: new Date().toISOString() },
      { id: 3, nome: 'Revide', cor: '#22c55e', criado_em: new Date().toISOString() },
    ],
    tarefas: [],
    lembretes: [],
    objetivos_dia: [],
    seq: { empresas: 3, tarefas: 0, lembretes: 0, objetivos_dia: 0 },
  }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const fresh = seedDb()
      persist(fresh)
      return fresh
    }
    return JSON.parse(raw)
  } catch {
    return seedDb()
  }
}

function persist(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function nextId(data, table) {
  data.seq[table] = (data.seq[table] || 0) + 1
  return data.seq[table]
}

export const db = {
  empresas: {
    list() {
      return load().empresas.slice().sort((a, b) => a.id - b.id)
    },
    insert({ nome, cor }) {
      const data = load()
      const row = { id: nextId(data, 'empresas'), nome, cor, criado_em: new Date().toISOString() }
      data.empresas.push(row)
      persist(data)
      return row
    },
  },

  tarefas: {
    list() {
      const data = load()
      const empresasById = new Map(data.empresas.map(e => [e.id, e]))
      return data.tarefas
        .slice()
        .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
        .map(t => ({ ...t, empresas: empresasById.get(t.empresa_id) || null }))
    },
    insert(payload) {
      const data = load()
      const now = new Date().toISOString()
      const row = { id: nextId(data, 'tarefas'), criado_em: now, atualizado_em: now, ...payload }
      data.tarefas.push(row)
      persist(data)
      return row
    },
    update(id, patch) {
      const data = load()
      const idx = data.tarefas.findIndex(t => t.id === id)
      if (idx === -1) return null
      data.tarefas[idx] = { ...data.tarefas[idx], ...patch }
      persist(data)
      return data.tarefas[idx]
    },
    remove(id) {
      const data = load()
      data.tarefas = data.tarefas.filter(t => t.id !== id)
      data.objetivos_dia = data.objetivos_dia.filter(o => o.tarefa_id !== id)
      persist(data)
    },
  },

  lembretes: {
    listPending() {
      return load()
        .lembretes.filter(l => !l.disparado)
        .sort((a, b) => new Date(a.fire_at) - new Date(b.fire_at))
    },
    insert(payload) {
      const data = load()
      const row = { id: nextId(data, 'lembretes'), ...payload }
      data.lembretes.push(row)
      persist(data)
      return row
    },
    update(id, patch) {
      const data = load()
      const idx = data.lembretes.findIndex(l => l.id === id)
      if (idx === -1) return null
      data.lembretes[idx] = { ...data.lembretes[idx], ...patch }
      persist(data)
      return data.lembretes[idx]
    },
  },

  objetivos: {
    listByDate(dataStr) {
      const data = load()
      const tarefasById = new Map(data.tarefas.map(t => [t.id, t]))
      const empresasById = new Map(data.empresas.map(e => [e.id, e]))
      return data.objetivos_dia
        .filter(o => o.data === dataStr)
        .sort((a, b) => a.ordem - b.ordem)
        .map(o => {
          const tarefa = tarefasById.get(o.tarefa_id)
          return {
            ...o,
            tarefas: tarefa ? { ...tarefa, empresas: empresasById.get(tarefa.empresa_id) || null } : null,
          }
        })
    },
    insert(payload) {
      const data = load()
      const row = { id: nextId(data, 'objetivos_dia'), ...payload }
      data.objetivos_dia.push(row)
      persist(data)
      return row
    },
    update(id, patch) {
      const data = load()
      const idx = data.objetivos_dia.findIndex(o => o.id === id)
      if (idx === -1) return null
      data.objetivos_dia[idx] = { ...data.objetivos_dia[idx], ...patch }
      persist(data)
      return data.objetivos_dia[idx]
    },
    remove(id) {
      const data = load()
      data.objetivos_dia = data.objetivos_dia.filter(o => o.id !== id)
      persist(data)
    },
  },
}
