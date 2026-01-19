<script lang="ts">
	import { fly } from 'svelte/transition';
	import {
		Container,
		Grid,
		Section,
		Typography,
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
	<Section spacing="lg">
		<Container>
			<Typography variant="h1">Design System</Typography>
			<Typography variant="body" class="mt-4 max-w-2xl">
				Complete component library for the Data Analytics in Marketing learning platform.
				All components use Svelte 5 runes and TailwindCSS 4.
			</Typography>
		</Container>
	</Section>

	<!-- Typography Section -->
	<Section spacing="lg" background="muted">
		<Container>
			<Typography variant="h2" class="mb-6">Typography</Typography>
			<Card padding="lg">
				<div class="space-y-4">
					<Typography variant="h1">Heading 1 - 2.5rem (40px)</Typography>
					<Typography variant="h2">Heading 2 - 2rem (32px)</Typography>
					<Typography variant="h3">Heading 3 - 1.5rem (24px)</Typography>
					<Typography variant="h4">Heading 4 - 1.25rem (20px)</Typography>
					<Typography variant="body">
						Body text - 1rem (16px) with 1.6 line-height for comfortable reading. Good typography
						helps students focus on content rather than struggling with presentation.
					</Typography>
					<Typography variant="small">
						Small text - 0.875rem (14px) for captions and secondary information
					</Typography>
					<Typography variant="body">
						Inline <Typography variant="code" as="span">code examples</Typography> use monospace font
						for formulas like <Typography variant="code" as="span">Y = alpha + beta*X + epsilon</Typography>
					</Typography>
				</div>
			</Card>
		</Container>
	</Section>

	<!-- Colors Section -->
	<Section spacing="lg">
		<Container>
			<Typography variant="h2" class="mb-6">Colors</Typography>

			<Typography variant="h3" class="mb-4">Brand Colors</Typography>
			<Grid cols={3} gap="md" class="mb-8">
				<div class="p-6 rounded-lg text-white" style="background-color: var(--color-primary);">
					<Typography variant="h4" class="!text-white">Primary</Typography>
					<Typography variant="small" class="!text-white/80">Blue 600 - Headers and links</Typography>
				</div>
				<div class="p-6 rounded-lg text-white" style="background-color: var(--color-secondary);">
					<Typography variant="h4" class="!text-white">Secondary</Typography>
					<Typography variant="small" class="!text-white/80">Slate 700 - Body text</Typography>
				</div>
				<div class="p-6 rounded-lg text-white" style="background-color: var(--color-accent);">
					<Typography variant="h4" class="!text-white">Accent</Typography>
					<Typography variant="small" class="!text-white/80">Amber 500 - Highlights</Typography>
				</div>
			</Grid>

			<Typography variant="h3" class="mb-4">Semantic Diagram Colors</Typography>
			<Typography variant="body" class="mb-4 max-w-2xl">
				These colors represent different elements in causal diagrams and statistical visualizations.
			</Typography>
			<Grid cols={5} gap="md">
				<div class="flex flex-col items-center p-4 rounded-lg section-bg-muted">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-treatment);"></div>
					<Typography variant="h4">Treatment</Typography>
					<Typography variant="small" class="text-center">Intervention</Typography>
				</div>
				<div class="flex flex-col items-center p-4 rounded-lg section-bg-muted">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-control);"></div>
					<Typography variant="h4">Control</Typography>
					<Typography variant="small" class="text-center">Baseline</Typography>
				</div>
				<div class="flex flex-col items-center p-4 rounded-lg section-bg-muted">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-confounder);"></div>
					<Typography variant="h4">Confounder</Typography>
					<Typography variant="small" class="text-center">Bias source</Typography>
				</div>
				<div class="flex flex-col items-center p-4 rounded-lg section-bg-muted">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-outcome);"></div>
					<Typography variant="h4">Outcome</Typography>
					<Typography variant="small" class="text-center">Dependent var</Typography>
				</div>
				<div class="flex flex-col items-center p-4 rounded-lg section-bg-muted">
					<div class="w-16 h-16 rounded-full mb-3" style="background-color: var(--color-arrow);"></div>
					<Typography variant="h4">Arrow</Typography>
					<Typography variant="small" class="text-center">Causal link</Typography>
				</div>
			</Grid>
		</Container>
	</Section>

	<!-- Layout Section -->
	<Section spacing="lg" background="muted">
		<Container>
			<Typography variant="h2" class="mb-6">Layout Primitives</Typography>

			<Typography variant="h3" class="mb-4">Container Sizes</Typography>
			<div class="space-y-4 mb-8">
				<Container size="sm">
					<Card variant="outlined" padding="md">
						<Typography variant="body">Container: sm (max-w-2xl / 672px)</Typography>
					</Card>
				</Container>
				<Container size="default">
					<Card variant="outlined" padding="md">
						<Typography variant="body">Container: default (max-w-4xl / 896px)</Typography>
					</Card>
				</Container>
				<Container size="lg">
					<Card variant="outlined" padding="md">
						<Typography variant="body">Container: lg (max-w-6xl / 1152px)</Typography>
					</Card>
				</Container>
			</div>

			<Typography variant="h3" class="mb-4">Grid Columns</Typography>
			<Grid cols={2} gap="md" class="mb-4">
				<Card variant="outlined" padding="sm"><Typography variant="body">2 cols - Item 1</Typography></Card>
				<Card variant="outlined" padding="sm"><Typography variant="body">2 cols - Item 2</Typography></Card>
			</Grid>
			<Grid cols={3} gap="md" class="mb-4">
				<Card variant="outlined" padding="sm"><Typography variant="body">3 cols - Item 1</Typography></Card>
				<Card variant="outlined" padding="sm"><Typography variant="body">3 cols - Item 2</Typography></Card>
				<Card variant="outlined" padding="sm"><Typography variant="body">3 cols - Item 3</Typography></Card>
			</Grid>
			<Grid cols={4} gap="sm">
				<Card variant="outlined" padding="sm"><Typography variant="body">4 cols</Typography></Card>
				<Card variant="outlined" padding="sm"><Typography variant="body">4 cols</Typography></Card>
				<Card variant="outlined" padding="sm"><Typography variant="body">4 cols</Typography></Card>
				<Card variant="outlined" padding="sm"><Typography variant="body">4 cols</Typography></Card>
			</Grid>
		</Container>
	</Section>

	<!-- Cards Section -->
	<Section spacing="lg">
		<Container>
			<Typography variant="h2" class="mb-6">Cards</Typography>

			<Typography variant="h3" class="mb-4">Card Variants</Typography>
			<Grid cols={3} gap="md" class="mb-8">
				<Card variant="default" padding="md" hover>
					<Typography variant="h4">Default</Typography>
					<Typography variant="body">Subtle border with hover effect</Typography>
				</Card>
				<Card variant="outlined" padding="md" hover>
					<Typography variant="h4">Outlined</Typography>
					<Typography variant="body">Strong border for emphasis</Typography>
				</Card>
				<Card variant="elevated" padding="md" hover>
					<Typography variant="h4">Elevated</Typography>
					<Typography variant="body">Shadow for prominence</Typography>
				</Card>
			</Grid>

			<Typography variant="h3" class="mb-4">ConceptCard (Category Colors)</Typography>
			<Grid cols={4} gap="md" class="mb-8">
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

			<Typography variant="h3" class="mb-4">ExpandableSection</Typography>
			<Card padding="lg">
				<ExpandableSection title="What is Selection Bias?">
					<Typography variant="body">
						Selection bias occurs when the treatment and control groups differ systematically
						before the intervention. This makes it impossible to attribute differences in outcomes
						solely to the treatment. Randomization is the gold standard for avoiding selection bias.
					</Typography>
				</ExpandableSection>
				<ExpandableSection title="When to Use Regression Discontinuity?">
					<Typography variant="body">
						Regression discontinuity designs are ideal when treatment is assigned based on a
						threshold rule. For example, students scoring above 70% get tutoring. By comparing
						students just above and below the cutoff, we can estimate causal effects.
					</Typography>
				</ExpandableSection>
			</Card>
		</Container>
	</Section>

	<!-- Interactive Elements Section -->
	<Section spacing="lg" background="muted">
		<Container>
			<Typography variant="h2" class="mb-6">Interactive Elements</Typography>

			<Typography variant="h3" class="mb-4">Button Variants</Typography>
			<div class="flex flex-wrap gap-4 mb-6">
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="outline">Outline</Button>
			</div>

			<Typography variant="h3" class="mb-4">Button Sizes</Typography>
			<div class="flex flex-wrap items-center gap-4 mb-6">
				<Button size="sm">Small</Button>
				<Button size="default">Default</Button>
				<Button size="lg">Large</Button>
			</div>

			<Typography variant="h3" class="mb-4">IconButton</Typography>
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

			<Typography variant="h3" class="mb-4">Badge Variants</Typography>
			<div class="flex flex-wrap items-center gap-4">
				<Badge variant="default">Default</Badge>
				<Badge variant="treatment">Treatment</Badge>
				<Badge variant="control">Control</Badge>
				<Badge variant="confounder">Confounder</Badge>
				<Badge variant="outcome">Outcome</Badge>
			</div>
		</Container>
	</Section>

	<!-- Feedback Section -->
	<Section spacing="lg">
		<Container>
			<Typography variant="h2" class="mb-6">Feedback Components</Typography>

			<Typography variant="h3" class="mb-4">Spinner Sizes</Typography>
			<div class="flex items-center gap-8 mb-8">
				<div class="flex flex-col items-center gap-2">
					<Spinner size="sm" />
					<Typography variant="small">Small</Typography>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Spinner size="default" />
					<Typography variant="small">Default</Typography>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Spinner size="lg" />
					<Typography variant="small">Large</Typography>
				</div>
			</div>

			<Typography variant="h3" class="mb-4">Progress Bar</Typography>
			<div class="space-y-6 max-w-md">
				<div>
					<Typography variant="small" class="mb-2">Without label (25%)</Typography>
					<Progress value={25} />
				</div>
				<div>
					<Typography variant="small" class="mb-2">Without label (50%)</Typography>
					<Progress value={50} />
				</div>
				<div>
					<Typography variant="small" class="mb-2">With label ({progressValue}%)</Typography>
					<Progress value={progressValue} showLabel />
				</div>
				<div>
					<Typography variant="small" class="mb-2">Small size (75%)</Typography>
					<Progress value={75} size="sm" />
				</div>
			</div>
		</Container>
	</Section>

	<!-- Dark Mode Note -->
	<Section spacing="lg" background="muted">
		<Container size="sm">
			<Card padding="lg">
				<Typography variant="h3">Dark Mode Support</Typography>
				<Typography variant="body" class="mt-2">
					All colors automatically adjust when your system is set to dark mode. Toggle your
					system preferences to see the design system adapt for optimal visibility.
				</Typography>
			</Card>
		</Container>
	</Section>
</div>
