# Installing and running the Redocly API developer portal

Creating and editing documentation in the developer portal is a sinch. With the web server running, you can quickly see changes on the site.

## Prerequisites

Before getting started, you need the following installed on your system::

- Github account
- [node.js >= 10.15.1](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)
- An IDE of your choice (we recommend [Visual Studio Code](https://code.visualstudio.com))
- Access to the docs git hub repo. You can request access in slack with your github user name <https://join.slack.com/share/zt-qb3ekera-AXaC0j0Yvg54u6H~sSx3uA>

## Installing the developer portal

1. Either using git bash, a terminal, or the UI of your IDE, clone the following repository:

   ```shell
   git clone https://github.com/sinch/newdocs.git
   ```

2. Once the repository is opened, open a terminal at the directory of the repo, and execute the following command:

   ```shell
   yarn install
   ```

   This will install the necessary yarn components and dependencies in the project.

3. After yarn is installed in the project, execute the following command to start the web server that hosts the developer portal:

   ```shell
   yarn start
   ```

   This starts the development web server. By default it's started on port 3000.

4. To view the documentation portal, open a browser window and navigate to [localhost:3000](localhost:3000).
   Note: search isn't functional in the development environment.

## Making and publishing changes

If you have never worked with markdown before, we strongly recommend working through the developer portal training because it teaches you about many of the features.

### Validating changes

To validate all Markdown changes you can run locally the markdown linter and a markdown link checker (it also runs on GitHub if not sure)

1. Markdown linter

   To run markdown linter you can run the next command to install the linter

   ```npm
   npm install -g markdownlint-cli
   ```

   This will install the linter for local use, through this you can check which rules your latest changes are breaking.

   ```bash
   markdownlint ./docs -c ./.markdownlint.yaml
   ```

2. Markdown link checker

   To run the link checker you'll need to install it globally for local use

   ```npm
   npm install -g markdown-link-check
   ```

   Now you'll run the next command and you'll see what links you need to check

   ```bash
   markdown-link-check `find docs -name \*.md` -q -c mlc_config.json
   ```

   ```bash
   find docs -name \*.md -exec markdown-link-check {} -q -c mlc_config.json \;
   ```

### Editing markdown

Before you make your first change you need to create a branch

```shell
git checkout -b sms_changes
git push -u origin sms_changes
```

`sms_changes` is any name that you choose to help you remember.

A branch is a copy that makes it easy to track changes and for you to revert the changes if necessary. We know it's a bit cumbersome in the begining but it's well worth the time.

### Publishing your changes to github

Either use the Github interface in VS Code to commit and then push your changes, or use the following terminal commands:

```shell
git add .
git commit -m"my cool changes"
git push
```

After you push, it's not availalbe for colleagues and your self to view. Once you are happy you can create a pull request, if you want to merge and request a publish right away you click on the link in the command line after the above is executed.

## Troubleshooting

We heavily rely on caching for performance issues so if some changes aren't reflected in the resulting portal, try cleaning the cache by executing the following command:

```shell
yarn clean
yarn start
```

You may have to stop the server first by pressing Ctrl + C first.

Still having trouble, mail me at <mailto:christain@sinch.com> or call me at +15612600684

## Docs

Read the [online documentation](https://redoc.ly/docs/developer-portal/introduction/).
