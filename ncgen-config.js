const { api, log, _ } = require("ncgen");

module.exports = {
  // The main command. Used to generate project scaffolding. Doc: https://daniel-dx.github.io/ncgen/CONFIG.html#main
  main: {
    // Show welcome message. Doc: https://daniel-dx.github.io/ncgen/CONFIG.html#welcome
    welcome:
      "Welcome to nc-auto-test, the nice automation test project generator",

    // Ask questions. Doc: https://daniel-dx.github.io/ncgen/CONFIG.html#prompt
    prompt: [
      {
        type: "input",
        name: "description",
        message: "What is the project's description",
      },
      {
        type: "input",
        name: "docUrl",
        message:
          "1) 打开 https://doc.weixin.qq.com/mind/m3_AAQAnAa_ACksHFfg60qRIyRzFj0Pk?scode=AJEAIQdfAAo3NMGDQhAAQAnAa_ACk\n\
  2) 点击【生成副本】，将副本的链接复制过来\n",
      },
    ],

    // Source of project template. Doc: https://daniel-dx.github.io/ncgen/CONFIG.html#tmplsource
    tmplSource: "https://github.com/daniel-dx/nice-automation-seed.git",

    // Update files. Doc: https://daniel-dx.github.io/ncgen/CONFIG.html#updatefiles
    updateFiles: {
      // "path/to/project/files": function (content, options) {
      //   return content;
      // },
      "README.md": function (content) {
        const answers = this.$answers;
        return api.replace(content, [
          ["nice-automation", answers.projectNameObj.kebabCase],
          [
            "非常 Nice 的平台自动化测试",
            answers.description || "平台自动化测试",
          ],
          [
            /\[平台测试用例\]\(https:\/\/doc.weixin.qq.com\/mind\/m3_AAQAnAa_ACksHFfg60qRIyRzFj0Pk\?scode=AJEAIQdfAAo3NMGDQhAAQAnAa_ACk\)/,
            `[平台测试用例](${answers.docUrl})`,
          ],
        ]);
      },
      "package.json": function (content) {
        const answers = this.$answers;
        return api.replace(content, [
          [
            '"name": "nice-automation"',
            `"name": "${answers.projectNameObj.kebabCase}"`,
          ],
          [
            '"repository": "https://github.com/daniel-dx/nice-automation-seed.git"',
            '"repository": ""',
          ],
          ['"author": "Daniel.xiao <dxweixiao@tencent.com>",', '"author": "",'],
        ]);
      },
      "docconfig.json": function (content) {
        const answers = this.$answers;
        return api.replace(content, [
          [
            /https:\/\/doc.weixin.qq.com\/mind\/m3_AAQAnAa_ACksHFfg60qRIyRzFj0Pk\?scode=AJEAIQdfAAo3NMGDQhAAQAnAa_ACk/,
            answers.docUrl,
          ],
        ]);
      },
    },

    // Delete Files. Doc: https://daniel-dx.github.io/ncgen/CONFIG.html#removefiles
    removeFiles: [],

    // Install dependencies. Doc: https://daniel-dx.github.io/ncgen/CONFIG.html#installdependencies
    installDependencies: {
      skip: false,
      tips: "Dependencies are being installed, it may take a few minutes",
      command: "yarn install",
    },

    // Completion prompt message. Doc: https://daniel-dx.github.io/ncgen/CONFIG.html#complete
    complete: "Congratulations, the operation is successful",
  },

  // Subcommand. Used to insert fragment module code. Doc: https://daniel-dx.github.io/ncgen/CONFIG.html#sub
  sub: {
    // key is the name of the subcommand
    // <!-- Don't touch me - add subcommnad -->
  },
};
