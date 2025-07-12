<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { superForm } from 'sveltekit-superforms';
  import { page } from '$app/stores';

  const { data } = $props();
  const form = superForm(data.form);
  const { form: formData, enhance, submitting } = form;
  
  // Check if email was sent successfully
  const emailSent = $derived($page.url.searchParams.get('sent') === 'true');
</script>

<div class="max-w-md mx-auto mt-10 bg-white p-10 rounded-lg shadow space-y-6 border border-gray-200">
  <div class="text-center">
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
    {#if emailSent}
      <p class="text-green-600 text-sm mb-4">
        If an account with that email exists, we've sent you a password reset link.
      </p>
      <a href="/auth/sign-in" class="text-blue-600 hover:text-blue-500 text-sm">
        Back to Sign In
      </a>
    {:else}
      <p class="text-gray-600 text-sm mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
    {/if}
  </div>

  {#if !emailSent}
    <form use:enhance method="POST" class="space-y-6">
      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="block mb-1 text-sm font-medium text-gray-700">Email</Form.Label>
            <Input
              {...props}
              type="email"
              bind:value={$formData.email}
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
          {/snippet}
        </Form.Control>
        <Form.FieldErrors class="text-red-500 text-xs mt-1" />
      </Form.Field>

      <Button
        type="submit"
        disabled={$submitting}
        class="w-full py-2 px-4 text-white font-semibold rounded"
      >
        {#if $submitting} Sending... {:else} Send Reset Link {/if}
      </Button>
    </form>

    <div class="text-center">
      <a href="/auth/sign-in" class="text-blue-600 hover:text-blue-500 text-sm">
        Back to Sign In
      </a>
    </div>
  {/if}
</div>