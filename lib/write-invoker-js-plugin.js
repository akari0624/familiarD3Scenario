const fs = require('fs')
const path = require('path')

const defaults = {}

function getEntryPoints(bundleInfo = {}) {
  const bundles = Object.keys(bundleInfo)
  return bundles.reduce((entryPoints, bundle) => {
    if (bundleInfo[bundle].isEntry === true) {
      entryPoints.push(bundle)
    }

    return entryPoints
  }, [])
}

export default function(opts = {}) {
  const { target } = opts
  opts = {
    ...defaults,
    target
  }

  return {
    name: 'writeInvokerJS',
    generateBundle(outputOptions, bundleInfo) {
      const targetDir = outputOptions.dir || path.dirname(outputOptions.file)
      const bundles = getEntryPoints(bundleInfo)

      if (!target)
        throw new Error(
          '[write-invoke-js-plugin] You did not provide a template or target!'
        ) // Get the target file name.

      const targetName = path.basename(target) // Add the file suffix if it isn't there.

      const targetFile =
        targetName.indexOf('.html') < 0 ? `${targetName}.html` : targetName // Read the file

      const buffer = fs.readFileSync(target) // Convert buffer to a string and get the </body> index

      const tmpl = buffer.toString('utf8')
      const bodyCloseTag = tmpl.lastIndexOf('</body>') // Inject the script tags before the body close tag

      const injected = [
        tmpl.slice(0, bodyCloseTag),
        bundles.map(b => `<script src="${b}"></script>\n`),
        tmpl.slice(bodyCloseTag, tmpl.length)
      ].join('') // write the injected template to a file

      const finalTarget = path.join(targetDir, targetFile)
      fs.writeFileSync(finalTarget, injected)
    }
  }
}
