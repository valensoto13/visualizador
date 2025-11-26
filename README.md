# TP – Visualización de Algoritmos de Ordenamiento
## Introducción a la Programación – 2025

### Integrantes
- Valentina Soto
- Maylen Speso
- Salas Candela

---

## 🧩 Algoritmos implementados

### ✔ Obligatorios
Los siguientes algoritmos están implementados dentro de `/algorithms/` y cumplen el contrato `init(vals)` + `step()`:

- `sort_bubble.py` — Bubble Sort  
- `sort_selection.py` — Selection Sort  
- `sort_insertion.py` — Insertion Sort  

### ✔ Opcionales / Extra
También se incluyen algoritmos extra para ampliar la visualización:

- `sort_quick.py` — Quick Sort (iterativo con pila)  
- `sort_merge.py` — Merge Sort (bottom-up)  
- `sort_shell.py` — Shell Sort  

---

## 📝 Nota breve sobre decisiones de implementación

- Cada algoritmo fue adaptado al modelo **paso a paso** requerido por el visualizador:  
  cada llamada a `step()` realiza **una sola comparación o swap**, nunca un bucle completo.
- Se mantuvo un **estado interno explícito** (punteros como `i`, `j`, `min_idx`, `gap`, pilas, etc.) para continuar el algoritmo en la siguiente llamada.
- En todos los algoritmos se asegura que:
  - Los índices devueltos (`a`, `b`) siempre estén en rango.  
  - Si `swap=True`, el intercambio ya fue aplicado en la lista Python (`items`).  
  - El algoritmo sólo finaliza cuando corresponde con `{"done": True}`.
- Para los algoritmos extra (Quick, Merge, Shell) se eligieron implementaciones **sin recursión**, completamente compatibles con el visualizador.

