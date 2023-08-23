<script>
	import Header from "../components/Header.svelte";
	import Welcome from "../components/Welcome.svelte";
	import CharityList from "../components/CharityList.svelte";
	import Promo from "../components/Promo.svelte";
	import Footer from "../components/Footer.svelte";
	import MainScript from "../components/MainScript.svelte";
  	import { charities } from "../stores/charity";
</script>

<Header />
<Welcome />
<CharityList/>
<Promo />
<Footer />

{#if $charities.length > 0}
	<MainScript />
{/if}

