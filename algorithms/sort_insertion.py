items = []
n = 0
i = 1
j = 1

def init(vals):
    global items, n, i, j
    items = list(vals)
    n = len(items)
    i = 1
    j = 1

def step():
    global i, j, n

    if n == 0:
        return {"done": True}

    if i >= n:
        return {"done": True}

    # Si todavía hay que desplazar hacia la izquierda
    if j > 0 and items[j - 1] > items[j]:
        a, b = j - 1, j
        items[a], items[b] = items[b], items[a]
        j -= 1
        return {"a": a, "b": b, "swap": True, "done": False}

    # Si este elemento ya está insertado → pasar al siguiente
    i += 1
    j = i
    return {"a": i - 1, "b": j - 1, "swap": False, "done": False}
