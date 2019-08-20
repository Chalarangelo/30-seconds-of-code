// This is very hacky, but this should be temporary hack
// until we make "sharp" a peerDependency and can be removed afterwards.
// It's not done yet because it would cause too much friction.
// Image processing is important part of Gatsby ecosystem
// and there's lot of guides and tutorials that we don't control
// that would be outdated. Moving "sharp" to be peerDependency
// is scheduled for gatsby@3.

// This file is duplicated in multiple location in this repository,
// So make sure to apply same changes every "safe-sharp" file.

const childProcess = require(`child_process`)
const path = require(`path`)
const fs = require(`fs`)
const semver = require(`semver`)

const originalConsoleError = console.error
const restoreConsoleError = () => {
  console.error = originalConsoleError
}

const getDetailedMessage = () => {
  try {
    // `npm list` seems to work in yarn installed projects as long
    // as there is no package-lock.json, so let's bail out
    // if both lock files exist

    if (
      fs.existsSync(path.join(process.cwd(), `package-lock.json`)) &&
      fs.existsSync(path.join(process.cwd(), `yarn.lock`))
    ) {
      return null
    }

    let msg = []
    const { dependencies } = JSON.parse(
      childProcess.execSync(`npm list sharp --json`, {
        encoding: `utf-8`,
      })
    )

    const findSharpVersion = dependency => {
      if (dependency.dependencies.sharp) {
        return dependency.dependencies.sharp.version
      }

      for (let depName of Object.keys(dependency.dependencies)) {
        const v = findSharpVersion(dependency.dependencies[depName])
        if (v) {
          return v
        }
      }

      return null
    }

    const { latestVersion, topLevelPackages } = Object.keys(
      dependencies
    ).reduce(
      (acc, depName) => {
        const sharpVersion = findSharpVersion(dependencies[depName])
        if (sharpVersion) {
          acc.topLevelPackages[depName] = sharpVersion

          if (
            !acc.latestVersion ||
            semver.gt(sharpVersion, acc.latestVersion)
          ) {
            acc.latestVersion = sharpVersion
          }
        }

        return acc
      },
      {
        latestVersion: undefined,
        topLevelPackages: {},
      }
    )

    let packagesToUpdate = []
    // list top level dependencies
    msg = msg.concat([
      `List of installed packages that depend on sharp:`,
      ...Object.keys(topLevelPackages).map(depName => {
        const sharpVersion = topLevelPackages[depName]
        if (sharpVersion !== latestVersion) {
          packagesToUpdate.push(depName)
        }
        return ` - ${depName}${
          sharpVersion
            ? ` (${sharpVersion})${
                sharpVersion !== latestVersion ? ` - needs update` : ``
              }`
            : ``
        }`
      }),
    ])

    if (packagesToUpdate.length > 0) {
      msg = msg.concat([
        ``,
        `If you are using npm, run:`,
        ``,
        `npm install ${packagesToUpdate.join(` `)}`,
        ``,
        `If you are using yarn, run:`,
        ``,
        `yarn add ${packagesToUpdate.join(` `)}`,
      ])
    }

    return msg
    // eslint-disable-next-line no-empty
  } catch {
    return null
  }
}

const handleMessage = msg => {
  if (msg.includes(`Incompatible library version: sharp.node requires`)) {
    restoreConsoleError()

    let msg = [
      `It looks like there are multiple versions of "sharp" module installed.`,
      `Please update any packages that depend on "sharp".`,
      ``,
    ]

    const detailedMessage = getDetailedMessage()
    if (!detailedMessage) {
      msg = msg.concat([
        `To get a list of installed packages that depend on "sharp" try running:`,
        ` - npm list sharp (if you use npm)`,
        ` - yarn why sharp (if you use yarn)`,
        ` and update packages that depend on version older than latest listed in output of above command.`,
      ])
    } else {
      msg = msg.concat(detailedMessage)
    }

    msg = msg.concat([
      ``,
      `If an older version of "sharp" still persists and this error is displayed after updating your packages, open an issue in the package's repository and request them to update the "sharp" dependency.`,
    ])

    console.error(msg.join(`\n`))
  }
}

let sharp
try {
  // sharp@0.22.1 uses console.error and then process.exit and doesn't throw
  // so to capture error and provide meaningful troubleshooting guide
  // we intercept console.error calls and add special handling.
  console.error = (msg, ...args) => {
    originalConsoleError(msg, ...args)
    handleMessage(msg)
  }
  sharp = require(`sharp`)
} catch (e) {
  handleMessage(e.toString())
  throw e
} finally {
  restoreConsoleError()
}

module.exports = sharp
