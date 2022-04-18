<script>
	import { setContext } from "svelte";
	import Login from "./components/Login.svelte";
	import Registration from "./components/Registration.svelte";
	import { authClient } from "./oktaAuth";

	setContext("AUTH_CONTEXT", {
		getAuthClient: () => authClient,
	});
</script>

<main>
	<h1>Okta & Svelte</h1>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
		how to build Svelte apps.
	</p>
	<!-- <Login/> -->
	<Registration/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
