"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const readPkg = require("read-pkg");
const hookList = {
    applypatchmsg: 'applypatch-msg',
    commitmsg: 'commit-msg',
    postapplypatch: 'post-applypatch',
    postcheckout: 'post-checkout',
    postcommit: 'post-commit',
    postmerge: 'post-merge',
    postreceive: 'post-receive',
    postrewrite: 'post-rewrite',
    postupdate: 'post-update',
    preapplypatch: 'pre-applypatch',
    preautogc: 'pre-auto-gc',
    precommit: 'pre-commit',
    preparecommitmsg: 'prepare-commit-msg',
    prepush: 'pre-push',
    prerebase: 'pre-rebase',
    prereceive: 'pre-receive',
    pushtocheckout: 'push-to-checkout',
    sendemailvalidate: 'sendemail-validate',
    update: 'update'
};
function upgrade(cwd) {
    const pkgFile = path.join(cwd, 'package.json');
    if (fs.existsSync(pkgFile)) {
        const pkg = readPkg.sync({ cwd, normalize: false });
        console.log(`husky > upgrading ${pkgFile}`);
        // Don't overwrite pkg.husky if it exists
        if (pkg.husky) {
            return console.log(`husky field in package.json isn't empty, skipping automatic upgrade`);
        }
        const hooks = {};
        // Loop trhough hooks and move them to husky.hooks
        Object.keys(hookList).forEach(name => {
            const script = pkg.scripts[name];
            if (script) {
                delete pkg.scripts[name];
                const newName = hookList[name];
                hooks[newName] = script.replace(/\bGIT_PARAMS\b/g, 'HUSKY_GIT_PARAMS');
                console.log(`moved scripts.${name} to husky.hooks.${newName}`);
            }
        });
        if (Object.keys(hooks).length) {
            pkg.husky = { hooks };
        }
        else {
            console.log('no hooks found');
        }
        // Update package.json
        fs.writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`, 'utf-8');
        console.log(`husky > done`);
    }
}
exports.default = upgrade;
