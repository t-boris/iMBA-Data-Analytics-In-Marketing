// Pre-built explanation templates for common causal inference patterns
import type { ExplanationStep } from '../index';
import type { DiagramData } from '$lib/components/diagrams';

/**
 * Confounding Explanation
 * Explains how a confounder creates spurious correlation between treatment and outcome
 */
export function createConfoundingExplanation(): ExplanationStep[] {
  // Node positions optimized for 500x280 canvas with 40px padding
  // Centered horizontally, with good vertical spacing for labels
  const treatmentNode: DiagramData['nodes'][0] = { id: 'treatment', label: 'Treatment', type: 'treatment', x: 80, y: 140 };
  const outcomeNode: DiagramData['nodes'][0] = { id: 'outcome', label: 'Outcome', type: 'outcome', x: 340, y: 140 };
  const confounderNode: DiagramData['nodes'][0] = { id: 'confounder', label: 'Confounder', type: 'confounder', x: 210, y: 40 };

  // Base diagram - just showing variables
  const baseDiagram: DiagramData = {
    nodes: [treatmentNode, outcomeNode],
    edges: []
  };

  // With apparent causal arrow
  const withCausalArrow: DiagramData = {
    nodes: [treatmentNode, outcomeNode],
    edges: [
      { id: 't-o', source: 'treatment', target: 'outcome', label: 'Causal?' }
    ]
  };

  // Reveal confounder
  const withConfounder: DiagramData = {
    nodes: [treatmentNode, outcomeNode, confounderNode],
    edges: [
      { id: 't-o', source: 'treatment', target: 'outcome', label: 'Causal?', style: 'dashed' }
    ]
  };

  // Full confounding structure
  const fullConfounding: DiagramData = {
    nodes: [treatmentNode, outcomeNode, confounderNode],
    edges: [
      { id: 'c-t', source: 'confounder', target: 'treatment' },
      { id: 'c-o', source: 'confounder', target: 'outcome' },
      { id: 't-o', source: 'treatment', target: 'outcome', label: 'Spurious', style: 'dashed' }
    ]
  };

  return [
    {
      id: 'step-1',
      title: 'The Correlation',
      description: 'We observe a correlation between Treatment and Outcome. People who receive the treatment tend to have better outcomes. But is this causal?',
      diagram: baseDiagram,
      highlights: ['treatment', 'outcome']
    },
    {
      id: 'step-2',
      title: 'The Naive Conclusion',
      description: 'Our first instinct might be to draw a causal arrow: the treatment CAUSES the outcome. But wait - there might be something else going on.',
      diagram: withCausalArrow,
      highlights: ['t-o'],
      annotations: [
        { targetId: 't-o', text: 'Is this real?', position: 'bottom' }
      ]
    },
    {
      id: 'step-3',
      title: 'Enter the Confounder',
      description: 'A confounder is a third variable that affects BOTH the treatment and the outcome. It lurks behind the scenes, creating the illusion of a causal relationship.',
      diagram: withConfounder,
      highlights: ['confounder'],
      annotations: [
        { targetId: 'confounder', text: 'The hidden variable!', position: 'top' }
      ]
    },
    {
      id: 'step-4',
      title: 'The True Structure',
      description: 'The confounder influences who gets treated AND affects the outcome. This creates a "backdoor path" that makes treatment and outcome correlated, even if treatment has no real effect!',
      diagram: fullConfounding,
      highlights: ['c-t', 'c-o'],
      annotations: [
        { targetId: 'c-t', text: 'Affects who gets treated', position: 'left' },
        { targetId: 'c-o', text: 'Also affects outcome', position: 'right' }
      ]
    },
    {
      id: 'step-5',
      title: 'Spurious Correlation',
      description: 'The observed correlation between treatment and outcome may be partly or entirely spurious - caused by the confounder, not by a true causal effect. To find the real effect, we must control for the confounder.',
      diagram: fullConfounding,
      highlights: ['t-o']
    }
  ];
}

/**
 * RCT Explanation
 * Explains how randomized experiments eliminate confounding
 */
