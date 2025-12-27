import type { Inventory, Recipe, RecipeMatch, MakeabilityBucket } from './types'

function requiredIngredientIds(recipe: Recipe): string[] {
  // For MVP, only count non-optional requirements
  return recipe.required.filter((r) => !r.optional).map((r) => r.ingredientId)
}

export function matchRecipe(recipe: Recipe, inventory: Inventory): RecipeMatch {
  const requiredIds = requiredIngredientIds(recipe)
  const requiredCount = requiredIds.length

  // Guard: avoid divide-by-zero; treat empty as "can make now"
  if (requiredCount === 0) {
    return {
      recipeId: recipe.id,
      bucket: 'CAN_MAKE_NOW',
      requiredCount: 0,
      haveCount: 0,
      missingIds: [],
      coverage: 1,
      missingCount: 0,
    }
  }

  let haveCount = 0
  const missingIds: string[] = []

  for (const id of requiredIds) {
    if (inventory.has(id)) haveCount++
    else missingIds.push(id)
  }

  const missingCount = missingIds.length
  const coverage = haveCount / requiredCount

  const bucket: MakeabilityBucket =
    missingCount === 0
      ? 'CAN_MAKE_NOW'
      : missingCount === 1
        ? 'MISSING_1'
        : missingCount <= 3
          ? 'MISSING_2_3'
          : 'MISSING_4_PLUS'

  return {
    recipeId: recipe.id,
    bucket,
    requiredCount,
    haveCount,
    missingIds,
    coverage,
    missingCount,
  }
}

export function rankMatches(matches: RecipeMatch[]): RecipeMatch[] {
  // Sort logic (deterministic):
  // 1) missingCount asc (0 first)
  // 2) coverage desc
  // 3) requiredCount desc (richer recipes earlier when ties)
  // 4) recipeId asc (stable)
  return [...matches].sort((a, b) => {
    if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount
    if (a.coverage !== b.coverage) return b.coverage - a.coverage
    if (a.requiredCount !== b.requiredCount) return b.requiredCount - a.requiredCount
    return a.recipeId.localeCompare(b.recipeId)
  })
}

export function bucketCounts(matches: RecipeMatch[]): {
  canMakeNow: number
  missing1: number
  missing2to3: number
  missing4plus: number
} {
  let canMakeNow = 0
  let missing1 = 0
  let missing2to3 = 0
  let missing4plus = 0

  for (const m of matches) {
    switch (m.bucket) {
      case 'CAN_MAKE_NOW':
        canMakeNow++
        break
      case 'MISSING_1':
        missing1++
        break
      case 'MISSING_2_3':
        missing2to3++
        break
      case 'MISSING_4_PLUS':
        missing4plus++
        break
    }
  }

  return { canMakeNow, missing1, missing2to3, missing4plus }
}

export function groupByBucket(matches: RecipeMatch[]): Record<MakeabilityBucket, RecipeMatch[]> {
  const grouped: Record<MakeabilityBucket, RecipeMatch[]> = {
    CAN_MAKE_NOW: [],
    MISSING_1: [],
    MISSING_2_3: [],
    MISSING_4_PLUS: [],
  }

  for (const m of matches) grouped[m.bucket].push(m)

  // Keep each bucket internally ranked
  grouped.CAN_MAKE_NOW = rankMatches(grouped.CAN_MAKE_NOW)
  grouped.MISSING_1 = rankMatches(grouped.MISSING_1)
  grouped.MISSING_2_3 = rankMatches(grouped.MISSING_2_3)
  grouped.MISSING_4_PLUS = rankMatches(grouped.MISSING_4_PLUS)

  return grouped
}
