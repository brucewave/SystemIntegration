import requests
import json
from faker import Faker

fake = Faker()

headers = {'Content-Type': 'application/json'}

n = int(input("Nhập số lượng request : "))

for i in range(n):
    data = {
        "employeeId": ''.join(fake.random_letters(length=5)),
        "firstName": fake.first_name(),
        "lastName": fake.last_name(),
        "vacationDays": fake.random_int(min=1, max=30),
        "paidToDate": fake.random_int(min=100, max=1000),
        "paidLastYear": fake.random_int(min=100, max=1000),
        "payRate": fake.random_int(min=10, max=100),
        "payRateId": fake.random_int(min=100, max=1000)
    }

    response = requests.post(
        'http://localhost:4000/api/employee', data=json.dumps(data), headers=headers)
    if response.status_code == 200:
        print(f'POST request {i+1} successful')
    else:
        print(f'Error on POST request {i+1}: {response.text}')
