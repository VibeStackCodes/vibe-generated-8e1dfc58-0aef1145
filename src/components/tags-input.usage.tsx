import { useState } from 'react'
import { TagsInput } from './tags-input'
import { TagsDisplay } from './tags-display'

/**
 * TagsInput and TagsDisplay Usage Examples
 *
 * Demonstrates how to use both components:
 * - TagsInput: For adding and managing tags
 * - TagsDisplay: For showing tags in read-only mode
 */
export function TagsInputUsage() {
  const [tags, setTags] = useState<string[]>([
    'urgent',
    'work',
    'personal',
  ])
  const [displayTags, setDisplayTags] = useState<string[]>([
    'react',
    'typescript',
    'tailwind',
    'hooks',
  ])
  const [filteredTag, setFilteredTag] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-8">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Tags Components
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive examples of TagsInput and TagsDisplay components
          </p>
        </div>

        {/* TagsInput Example 1: Basic Usage */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              TagsInput - Basic
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Add and remove tags. Press Enter or click Add to add a new tag.
              Press Backspace with empty input to remove the last tag.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <TagsInput
              tags={tags}
              onTagsChange={setTags}
              placeholder="Add a tag..."
            />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current tags: {JSON.stringify(tags)}
          </div>
        </div>

        {/* TagsInput Example 2: Limited Tags */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              TagsInput - With Limit
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Limited to 5 tags. Once the limit is reached, you cannot add more.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <TagsInput
              tags={displayTags.slice(0, 5)}
              onTagsChange={(newTags) => setDisplayTags(newTags)}
              placeholder="Add a tag (max 5)..."
              maxTags={5}
            />
          </div>
        </div>

        {/* TagsDisplay Example 1: All Tags */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              TagsDisplay - Default
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Display all tags with default styling
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <TagsDisplay tags={displayTags} />
          </div>
        </div>

        {/* TagsDisplay Example 2: Compact */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              TagsDisplay - Compact
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Compact variant for space-constrained layouts
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <TagsDisplay
              tags={displayTags}
              variant="compact"
            />
          </div>
        </div>

        {/* TagsDisplay Example 3: Limited Display with More Indicator */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              TagsDisplay - Limited Display
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Show only 2 tags and a "+N more" indicator
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <TagsDisplay
              tags={displayTags}
              maxDisplay={2}
            />
          </div>
        </div>

        {/* TagsDisplay Example 4: Interactive with Click Handler */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              TagsDisplay - Interactive
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Click a tag to filter. Currently showing: {filteredTag ? `"${filteredTag}"` : 'all'}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <TagsDisplay
              tags={displayTags}
              onTagClick={(tag) => setFilteredTag(tag === filteredTag ? null : tag)}
              maxDisplay={3}
            />
          </div>
        </div>

        {/* Feature Showcase */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
              Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Both components support these features:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Duplicate Prevention',
                description: 'Automatically prevents adding duplicate tags',
              },
              {
                title: 'Tag Limit',
                description: 'Configurable maximum number of tags (default: 10)',
              },
              {
                title: 'Keyboard Navigation',
                description: 'Enter to add, Backspace to remove last tag',
              },
              {
                title: 'Dark Mode Support',
                description: 'Full support for light and dark themes',
              },
              {
                title: 'Accessibility',
                description: 'ARIA labels and keyboard focus management',
              },
              {
                title: 'Brand Colors',
                description: 'Uses primary (#4B2FFF) and semantic colors',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30"
              >
                <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
