<script>
    import { onMount } from "svelte";
    import { IdxStatus, AuthenticatorKey } from "@okta/okta-auth-js";
    import { registrationInProgress } from "../stores";
    import authClient from "../oktaAuth";

    let nextStepInputs = [];
    let nextStepValues = {};

    onMount(() => {
        beginRegistration();
    });

    function beginRegistration() {
        authClient.idx.register().then((result) => {
            handleIdxResponse(result);
        });
    }

    async function handleIdxResponse(idxResponse) {
        switch (idxResponse.status) {
            case IdxStatus.PENDING:
                await handleNextStep(idxResponse.nextStep);
                break;
            case IdxStatus.SUCCESS:
                authClient.tokenManager.setTokens(idxResponse.tokens);
                $registrationInProgress = false;
                break;
            default:
                console.error(`IDX Transaction Status: ${idxResponse.status}`);
        }
    }

    async function handleNextStep(nextStep) {
        switch (nextStep.name) {
            case "enroll-profile":
                handleEnroll(nextStep);
                break;
            case "select-authenticator-enroll":
                await handleSelect(nextStep);
                break;
            case "enroll-authenticator":
                handleEnroll(nextStep);
                break;
            default:
                console.error(`nextStep unknown: ${JSON.stringify(nextStep)}`);
                authClient.idx.cancel();
        }
    }

    function handleEnroll(nextStep) {
        nextStepValues = {};
        nextStepInputs = nextStep.inputs;
        nextStepInputs.forEach((input) => {
            if (input.type === "string") {
                nextStepValues[input.name] = "";
            }
        });
    }

    async function handleSelect(nextStep) {
        if (nextStep.options.length > 0) {
            switch (nextStep.options[0].label) {
                case "Password":
                    await proceed({
                        authenticator: AuthenticatorKey.OKTA_PASSWORD,
                    });
                    break;
                case "Security Question":
                    console.error(`no handler for this nextStep! ${nextStep}`);
                default:
                    cancel();
            }
        }
    }

    async function handleSubmit() {
        const transactionResult = await authClient.idx.proceed(nextStepValues);
        await handleIdxResponse(transactionResult);
    }

    async function proceed(options) {
        await authClient.idx
            .proceed(options)
            .then((result) => handleIdxResponse(result));
    }

    async function cancel() {
        $registrationInProgress = false;
        await authClient.idx.cancel();
    }
</script>

<h2>Register</h2>

{#if nextStepInputs.length > 0}
    <form>
        {#each nextStepInputs as i}
            <label for="{i.name}-input">{i.label}</label>
            {#if i.secret}
                <input
                    type="password"
                    id="{i.name}-input"
                    bind:value={nextStepValues[i.name]}
                />
            {:else}
                <input
                    type="text"
                    id="{i.name}-input"
                    bind:value={nextStepValues[i.name]}
                />
            {/if}
        {/each}
        <button type="submit" on:click|preventDefault={handleSubmit}
            >Submit</button
        >
    </form>
{:else}
    <div id="loader-container">
        <div class="loader" />
    </div>
{/if}

<button on:click={cancel}>Cancel</button>

<style>
    form,
    #loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .loader {
        border: 16px solid #f3f3f3; /* Light grey */
        border-top: 16px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
