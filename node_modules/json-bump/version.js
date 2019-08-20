const jsonfile = require('jsonfile')

/**
 * bumps the "version" entry for a .json file
 * defaults to incrementing PATCH by 1 if no options are provided
 * @param {string} filename
 * @param {object} [options]
 * @param {string="version"} [entry] name of entry to change
 * @param {number} [major] increment major by number (resetting MINOR and PATCH to 0)
 * @param {number} [minor] increment minor by number (resetting PATCH to 0)
 * @param {number} [patch] increment patch by number
 * @param {string} [replace] replace entry with this string
 * @param {number=4} [spaces] number of spaces to format jsonfile (set to 0 to remove all spaces)
 * @return {object.<string, string>} returns { original, updated }
 */
module.exports = function version(filename, options)
{
    options = options || {}
    if (!options.replace && !options.major && !options.minor && !options.patch)
    {
        options.patch = 1
    }
    options.spaces = typeof options.spaces === 'undefined' ? 4 : options.spaces
    let json
    try
    {
        if (filename.indexOf('/') === -1 && filename.indexOf('\\') === -1)
        {
            filename = process.cwd() + '/' + filename
        }
        json = jsonfile.readFileSync(filename)
    }
    catch (e)
    {
        console.error('ERROR opening file ' + filename + ' (' + e.error + ')')
        process.exit(1)
    }
    options.entry = options.entry || 'version'
    const current = json[options.entry]
    let updated, split
    if (options.replace)
    {
        json[options.entry] = options.entry
        updated = options.entry
    }
    else
    {
        split = current.split('.')
        if (split.length !== 3)
        {
            console.warn('WARNING version in ' + filename + ' was not in MAJOR.MINOR.PATCH format')
            for (let i = split.length; i < 3; i++)
            {
                split[i] = '0'
            }
        }
        if (options.major)
        {
            split[0] = parseInt(split[0]) + options.major
            split[1] = '0'
            split[2] = '0'
        }
        else if (options.minor)
        {
            split[1] = parseInt(split[1]) + options.minor
            split[2] = '0'
        }
        else if (options.patch)
        {
            split[2] = parseInt(split[2]) + options.patch
        }
    }
    json[options.entry] = parseInt(split[0]) + '.' + parseInt(split[1]) + '.' + parseInt(split[2])
    updated = json[options.entry]
    jsonfile.writeFileSync(filename, json, { spaces: options.spaces})
    return { original: current, updated }
}