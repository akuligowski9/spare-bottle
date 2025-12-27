import { Card, XStack, YStack, Text, Separator } from 'tamagui'

export function RecipeCard({
  name,
  have,
  required,
  missingPreview,
  alcoholLabel,
  responsibleServeAvailable,
  onPress,
}: {
  name: string
  have: number
  required: number
  missingPreview?: string
  alcoholLabel?: string
  responsibleServeAvailable?: boolean
  onPress?: () => void
}) {
  const canMake = have >= required

  return (
    <Card
      p="$4"
      backgroundColor="$cardBackground"
      borderColor="$borderColor"
      borderWidth={1}
      borderRadius="$lg"
      pressStyle={{ opacity: 0.92 }}
      onPress={onPress}
    >
      <YStack gap="$2">
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$6" color="$color">
            {name}
          </Text>
          <Text fontSize="$4" color={canMake ? '$accentColor' : '$muted'}>
            {have}/{required}
          </Text>
        </XStack>

        {alcoholLabel ? (
          <Text fontSize="$3" color="$muted">
            {alcoholLabel}
          </Text>
        ) : null}

        {responsibleServeAvailable ? (
          <Text fontSize="$3" color="$accentColor">
            Responsible-serve variation available
          </Text>
        ) : null}

        <Separator borderColor="$borderColor" />

        <Text fontSize="$3" color="$muted">
          {canMake ? 'Can make now' : `Missing: ${missingPreview ?? 'Some ingredients'}`}
        </Text>
      </YStack>
    </Card>
  )
}
