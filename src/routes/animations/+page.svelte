<script lang="ts">
  import { Container, Section, Typography, Card } from '$lib/components/ui';
  import {
    AnimationTimeline,
    PlaybackControls,
    AnimatedCausalDiagram,
    StepExplanation,
    createConfoundingExplanation,
    createRCTExplanation,
    createTreatmentEffectExplanation
  } from '$lib/components/animation';
  import type { AnimationStep, AnimationSequence, ExplanationStep } from '$lib/components/animation';
  import type { DiagramData } from '$lib/components/diagrams';
  import { gsap } from 'gsap';

  // Get preset explanations
  const confoundingExplanation = createConfoundingExplanation();
  const rctExplanation = createRCTExplanation();
  const treatmentEffectExplanation = createTreatmentEffectExplanation();

  // Selected explanation for demo selector
  let selectedExplanation = $state<'confounding' | 'rct' | 'treatmentEffect'>('confounding');

  let currentExplanation = $derived.by(() => {
    switch (selectedExplanation) {
      case 'rct': return { title: 'Randomized Controlled Trials', steps: rctExplanation };
      case 'treatmentEffect': return { title: 'Understanding Treatment Effects', steps: treatmentEffectExplanation };
      default: return { title: 'What is a Confounder?', steps: confoundingExplanation };
    }
  });

  // Simple counter animation demo
  let counterValue = $state(0);
  let counterElement: HTMLDivElement | null = null;

  // Define animation steps for multi-step demo
  const demoSteps: AnimationStep[] = [
    {
      id: 'step-1',
      label: 'Introduction',
      duration: 1,
      animation: (tl) => {
        tl.to('#demo-box-1', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
        tl.to('#demo-label-1', {
          opacity: 1,
          duration: 0.3
        }, '-=0.2');
      }
    },
    {
      id: 'step-2',
      label: 'Treatment Effect',
      duration: 1.5,
      animation: (tl) => {
        tl.to('#demo-box-2', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
        tl.to('#demo-arrow', {
          opacity: 1,
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        tl.to('#demo-label-2', {
          opacity: 1,
          duration: 0.3
        }, '-=0.2');
      }
    },
    {
      id: 'step-3',
      label: 'Outcome',
      duration: 1,
      animation: (tl) => {
        tl.to('#demo-box-3', {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)'
        });
        tl.to('#demo-label-3', {
          opacity: 1,
          duration: 0.3
        }, '-=0.2');
      }
    },
    {
      id: 'step-4',
      label: 'Conclusion',
      duration: 1,
      animation: (tl) => {
        tl.to('#demo-highlight', {
          opacity: 1,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.inOut'
        });
        tl.to('#demo-highlight', {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        tl.to('.demo-checkmark', {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        });
      }
    }
  ];

  // Simple GSAP demo - animate counter on click
  function animateCounter() {
    if (counterElement) {
      gsap.to(counterElement, {
        innerHTML: 100,
        duration: 2,
        ease: 'power1.out',
        snap: { innerHTML: 1 },
        onUpdate: function() {
          counterValue = Math.round(Number(this.targets()[0].innerHTML));
        }
      });
    }
  }

  function resetCounter() {
    counterValue = 0;
    if (counterElement) {
      gsap.set(counterElement, { innerHTML: 0 });
    }
  }

  // Confounding diagram data
  const confoundingData: DiagramData = {
    nodes: [
      { id: 'confounder', label: 'Confounder', type: 'confounder', x: 200, y: 40 },
      { id: 'treatment', label: 'Treatment', type: 'treatment', x: 100, y: 140 },
      { id: 'outcome', label: 'Outcome', type: 'outcome', x: 300, y: 140 }
    ],
    edges: [
      { id: 'c-t', source: 'confounder', target: 'treatment' },
      { id: 'c-o', source: 'confounder', target: 'outcome' },
      { id: 't-o', source: 'treatment', target: 'outcome', label: 'Causal Effect?' }
    ]
  };

  // Custom sequence for step-by-step confounding explanation
  const confoundingSequence: AnimationSequence = {
    steps: [
      // Step 1: Show treatment
      { targets: ['treatment'], animation: 'scaleIn', duration: 0.5 },
      // Step 2: Show outcome
      { targets: ['outcome'], animation: 'scaleIn', duration: 0.5 },
      // Step 3: Show naive causal arrow
      { targets: ['t-o'], animation: 'draw', duration: 0.6 },
      // Step 4: Reveal confounder
      { targets: ['confounder'], animation: 'scaleIn', duration: 0.5 },
      // Step 5: Show confounding paths
      { targets: ['c-t', 'c-o'], animation: 'draw', duration: 0.6, stagger: 0.3 }
    ]
  };

  // Causal flow diagram
  const causalFlowData: DiagramData = {
    nodes: [
      { id: 'x1', label: 'X1', type: 'variable', x: 60, y: 100 },
      { id: 'x2', label: 'X2', type: 'variable', x: 160, y: 40 },
      { id: 'x3', label: 'X3', type: 'variable', x: 160, y: 160 },
      { id: 'y', label: 'Y', type: 'outcome', x: 280, y: 100 }
    ],
    edges: [
      { id: 'x1-x2', source: 'x1', target: 'x2' },
      { id: 'x1-x3', source: 'x1', target: 'x3' },
      { id: 'x2-y', source: 'x2', target: 'y' },
      { id: 'x3-y', source: 'x3', target: 'y' }
    ]
  };

  // Treatment effect diagram
  const treatmentEffectData: DiagramData = {
    nodes: [
      { id: 'treatment', label: 'Treatment', type: 'treatment', x: 80, y: 100 },
      { id: 'control', label: 'Control', type: 'control', x: 80, y: 200 },
      { id: 'outcome-t', label: 'Y(1)', type: 'outcome', x: 280, y: 100 },
      { id: 'outcome-c', label: 'Y(0)', type: 'outcome', x: 280, y: 200 }
    ],
    edges: [
      { id: 't-yt', source: 'treatment', target: 'outcome-t' },
      { id: 'c-yc', source: 'control', target: 'outcome-c' },
      { id: 'effect', source: 'outcome-t', target: 'outcome-c', label: 'ATE', style: 'dashed' }
    ]
  };

  // References to animated diagrams
  let confoundingDiagram: { play: () => void; reset: () => void; highlightElements: (n: string[], e: string[]) => void; clearHighlights: () => void };
  let causalFlowDiagram: { play: () => void; reset: () => void; highlightElements: (n: string[], e: string[]) => void; clearHighlights: () => void };
  let treatmentEffectDiagram: { play: () => void; reset: () => void; highlightElements: (n: string[], e: string[]) => void; clearHighlights: () => void };

  // Highlight state for causal flow
  let flowHighlightActive = $state(false);

  function toggleFlowHighlight() {
    if (flowHighlightActive) {
      causalFlowDiagram?.clearHighlights();
    } else {
      causalFlowDiagram?.highlightElements(['x1', 'y'], ['x1-x2', 'x2-y']);
    }
    flowHighlightActive = !flowHighlightActive;
  }
</script>

<svelte:head>
  <title>Animation System Demo | iMBA Study App</title>
</svelte:head>

<Container>
  <Section>
    <Typography variant="h1" class="mb-2">Animation System Demo</Typography>
    <Typography variant="body" class="text-slate-600 dark:text-slate-400 mb-8">
      Demonstrating GSAP-powered step-by-step animations for educational content.
    </Typography>

    <!-- FEATURED: Step-by-Step Explanation Component -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-4">
        <span class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
        <Typography variant="h2">Interactive Step-by-Step Explanations</Typography>
      </div>
      <Typography variant="body" class="text-slate-600 dark:text-slate-400 mb-6">
        The "3Blue1Brown style" animated explanation component. Select a topic and step through
        the visual explanation with synchronized text and diagram highlighting.
      </Typography>

      <!-- Topic selector -->
      <div class="flex gap-2 mb-6">
        <button
          onclick={() => selectedExplanation = 'confounding'}
          class="px-4 py-2 rounded-lg transition-colors font-medium {
            selectedExplanation === 'confounding'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }"
        >
          Confounding
        </button>
        <button
          onclick={() => selectedExplanation = 'rct'}
          class="px-4 py-2 rounded-lg transition-colors font-medium {
            selectedExplanation === 'rct'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }"
        >
          RCTs
        </button>
        <button
          onclick={() => selectedExplanation = 'treatmentEffect'}
          class="px-4 py-2 rounded-lg transition-colors font-medium {
            selectedExplanation === 'treatmentEffect'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }"
        >
          Treatment Effects
        </button>
      </div>

      <!-- StepExplanation component -->
      {#key selectedExplanation}
        <StepExplanation
          title={currentExplanation.title}
          steps={currentExplanation.steps}
          width={420}
          height={240}
          layout="horizontal"
          class="max-w-4xl"
        />
      {/key}
    </div>

    <hr class="border-slate-200 dark:border-slate-700 my-12" />

    <Typography variant="h2" class="mb-6">Additional Animation Demos</Typography>

    <!-- Demo 1: Simple Counter Animation -->
    <Card class="mb-8">
      <Typography variant="h2" class="mb-4">1. Simple GSAP Animation</Typography>
      <Typography variant="body" class="text-slate-600 dark:text-slate-400 mb-4">
        Click the button to animate the counter from 0 to 100.
      </Typography>

      <div class="flex items-center gap-6">
        <div
          bind:this={counterElement}
          class="text-6xl font-bold text-blue-600 dark:text-blue-400 tabular-nums"
        >
          {counterValue}
        </div>
        <div class="flex gap-2">
          <button
            onclick={animateCounter}
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Animate
          </button>
          <button
            onclick={resetCounter}
            class="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </Card>

    <!-- Demo 2: Multi-Step Animation with Playback Controls -->
    <Card>
      <Typography variant="h2" class="mb-4">2. Multi-Step Animation with Controls</Typography>
      <Typography variant="body" class="text-slate-600 dark:text-slate-400 mb-6">
        Use the playback controls to step through the animated explanation.
        Press <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-sm">Space</kbd> to play/pause,
        <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-sm">←</kbd>
        <kbd class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-sm">→</kbd> to step.
      </Typography>

      <AnimationTimeline steps={demoSteps}>
        <!-- Animation Canvas -->
        <div class="bg-slate-50 dark:bg-slate-900 rounded-lg p-8 mb-6 min-h-[300px]">
          <div class="flex items-center justify-center gap-8">
            <!-- Box 1: Treatment -->
            <div class="text-center">
              <div
                id="demo-box-1"
                class="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center opacity-0 translate-y-4"
              >
                <span class="text-white font-bold text-lg">T</span>
              </div>
              <div id="demo-label-1" class="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300 opacity-0">
                Treatment
              </div>
            </div>

            <!-- Arrow -->
            <div
              id="demo-arrow"
              class="w-16 h-1 bg-slate-400 dark:bg-slate-500 opacity-0 scale-x-0 origin-left"
            ></div>

            <!-- Box 2: Effect -->
            <div class="text-center">
              <div
                id="demo-box-2"
                class="w-24 h-24 bg-green-500 rounded-lg flex items-center justify-center opacity-0 translate-y-4"
              >
                <span class="text-white font-bold text-lg">E</span>
              </div>
              <div id="demo-label-2" class="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300 opacity-0">
                Effect
              </div>
            </div>

            <!-- Arrow -->
            <div
              class="w-16 h-1 bg-slate-400 dark:bg-slate-500 opacity-0"
              style="opacity: 0"
            ></div>

            <!-- Box 3: Outcome -->
            <div class="text-center" id="demo-highlight">
              <div
                id="demo-box-3"
                class="w-24 h-24 bg-purple-500 rounded-lg flex items-center justify-center opacity-0 scale-0"
              >
                <span class="text-white font-bold text-lg">O</span>
              </div>
              <div id="demo-label-3" class="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300 opacity-0">
                Outcome
              </div>
            </div>
          </div>

          <!-- Checkmarks -->
          <div class="flex justify-center gap-16 mt-8">
            <div class="demo-checkmark text-green-500 opacity-0 scale-0">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="demo-checkmark text-green-500 opacity-0 scale-0">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="demo-checkmark text-green-500 opacity-0 scale-0">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Playback Controls -->
        <PlaybackControls />
      </AnimationTimeline>
    </Card>

    <!-- Step descriptions -->
    <Card class="mt-8">
      <Typography variant="h3" class="mb-4">Step Descriptions</Typography>
      <div class="space-y-3">
        {#each demoSteps as step, index}
          <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <div>
              <div class="font-medium text-slate-900 dark:text-white">{step.label}</div>
              <div class="text-sm text-slate-600 dark:text-slate-400">Duration: {step.duration}s</div>
            </div>
          </div>
        {/each}
      </div>
    </Card>

    <!-- Diagram Animation Section -->
    <Typography variant="h2" class="mt-12 mb-6">Diagram Animations</Typography>

    <!-- Demo 3: Confounding Diagram Animation -->
    <Card class="mb-8">
      <Typography variant="h3" class="mb-4">3. Confounding Diagram - Step by Step</Typography>
      <Typography variant="body" class="text-slate-600 dark:text-slate-400 mb-4">
        Watch how confounding is revealed: First we see treatment and outcome, then the hidden confounder emerges.
      </Typography>

      <div class="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
        <AnimatedCausalDiagram
          bind:this={confoundingDiagram}
          data={confoundingData}
          sequence={confoundingSequence}
          width={400}
          height={200}
          title="Confounding Bias"
          description="The confounder creates spurious correlation"
        />
      </div>

      <div class="flex gap-2">
        <button
          onclick={() => confoundingDiagram?.play()}
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Play Animation
        </button>
        <button
          onclick={() => confoundingDiagram?.reset()}
          class="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
    </Card>

    <!-- Demo 4: Causal Flow with Highlight -->
    <Card class="mb-8">
      <Typography variant="h3" class="mb-4">4. Causal Flow - Path Highlighting</Typography>
      <Typography variant="body" class="text-slate-600 dark:text-slate-400 mb-4">
        Toggle highlighting to trace the causal path from X1 to Y through X2.
      </Typography>

      <div class="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
        <AnimatedCausalDiagram
          bind:this={causalFlowDiagram}
          data={causalFlowData}
          autoPlay={true}
          width={350}
          height={220}
          title="Causal Flow"
          description="Multiple paths from cause to effect"
        />
      </div>

      <div class="flex gap-2">
        <button
          onclick={toggleFlowHighlight}
          class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          {flowHighlightActive ? 'Clear Highlight' : 'Highlight Path X1 → X2 → Y'}
        </button>
        <button
          onclick={() => causalFlowDiagram?.play()}
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Replay
        </button>
      </div>
    </Card>

    <!-- Demo 5: Treatment Effect Visualization -->
    <Card class="mb-8">
      <Typography variant="h3" class="mb-4">5. Treatment Effect Visualization</Typography>
      <Typography variant="body" class="text-slate-600 dark:text-slate-400 mb-4">
        Before and after: Treatment vs Control potential outcomes.
      </Typography>

      <div class="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
        <AnimatedCausalDiagram
          bind:this={treatmentEffectDiagram}
          data={treatmentEffectData}
          autoPlay={true}
          width={400}
          height={280}
          title="Average Treatment Effect"
          description="Comparing potential outcomes Y(1) and Y(0)"
        />
      </div>

      <div class="flex gap-2">
        <button
          onclick={() => treatmentEffectDiagram?.play()}
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Replay Animation
        </button>
        <button
          onclick={() => treatmentEffectDiagram?.highlightElements(['outcome-t', 'outcome-c'], ['effect'])}
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Highlight Effect
        </button>
        <button
          onclick={() => treatmentEffectDiagram?.clearHighlights()}
          class="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-colors"
        >
          Clear
        </button>
      </div>
    </Card>

    <!-- Animation API Reference -->
    <Card class="mt-8">
      <Typography variant="h3" class="mb-4">Animation Components API</Typography>
      <div class="space-y-4 text-sm">
        <div class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <code class="text-blue-600 dark:text-blue-400 font-mono font-bold">StepExplanation</code>
          <span class="ml-2 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded">NEW</span>
          <p class="text-slate-600 dark:text-slate-400 mt-1">
            Props: <code>title</code>, <code>steps</code> (ExplanationStep[]), <code>width</code>, <code>height</code>, <code>layout</code> (horizontal|vertical)
            <br />
            Features: Play/pause controls, step navigation, keyboard shortcuts, auto-play
          </p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <code class="text-blue-600 dark:text-blue-400 font-mono">DiagramAnnotation</code>
          <p class="text-slate-600 dark:text-slate-400 mt-1">
            Props: <code>text</code>, <code>targetX</code>, <code>targetY</code>, <code>position</code> (top|bottom|left|right), <code>canvasWidth</code>, <code>canvasHeight</code>
          </p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <code class="text-blue-600 dark:text-blue-400 font-mono">AnimatedNode</code>
          <p class="text-slate-600 dark:text-slate-400 mt-1">
            Props: <code>node</code>, <code>animate</code> (fadeIn|scaleIn|none), <code>highlight</code>, <code>delay</code>
          </p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <code class="text-blue-600 dark:text-blue-400 font-mono">AnimatedEdge</code>
          <p class="text-slate-600 dark:text-slate-400 mt-1">
            Props: <code>edge</code>, <code>sourceNode</code>, <code>targetNode</code>, <code>animate</code> (draw|fadeIn|none), <code>highlight</code>, <code>delay</code>
          </p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <code class="text-blue-600 dark:text-blue-400 font-mono">AnimatedCausalDiagram</code>
          <p class="text-slate-600 dark:text-slate-400 mt-1">
            Props: <code>data</code>, <code>sequence</code>, <code>autoPlay</code>
            <br />
            Methods: <code>play()</code>, <code>reset()</code>, <code>highlightElements()</code>, <code>clearHighlights()</code>
          </p>
        </div>
      </div>
    </Card>

    <!-- Presets Reference -->
    <Card class="mt-4">
      <Typography variant="h3" class="mb-4">Explanation Presets</Typography>
      <div class="space-y-4 text-sm">
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <code class="text-green-600 dark:text-green-400 font-mono">createConfoundingExplanation()</code>
          <p class="text-slate-600 dark:text-slate-400 mt-1">
            5-step explanation of confounding bias and spurious correlation
          </p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <code class="text-green-600 dark:text-green-400 font-mono">createRCTExplanation()</code>
          <p class="text-slate-600 dark:text-slate-400 mt-1">
            4-step explanation of randomized controlled trials and why they work
          </p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <code class="text-green-600 dark:text-green-400 font-mono">createTreatmentEffectExplanation()</code>
          <p class="text-slate-600 dark:text-slate-400 mt-1">
            4-step explanation of potential outcomes and the fundamental problem of causal inference
          </p>
        </div>
      </div>
    </Card>
  </Section>
</Container>
