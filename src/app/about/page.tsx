import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Your Daily Norse — ancient lines, daily signal.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-12">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-ink-950 sm:text-5xl">
          About
        </h1>
      </header>

      <div className="prose-norse text-lg space-y-6">
        <p>
          <strong>Your Daily Norse</strong> is a collection of daily cards drawn from the
          textual heritage of the Germanic world.
        </p>

        <p>
          Each card presents one letter, one rune, or one verse — along with
          commentary that bridges the ancient and the present. The goal is not
          scholarship (though accuracy matters) but resonance: finding what still
          speaks in these old forms.
        </p>

        <h2 className="font-serif text-2xl font-semibold text-ink-950 mt-12 mb-6">
          The Realms
        </h2>

        <p>
          Content is organized into <em>realms</em>, each a bounded corpus:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Gothic Alphabet</strong> — The 27 letters of Wulfila's 4th-century
            script, created to translate the Bible into Gothic. Each letter carries
            a name and a numeric value.
          </li>
          <li>
            <strong>Völuspá</strong> — The Prophecy of the Seeress, the first poem
            of the Poetic Edda. Cosmic creation, Ragnarök, and the world reborn.
          </li>
          <li>
            <strong>Hávamál</strong> — Words of the High One, attributed to Odin.
            Practical wisdom, social code, and the acquiring of the runes.
          </li>
          <li>
            <strong>Younger Futhark</strong> — The 16 runes of the Viking Age,
            attested on thousands of runestones across Scandinavia.
          </li>
          <li>
            <strong>Elder Futhark</strong> — The 24 ancient runes, with deeper
            mythic and magical associations.
          </li>
        </ul>

        <h2 className="font-serif text-2xl font-semibold text-ink-950 mt-12 mb-6">
          The Practice
        </h2>

        <p>
          One card per day. Read in 2–3 minutes. Let it sit with you. Share if
          it moves you. The bounded nature of the corpus means each card
          will eventually return, but you'll be different when it does.
        </p>

        <p>
          This is not divination (though it might feel like it). It's just
          attention — to old words, old forms, old ways of encoding meaning.
        </p>

        <div className="mt-16 pt-8 border-t border-gothic-100 text-ink-500 text-base">
          <p>
            Built with care. Ancient lines. Daily signal.
          </p>
        </div>
      </div>
    </div>
  )
}
