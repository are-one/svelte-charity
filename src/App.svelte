<script>
	import router from "page";
	import Home from "./pages/Home.svelte";
	import About from "./pages/About.svelte";
	import Contact from "./pages/Contact.svelte";
	import Donation from "./pages/Donation.svelte";
  	import NotFound from "./pages/NotFound.svelte";
	
	let page, params;
	
	router('/', () => (page = Home));
	router('/about', () => (page = About));
	router('/contact', () => (page = Contact));
	router('/donation/:id',
	(ctx, next) => {
		params = ctx.params;
		next();
	},
	() => (page = Donation));

<<<<<<< HEAD
	router('/*', () => (page = NotFound));
=======
	router('*', () => (page = NotFound));
>>>>>>> f2eb8288f9173465d437c90a5555e3370edc4282
	
	router.start();

</script>

<svelte:component this={page} params={params} />