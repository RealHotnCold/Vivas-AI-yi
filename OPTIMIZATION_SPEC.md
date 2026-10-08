# Optimization Specification

## Objective

Choose adaptation interventions that minimize expected loss subject to real constraints.

Conceptual objective:

minimize expected agricultural loss

subject to:
- intervention cost <= budget
- water use <= available water
- land use <= available land
- food production >= minimum requirement

## Candidate interventions

Examples:
- sowing-date shift
- drought-tolerant/short-cycle variety
- irrigation strategy
- water storage
- crop diversification

Only include interventions that can be parameterized from available evidence.

## Solver

Possible:
- OR-Tools
- SciPy
- PuLP

Select based on problem formulation.

## Output

Return:
- selected interventions
- cost
- water use
- production
- expected loss
- avoided loss
- assumptions
- solver status

Do not claim mathematical optimality if the model is heuristic or if constraints are incomplete.
