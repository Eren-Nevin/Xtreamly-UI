<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	let loggingIn = false;

	async function login(email: string, password: string) {
		const res = await fetch('http://test.xtreamly.io:5001/api/v1/authentication/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		if (res.status == 200) {
			goto('../control');
		}
	}

	async function signup(email: string, password: string) {
		const res = await fetch('http://test.xtreamly.io:5002/api/v1/authentication/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		if (res.status == 200) {
			goto('../control');
		}
	}
</script>

<div
	class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
>
	<h2 class="text-gray-900 text-lg font-medium title-font mb-5">
		{loggingIn ? 'Login' : 'Signup'}
	</h2>
	<div class="relative mb-4">
		<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
		<input
			type="email"
			id="email"
			name="email"
			class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
			bind:value={email}
		/>
	</div>
	<div class="relative mb-4">
		<label for="password" class="leading-7 text-sm text-gray-600">Password</label>
		<input
			type="password"
			id="password"
			name="password"
			class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
			bind:value={password}
		/>
	</div>
	<button
		class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
		on:click={() => {
			if (loggingIn) {
				login(email, password);
			} else {
				signup(email, password);
			}
		}}
	>
		{loggingIn ? 'Login' : 'Signup'}</button
	>
	<p class="text-xs text-gray-500 mt-3">
		By signing to Xtreamly, you're accepting our terms of use.
	</p>
	<span
		class="text-blue-600 font-light text-xs"
		on:click={() => {
			loggingIn = !loggingIn;
		}}
	>
		{loggingIn ? 'Signup instead' : 'Login instead'}
	</span>
</div>
