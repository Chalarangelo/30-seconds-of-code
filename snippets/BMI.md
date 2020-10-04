---
title: BMI
tags: math,beginner
---

Return the Body Mass Index of a person.

- Use `Math.pow()` to find the value BMI as per the foemula BMI = weight/Math.pow(height,2).
- Weight in kilogram(kg) and Height in Centimeter(cm)

```js
funtion bmi(weight,height){
  let bmi= weight/Math.pow(height,2);
  if (bmi<18.5){
    return "Underweight";
  }else if(bmi<25>){
    return "Normal"
  }else if (bmi<30){
    return "Overweight"
  }else{
    return "Obese"
  }
}
```

```js
bmi(45,170)//Underweight
bmi(50,150)//Normal
bmi(70,150)//Overweight
```
