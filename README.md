Back to FEDev main <<<< https://github.com/dr-matt-smith/2026-FDEev-Front-End-Dev-start-here

JSON-driven website:
[Step 1](https://github.com/dr-matt-smith/FEDev-JSON-data-driven-website-step-1)
|
[Step 2](https://github.com/dr-matt-smith/FEDev-JSON-data-driven-website-step-2)
|
[Step 3](https://github.com/dr-matt-smith/FEDev-JSON-data-driven-website-step-3)
|
[Step 4](https://github.com/dr-matt-smith/FEDev-JSON-data-driven-website-step-4)
|
[Step 5](https://github.com/dr-matt-smith/FEDev-JSON-data-driven-website-step-5)
|
Step 6
|
[Step 7](https://github.com/dr-matt-smith/FEDev-JSON-data-driven-website-step-7)


# FEDev-JSON-data-driven-website-step-6

![module list from JSON](/screenshots/6_all_modules_from_JSON.png)

Step-by-step development of a module details website. Routing in the form `/module/2037`


## 1: JavaScript server `load()` function in SERVER JavaScript for a route pate

The SvelteKit documentations pages (https://svelte.dev/tutorial/kit/page-data) say that there are 3 core responsibilities:

1. Routing
    - figuring out which route matches the received HTTP Request
1. Loading
    - loading the appropriate data for the requested route
1. Rendering
    - generating HTML/CSS (and/or perhaps updating the DOM)

We've been doing the data loading in the `<script>` part of our Svelte pages. However, SveltKit best practice says that we should be creating JavaScript `+page.server.js` files, to load the appropraite data for each route.

We have 2 routes needed data:
- `/modules`
- `/modules/[moduleCode]`

So we should have 2 `+page.server.js` files:
- `/modules/+page.server.js`
- `/modules/[moduleCode]/+page.server.js`

So, first, let's load our list of modules for the module list page using a new script `/modules/+page.server.js`
- NOTE: there are no `<script>` tags, since this is a pure JavaScript file

```javascript
import modules from '$lib/data/modules.json';

export function load() {
    return {
        modules
    };
}
```

This script loads the JSON data from `$lib/data/modules.json`, and then declares a `load()` function to pass on that array of module objects to our Svelte page.

We can now refactor our module list Svelte page (`/modules/+page.svelt`) as follows:


```html
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
```

As we can see, we read in the data from the JavaScript `load()` function by writing `let { data } = $props();`. We can then access the data items loaded from the `data` object. So our array of modules is `data.modules`,

Otherwise, this module list page is much the same.

## 2: Module details JavaScript page only needs to pass on details for a single module

However, when it comes to the individual module details page, we can move more responsibility to our JavaScript server page. Create a new file `/modules/[moduleCode]/+page.server.js` as follows:

```javascript
import modules from '$lib/data/modules.json';

export function load({ params }) {
   let moduleCode = parseInt(params.modulecode);

   const module = modules.find(module =>
           module.id === moduleCode
   );

   // return moduleCode (if case no matching details found), and a module object
   return {
      moduleCode,
      module
   };
}
```

Above we get the JSON modules array from `$lib/data/modules.json`, then extract the module code from the Request URL, then search to find a module object whose `id` matchjes the module code from the URL. Finally, this `load()` function returns 2 pieces of data, the moduleCode, and a module object.

Since we've done the searching in our JavaScript server script, the code for our module details Svelte page (`/modules/[moduleCode]/+page.svelte`) is a bit simpler:

```html
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
```