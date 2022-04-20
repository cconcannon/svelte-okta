<script>
	import { IdxStatus } from "@okta/okta-auth-js";
	import authClient from "../oktaAuth";

	let credentials = {
		username: "",
		password: "",
	};

	async function login() {
		const transaction = await authClient.idx.authenticate({
			username: credentials.username,
			password: credentials.password,
		});

		switch (transaction.status) {
			case IdxStatus.SUCCESS:
				authClient.tokenManager.setTokens(transaction.tokens);
				break;
			default:
				console.log(transaction);
		}
	}
</script>

<h2>Log In</h2>

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
<style>
	#login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
