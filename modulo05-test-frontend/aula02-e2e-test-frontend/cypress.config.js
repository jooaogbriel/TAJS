import preprocessor from '@badeball/cypress-cucumber-preprocessor';
import createESBuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from "cypress";

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config)
  on(
    'file:preprocessor',
    createBundler({
      plugins: [
        createESBuildPlugin.default(config)
      ]
    })
  )
  return config
}

export default defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/e2e/features/*.feature',
    // baseUrl: '',
  },
});
