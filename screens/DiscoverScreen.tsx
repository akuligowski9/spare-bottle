import { ScrollView, YStack, Text } from 'tamagui'
import { MakeabilityBuckets } from '../components/MakeabilityBuckets'
import { RecipeCard } from '../components/RecipeCard'
import { recipes, ingredients } from '../data/catalog.sample'
import { bucketCounts, groupByBucket, matchRecipe, rankMatches } from '../domain/matching'
import type { Inventory } from '../domain/types'

function ingredientNameById(id: string): string {
  return ingredients.find((i) => i.id === id)?.name ?? id
}

const demoInventory: Inventory = new Set(['gin', 'tonic'])

export function DiscoverScreen() {
  const matches = rankMatches(recipes.map((r) => matchRecipe(r, demoInventory)))
  const counts = bucketCounts(matches)
  const grouped = groupByBucket(matches)

  const buckets = [
    { symbol: '✓' as const, label: 'Can Make Now', count: counts.canMakeNow },
    { symbol: '◐' as const, label: 'Missing 1 Ingredient', count: counts.missing1 },
    { symbol: '○' as const, label: 'Missing 2–3 Ingredients', count: counts.missing2to3 },
  ]

  return (
    <ScrollView backgroundColor="$background">
      <YStack p="$4" gap="$4">
        <YStack gap="$2">
          <Text fontSize="$8" color="$color">
            Spare Bottle
          </Text>
          <Text fontSize="$4" color="$muted">
            Reference catalog • No advice
          </Text>
        </YStack>

        <MakeabilityBuckets buckets={buckets} />

        <YStack gap="$3" mt="$2">
          {grouped.CAN_MAKE_NOW.map((m) => {
            const recipe = recipes.find((r) => r.id === m.recipeId)!
            return (
              <RecipeCard
                key={recipe.id}
                name={recipe.name}
                have={m.haveCount}
                required={m.requiredCount}
                alcoholLabel={recipe.alcoholLabel}
                responsibleServeAvailable={recipe.responsibleServeAvailable}
              />
            )
          })}

          {[...grouped.MISSING_1, ...grouped.MISSING_2_3].map((m) => {
            const recipe = recipes.find((r) => r.id === m.recipeId)!
            const missing = m.missingIds.slice(0, 2).map(ingredientNameById).join(', ')
            return (
              <RecipeCard
                key={recipe.id}
                name={recipe.name}
                have={m.haveCount}
                required={m.requiredCount}
                alcoholLabel={recipe.alcoholLabel}
                responsibleServeAvailable={recipe.responsibleServeAvailable}
                missingPreview={missing}
              />
            )
          })}
        </YStack>
      </YStack>
    </ScrollView>
  )
}

export default DiscoverScreen
