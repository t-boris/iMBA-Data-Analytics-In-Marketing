// Pre-built explanation templates for common causal inference patterns
import type { ExplanationStep } from '../index';
import type { DiagramData } from '$lib/components/diagrams';

/**
 * Confounding Explanation
 * Explains how a confounder creates spurious correlation between treatment and outcome
 */
export function createConfoundingExplanation(): ExplanationStep[] {
  // Node positions for 500x280 canvas with 40px padding
  // After translate(40,40), coords 0-420 x 0-200 map to viewBox 40-460 x 40-240
  // Treatment at left, Outcome at right, Confounder at top center
  const treatmentNode: DiagramData['nodes'][0] = { id: 'treatment', label: 'Treatment', type: 'treatment', x: 60, y: 120 };
  const outcomeNode: DiagramData['nodes'][0] = { id: 'outcome', label: 'Outcome', type: 'outcome', x: 360, y: 120 };
  const confounderNode: DiagramData['nodes'][0] = { id: 'confounder', label: 'Confounder', type: 'confounder', x: 210, y: 20 };

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
  // Node positions for 500x280 canvas with 40px padding
  // RCT has a vertical flow

  // Population
  const population: DiagramData = {
    nodes: [
      { id: 'population', label: 'Population', type: 'variable', x: 210, y: 50 }
    ],
    edges: []
  };

  // Randomization - spread nodes vertically
  const randomization: DiagramData = {
    nodes: [
      { id: 'population', label: 'Population', type: 'variable', x: 210, y: 20 },
      { id: 'treatment', label: 'Treatment', type: 'treatment', x: 60, y: 130 },
      { id: 'control', label: 'Control', type: 'control', x: 360, y: 130 }
    ],
    edges: [
      { id: 'p-t', source: 'population', target: 'treatment', label: 'Random' },
      { id: 'p-c', source: 'population', target: 'control', label: 'Random' }
    ]
  };

  // Outcomes - simplified layout
  const outcomes: DiagramData = {
    nodes: [
      { id: 'treatment', label: 'Treatment', type: 'treatment', x: 60, y: 30 },
      { id: 'control', label: 'Control', type: 'control', x: 360, y: 30 },
      { id: 'outcome-t', label: 'Y(1)', type: 'outcome', x: 60, y: 130 },
      { id: 'outcome-c', label: 'Y(0)', type: 'outcome', x: 360, y: 130 }
    ],
    edges: [
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
      highlights: ['p-t', 'p-c'],
      annotations: [
        { targetId: 'population', text: 'Random assignment', position: 'top' }
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
  // Node positions for 500x280 canvas with 40px padding

  // Individual
  const individual: DiagramData = {
    nodes: [
      { id: 'person', label: 'Individual', type: 'variable', x: 210, y: 60 }
    ],
    edges: []
  };

  // Potential outcomes
  const potentialOutcomes: DiagramData = {
    nodes: [
      { id: 'person', label: 'Individual', type: 'variable', x: 210, y: 20 },
      { id: 'y1', label: 'Y(1)', type: 'outcome', x: 60, y: 120 },
      { id: 'y0', label: 'Y(0)', type: 'outcome', x: 360, y: 120 }
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
      { id: 'person', label: 'Individual', type: 'variable', x: 210, y: 20 },
      { id: 'y1', label: 'Y(1) = ?', type: 'outcome', x: 60, y: 120 },
      { id: 'y0', label: 'Y(0) = 5', type: 'outcome', x: 360, y: 120 }
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

/**
 * Difference-in-Differences Explanation
 * Explains how DID estimates causal effects using treatment/control over time
 */
export function createDIDExplanation(): ExplanationStep[] {
  // Node positions for 500x280 canvas with 40px padding
  // Layout: 2x2 grid showing before/after for treated/control

  // Step 1: Two groups over time
  const twoGroups: DiagramData = {
    nodes: [
      { id: 'treated', label: 'Treatment Group', type: 'treatment', x: 60, y: 60 },
      { id: 'control', label: 'Control Group', type: 'control', x: 60, y: 140 },
      { id: 'time', label: 'Time →', type: 'variable', x: 300, y: 100 }
    ],
    edges: []
  };

  // Step 2: Pre-period outcomes
  const prePeriod: DiagramData = {
    nodes: [
      { id: 'treated-pre', label: 'Treated (Pre)', type: 'treatment', x: 60, y: 40 },
      { id: 'control-pre', label: 'Control (Pre)', type: 'control', x: 60, y: 140 },
      { id: 'yt-pre', label: 'Y = 5', type: 'outcome', x: 200, y: 40 },
      { id: 'yc-pre', label: 'Y = 4', type: 'outcome', x: 200, y: 140 }
    ],
    edges: [
      { id: 't-yt', source: 'treated-pre', target: 'yt-pre' },
      { id: 'c-yc', source: 'control-pre', target: 'yc-pre' }
    ]
  };

  // Step 3: Treatment occurs
  const treatmentOccurs: DiagramData = {
    nodes: [
      { id: 'treated-pre', label: 'Treated (Pre)', type: 'treatment', x: 30, y: 40 },
      { id: 'control-pre', label: 'Control (Pre)', type: 'control', x: 30, y: 140 },
      { id: 'yt-pre', label: 'Y = 5', type: 'outcome', x: 150, y: 40 },
      { id: 'yc-pre', label: 'Y = 4', type: 'outcome', x: 150, y: 140 },
      { id: 'intervention', label: 'Treatment!', type: 'confounder', x: 270, y: 90 }
    ],
    edges: [
      { id: 't-yt', source: 'treated-pre', target: 'yt-pre' },
      { id: 'c-yc', source: 'control-pre', target: 'yc-pre' },
      { id: 'int-t', source: 'intervention', target: 'yt-pre', style: 'dashed' }
    ]
  };

  // Step 4: Post-period outcomes
  const postPeriod: DiagramData = {
    nodes: [
      { id: 'treated-pre', label: 'Treated (Pre)', type: 'treatment', x: 30, y: 20 },
      { id: 'control-pre', label: 'Control (Pre)', type: 'control', x: 30, y: 100 },
      { id: 'yt-pre', label: 'Y = 5', type: 'outcome', x: 140, y: 20 },
      { id: 'yc-pre', label: 'Y = 4', type: 'outcome', x: 140, y: 100 },
      { id: 'treated-post', label: 'Treated (Post)', type: 'treatment', x: 260, y: 20 },
      { id: 'control-post', label: 'Control (Post)', type: 'control', x: 260, y: 100 },
      { id: 'yt-post', label: 'Y = 10', type: 'outcome', x: 380, y: 20 },
      { id: 'yc-post', label: 'Y = 6', type: 'outcome', x: 380, y: 100 }
    ],
    edges: [
      { id: 't-yt', source: 'treated-pre', target: 'yt-pre' },
      { id: 'c-yc', source: 'control-pre', target: 'yc-pre' },
      { id: 't2-yt2', source: 'treated-post', target: 'yt-post' },
      { id: 'c2-yc2', source: 'control-post', target: 'yc-post' }
    ]
  };

  // Step 5: The DID calculation
  const didCalculation: DiagramData = {
    nodes: [
      { id: 'label-pre', label: 'Pre', type: 'variable', x: 140, y: 0 },
      { id: 'label-post', label: 'Post', type: 'variable', x: 300, y: 0 },
      { id: 'label-diff', label: 'Change', type: 'variable', x: 380, y: 0 },
      { id: 'yt-pre', label: '5', type: 'treatment', x: 140, y: 50 },
      { id: 'yt-post', label: '10', type: 'treatment', x: 300, y: 50 },
      { id: 'yt-diff', label: '+5', type: 'outcome', x: 380, y: 50 },
      { id: 'yc-pre', label: '4', type: 'control', x: 140, y: 110 },
      { id: 'yc-post', label: '6', type: 'control', x: 300, y: 110 },
      { id: 'yc-diff', label: '+2', type: 'outcome', x: 380, y: 110 },
      { id: 'did', label: 'DID = 3', type: 'outcome', x: 220, y: 170 }
    ],
    edges: [
      { id: 'yt-change', source: 'yt-pre', target: 'yt-post' },
      { id: 'yc-change', source: 'yc-pre', target: 'yc-post' },
      { id: 'yt-d', source: 'yt-post', target: 'yt-diff' },
      { id: 'yc-d', source: 'yc-post', target: 'yc-diff' },
      { id: 'did-calc', source: 'yt-diff', target: 'did' },
      { id: 'did-calc2', source: 'yc-diff', target: 'did' }
    ]
  };

  // Step 6: Parallel trends assumption
  const parallelTrends: DiagramData = {
    nodes: [
      { id: 'trend-t', label: 'Treated Trend', type: 'treatment', x: 60, y: 40 },
      { id: 'trend-c', label: 'Control Trend', type: 'control', x: 60, y: 120 },
      { id: 'counterfactual', label: 'Counterfactual', type: 'variable', x: 300, y: 80 },
      { id: 'actual', label: 'Actual', type: 'outcome', x: 300, y: 20 }
    ],
    edges: [
      { id: 'parallel', source: 'trend-t', target: 'trend-c', label: 'Parallel', style: 'dashed' },
      { id: 't-cf', source: 'trend-t', target: 'counterfactual', style: 'dashed' },
      { id: 't-actual', source: 'trend-t', target: 'actual' },
      { id: 'effect', source: 'counterfactual', target: 'actual', label: 'Effect' }
    ]
  };

  return [
    {
      id: 'step-1',
      title: 'Two Groups Over Time',
      description: 'In Difference-in-Differences, we observe two groups: a treatment group that will receive an intervention, and a control group that will not. We track both groups across time.',
      diagram: twoGroups,
      highlights: ['treated', 'control'],
      annotations: [
        { targetId: 'treated', text: 'Will receive treatment', position: 'right' },
        { targetId: 'control', text: 'No treatment', position: 'right' }
      ]
    },
    {
      id: 'step-2',
      title: 'Pre-Period Outcomes',
      description: 'Before the treatment, we observe outcomes for both groups. The treated group has an outcome of 5, while the control group has 4. Note: they do not need to be equal!',
      diagram: prePeriod,
      highlights: ['yt-pre', 'yc-pre'],
      annotations: [
        { targetId: 'yt-pre', text: 'Baseline for treated', position: 'right' },
        { targetId: 'yc-pre', text: 'Baseline for control', position: 'right' }
      ]
    },
    {
      id: 'step-3',
      title: 'Treatment Occurs',
      description: 'At some point in time, the treatment group receives the intervention. This could be a policy change, marketing campaign launch, or any event affecting only the treatment group.',
      diagram: treatmentOccurs,
      highlights: ['intervention'],
      annotations: [
        { targetId: 'intervention', text: 'Only affects treated group!', position: 'bottom' }
      ]
    },
    {
      id: 'step-4',
      title: 'Post-Period Outcomes',
      description: 'After treatment, we observe both groups again. The treated group jumped from 5 to 10 (+5), while the control group went from 4 to 6 (+2). But is all of the +5 due to treatment?',
      diagram: postPeriod,
      highlights: ['yt-post', 'yc-post'],
      annotations: [
        { targetId: 'yt-post', text: '+5 change', position: 'right' },
        { targetId: 'yc-post', text: '+2 change', position: 'right' }
      ]
    },
    {
      id: 'step-5',
      title: 'The DID Calculation',
      description: 'DID = (Post_T - Pre_T) - (Post_C - Pre_C) = (10-5) - (6-4) = 5 - 2 = 3. The control group change (+2) captures time trends. The extra change in treated group (+3) is the causal effect!',
      diagram: didCalculation,
      highlights: ['did'],
      annotations: [
        { targetId: 'did', text: 'Treatment Effect!', position: 'bottom' }
      ]
    },
    {
      id: 'step-6',
      title: 'The Parallel Trends Assumption',
      description: 'DID assumes that without treatment, both groups would have followed parallel trends. The counterfactual (dashed) shows where treated would be without treatment. The gap between actual and counterfactual is the effect.',
      diagram: parallelTrends,
      highlights: ['counterfactual', 'effect'],
      annotations: [
        { targetId: 'counterfactual', text: 'What would have happened', position: 'bottom' },
        { targetId: 'actual', text: 'What actually happened', position: 'top' }
      ]
    }
  ];
}

/**
 * Matching Methods Explanation
 * Explains propensity score matching for observational causal inference
 */
export function createMatchingExplanation(): ExplanationStep[] {
  // Step 1: Show treated and control groups with different characteristics
  const imbalancedGroups: DiagramData = {
    nodes: [
      { id: 'treated-1', label: 'T1 (Age:45, Inc:$80k)', type: 'treatment', x: 30, y: 40 },
      { id: 'treated-2', label: 'T2 (Age:52, Inc:$95k)', type: 'treatment', x: 30, y: 100 },
      { id: 'treated-3', label: 'T3 (Age:48, Inc:$88k)', type: 'treatment', x: 30, y: 160 },
      { id: 'control-1', label: 'C1 (Age:25, Inc:$35k)', type: 'control', x: 290, y: 40 },
      { id: 'control-2', label: 'C2 (Age:28, Inc:$42k)', type: 'control', x: 290, y: 100 },
      { id: 'control-3', label: 'C3 (Age:50, Inc:$90k)', type: 'control', x: 290, y: 160 }
    ],
    edges: []
  };

  // Step 2: Show the problem - groups aren't comparable
  const incomparableGroups: DiagramData = {
    nodes: [
      { id: 'treated-group', label: 'Treated (Avg: 48yo, $88k)', type: 'treatment', x: 60, y: 70 },
      { id: 'control-group', label: 'Control (Avg: 34yo, $56k)', type: 'control', x: 290, y: 70 },
      { id: 'comparison', label: 'Compare?', type: 'variable', x: 175, y: 140 }
    ],
    edges: [
      { id: 't-c', source: 'treated-group', target: 'comparison' },
      { id: 'c-c', source: 'control-group', target: 'comparison' }
    ]
  };

  // Step 3: Introduce propensity scores
  const propensityScores: DiagramData = {
    nodes: [
      { id: 'covariates', label: 'Covariates (Age, Income)', type: 'variable', x: 175, y: 20 },
      { id: 'propensity', label: 'P(Treatment | X)', type: 'confounder', x: 175, y: 90 },
      { id: 'treated-1', label: 'T1: PS=0.82', type: 'treatment', x: 30, y: 160 },
      { id: 'treated-2', label: 'T2: PS=0.91', type: 'treatment', x: 175, y: 160 },
      { id: 'control-3', label: 'C3: PS=0.85', type: 'control', x: 320, y: 160 }
    ],
    edges: [
      { id: 'cov-ps', source: 'covariates', target: 'propensity' },
      { id: 'ps-t1', source: 'propensity', target: 'treated-1' },
      { id: 'ps-t2', source: 'propensity', target: 'treated-2' },
      { id: 'ps-c3', source: 'propensity', target: 'control-3' }
    ]
  };

  // Step 4: Show matching - find control units similar to treated
  const matchingProcess: DiagramData = {
    nodes: [
      { id: 'treated-1', label: 'T1: PS=0.82', type: 'treatment', x: 60, y: 30 },
      { id: 'control-3', label: 'C3: PS=0.85', type: 'control', x: 290, y: 30 },
      { id: 'treated-2', label: 'T2: PS=0.91', type: 'treatment', x: 60, y: 100 },
      { id: 'control-4', label: 'C4: PS=0.88', type: 'control', x: 290, y: 100 },
      { id: 'match-label', label: 'Matched Pairs', type: 'variable', x: 175, y: 160 }
    ],
    edges: [
      { id: 't1-c3', source: 'treated-1', target: 'control-3', label: '|0.03|', style: 'dashed' },
      { id: 't2-c4', source: 'treated-2', target: 'control-4', label: '|0.03|', style: 'dashed' }
    ]
  };

  // Step 5: Result - balanced comparison groups
  const balancedGroups: DiagramData = {
    nodes: [
      { id: 'matched-treated', label: 'Matched Treated', type: 'treatment', x: 60, y: 60 },
      { id: 'matched-control', label: 'Matched Control', type: 'control', x: 290, y: 60 },
      { id: 'balance', label: 'Balanced!', type: 'variable', x: 175, y: 130 }
    ],
    edges: [
      { id: 'mt-b', source: 'matched-treated', target: 'balance' },
      { id: 'mc-b', source: 'matched-control', target: 'balance' }
    ]
  };

  // Step 6: Calculate ATT
  const attCalculation: DiagramData = {
    nodes: [
      { id: 'matched-treated', label: 'Y(1) Treated', type: 'treatment', x: 60, y: 60 },
      { id: 'matched-control', label: 'Y(0) Matched Control', type: 'control', x: 290, y: 60 },
      { id: 'att', label: 'ATT = E[Y(1) - Y(0) | T=1]', type: 'outcome', x: 175, y: 140 }
    ],
    edges: [
      { id: 'yt-att', source: 'matched-treated', target: 'att' },
      { id: 'yc-att', source: 'matched-control', target: 'att' }
    ]
  };

  return [
    {
      id: 'matching-1',
      title: 'The Starting Point: Imbalanced Groups',
      description:
        'In observational data, treated and control groups often differ systematically. Here, treated customers (who received a promo) are older and wealthier than control customers who did not.',
      diagram: imbalancedGroups,
      highlights: ['treated-1', 'treated-2', 'treated-3', 'control-1', 'control-2', 'control-3']
    },
    {
      id: 'matching-2',
      title: 'The Problem: Groups Are Not Comparable',
      description:
        'If we simply compare average outcomes between groups, we cannot attribute differences to the treatment. The groups differ on characteristics that also affect outcomes!',
      diagram: incomparableGroups,
      highlights: ['comparison'],
      annotations: [{ targetId: 'comparison', text: 'Unfair comparison!', position: 'bottom' }]
    },
    {
      id: 'matching-3',
      title: 'Enter Propensity Scores',
      description:
        'The propensity score is the probability of receiving treatment given observed characteristics: P(T=1|X). We estimate this using logistic regression on covariates like age and income.',
      diagram: propensityScores,
      highlights: ['propensity'],
      annotations: [{ targetId: 'propensity', text: 'Single summary score', position: 'right' }]
    },
    {
      id: 'matching-4',
      title: 'Matching on Propensity Scores',
      description:
        'We find control units with similar propensity scores to each treated unit. This creates matched pairs that are comparable on observed characteristics.',
      diagram: matchingProcess,
      highlights: ['t1-c3', 't2-c4'],
      annotations: [{ targetId: 't1-c3', text: 'Close match!', position: 'top' }]
    },
    {
      id: 'matching-5',
      title: 'Result: Balanced Comparison Groups',
      description:
        'After matching, the treated and control groups have similar covariate distributions. We have created pseudo-randomization through statistical adjustment.',
      diagram: balancedGroups,
      highlights: ['balance'],
      annotations: [{ targetId: 'balance', text: 'Covariates balanced', position: 'bottom' }]
    },
    {
      id: 'matching-6',
      title: 'Calculate the ATT',
      description:
        'The Average Treatment Effect on the Treated (ATT) compares outcomes of treated units to their matched controls. This estimates the causal effect for those who actually received treatment.',
      diagram: attCalculation,
      highlights: ['att'],
      annotations: [{ targetId: 'att', text: 'Causal effect estimate', position: 'bottom' }]
    }
  ];
}

/**
 * Instrumental Variables Explanation
 * Explains how instruments help identify causal effects with unobserved confounders
 */
export function createIVExplanation(): ExplanationStep[] {
  // Step 1: The endogeneity problem - unobserved confounder
  const endogeneityProblem: DiagramData = {
    nodes: [
      { id: 'x', label: 'X (Education)', type: 'treatment', x: 60, y: 120 },
      { id: 'y', label: 'Y (Earnings)', type: 'outcome', x: 360, y: 120 },
      { id: 'u', label: 'U (Ability)', type: 'confounder', x: 210, y: 30 }
    ],
    edges: [
      { id: 'x-y', source: 'x', target: 'y', label: 'Causal?', style: 'dashed' },
      { id: 'u-x', source: 'u', target: 'x' },
      { id: 'u-y', source: 'u', target: 'y' }
    ]
  };

  // Step 2: Introduce the instrument
  const introduceInstrument: DiagramData = {
    nodes: [
      { id: 'z', label: 'Z (Instrument)', type: 'variable', x: 60, y: 30 },
      { id: 'x', label: 'X (Education)', type: 'treatment', x: 210, y: 120 },
      { id: 'y', label: 'Y (Earnings)', type: 'outcome', x: 360, y: 120 },
      { id: 'u', label: 'U (Ability)', type: 'confounder', x: 285, y: 30 }
    ],
    edges: [
      { id: 'z-x', source: 'z', target: 'x' },
      { id: 'x-y', source: 'x', target: 'y', style: 'dashed' },
      { id: 'u-x', source: 'u', target: 'x' },
      { id: 'u-y', source: 'u', target: 'y' }
    ]
  };

  // Step 3: Exclusion restriction
  const exclusionRestriction: DiagramData = {
    nodes: [
      { id: 'z', label: 'Z (Distance to College)', type: 'variable', x: 60, y: 30 },
      { id: 'x', label: 'X (Education)', type: 'treatment', x: 210, y: 120 },
      { id: 'y', label: 'Y (Earnings)', type: 'outcome', x: 360, y: 120 },
      { id: 'u', label: 'U (Ability)', type: 'confounder', x: 285, y: 30 }
    ],
    edges: [
      { id: 'z-x', source: 'z', target: 'x', label: 'Relevance' },
      { id: 'x-y', source: 'x', target: 'y', style: 'dashed' },
      { id: 'u-x', source: 'u', target: 'x' },
      { id: 'u-y', source: 'u', target: 'y' }
    ]
  };

  // Step 4: Two-stage process
  const twoStage: DiagramData = {
    nodes: [
      { id: 'z', label: 'Z (Instrument)', type: 'variable', x: 30, y: 70 },
      { id: 'x-hat', label: 'X-hat (Predicted)', type: 'treatment', x: 190, y: 70 },
      { id: 'y', label: 'Y (Outcome)', type: 'outcome', x: 350, y: 70 },
      { id: 'stage1', label: 'Stage 1', type: 'variable', x: 110, y: 140 },
      { id: 'stage2', label: 'Stage 2', type: 'variable', x: 270, y: 140 }
    ],
    edges: [
      { id: 'z-xhat', source: 'z', target: 'x-hat', label: 'X = aZ + e' },
      { id: 'xhat-y', source: 'x-hat', target: 'y', label: 'Y = bX-hat + u' }
    ]
  };

  // Step 5: Causal effect identified
  const causalEffect: DiagramData = {
    nodes: [
      { id: 'z', label: 'Z (Instrument)', type: 'variable', x: 30, y: 30 },
      { id: 'x', label: 'X (Treatment)', type: 'treatment', x: 190, y: 90 },
      { id: 'y', label: 'Y (Outcome)', type: 'outcome', x: 350, y: 90 },
      { id: 'u', label: 'U (Unobserved)', type: 'confounder', x: 270, y: 30 },
      { id: 'effect', label: 'LATE', type: 'outcome', x: 270, y: 160 }
    ],
    edges: [
      { id: 'z-x', source: 'z', target: 'x' },
      { id: 'x-y', source: 'x', target: 'y', label: 'Causal!' },
      { id: 'u-x', source: 'u', target: 'x', style: 'dashed' },
      { id: 'u-y', source: 'u', target: 'y', style: 'dashed' },
      { id: 'xy-eff', source: 'x', target: 'effect', style: 'dashed' }
    ]
  };

  return [
    {
      id: 'iv-1',
      title: 'The Endogeneity Problem',
      description:
        'We want to know if education (X) causes higher earnings (Y). But unobserved ability (U) affects both - smarter people get more education AND earn more. Simple regression gives biased estimates.',
      diagram: endogeneityProblem,
      highlights: ['u', 'u-x', 'u-y'],
      annotations: [{ targetId: 'u', text: 'Unobserved!', position: 'top' }]
    },
    {
      id: 'iv-2',
      title: 'Introduce an Instrument',
      description:
        'An instrumental variable Z affects treatment X but has no direct effect on outcome Y. It provides exogenous variation in X that is unrelated to the confounder U.',
      diagram: introduceInstrument,
      highlights: ['z', 'z-x'],
      annotations: [{ targetId: 'z', text: 'Exogenous variation', position: 'top' }]
    },
    {
      id: 'iv-3',
      title: 'The Exclusion Restriction',
      description:
        'The instrument must only affect Y THROUGH X, not directly. For example, distance to college affects education but should not directly affect earnings (except through education).',
      diagram: exclusionRestriction,
      highlights: ['z-x'],
      annotations: [{ targetId: 'z', text: 'Z -> X -> Y only', position: 'top' }]
    },
    {
      id: 'iv-4',
      title: 'Two-Stage Least Squares',
      description:
        'Stage 1: Regress X on Z to get predicted values X-hat. Stage 2: Regress Y on X-hat. The coefficient on X-hat is purged of endogeneity bias because X-hat only varies with Z.',
      diagram: twoStage,
      highlights: ['z-xhat', 'xhat-y'],
      annotations: [
        { targetId: 'stage1', text: 'Predict X from Z', position: 'bottom' },
        { targetId: 'stage2', text: 'Use X-hat for Y', position: 'bottom' }
      ]
    },
    {
      id: 'iv-5',
      title: 'Causal Effect Identified',
      description:
        'The IV estimate gives us the Local Average Treatment Effect (LATE) - the causal effect for "compliers" whose treatment status is affected by the instrument. We have isolated exogenous variation!',
      diagram: causalEffect,
      highlights: ['x-y', 'effect'],
      annotations: [{ targetId: 'effect', text: 'Causal estimate for compliers', position: 'bottom' }]
    }
  ];
}

// Export all presets
export const presets = {
  confounding: createConfoundingExplanation,
  rct: createRCTExplanation,
  treatmentEffect: createTreatmentEffectExplanation,
  did: createDIDExplanation,
  matching: createMatchingExplanation,
  iv: createIVExplanation
};
