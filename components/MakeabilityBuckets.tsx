import { Card, XStack, YStack, Text } from 'tamagui'

type Bucket = {
  symbol: '✓' | '◐' | '○'
  label: string
  count: number
}

export function MakeabilityBuckets({
  buckets,
  onPressBucket,
}: {
  buckets: Bucket[]
  onPressBucket?: (label: string) => void
}) {
  return (
    <YStack gap="$3">
      {buckets.map((b) => (
        <Card
          key={b.label}
          p="$4"
          bg="$cardBackground"
          borderColor="$borderColor"
          borderWidth={1}
          br="$lg"
          pressStyle={{ opacity: 0.92 }}
          onPress={() => onPressBucket?.(b.label)}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" gap="$3">
              <Text fontSize="$6" color="$accentColor">
                {b.symbol}
              </Text>
              <Text fontSize="$5" color="$color">
                {b.label}
              </Text>
            </XStack>

            <Text fontSize="$5" color="$muted">
              {b.count}
            </Text>
          </XStack>
        </Card>
      ))}
    </YStack>
  )
}
