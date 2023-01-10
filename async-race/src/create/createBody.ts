import { createElement, addChildren } from './createElement'

import { header } from './createHeader'
import { sectionRace } from './createSectionRace'
import { sectionResults } from './createSectionResults'


const BODY = document.body
console.log('body')
// BODY.prepend(header)
addChildren(BODY, [header, sectionRace, sectionResults])
