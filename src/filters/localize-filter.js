import store from '../store'
import ru from '../locales/ru'
import eu from '../locales/en'

const locales = {
        'ru-Ru': ru,
        'en-En': eu
}

export default function localizeFilter(key) {
        const locale = store.getters.info.locale || 'ru-Ru'
        return locales[locale][key] || `Localize error: key ${key} not found`
}