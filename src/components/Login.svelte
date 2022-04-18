<script>
	import { getContext } from "svelte";

	const authContext = getContext("AUTH_CONTEXT");
	const authClient = authContext.getAuthClient();

	let credentials = {
		username: "",
		password: "",
	};

	async function login() {
		try {
			console.log(
				`Logging in with username: ${credentials.username} and password: ${credentials.password}`
			);
			authClient.idx
				.authenticate({
					username: credentials.username,
					password: credentials.password,
				})
				.then(
					(res) => {
						console.log(res);
					},
					(rej) => {
						console.log(rej);
					}
				);
		} catch (e) {
			console.log(e);
		}
	}
</script>

<h2>Login Component</h2>

<form id="login-form">
	<label for="username-input">Username (email)</label>
	<input
		type="text"
		id="username-input"
		class="form-input"
		bind:value={credentials.username}
	/>
	<label for="password-input" class="form-input">Password</label>
	<input
		type="password"
		id="password-input"
		bind:value={credentials.password}
	/>
	<button type="submit" class="form-input" on:click|preventDefault={login}
		>Submit</button
	>
</form>

<hr />

<style>
	#login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
