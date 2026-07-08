import { useMemo, useState } from 'react'
import Hook from './components/Hook'
import Contexto from './components/Contexto'
import Pergunta from './components/Pergunta'
import TresSins from './components/TresSins'
import Teaser from './components/Teaser'
import Gate from './components/Gate'
import Resultado from './components/Resultado'
import ApresentacaoDiagnostico from './components/ApresentacaoDiagnostico'
import CTAFinal from './components/CTAFinal'
import { PERGUNTAS } from './content/perguntas'
import { TRES_SINS } from './content/textosFixos'
import { calcularPontuacao } from './lib/scoring'
import { criarLead, registrarInteresse } from './lib/leadsClient'
import './styles/simulador.css'

const ETAPAS = ['hook', 'contexto', 'perguntas', 'tres_sins', 'teaser', 'gate', 'resultado', 'apresentacao', 'cta_final']

export default function Simulador() {
  const [etapa, setEtapa] = useState('hook')
  const [contexto, setContexto] = useState({ nicho: '', nivelConsciencia: '' })
  const [respostas, setRespostas] = useState({})
  const [perguntaIndex, setPerguntaIndex] = useState(0)
  const [sinIndex, setSinIndex] = useState(0)
  const [nome, setNome] = useState('')
  const [leadId, setLeadId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [erro, setErro] = useState(null)
  const [interesse, setInteresse] = useState(null)

  const pontuacao = useMemo(() => {
    if (Object.keys(respostas).length < PERGUNTAS.length) return null
    return calcularPontuacao(respostas)
  }, [respostas])

  function irPara(novaEtapa) {
    setEtapa(novaEtapa)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleContexto(dados) {
    setContexto(dados)
    irPara('perguntas')
  }

  function handleResponder(id, pontos) {
    const novasRespostas = { ...respostas, [id]: pontos }
    setRespostas(novasRespostas)

    if (perguntaIndex + 1 < PERGUNTAS.length) {
      setPerguntaIndex(perguntaIndex + 1)
    } else {
      irPara('tres_sins')
    }
  }

  function handleSin() {
    if (sinIndex + 1 < TRES_SINS.length) {
      setSinIndex(sinIndex + 1)
    } else {
      irPara('teaser')
    }
  }

  async function handleGate({ nome: nomeInformado, email, whatsapp }) {
    setSubmitting(true)
    setErro(null)
    try {
      const id = await criarLead({
        nicho: contexto.nicho,
        nivelConsciencia: contexto.nivelConsciencia,
        respostas,
        pontuacao,
        nome: nomeInformado,
        email,
        whatsapp,
      })
      setLeadId(id)
      setNome(nomeInformado)
      irPara('resultado')
    } catch (err) {
      console.error('Erro ao salvar lead:', err)
      setErro('Não foi possível salvar suas respostas agora. Tente novamente em instantes.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleInteresse(valor) {
    setInteresse(valor)
    irPara('cta_final')
    if (leadId) {
      try {
        await registrarInteresse(leadId, {
          interesseDiagnostico: valor,
          querCall: valor === 'sim' || valor === 'talvez',
        })
      } catch (err) {
        console.error('Erro ao registrar interesse:', err)
      }
    }
  }

  return (
    <div className="sim">
      {ETAPAS.includes(etapa) && etapa !== 'hook' && (
        <div className="sim-progress">
          <div
            className="sim-progress-fill"
            style={{ width: `${(ETAPAS.indexOf(etapa) / (ETAPAS.length - 1)) * 100}%` }}
          />
        </div>
      )}

      {etapa === 'hook' && <Hook onNext={() => irPara('contexto')} />}

      {etapa === 'contexto' && <Contexto onNext={handleContexto} />}

      {etapa === 'perguntas' && (
        <Pergunta
          key={PERGUNTAS[perguntaIndex].id}
          pergunta={PERGUNTAS[perguntaIndex]}
          indice={perguntaIndex}
          total={PERGUNTAS.length}
          onResponder={handleResponder}
        />
      )}

      {etapa === 'tres_sins' && <TresSins passo={sinIndex} onNext={handleSin} />}

      {etapa === 'teaser' && pontuacao && (
        <Teaser gargaloDominante={pontuacao.gargaloDominante} onNext={() => irPara('gate')} />
      )}

      {etapa === 'gate' && (
        <div className="sim-screen">
          <Gate onSubmit={handleGate} submitting={submitting} />
          {erro && <p className="sim-footer-note" style={{ color: 'var(--red)' }}>{erro}</p>}
        </div>
      )}

      {etapa === 'resultado' && pontuacao && (
        <Resultado nome={nome} pontuacao={pontuacao} onNext={() => irPara('apresentacao')} />
      )}

      {etapa === 'apresentacao' && (
        <ApresentacaoDiagnostico onResponderInteresse={handleInteresse} />
      )}

      {etapa === 'cta_final' && interesse && (
        <CTAFinal interesse={interesse} onVerDiagnostico={() => irPara('resultado')} />
      )}
    </div>
  )
}
