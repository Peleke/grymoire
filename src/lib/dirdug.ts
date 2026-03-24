// ============================================================================
// Ðirðug: The Long Road North — Route Data
// ============================================================================
// Edit this file to update nodes, content links, and narrative text.
// Everything on the prospectus page reads from here.
// ============================================================================

export type ContentStatus = 'published' | 'draft' | 'planned' | 'aspirational'
export type NodeStatus = 'active' | 'planned' | 'aspirational'

export type ContentType =
  | 'essay'
  | 'field-recording'
  | 'language-study'
  | 'research'
  | 'hema'
  | 'travel-log'
  | 'render'

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  essay: 'Essay',
  'field-recording': 'Field Recording',
  'language-study': 'Language Study',
  research: 'Research',
  hema: 'HEMA',
  'travel-log': 'Travel Log',
  render: 'Unreal Render',
}

export interface ContentLink {
  title: string
  type: ContentType
  status: ContentStatus
  /** Link to published/draft content on the site */
  href?: string
  description?: string
}

/** Derived stable slug ID for anchoring, detail pages, sponsor links */
export function contentSlug(nodeId: string, title: string): string {
  return `${nodeId}--${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
}

export interface NodeFace {
  name: string
  description: string
  aspirational?: boolean
}

export interface RouteNode {
  id: string
  order: number
  name: string
  /** For nodes with dual identity (e.g. Iceland = Reykjavik + Glaumbær) */
  faces?: NodeFace[]
  coordinates: [number, number]
  status: NodeStatus
  /** Liminal nodes render as dashed segments, no pin */
  liminal?: boolean
  /** One-line thematic anchor shown in compact route list */
  thematicAnchor: string
  /** Longer narrative prose for the detail panel */
  narrative: string
  /** Thematic tags for cross-referencing */
  historicalAnchors: string[]
  content: ContentLink[]
  /** Full campaign page path (nodes that have earned their own page) */
  campaignPage?: string
  /** Arc grouping for visual segmentation */
  arc: 'italy' | 'alpine' | 'rhineland' | 'hanseatic' | 'denmark' | 'sweden' | 'norway' | 'atlantic' | 'america'
}

// ============================================================================
// The Route
// ============================================================================

export const ROUTE_NODES: RouteNode[] = [
  // --- ITALIAN ARC ---
  {
    id: 'rome',
    order: 0,
    name: 'Rome',
    coordinates: [41.9028, 12.4964],
    status: 'planned',
    campaignPage: '/nodes/rome',
    thematicAnchor: 'A Song, an Heir, and the Ruler of All',
    narrative:
      'A Gothic king is buried in a riverbed and never found. Eight centuries before him, a Gallic warlord sacks the same city on the same terms.\n\nBetween them, Rome built walls against exactly the people it kept hiring to defend them...and then executed its best general for having the wrong blood.\n\nWe begin where Guðríður ends her pilgrimage, in the city that knew what "Roman" meant, but never quite decides who counts as such...',
    historicalAnchors: ['Alaric', 'Guðríður', 'Ovid', 'Ulfilas', 'Brennus', 'Stilicho', 'Aurelian Walls', 'Gothic', 'Arian Christianity'],
    arc: 'italy',
    content: [
      // Track A: History/Culture
      { title: 'A Song, an Heir, and the Ruler of All', type: 'essay', status: 'planned', description: '"This place is a backwater." Ovid, probably. He screws up; the Emperor sends him to Tomis. The same lands give rise to Alaric, who, after Stilicho is executed in 408 for being, essentially, too German, breaches the very walls Aurelius raised in anticipation of him. A fate Guðríður might have seen as ordained, looking back from her vantage as a new Catholic, walking these streets just decades after her own people chose the cross at Öxarárfoss.' },
      { title: 'Guðríður: The Heir', type: 'essay', status: 'planned', description: 'What did the pilgrimage actually feel like, day to day?\n\nThe blisters. The inns. The men who stared. The women who shared bread and stories. What did she think, walking through a city that had swallowed empires?\n\nThe saga sources give us her route. We have to imagine the rest...honestly, without invention, toward the silence the record keeps.' },
      { title: 'Walking the Aurelian Walls', type: 'field-recording', status: 'planned', description: 'The walls built 270 AD against the threat Alaric fulfilled 140 years later' },
      { title: 'Sala d\'Arme Achille Marozzo Roma', type: 'hema', status: 'aspirational', href: 'https://hemaratings.com/clubs/details/815/', description: 'Italian school of swordsmanship, XV-XVI century treatises. Marozzo\'s Opera Nova (1536) is the foundation. If scheduling permits, we train with the Rome chapter.' },
      // Track B: Historical Linguistics
      { title: 'The Tongues of Rome\'s Undoing', type: 'language-study', status: 'planned', description: 'The atta unsar echoes on the walls as Rome\'s monks sing the pater noster within them. Different in language, stock, and values. Not even agreed on which brand of Christian to call themselves.\n\nTwo prayers to the same god in two Germanic tongues, separated by centuries and a creed.' },
      // Unreal Renders
      { title: 'The Execution of Stilicho', type: 'render', status: 'planned', description: '30-60s. Ravenna, 408 AD. Rome\'s best general kneels. He\'s half-Vandal. That\'s the crime.' },
      { title: 'Alaric Beneath the Busento', type: 'render', status: 'planned', description: '30-60s. The river diverted. The king laid in the riverbed. The workers killed. The water let back in. No one finds the grave.' },
      { title: 'Brennus on the Servian Walls', type: 'render', status: 'planned', description: '30-60s. 387 BC. The Gauls breach the walls. Dies Alliensis. Rome remembers this for eight centuries until Alaric does it again.' },
    ],
  },
  {
    id: 'fiesole-florence',
    order: 1,
    name: 'Fiesole → Florence',
    coordinates: [43.7696, 11.2558],
    status: 'planned',
    thematicAnchor: 'Six names, no agreement, and a language no family claims',
    narrative:
      'The Etruscans had six names, none of which agreed.\n\nFiesole is older than Rome\'s claim to the soil of Tuscany, and no one\'s quite decoded the language of its predecessor kingdom.\n\nPerhaps that\'s why Rome sent her own children here to learn the olden ways: twelve boys each year, dispatched to Fiesole to read the wings of birds as they revealed the wills of the gods through the winds.\n\nI\'m here to ask the Etruscans whether it was six or twelve vultures that Remus saw...Or, was it Romulus?...',
    historicalAnchors: ['Etruscans', 'Tyrsenian', 'Rasenna', 'Augury', 'Ovid', 'Odin', 'Stilicho'],
    arc: 'italy',
    content: [
      // Track A: History/Culture
      { title: 'From Viesul to Firenze', type: 'essay', status: 'planned', description: 'Fiesole before Rome, the Etruscans absorbed, the question of the foreign inherited from Stilicho' },
      { title: 'Augury and the Twelve', type: 'essay', status: 'planned', description: 'Roman divination from Etruscan roots. Twelve boys sent to learn haruspicy; twelve names Odin claims for himself.' },
      { title: 'The Fiesole archaeological zone', type: 'field-recording', status: 'planned', description: 'Hilltop ruins above Florence. Etruscan walls, Roman baths, the layers visible.' },
      // Track B: Historical Linguistics
      { title: 'Tyrsenian Linguistics', type: 'language-study', status: 'planned', description: 'Etruscan, Rhaetian, Lemnian. A proposed pre-Indo-European family. What connects these isolates, and how can one even tell?' },
      { title: 'What Etruria Has in Common with Its Age', type: 'language-study', status: 'planned', description: 'Metathesis. From *tursci to Etrusci: how the Romans rearranged a people they never fully understood.' },
      // Unreal Renders
      { title: 'The Twelve Boys on the Hill', type: 'render', status: 'planned', description: '30-60s. Fiesole. Twelve boys reading the flight of birds over Tuscany. Learning to hear the gods in the wind.' },
      { title: 'Romulus and Remus Count Vultures', type: 'render', status: 'planned', description: '30-60s. The Palatine. Two brothers. One sees six. One sees twelve. The argument over who counts truer ends with one of them dead.' },
    ],
  },
  {
    id: 'milan',
    order: 2,
    name: 'Milan',
    coordinates: [45.4642, 9.19],
    status: 'planned',
    thematicAnchor: 'The middle of the sanctuary',
    narrative:
      'Before it was Lombard, it was Ostrogothic. Before that, Roman. Before that, Celtic.\n\nThe Insubres called it Medhelanon, "the middle of the sanctuary," and aligned it to something we can only guess at.\n\nThe Italian we\'ll speak in these videos is Tuscan. The language Milan grew up in is not.',
    historicalAnchors: ['Insubres', 'Medhelanon', 'Stilicho', 'Ostrogoths', 'Lombards', 'Gallo-Italic', 'Cisalpine Gaul'],
    arc: 'italy',
    content: [
      // Track A: History/Culture
      { title: 'Medhelanon', type: 'essay', status: 'planned', description: 'The Insubres and the sacred plain. Stilicho\'s defense. The four peoples who held Milan before the Italians.' },
      { title: 'Four Layers of a City', type: 'field-recording', status: 'planned', description: 'Celtic, Roman, Ostrogothic, Lombard. What survives in the streets.' },
      { title: 'Medieval military history of Lombardy', type: 'hema', status: 'aspirational' },
      // Track B: Historical Linguistics
      { title: 'The Genealogy of Milanese', type: 'language-study', status: 'planned', description: 'Gallo-Italic, Lombardic, Tuscan. Celtic substrate. Germanic superstrate. Why the language of Milan is not the language of Florence.' },
      { title: 'Stumbling in Lombard', type: 'field-recording', status: 'planned', description: 'Milan in the vernacular. Tuscan Italian meets Milanese on rooftops and in bars.' },
      // Unreal Renders
      { title: 'The Sanctuary at Medhelanon', type: 'render', status: 'planned', description: '30-60s. The Insubres align a sacred space in the middle of the plain. No Romans yet. No roads yet. Just the land and whatever they were listening to.' },
    ],
  },

  // --- ALPINE ARC ---
  {
    id: 'como',
    order: 3,
    name: 'Como',
    coordinates: [45.808, 9.0852],
    status: 'planned',
    thematicAnchor: 'Where the plain ends and the passes begin',
    narrative:
      'Pliny the Elder was born at the foot of these mountains. So was Catullus. The lake doesn\'t care about either of them.\n\nComo is where the plain ends and the passes begin. The same route the Cimbri took on their way south from Jutland, the Lombards took on their way down from the Elbe, everyone heading north or south has taken. We\'re headed to Jutland, too.\n\nSomewhere in the rock above us, the Rhaetians carved inscriptions in a language that sounds like Etruscan and isn\'t quite anything else. The thread from Fiesole doesn\'t end. It just goes underground.',
    historicalAnchors: ['Pliny', 'Rhaetian', 'Tyrsenian', 'Alpine crossings', 'Cimbri'],
    arc: 'alpine',
    content: [
      // Track A: History/Culture
      { title: 'Pliny\'s Como and the road over the Alps', type: 'essay', status: 'planned', description: 'The naturalist\'s birthplace at the threshold of every northward migration' },
      { title: 'Lake Como to the Passes', type: 'field-recording', status: 'planned', description: 'The climb north. The same route for two thousand years.' },
      // Track B: Historical Linguistics
      { title: 'Rhaetian Inscriptions and the Tyrsenian Thread', type: 'language-study', status: 'planned', description: 'Etruscan at Fiesole. Rhaetian in the Alps. The substrate resurfaces in stone.' },
    ],
  },
  {
    id: 'zurich',
    order: 4,
    name: 'Zurich',
    coordinates: [47.3769, 8.5417],
    status: 'planned',
    thematicAnchor: 'A Celtic name, a Roman province, a Swiss typeface',
    narrative:
      'The Franks came through. The name might be Celtic. The typeface is named for a Roman province.\n\nZurich sits where Germanic, Latinate, and Celtic worlds collapsed into each other and nobody sorted it out. They just made watches and stayed neutral.\n\nTonight we drink in a city full of genius.',
    historicalAnchors: ['Franks', 'Helvetica', 'Celtic-Roman', 'High German consonant shift'],
    arc: 'alpine',
    content: [
      // Track A: History/Culture
      { title: 'Helvetica', type: 'essay', status: 'planned', description: 'From province to typeface. How a Roman administrative name became the most ubiquitous font on earth.' },
      { title: 'Zurich Tech and Design', type: 'field-recording', status: 'planned', description: 'Design history and tech scene. Typography\'s genealogy with empire.' },
      // Track B: Historical Linguistics
      { title: 'Swiss German and the High German consonant shift', type: 'language-study', status: 'planned', description: 'The sound change that split Germanic in two, frozen in Swiss dialect' },
      { title: 'Stumbling in Schwiizerdütsch', type: 'field-recording', status: 'planned', description: 'The dialect they don\'t teach you in German class' },
    ],
  },

  // --- RHINELAND ARC ---
  {
    id: 'cologne',
    order: 5,
    name: 'Cologne',
    coordinates: [50.9375, 6.9603],
    status: 'planned',
    thematicAnchor: 'Rome\'s foothold on the Rhine',
    narrative:
      'Colonia Claudia Ara Agrippinensium. The full name tells you everything: this was Rome\'s colony, planted on the Rhine as a border post.\n\nThe Franks took it. The Merovingians made it a capital. The cathedral still houses the reliquary of the Three Kings, carried north from Milan in 1164.\n\nThe līmēs ends here. Everything past the river, Rome had to let go.',
    historicalAnchors: ['Roman limes', 'Franks', 'Merovingians', 'Pilgrimage', 'Three Kings'],
    arc: 'rhineland',
    content: [
      // Track A: History/Culture
      { title: 'Colonia Agrippina', type: 'essay', status: 'planned', description: 'Rome on the Rhine. The colony, the Franks, the cathedral. The Three Kings reliquary carried north from Milan.' },
      { title: 'The Rhine Road', type: 'field-recording', status: 'planned', description: 'Cologne, Bonn, Düsseldorf. The river road north. Beethoven\'s Bonn, the Altstadt in Düsseldorf, the cathedral in Cologne. The road trip itself is the field study.' },
      // Track B: Historical Linguistics
      { title: 'Ripuarian Frankish and the Rhineland Dialects', type: 'language-study', status: 'planned', description: 'Where Romance and Germanic met on the river and neither won.' },
      { title: 'Stumbling in Kölsch', type: 'field-recording', status: 'planned', description: 'The dialect that comes with the beer. Cologne to Düsseldorf, the accent shifts by the kilometer.' },
      // Unreal Renders
      { title: 'The Three Kings Leave Milan', type: 'render', status: 'planned', description: '30-60s. 1164. The reliquary carried north from Milan to Cologne. The bones of three kings crossing the Alps in a box.' },
    ],
  },

  // --- TEUTOBURG ---
  {
    id: 'teutoburg',
    order: 6,
    name: 'Teutoburger Wald',
    coordinates: [51.91, 8.84],
    status: 'planned',
    thematicAnchor: 'The forest that stopped Rome',
    narrative:
      '9 AD. Arminius, a Germanic chieftain who\'d served as a Roman officer, leads a coalition into the forest against Publius Quinctilius Varus. Three legions walk in. None walk out.\n\nRome never pushes past the Rhine again.\n\nArminius is the inverse Alaric. Both Germanic men who served Rome then turned against it. Alaric marched south and sacked the capital. Arminius stayed in the trees and won.\n\nThe Hermannsdenkmal stands above them now, a 19th-century monument worth interrogating. From this point forward on the route, we are in the world Adam of Bremen tried to describe.',
    historicalAnchors: ['Arminius', 'Varus', 'Battle of Teutoburg Forest', 'Roman limes', 'Legions XVII XVIII XIX'],
    arc: 'rhineland',
    content: [
      // Track A: History/Culture
      { title: 'Three Legions Walk in the Woods', type: 'essay', status: 'planned', description: 'Varus, Arminius, and legions XVII, XVIII, XIX. Three walked in. The numbers were never reissued.' },
      { title: 'The Hermannsdenkmal', type: 'essay', status: 'planned', description: '19th-century nationalist monument to a 1st-century defector. Worth interrogating.' },
      { title: 'Walking the Teutoburg Forest', type: 'field-recording', status: 'planned', description: 'The trees have had two thousand years to forget.' },
      // Track B: Historical Linguistics
      { title: 'Old Germanic Tribal Names and the Latin Sources', type: 'language-study', status: 'planned', description: 'Tacitus, the ethnographies, and what we can reconstruct of early Germanic from people who didn\'t speak it.' },
      // Unreal Renders
      { title: 'The Legions Enter the Forest', type: 'render', status: 'planned', description: '30-60s. 9 AD. Teutoburger Wald. The column stretches into the trees. Arminius watches from the treeline. The guide turns around. The audience follows.' },
    ],
  },

  // --- HANSEATIC ARC ---
  {
    id: 'bremen',
    order: 7,
    name: 'Bremen',
    coordinates: [53.0793, 8.8017],
    status: 'planned',
    thematicAnchor: 'Adam of Bremen, Uppsala from afar, family',
    narrative:
      'Adam of Bremen wrote his Gesta Hammaburgensis here in the 1070s. The earliest detailed account of Scandinavian geography and religion written from outside Scandinavia. His description of the temple at Uppsala, received secondhand, remains one of the most cited and debated sources in Norse studies.\n\nHe described what he could not see. We\'ll do the same from Copenhagen.\n\nAlso: family lives here.',
    historicalAnchors: ['Adam of Bremen', 'Uppsala', 'Gesta Hammaburgensis'],
    arc: 'hanseatic',
    content: [
      // Track A: History/Culture
      { title: 'Adam of Bremen and the Uppsala Question', type: 'essay', status: 'planned', description: 'A monk in Bremen describes the temple at Uppsala without ever visiting. The most cited secondhand account in Norse studies.' },
      { title: 'Bremen', type: 'travel-log', status: 'planned', description: 'Family. Personal connections. The reason this stop exists.' },
      // Track B: Historical Linguistics
      { title: 'Low German and the Hanseatic Lingua Franca', type: 'language-study', status: 'planned', description: 'The trade language that connected the Baltic to the North Sea. What it sounded like. What it left behind.' },
      { title: 'Stumbling in Plattdüütsch', type: 'field-recording', status: 'planned', description: 'Low German with family. The language the Hanse spoke.' },
      // Unreal Renders
      { title: 'Adam Writes What He Cannot See', type: 'render', status: 'planned', description: '30-60s. Bremen, 1070s. A monk at a desk. He writes about a temple in Uppsala he will never visit. The camera pulls back through the window. North.' },
    ],
  },
  {
    id: 'hamburg',
    order: 8,
    name: 'Hamburg',
    coordinates: [53.5511, 9.9937],
    status: 'planned',
    thematicAnchor: 'The Hammaburg. Adam\'s seat.',
    narrative:
      'The seat of the Archdiocese that Adam documented. Hamburg and Bremen were twin cities of the northern church\'s mission to Scandinavia.\n\nThe Hammaburg fortress preceded the city. From here, Christianity moved north. From here, Adam looked toward Uppsala and described what he could not see.',
    historicalAnchors: ['Hammaburg', 'Adam of Bremen', 'Christianization'],
    arc: 'hanseatic',
    content: [
      // Track A: History/Culture
      { title: 'Hammaburgiensis', type: 'essay', status: 'planned', description: 'The northern mission. The fortress that became a city. The church that looked north and sent priests into a world it didn\'t understand.' },
      { title: 'The Hammaburg and Early Hamburg', type: 'field-recording', status: 'planned', description: 'What remains of the fortress beneath the modern city.' },
      // Unreal Renders
      { title: 'The Hammaburg', type: 'render', status: 'planned', description: '30-60s. The timber fortress on the Elbe. Priests walk north. The mission to Scandinavia begins from a ring of wooden walls.' },
    ],
  },

  // --- DENMARK ARC ---
  {
    id: 'jelling-aarhus',
    order: 9,
    name: 'Jelling + Aarhus',
    coordinates: [55.95, 9.73],
    status: 'planned',
    thematicAnchor: 'Denmark\'s birth certificate, carved in stone',
    narrative:
      'The Jelling stones. Denmark\'s birth certificate. Harald Bluetooth\'s runic inscription claims he "made the Danes Christian" and "won for himself all of Denmark and Norway."\n\nThe larger stone is the most significant runic monument in Scandinavia. Aarhus, minutes away, now hosts one of northern Europe\'s most active tech communities.\n\nRunology begins here.',
    historicalAnchors: ['Jelling stones', 'Harald Bluetooth', 'Runology'],
    arc: 'denmark',
    content: [
      // Track A: History/Culture
      { title: 'Denmark\'s Birth Certificate', type: 'essay', status: 'planned', description: 'The Jelling stones. Harald Bluetooth claims a country in runes. The most significant runic monument in Scandinavia.' },
      { title: 'Aarhus', type: 'field-recording', status: 'planned', description: 'Tech scene meets Viking history. Minutes from Jelling.' },
      // Track B: Historical Linguistics
      { title: 'Runology Field Study', type: 'research', status: 'planned', description: 'Jelling inscriptions. Reading the stones in person.' },
      { title: 'Danish and the Scandinavian Split', type: 'language-study', status: 'planned', description: 'Where one North Germanic language became three. Or five. Depends who you ask.' },
      { title: 'Stumbling in Dansk', type: 'field-recording', status: 'planned', description: 'The language the Swedes can\'t understand and the Norwegians pretend to.' },
      // Unreal Renders
      { title: 'Harald Bluetooth\'s Stone', type: 'render', status: 'planned', description: '30-60s. Jelling. A king orders runes carved into a boulder. Denmark\'s birth certificate. The chisel hits the stone.' },
    ],
  },
  {
    id: 'copenhagen',
    order: 10,
    name: 'Copenhagen',
    coordinates: [55.6761, 12.5683],
    status: 'planned',
    thematicAnchor: 'Absalon\'s fortress. The bishop\'s military outpost.',
    narrative:
      'Founded by Bishop Absalon in 1167, who built a fortress on the island of Slotsholmen. Christiansborg Palace stands there now.\n\nCopenhagen means "merchant\'s harbor." It was a bishop\'s military outpost first.\n\nThe city is younger than the sagas it now preserves in its royal libraries.',
    historicalAnchors: ['Absalon', 'Christiansborg', 'Royal Library', 'Fensalir', 'Trundholm'],
    arc: 'denmark',
    content: [
      // Track A: History/Culture
      { title: 'Absalon\'s Fortress', type: 'essay', status: 'planned', description: 'The founding of Copenhagen. A bishop builds a fort on an island. A city grows around it. The sagas end up in the library.' },
      { title: 'Walking Slotsholmen', type: 'field-recording', status: 'planned', description: 'The island where Absalon planted his fortress. Christiansborg stands on top of it now.' },
      { title: 'Fensalir from Zealand', type: 'essay', status: 'planned', description: 'Invoking Frigg\'s hall from a distance. Adam of Bremen described Uppsala without seeing it. We invoke Fensalir without visiting it. The Trundholm sun chariot in the Nationalmuseet.' },
      // Track B: Historical Linguistics
      { title: 'Copenhagen Danish vs. Jutlandic', type: 'language-study', status: 'planned', description: 'The capital dialect and the rural one. What the city did to the language.' },
      // Unreal Renders
      { title: 'Absalon Builds on Slotsholmen', type: 'render', status: 'planned', description: '30-60s. 1167. A bishop in armor on a bare island. The fortress goes up. A city will grow around it. He doesn\'t know that yet.' },
    ],
  },

  // --- SWEDEN ARC ---
  {
    id: 'gothenburg',
    order: 11,
    name: 'Gothenburg',
    coordinates: [57.7089, 11.9746],
    status: 'planned',
    thematicAnchor: 'The Goths come home',
    narrative:
      'Bödvar Bjarki fought in the shape of a bear while his body lay sleeping in the king\'s hall. The Hrólfs saga kraka places him among the Götar...the Geats of Beowulf...the Goths who gave their name to this city and to an entire civilizational arc.\n\nAlaric\'s Visigoths began this journey\'s thematic thread in Rome. Gothenburg is where it returns home.\n\nThe Gothic migration, à l\'envers.',
    historicalAnchors: ['Goths', 'Alaric', 'Geats', 'Beowulf'],
    arc: 'sweden',
    content: [
      // Track A: History/Culture
      { title: 'The Goths Come Home', type: 'essay', status: 'planned', description: 'Alaric left here. We arrive. The thread from Rome closes in the city that carries the name.' },
      { title: 'Götaland Runestones', type: 'research', status: 'planned', description: 'Swedish inscriptions. Runology continues from Jelling into Götaland.' },
      { title: 'Throwing Bones', type: 'hema', status: 'aspirational', description: 'Bjarki catches a bone mid-flight and hurls it back across the hall. Höttr stops cowering. A warrior gets made. We practice thrown weapons. If scheduling permits, we throw things at a club in Gothenburg.' },
      // Track B: Historical Linguistics
      { title: 'Swedish vs. Danish', type: 'language-study', status: 'planned', description: 'The Scandinavian dialect continuum. Where does one language end and another begin? Nobody agrees.' },
      { title: 'Stumbling in Svenska', type: 'field-recording', status: 'planned', description: 'Norwegian speaker meets Swedish. We understand each other. Mostly.' },
      // Unreal Renders
      { title: 'Bödvar Bjarki in the King\'s Hall', type: 'render', status: 'planned', description: '30-60s. Hrólfr Kraki\'s hall. Bjarki\'s body lies sleeping. Above the battlefield, a great bear fights in his shape.' },
    ],
  },

  // --- NORWAY ARC ---
  {
    id: 'oslo',
    order: 12,
    name: 'Oslo',
    coordinates: [59.9139, 10.7522],
    status: 'planned',
    thematicAnchor: 'Akershus. Håkon V\'s fortress. Quisling\'s trial.',
    narrative:
      'Håkon V built Akershus Fortress in 1299. Seven centuries later, Vidkun Quisling was tried and executed inside it.\n\nThe same walls. One king built them to hold a country together. Another man\'s betrayal was judged within them.\n\nOlav den Hellige made Norway Christian by force. Oslo became the administrative heart of a kingdom that stretched from Greenland to the Orkneys. The Viking ships rest in museums on the fjord now. Family lives here too.',
    historicalAnchors: ['Akershus', 'Håkon V', 'Quisling', 'Olav den Hellige', 'Christianization', 'Viking ships'],
    arc: 'norway',
    content: [
      // Track A: History/Culture
      { title: 'Akershus', type: 'essay', status: 'planned', description: 'Håkon V builds a fortress. Quisling is tried inside it. Seven centuries of Norwegian sovereignty in the same walls.' },
      { title: 'Olav den Hellige', type: 'essay', status: 'planned', description: 'Christianization by force. The king who made Norway kneel and pray.' },
      { title: 'The Viking Ship Museum', type: 'field-recording', status: 'planned', description: 'The Oseberg ship. The Gokstad ship. Pulled from the earth. Put behind glass.' },
      // Track B: Historical Linguistics
      { title: 'Bokmål, Nynorsk, and the Norwegian Language Question', type: 'language-study', status: 'planned', description: 'One country, two written standards, and a century of argument about which one is real.' },
      // Unreal Renders
      { title: 'Quisling at Akershus', type: 'render', status: 'planned', description: '30-60s. 1945. The same fortress Håkon V built in 1299. A traitor stands trial inside the walls a king raised to protect the country the traitor sold.' },
    ],
  },
  {
    id: 'telemark',
    order: 13,
    name: 'Telemark',
    coordinates: [59.4, 8.7],
    status: 'planned',
    thematicAnchor: 'The mark of the Þilir',
    narrative:
      'The mark of the Þilir. A people whose name survives in the region but whose identity dissolved into the broader Norse world during the Migration Period.\n\nTelemark\'s dialects preserved archaic features longer than almost anywhere else in Scandinavia.\n\nThe inland route from Oslo toward the western coast passes through some of the most linguistically conservative territory in Norway. The old forms live here.',
    historicalAnchors: ['Þilir', 'Migration Period', 'Dialectology'],
    arc: 'norway',
    content: [
      // Track A: History/Culture
      { title: 'The Þilir', type: 'essay', status: 'planned', description: 'A Migration Period people whose name outlasted their identity. Telemark remembers the word. The people dissolved.' },
      { title: 'The Inland Route', type: 'field-recording', status: 'planned', description: 'Oslo to the western coast through Telemark. The road the tourists skip.' },
      // Track B: Historical Linguistics
      { title: 'Telemark Dialect', type: 'language-study', status: 'planned', description: 'Archaic features in modern speech. The old forms live here. Dialectology fieldwork in the most conservative territory in Norway.' },
      { title: 'Dialectology Field Notes', type: 'research', status: 'planned', description: 'Telemark. Recording what the standardizers tried to iron out.' },
      // Unreal Renders
      { title: 'The Þilir on the Mark', type: 'render', status: 'planned', description: '30-60s. Migration Period. A people on the inland plateau. They have a name. In a few centuries, only the land will remember it.' },
    ],
  },
  {
    id: 'stavanger-hafrsfjord',
    order: 14,
    name: 'Stavanger + Hafrsfjord',
    coordinates: [58.97, 5.7331],
    status: 'planned',
    thematicAnchor: 'Three swords in stone',
    narrative:
      'Harald Fairhair fights the Battle of Hafrsfjord and unifies Norway under a single crown. 872, traditionally.\n\nThe Sverd i fjell monument marks the site. Three giant bronze swords planted in rock. Stavanger itself is an oil city now.\n\nThe fjord remembers.',
    historicalAnchors: ['Harald Fairhair', 'Hafrsfjord', 'Unification', 'Sverd i fjell'],
    arc: 'norway',
    content: [
      // Track A: History/Culture
      { title: 'Hafrsfjord', type: 'essay', status: 'planned', description: 'The battle that unified Norway. One crown. One king. One fjord that still carries the weight.' },
      { title: 'Sverd i Fjell', type: 'field-recording', status: 'planned', description: 'Three giant bronze swords planted in rock. We stand among them.' },
      { title: 'Viking-Age Swordsmanship', type: 'hema', status: 'aspirational', description: 'If we can find a club or a field. The swords in the stone are ceremonial. Ours won\'t be.' },
      // Unreal Renders
      { title: 'The Battle of Hafrsfjord', type: 'render', status: 'planned', description: '30-60s. 872. Ships in the fjord. Harald Fairhair\'s fleet against the petty kings. Norway gets unified whether it likes it or not.' },
    ],
  },
  {
    id: 'haugesund',
    order: 15,
    name: 'Haugesund',
    coordinates: [59.4138, 5.268],
    status: 'planned',
    thematicAnchor: 'Home',
    narrative:
      'Home.\n\nKarmsundet, the strait that gives Karmøy its name, is where Snorri Sturluson placed the mythological rivers Kormt and Ørmt. The waters Thor must wade through each day on his way to judgment at Yggdrasil.\n\nAvaldsnes, on the island, was a seat of power from the Bronze Age through the Viking period. Harald Fairhair\'s burial mound is here.\n\nSo is my family\'s.',
    historicalAnchors: ['Karmsundet', 'Thor', 'Avaldsnes', 'Harald Fairhair', 'Snorri'],
    arc: 'norway',
    content: [
      // Track A: History/Culture
      { title: 'Thor\'s Rivers and Harald\'s Grave', type: 'essay', status: 'planned', description: 'Karmsundet. Kormt and Ørmt. The mythological rivers mapped onto a strait you drive over to visit Avaldsnes.' },
      { title: 'Avaldsnes', type: 'research', status: 'planned', description: 'Bronze Age to Viking Age. A seat of power for three thousand years. Harald Fairhair\'s burial mound.' },
      { title: 'Arriving Home', type: 'travel-log', status: 'planned', description: 'Haugesund. The personal thread lands.' },
      // Track B: Historical Linguistics
      { title: 'Haugesund Dialect and Vestland Norwegian', type: 'language-study', status: 'planned', description: 'The dialect I grew up hearing. What it preserves. What it lost. What it sounds like to come home to.' },
      { title: 'Dinner by Torfaeus', type: 'field-recording', status: 'planned', description: 'Family friends in Kopervik, near the statue of Þormóður Torfason. Interview video. The Icelander who wrote Norway\'s history in Latin from a house on Karmøy.' },
      // Unreal Renders
      { title: 'Thor Wades the Kormt', type: 'render', status: 'planned', description: '30-60s. The mythological rivers. Thor wades through Kormt and Ørmt on his way to judgment at Yggdrasil. The strait of Karmsundet is the real-world echo.' },
    ],
  },
  {
    id: 'bergen',
    order: 16,
    name: 'Bergen',
    coordinates: [60.3913, 5.3221],
    status: 'planned',
    thematicAnchor: 'Bryggen. Håkon\'s Hall. The king who commissioned sagas.',
    narrative:
      'Bryggen. The wooden wharf where German merchants ran the stockfish trade for centuries, leaving their marks in the wood, the ledgers, and the Low German loanwords that crept into Norwegian and never left...\n\nBergen was also Håkon Håkonsson\'s capital, and it was Håkon who commissioned the translation of French courtly romances into Old Norse, creating the riddarasögur...',
    historicalAnchors: ['Bryggen', 'Håkon Håkonsson', 'Hanseatic League', 'Riddarasögur'],
    arc: 'norway',
    content: [
      // Track A: History/Culture
      { title: 'Bryggen', type: 'essay', status: 'planned', description: 'The Hanseatic wharf. Stockfish, trade, and the German merchants who ran the economy from a row of wooden buildings.' },
      { title: 'The King Who Commissioned Sagas', type: 'essay', status: 'planned', description: 'Håkon Håkonsson. The riddarasögur. French courtly romances translated into Old Norse because the king wanted them.' },
      { title: 'Håkon\'s Hall', type: 'field-recording', status: 'planned', description: 'Still standing in Bergen. We walk through it.' },
      // Unreal Renders
      { title: 'Håkon Commissions the Riddarasögur', type: 'render', status: 'planned', description: '30-60s. Bergen, 1240s. The king tells a scribe to translate French romances into Old Norse. The scribe picks up the pen. Tristan becomes Tristrams saga.' },
    ],
  },

  // --- ATLANTIC ARC ---
  {
    id: 'north-atlantic',
    order: 17,
    name: 'The North Atlantic',
    coordinates: [62.5, -10.0],
    status: 'planned',
    liminal: true,
    thematicAnchor: 'Not a stop, but a passage',
    narrative:
      'The sea between Norway and Iceland. Guðríður crossed it a thousand years ago in an open ship; after the second war, thousands of Scandinavians crossed it again, westward, toward North America.\n\nThis is not a stop but a passage, between what came once and what comes whence.',
    historicalAnchors: ['Guðríður', 'Post-WWII migration', 'North Atlantic crossing'],
    arc: 'atlantic',
    content: [
      // Track A: History/Culture
      { title: 'The Crossing', type: 'essay', status: 'planned', description: 'Ancient and modern. Guðríður in an open ship. My grandfather on a steamer. The same water.' },
      { title: 'Post-WWII Scandinavian Emigration', type: 'research', status: 'planned', description: 'Who left. Why. What they carried. What they didn\'t.' },
      // Unreal Renders
      { title: 'Guðríður\'s Ship', type: 'render', status: 'planned', description: '30-60s. The North Atlantic. An open ship on grey water. A woman stands at the prow. She has done this crossing before. She will do it again.' },
    ],
  },
  {
    id: 'iceland',
    order: 18,
    name: 'Iceland',
    coordinates: [64.1466, -21.9426],
    status: 'planned',
    faces: [
      {
        name: 'Reykjavik',
        description:
          'The manuscripts live here, in the Árni Magnússon Institute, preserved from centuries of Danish custody. The language spoken on this island is the closest living descendant of the Old Norse these texts were written in.',
      },
      {
        name: 'Glaumbær',
        description:
          'Guðríður\'s own farmstead in Skagafjörður. The physical origin point of the woman whose inverse journey this project traces. If the aurora cooperates, we film here.',
        aspirational: true,
      },
    ],
    thematicAnchor: 'Where the manuscripts live',
    narrative:
      'Reykjavik. The manuscripts live here, in the Árni Magnússon Institute, preserved from centuries of Danish custody and finally returned.\n\nThe language spoken on this island is the closest living descendant of the Old Norse these texts were written in. You can read the sagas aloud and be understood on the street.\n\nIf Glaumbær is reachable, it is Guðríður\'s own farmstead in Skagafjörður, the physical origin point of the woman whose path we\'ve been tracing in reverse since Rome.',
    historicalAnchors: ['Guðríður', 'Árni Magnússon', 'Manuscript culture', 'Old Norse'],
    arc: 'atlantic',
    content: [
      // Track A: History/Culture
      { title: 'The Manuscripts\' Return', type: 'essay', status: 'planned', description: 'The Árni Magnússon Institute. The manuscripts Denmark held for centuries, returned to Iceland. What survived. What burned.' },
      { title: 'Glaumbær', type: 'field-recording', status: 'aspirational', description: 'Guðríður\'s farmstead. Skagafjörður. If we get here, we film. If the aurora cooperates, we film that too.' },
      // Track B: Historical Linguistics
      { title: 'Icelandic as Living Old Norse', type: 'language-study', status: 'planned', description: 'You can read the sagas aloud and be understood on the street. What that means. What it costs a language to stay still while the world moves.' },
      { title: 'Stumbling in Íslenska', type: 'field-recording', status: 'planned', description: 'Norwegian speaker meets Icelandic. We share ancestors. The languages diverged a thousand years ago. We try anyway.' },
      // Unreal Renders
      { title: 'Guðríður at Glaumbær', type: 'render', status: 'planned', description: '30-60s. Skagafjörður. The farmstead. The woman who walked from Iceland to Vinland to Rome and back stands in the doorway. The aurora, if we\'re lucky.' },
    ],
  },

  // --- AMERICAN ARC (CODA) ---
  {
    id: 'nyc',
    order: 19,
    name: 'New York City',
    coordinates: [40.7128, -74.006],
    status: 'planned',
    thematicAnchor: 'Grandfather\'s landing',
    narrative:
      'A Norwegian teenager steps off a ship and onto a Manhattan pier, takes the subway to Coney Island, buys a hot dog at Nathan\'s, and rides back up to Radio City Music Hall.\n\nDecades later his grandson retraces the route with friends. The same subway. The same Nathan\'s. The same city, seen through different eyes.',
    historicalAnchors: ['Norwegian emigration', 'Family history', 'Coney Island', 'Brighton Beach'],
    arc: 'america',
    content: [
      // Track A: History/Culture
      { title: 'Grandfather\'s New York', type: 'essay', status: 'planned', description: 'A Norwegian ship captain lands in Manhattan as a teenager. His grandson follows the same route decades later. The personal thread that binds the old crossing to the new.' },
      { title: 'Coney Island to Radio City', type: 'travel-log', status: 'planned', description: 'Retracing the route. The subway. Nathan\'s. Radio City. His path, our feet.' },
      { title: 'Brighton Beach', type: 'travel-log', status: 'planned', description: 'Personal history. My ex\'s family. The Russian quarter. The boardwalk.' },
      // Unreal Renders
      { title: 'A Norwegian Teenager on the Pier', type: 'render', status: 'planned', description: '30-60s. Manhattan, mid-century. A teenager steps off a ship. He doesn\'t know his grandson will stand here decades later, retracing his steps.' },
    ],
  },
  {
    id: 'syracuse',
    order: 20,
    name: 'Syracuse',
    coordinates: [43.0481, -76.1474],
    status: 'planned',
    thematicAnchor: 'The Greek echo on American soil',
    narrative:
      'Family\'s current base in upstate New York, the name borrowed from the Greek colony in Sicily, another European echo transplanted to American soil.\n\nA pause before the final leg.',
    historicalAnchors: ['Greek Syracuse', 'American naming', 'Family'],
    arc: 'america',
    content: [
      // Track A: History/Culture
      { title: 'European Names on American Soil', type: 'essay', status: 'planned', description: 'Syracuse, Rome, Troy, Ithaca. Upstate New York is a graveyard of classical place-names. What the settlers were reaching for when they named these towns.' },
      { title: 'Syracuse', type: 'travel-log', status: 'planned', description: 'Family. The pause before the last leg.' },
    ],
  },
  {
    id: 'atlanta',
    order: 21,
    name: 'Atlanta',
    coordinates: [33.749, -84.388],
    status: 'planned',
    thematicAnchor: 'Terminus',
    narrative:
      'Terminus, the original name of the city, the end of the Western & Atlantic Railroad line. Atalanta, the Greek huntress who would not be caught.\n\nThe journey that began at the center of one empire ends at the terminus of another.\n\nGemma is waiting.',
    historicalAnchors: ['Terminus', 'Atalanta', 'Railroad'],
    arc: 'america',
    content: [
      // Track A: History/Culture
      { title: 'Terminus', type: 'essay', status: 'planned', description: 'Endings and Atalanta. The railroad city. The huntress. The place where it stops.' },
      { title: 'Coming Home', type: 'travel-log', status: 'planned', description: 'Atlanta. Gemma. The end.' },
      // Unreal Renders
      { title: 'Terminus', type: 'render', status: 'planned', description: '30-60s. The railroad line ends. The city that grew around the endpoint. The huntress who would not be caught. The traveler who came home.' },
    ],
  },
]

// ============================================================================
// Arc metadata — for visual grouping on the map and route list
// ============================================================================

export interface ArcInfo {
  id: RouteNode['arc']
  name: string
  lineStyle: 'solid' | 'dashed'
}

export const ARCS: ArcInfo[] = [
  { id: 'italy', name: 'Italian Arc', lineStyle: 'solid' },
  { id: 'alpine', name: 'Alpine Crossing', lineStyle: 'solid' },
  { id: 'rhineland', name: 'Rhineland', lineStyle: 'solid' },
  { id: 'hanseatic', name: 'Hanseatic North', lineStyle: 'solid' },
  { id: 'denmark', name: 'Denmark', lineStyle: 'solid' },
  { id: 'sweden', name: 'Sweden', lineStyle: 'solid' },
  { id: 'norway', name: 'Norway', lineStyle: 'solid' },
  { id: 'atlantic', name: 'North Atlantic', lineStyle: 'dashed' },
  { id: 'america', name: 'American Coda', lineStyle: 'solid' },
]

// ============================================================================
// Helpers
// ============================================================================

export function getNodeById(id: string): RouteNode | undefined {
  return ROUTE_NODES.find((n) => n.id === id)
}

export function getNodesByArc(arc: RouteNode['arc']): RouteNode[] {
  return ROUTE_NODES.filter((n) => n.arc === arc)
}

export function getPublishedContent(node: RouteNode): ContentLink[] {
  return node.content.filter((c) => c.status === 'published')
}

export function getPlannedContent(node: RouteNode): ContentLink[] {
  return node.content.filter((c) => c.status === 'planned' || c.status === 'draft')
}

export function getAspirationalContent(node: RouteNode): ContentLink[] {
  return node.content.filter((c) => c.status === 'aspirational')
}
