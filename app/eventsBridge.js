const { ipcMain } = require('electron');
const events = require('./constants/events');
const { scrapeAndUpdateOutputVendors, configManager } = require('./node/index');

ipcMain.on(events.scraping.start, async event => {
  try {
    const response = await scrapeAndUpdateOutputVendors();
    event.sender.send(events.scraping.done, response);
  } catch (e) {
    event.sender.send(events.scraping.error, e);
  }
});

ipcMain.on(events.config.getCurrentConfig, async event => {
  const config = await configManager.getConfig();
  event.sender.send(events.config.gotCurrentConfig, config);
});

ipcMain.on(events.config.updateConfig, async (event, configToUpdate) => {
  await configManager.updateConfig(configToUpdate);
  event.sender.send(events.config.updatedConfig);
});