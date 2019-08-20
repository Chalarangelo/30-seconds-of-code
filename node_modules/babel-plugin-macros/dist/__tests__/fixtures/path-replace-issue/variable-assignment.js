import myEval from '../eval.macro'

const result = myEval`+('4' + '2')`

global.result = result
