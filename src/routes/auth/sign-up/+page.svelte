<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import SuperDebug, { superForm } from 'sveltekit-superforms';


 const {data} = $props()
  const form = superForm(data.form);

    const { form: formData, enhance, submitting } = form;
</script>

<SuperDebug data={form.form}/>

<form use:enhance method="POST" class="space-y-4">
  <Form.Field {form} name="firstName">
    <Form.Control>
     {#snippet children({ props })}
        <Form.Label>first name</Form.Label>
        <Input {...props} bind:value={$formData.firstName} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="lastName">
    <Form.Control >
      {#snippet children({ props })}
        <Form.Label>last name</Form.Label>
        <Input {...props} bind:value={$formData.lastName} />
      {/snippet}

    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="email">
    <Form.Control >
      {#snippet children({ props })}
        <Form.Label>email</Form.Label>
        <Input {...props} bind:value={$formData.email} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="password">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Username</Form.Label>
        <Input type="password" {...props} bind:value={$formData.password} />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  {#if form.message}
    <p class="text-sm text-red-600">{form.message}</p>
  {/if}

  <Button type="submit" disabled={$submitting}>
    {#if $submitting} Signing up... {:else} Sign Up {/if}
  </Button>
</form>
