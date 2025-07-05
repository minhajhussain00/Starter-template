<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { superForm } from 'sveltekit-superforms';

  const { data } = $props();
  const form = superForm(data.form);
  const { form: formData, enhance, submitting } = form;
</script>

<form
  use:enhance
  method="POST"
  class="max-w-md mx-auto mt-10 bg-white p-10 rounded-lg shadow space-y-6 border border-gray-200"
>
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="block mb-1 text-sm font-medium text-gray-700">Email</Form.Label>
        <Input
          {...props}
          bind:value={$formData.email}
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors class="text-red-500 text-xs mt-1" />
  </Form.Field>

  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="block mb-1 text-sm font-medium text-gray-700">Password</Form.Label>
        <Input
          {...props}
          type="password"
          bind:value={$formData.password}
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors class="text-red-500 text-xs mt-1" />
  </Form.Field>

  <a href="/auth/sign-up" class="text-blue-700">create account</a>
  <Button
    type="submit"
    disabled={$submitting}
    class="w-full py-2 px-4 text-white font-semibold rounded mt-3"
  >
    {#if $submitting} Signing in... {:else} Sign In {/if}
  </Button>
</form>