import React, { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { getTodayStr } from '../../utils/helpers'

export default function DailyObjectives({ tasks, onObjectivesChange }) {
  const [objectives, setObjectives] = useState([])
  const [showPicker, setShowPicker] = useState(false)
  const [loading, setLoading] = useState(true)

  const today = getTodayStr()
  const activeTasks = tasks.filter(t => t.status !== 'feito')

  useEffect(() => {
    loadObjectives()
  }, [])

  async function loadObjectives() {
    const { data } = await supabase
      .from('objetivos_dia')
      .select('*, tarefas(*)')
      .eq('data', today)
      .order('ordem')
    setObjectives(data || [])
    setLoading(false)
    onObjectivesChange && onObjectivesChange((data || []).map(o => o.tarefas?.titulo).filter(Boolean))
  }

  async function toggleComplete(obj) {
    await supabase
      .from('objetivos_dia')
      .update({ completo: !obj.completo })
      .eq('id', obj.id)
    loadObjectives()
  }

  async function addObjective(task) {
    if (objectives.length >= 4) return
    const alreadyAdded = objectives.find(o => o.tarefa_id === task.id)
    if (alreadyAdded) return

    await supabase.from('objetivos_dia').insert({
      data: today,
      tarefa_id: task.id,
      ordem: objectives.length + 1,
      completo: false
    })
    setShowPicker(false)
    loadObjectives()
  }

  async function removeObjective(obj) {
    await supabase.from('objetivos_dia').delete().eq('id', obj.id)
    loadObjectives()
  }

  const availableTasks = activeTasks.filter(
    t => !objectives.find(o => o.tarefa_id === t.id)
  )

  return (
    <div className="objectives-section">
      <div className="section-header">
        <span className="section-title">🎯 Objetivos do dia</span>
        <span className="section-meta">{objectives.length}/4</span>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Carregando...</div>
      ) : (
        <>
          {objectives.length === 0 && (
            <div className="empty-objectives">
              Nenhum objetivo definido. Selecione até 4 tarefas para focar hoje.
            </div>
          )}

          <div className="objectives-list">
            {objectives.map(obj => (
              <div
                key={obj.id}
                className={`objective-item ${obj.completo ? 'objective-done' : ''}`}
              >
                <button
                  className="objective-check"
                  onClick={() => toggleComplete(obj)}
                >
                  {obj.completo ? '✓' : ''}
                </button>
                <span className="objective-title">{obj.tarefas?.titulo || 'Tarefa removida'}</span>
                {obj.tarefas?.empresas && (
                  <span
                    className="objective-company"
                    style={{
                      background: obj.tarefas.empresas.cor === '#000000'
                        ? '#333'
                        : obj.tarefas.empresas.cor + '22',
                      color: obj.tarefas.empresas.cor === '#000000'
                        ? '#fff'
                        : obj.tarefas.empresas.cor,
                    }}
                  >
                    {obj.tarefas.empresas.nome}
                  </span>
                )}
                <button
                  className="objective-remove"
                  onClick={() => removeObjective(obj)}
                  title="Remover objetivo"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {objectives.length < 4 && (
            <div style={{ position: 'relative' }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowPicker(!showPicker)}
                style={{ width: '100%', marginTop: 10 }}
              >
                + Adicionar objetivo
              </button>

              {showPicker && (
                <div className="task-picker">
                  {availableTasks.length === 0 ? (
                    <div className="task-picker-empty">Nenhuma tarefa disponível</div>
                  ) : (
                    availableTasks.map(task => (
                      <button
                        key={task.id}
                        className="task-picker-item"
                        onClick={() => addObjective(task)}
                      >
                        <span className="task-picker-title">{task.titulo}</span>
                        {task.empresas && (
                          <span className="task-picker-company">{task.empresas.nome}</span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
