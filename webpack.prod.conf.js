if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin =   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
  }