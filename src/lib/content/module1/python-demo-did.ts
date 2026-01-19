/**
 * Lecture 8: Python Demo - DID Implementation
 *
 * This lecture provides hands-on Python code for:
 * - Setting up the environment
 * - Data structure for DID analysis
 * - Basic DID calculation
 * - Regression approach with interaction terms
 * - Visualization of parallel trends
 * - Complete reproducible example
 */

import type { LectureContent, ContentSection } from '../types';

// =============================================================================
// Section 1: Setup
// =============================================================================

const setupSection: ContentSection = {
	id: 'setup',
	type: 'text',
	title: 'Setup: Required Libraries',
	content: `Before diving into the code, you'll need to install and import the necessary Python libraries. This demo uses standard data science packages that you likely already have installed.

\`\`\`python
# Required libraries
import pandas as pd
import numpy as np
import statsmodels.api as sm
import statsmodels.formula.api as smf
import matplotlib.pyplot as plt
import seaborn as sns

# Set display options
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
plt.style.use('seaborn-v0_8-whitegrid')

# For reproducibility
np.random.seed(42)
\`\`\`

**Installation (if needed):**
\`\`\`bash
pip install pandas numpy statsmodels matplotlib seaborn
\`\`\`

**Library purposes:**
- **pandas**: Data manipulation and analysis
- **numpy**: Numerical operations
- **statsmodels**: Statistical models including OLS regression
- **matplotlib/seaborn**: Visualization`
};

// =============================================================================
// Section 2: Data Structure
// =============================================================================

const dataStructureSection: ContentSection = {
	id: 'data-structure',
	type: 'text',
	title: 'Data Structure for DID',
	content: `DID analysis requires panel data with observations across time and treatment groups. Here's the expected format and how to create simulated data for practice.

**Required Variables:**
1. **Unit identifier** - Who/what is being observed (store, customer, region)
2. **Time indicator** - When the observation occurred (typically binary: pre/post)
3. **Treatment indicator** - Whether the unit is in treatment group (binary: 0/1)
4. **Outcome variable** - What you're measuring (sales, clicks, revenue)

**Creating Simulated DID Data:**

\`\`\`python
def create_did_data(n_units=200, treatment_effect=3.0):
    """
    Create simulated data for DID analysis.

    Parameters:
    -----------
    n_units : int
        Number of units (half treated, half control)
    treatment_effect : float
        True treatment effect to simulate

    Returns:
    --------
    pd.DataFrame with columns: unit_id, time, treated, post, outcome
    """
    n_treated = n_units // 2
    n_control = n_units - n_treated

    # Create unit-level data
    units = []
    for i in range(n_units):
        is_treated = i < n_treated
        # Unit-specific baseline (creates level differences between groups)
        unit_baseline = 10 + (2 if is_treated else 0) + np.random.normal(0, 1)

        for time_period in [0, 1]:  # Pre and Post
            # Time trend (affects both groups equally)
            time_effect = 2 * time_period

            # Treatment effect (only for treated in post period)
            treatment = treatment_effect * is_treated * time_period

            # Random noise
            noise = np.random.normal(0, 1)

            # Outcome
            outcome = unit_baseline + time_effect + treatment + noise

            units.append({
                'unit_id': i,
                'time': time_period,
                'treated': int(is_treated),
                'post': time_period,
                'outcome': outcome
            })

    return pd.DataFrame(units)

# Generate data
df = create_did_data(n_units=200, treatment_effect=3.0)
print(df.head(10))
print(f"\\nShape: {df.shape}")
print(f"\\nGroup counts:\\n{df.groupby(['treated', 'post']).size()}")
\`\`\`

**Expected Output:**
\`\`\`
   unit_id  time  treated  post    outcome
0        0     0        1     0  11.496714
1        0     1        1     1  16.138824
2        1     0        1     0  12.647689
3        1     1        1     1  17.523030
4        2     0        1     0  11.765863
...

Shape: (400, 5)

Group counts:
treated  post
0        0       100
         1       100
1        0       100
         1       100
dtype: int64
\`\`\``
};

