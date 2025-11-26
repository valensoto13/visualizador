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
    global items, n, i, j, min_idx

    if n == 0:
        return {"done": True}

    # Si ya ordenamos todo
    if i >= n - 1:
        return {"done": True}

    # Comparación dentro de la búsqueda del mínimo
    if j < n:
        a, b = min_idx, j  # resalto lo que comparo

        if items[j] < items[min_idx]:
            min_idx = j  # nuevo mínimo encontrado

        j += 1
        return {"a": a, "b": b, "swap": False, "done": False}

    else:
        # Termina la búsqueda → hacer el swap final
        if min_idx != i:
            items[i], items[min_idx] = items[min_idx], items[i]
            res = {"a": i, "b": min_idx, "swap": True, "done": False}
        else:
            res = {"a": i, "b": i, "swap": False, "done": False}

        # Avanzar a la siguiente posición
        i += 1
        j = i + 1
        min_idx = i

        return res
