# Template for creating new sort algorithms.
# Must expose init(vals: list[int]) and step() -> dict
items = []
n = 0

def init(vals):
    global items, n
    items = list(vals)
    n = len(items)

def step():
    # Example return when finished:
    # return {"done": True}
    # Example return for a non-swap comparison:
    # return {"a": 0, "b": 1, "swap": False, "done": False}
    raise NotImplementedError("Implement step()")