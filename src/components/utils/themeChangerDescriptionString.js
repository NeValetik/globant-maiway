/**
 * A util function for twailight kcc
 * @param theme - string light or dark
 * @param light - light descriptors
 * @param dark - dark descriptors
 * @param both - both
 * @return
 */
const themeChangerDescriptionString = (theme, light, dark, both = '') => {
    return `${both} ${theme === "light" ? light : dark}`
}

export default themeChangerDescriptionString
