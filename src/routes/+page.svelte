<script lang="ts">
	import { fly } from 'svelte/transition';
	import {
		Container,
		Grid,
		Card,
		ConceptCard,
		ExpandableSection,
		Button,
		IconButton,
		Badge,
		Spinner,
		Progress
	} from '$lib/components/ui';

	// Demo state for interactive elements
	let progressValue = $state(65);
</script>

<div transition:fly={{ y: 20, duration: 300 }}>
	<!-- Page Header -->
	<section class="py-12 md:py-16 bg-white dark:bg-slate-900">
		<Container>
			<h1 class="text-4xl font-bold text-slate-900 dark:text-white">Design System</h1>
			<p class="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
				Complete component library for the Data Analytics in Marketing learning platform.
				All components use Svelte 5 runes and TailwindCSS 4.
			</p>
		</Container>
	</section>

	<!-- Typography Section -->
	<section class="py-12 md:py-16 bg-slate-100 dark:bg-slate-800">
		<Container>
			<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Typography</h2>
			<Card padding="lg">
				<div class="space-y-4">
					<h1 class="text-4xl font-bold text-slate-900 dark:text-white">Heading 1 - 2.5rem (40px)</h1>
					<h2 class="text-3xl font-bold text-slate-900 dark:text-white">Heading 2 - 2rem (32px)</h2>
					<h3 class="text-2xl font-semibold text-slate-900 dark:text-white">Heading 3 - 1.5rem (24px)</h3>
					<h4 class="text-xl font-semibold text-slate-900 dark:text-white">Heading 4 - 1.25rem (20px)</h4>
					<p class="text-base text-slate-600 dark:text-slate-300">
						Body text - 1rem (16px) with 1.6 line-height for comfortable reading. Good typography
						helps students focus on content rather than struggling with presentation.
					</p>
					<p class="text-sm text-slate-500 dark:text-slate-400">
						Small text - 0.875rem (14px) for captions and secondary information
					</p>
					<p class="text-base text-slate-600 dark:text-slate-300">
						Inline <code class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-sm font-mono text-blue-600 dark:text-blue-400">code examples</code> use monospace font
						for formulas like <code class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-sm font-mono text-blue-600 dark:text-blue-400">Y = alpha + beta*X + epsilon</code>
					</p>
				</div>
			</Card>
		</Container>
	</section>

	<!-- Colors Section -->
	<section class="py-12 md:py-16 bg-white dark:bg-slate-900">
		<Container>
			<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Colors</h2>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Brand Colors</h3>
			<Grid cols={3} gap="default" class="mb-8">
				<div class="p-6 rounded-lg text-white" style="background-color: var(--color-primary);">
					<h4 class="text-lg font-semibold text-white">Primary</h4>
					<p class="text-sm text-white/80">Blue 600 - Headers and links</p>
				</div>
				<div class="p-6 rounded-lg text-white" style="background-color: var(--color-secondary);">
					<h4 class="text-lg font-semibold text-white">Secondary</h4>
					<p class="text-sm text-white/80">Slate 700 - Body text</p>
				</div>
				<div class="p-6 rounded-lg text-white" style="background-color: var(--color-accent);">
					<h4 class="text-lg font-semibold text-white">Accent</h4>
					<p class="text-sm text-white/80">Amber 500 - Highlights</p>
				</div>
			</Grid>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Semantic Diagram Colors</h3>
			<p class="text-slate-600 dark:text-slate-300 mb-4 max-w-2xl">
				These colors represent different elements in causal diagrams and statistical visualizations.
			</p>
			<Grid cols={5} gap="default">
				<div class="flex flex-col items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-treatment);"></div>
					<h4 class="font-semibold text-slate-900 dark:text-white">Treatment</h4>
					<p class="text-sm text-slate-500 dark:text-slate-400 text-center">Intervention</p>
				</div>
				<div class="flex flex-col items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-control);"></div>
					<h4 class="font-semibold text-slate-900 dark:text-white">Control</h4>
					<p class="text-sm text-slate-500 dark:text-slate-400 text-center">Baseline</p>
				</div>
				<div class="flex flex-col items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-confounder);"></div>
					<h4 class="font-semibold text-slate-900 dark:text-white">Confounder</h4>
					<p class="text-sm text-slate-500 dark:text-slate-400 text-center">Bias source</p>
				</div>
				<div class="flex flex-col items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-outcome);"></div>
					<h4 class="font-semibold text-slate-900 dark:text-white">Outcome</h4>
					<p class="text-sm text-slate-500 dark:text-slate-400 text-center">Dependent var</p>
				</div>
				<div class="flex flex-col items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-arrow);"></div>
					<h4 class="font-semibold text-slate-900 dark:text-white">Arrow</h4>
					<p class="text-sm text-slate-500 dark:text-slate-400 text-center">Causal link</p>
				</div>
			</Grid>
		</Container>
	</section>

	<!-- Layout Section -->
	<section class="py-12 md:py-16 bg-slate-100 dark:bg-slate-800">
		<Container>
			<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Layout Primitives</h2>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Container Sizes</h3>
			<div class="space-y-4 mb-8">
				<Container size="sm">
					<Card variant="outlined" padding="default">
						<p class="text-slate-600 dark:text-slate-300">Container: sm (max-w-2xl / 672px)</p>
					</Card>
				</Container>
				<Container size="default">
					<Card variant="outlined" padding="default">
						<p class="text-slate-600 dark:text-slate-300">Container: default (max-w-4xl / 896px)</p>
					</Card>
				</Container>
				<Container size="lg">
					<Card variant="outlined" padding="default">
						<p class="text-slate-600 dark:text-slate-300">Container: lg (max-w-6xl / 1152px)</p>
					</Card>
				</Container>
			</div>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Grid Columns</h3>
			<Grid cols={2} gap="default" class="mb-4">
				<Card variant="outlined" padding="sm"><p class="text-slate-600 dark:text-slate-300">2 cols - Item 1</p></Card>
				<Card variant="outlined" padding="sm"><p class="text-slate-600 dark:text-slate-300">2 cols - Item 2</p></Card>
			</Grid>
			<Grid cols={3} gap="default" class="mb-4">
				<Card variant="outlined" padding="sm"><p class="text-slate-600 dark:text-slate-300">3 cols - Item 1</p></Card>
				<Card variant="outlined" padding="sm"><p class="text-slate-600 dark:text-slate-300">3 cols - Item 2</p></Card>
				<Card variant="outlined" padding="sm"><p class="text-slate-600 dark:text-slate-300">3 cols - Item 3</p></Card>
			</Grid>
			<Grid cols={4} gap="sm">
				<Card variant="outlined" padding="sm"><p class="text-slate-600 dark:text-slate-300">4 cols</p></Card>
				<Card variant="outlined" padding="sm"><p class="text-slate-600 dark:text-slate-300">4 cols</p></Card>
				<Card variant="outlined" padding="sm"><p class="text-slate-600 dark:text-slate-300">4 cols</p></Card>
				<Card variant="outlined" padding="sm"><p class="text-slate-600 dark:text-slate-300">4 cols</p></Card>
			</Grid>
		</Container>
	</section>

	<!-- Cards Section -->
	<section class="py-12 md:py-16 bg-white dark:bg-slate-900">
		<Container>
			<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Cards</h2>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Card Variants</h3>
			<Grid cols={3} gap="default" class="mb-8">
				<Card variant="default" padding="default" hover>
					<h4 class="font-semibold text-slate-900 dark:text-white">Default</h4>
					<p class="text-slate-600 dark:text-slate-300">Subtle border with hover effect</p>
				</Card>
				<Card variant="outlined" padding="default" hover>
					<h4 class="font-semibold text-slate-900 dark:text-white">Outlined</h4>
					<p class="text-slate-600 dark:text-slate-300">Strong border for emphasis</p>
				</Card>
				<Card variant="elevated" padding="default" hover>
					<h4 class="font-semibold text-slate-900 dark:text-white">Elevated</h4>
					<p class="text-slate-600 dark:text-slate-300">Shadow for prominence</p>
				</Card>
			</Grid>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">ConceptCard (Category Colors)</h3>
			<Grid cols={4} gap="default" class="mb-8">
				<ConceptCard
					term="Treatment Effect"
					category="treatment"
					definition="The causal impact of an intervention"
				/>
				<ConceptCard
					term="Control Group"
					category="control"
					definition="Baseline for comparison"
				/>
				<ConceptCard
					term="Confounding Bias"
					category="confounder"
					definition="When a third variable affects both"
				/>
				<ConceptCard
					term="Outcome Variable"
					category="outcome"
					definition="What we measure as the effect"
				/>
			</Grid>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">ExpandableSection</h3>
			<Card padding="lg">
				<ExpandableSection title="What is Selection Bias?">
					<p class="text-slate-600 dark:text-slate-300">
						Selection bias occurs when the treatment and control groups differ systematically
						before the intervention. This makes it impossible to attribute differences in outcomes
						solely to the treatment. Randomization is the gold standard for avoiding selection bias.
					</p>
				</ExpandableSection>
				<ExpandableSection title="When to Use Regression Discontinuity?">
					<p class="text-slate-600 dark:text-slate-300">
						Regression discontinuity designs are ideal when treatment is assigned based on a
						threshold rule. For example, students scoring above 70% get tutoring. By comparing
						students just above and below the cutoff, we can estimate causal effects.
					</p>
				</ExpandableSection>
			</Card>
		</Container>
	</section>

	<!-- Interactive Elements Section -->
	<section class="py-12 md:py-16 bg-slate-100 dark:bg-slate-800">
		<Container>
			<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Interactive Elements</h2>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Button Variants</h3>
			<div class="flex flex-wrap gap-4 mb-6">
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="outline">Outline</Button>
			</div>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Button Sizes</h3>
			<div class="flex flex-wrap items-center gap-4 mb-6">
				<Button size="sm">Small</Button>
				<Button size="default">Default</Button>
				<Button size="lg">Large</Button>
			</div>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">IconButton</h3>
			<div class="flex flex-wrap items-center gap-4 mb-6">
				<IconButton label="Previous" variant="ghost">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
				</IconButton>
				<IconButton label="Next" variant="ghost">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
				</IconButton>
				<IconButton label="Settings" variant="outline">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
				</IconButton>
				<IconButton label="Menu" variant="filled">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
				</IconButton>
			</div>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Badge Variants</h3>
			<div class="flex flex-wrap items-center gap-4">
				<Badge variant="default">Default</Badge>
				<Badge variant="treatment">Treatment</Badge>
				<Badge variant="control">Control</Badge>
				<Badge variant="confounder">Confounder</Badge>
				<Badge variant="outcome">Outcome</Badge>
			</div>
		</Container>
	</section>

	<!-- Feedback Section -->
	<section class="py-12 md:py-16 bg-white dark:bg-slate-900">
		<Container>
			<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Feedback Components</h2>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Spinner Sizes</h3>
			<div class="flex items-center gap-8 mb-8">
				<div class="flex flex-col items-center gap-2">
					<Spinner size="sm" />
					<p class="text-sm text-slate-500 dark:text-slate-400">Small</p>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Spinner size="default" />
					<p class="text-sm text-slate-500 dark:text-slate-400">Default</p>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Spinner size="lg" />
					<p class="text-sm text-slate-500 dark:text-slate-400">Large</p>
				</div>
			</div>

			<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-4">Progress Bar</h3>
			<div class="space-y-6 max-w-md">
				<div>
					<p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Without label (25%)</p>
					<Progress value={25} />
				</div>
				<div>
					<p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Without label (50%)</p>
					<Progress value={50} />
				</div>
				<div>
					<p class="text-sm text-slate-500 dark:text-slate-400 mb-2">With label ({progressValue}%)</p>
					<Progress value={progressValue} showLabel />
				</div>
				<div>
					<p class="text-sm text-slate-500 dark:text-slate-400 mb-2">Small size (75%)</p>
					<Progress value={75} size="sm" />
				</div>
			</div>
		</Container>
	</section>

	<!-- Dark Mode Note -->
	<section class="py-12 md:py-16 bg-slate-100 dark:bg-slate-800">
		<Container size="sm">
			<Card padding="lg">
				<h3 class="text-xl font-semibold text-slate-900 dark:text-white">Dark Mode Support</h3>
				<p class="mt-2 text-slate-600 dark:text-slate-300">
					All colors automatically adjust when your system is set to dark mode. Toggle your
					system preferences to see the design system adapt for optimal visibility.
				</p>
			</Card>
		</Container>
	</section>
</div>
