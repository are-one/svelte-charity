<script>
	import CharityList from "../components/CharityList.svelte";
	import Header from "../components/Header.svelte";
	import Welcome from "../components/Welcome.svelte";
	import Promo from "../components/Promo.svelte";
	import Footer from "../components/Footer.svelte";
	import MainScript from "../components/MainScript.svelte";
	import { onMount } from "svelte";
	
	let title = 'Charity';
	let charities = [];

	onMount(async function() {
		const res = await fetch('https://bwacharity.fly.dev/charities');
		charities = await res.json();
	});

</script>

<Header />
<Welcome />
<CharityList {charities} />
<Promo />
<Footer />

{#if charities.length > 0}
	<MainScript />
{/if}

