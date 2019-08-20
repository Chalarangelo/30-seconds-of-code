"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa = require("execa");
const getStdin = require("get-stdin");
const path = require("path");
const readPkg = require("read-pkg");
const getConf_1 = require("../getConf");
/**
 * @param argv - process.argv
 */
function run([, scriptPath, hookName = '', HUSKY_GIT_PARAMS], getStdinFn = getStdin // Used for mocking
) {
    return __awaiter(this, void 0, void 0, function* () {
        const cwd = path.resolve(scriptPath.split('node_modules')[0]);
        // In some cases, package.json may not exist
        // For example, when switching to gh-page branch
        let pkg;
        try {
            pkg = readPkg.sync({ cwd, normalize: false });
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
        const config = getConf_1.default(cwd);
        const command = config && config.hooks && config.hooks[hookName];
        const oldCommand = pkg && pkg.scripts && pkg.scripts[hookName.replace('-', '')];
        // Run command
        try {
            const env = {};
            if (HUSKY_GIT_PARAMS) {
                env.HUSKY_GIT_PARAMS = HUSKY_GIT_PARAMS;
            }
            if (['pre-push', 'pre-receive', 'post-receive', 'post-rewrite'].includes(hookName)) {
                env.HUSKY_GIT_STDIN = yield getStdinFn();
            }
            if (command) {
                console.log(`husky > ${hookName} (node ${process.version})`);
                execa.shellSync(command, { cwd, env, stdio: 'inherit' });
                return 0;
            }
            if (oldCommand) {
                console.log();
                console.log(`Warning: Setting ${hookName} script in package.json > scripts will be deprecated`);
                console.log(`Please move it to husky.hooks in package.json, a .huskyrc file, or a husky.config.js file`);
                console.log(`Or run ./node_modules/.bin/husky-upgrade for automatic update`);
                console.log();
                console.log(`See https://github.com/typicode/husky for usage`);
                console.log();
                console.log(`husky > ${hookName} (node ${process.version})`);
                execa.shellSync(oldCommand, { cwd, env, stdio: 'inherit' });
                return 0;
            }
            return 0;
        }
        catch (err) {
            const noVerifyMessage = [
                'commit-msg',
                'pre-commit',
                'pre-rebase',
                'pre-push'
            ].includes(hookName)
                ? '(add --no-verify to bypass)'
                : '(cannot be bypassed with --no-verify due to Git specs)';
            console.log(`husky > ${hookName} hook failed ${noVerifyMessage}`);
            return err.code;
        }
    });
}
exports.default = run;
