<script lang="ts">
  import { onMount } from 'svelte';
  import emailjs from '@emailjs/browser';

  let {
    isOpen = $bindable(false),
    onClose
  }: {
    isOpen: boolean;
    onClose: () => void;
  } = $props();

  // EmailJS configuration (same as iMBA-Microeconomics)
  const EMAILJS_SERVICE_ID = 'service_2fccy0j';
  const EMAILJS_TEMPLATE_ID = 'template_zklxu74';
  const EMAILJS_PUBLIC_KEY = 'NQFIxCX6cEQTkgGxl';

  let email = $state('');
  let message = $state('');
  let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
  let errorMessage = $state('');

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email.trim()) {
      errorMessage = 'Please enter your email address';
      status = 'error';
      return;
    }

    if (!validateEmail(email)) {
      errorMessage = 'Please enter a valid email address';
      status = 'error';
      return;
    }

    if (!message.trim()) {
      errorMessage = 'Please enter a message';
      status = 'error';
      return;
    }

    status = 'sending';
    errorMessage = '';

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_email: email,
          message: message,
          to_email: 'boris@mobilemindai.com',
          reply_to: email,
        },
        EMAILJS_PUBLIC_KEY
      );

      status = 'success';
      email = '';
      message = '';

      setTimeout(() => {
        handleClose();
        status = 'idle';
      }, 2000);
    } catch (error) {
      console.error('EmailJS error:', error);
      status = 'error';
      errorMessage = 'Failed to send message. Please try again or email directly to boris@mobilemindai.com';
    }
  }

  function handleClose() {
    if (status !== 'sending') {
      onClose();
      setTimeout(() => {
        email = '';
        message = '';
        status = 'idle';
        errorMessage = '';
      }, 300);
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && status !== 'sending') {
      handleClose();
    }
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if isOpen}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 bg-black/50 z-50 transition-opacity"
    onclick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
  >
    <!-- Modal -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all"
        onclick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-white/20 rounded-lg">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white">Contact Author</h2>
                <p class="text-white/80 text-sm">Send a message or feedback</p>
              </div>
            </div>
            <button
              onclick={handleClose}
              disabled={status === 'sending'}
              class="p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
            >
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          {#if status === 'success'}
            <div class="text-center py-8">
              <div class="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
              <p class="text-slate-600 dark:text-slate-300">Thank you for your feedback.</p>
            </div>
          {:else}
            <form onsubmit={handleSubmit} class="space-y-4">
              <!-- Email Input -->
              <div>
                <label for="contact-email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Your Email
                </label>
                <div class="relative">
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    id="contact-email"
                    bind:value={email}
                    oninput={() => { if (status === 'error') status = 'idle'; }}
                    placeholder="your.email@example.com"
                    disabled={status === 'sending'}
                    class="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed transition-colors"
                  />
                </div>
              </div>

              <!-- Message Input -->
              <div>
                <label for="contact-message" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <div class="relative">
                  <svg class="absolute left-3 top-3 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <textarea
                    id="contact-message"
                    bind:value={message}
                    oninput={() => { if (status === 'error') status = 'idle'; }}
                    placeholder="Your message, feedback, or questions..."
                    rows="4"
                    disabled={status === 'sending'}
                    class="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              <!-- Error Message -->
              {#if status === 'error' && errorMessage}
                <div class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                  <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-sm text-red-700 dark:text-red-400">{errorMessage}</p>
                </div>
              {/if}

              <!-- Submit Button -->
              <button
                type="submit"
                disabled={status === 'sending'}
                class="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {#if status === 'sending'}
                  <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                {:else}
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                {/if}
              </button>

              <!-- Alternative Contact -->
              <p class="text-center text-xs text-slate-500 dark:text-slate-400">
                Or email directly:{' '}
                <a
                  href="mailto:boris@mobilemindai.com"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline"
                >
                  boris@mobilemindai.com
                </a>
              </p>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
