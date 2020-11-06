import * as general from './general'
import * as storage from './storage'
import * as format from './format'
import * as authentication from './authentication'

const functions = {
    ...general,
    ...storage,
    ...format,
    ...authentication
}

export default functions
