'use babel';

import setFontSize from './set-font-size';

atom.config.observe('bulby-dynamic-ui.fonts.fontSize', size => setFontSize(size));
