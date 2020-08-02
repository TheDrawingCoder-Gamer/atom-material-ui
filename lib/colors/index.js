'use babel';

import tinycolor from 'tinycolor2';
import writeConfigFile from '../helper/write-config-file';
import toggleClassName from '../helper/toggle-class-name';
import toCamelCase from '../helper/to-camel-case';
import colorTemplates from '../color-templates.json';
import buildColorSettings from './build-color-settings';

atom.config.onDidChange('bulby-dynamic-ui.colors.abaseColor', ({ newValue }) => {
    if (atom.config.get('bulby-dynamic-ui.colors.genAccent')) {
        const accentColor = tinycolor(newValue.toHexString())
            .complement()
            .saturate(20)
            .lighten(5);

        return atom.config.set('bulby-dynamic-ui.colors.accentColor', accentColor.toRgbString());
    }

    return writeConfigFile(
        buildColorSettings(
            newValue, atom.config.get('bulby-dynamic-ui.colors.accentColor'),
        ),
        true,
    );
});

atom.config.onDidChange('bulby-dynamic-ui.colors.predefinedColor', (value) => {
    const newValue = toCamelCase(value.newValue);

    atom.config.set('bulby-dynamic-ui.colors.abaseColor', colorTemplates[newValue].base);
    atom.config.set('bulby-dynamic-ui.colors.accentColor', colorTemplates[newValue].accent);
});

atom.config.onDidChange('bulby-dynamic-ui.colors.accentColor', ({ newValue }) => (
    writeConfigFile(
        buildColorSettings(
            atom.config.get('bulby-dynamic-ui.colors.abaseColor'), newValue,
        ),
        true,
    )
));

atom.config.observe('bulby-dynamic-ui.colors.paintCursor', value => toggleClassName('amu-paint-cursor', value));
