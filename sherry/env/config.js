import { LEVEL_STRING, SHERRY_SWITCH } from '../constants';

export default {
    "level": LEVEL_STRING.DEBUG,
    "filter": {},
    "switch": [
        SHERRY_SWITCH.TIME,
        SHERRY_SWITCH.LEVEL,
        SHERRY_SWITCH.COLOR,
        SHERRY_SWITCH.MODULE
    ]
};