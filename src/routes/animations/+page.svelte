<script lang="ts">
  import { Container, Section, Typography, Card } from '$lib/components/ui';
  import { AnimationTimeline, PlaybackControls } from '$lib/components/animation';
  import type { AnimationStep } from '$lib/components/animation';
  import { gsap } from 'gsap';

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
  </Section>
</Container>
