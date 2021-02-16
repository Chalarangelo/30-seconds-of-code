---
title: bmi
tags: math,intermediate
---

Calling bmi(weight,height) returns your body mass index.

- it uses the formula 'weight in kilogram / height in meter square'.
- where weight(kg) and height(m).

```js
const bmi = (weight,height) => {
  const calculatedBMI = Math.round(weight/(height*height));
    	
  if(calculatedBMI < 18.5){
      return 'Your BMI is '+calculatedBMI+', you are underweight.';
  }

  if(calculatedBMI > 18.5 && calculatedBMI < 24.9){
      return 'Your BMI is '+calculatedBMI+', your weight is normal.';
  }

  if(calculatedBMI > 25 && calculatedBMI < 29.9){
      return 'Your BMI is '+calculatedBMI+', you are overweight.';
  }
    	
  if(calculatedBMI > 30 && calculatedBMI < 34.9){
      return 'Your BMI is '+calculatedBMI+', you are overweight (Obesity class ONE).';
  }

  if(calculatedBMI > 35 && calculatedBMI < 39.9){
      return 'Your BMI is '+calculatedBMI+', you are overweight (Obesity class TWO).';
  }
    	
  if(calculatedBMI > 40){
      return 'Your BMI is '+calculatedBMI+', you are overweight (Obesity class THREE).';
  }

};
```

```js
bmi(45,1.75); // you are underweight
bmi(65,1.75); // your weight is normal
bmi(85,1.75);  // you are overweight
bmi(100,1.75);  // you are overweight (Obesity class ONE).
bmi(120,1.75);  // you are overweight (Obesity class TWO).
bmi(140,1.75);  // you are overweight (Obesity class THREE).
bmi(0,0);  // undefined
bmi(null); // undefined
bmi(undefined); // undefined
bmi(); // undefined
```
