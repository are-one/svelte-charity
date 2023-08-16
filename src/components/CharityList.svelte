<script>
    export let charities;
</script>

<div>
    <h1>Daftar Charity</h1>
    {#each charities as charity}
    <ul>
        <li>{charity.title}</li>
    </ul>
    {/each}
</div>

