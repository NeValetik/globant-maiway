/**
 * A util function for twailight kcc
 * @param theme - string light or dark
 * @param light - light descriptors
 * @param dark - dark descriptors
 * @return
 */
const themeChangerDescriptionString = (theme, light, dark) => {
    return theme === "light" ? light : dark
}

export default themeChangerDescriptionString
