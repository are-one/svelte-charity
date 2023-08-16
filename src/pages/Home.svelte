<script>
	import CharityList from "../components/CharityList.svelte";
	import { charities } from "../data/charities";

	export let name;
</script>
<h1>{name}</h1>
<CharityList {charities} />