export function createRCTExplanation(): ExplanationStep[] {
  // Node positions optimized for 500x280 canvas with 40px padding
  // RCT has a vertical flow, so we compress the y-coordinates

  // Population
  const population: DiagramData = {
    nodes: [
      { id: 'population', label: 'Population', type: 'variable', x: 210, y: 30 }
    ],
    edges: []
  };

  // Randomization - spread out to fit in canvas
  const randomization: DiagramData = {
    nodes: [
      { id: 'population', label: 'Population', type: 'variable', x: 210, y: 20 },
      { id: 'random', label: 'Random', type: 'variable', x: 210, y: 80 },
      { id: 'treatment', label: 'Treatment', type: 'treatment', x: 80, y: 150 },
      { id: 'control', label: 'Control', type: 'control', x: 340, y: 150 }
    ],
    edges: [
      { id: 'p-r', source: 'population', target: 'random' },
      { id: 'r-t', source: 'random', target: 'treatment' },
      { id: 'r-c', source: 'random', target: 'control' }
    ]
  };

  // Outcomes - use separate structure to avoid deep nesting issues
  const outcomes: DiagramData = {
    nodes: [
      { id: 'population', label: 'Population', type: 'variable', x: 210, y: 10 },
      { id: 'random', label: 'Random', type: 'variable', x: 210, y: 55 },
      { id: 'treatment', label: 'Treatment', type: 'treatment', x: 80, y: 105 },
      { id: 'control', label: 'Control', type: 'control', x: 340, y: 105 },
      { id: 'outcome-t', label: 'Y(1)', type: 'outcome', x: 80, y: 160 },
      { id: 'outcome-c', label: 'Y(0)', type: 'outcome', x: 340, y: 160 }
    ],
    edges: [
      { id: 'p-r', source: 'population', target: 'random' },
      { id: 'r-t', source: 'random', target: 'treatment' },
      { id: 'r-c', source: 'random', target: 'control' },
      { id: 't-yt', source: 'treatment', target: 'outcome-t' },
      { id: 'c-yc', source: 'control', target: 'outcome-c' }
    ]
  };

  // ATE
  const ate: DiagramData = {
    nodes: [...outcomes.nodes],
    edges: [
      ...outcomes.edges,
      { id: 'effect', source: 'outcome-t', target: 'outcome-c', label: 'ATE', style: 'dashed' }
    ]
  };

  return [
    {
      id: 'step-1',
      title: 'Start with a Population',
      description: 'We begin with a population of individuals. Some have traits that might affect both their likelihood of treatment AND their outcomes - potential confounders.',
      diagram: population,
      highlights: ['population'],
      annotations: [
        { targetId: 'population', text: 'Mix of characteristics', position: 'right' }
      ]
    },
    {
      id: 'step-2',
      title: 'Random Assignment',
      description: 'Through randomization (like flipping a coin), we assign each person to either treatment or control. This breaks the link between confounders and treatment!',
      diagram: randomization,
      highlights: ['random'],
      annotations: [
        { targetId: 'random', text: 'Coin flip!', position: 'right' }
      ]
    },
    {
      id: 'step-3',
      title: 'Observe Outcomes',
      description: 'We observe the outcome for the treatment group Y(1) and the control group Y(0). Because assignment was random, confounders are balanced across groups.',
      diagram: outcomes,
      highlights: ['outcome-t', 'outcome-c']
    },
    {
      id: 'step-4',
      title: 'Calculate the ATE',
      description: 'The Average Treatment Effect (ATE) is simply the difference in average outcomes: ATE = E[Y(1)] - E[Y(0)]. With randomization, this equals the true causal effect!',
      diagram: ate,
      highlights: ['effect'],
      annotations: [
        { targetId: 'effect', text: 'True causal effect', position: 'bottom' }
      ]
    }
  ];
}

/**
 * Treatment Effect Explanation
 * Explains the fundamental concept of potential outcomes
 */
export function createTreatmentEffectExplanation(): ExplanationStep[] {
  // Node positions optimized for 500x280 canvas with 40px padding

  // Individual
  const individual: DiagramData = {
    nodes: [
      { id: 'person', label: 'Individual', type: 'variable', x: 210, y: 80 }
    ],
    edges: []
  };

  // Potential outcomes
  const potentialOutcomes: DiagramData = {
    nodes: [
      { id: 'person', label: 'Individual', type: 'variable', x: 210, y: 40 },
      { id: 'y1', label: 'Y(1)', type: 'outcome', x: 80, y: 140 },
      { id: 'y0', label: 'Y(0)', type: 'outcome', x: 340, y: 140 }
    ],
    edges: [
      { id: 'p-y1', source: 'person', target: 'y1' },
      { id: 'p-y0', source: 'person', target: 'y0' }
    ]
  };

  // Individual effect
  const individualEffect: DiagramData = {
    nodes: [...potentialOutcomes.nodes],
    edges: [
      ...potentialOutcomes.edges,
      { id: 'effect', source: 'y1', target: 'y0', label: 'ITE', style: 'dashed' }
    ]
  };

  // Fundamental problem
  const fundamentalProblem: DiagramData = {
    nodes: [
      { id: 'person', label: 'Individual', type: 'variable', x: 210, y: 40 },
      { id: 'y1', label: 'Y(1) = ?', type: 'outcome', x: 80, y: 140 },
      { id: 'y0', label: 'Y(0) = 5', type: 'outcome', x: 340, y: 140 }
    ],
    edges: [
      { id: 'p-y1', source: 'person', target: 'y1', style: 'dashed' },
      { id: 'p-y0', source: 'person', target: 'y0' }
    ]
  };

  return [
    {
      id: 'step-1',
      title: 'One Individual',
      description: 'Consider a single individual. We want to know: what effect does a treatment have on this person?',
      diagram: individual,
      highlights: ['person']
    },
    {
      id: 'step-2',
      title: 'Two Potential Outcomes',
      description: 'Each person has TWO potential outcomes: Y(1) is their outcome IF treated, and Y(0) is their outcome IF NOT treated. These exist conceptually, even before any treatment decision.',
      diagram: potentialOutcomes,
      highlights: ['y1', 'y0'],
      annotations: [
        { targetId: 'y1', text: 'If treated', position: 'left' },
        { targetId: 'y0', text: 'If not treated', position: 'right' }
      ]
    },
    {
      id: 'step-3',
      title: 'Individual Treatment Effect',
      description: 'The Individual Treatment Effect (ITE) is the difference: ITE = Y(1) - Y(0). This is the causal effect of treatment for this specific person.',
      diagram: individualEffect,
      highlights: ['effect'],
      annotations: [
        { targetId: 'effect', text: 'Y(1) - Y(0)', position: 'bottom' }
      ]
    },
    {
      id: 'step-4',
      title: 'The Fundamental Problem',
      description: 'Here is the catch: we can only observe ONE outcome per person! If they receive treatment, we see Y(1) but Y(0) is forever unknown. This is the "fundamental problem of causal inference."',
      diagram: fundamentalProblem,
      highlights: ['y1'],
      annotations: [
        { targetId: 'y1', text: 'Never observed!', position: 'left' }
      ]
    }
  ];
}

// Export all presets
export const presets = {
  confounding: createConfoundingExplanation,
  rct: createRCTExplanation,
  treatmentEffect: createTreatmentEffectExplanation
};
