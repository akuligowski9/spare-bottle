import type { Ingredient, Recipe } from '../../domain/types'

// Minimal sample ingredients (expand later)
export const ingredients: Ingredient[] = [
  { id: 'gin', name: 'Gin', kind: 'spirit', abv: 40 },
  { id: 'vodka', name: 'Vodka', kind: 'spirit', abv: 40 },
  { id: 'sweet_vermouth', name: 'Sweet Vermouth', kind: 'liqueur', abv: 16 },
  { id: 'campari', name: 'Campari', kind: 'liqueur', abv: 24 },
  { id: 'tonic', name: 'Tonic Water', kind: 'mixer' },
  { id: 'lime', name: 'Lime', kind: 'garnish' },
  { id: 'orange_peel', name: 'Orange Peel', kind: 'garnish' },
]

// Minimal sample recipes (expand later)
export const recipes: Recipe[] = [
  {
    id: 'gin_tonic',
    name: 'Gin & Tonic',
    required: [
      { ingredientId: 'gin' },
      { ingredientId: 'tonic' },
      { ingredientId: 'lime', optional: true }, // optional garnish
    ],
    alcoholLabel: 'Contains alcohol per serving (informational estimate)',
    responsibleServeAvailable: true,
    tags: ['citrus', 'classic'],
  },
  {
    id: 'negroni',
    name: 'Negroni',
    required: [
      { ingredientId: 'gin' },
      { ingredientId: 'campari' },
      { ingredientId: 'sweet_vermouth' },
      { ingredientId: 'orange_peel', optional: true },
    ],
    alcoholLabel: 'Contains alcohol per serving (informational estimate)',
    responsibleServeAvailable: false,
    tags: ['bitter', 'classic'],
  },
  {
    id: 'vodka_tonic',
    name: 'Vodka & Tonic',
    required: [
      { ingredientId: 'vodka' },
      { ingredientId: 'tonic' },
      { ingredientId: 'lime', optional: true },
    ],
    alcoholLabel: 'Contains alcohol per serving (informational estimate)',
    responsibleServeAvailable: true,
    tags: ['citrus', 'simple'],
  },
]
