# -----------------------------------------
# INSERTION SORT - Insertar en la parte ya ordenada
# -----------------------------------------

items = []
n = 0

# i = elemento actual que queremos insertar
# j = cursor que retrocede comparando elementos
i = 1
j = 1


def init(vals):
    """
    Inicializa la lista y los punteros.
    """
    global items, n, i, j
    items = list(vals)
    n = len(items)
    i = 1        # empezamos desde el segundo elemento
    j = 1


def step():
    """
    Realiza un micro-paso del Insertion Sort.
    """
    global i, j

    if n == 0:
        return {"done": True}

    # Si i recorrió toda la lista, ya terminamos
    if i >= n:
        return {"done": True}

    # Si el elemento j-1 es mayor que j, los intercambiamos
    if j > 0 and items[j - 1] > items[j]:
        a, b = j - 1, j
        items[a], items[b] = items[b], items[a]
        j -= 1                  # retrocedemos
        return {"a": a, "b": b, "swap": True, "done": False}

    # Si ya no hay que retroceder más → avanzar i
    i += 1
    j = i

    return {"a": 0, "b": 0, "swap": False, "done": False}
