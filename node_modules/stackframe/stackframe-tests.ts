/// <reference path="stackframe.d.ts"/>

// Create StackFrame and set properties
var stackFrame = new StackFrame({
    functionName: 'funName',
    args: ['args'],
    fileName: 'http://localhost:3000/file.js',
    lineNumber: 1,
    columnNumber: 3288,
    isEval: true,
    isNative: false,
    source: 'ORIGINAL_STACK_LINE'
});

stackFrame.functionName;      // => "funName"
stackFrame.setFunctionName('newName');
stackFrame.getFunctionName(); // => "newName"

stackFrame.args;              // => ["args"]
stackFrame.setArgs([]);
stackFrame.getArgs();         // => []

stackFrame.fileName;          // => 'http://localhost:3000/file.min.js'
stackFrame.setFileName('http://localhost:3000/file.js');
stackFrame.getFileName();     // => 'http://localhost:3000/file.js'

stackFrame.lineNumber;        // => 1
stackFrame.setLineNumber(325);
stackFrame.getLineNumber();   // => 325

stackFrame.columnNumber;      // => 3288
stackFrame.setColumnNumber(20);
stackFrame.getColumnNumber(); // => 20

stackFrame.source;            // => 'ORIGINAL_STACK_LINE'
stackFrame.setSource('NEW_SOURCE');
stackFrame.getSource();       // => 'NEW_SOURCE'

stackFrame.isEval;            // => true
stackFrame.setIsEval(false);
stackFrame.getIsEval();       // => false

stackFrame.isNative;            // => false
stackFrame.setIsNative(true);
stackFrame.getIsNative();       // => true

stackFrame.toString(); // => 'funName(args)@http://localhost:3000/file.js:325:20'