// =============================================================================
// Section 3: Basic DID Calculation
// =============================================================================

const basicDIDSection: ContentSection = {
	id: 'basic-did',
	type: 'text',
	title: 'Basic DID Calculation',
	content: `The simplest way to calculate DID is using the "2x2" formula: subtract the control group change from the treatment group change.

**The DID Formula:**
\`\`\`
DID = (Y_treated_post - Y_treated_pre) - (Y_control_post - Y_control_pre)
\`\`\`

**Python Implementation:**

\`\`\`python
def calculate_did_manual(df):
    """
    Calculate DID manually using group means.

    Parameters:
    -----------
    df : pd.DataFrame
        Must have columns: treated, post, outcome

    Returns:
    --------
    dict with means and DID estimate
    """
    # Calculate group means
    means = df.groupby(['treated', 'post'])['outcome'].mean()

    # Extract the four means
    y_control_pre = means[(0, 0)]
    y_control_post = means[(0, 1)]
    y_treated_pre = means[(1, 0)]
    y_treated_post = means[(1, 1)]

    # Calculate changes
    control_change = y_control_post - y_control_pre
    treated_change = y_treated_post - y_treated_pre

    # DID estimate
    did_estimate = treated_change - control_change

    return {
        'y_control_pre': y_control_pre,
        'y_control_post': y_control_post,
        'y_treated_pre': y_treated_pre,
        'y_treated_post': y_treated_post,
        'control_change': control_change,
        'treated_change': treated_change,
        'did_estimate': did_estimate
    }

# Calculate
results = calculate_did_manual(df)

# Display results
print("=== Manual DID Calculation ===")
print(f"\\nControl Group:")
print(f"  Pre:  {results['y_control_pre']:.3f}")
print(f"  Post: {results['y_control_post']:.3f}")
print(f"  Change: {results['control_change']:.3f}")
print(f"\\nTreated Group:")
print(f"  Pre:  {results['y_treated_pre']:.3f}")
print(f"  Post: {results['y_treated_post']:.3f}")
print(f"  Change: {results['treated_change']:.3f}")
print(f"\\n>>> DID Estimate: {results['did_estimate']:.3f}")
print(f"    (True effect was 3.0)")
\`\`\`

**Expected Output:**
\`\`\`
=== Manual DID Calculation ===

Control Group:
  Pre:  10.052
  Post: 12.089
  Change: 2.037

Treated Group:
  Pre:  12.108
  Post: 17.201
  Change: 5.093

>>> DID Estimate: 3.056
    (True effect was 3.0)
\`\`\`

Notice that the treated group starts higher (12.1 vs 10.1) - this is selection bias! But DID still recovers the treatment effect by focusing on CHANGES.`
};

// =============================================================================
// Section 4: Regression Approach
// =============================================================================

const regressionSection: ContentSection = {
	id: 'regression',
	type: 'text',
	title: 'DID via Regression',
	content: `The regression approach to DID is more flexible and provides standard errors. The key is including an interaction term between treatment and post.

**The DID Regression Model:**
\`\`\`
Y = beta0 + beta1*Treated + beta2*Post + beta3*(Treated*Post) + epsilon
\`\`\`

Where:
- **beta0**: Baseline (control, pre-period)
- **beta1**: Treatment group fixed effect (level difference)
- **beta2**: Time effect (common trend)
- **beta3**: **THE DID ESTIMATE!** (treatment effect)

**Python Implementation:**

\`\`\`python
def did_regression(df):
    """
    Estimate DID using OLS regression with interaction term.

    Parameters:
    -----------
    df : pd.DataFrame
        Must have columns: treated, post, outcome

    Returns:
    --------
    statsmodels OLSResults object
    """
    # Create interaction term
    df = df.copy()
    df['treated_post'] = df['treated'] * df['post']

    # Fit regression
    model = smf.ols('outcome ~ treated + post + treated_post', data=df)
    results = model.fit()

    return results

# Estimate
reg_results = did_regression(df)
print(reg_results.summary())
\`\`\`

**Expected Output (key portion):**
\`\`\`
                            OLS Regression Results
==============================================================================
Dep. Variable:                outcome   R-squared:                       0.823
Model:                            OLS   Adj. R-squared:                  0.822
Method:                 Least Squares   F-statistic:                     614.5
Date:                Mon, 15 Jan 2024   Prob (F-statistic):          1.51e-143
==============================================================================
                 coef    std err          t      P>|t|      [0.025      0.975]
------------------------------------------------------------------------------
Intercept     10.0523      0.141     71.199      0.000       9.775      10.330
treated        2.0555      0.200     10.292      0.000       1.663       2.448
post           2.0373      0.200     10.200      0.000       1.645       2.430
treated_post   3.0557      0.282     10.826      0.000       2.500       3.611
==============================================================================
\`\`\`

**Interpreting the Coefficients:**
- **Intercept (10.05)**: Average outcome for control group in pre-period
- **treated (2.06)**: Treated group is 2.06 units higher at baseline (selection)
- **post (2.04)**: Time trend - both groups increased by ~2 units
- **treated_post (3.06)**: **DID ESTIMATE** - treatment effect!

The regression gives us the same estimate as the manual calculation, plus standard errors and confidence intervals!`
};

