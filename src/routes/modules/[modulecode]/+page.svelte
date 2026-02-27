<script>
    let { data } = $props();
    let moduleCode = data.moduleCode;
    let module = data.module;

    // if we didn't find a module, then populate with error details
    if (!module) {
        module = {
            id: moduleCode,
            title: "ERROR",
            details: "unknown module code"
        };
    }
</script>

<h1>
    Details of module with code = {module.id}
</h1>

<h3>{module.title}</h3>
<p>
    {module.details}
</p>