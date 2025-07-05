<script >
    import { authClient } from "$lib/authConfig";
    const session = authClient.useSession();
</script>
<div>
  {#if $session.data}
    <div>
      <p>
        {$session?.data?.user.name}<br>
        {$session?.data?.user.email}
      </p>
      <button
        on:click={async () => {
          await authClient.signOut();
          throw redirect(303, '/auth/sign-in');
        }}
      >
        Sign Out
      </button>
    </div>
  {/if}
</div>