<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { formSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Password from '$lib/components/password.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let form = $derived(
		superForm(data.form, {
			validators: zodClient(formSchema),
			dataType: 'json'
		})
	);
	let formData = $derived(form.form);
	let errors = $derived(form.errors);
	let message = $derived(form.message);
	let submitting = $derived(form.submitting);
	let enhance = $derived(form.enhance);
</script>

<Card.Root class="mx-auto mt-[50vh] max-w-sm -translate-y-1/2">
	<Card.Header class="text-center">
		<Card.Title class="text-2xl">Sign up</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		{#if $message}
			<div class="mt-3 rounded-md text-center text-green-700">
				{$message}
			</div>
		{/if}

		<form method="POST"  use:enhance class="flex flex-col gap-2">
			<Form.Field {form} name="firstName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>first name</Form.Label>
						<Input {...props} bind:value={$formData.firstName} placeholder="Enter your name" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

	<Form.Field {form} name="lastName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>last name</Form.Label>
						<Input {...props} bind:value={$formData.lastName} placeholder="Enter your name" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} placeholder="Enter your email" />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Password bind:value={$formData.password} {props} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="passwordConfirm">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm Password</Form.Label>
						<Password bind:value={$formData.passwordConfirm} {props} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			
			<a href="/auth/sign-in" class="text-blue-500">Sign in Instead</a>
			

			<Form.Button disabled={$submitting} class="w-full">
				{$submitting ? 'Submitting...' : 'Submit'}
			</Form.Button>
			{#if $errors?._errors}
				<div class="mt-3 rounded-md text-red-700">
					{$errors?._errors}
				</div>
			{/if}
		</form>
	</Card.Content>
</Card.Root>
