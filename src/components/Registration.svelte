<script>
    import { getContext } from "svelte";

    const authContext = getContext("AUTH_CONTEXT");
    const authClient = authContext.getAuthClient();

    let verificationCode = "";

    function register() {
        const user = randomUser();
        console.log(user);

        authClient.idx
            .register({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.email,
                authenticators: ["okta_password", "okta_email"],
            })
            .then((result) => {
                console.log(result);
                submitPassword();
            });

        // need nextStep.authenticator.id
        // const {
        //     status2,
        //     nextStep2
        // } = await authClient.idx.proceed({
        //     // authenticator: nextStep1.authenticator.name,
        //     // id: nextStep1.authenticator.id
        // });
        // console.log(status2);
        // console.log(nextStep2);
        // // submit password
        // const {
        //     status3, // IdxStatus.SUCCESS
        //     tokens,
        // } = await authClient.idx.proceed({ password: "C0nc@nn0n" });

        // console.log(status3);
        // console.log(tokens);
    }

    async function submitPassword() {
        authClient.idx
            .proceed({
                password: "C0nc@nn0n",
            })
            .then((result) => {
                console.log(result);
            });
    }

    function activateAccount() {
        authClient.idx.register({
            activationToken: "xxxxx",
            authenticator: "okta_password",
            password: "xxx",
        });
    }

    function verifyEmail() {
        authClient.idx
            .proceed({
                authenticator: "okta_email",
            })
            .then((result) => console.log(result));
    }

    function submitVerificationCode() {
        authClient.idx
            .proceed({
                authenticatorCode: verificationCode,
            })
            .then((result) => console.log(result));
    }

    function canProceed() {
        const answer = authClient.idx.canProceed();
        alert(answer);
    }

    function skip() {
        authClient.idx.proceed().then((result) => console.log(result));
    }

    function cancel() {
        authClient.idx.cancel().then((result) => console.log(result));
    }

    function useEmailAsFactor() {
        authClient.idx.proceed({
            authenticator: "email",
        });
    }

    function randomUser() {
        let randomN = Math.floor(Math.random() * 10000);
        let emailAddress = "User." + randomN + "@concokta.com";
        const user = {
            firstName: "User",
            lastName: randomN,
            email: emailAddress,
        };
        return user;
    }
</script>

<h2>Registration Component</h2>

<div>
    <button on:click={register}>Register with Okta</button>
</div>
<div>
    <button on:click={verifyEmail}>Verify Email</button>
</div>

<form id="email-verification-form">
    <label for="verification-code-input">Verification Code:</label>
    <input
        type="text"
        id="verification-code-input"
        class="form-input"
        bind:value={verificationCode}
    />
    <button
        type="submit"
        class="form-input"
        on:click|preventDefault={submitVerificationCode}>Submit</button
    >
</form>
<div>
    <button on:click={useEmailAsFactor}>Use Email as Factor</button>
</div>
<div>
    <button on:click={canProceed}>Can Proceed?</button>
</div>
<div>
    <button on:click={skip}>Skip</button>
</div>
<div>
    <button on:click={cancel}>Cancel</button>
</div>

<style>
    #email-verification-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
