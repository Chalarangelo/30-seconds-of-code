'use strict';

const fs = require('fs');
const path = require('path');

const MemoryFileSystem = require('memory-fs');
const { colors } = require('webpack-log');
const NodeOutputFileSystem = require('webpack/lib/node/NodeOutputFileSystem');

const DevMiddlewareError = require('./DevMiddlewareError');

const { mkdirp } = new NodeOutputFileSystem();

module.exports = {
  toDisk(context) {
    const compilers = context.compiler.compilers || [context.compiler];
    for (const compiler of compilers) {
      compiler.hooks.afterEmit.tap('WebpackDevMiddleware', (compilation) => {
        const { assets } = compilation;
        const { log } = context;
        const { writeToDisk: filter } = context.options;
        let { outputPath } = compiler;

        if (outputPath === '/') {
          outputPath = compiler.context;
        }

        for (const assetPath of Object.keys(assets)) {
          let targetFile = assetPath;

          const queryStringIdx = targetFile.indexOf('?');

          if (queryStringIdx >= 0) {
            targetFile = targetFile.substr(0, queryStringIdx);
          }

          const targetPath = path.isAbsolute(targetFile)
            ? targetFile
            : path.join(outputPath, targetFile);
          const allowWrite =
            filter && typeof filter === 'function' ? filter(targetPath) : true;

          if (allowWrite) {
            const asset = assets[assetPath];
            let content = asset.source();

            if (!Buffer.isBuffer(content)) {
              // TODO need remove in next major release
              if (Array.isArray(content)) {
                content = content.join('\n');
              }

              content = Buffer.from(content, 'utf8');
            }

            mkdirp.sync(path.dirname(targetPath));

            try {
              fs.writeFileSync(targetPath, content, 'utf-8');

              log.debug(
                colors.cyan(
                  `Asset written to disk: ${path.relative(
                    process.cwd(),
                    targetPath
                  )}`
                )
              );
            } catch (e) {
              log.error(`Unable to write asset to disk:\n${e}`);
            }
          }
        }
      });
    }
  },

  setFs(context, compiler) {
    if (
      typeof compiler.outputPath === 'string' &&
      !path.posix.isAbsolute(compiler.outputPath) &&
      !path.win32.isAbsolute(compiler.outputPath)
    ) {
      throw new DevMiddlewareError(
        '`output.path` needs to be an absolute path or `/`.'
      );
    }

    let fileSystem;

    // store our files in memory
    const isConfiguredFs = context.options.fs;
    const isMemoryFs =
      !isConfiguredFs &&
      !compiler.compilers &&
      compiler.outputFileSystem instanceof MemoryFileSystem;

    if (isConfiguredFs) {
      // eslint-disable-next-line no-shadow
      const { fs } = context.options;

      if (typeof fs.join !== 'function') {
        // very shallow check
        throw new Error(
          'Invalid options: options.fs.join() method is expected'
        );
      }

      // eslint-disable-next-line no-param-reassign
      compiler.outputFileSystem = fs;
      fileSystem = fs;
    } else if (isMemoryFs) {
      fileSystem = compiler.outputFileSystem;
    } else {
      fileSystem = new MemoryFileSystem();

      // eslint-disable-next-line no-param-reassign
      compiler.outputFileSystem = fileSystem;
    }

    // eslint-disable-next-line no-param-reassign
    context.fs = fileSystem;
  },
};
