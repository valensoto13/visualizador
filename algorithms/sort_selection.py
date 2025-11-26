# -----------------------------------------
# SELECTION SORT - Buscar el mínimo y colocarlo
# -----------------------------------------

items = []
n = 0

# i = posición donde colocaremos el próximo mínimo
# j = cursor que recorre la lista
# min_idx = posición del valor mínimo encontrado hasta ahora
i = 0
j = 0
min_idx = 0


def init(vals):
    """
    Inicializa valores y punteros del algoritmo.
    """
    global items, n, i, j, min_idx
    items = list(vals)
    n = len(items)
    i = 0
    j = i + 1        # empezamos buscando desde i+1
    min_idx = i      # el mínimo inicial es el propio i


def step():
    """
    Realiza un paso del Selection Sort:
    comparamos min_idx contra j o hacemos el swap final.
    """
    global i, j, min_idx

    if n == 0:
        return {"done": True}

    # Si ya colocamos todos los elementos necesarios, terminamos
    if i >= n - 1:
        return {"done": True}

    # Mientras recorremos para buscar el mínimo
    if j < n:
        a, b = min_idx, j

        # Si encontramos un elemento menor, actualizamos min_idx
        if items[b] < items[min_idx]:
            min_idx = b

        j += 1
        return {"a": a, "b": b, "swap": False, "done": False}

    # Cuando j llega al final → hacer swap entre i y min_idx
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