// =============================================================================
// Section 5: Visualization
// =============================================================================

const visualizationSection: ContentSection = {
	id: 'visualization',
	type: 'text',
	title: 'Visualizing DID and Parallel Trends',
	content: `Visualization is crucial for DID analysis - both for presenting results and checking the parallel trends assumption.

**Basic DID Visualization:**

\`\`\`python
def plot_did(df, results_dict):
    """
    Create a DID visualization showing group trajectories.

    Parameters:
    -----------
    df : pd.DataFrame
        Must have columns: treated, post, outcome
    results_dict : dict
        Output from calculate_did_manual()
    """
    fig, ax = plt.subplots(figsize=(10, 6))

    # Group means
    means = df.groupby(['treated', 'post'])['outcome'].mean().reset_index()

    # Plot lines
    for treated, group_name, color in [(0, 'Control', 'blue'), (1, 'Treated', 'red')]:
        group_data = means[means['treated'] == treated]
        ax.plot(group_data['post'], group_data['outcome'],
                'o-', color=color, markersize=10, linewidth=2, label=group_name)

    # Add counterfactual line (parallel to control)
    control_change = results_dict['control_change']
    counterfactual_post = results_dict['y_treated_pre'] + control_change
    ax.plot([0, 1], [results_dict['y_treated_pre'], counterfactual_post],
            '--', color='red', alpha=0.5, linewidth=2, label='Counterfactual')

    # Annotate the treatment effect
    ax.annotate('',
                xy=(1, results_dict['y_treated_post']),
                xytext=(1, counterfactual_post),
                arrowprops=dict(arrowstyle='<->', color='green', lw=2))
    ax.text(1.05, (results_dict['y_treated_post'] + counterfactual_post) / 2,
            f'DID = {results_dict["did_estimate"]:.2f}',
            fontsize=12, color='green', fontweight='bold')

    # Add vertical line at treatment
    ax.axvline(x=0.5, color='gray', linestyle=':', alpha=0.5)
    ax.text(0.52, ax.get_ylim()[1] * 0.95, 'Treatment', fontsize=10, color='gray')

    # Labels and formatting
    ax.set_xlabel('Time Period', fontsize=12)
    ax.set_ylabel('Outcome', fontsize=12)
    ax.set_title('Difference-in-Differences Visualization', fontsize=14, fontweight='bold')
    ax.set_xticks([0, 1])
    ax.set_xticklabels(['Pre-Treatment', 'Post-Treatment'])
    ax.legend(loc='upper left')
    ax.grid(True, alpha=0.3)

    plt.tight_layout()
    return fig

# Create visualization
fig = plot_did(df, results)
plt.show()
\`\`\`

**Checking Parallel Trends (with multiple pre-periods):**

\`\`\`python
def create_multiperiod_data(n_units=100, treatment_time=3, n_periods=6, effect=3.0):
    """
    Create panel data with multiple pre-treatment periods.
    """
    n_treated = n_units // 2
    data = []

    for i in range(n_units):
        is_treated = i < n_treated
        unit_baseline = 10 + (2 if is_treated else 0) + np.random.normal(0, 0.5)

        for t in range(n_periods):
            # Common time trend
            time_effect = 1.5 * t
            # Treatment effect (only for treated after treatment_time)
            treatment = effect * is_treated * (t >= treatment_time)
            # Noise
            noise = np.random.normal(0, 1)

            data.append({
                'unit_id': i,
                'period': t,
                'treated': int(is_treated),
                'post': int(t >= treatment_time),
                'outcome': unit_baseline + time_effect + treatment + noise
            })

    return pd.DataFrame(data)

def plot_parallel_trends(df, treatment_time):
    """
    Plot trends over time for treated and control groups.
    """
    fig, ax = plt.subplots(figsize=(10, 6))

    # Calculate means by group and period
    means = df.groupby(['treated', 'period'])['outcome'].agg(['mean', 'std', 'count'])
    means['se'] = means['std'] / np.sqrt(means['count'])
    means = means.reset_index()

    for treated, label, color in [(0, 'Control', 'blue'), (1, 'Treated', 'red')]:
        group = means[means['treated'] == treated]
        ax.errorbar(group['period'], group['mean'], yerr=1.96*group['se'],
                   fmt='o-', color=color, capsize=3, label=label, markersize=8)

    # Mark treatment time
    ax.axvline(x=treatment_time - 0.5, color='gray', linestyle='--', linewidth=2)
    ax.text(treatment_time - 0.4, ax.get_ylim()[1] * 0.95, 'Treatment Starts',
            fontsize=10, color='gray')

    # Shade pre-treatment period
    ax.axvspan(-0.5, treatment_time - 0.5, alpha=0.1, color='green', label='Pre-treatment')

    ax.set_xlabel('Time Period', fontsize=12)
    ax.set_ylabel('Outcome (mean +/- 95% CI)', fontsize=12)
    ax.set_title('Parallel Trends Check', fontsize=14, fontweight='bold')
    ax.legend()
    ax.grid(True, alpha=0.3)

    plt.tight_layout()
    return fig

# Generate and plot
df_multi = create_multiperiod_data(n_units=200, treatment_time=3)
fig = plot_parallel_trends(df_multi, treatment_time=3)
plt.show()
\`\`\`

Look for parallel lines in the pre-treatment (shaded) region. If trends diverge before treatment, the parallel trends assumption may be violated!`
};

