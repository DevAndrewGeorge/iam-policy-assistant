const parse = require('node-html-parser').parse
const path = require('path');
const fs = require('fs');

const root_domain = "https://docs.aws.amazon.com/service-authorization/latest/reference/";

function getServiceAcctions(url) {
    return fetch(url).then(
        async response => {
            const root = parse(await response.text())
            const service_prefix = root.querySelectorAll("p > code")[0];
            const actions = root.querySelectorAll(`tr > td > a`).map(e => e.text);

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
        fs.writeFileSync('actions.json', JSON.stringify(actions_map, null, 2));
    }
)