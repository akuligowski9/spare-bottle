export type Ingredient = {
  id: string
  name: string
  kind: 'spirit' | 'liqueur' | 'mixer' | 'garnish' | 'other'
  abv?: number // informational only
}

export type RecipeIngredientReq = {
  ingredientId: string
  optional?: boolean
}

export type Recipe = {
  id: string
  name: string
  required: RecipeIngredientReq[] // treat optional=false as required for matching
  tags?: string[]
  responsibleServeAvailable?: boolean
  alcoholLabel?: string // informational copy only (no "safe" language)
}

export type Inventory = Set<string>

export type MakeabilityBucket = 'CAN_MAKE_NOW' | 'MISSING_1' | 'MISSING_2_3' | 'MISSING_4_PLUS'

export type RecipeMatch = {
  recipeId: string
  bucket: MakeabilityBucket
  requiredCount: number
  haveCount: number
  missingIds: string[]
  coverage: number // haveCount / requiredCount
  missingCount: number
}