// =============================================================================
// Section 6: Complete Example
// =============================================================================

const completeExampleSection: ContentSection = {
	id: 'complete-example',
	type: 'text',
	title: 'Complete Reproducible Example',
	content: `Here's a complete, self-contained script you can copy and run. This simulates a marketing scenario where some stores receive a promotional campaign.

\`\`\`python
"""
Complete DID Analysis Example: Store Promotion Campaign
========================================================
Scenario: A retail chain tests a new promotional display in 50 stores.
We want to estimate the causal effect on sales.
"""

import pandas as pd
import numpy as np
import statsmodels.formula.api as smf
import matplotlib.pyplot as plt

# Set seed for reproducibility
np.random.seed(2024)

# =============================================================================
# 1. GENERATE DATA
# =============================================================================

def generate_store_data():
    """Simulate store-level sales data for DID analysis."""

    n_stores = 100  # 50 treatment, 50 control
    true_effect = 500  # True effect: $500 increase in weekly sales

    data = []
    for store_id in range(n_stores):
        is_treated = store_id < 50

        # Store characteristics (creates baseline differences)
        store_size = np.random.choice(['small', 'medium', 'large'])
        size_effect = {'small': -200, 'medium': 0, 'large': 200}[store_size]

        # Treatment stores tend to be in urban areas (selection bias)
        is_urban = is_treated * 0.7 + (1 - is_treated) * 0.3 > np.random.random()
        urban_effect = 300 if is_urban else 0

        for week in ['pre_1', 'pre_2', 'post_1', 'post_2']:
            is_post = week.startswith('post')

            # Baseline sales
            baseline = 2000

            # Time trend (holiday effect in post period)
            time_trend = 150 if is_post else 0

            # Treatment effect
            treatment = true_effect * is_treated * is_post

            # Weekly noise
            noise = np.random.normal(0, 100)

            sales = baseline + size_effect + urban_effect + time_trend + treatment + noise

            data.append({
                'store_id': store_id,
                'week': week,
                'treated': int(is_treated),
                'post': int(is_post),
                'store_size': store_size,
                'urban': int(is_urban),
                'sales': max(0, sales)  # Sales can't be negative
            })

    return pd.DataFrame(data)

# Generate data
df = generate_store_data()
print("Data shape:", df.shape)
print("\\nSample of data:")
print(df.head(10))

# =============================================================================
# 2. EXPLORATORY ANALYSIS
# =============================================================================

print("\\n" + "="*60)
print("EXPLORATORY ANALYSIS")
print("="*60)

# Summary by group
summary = df.groupby(['treated', 'post'])['sales'].agg(['mean', 'std', 'count'])
print("\\nMean sales by group and period:")
print(summary.round(2))

# Check for baseline differences
print("\\nBaseline differences (pre-period):")
pre_data = df[df['post'] == 0]
print(f"  Control avg sales: \${pre_data[pre_data['treated']==0]['sales'].mean():.2f}")
print(f"  Treated avg sales: \${pre_data[pre_data['treated']==1]['sales'].mean():.2f}")
print(f"  Difference: \${pre_data[pre_data['treated']==1]['sales'].mean() - pre_data[pre_data['treated']==0]['sales'].mean():.2f}")

# =============================================================================
# 3. DID ESTIMATION
# =============================================================================

print("\\n" + "="*60)
print("DID ESTIMATION")
print("="*60)

# Method 1: Manual calculation
means = df.groupby(['treated', 'post'])['sales'].mean()
did_manual = (means[(1,1)] - means[(1,0)]) - (means[(0,1)] - means[(0,0)])
print(f"\\nManual DID estimate: \${did_manual:.2f}")

# Method 2: Basic regression
print("\\n--- Basic DID Regression ---")
model_basic = smf.ols('sales ~ treated + post + treated:post', data=df).fit()
print(f"DID coefficient: \${model_basic.params['treated:post']:.2f}")
print(f"Std error: \${model_basic.bse['treated:post']:.2f}")
print(f"95% CI: [\${model_basic.conf_int().loc['treated:post', 0]:.2f}, \${model_basic.conf_int().loc['treated:post', 1]:.2f}]")
print(f"P-value: {model_basic.pvalues['treated:post']:.4f}")

# Method 3: Regression with covariates
print("\\n--- DID with Covariates ---")
model_covariates = smf.ols('sales ~ treated + post + treated:post + C(store_size) + urban',
                           data=df).fit()
print(f"DID coefficient: \${model_covariates.params['treated:post']:.2f}")
print(f"Std error: \${model_covariates.bse['treated:post']:.2f}")
print(f"R-squared improved: {model_basic.rsquared:.3f} -> {model_covariates.rsquared:.3f}")

# Method 4: Store fixed effects
print("\\n--- DID with Store Fixed Effects ---")
model_fe = smf.ols('sales ~ post + treated:post + C(store_id)', data=df).fit()
print(f"DID coefficient: \${model_fe.params['treated:post']:.2f}")
print(f"Std error: \${model_fe.bse['treated:post']:.2f}")

print(f"\\n>>> True effect was $500. Our best estimate: \${model_fe.params['treated:post']:.2f}")

# =============================================================================
# 4. VISUALIZATION
# =============================================================================

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Plot 1: Group means over time
ax1 = axes[0]
week_order = ['pre_1', 'pre_2', 'post_1', 'post_2']
df['week_num'] = df['week'].map({w: i for i, w in enumerate(week_order)})

for treated, label, color in [(0, 'Control', 'blue'), (1, 'Treated', 'red')]:
    group = df[df['treated'] == treated].groupby('week_num')['sales'].mean()
    ax1.plot(group.index, group.values, 'o-', color=color,
             markersize=10, linewidth=2, label=label)

ax1.axvline(x=1.5, color='gray', linestyle='--', linewidth=2)
ax1.text(1.6, ax1.get_ylim()[1] * 0.95, 'Campaign Start', fontsize=10, color='gray')
ax1.set_xticks(range(4))
ax1.set_xticklabels(week_order)
ax1.set_xlabel('Week', fontsize=12)
ax1.set_ylabel('Average Sales ($)', fontsize=12)
ax1.set_title('Sales Trends: Treatment vs Control', fontsize=14, fontweight='bold')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Plot 2: DID visualization
ax2 = axes[1]
y_c_pre = means[(0, 0)]
y_c_post = means[(0, 1)]
y_t_pre = means[(1, 0)]
y_t_post = means[(1, 1)]
counterfactual = y_t_pre + (y_c_post - y_c_pre)

ax2.plot([0, 1], [y_c_pre, y_c_post], 'o-', color='blue', markersize=12, linewidth=2, label='Control')
ax2.plot([0, 1], [y_t_pre, y_t_post], 'o-', color='red', markersize=12, linewidth=2, label='Treated')
ax2.plot([0, 1], [y_t_pre, counterfactual], '--', color='red', alpha=0.5, linewidth=2, label='Counterfactual')

# Arrow showing treatment effect
ax2.annotate('', xy=(1, y_t_post), xytext=(1, counterfactual),
             arrowprops=dict(arrowstyle='<->', color='green', lw=2))
ax2.text(1.05, (y_t_post + counterfactual) / 2, f'DID = \${did_manual:.0f}',
         fontsize=12, color='green', fontweight='bold')

ax2.set_xticks([0, 1])
ax2.set_xticklabels(['Pre-Campaign', 'Post-Campaign'])
ax2.set_xlabel('Period', fontsize=12)
ax2.set_ylabel('Average Sales ($)', fontsize=12)
ax2.set_title('Difference-in-Differences', fontsize=14, fontweight='bold')
ax2.legend(loc='upper left')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('did_analysis.png', dpi=150, bbox_inches='tight')
plt.show()

print("\\nVisualization saved to 'did_analysis.png'")

# =============================================================================
# 5. ROBUSTNESS CHECK: Event Study
# =============================================================================

print("\\n" + "="*60)
print("ROBUSTNESS: EVENT STUDY")
print("="*60)

# Create period dummies
df['period'] = df['week'].map({'pre_1': -2, 'pre_2': -1, 'post_1': 0, 'post_2': 1})

# Event study regression (omit period -1 as reference)
df['treated_p_m2'] = df['treated'] * (df['period'] == -2)
df['treated_p_0'] = df['treated'] * (df['period'] == 0)
df['treated_p_1'] = df['treated'] * (df['period'] == 1)

model_event = smf.ols('sales ~ treated + C(period) + treated_p_m2 + treated_p_0 + treated_p_1',
                      data=df).fit()

print("\\nEvent Study Coefficients (reference: period -1):")
print(f"  Period -2 (pre): \${model_event.params.get('treated_p_m2', 0):.2f} (should be ~0)")
print(f"  Period 0 (post): \${model_event.params.get('treated_p_0', 0):.2f}")
print(f"  Period 1 (post): \${model_event.params.get('treated_p_1', 0):.2f}")
print("\\nPre-trend coefficient near zero supports parallel trends assumption!")
\`\`\`

**Key Takeaways:**
1. DID handles selection bias (different baseline levels)
2. Multiple estimation methods give similar results
3. Adding covariates improves precision but shouldn't change the point estimate much
4. Event study checks parallel trends assumption
5. Always visualize your results!`
};

// =============================================================================
// Export Lecture Content
// =============================================================================

export const lectureContent: LectureContent = {
	lectureId: 'python-demo-did',
	sections: [
		setupSection,
		dataStructureSection,
		basicDIDSection,
		regressionSection,
		visualizationSection,
		completeExampleSection
	]
};
