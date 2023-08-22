<script>
	import Loader from "../components/Loader.svelte";
	import Header from "../components/Header.svelte";
	import Welcome from "../components/Welcome.svelte";
	import CharityList from "../components/CharityList.svelte";
	import Promo from "../components/Promo.svelte";
	import Footer from "../components/Footer.svelte";
	import MainScript from "../components/MainScript.svelte";
	
	let title = 'Charity';
	let data = getData();

	async function getData() {
		const res = await fetch('https://bwacharity.fly.dev/charities');
		const data = await res.json();

		if(res.ok){
			return data;
		} else {
			throw new Error(data);
		}
	}
	
</script>

<Header />
<Welcome />

{#await data}
	<Loader />
{:then charities} 
	<CharityList {charities} />
	<MainScript />
{/await}
<Promo />
<Footer />
