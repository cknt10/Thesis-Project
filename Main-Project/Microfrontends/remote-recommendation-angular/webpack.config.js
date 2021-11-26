const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "recommendation",
    publicPath: "http://localhost:8081/"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({

        // For remotes (please adjust)
        name: "recommendation",
        library: { type: "var", name: "recommendation" },
        filename: "remoteEntry.js",
        exposes: {
          AppModule:
            //"./src/app/provider/provider.module.ts",
            "./src/app/app.module.ts",

        },

        // For hosts (please adjust)
        // remotes: {
        //     "mfe1": "mfe1@http://localhost:3000/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: ">=12.1.1" /*requiredVersion: 'auto'*/  },
          "@angular/common": { singleton: true, strictVersion: true,  requiredVersion: ">=12.1.1" /*requiredVersion: 'auto'*/ },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: ">=12.1.1" /*requiredVersion: 'auto'*/  },

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
