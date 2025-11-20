items = []
n = 0
i = 0
j = 0
min_idx = 0

def init(vals):
    global items, n, i, j, min_idx
    items = list(vals)
    n = len(items)
    i = 0
    j = i + 1
    min_idx = i

def step():
    global i, j, min_idx
    if n == 0:
        return {"done": True}
    if i >= n - 1:
        return {"done": True}
    if j < n:
        a, b = min_idx, j
        if items[b] < items[min_idx]:
            min_idx = b
        j += 1
        return {"a": a, "b": b, "swap": False, "done": False}
    else:
        if min_idx != i:
            items[i], items[min_idx] = items[min_idx], items[i]
            res = {"a": i, "b": min_idx, "swap": True, "done": False}
        else:
            res = {"a": i, "b": i, "swap": False, "done": False}
        i += 1
        j = i + 1
        min_idx = i
        return res