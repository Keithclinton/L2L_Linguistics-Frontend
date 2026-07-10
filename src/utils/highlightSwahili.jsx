import { SWAHILI_WORDS } from './swahiliWordList'

const MAX_PHRASE_WORDS = 3

// Splits text on word boundaries and bolds any word or short phrase found in SWAHILI_WORDS,
// preferring the longest matching phrase starting at each position.
export default function highlightSwahili(text) {
  if (!text) return text
  const parts = text.split(/([A-Za-z']+)/)
  const nodes = []
  let key = 0
  let i = 0

  while (i < parts.length) {
    if (i % 2 === 0) {
      nodes.push(parts[i])
      i++
      continue
    }

    let matched = false
    for (let span = MAX_PHRASE_WORDS; span >= 1; span--) {
      const endIdx = i + (span - 1) * 2
      if (endIdx >= parts.length) continue

      const words = []
      let separatorsOk = true
      for (let w = 0; w < span; w++) {
        const wordIdx = i + w * 2
        if (w > 0 && !/^\s+$/.test(parts[wordIdx - 1])) {
          separatorsOk = false
          break
        }
        words.push(parts[wordIdx])
      }
      if (!separatorsOk) continue

      const phrase = words.join(' ').toLowerCase()
      if (SWAHILI_WORDS.has(phrase)) {
        const matchedText = parts.slice(i, endIdx + 1).join('')
        nodes.push(
          <strong key={key++} className="font-bold text-primary-700">
            {matchedText}
          </strong>
        )
        i = endIdx + 1
        matched = true
        break
      }
    }

    if (!matched) {
      nodes.push(parts[i])
      i++
    }
  }

  return nodes
}
