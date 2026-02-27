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