const
    Cmd = require('./cmd'),
    Opt = require('./opt'),
    Arg = require('./arg'),
    shell = require('./shell');

module.exports = {
    Cmd : Cmd.create,
    Opt : Opt.create,
    Arg : Arg.create,
    classes : { Cmd, Opt, Arg },
    shell,
    require
};
