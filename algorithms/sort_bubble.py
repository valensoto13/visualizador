items = []
n = 0
i = 0
j = 0
swapped = False

def init(vals):
    global items, n, i, j, swapped
    items = list(vals)
    n = len(items)
    i = 0
    j = 0
    swapped = False

def step():
    global i, j, swapped, n

    if n == 0:
        return {"done": True}

    # Si ya se hicieron todas las pasadas
    if i >= n - 1:
        return {"done": True}

    # Comparaciones dentro de la pasada
    if j < n - i - 1:
        a, b = j, j + 1

        if items[a] > items[b]:
            items[a], items[b] = items[b], items[a]
            swapped = True
            j += 1
            return {"a": a, "b": b, "swap": True, "done": False}

        j += 1
        return {"a": a, "b": b, "swap": False, "done": False}

    # Si terminó una pasada
    if not swapped:
        return {"done": True}

    swapped = False
    j = 0
    i += 1

    return {"a": 0, "b": 1, "swap": False, "done": False}
