const Axios = require('axios');
const Constants = require('../util/constants.js');

module.exports = {
    scrape: async function (url) {
        try {
            return await Axios.get(url);
        }
        catch (e) {
            return {};
        }
    },

    scrapeSteamProfilePicture: async function (client, steamId) {
        const response = await module.exports.scrape(`${Constants.STEAM_PROFILES_URL}${steamId}`);

        if (response.status !== 200) {
            client.log('ERROR', `Failed to scrape: '${Constants.STEAM_PROFILES_URL}${steamId}'.`, 'error');
            return null;
        }

        let png = response.data.match(/<img src="(.*_full.jpg)(.*?(?="))/);
        if (png) {
            return png[1];
        }

        return null;
    },
}