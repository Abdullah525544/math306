import { Lesson } from '../types';
import { SECTION_1_DATA } from './section1';
import { SECTION_2_DATA } from './section2';
import { SECTION_3_DATA } from './section3';
import { SECTION_4_DATA } from './section4';
import { SECTION_5_DATA } from './section5';

export const SECTIONS_DATA: Record<string, Lesson> = {
  'section-1': SECTION_1_DATA,
  'section-2': SECTION_2_DATA,
  'section-3': SECTION_3_DATA,
  'section-4': SECTION_4_DATA,
  'section-5': SECTION_5_DATA,
};

export {
  SECTION_1_DATA,
  SECTION_2_DATA,
  SECTION_3_DATA,
  SECTION_4_DATA,
  SECTION_5_DATA,
};
