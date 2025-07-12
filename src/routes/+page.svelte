<script lang="ts">
  import { authClient } from '$lib/authConfig';
  import { redirect } from '@sveltejs/kit';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import { Separator } from '$lib/components/ui/separator';
  const {data} = $props()
  console.log(data.user)
  const user = data.user
  const session = authClient.useSession();
</script>

  <div class="flex items-center justify-center min-h-screen bg-muted">
    <Card class="w-full max-w-md shadow-xl border border-border rounded-2xl">
      <CardHeader class="flex flex-col items-center text-center space-y-2">
        <Avatar class="h-16 w-16">
          <AvatarImage src={user.image ?? ''} alt="User avatar" />
          <AvatarFallback>
            {user.name?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>

      <CardContent class="space-y-4">
        <p class="text-sm text-muted-foreground text-center">
          {user.email}
        </p>

        <Separator />

       <form method="POST" class="flex items-center justify-center">
       <Button type="submit" variant="destructive" class="px-8 py-4">Signout</Button>
       </form>
       
      </CardContent>
    </Card>
  </div>

