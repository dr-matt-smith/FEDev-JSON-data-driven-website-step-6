<script>
    let { data } = $props();
    let modules = data.modules;
</script>

<h1>Welcome to Modulesite</h1>

<p>Learn more about year 2 modules</p>
<ul>
    {#each modules as module}
        <li>
            <a href="/modules/{module.id}">{module.title}</a>
        </li>
    {:else}
        <li>
            ERROR - no modules found to list here !
        </li>
    {/each}
</ul>