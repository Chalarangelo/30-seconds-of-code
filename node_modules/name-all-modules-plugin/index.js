function NameAllModulesPlugin() {
}

NameAllModulesPlugin.prototype.apply = function (compiler) {
    compiler.plugin("compilation", (compilation) => {
      compilation.plugin("before-module-ids", (modules) => {
        modules.forEach((module) => {
          if (module.id !== null) {
            return;
          }
          module.id = module.identifier();
        });
      });
    });
};

module.exports = NameAllModulesPlugin;
