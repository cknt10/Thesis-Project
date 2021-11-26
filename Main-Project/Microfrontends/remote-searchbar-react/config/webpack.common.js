module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    //Abwärtskompilierung
                    loader: 'babel-loader',
                    options: {
                        //React spezifische Umsetzung
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-env'
                        ],
                        /*
                        ermöglicht Features für den Browser bsp async,
                        entfernt Redundanzen nach den dem Kompilieren des Codes
                        */
                        plugins: ['@babel/plugin-transform-runtime'] 
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    }
}