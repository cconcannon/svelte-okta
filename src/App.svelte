<script>
	import Login from "./components/Login.svelte";
	import Registration from "./components/Registration.svelte";
	import { user, registrationInProgress } from "./stores";
	import authClient from "./oktaAuth";
import { onDestroy } from "svelte";

	authClient.start();

	onDestroy(() => {
		authClient.stop();
	})

	function beginRegistration() {
		$registrationInProgress = true;
		authClient.idx.register();
	}

	function logout() {
		authClient.signOut();
	}
</script>

<main>
	<h1>Okta & Svelte</h1>

	{#if $user.loggedIn}
		<h2>Welcome, {$user.name}!</h2>
		<button on:click|preventDefault={logout}>Log Out</button>
	{:else}
		{#if $registrationInProgress}
			<Registration/>
		{:else}
			<Login/>

			<div>
				<a href="/" on:click|preventDefault={beginRegistration}>Register with Okta</a>
			</div>
		{/if}
	{/if}
</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
