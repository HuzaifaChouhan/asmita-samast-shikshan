/** Superscript style for ordinal suffixes */
const S = { fontSize: '0.6em', verticalAlign: 'super', lineHeight: 0 }

/**
 * Renders a single ordinal number with a superscript suffix.
 * e.g. <Ord>1st</Ord>  →  1<sup>st</sup>
 */
export function Ord({ children }) {
  const str = String(children)
  const m = str.match(/^(\d+)(st|nd|rd|th)$/)
  if (!m) return <>{str}</>
  return (
    <>
      {m[1]}<sup style={S}>{m[2]}</sup>
    </>
  )
}

/**
 * Parses a free-form string that may contain ordinals and renders
 * each ordinal suffix as a superscript.
 * e.g. <OrdText>From 1st to 10th standard</OrdText>
 */
export function OrdText({ children }) {
  const str = String(children)
  const parts = str.split(/(\d+(?:st|nd|rd|th))/g)
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^(\d+)(st|nd|rd|th)$/)
        if (m) {
          return (
            <span key={i}>
              {m[1]}<sup style={S}>{m[2]}</sup>
            </span>
          )
        }
        return part
      })}
    </>
  )
}
