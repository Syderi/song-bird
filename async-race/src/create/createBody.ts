import { createElement, addChildren } from './createElement'

import { header } from './createHeader'
import { sectionRace } from './createSectionRace'


const BODY = document.body
console.log('body')
// BODY.prepend(header)
addChildren(BODY, [header, sectionRace])
