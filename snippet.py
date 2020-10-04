import time


print("1. Time Spent")
print("2. use unemate")
print("3. Comma-separated")
print("4. Print a string N times")

num = int(input("Enter a number: "))
if num == 1:
    start_time = time.time()

    a = 1
    b = 2
    c = a + b
    print(c)  # 3

    end_time = time.time()
    total_time = end_time - start_time
    print("Time: ", total_time)

elif num == 2:
    list = ["a", "b", "c", "d"]
    for index, element in enumerate(list):
        print("Value", element, "Index ", index, )

elif num == 3:
    hobbies = ["basketball", "football", "swimming"]

    print("My hobbies are:")  # My hobbies are:
    print(", ".join(hobbies))  # basketball, football, swimming

elif num == 4:
    n = 2
s = "Programming"

print(s * n)
