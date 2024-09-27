profit = input("수익 : ")
profit = int(profit)
tax = 0

if profit > 20000000000:
    tax += (profit - 20000000000) * 0.30
    profit = 20000000000

if profit > 10000000000:
    tax += (profit - 10000000000) * 0.24
    profit = 10000000000

if profit > 5000000000:
    tax += (profit - 5000000000) * 0.19
    profit = 5000000000

if profit > 2500000000:
    tax += (profit - 2500000000) * 0.14
    profit = 2500000000

if profit > 1000000000:
    tax += (profit - 1000000000) * 0.10
    profit = 1000000000

if profit > 500000000:
    tax += (profit - 500000000) * 0.07
    profit = 500000000

tax += profit * 0.04

print(tax)