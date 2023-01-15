import { addChildren } from './createElement';
import { header } from './createHeader';
import { sectionRace } from './createSectionRace';
import { sectionResults } from './createSectionResults';

const BODY = document.body;
addChildren(BODY, [header, sectionRace, sectionResults]);
