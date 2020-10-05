---
title: strongPasswordGenerator
tags: password, generator
---

generate strong password with given length.

- this password contain uppercase, lowercase, number, and symbol.

```js
class StrongPassword{

	getRandomUpperCase(){
		return String.fromCharCode(Math.floor(Math.random()*26)+65);
	}

	getRandomLowerCase(){
		return String.fromCharCode(Math.floor(Math.random()*26)+97);
	}

	getRandomNumber(){
		return String.fromCharCode(Math.floor(Math.random()*10)+48);
	}

	getRandomSymbol(){
		const symbol = "!@#$%^&*(){}[]=<>/,.|~?";
    	return symbol[Math.floor(Math.random()*symbol.length)];
	}

	generate(length){
		const arrFunc = [
			this.getRandomUpperCase,
			this.getRandomLowerCase,
			this.getRandomNumber,
			this.getRandomSymbol
		];
		 let generatedPass = "";
		 let arrFuncIndex = 0;
		 for(let i = 0; i < length; i++){
		 	generatedPass += arrFunc[arrFuncIndex]();
		 	arrFuncIndex = arrFuncIndex + 1;
		 	if (arrFuncIndex > 3){
		 		arrFuncIndex = 0;
		 	}
		 }
		 return generatedPass;
	}
}
```

```js
const pass = new StrongPassword().generate(8); //given length is 8
console.log(pass);// "Ty3@Zf0>" this is random
```
