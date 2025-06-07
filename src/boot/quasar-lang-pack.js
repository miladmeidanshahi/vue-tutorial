import { defineBoot } from '#q-app/wrappers'
import { Lang } from 'quasar'

const langList = import.meta.glob('../../node_modules/quasar/lang/(fa-IR|en-US).js')

export default defineBoot(async () => {
  const langIso = Lang.getLocale()

  try {
    langList[`../../node_modules/quasar/lang/${langIso}.js`]().then(lang => {
      Lang.set(lang.default)
    })
  }
  catch (err) {
    console.error(err)
  }
})