// Renderiza **negrito** simples dentro de textos de conteúdo, sem trazer um parser de markdown completo.
export function RichText({ text }) {
  const partes = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {partes.map((parte, i) =>
        parte.startsWith('**') && parte.endsWith('**')
          ? <strong key={i}>{parte.slice(2, -2)}</strong>
          : <span key={i}>{parte}</span>
      )}
    </>
  )
}
