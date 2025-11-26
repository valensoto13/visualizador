# -----------------------------------------
# BUBBLE SORT - Ordena comparando vecinos
# -----------------------------------------

# Lista interna donde guardamos los valores
items = []

# Cantidad de elementos
n = 0

# Punteros del algoritmo:
# i = número de pasada
# j = posición actual dentro de esa pasada
i = 0
j = 0

# swapped indica si hubo algún intercambio.
# Si nunca hubo, la lista ya está ordenada.
swapped = False


def init(vals):
    """
    Inicializa el algoritmo.
    Se ejecuta una sola vez al comenzar o al mezclar la lista.
    """
    global items, n, i, j, swapped
    items = list(vals)
    n = len(items)
    i = 0              # empezamos por la primera pasada
    j = 0              # y la primera comparación
    swapped = False    # todavía no hubo intercambios


def step():
    """
    Ejecuta UN solo paso del Bubble Sort.
    Hace una comparación o un intercambio.
    """
    global i, j, swapped, n

    # Caso especial: lista vacía
    if n == 0:
        return {"done": True}

    # Si ya hicimos todas las pasadas necesarias, terminamos
    if i >= n - 1:
        return {"done": True}

    # Comparaciones dentro de la pasada
    if j < n - i - 1:

        # Comparar elementos vecinos j y j+1
        a, b = j, j + 1

        # Si están en orden incorrecto, intercambiar
        if items[a] > items[b]:
            items[a], items[b] = items[b], items[a]
            swapped = True
            j += 1
            return {"a": a, "b": b, "swap": True, "done": False}

        # Si están en orden correcto, solo avanzar
        j += 1
        return {"a": a, "b": b, "swap": False, "done": False}

    # Si terminó la pasada completa y NO hubo swaps → ya está ordenado
    if not swapped:
        return {"done": True}

    # Preparar una nueva pasada
    swapped = False
    j = 0
    i += 1

    return {"a": 0, "b": 1, "swap": False, "done": False}
