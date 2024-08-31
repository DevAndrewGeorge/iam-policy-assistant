const parse = require('node-html-parser').parse
const path = require('path');
const fs = require('fs');

const root_domain = "https://docs.aws.amazon.com/service-authorization/latest/reference/";

function getServiceAcctions(url) {
    return fetch(url).then(
        async response => {
            const root = parse(await response.text())
            const service_name = url.split('/').pop().split('.')[0].split("_")[1];
            const service_prefix = root.querySelectorAll("p > code")[0];

            let actions_table, resources_table, condition_keys_table;
            console.log(url)
            root.querySelectorAll("th:first-child").forEach(e => {
                // console.log(e.closest("table"))
                if (e.text === "Actions") actions_table = e.closest("table").querySelector("td:first-child").parentNode.parentNode;
                if (e.text === "Resource types") resources_table = e.closest("table").querySelector("td:first-child").parentNode.parentNode;
                if (e.text === "Condition keys") condition_keys_table = e.closest("table").querySelector("td:first-child").parentNode.parentNode;
            })

            const actions = actions_table.querySelectorAll(`tr > td:first-child > a`).map(e => e.text).filter(action => action[0] === action[0].toUpperCase());

            if (actions.length === 0 && service_prefix === undefined) {
                console.log(`No actions found for ${url}`);
                return {};
            }
            return { [service_prefix.text]: actions }
        }
    );
}

const actions_map = {};

fetch(
    path.join(root_domain, "reference_policies_actions-resources-contextkeys.html")
).then(
    async response => {
        const promises = parse(await response.text()).querySelectorAll('a[href^="./list_"]').map(
            e => getServiceAcctions(
                path.join(root_domain, e.getAttribute('href'))
            )
        );

        const actions = await Promise.all(promises);
        for (const action of actions) {
            Object.assign(actions_map, action);
        }

        fs.writeFileSync(
            'actions.js',
            `export default JSON.parse(\`${JSON.stringify(actions_map, null, 2)}\`);`
        );
    }
)